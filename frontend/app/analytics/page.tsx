"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("/dashboard/crime-trends").then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <main className="min-h-screen bg-gray-950 text-white p-8">
            <h1 className="text-4xl font-bold mb-8">
                Crime Analytics
            </h1>

            <div className="bg-gray-900 p-6 rounded-xl">
                <h2 className="text-xl mb-4">
                    Monthly Crime Trends
                </h2>

                <div className="h-100">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="crimes"
                                stroke="#3b82f6"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </main>
    );
}