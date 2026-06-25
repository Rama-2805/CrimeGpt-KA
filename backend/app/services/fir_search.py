from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database.models import FIR


def search_firs(query: str, db: Session):

    query = query.lower()

    firs = (
        db.query(FIR)
        .filter(
            or_(
                FIR.fir.ilike(f"%{query}%"),
                FIR.crime.ilike(f"%{query}%"),
                FIR.district.ilike(f"%{query}%"),
                FIR.status.ilike(f"%{query}%"),
            )
        )
        .all()
    )

    return firs