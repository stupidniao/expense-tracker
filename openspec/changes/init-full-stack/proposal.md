## Why

The expense-tracker project exists as an empty shell — no backend, no frontend, and no structure. We need to bootstrap the complete full-stack codebase so the project is runnable, testable, and ready for feature development across all three platforms (backend API, web app, WeChat mini app).

## What Changes

- **Bootstrap backend**: RESTful API server with authentication, expense CRUD, category management, budget tracking, and reporting endpoints
- **Bootstrap web frontend**: React-based SPA with expense entry, category management, dashboard/analytics, and user account pages
- **Bootstrap WeChat mini app**: Native WeChat mini-program client covering expense entry, history browsing, budget overview, and account management
- **Project infrastructure**: Monorepo structure with shared types/utilities, Docker Compose for local dev, CI/CD scaffold, and environment configuration

## Capabilities

### New Capabilities

- `user-auth`: User registration, login, JWT-based session management, and role-based access — shared contract for all clients
- `expense-management`: Create, read, update, delete expenses with amount, date, category, note, and receipt attachment
- `category-management`: User-defined expense categories with icons and color coding
- `budget-management`: Monthly/custom-period budgets per category with over-budget alerting
- `reporting-analytics`: Aggregated spend summaries, trend charts, and exportable reports
- `web-frontend`: Browser-based SPA (React + TypeScript) consuming the backend API — full feature parity
- `wechat-miniapp`: WeChat mini-program (Taro) consuming the backend API — mobile-first feature set

### Modified Capabilities

## Impact

- **New directories**: `backend/`, `frontend/web/`, `frontend/miniapp/`, `packages/shared/`
- **New dependencies**: Python + FastAPI (backend), React + Vite (web), Taro (miniapp), MySQL 8, SQLAlchemy + Alembic, Pydantic v2, JWT, Zod (frontend only)
- **APIs introduced**: `/api/v1/auth/*`, `/api/v1/expenses/*`, `/api/v1/categories/*`, `/api/v1/budgets/*`, `/api/v1/reports/*`
- **No breaking changes** — greenfield initialization
