.PHONY: install dev-backend dev-web migrate migrate-gen lint lint-fix test db-up db-down clean

install:
	cd backend && uv sync
	npm install

dev-backend:
	cd backend && uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev-web:
	npm run dev:web

dev-miniapp:
	npm run dev:miniapp

migrate:
	cd backend && uv run alembic upgrade head

migrate-gen:
	cd backend && uv run alembic revision --autogenerate -m "$(msg)"

migrate-down:
	cd backend && uv run alembic downgrade -1

lint:
	cd backend && uv run ruff check . && uv run ruff format --check .
	npm run lint

lint-fix:
	cd backend && uv run ruff check --fix . && uv run ruff format .

test:
	cd backend && uv run pytest
	npm run test

db-up:
	docker compose up -d mysql

db-down:
	docker compose down

clean:
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null; true
	rm -rf frontend/web/dist frontend/miniapp/dist
