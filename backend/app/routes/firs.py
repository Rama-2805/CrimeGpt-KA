from typing import List
from sqlalchemy import func
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.database.database import get_db
from app.database.models import FIR
from app.schemas.fir import FIRCreate, FIROut

router = APIRouter(
    prefix="/firs",
    tags=["FIR Management"],
)


@router.get("", response_model=List[FIROut])
def get_firs(db: Session = Depends(get_db)):
    return db.query(FIR).all()


@router.get("/{fir_id}", response_model=FIROut)
def get_fir(fir_id: int, db: Session = Depends(get_db)):
    fir = db.query(FIR).filter(FIR.id == fir_id).first()

    if not fir:
        raise HTTPException(status_code=404, detail="FIR not found")

    return fir


@router.post("", response_model=FIROut)
def create_fir(fir: FIRCreate, db: Session = Depends(get_db)):

    fir_number = fir.fir.strip().upper()

    existing = (
        db.query(FIR)
        .filter(func.lower(FIR.fir) == fir_number.lower())
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="FIR number already exists."
        )

    data = fir.model_dump()

    data["fir"] = fir_number
    data["crime"] = fir.crime.strip().title()
    data["district"] = fir.district.strip().title()
    data["police_station"] = fir.police_station.strip().title()
    data["status"] = fir.status.title()
    data["priority"] = fir.priority.title()

    new_fir = FIR(**data)

    db.add(new_fir)
    db.commit()
    db.refresh(new_fir)

    return new_fir

@router.put("/{fir_id}", response_model=FIROut)
def update_fir(
    fir_id: int,
    updated: FIRCreate,
    db: Session = Depends(get_db),
):
    fir = db.query(FIR).filter(FIR.id == fir_id).first()

    if not fir:
        raise HTTPException(status_code=404, detail="FIR not found")

    fir_number = updated.fir.strip().upper()

    duplicate = (
        db.query(FIR)
        .filter(
            func.lower(FIR.fir) == fir_number.lower(),
            FIR.id != fir_id,
        )
        .first()
    )

    if duplicate:
        raise HTTPException(
            status_code=400,
            detail="FIR number already exists."
        )

        fir.fir = fir_number
        fir.crime = updated.crime
        fir.district = updated.district
        fir.police_station = updated.police_station
        fir.address = updated.address
        fir.latitude = updated.latitude
        fir.longitude = updated.longitude
        fir.priority = updated.priority
        fir.status = updated.status
        fir.evidence = updated.evidence
        fir.date = updated.date

        db.commit()
        db.refresh(fir)

        return fir