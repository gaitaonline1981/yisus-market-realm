# Guía: Animar tus personajes GLB con Mixamo

Mixamo es una herramienta GRATIS de Adobe que auto-riggea modelos 3D y les agrega animaciones.
No necesitás saber nada de Blender ni animación.

## Paso a paso (5 minutos por personaje)

### 1. Preparar tu GLB
- Tenés tus GLBs en: `C:\proyectos\ai-website-cloner\public\models\mmorpg\characters\`
- Necesitás que sea formato FBX o OBJ. Si es GLB, convertilo con Blender (File > Export > FBX)
- Alternativa: usá https://products.aspose.app/3d/conversion/glb-to-fbx (online gratis)

### 2. Subir a Mixamo
- Entrá a https://www.mixamo.com
- Creá cuenta Adobe gratis o entrá con Google
- Click en "Upload Character" (arriba a la derecha)
- Seleccioná tu archivo FBX

### 3. Auto-Rig
- Mixamo te muestra el modelo. Seguí las instrucciones:
  - Marcá los puntos: mentón, muñecas, codos, rodillas, entrepierna
  - Click "Next" y Mixamo genera el esqueleto automáticamente
- En 30 segundos tenés tu modelo riggeado

### 4. Elegir animaciones
- Mixamo tiene 50+ animaciones gratis:
  - **Idle**: "Breathing Idle", "Idle"
  - **Caminar**: "Walking", "Walking Forward"
  - **Correr**: "Running", "Fast Run"
  - **Saltar**: "Jumping", "Running Jump"
- Click en la animación > Download

### 5. Descargar
- Format: **FBX Binary** o **GLB**
- Skin: **With Skin**
- Frames per second: **30**
- Keyframe reduction: **none** (mejor calidad)
- Click Download

### 6. Reemplazar en el proyecto
- Guardá el nuevo GLB en la misma carpeta del personaje
- Ejemplo: `public/models/mmorpg/characters/ticker/ticker.glb`
- Sobreescribí el viejo (hacé backup antes)
- **El juego ya está preparado**: detecta animaciones automáticamente con `useAnimations`

## Animaciones que busca el juego (por nombre)
El sistema busca automáticamente:
- Animaciones con "idle" en el nombre → para estado quieto
- Animaciones con "walk" o "run" en el nombre → para movimiento

Si tu GLB tiene esas animaciones, el personaje va a caminar y tener idle automáticamente.

## Modelos actuales
Tus personajes en `public/models/mmorpg/characters/`:
- ticker, flipper, hedgey, maci, slyde, sproket, volumax, waven

Tus monturas en `public/models/mmorpg/mounts/`:
- candle-dragon, liquidity-whale, market-rover, moon-hopper
- noble-steed, order-block-rhino, pocket-rocket, skyward-talon
- volatility-falcon, wind-dasher

## Si no querés usar Mixamo
Alternativas:
- **Sketchfab**: descargá modelos ya animados con licencia CC
- **Ready Player Me**: creá avatares animados gratis
- **Blender + Auto-Rig Pro**: más control pero más complejo
