## Context

The expense-tracker starts with zero code. We are doing a greenfield bootstrap of a full-stack application consisting of:

- A **Python/FastAPI backend** (REST API) serving all clients, chosen for easy integration of AI/ML features
- A **React web SPA** for browser users
- A **WeChat mini-program** for mobile users in China

The backend and frontend are co-located in a single repo but use separate toolchains (Python/uv for backend, npm workspaces for frontend surfaces). Domain models are defined twice: Pydantic models on the backend and Zod schemas on the frontend, kept in sync via the OpenAPI spec the backend auto-generates.

## Goals / Non-Goals

**Goals:**
- Establish a runnable monorepo with `backend/` (Python), `frontend/web/`, `frontend/miniapp/`, and `packages/shared/` (frontend types)
- Implement all REST API endpoints for auth, expenses, categories, budgets, and reports
- Implement web SPA with full feature parity to the API
- Implement WeChat mini-app covering expense entry, history, budgets, and account
- Set up local development with Docker Compose (MySQL 8)
- Configure environment variables, linting (Ruff for Python, ESLint for JS), formatting, and basic CI scaffold

**Non-Goals:**
- Production deployment / cloud infrastructure
- Native iOS/Android apps
- Third-party payment integration
- Multi-currency support (single currency, v1)
- Real-time sync / WebSockets

## Decisions

### 1. Monorepo: Python backend + npm workspaces for frontend
**Decision**: Single Git repo. `backend/` uses Python with `pyproject.toml` (managed via `uv`). Frontend surfaces (`frontend/web`, `frontend/miniapp`, `packages/shared`) use npm workspaces.
**Rationale**: Keeps all code in one place; toolchains remain independent.
**Alternative considered**: Separate repos — too much coordination overhead at bootstrap stage.

### 2. Backend: Python + FastAPI + SQLAlchemy 2 (async) + Alembic + MySQL 8
**Decision**: FastAPI for the API layer, SQLAlchemy 2 (async) as the ORM, Alembic for migrations, MySQL 8 as the primary database.
**Rationale**: FastAPI provides auto-generated OpenAPI docs, native async support, and first-class Pydantic v2 integration — ideal for adding AI/ML endpoints later. MySQL 8 is widely available in China-based hosting environments.
**Alternative considered**: Django REST Framework — heavier; PostgreSQL — strong but MySQL is the team preference.

### 3. Auth: JWT (access + refresh tokens)
**Decision**: Stateless JWT access tokens (15 min TTL) + httpOnly refresh tokens (7 days) stored in cookies.
**Rationale**: Works for both web and mini-app clients; no session store needed.
**Alternative considered**: Session-based auth — doesn't work well cross-platform.

### 4. Web Frontend: React + TypeScript + Vite + TanStack Query + Tailwind CSS
**Decision**: Vite for build tooling, TanStack Query for server state, Tailwind for styling.
**Rationale**: Fast DX with Vite HMR, TanStack Query handles caching/loading states elegantly.
**Alternative considered**: Next.js — SSR overkill for a personal finance dashboard.

### 5. WeChat Mini-App: Taro (React-like framework)
**Decision**: Use Taro with React syntax targeting the WeChat mini-program runtime.
**Rationale**: Allows sharing component knowledge with the web team; TypeScript support.
**Alternative considered**: Native WXML/WXSS — divergent syntax from the web stack.

### 6. API Design: RESTful with versioning (`/api/v1/`)
**Decision**: Resource-oriented REST endpoints under `/api/v1/` prefix.
**Rationale**: Simple, familiar, easy to document and test.

### 7. Type contract: Pydantic (backend) + Zod (frontend)
**Decision**: Pydantic v2 models are the source of truth on the backend. `packages/shared` contains Zod schemas kept in sync with the OpenAPI spec.
**Rationale**: Each language uses its native validation library; OpenAPI bridges the gap.

## Risks / Trade-offs

- **WeChat mini-app requires HTTPS in production** → Document SSL setup in mini-app guide.
- **Taro build complexity** → Pin Taro version, test on WeChat DevTools from day one.
- **JWT refresh rotation** → Implement carefully with clear refresh endpoint and client interceptor.
- **Async SQLAlchemy complexity** → Use `Depends` for DB session lifecycle; document patterns.
- **Two-toolchain monorepo** → Provide `Makefile` to abstract setup.

## Migration Plan

Greenfield — no migration needed. Deployment steps:
1. `docker compose up -d` to start MySQL 8
2. `cd backend && uv sync` to install Python deps
3. `cd backend && alembic upgrade head` to run migrations
4. `cd backend && uvicorn app.main:app --reload` to start API
5. `npm install` from root, then `npm run dev:web` for web SPA
6. Open WeChat DevTools, import `frontend/miniapp/`

## Open Questions

- Receipt storage: local filesystem (dev) → cloud object storage (prod). Scope filesystem-only for v1.
