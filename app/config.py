from pydantic_settings import BaseSettings
from pydantic import field_validator, model_validator, Field

class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    DATABASE_URL: str = Field(init=False)

    @model_validator(mode='before')
    def assemble_database_url(cls, values):
        values["DATABASE_URL"] = (
            f"postgresql+asyncpg://{values['DB_USER']}:{values['DB_PASSWORD']}"
            f"@{values['DB_HOST']}:{values['DB_PORT']}/{values['DB_NAME']}"
        )
        return values
    
    SECRET_KEY:str
    REFRESH_SECRET_KEY:str
    ALGORITHM:str

    class Config:
        env_file = ".env"

settings = Settings()