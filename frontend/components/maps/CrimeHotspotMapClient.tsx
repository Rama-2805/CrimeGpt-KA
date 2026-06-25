"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    iconUrl: "/leaflet/marker-icon.png",
    shadowUrl: "/leaflet/marker-shadow.png",
});

interface Hotspot {
    district: string;
    crime: string;
    lat: number;
    lng: number;
}

export default function CrimeHotspotMapClient() {
    const [hotspots, setHotspots] = useState<Hotspot[]>([]);

    useEffect(() => {
        const fetchHotspots = async () => {
            try {
                const response = await api.get("/hotspots");
                setHotspots(response.data);
            } catch (error) {
                console.error("Failed to fetch hotspots:", error);
            }
        };

        fetchHotspots();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">
                Crime Hotspots - Karnataka
            </h2>

            <MapContainer
                center={[15.3173, 75.7139]}
                zoom={7}
                scrollWheelZoom={true}
                className="h-125 w-full rounded-lg"
            >
                <TileLayer
                    attribution="© OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {hotspots.map((spot, index) => (
                    <Marker
                        key={index}
                        position={[spot.lat, spot.lng]}
                    >
                        <Popup>
                            <strong>{spot.district}</strong>
                            <br />
                            Crime: {spot.crime}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}