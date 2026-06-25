from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


from sqlalchemy.orm import Session
from fastapi import Depends

from app.database.database import get_db
from app.database.models import FIR


@router.get("")
def dashboard(db: Session = Depends(get_db)):

    total = db.query(FIR).count()

    open_cases = db.query(FIR).filter(FIR.status == "Open").count()

    investigating = (
        db.query(FIR)
        .filter(FIR.status == "Investigating")
        .count()
    )

    closed = (
        db.query(FIR)
        .filter(FIR.status == "Closed")
        .count()
    )

    return {
        "total_firs": total,
        "open_cases": open_cases,
        "investigating": investigating,
        "closed": closed,
    }


@router.get("/crime-trends")
def crime_trends():
    return [
        {"month": "Jan", "crimes": 120},
        {"month": "Feb", "crimes": 180},
        {"month": "Mar", "crimes": 240},
        {"month": "Apr", "crimes": 190},
        {"month": "May", "crimes": 310},
        {"month": "Jun", "crimes": 280},
    ]


@router.get("/crime-categories")
def crime_categories():
    return [
        {"name": "Theft", "value": 320},
        {"name": "Murder", "value": 120},
        {"name": "Cyber Crime", "value": 250},
        {"name": "Fraud", "value": 180},
        {"name": "Robbery", "value": 90},
    ]


@router.get("/recent-firs")
def recent_firs():
    return [
        {
            "fir": "FIR001",
            "crime": "Theft",
            "district": "Bengaluru Urban",
            "status": "Open",
            "date": "25-Jun-2026",
        },
        {
            "fir": "FIR002",
            "crime": "Cyber Crime",
            "district": "Mysuru",
            "status": "Investigating",
            "date": "24-Jun-2026",
        },
    ]


@router.get("/district-analysis")
def district_analysis():
    return [
        {"district": "Bengaluru Urban", "crimes": 980},
        {"district": "Mysuru", "crimes": 720},
        {"district": "Mangaluru", "crimes": 530},
        {"district": "Belagavi", "crimes": 410},
    ]