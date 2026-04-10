from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings

app = FastAPI(
    title="Expense Tracker API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


# Routers registered here as features are implemented:
# from app.routers import auth, expenses, categories, budgets, reports
# app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
# app.include_router(expenses.router, prefix="/api/v1/expenses", tags=["expenses"])
# app.include_router(categories.router, prefix="/api/v1/categories", tags=["categories"])
# app.include_router(budgets.router, prefix="/api/v1/budgets", tags=["budgets"])
# app.include_router(reports.router, prefix="/api/v1/reports", tags=["reports"])
