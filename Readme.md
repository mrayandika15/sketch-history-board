# Sketch History Board

A full-stack drawing and versioning app with React (frontend) and NestJS (backend). Draw on a canvas, save versions (JSON paths plus optional image thumbnail), preview and restore versions, and bulk-delete versions with optional file cleanup.

## Monorepo Structure

```
sketch-history-board/
├── backend/           # NestJS API (Prisma, Postgres, file upload)
└── frontend/          # React + Vite app (Zustand, Query, Tailwind, shadcn)
```

## Tech Stack

- Frontend: React 19, Vite (rolldown-vite), TypeScript, Zustand, TanStack Query, Axios, react-sketch-canvas, Tailwind CSS v4, shadcn/ui (Radix), sonner
- Backend: NestJS 11, Prisma 6, PostgreSQL, Multer uploads; standardized responses via global ResponseTransformInterceptor and HttpResponseExceptionFilter; testing with Jest

## Getting Started

### Development server

1) Start PostgreSQL
   - Local DB: ensure Postgres is running.
   - Or Docker: `docker compose up -d db` (see Docker Container).

2) Install root packages
   - From root: `pnpm install` (installs root devDependencies like `concurrently`).

3) Prepare env and app dependencies
   - From root: `pnpm run setup`
   - This creates `.env` from `.env.example`, installs backend/frontend deps, generates Prisma client, and applies migrations.

4) Start both servers
   - From root: `pnpm run start` (installs missing deps and starts backend+frontend dev servers).

Notes:
- If packages are already installed, you can run `pnpm run dev` to start both dev servers concurrently.

### Docker Container

Run everything (PostgreSQL, backend, frontend) with a single command.

- Start: `docker compose up -d`
- Stop: `docker compose down`

What it does:
- Launches `postgres:16` with database `sketch_history`.
- Starts backend dev server on `http://localhost:3000` (Prisma generate + migrate on start).
- Starts frontend Vite dev server on `http://localhost:5173`.

Environment defaults in Compose:
- Backend `DATABASE_URL`: `postgresql://app:app@db:5432/sketch_history`
- Backend `CORS_ORIGINS`: `http://localhost:5173`
- Frontend `VITE_API_URL`: `http://localhost:3000/api`

Notes:
- File uploads are saved into `frontend/src/assets` (shared volume).
- If you change dependencies, `docker compose up --build` rebuilds images.
- For a clean rebuild: `docker compose down -v && docker compose up --build`.

## Features

- Sketch canvas with pen/eraser, clear, dynamic cursor, and brush sizing
- Undo/Redo actions (see `frontend/src/features/sketch-history/components/sketch-undo-redo.tsx`)
- Save Version: stores paths (`CanvasPath[]`) and uploads an optional base64 image thumbnail
- History List: shows versions with thumbnails and a confirmation dialog before loading
- Bulk Delete: confirm and delete selected versions; associated image files are deleted

## API Overview

Base URL: `http://localhost:3000/api`

### Sketch History

- `POST /sketch-history`

  - Body: `{ name: string, data: CanvasPath[], image?: string }`
  - Returns: `SketchHistory` record

- `GET /sketch-history`

  - Returns: `SketchHistory[]` (sorted by `createdAt` desc)

- `GET /sketch-history/:id`

  - Returns: `SketchHistory`

- `DELETE /sketch-history`
  - Body: `{ ids: number[] }`
  - Returns: `{ count: number }`

### File Upload

- `POST /file-upload` (multipart/form-data)

  - Field: `file`
  - Returns: `string` path relative to frontend root (e.g., `src/assets/<filename>`)

- `DELETE /file-upload`
  - Body: `{ path: string }` (the returned relative path)
  - Returns: `{ deleted: true }`

Notes:

- Uploaded files are stored on disk under `frontend/src/assets` with sanitized, timestamped filenames.
- The backend returns standardized responses, but the frontend Axios client unwraps and uses only the `.data` payload.

## Data Model (Prisma)

```prisma
model SketchHistory {
  id        Int      @id @default(autoincrement())
  name      String
  image     String?
  data      Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Frontend Highlights

- `src/lib/axios.ts`: Axios client with base URL from `VITE_API_URL` (defaults to `http://localhost:3000/api`), response unwrapping, and error toasts
- `src/features/sketch/components/sketch-canvas.tsx`: Canvas setup, image export (`exportImage('jpeg')`), and custom cursor
- `src/features/sketch-history/components/create-history.tsx`: Saves version, uploads base64 image, and includes image path in create payload
- `src/features/sketch-history/components/get-list.history.tsx`: Lists histories, shows thumbnails, and asks confirmation before replacing current drawing
- `src/features/sketch-history/components/delete-history.tsx`: Bulk delete with confirmation and associated image file cleanup
- `src/features/sketch-history/components/sketch-undo-redo.tsx`: Undo/Redo action buttons bound to the sketch canvas

## Backend Highlights

- `src/main.ts`: Global `ValidationPipe`, standardized responses via `ResponseTransformInterceptor` and `HttpResponseExceptionFilter`, CORS configuration, global `api` prefix
- `src/modules/sketch-history`: CRUD endpoints for `SketchHistory`
- `src/modules/file-upload`: `POST` upload and `DELETE` by path; storage via `multer.diskStorage` into `../frontend/src/assets`
- `src/common/prisma.service.ts`: Prisma client lifecycle hooks

## Scripts

### Frontend (`frontend/package.json`)

- `dev`: run Vite dev server
- `build`: TypeScript build then Vite build
- `preview`: preview built app
- `lint`: ESLint

### Backend (`backend/package.json`)

- `start`, `start:dev`, `start:prod`: run API
- `prisma:migrate`, `prisma:generate`, `prisma:studio`: Prisma workflows
- `lint`, `test`, `test:e2e`, `test:cov`: linting and tests

## Environment Variables

- Backend
  - `DATABASE_URL` (required)
  - `PORT` (optional, default `3000`)
  - `CORS_ORIGINS` (comma-separated list of allowed origins)
- Frontend
  - `VITE_API_URL` (default `http://localhost:3000/api`)

## Troubleshooting

- Undo/Redo buttons are disabled until the canvas is available.
- If image thumbnails don’t display, verify the returned path (should look like `src/assets/<filename>`) and that the file exists on disk.
- For production, prefer storing images in a CDN or object storage rather than committing under `src/assets`.

## License

UNLICENSED (internal project). Update as needed.
