"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface CrimeCategory {
    name: string;
    value: number;
}

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
];

export default function CrimeCategoryChart() {
    const [data, setData] = useState<CrimeCategory[]>([]);

    useEffect(() => {
        const fetchCrimeCategories = async () => {
            try {
                const response = await api.get("/dashboard/crime-categories");
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch crime categories:", error);
            }
        };

        fetchCrimeCategories();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
            <h2 className="text-lg font-semibold mb-4">
                Crime Categories
            </h2>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={110}
                            label
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}