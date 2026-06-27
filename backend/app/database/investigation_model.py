from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database.database import Base


class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(Integer, primary_key=True, index=True)

    fir_id = Column(Integer, ForeignKey("firs.id"))

    officer = Column(String)

    notes = Column(Text)

    progress = Column(Integer, default=0)

    status = Column(String, default="Assigned")