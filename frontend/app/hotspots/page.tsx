"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CrimeHotspotMap from "@/components/maps/CrimeHotspotMap";
import api from "@/services/api";

interface Hotspot {
    district: string;
    crime: string;
    lat: number;
    lng: number;
}

export default function HotspotsPage() {

    const [hotspots, setHotspots] = useState<Hotspot[]>([]);

    useEffect(() => {
        api.get("/hotspots")
            .then((res) => {
                setHotspots(res.data);
            })
            .catch(console.error);
    }, []);

    const districtCount: Record<string, number> = {};

    hotspots.forEach((item) => {
        districtCount[item.district] =
            (districtCount[item.district] || 0) + 1;
    });

    const topDistricts = Object.entries(districtCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    return (
        <DashboardLayout>

            {/* Header */}

            <div className="mb-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm dark:shadow-xl relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/20 dark:from-blue-950/20 via-white dark:via-slate-900 to-white dark:to-slate-900 transition-colors">

                <h1 className="text-4xl font-bold text-slate-805 dark:text-slate-100">
                    Crime Hotspot Intelligence 📍
                </h1>

                <p className="mt-3 text-slate-500 dark:text-slate-350">
                    AI-powered monitoring of crime-prone areas across Karnataka.
                </p>

            </div>

            {/* KPI */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">
                    <p className="text-slate-500 dark:text-slate-400">
                        Total Hotspots
                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-slate-900 dark:text-slate-100">
                        {hotspots.length}
                    </h2>
                </div>

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">
                    <p className="text-slate-500 dark:text-slate-400">
                        Districts
                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-slate-900 dark:text-slate-100">
                        {Object.keys(districtCount).length}
                    </h2>
                </div>

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">
                    <p className="text-slate-500 dark:text-slate-400">
                        Critical Zones
                    </p>

                    <h2 className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">
                        {Math.ceil(hotspots.length * 0.35)}
                    </h2>
                </div>

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">
                    <p className="text-slate-500 dark:text-slate-400">
                        Avg Risk
                    </p>

                    <h2 className="text-4xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                        82%
                    </h2>
                </div>

            </div>

            {/* Map */}

            <CrimeHotspotMap />

            {/* Bottom Section */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

                {/* Top Hotspots */}

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-xl p-6">

                    <h2 className="text-2xl font-bold text-slate-808 dark:text-slate-100 mb-6">
                        🔥 Top Hotspot Districts
                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-slate-200 dark:border-slate-800">

                                <th className="text-left py-3 text-slate-600 dark:text-slate-300 font-semibold">
                                    District
                                </th>

                                <th className="text-right text-slate-600 dark:text-slate-300 font-semibold">
                                    FIRs
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {topDistricts.map(([district, count]) => (

                                <tr
                                    key={district}
                                    className="border-b border-slate-200/60 dark:border-slate-800/60"
                                >

                                    <td className="py-3 text-slate-600 dark:text-slate-300">
                                        {district}
                                    </td>

                                    <td className="text-right font-bold text-red-655 dark:text-red-400">
                                        {count}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* AI Recommendations */}

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-xl p-6">

                    <h2 className="text-2xl font-bold text-slate-808 dark:text-slate-100 mb-6">
                        🤖 AI Recommendations
                    </h2>

                    <div className="space-y-4">

                        <div className="bg-red-50 dark:bg-red-955/20 border-l-4 border-red-500 p-4 rounded text-slate-700 dark:text-slate-200">

                            Increase police patrols in the highest crime districts.

                        </div>

                        <div className="bg-orange-50 dark:bg-orange-955/20 border-l-4 border-orange-500 p-4 rounded text-slate-700 dark:text-slate-200">

                            Install additional CCTV surveillance in hotspot locations.

                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-955/20 border-l-4 border-yellow-500 p-4 rounded text-slate-700 dark:text-slate-200">

                            Schedule night patrols between 8 PM and 2 AM.

                        </div>

                        <div className="bg-green-50 dark:bg-green-955/20 border-l-4 border-green-500 p-4 rounded text-slate-700 dark:text-slate-200">

                            Continue monitoring areas with declining crime rates.

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}