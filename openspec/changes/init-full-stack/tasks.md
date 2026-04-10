## 1. Monorepo & Infrastructure Setup

- [x] 1.1 Create root `Makefile` with targets: `install`, `dev-backend`, `dev-web`, `migrate`, `lint`, `test`
- [x] 1.2 Initialize npm workspaces: create root `package.json` with `workspaces: ["packages/shared", "frontend/web", "frontend/miniapp"]`
- [x] 1.3 Add `.gitignore` (covering Python, Node, and WeChat build artifacts) and `.editorconfig`
- [x] 1.4 Set up ESLint + Prettier for frontend workspaces; Ruff configured in `backend/pyproject.toml`
- [x] 1.5 Create `docker-compose.yml` with MySQL 8 service and persistent volume
- [x] 1.6 Create root `.env.example` documenting all required environment variables

## 2. Shared Frontend Package (`packages/shared`)

- [x] 2.1 Scaffold `packages/shared` with `package.json`, `tsconfig.json`, and `src/index.ts`
- [x] 2.2 Define Zod schemas for User, Expense, Category, Budget, Report domain entities
- [x] 2.3 Export inferred TypeScript types from all schemas
- [x] 2.4 Install npm workspace dependencies

## 3. Backend — Project Scaffold

- [x] 3.1 Scaffold `backend/` with `pyproject.toml` via `uv` with all dependencies
- [x] 3.2 Create `backend/app/` package with `main.py`, `config.py`, and `database.py`
- [x] 3.3 Define SQLAlchemy ORM models: `User`, `Expense`, `Category`, `Budget`, `RefreshToken`
- [x] 3.4 Create `app/deps.py` with `get_db` and `get_current_user` dependencies
- [x] 3.5 Initialize Alembic and configure `env.py` for async SQLAlchemy + MySQL
- [ ] 3.6 Generate initial Alembic migration (requires MySQL running)

## 4. Web Frontend — Project Scaffold

- [x] 4.1 Scaffold `frontend/web/` with Vite + React + TypeScript
- [x] 4.2 Install additional dependencies: `react-router-dom`, `@tanstack/react-query`, `axios`, `tailwindcss`, `recharts`, `react-hook-form`, `zod`
- [x] 4.3 Configure Tailwind CSS
- [x] 4.4 Set up React Router with `AuthLayout` (public) and `AppLayout` (protected) layouts
- [x] 4.5 Create Axios instance with base URL and JWT Bearer interceptor
- [x] 4.6 Set up TanStack Query client provider in `main.tsx`

## 5. WeChat Mini-App — Project Scaffold

- [x] 5.1 Scaffold `frontend/miniapp/` directory with `package.json`, `tsconfig.json`, and Taro config
- [x] 5.2 Create `src/app.tsx`, `src/app.config.ts` with 4-tab bar definition
- [x] 5.3 Create `src/services/api.ts` with `wx.request` wrapper and JWT interceptor
- [x] 5.4 Install miniapp npm dependencies
- [x] 5.5 Create placeholder page index files for all 7 pages defined in `app.config.ts`
