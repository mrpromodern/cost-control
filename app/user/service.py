from app.user.models import User
from app.service import BaseService


class AuthUser(BaseService):
    model = User
    