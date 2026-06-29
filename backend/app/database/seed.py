from random import choice, uniform, randint
from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.database.database import Base, engine, SessionLocal
from app.database.models import FIR


def create_database():
    Base.metadata.create_all(bind=engine)


districts = {
    "Bengaluru Urban": (
        ["Cubbon Park", "Whitefield", "Electronic City"],
        [
            "Cubbon Park PS",
            "Whitefield PS",
            "Electronic City PS",
        ],
        (12.90, 13.08),
        (77.45, 77.75),
    ),

    "Mysuru": (
        ["VV Puram", "Nazarbad", "Kuvempunagar"],
        [
            "VV Puram PS",
            "Nazarbad PS",
            "Kuvempunagar PS",
        ],
        (12.20, 12.38),
        (76.58, 76.72),
    ),

    "Belagavi": (
        ["Tilakwadi", "Camp", "Shahapur"],
        [
            "Tilakwadi PS",
            "Camp PS",
            "Shahapur PS",
        ],
        (15.78, 15.92),
        (74.46, 74.58),
    ),

    "Hubballi": (
        ["Vidyanagar", "Old Hubli", "Gokul Road"],
        [
            "Vidyanagar PS",
            "Old Hubli PS",
            "Gokul Road PS",
        ],
        (15.30, 15.42),
        (75.08, 75.22),
    ),

    "Mangaluru": (
        ["Kadri", "Surathkal", "Kankanady"],
        [
            "Kadri PS",
            "Surathkal PS",
            "Kankanady PS",
        ],
        (12.84, 12.96),
        (74.82, 74.94),
        ),
}

crimes = [
    "Theft",
    "Robbery",
    "Murder",
    "Cyber Crime",
    "Fraud",
    "Assault",
    "Kidnapping",
    "Vehicle Theft",
    "Drug Trafficking",
    "Domestic Violence",
]

priorities = [
    "Low",
    "Medium",
    "High",
    "Critical",
]

statuses = [
    "Open",
    "Investigating",
    "Closed",
]
def seed_data():

    db: Session = SessionLocal()

    if db.query(FIR).count() > 0:
        print("Database already contains data.")
        db.close()
        return

    firs = []

    start_date = datetime(2026, 1, 1)

    for i in range(1, 51):

        district = choice(list(districts.keys()))

        areas, stations, lat_range, lon_range = districts[district]

        area = choice(areas)
        police_station = choice(stations)

        latitude = round(
            uniform(lat_range[0], lat_range[1]), 6
        )

        longitude = round(
            uniform(lon_range[0], lon_range[1]), 6
        )

        firs.append(
            FIR(
                fir=f"FIR{i:04}",
                crime=choice(crimes),
                district=district,
                police_station=police_station,
                address=f"{randint(1,250)}, {area}",
                latitude=latitude,
                longitude=longitude,
                priority=choice(priorities),
                status=choice(statuses),
                evidence=f"evidence_{i}.jpg",
                date=(
                    start_date +
                    timedelta(days=randint(0,180))
                ).strftime("%Y-%m-%d"),
            )
        )

    db.add_all(firs)
    db.commit()
    db.close()

    print("✅ 50 FIR records inserted successfully.")
if __name__ == "__main__":
    create_database()
    seed_data()