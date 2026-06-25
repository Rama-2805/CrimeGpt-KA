from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class SummaryRequest(BaseModel):
    fir: str
    crime: str
    district: str
    police_station: str
    address: str
    priority: str
    status: str
    date: str


@router.post("/summary")
def generate_summary(data: SummaryRequest):

    summary = (
        f"A {data.crime.lower()} case was reported on {data.date} "
        f"in {data.district}. "
        f"The complaint was registered at {data.police_station} Police Station. "
        f"The incident occurred near {data.address}. "
        f"The case is currently {data.status} "
        f"with {data.priority} priority."
    )

    return {
        "summary": summary
    }