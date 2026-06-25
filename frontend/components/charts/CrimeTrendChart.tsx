"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

interface CrimeTrend {
    month: string;
    crimes: number;
}

export default function CrimeTrendChart() {
    const [data, setData] = useState<CrimeTrend[]>([]);

    useEffect(() => {
        const fetchCrimeTrends = async () => {
            try {
                const response = await api.get("/dashboard/crime-trends");
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch crime trends:", error);
            }
        };

        fetchCrimeTrends();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">
                Monthly Crime Trend
            </h2>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="crimes"
                            stroke="#2563eb"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}