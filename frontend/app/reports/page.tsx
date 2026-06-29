"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { generateCrimeReport } from "@/services/pdfService";
import { exportCSV } from "@/services/csvService";
export default function ReportsPage() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {

        const loadData = async () => {

            try {

                const statsResponse = await api.get("/dashboard");
                setStats(statsResponse.data);

                const firResponse = await api.get("/firs");
                setFirs(firResponse.data);

            } catch (err) {

                console.error(err);

            }

        };

        loadData();

    }, []);
    const [firs, setFirs] = useState<any[]>([]);
    return (
        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}

                <div className="mb-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm dark:shadow-xl relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-50/20 dark:from-blue-955/20 via-white dark:via-slate-900 to-white dark:to-slate-900 transition-colors">

                    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                        Crime Intelligence Reports 📄
                    </h1>

                    <p className="mt-3 text-slate-500 dark:text-slate-350">
                        Generate, download and analyze crime reports.
                    </p>

                </div>

                {/* Action Buttons */}

                <div className="flex gap-4">

                    <button
                        onClick={() => {
                            if (!stats) {
                                alert("Dashboard data is still loading.");
                                return;
                            }

                            generateCrimeReport(stats);
                        }}
                        className="bg-rose-50 hover:bg-rose-105 dark:bg-rose-955/25 dark:hover:bg-rose-900/25 border border-rose-200 dark:border-rose-800/40 text-rose-700 dark:text-rose-350 px-6 py-3 rounded-xl transition font-semibold cursor-pointer"
                    >
                        Export PDF
                    </button>

                    <button
                        onClick={() => exportCSV(firs)}
                        className="bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-955/20 dark:hover:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-355 px-6 py-3 rounded-xl transition font-semibold cursor-pointer"
                    >
                        Export CSV
                    </button>

                    <button
                        onClick={() => window.print()}
                        className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-955/20 dark:hover:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-355 px-6 py-3 rounded-xl transition font-semibold cursor-pointer"
                    >
                        Print Report
                    </button>

                </div>

                {/* Summary Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">
                        <p className="text-slate-505 dark:text-slate-400 font-medium">Total FIRs</p>
                        <h2 className="text-4xl font-bold mt-2 text-slate-900 dark:text-slate-100">
                            {stats?.total_firs ?? 0}
                        </h2>
                    </div>

                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">
                        <p className="text-slate-505 dark:text-slate-400 font-medium">Open Cases</p>
                        <h2 className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">
                            {stats?.open_cases ?? 0}
                        </h2>
                    </div>

                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">
                        <p className="text-slate-550 dark:text-slate-400 font-medium">Closed Cases</p>
                        <h2 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                            {stats?.closed ?? 0}
                        </h2>
                    </div>

                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">
                        <p className="text-slate-550 dark:text-slate-400 font-medium">High Priority</p>
                        <h2 className="text-4xl font-bold text-orange-655 dark:text-orange-400 mt-2">
                            {stats?.high_priority ?? 0}
                        </h2>
                    </div>

                </div>

                {/* AI Summary */}

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl">

                    <h2 className="text-2xl font-bold text-slate-808 dark:text-slate-100 mb-6">
                        🤖 AI Crime Summary
                    </h2>

                    <ul className="space-y-3 text-slate-600 dark:text-slate-300 list-none pl-0">

                        <li className="flex items-center gap-2">
                            <span>📍</span>
                            <span><strong>Highest Crime District:</strong> Bengaluru Urban</span>
                        </li>

                        <li className="flex items-center gap-2">
                            <span>🚨</span>
                            <span><strong>Most Reported Crime:</strong> Theft</span>
                        </li>

                        <li className="flex items-center gap-2">
                            <span>⚠</span>
                            <span><strong>High Priority Cases:</strong> 8</span>
                        </li>

                        <li className="flex items-center gap-2">
                            <span>👮</span>
                            <span><strong>Recommendation:</strong> Increase patrols and surveillance in high-risk areas.</span>
                        </li>

                    </ul>

                </div>

            </div>

        </DashboardLayout>
    );

}