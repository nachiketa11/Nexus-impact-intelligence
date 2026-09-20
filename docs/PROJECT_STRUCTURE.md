# Project Structure

```text
Nexus-impact-intelligence/
├── agents/
├── backend/
├── docs/
│   ├── HANDOVER.md
│   ├── PROJECT_STRUCTURE.md
│   └── README.md
├── frontend/
├── graph/
├── parser/
├── presentation/
├── rag/
├── seed_repos/
│   ├── GalaxyPhone/
│   │   ├── bluetooth/
│   │   ├── docs/
│   │   ├── logs/
│   │   ├── sync/
│   │   └── tests/
│   ├── GalaxyWatch/
│   │   ├── connector/
│   │   ├── docs/
│   │   ├── logs/
│   │   ├── power/
│   │   └── tests/
│   └── SmartThings/
│       ├── automation/
│       ├── bridge/
│       ├── docs/
│       ├── logs/
│       └── tests/
└── tests/
```

## Directory Responsibilities

| Directory | Responsibility |
| --- | --- |
| `backend` | Backend services, APIs, and orchestration |
| `frontend` | Product user interface |
| `agents` | Agent definitions and coordination logic |
| `parser` | Repository, source, and document parsing |
| `graph` | Knowledge graph modeling and operations |
| `rag` | Retrieval, indexing, and generation workflows |
| `seed_repos` | Simulated Samsung repositories and representative input data |
| `tests` | Automated tests across project components |
| `docs` | Project documentation and handover material |
| `presentation` | Presentation assets and demonstrations |
