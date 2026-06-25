from sqlalchemy.orm import Session

from app.database.database import Base, engine, SessionLocal
from app.database.models import FIR


def create_database():
    Base.metadata.create_all(bind=engine)


def seed_data():
    db: Session = SessionLocal()

    # Don't insert again if data already exists
    if db.query(FIR).count() > 0:
        print("Database already contains data.")
        db.close()
        return

    firs = [
        FIR(
            fir="FIR001",
            crime="Theft",
            district="Bengaluru Urban",
            status="Open",
            date="25-Jun-2026",
        ),
        FIR(
            fir="FIR002",
            crime="Cyber Crime",
            district="Mysuru",
            status="Investigating",
            date="24-Jun-2026",
        ),
        FIR(
            fir="FIR003",
            crime="Fraud",
            district="Mangaluru",
            status="Closed",
            date="23-Jun-2026",
        ),
        FIR(
            fir="FIR004",
            crime="Robbery",
            district="Belagavi",
            status="Open",
            date="22-Jun-2026",
        ),
        FIR(
            fir="FIR005",
            crime="Murder",
            district="Hubballi",
            status="Investigating",
            date="21-Jun-2026",
        ),
    ]

    db.add_all(firs)
    db.commit()
    db.close()

    print("✅ Sample FIR data inserted.")


if __name__ == "__main__":
    create_database()
    seed_data()