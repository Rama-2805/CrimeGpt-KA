"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

interface DistrictCrime {
    district: string;
    crimes: number;
}

export default function DistrictCrimeChart() {
    const [data, setData] = useState<DistrictCrime[]>([]);

    useEffect(() => {
        const fetchDistrictData = async () => {
            try {
                const response = await api.get("/dashboard/district-analysis");
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch district analysis:", error);
            }
        };

        fetchDistrictData();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">
                District-wise Crime Analysis
            </h2>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="district" />

                        <YAxis />

                        <Tooltip />

                        <Bar dataKey="crimes" fill="#2563eb" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}