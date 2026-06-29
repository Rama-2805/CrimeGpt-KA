"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import CrimeTrendChart from "@/components/charts/CrimeTrendChart";
import CrimeCategoryChart from "@/components/charts/CrimeCategoryChart";
import DistrictCrimeChart from "@/components/charts/DistrictCrimeChart";
import PriorityChart from "@/components/charts/PriorityChart";
import RecentCasesTable from "@/components/dashboard/RecentCasesTable";
import CrimeHotspotMap from "@/components/maps/CrimeHotspotMap";
import AIInsightsCard from "@/components/dashboard/AIInsightsCard";

interface DashboardStats {
    total_firs: number;
    open_cases: number;
    investigating: number;
    closed: number;
    high_priority: number;
    critical_priority: number;
    districts: number;
}

export default function DashboardPage() {

    const [stats, setStats] = useState<DashboardStats>({
        total_firs: 0,
        open_cases: 0,
        investigating: 0,
        closed: 0,
        high_priority: 0,
        critical_priority: 0,
        districts: 0,
    });

    useEffect(() => {

        api.get("/dashboard")
            .then((res) => {
                setStats(res.data);
            })
            .catch(console.error);

    }, []);

    return (

        <DashboardLayout>

            {/* Welcome */}

            <div className="mb-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm dark:shadow-xl relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-50/20 dark:from-blue-950/20 via-white dark:via-slate-900 to-white dark:to-slate-900 transition-colors">

                <h1 className="text-4xl font-bold text-slate-805 dark:text-slate-100">
                    Welcome to CrimeGPT-KA 🚔
                </h1>

                <p className="mt-3 text-slate-500 dark:text-slate-350">
                    AI-powered Crime Intelligence Platform for Karnataka Police.
                </p>

            </div>

            {/* Quick Actions */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

                <button
                    onClick={() => window.location.href = "/firs"}
                    className="bg-white dark:bg-slate-900/40 hover:bg-blue-50 dark:hover:bg-blue-950/20 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 rounded-xl p-5 shadow-sm dark:shadow-lg hover:scale-[1.03] transition-all duration-200 text-left font-semibold flex items-center justify-between cursor-pointer"
                >
                    <span>➕ Add FIR</span>
                    <span className="text-blue-500/50 text-xs">GO →</span>
                </button>

                <button
                    onClick={() => window.location.href = "/analytics"}
                    className="bg-white dark:bg-slate-900/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300 rounded-xl p-5 shadow-sm dark:shadow-lg hover:scale-[1.03] transition-all duration-200 text-left font-semibold flex items-center justify-between cursor-pointer"
                >
                    <span>📊 Analytics</span>
                    <span className="text-emerald-500/50 text-xs">GO →</span>
                </button>

                <button
                    onClick={() => window.location.href = "/hotspots"}
                    className="bg-white dark:bg-slate-900/40 hover:bg-purple-50 dark:hover:bg-purple-950/20 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 text-slate-700 dark:text-slate-300 hover:text-purple-650 dark:hover:text-purple-300 rounded-xl p-5 shadow-sm dark:shadow-lg hover:scale-[1.03] transition-all duration-200 text-left font-semibold flex items-center justify-between cursor-pointer"
                >
                    <span>📍 Hotspots</span>
                    <span className="text-purple-500/50 text-xs">GO →</span>
                </button>

                <button
                    onClick={() => window.location.href = "/reports"}
                    className="bg-white dark:bg-slate-900/40 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-300 rounded-xl p-5 shadow-sm dark:shadow-lg hover:scale-[1.03] transition-all duration-200 text-left font-semibold flex items-center justify-between cursor-pointer"
                >
                    <span>📄 Reports</span>
                    <span className="text-rose-500/50 text-xs">GO →</span>
                </button>

            </div>

            {/* KPI */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <StatCard title="Total FIRs" value={stats.total_firs.toString()} />

                <StatCard title="Open Cases" value={stats.open_cases.toString()} />

                <StatCard title="Investigating" value={stats.investigating.toString()} />

                <StatCard title="Closed Cases" value={stats.closed.toString()} />

                <StatCard title="High Priority" value={stats.high_priority.toString()} />

                <StatCard title="Critical Priority" value={stats.critical_priority.toString()} />

                <StatCard title="Districts Covered" value={stats.districts.toString()} />

            </div>

            {/* Charts */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

                <div className="xl:col-span-2">
                    <CrimeTrendChart />
                </div>

                <CrimeCategoryChart />

            </div>

            {/* Recent FIR */}

            <div className="mt-6">

                <RecentCasesTable />

            </div>

            {/* District */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

                <DistrictCrimeChart />

                <PriorityChart />

            </div>

            {/* Crime Hotspots */}
            <div className="mt-6">

                <CrimeHotspotMap />

            </div>

            {/* AI Insights */}

            <div className="mt-6">

                <AIInsightsCard />

            </div>

            {/* Bottom Section */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

                {/* System Health */}

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-xl p-6">

                    <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
                        🖥 System Health
                    </h2>

                    <div className="space-y-5">

                        <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800/40 pb-2">

                            <span className="font-medium text-slate-600 dark:text-slate-355">
                                Backend API
                            </span>

                            <span className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping inline-block" />
                                Online
                            </span>

                        </div>

                        <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800/40 pb-2">

                            <span className="font-medium text-slate-600 dark:text-slate-355">
                                Database
                            </span>

                            <span className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block" />
                                Connected
                            </span>

                        </div>

                        <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800/40 pb-2">

                            <span className="font-medium text-slate-600 dark:text-slate-355">
                                AI Engine
                            </span>

                            <span className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block" />
                                Running
                            </span>

                        </div>

                        <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800/40 pb-2">

                            <span className="font-medium text-slate-600 dark:text-slate-355">
                                Map Service
                            </span>

                            <span className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block" />
                                Active
                            </span>

                        </div>

                        <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800/40 pb-2">

                            <span className="font-medium text-slate-600 dark:text-slate-355">
                                PDF Reports
                            </span>

                            <span className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block" />
                                Ready
                            </span>

                        </div>

                        <div className="flex justify-between items-center pb-1">

                            <span className="font-medium text-slate-600 dark:text-slate-355">
                                CSV Export
                            </span>

                            <span className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block" />
                                Ready
                            </span>

                        </div>

                    </div>

                </div>

                {/* Recent Activity */}

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-xl p-6">

                    <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
                        📋 Recent Activity
                    </h2>

                    <div className="space-y-5">

                        <div className="border-l-4 border-blue-500/60 pl-4 bg-slate-50 dark:bg-slate-950/20 py-1.5 pr-2 rounded-r-lg">

                            <p className="font-semibold text-slate-800 dark:text-slate-205">
                                FIR Registered
                            </p>

                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                New theft FIR added successfully.
                            </p>

                        </div>

                        <div className="border-l-4 border-emerald-500/60 pl-4 bg-slate-50 dark:bg-slate-950/20 py-1.5 pr-2 rounded-r-lg">

                            <p className="font-semibold text-slate-800 dark:text-slate-205">
                                AI Investigation Completed
                            </p>

                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                Investigation strategy generated using CrimeGPT AI.
                            </p>

                        </div>

                        <div className="border-l-4 border-orange-500/60 pl-4 bg-slate-50 dark:bg-slate-950/20 py-1.5 pr-2 rounded-r-lg">

                            <p className="font-semibold text-slate-800 dark:text-slate-205">
                                Crime Report Generated
                            </p>

                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                PDF report exported successfully.
                            </p>

                        </div>

                        <div className="border-l-4 border-purple-500/60 pl-4 bg-slate-50 dark:bg-slate-950/20 py-1.5 pr-2 rounded-r-lg">

                            <p className="font-semibold text-slate-800 dark:text-slate-205">
                                Hotspot Analysis Updated
                            </p>

                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                AI recalculated crime hotspot locations.
                            </p>

                        </div>

                        <div className="border-l-4 border-rose-500/60 pl-4 bg-slate-50 dark:bg-slate-950/20 py-1.5 pr-2 rounded-r-lg">

                            <p className="font-semibold text-slate-800 dark:text-slate-205">
                                Critical Alert
                            </p>

                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                High-priority cases require immediate attention.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="mt-10 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center text-slate-700 dark:text-white">

                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    CrimeGPT-KA
                </h2>

                <p className="text-slate-600 dark:text-slate-400 mt-2">
                    AI-Powered Crime Intelligence Platform for Karnataka Police
                </p>

                <p className="text-slate-500 dark:text-slate-500 text-sm mt-3">
                    Version 1.0 • Hackathon Prototype • Powered by FastAPI, React & AI
                </p>

            </div>

        </DashboardLayout>

    );

}