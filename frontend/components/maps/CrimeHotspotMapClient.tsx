"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useTheme } from "@/context/ThemeContext";

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
    const { theme } = useTheme();
    const isDark = theme === "dark";

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
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-xl p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                Crime Hotspots - Karnataka
            </h2>

            <MapContainer
                center={[15.3173, 75.7139]}
                zoom={7}
                scrollWheelZoom={true}
                className="h-125 w-full rounded-lg border border-slate-200 dark:border-slate-800"
            >
                <TileLayer
                    key={theme}
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
                    url={isDark 
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    }
                />

                {hotspots.map((spot, index) => (
                    <Marker
                        key={index}
                        position={[spot.lat, spot.lng]}
                    >
                        <Popup>
                            <div className="text-slate-950">
                                <strong>{spot.district}</strong>
                                <br />
                                Crime: {spot.crime}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}