from sqlalchemy import Column, Integer, String, Float
from app.database.database import Base

class FIR(Base):
    __tablename__ = "firs"

    id = Column(Integer, primary_key=True, index=True)

    fir = Column(String, unique=True, index=True)
    crime = Column(String)

    district = Column(String)
    police_station = Column(String)

    address = Column(String)

    latitude = Column(Float)
    longitude = Column(Float)

    priority = Column(String)

    status = Column(String)

    evidence = Column(String)

    date = Column(String)