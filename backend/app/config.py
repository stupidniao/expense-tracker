from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "mysql+aiomysql://expense_user:expense_pass@localhost:3306/expense_tracker"

    jwt_secret_key: str = "change-me"
    jwt_access_token_expire_minutes: int = 15
    jwt_refresh_token_expire_days: int = 7

    allowed_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]
    upload_dir: str = "./uploads"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
