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
} from "recharts";

interface PriorityData {
    priority: string;
    count: number;
}

export default function PriorityChart() {
    const [data, setData] = useState<PriorityData[]>([]);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(
                    "/dashboard/priority-analysis"
                );

                setData(response.data);

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-xl p-6">

            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                Priority Distribution
            </h2>

            <div className="h-80">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart data={data}>

                        <CartesianGrid stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeDasharray="3 3" opacity={0.4} />

                        <XAxis dataKey="priority" stroke={isDark ? "#64748b" : "#94a3b8"} tick={{ fill: isDark ? '#94a3b8' : '#475569' }} />

                        <YAxis stroke={isDark ? "#64748b" : "#94a3b8"} tick={{ fill: isDark ? '#94a3b8' : '#475569' }} />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                                borderColor: isDark ? '#1e293b' : '#e2e8f0',
                                borderRadius: '8px',
                                color: isDark ? '#f8fafc' : '#0f172a'
                            }}
                        />

                        <Bar
                            dataKey="count"
                            fill="#06b6d4"
                            radius={[6, 6, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}