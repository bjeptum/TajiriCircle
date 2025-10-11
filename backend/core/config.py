from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "TajiriCircle"
    SECRET_KEY: str = "supersecretkey"
    DATABASE_URL: str = "postgresql://user:password@db:5432/tajiricircle"
    REDIS_URL: str = "redis://redis:6379/0"
    MAILHOG_URL: str = "smtp://mailhog:1025"

    class Config:
        env_file = ".env"

settings = Settings()