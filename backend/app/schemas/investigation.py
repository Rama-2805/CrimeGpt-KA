from pydantic import BaseModel


class InvestigationCreate(BaseModel):
    fir_id: int
    officer: str
    notes: str
    progress: int
    status: str


class InvestigationOut(InvestigationCreate):
    id: int

    class Config:
        from_attributes = True