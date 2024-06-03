from sqlalchemy import delete, insert, select, update
from app.database import async_session_maker
from app.user.models import User

class BaseService():
    model:None

    @classmethod
    async def find_one_or_none(cls,**filter_by):
        async with async_session_maker() as session:
            query =  select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalar_one_or_none()
    
    @classmethod
    async def insert_data_db(cls,**data):
        async with async_session_maker() as session:
            query =  insert(cls.model).values(**data)
            await session.execute(query)
            await session.commit()

    @classmethod
    async def find_by_id(cls,item_id:int):
        async with async_session_maker() as session:
            query = select(cls.model).filter(cls.model.id == item_id)
            result = await session.execute(query)
            return result.scalars().first()
    
    @classmethod
    async def update_username(cls,item_id:int,new_username:str):
        async with async_session_maker() as session:
            query = (
                update(cls.model)
                .where(cls.model.id == item_id)
                .values(username=new_username)
                )
            await session.execute(query)
            await session.commit()
    @classmethod
    async def find_all(cls,filter_by):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalars().all()

    @classmethod
    async def update_data(cls, item_id: int, **updated_data):
        async with async_session_maker() as session:
            query = (
                update(cls.model)
                .where(cls.model.id == item_id)
                .values(**updated_data)
            )
            await session.execute(query)
            await session.commit()
    @classmethod
    async def delete_by_id(cls,item_id:int):
        async with async_session_maker() as session:
            query = delete(cls.model).where(cls.model.id == item_id)
            await session.execute(query)
            await session.commit()
    
    @classmethod
    async def find_all_by_bill_id(cls, bill_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).filter(cls.model.bill_id == bill_id)
            result = await session.execute(query)
            return result.scalars().all()

    