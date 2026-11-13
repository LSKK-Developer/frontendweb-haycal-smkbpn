# SkillUp — Learning Progress Tracker

**Build Your Skills. Track Your Growth.**

SkillUp is a frontend-only learning progress tracker prototype. Users can browse skills, create a custom learning path, follow milestones, track completion, write learning notes, and switch between light and dark themes.

## Tech stack
- React + TypeScript + Vite
- TailwindCSS + Ant Design
- React Router (HashRouter)
- Zustand with Local Storage persistence
- TanStack Query
- React Hook Form + Zod

## Getting started

Requirements: Node.js 20 or later and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

Create a demo session by entering any display name on the login screen. No password, backend, or real account is required.

## Current features
- Demo login and local profile name
- Dashboard summary and learning progress
- Preset skill catalog with search and category filters
- Create custom skills and roadmap milestones
- Enroll in skills and update milestone completion
- Automatic progress calculation
- Learning notes: create, edit, search, delete
- Light and dark themes
- Responsive sidebar and mobile bottom navigation

## Data and security boundary
All prototype data is stored in browser Local Storage (`skillup-storage`). It remains on the current browser profile and is not synced to a server. Demo login is not real authentication. Do not enter sensitive or private information.

## Project structure

```text
src/
├── components/       # App shell and reusable UI cards
├── data/             # Preset skills and sample learning data
├── pages/            # Login, dashboard, explore, learning, notes, etc.
├── store/            # Zustand store and persistence
├── types/            # Shared TypeScript interfaces
├── utils/            # Progress calculation helpers
├── App.tsx
└── main.tsx

docs/
├── PRODUCT-SPEC.md   # Product decisions and requirements
└── WIREFRAME.md      # Low-fidelity page layouts and navigation
```

## Build for production

```bash
npm run build
npm run preview
```

The Vite build output is generated in `dist/`.

## Next implementation steps
1. Verify the starter locally with `npm install` and `npm run build`.
2. Replace the illustrative streak card with date-based activity tracking.
3. Add component-level tests and accessibility checks.
4. Connect a real API only if the internship assignment provides one.
5. Capture screenshots for the project presentation.
