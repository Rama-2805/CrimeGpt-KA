"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useTheme } from "@/context/ThemeContext";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
} from "recharts";

interface CrimeCategory {
    name: string;
    value: number;
}

const COLORS = [
    "#3b82f6", // blue
    "#6366f1", // indigo
    "#06b6d4", // cyan
    "#14b8a6", // teal
    "#8b5cf6", // violet
    "#a855f7", // purple
    "#60a5fa", // light blue
    "#818cf8", // light indigo
    "#22d3ee", // light cyan
    "#2dd4bf", // light teal
];

export default function CrimeCategoryChart() {

    const [data, setData] = useState<CrimeCategory[]>([]);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {

        api.get("/dashboard/crime-categories")
            .then((res) => {

                const sorted = [...res.data].sort(
                    (a, b) => b.value - a.value
                );

                setData(sorted);

            })
            .catch(console.error);

    }, []);

    return (

        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-xl p-6 h-full">

            <h2 className="text-2xl font-bold text-slate-805 dark:text-slate-100 mb-6">
                Crime Categories
            </h2>

            <div className="h-[420px]">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 10,
                            right: 20,
                            left: 10,
                            bottom: 10,
                        }}
                    >

                        <CartesianGrid stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeDasharray="3 3" opacity={0.4} />

                        <XAxis type="number" stroke={isDark ? "#64748b" : "#94a3b8"} tick={{ fill: isDark ? '#94a3b8' : '#475569' }} />

                        <YAxis
                            dataKey="name"
                            type="category"
                            width={110}
                            stroke={isDark ? "#64748b" : "#94a3b8"}
                            tick={{ fill: isDark ? '#94a3b8' : '#475569' }}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                                borderColor: isDark ? '#1e293b' : '#e2e8f0',
                                borderRadius: '8px',
                                color: isDark ? '#f8fafc' : '#0f172a'
                            }}
                        />

                        <Bar
                            dataKey="value"
                            radius={[0, 8, 8, 0]}
                        >

                            {data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />

                            ))}

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}