from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import FIR

router = APIRouter(
    prefix="/intelligence",
    tags=["Crime Intelligence"],
)


@router.get("/summary")
def summary(db: Session = Depends(get_db)):

    firs = db.query(FIR).all()

    total = len(firs)

    crime_counter = Counter([f.crime for f in firs])

    district_counter = Counter([f.district for f in firs])

    status_counter = Counter([f.status for f in firs])

    top_crime = (
        crime_counter.most_common(1)[0]
        if crime_counter
        else ("None", 0)
    )

    top_district = (
        district_counter.most_common(1)[0]
        if district_counter
        else ("None", 0)
    )

    return {
        "total_firs": total,
        "top_crime": top_crime[0],
        "top_crime_count": top_crime[1],
        "top_district": top_district[0],
        "top_district_count": top_district[1],
        "open_cases": status_counter.get("Open", 0),
        "investigating": status_counter.get("Investigating", 0),
        "closed_cases": status_counter.get("Closed", 0),
    }