# BUILD — Next.js Site & Distribution Hub

Next.js 14 (App Router) · TypeScript · Tailwind CSS 3 · three.js

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Needs Node 18.17+. Fonts (Jost, Archivo, Space Mono) are fetched by `next/font` at build time, so the first build needs internet.

## Structure
- `app/layout.tsx` fonts + metadata
- `app/page.tsx` every section (HUD, hero, stack, pillars, offline, manifesto, architecture list, interactive bento features, pricing, mascot finale, mobile + web distribution hub footer)
- `app/globals.css` unified site styles + CSS Houdini theme transitions (Tailwind layers on top)
- `components/ScrollEngine.tsx` scroll effects: hero landing parallax, background colour per section, active nav pill tracking, focus fade, letter-by-letter manifesto paragraph
- `components/BulbCanvas.tsx` the 3D bulb (glass lifts open, glowing filament rings & 3D knowledge nodes drift out)
- `public/bulb.json` geometry exported from `idea_bulb.blend`
- `public/lady.webp` hero photo

## Mobile APK & Web App Links
Copy `.env.example` to `.env.local`:
- `NEXT_PUBLIC_APP_DOWNLOAD_URL`: Direct link to your Android APK (defaults to `/downloads/BUILD.apk` — drop `BUILD.apk` inside `public/downloads/`).
- `NEXT_PUBLIC_WEB_APP_URL`: URL to launch the BUILD Web App in the browser (e.g. `https://app.build.ng` or `http://localhost:8081`).
