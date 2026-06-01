"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";

interface FollowCameraProps {
  targetPosition: [number, number, number];
  initialOffset?: [number, number, number];
}

export function FollowCamera({ targetPosition, initialOffset = [6, 5, 7] }: FollowCameraProps) {
  const { camera, gl } = useThree();
  const offsetRef = useRef(new THREE.Vector3(initialOffset[0], initialOffset[1], initialOffset[2]));
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);

  const minZoom = 0.4;
  const maxZoom = 2.5;
  const defaultDist = new THREE.Vector3(initialOffset[0], initialOffset[1], initialOffset[2]).length();

  useEffect(() => {
    const canvas = gl.domElement;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomRef.current = Math.max(minZoom, Math.min(maxZoom, zoomRef.current - e.deltaY * 0.001));
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 2 || e.button === 1) {
        isDragging.current = true;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      lastMouse.current = { x: e.clientX, y: e.clientY };

      const angleH = dx * 0.005;
      const angleV = dy * 0.005;
      const offset = offsetRef.current;

      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.theta -= angleH;
      spherical.phi = Math.max(0.3, Math.min(Math.PI - 0.3, spherical.phi - angleV));
      offset.setFromSpherical(spherical);
    };

    const onMouseUp = () => { isDragging.current = false; };
    const onContextMenu = (e: Event) => e.preventDefault();

    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("contextmenu", onContextMenu);

    return () => {
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("contextmenu", onContextMenu);
    };
  }, [gl]);

  useFrame(() => {
    const target = new THREE.Vector3(targetPosition[0], targetPosition[1], targetPosition[2]);
    const offset = offsetRef.current.clone().multiplyScalar(zoomRef.current);

    const desired = target.clone().add(offset);
    camera.position.lerp(desired, 0.06);
    camera.lookAt(target);
  });

  return null;
}
