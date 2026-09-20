# Frontend Foundation

Phase 6A introduces the NEXUS web foundation in `frontend/`.

## Stack

- React 18 with TypeScript
- Vite
- Tailwind CSS

The application intentionally has no API integration in this phase. It uses static placeholder content to establish the layout and component contracts for the investigation experience.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Use the navigation to switch between the Dashboard and Investigation views. The responsive layout supports desktop and tablet widths.

## Design system

The Samsung One UI-inspired foundation uses a deep navy background (`#0B0F17`), raised cards (`#121826`), and Samsung blue (`#5B8CFF`) for primary actions and focus states. Shared Tailwind tokens are defined in `tailwind.config.js`; the `.panel` and `.eyebrow` utilities live in `src/index.css`.

## Component foundation

Placeholder components are kept intentionally presentational until the API contract is wired in a later phase:

- `BugInput`
- `InvestigationTimeline`
- `EvidenceTrail`
- `DependencyGraph`
- `DiagnosisCard`
- `PatchCard`
- `ValidationCard`
