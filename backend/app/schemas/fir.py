from pydantic import BaseModel

class FIRCreate(BaseModel):
    fir: str
    crime: str
    district: str
    police_station: str
    address: str
    latitude: float
    longitude: float
    priority: str
    status: str
    evidence: str
    date: str


class FIROut(FIRCreate):
    id: int

    class Config:
        from_attributes = True