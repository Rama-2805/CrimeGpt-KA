"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useTheme } from "@/context/ThemeContext";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

interface CrimeTrend {
    month: string;
    crimes: number;
}

export default function AnalyticsPage() {

    const [data, setData] = useState<CrimeTrend[]>([]);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {

        const loadData = async () => {
            try {
                const res = await api.get("/dashboard/crime-trends");
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        loadData();

    }, []);

    const peakMonth =
        data.length > 0
            ? data.reduce((a, b) =>
                a.crimes > b.crimes ? a : b
            )
            : null;

    const highestCrime =
        data.length > 0
            ? Math.max(...data.map((d) => d.crimes))
            : 0;

    return (
        <DashboardLayout>

            {/* Header */}

            <div className="mb-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm dark:shadow-xl relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/20 dark:from-blue-950/20 via-white dark:via-slate-900 to-white dark:to-slate-900 transition-colors">

                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                    Crime Analytics 📊
                </h1>

                <p className="mt-3 text-slate-500 dark:text-slate-350">
                    Analyze crime trends across Karnataka using AI-powered intelligence.
                </p>

            </div>

            {/* KPI Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">

                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Months Available
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-slate-900 dark:text-slate-100">
                        {data.length}
                    </h2>

                </div>

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">

                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Peak Month
                    </p>

                    <h2 className="text-3xl font-bold mt-3 text-indigo-600 dark:text-indigo-400">
                        {peakMonth ? peakMonth.month : "-"}
                    </h2>

                </div>

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">

                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Highest Crimes
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-orange-655 dark:text-orange-400">
                        {highestCrime}
                    </h2>

                </div>

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">

                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Trend
                    </p>

                    <h2 className="text-3xl font-bold mt-3 text-emerald-600 dark:text-emerald-400">
                        Stable
                    </h2>

                </div>

            </div>

            {/* Chart */}

            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl">

                <h2 className="text-2xl font-bold text-slate-808 dark:text-slate-100 mb-6">
                    Monthly Crime Trend
                </h2>

                <div className="h-112.5">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <LineChart data={data}>

                            <CartesianGrid stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeDasharray="3 3" opacity={0.4} />

                            <XAxis dataKey="month" stroke={isDark ? "#64748b" : "#94a3b8"} tick={{ fill: isDark ? '#94a3b8' : '#475569' }} />

                            <YAxis stroke={isDark ? "#64748b" : "#94a3b8"} tick={{ fill: isDark ? '#94a3b8' : '#475569' }} />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                                    borderColor: isDark ? '#1e293b' : '#e2e8f0',
                                    borderRadius: '8px',
                                    color: isDark ? '#f8fafc' : '#0f172a'
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="crimes"
                                stroke="#3b82f6"
                                strokeWidth={4}
                                dot={{ fill: '#3b82f6', r: 4 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </DashboardLayout>
    );
}