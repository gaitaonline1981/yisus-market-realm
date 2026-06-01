"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGameStore } from "@/stores/useGameStore";
import { MOUNTS } from "@/data/mounts";

const BASE_SPEED = 0.12;
const MOUNT_SPEED_MULT = 1.8;
const ROTATE_SPEED = 0.04;

export function PlayerController() {
  const { camera } = useThree();
  const keys = useRef<Set<string>>(new Set());
  const moveTo = useGameStore((s) => s.moveTo);
  const rotate = useGameStore((s) => s.rotate);
  const toggleMount = useGameStore((s) => s.toggleMount);
  const player = useGameStore((s) => s.player);
  const isMounted = useGameStore((s) => s.isMounted);
  const posRef = useRef(player.position);
  const rotRef = useRef(player.rotation);
  const mountedRef = useRef(isMounted);

  useEffect(() => {
    posRef.current = player.position;
    rotRef.current = player.rotation;
    mountedRef.current = isMounted;
  }, [player.position, player.rotation, isMounted]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keys.current.add(key);
      if (key === "m") {
        e.preventDefault();
        toggleMount();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [toggleMount]);

  useFrame(() => {
    const k = keys.current;
    const pos = posRef.current;
    const rot = rotRef.current;
    let dx = 0, dz = 0;

    const speed = mountedRef.current ? BASE_SPEED * MOUNT_SPEED_MULT : BASE_SPEED;

    if (k.has("w") || k.has("arrowup")) dz -= speed;
    if (k.has("s") || k.has("arrowdown")) dz += speed;
    if (k.has("a") || k.has("arrowleft")) {
      dx -= speed * 0.7;
      rotRef.current -= ROTATE_SPEED;
    }
    if (k.has("d") || k.has("arrowright")) {
      dx += speed * 0.7;
      rotRef.current += ROTATE_SPEED;
    }

    if (dx !== 0 || dz !== 0) {
      const cos = Math.cos(rotRef.current);
      const sin = Math.sin(rotRef.current);
      const newX = pos[0] + cos * dz + sin * dx;
      const newZ = pos[2] - sin * dz + cos * dx;
      posRef.current = [newX, pos[1], newZ];
      moveTo([newX, pos[1], newZ]);
      rotate(rotRef.current);
    }

    const camDist = 8;
    const camHeight = 5;
    const target = [posRef.current[0], posRef.current[1] + 2, posRef.current[2]] as const;
    camera.position.set(
      target[0] - Math.sin(rotRef.current) * camDist,
      target[1] + camHeight,
      target[2] - Math.cos(rotRef.current) * camDist
    );
    camera.lookAt(target[0], target[1], target[2]);
  });

  return null;
}
