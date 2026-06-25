"use client";

import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
    latitude: number;
    longitude: number;
    onLocationChange: (lat: number, lng: number) => void;
}

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({
    latitude,
    longitude,
    onLocationChange,
}: Props) {

    useMapEvents({
        click(e) {
            onLocationChange(e.latlng.lat, e.latlng.lng);
        },
    });

    return (
        <Marker
            position={[latitude, longitude]}
            draggable={true}
            eventHandlers={{
                dragend(e) {
                    const marker = e.target;
                    const pos = marker.getLatLng();
                    onLocationChange(pos.lat, pos.lng);
                },
            }}
        />
    );
}

export default function LocationPicker({
    latitude,
    longitude,
    onLocationChange,
}: Props) {

    if (latitude === 0 || longitude === 0) {
        return null;
    }

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            style={{
                height: "300px",
                width: "100%",
                borderRadius: "12px",
            }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker
                latitude={latitude}
                longitude={longitude}
                onLocationChange={onLocationChange}
            />
        </MapContainer>
    );
}