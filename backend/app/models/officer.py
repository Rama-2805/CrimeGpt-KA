from sqlalchemy import Column, Integer, String

from app.database.database import Base


class Officer(Base):
    __tablename__ = "officers"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    badge = Column(String, unique=True)

    district = Column(String)

    rank = Column(String)

    phone = Column(String)