from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from collections import defaultdict
from datetime import datetime
from app.database.database import get_db
from app.database.models import FIR
router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


from sqlalchemy.orm import Session
from fastapi import Depends
from sqlalchemy import func

from app.database.database import get_db



@router.get("")
def dashboard(db: Session = Depends(get_db)):

    total = db.query(FIR).count()

    open_cases = db.query(FIR).filter(FIR.status == "Open").count()

    investigating = db.query(FIR).filter(
        FIR.status == "Investigating"
    ).count()

    closed = db.query(FIR).filter(
        FIR.status == "Closed"
    ).count()

    high_priority = db.query(FIR).filter(
        FIR.priority == "High"
    ).count()

    critical_priority = db.query(FIR).filter(
        FIR.priority == "Critical"
    ).count()

    districts = db.query(
        func.count(func.distinct(FIR.district))
    ).scalar()

    return {
        "total_firs": total,
        "open_cases": open_cases,
        "investigating": investigating,
        "closed": closed,
        "high_priority": high_priority,
        "critical_priority": critical_priority,
        "districts": districts,
    }

from collections import defaultdict
from datetime import datetime

@router.get("/crime-trends")
def crime_trends(db: Session = Depends(get_db)):

    firs = db.query(FIR).all()

    monthly = defaultdict(int)

    for fir in firs:
        try:
            month = datetime.strptime(
                fir.date,
                "%Y-%m-%d"
            ).strftime("%b")
        except:
            month = fir.date

        monthly[month] += 1

    month_order = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ]

    result = []

    for month in month_order:
        if month in monthly:
            result.append({
                "month": month,
                "crimes": monthly[month],
            })

    return result


from sqlalchemy import func

@router.get("/crime-categories")
def crime_categories(db: Session = Depends(get_db)):

    data = (
        db.query(
            FIR.crime,
            func.count(FIR.id).label("value")
        )
        .group_by(FIR.crime)
        .order_by(func.count(FIR.id).desc())
        .all()
    )

    return [
        {
            "name": row.crime,
            "value": row.value,
        }
        for row in data
    ]


@router.get("/recent-firs")
def recent_firs(db: Session = Depends(get_db)):

    firs = (
        db.query(FIR)
        .order_by(FIR.id.desc())
        .limit(10)
        .all()
    )

    return [
        {
            "fir": fir.fir,
            "crime": fir.crime,
            "district": fir.district,
            "status": fir.status,
            "date": fir.date,
        }
        for fir in firs
    ]


from sqlalchemy import func

@router.get("/district-analysis")
def district_analysis(db: Session = Depends(get_db)):

    data = (
        db.query(
            FIR.district,
            func.count(FIR.id).label("crimes")
        )
        .group_by(FIR.district)
        .order_by(func.count(FIR.id).desc())
        .all()
    )

    return [
        {
            "district": row.district,
            "crimes": row.crimes,
        }
        for row in data
    ]

@router.get("/ai-insights")
def ai_insights(db: Session = Depends(get_db)):

    total = db.query(FIR).count()

    if total == 0:
        return {
            "summary": "No FIR data available.",
            "highest_district": "-",
            "highest_crime": "-",
            "high_priority": 0,
            "open_cases": 0,
        }

    # Highest crime district
    district = (
        db.query(
            FIR.district,
            func.count(FIR.id).label("count")
        )
        .group_by(FIR.district)
        .order_by(func.count(FIR.id).desc())
        .first()
    )

    # Most common crime
    crime = (
        db.query(
            FIR.crime,
            func.count(FIR.id).label("count")
        )
        .group_by(FIR.crime)
        .order_by(func.count(FIR.id).desc())
        .first()
    )

    high_priority = db.query(FIR).filter(
        FIR.priority.in_(["High", "Critical"])
    ).count()

    open_cases = db.query(FIR).filter(
        FIR.status == "Open"
    ).count()

    summary = (
        f"CrimeGPT Analysis: {crime.crime} is currently the most reported "
        f"crime. {district.district} has the highest FIR count. "
        f"There are {open_cases} open investigations and "
        f"{high_priority} high-priority cases requiring attention."
    )

    return {
        "summary": summary,
        "highest_district": district.district,
        "highest_crime": crime.crime,
        "high_priority": high_priority,
        "open_cases": open_cases,
    }

@router.get("/priority-analysis")
def priority_analysis(db: Session = Depends(get_db)):

    data = (
        db.query(
            FIR.priority,
            func.count(FIR.id).label("count")
        )
        .group_by(FIR.priority)
        .all()
    )

    return [
        {
            "priority": row.priority,
            "count": row.count,
        }
        for row in data
    ]

@router.get("/status-analysis")
def status_analysis(db: Session = Depends(get_db)):

    data = (
        db.query(
            FIR.status,
            func.count(FIR.id).label("count")
        )
        .group_by(FIR.status)
        .all()
    )

    return [
        {
            "status": row.status,
            "count": row.count,
        }
        for row in data
    ]

@router.get("/crime-analysis")
def crime_analysis(db: Session = Depends(get_db)):

    data = (
        db.query(
            FIR.crime,
            func.count(FIR.id).label("count")
        )
        .group_by(FIR.crime)
        .all()
    )

    return [
        {
            "crime": row.crime,
            "count": row.count,
        }
        for row in data
    ]