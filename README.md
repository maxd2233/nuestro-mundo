# Nuestro Mundo 🌍💛

Página web romántica con temática Minecraft, hecha con React + Vite + Tailwind CSS.

## 📸 Cómo agregar tus fotos

1. Poné las fotos en la carpeta `public/photos/`
2. Nombrarlas como `foto1.jpg`, `foto2.jpg`, `foto3.jpg`, etc.
3. Editar `src/data/moments.js` para cambiar los textos, fechas y emojis de cada momento.

## 🚀 Deploy en GitHub Pages

El proyecto ya está configurado para hacer deploy en GitHub Pages.

### Paso a paso

1. Creá un repositorio en GitHub llamado `nuestro-mundo`

2. Conectá tu repo local:
   ```bash
   git remote add origin https://github.com/tu-usuario/nuestro-mundo.git
   ```

3. Hacé el deploy:
   ```bash
   npm run deploy
   ```

4. En GitHub, andá a **Settings → Pages** y seleccioná:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `root`

5. La página va a estar disponible en:
   ```
   https://tu-usuario.github.io/nuestro-mundo/
   ```

## 🛠 Desarrollo local

```bash
npm install
npm run dev
```

## 🧱 Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Google Fonts: Press Start 2P
