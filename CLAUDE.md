# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend
npm start                  # Angular dev server → http://localhost:4200
npm run build              # production build → dist/to-carol/

# Backend
cd backend && npm run dev  # Express dev server → http://localhost:3000
cd backend && npm run build && npm start  # production

# Generate a new standalone component
npx ng generate component modules/my-component --standalone
```

## Architecture

### Frontend (Angular + NgRx)

Single-page app — all sections on one scrolling page: **Hero → Your Story → Timeline → Gallery → Love Letter → Footer**.

**Path aliases** (defined in `tsconfig.json`):
- `@app/*` → `src/app/*`
- `@src/*` → `src/*`

**NgRx store** (`src/app/core/store/`) — two slices:
- `nav` — active section (driven by IntersectionObserver in `app.ts`) + mobile menu
- `gallery` — photos loaded from API, lightbox state, loading/error flags

**Data flow for photos:** `app.ts` dispatches `loadPhotos` on init → `app.effects.ts` calls `PhotosService` → success/failure actions update the `gallery` slice → `GalleryComponent` renders from the store.

**Module components** (`src/app/modules/`) — standalone, each folder has `.ts/.html/.scss`.

**Routes** live in `src/app/modules/modules.routes.ts`. App config in `src/app/core/config/app.config.ts`.

**SCSS tokens** in `src/styles/_variables.scss`, mixins in `_mixins.scss`, keyframes in `_animations.scss`.

### Backend (Express + TypeScript)

- Entry: `backend/src/server.ts` — Express on port 3000, CORS allows `localhost:4200`
- `GET /api/photos` — scans `backend/photos/` directory, returns `GalleryPhoto[]`
- `GET /photos/:file` — serves photo files statically
- Drop real photos into `backend/photos/` to serve them

### Environments

- Dev: `src/environments/environment.ts` → `apiUrl: http://localhost:3000/api`
- Prod: `src/environments/environment.prod.ts` → `apiUrl: /api`

## Photos

- **Gallery photos** — drop files into `backend/photos/` (jpg/jpeg/png/webp/gif). The API auto-discovers them.
- **Your Story images** — still served from `public/assets/photos/` (`story-main.jpg`, `story-second.jpg`)
- Timeline events → `src/app/modules/timeline/timeline.ts` (`events` array)
- Letter text → `src/app/modules/love-letter/love-letter.html`
