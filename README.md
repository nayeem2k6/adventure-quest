# Adventure Quest

A browser-based platformer built with Phaser 3 and Vite. The background uses the image provided for this project; the remaining game art is generated at runtime, and sound effects/music are synthesized with the Web Audio API.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install and play locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Controls:

- **Move:** A / D or Left / Right
- **Jump:** Space, W, or Up
- **Pause / resume:** Esc or P, or the on-screen Pause control
- **Touch devices:** Left, right, and jump buttons

Collect the floating gold coins for points, bounce on enemies to defeat them, avoid spikes and pits, and reach the glowing portal. The three trails can be selected from the main menu. Health, score, sound, restart, pause, and progression are available in-game.

## Production build

```sh
npm run build
npm run preview
```

Vite writes the static production site to `dist/`. There is no client-side URL routing, so a Vercel SPA rewrite is not required.

## GitHub setup

1. Create an empty repository on GitHub.
2. From this folder, initialize Git if needed, then stage and commit the project:

   ```sh
   git init
   git add .
   git commit -m "Build Adventure Quest"
   git branch -M main
   git remote add origin https://github.com/<YOUR-ACCOUNT>/<YOUR-REPOSITORY>.git
   git push -u origin main
   ```

3. Replace the placeholders with your repository details. Do not put credentials or tokens in the remote URL or source files.

## Vercel deployment

1. Sign in to Vercel and choose **Add New → Project**.
2. Import your GitHub repository and approve Vercel's GitHub access prompt.
3. Vercel detects Vite automatically. Confirm **Build Command** is `npm run build` and **Output Directory** is `dist`.
4. Choose **Deploy**. Future pushes to the connected branch can trigger deployments.

No deployment was performed as part of this project setup.
