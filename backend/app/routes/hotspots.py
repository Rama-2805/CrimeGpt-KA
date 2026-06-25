from fastapi import APIRouter

router = APIRouter(prefix="/hotspots", tags=["Hotspots"])


@router.get("")
def hotspots():

    return [
        {
            "district": "Bengaluru Urban",
            "crime": "Cyber Crime",
            "lat": 12.9716,
            "lng": 77.5946,
        },
        {
            "district": "Mysuru",
            "crime": "Theft",
            "lat": 12.2958,
            "lng": 76.6394,
        },
        {
            "district": "Mangaluru",
            "crime": "Fraud",
            "lat": 12.9141,
            "lng": 74.8560,
        },
        {
            "district": "Belagavi",
            "crime": "Robbery",
            "lat": 15.8497,
            "lng": 74.4977,
        },
    ]