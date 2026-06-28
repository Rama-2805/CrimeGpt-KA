"use client";

import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "@/context/ThemeContext";

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
    const { theme } = useTheme();
    const isDark = theme === "dark";

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
                border: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0"
            }}
        >
            <TileLayer
                key={theme}
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
                url={isDark 
                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                }
            />

            <LocationMarker
                latitude={latitude}
                longitude={longitude}
                onLocationChange={onLocationChange}
            />
        </MapContainer>
    );
}