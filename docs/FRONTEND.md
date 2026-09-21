# Frontend Foundation

Phase 6A introduces the NEXUS web foundation in `frontend/`.

## Stack

- React 18 with TypeScript
- Vite
- Tailwind CSS

Phase 6B connects the frontend to the FastAPI backend. The API base defaults to `http://localhost:8000` and can be overridden with `VITE_API_URL`.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Start the backend from the project root with `uvicorn backend.app:app --reload`, then use the navigation to switch between the Dashboard and Investigation views. The `Run Samsung Demo` action submits the seeded Bluetooth bug. The responsive layout supports desktop and tablet widths.

## Design system

The Samsung One UI-inspired foundation uses a deep navy background (`#0B0F17`), raised cards (`#121826`), and Samsung blue (`#5B8CFF`) for primary actions and focus states. Shared Tailwind tokens are defined in `tailwind.config.js`; the `.panel` and `.eyebrow` utilities live in `src/index.css`.

## Component foundation

The service boundary in `src/services/api.ts` exposes typed `healthService`, `graphService`, and `bugService` functions. `useHealth`, `useGraph`, and `useBugAnalysis` own loading, success, and backend error-envelope state. Components do not call `fetch` directly.

- `BugInput` and `StatusIndicator`
- `InvestigationTimeline`
- `EvidenceTrail`
- `DependencyGraph`
- `DiagnosisCard`
- `PatchCard`
- `ValidationCard`

Bug analysis progress is shown sequentially as Planner, Code Intelligence, Diagnosis, and Patch stages. Recoverable backend failures display the API's `error`, `recoverable`, and `next_step` guidance without crashing the UI.
