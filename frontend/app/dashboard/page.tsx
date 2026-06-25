"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import CrimeHotspotMap from "@/components/maps/CrimeHotspotMap";
import DistrictCrimeChart from "@/components/charts/DistrictCrimeChart";
import RecentCasesTable from "@/components/dashboard/RecentCasesTable";
import CrimeCategoryChart from "@/components/charts/CrimeCategoryChart";
import CrimeTrendChart from "@/components/charts/CrimeTrendChart";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";

interface DashboardStats {
    total_firs: number;
    open_cases: number;
    investigating: number;
    closed: number;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats>({
        total_firs: 0,
        open_cases: 0,
        investigating: 0,
        closed: 0,
    });

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await api.get("/dashboard");
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            }
        };

        fetchDashboardStats();
    }, []);

    return (
        <DashboardLayout>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                    title="Total FIRs"
                    value={stats.total_firs.toLocaleString()}
                />

                <StatCard
                    title="Open Cases"
                    value={stats.open_cases.toLocaleString()}
                />

                <StatCard
                    title="Investigating"
                    value={stats.investigating.toLocaleString()}
                />

                <StatCard
                    title="Closed Cases"
                    value={stats.closed.toLocaleString()}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
                <div className="xl:col-span-2">
                    <CrimeTrendChart />
                </div>

                <CrimeCategoryChart />
            </div>

            {/* Recent FIRs */}
            <div className="mt-6">
                <RecentCasesTable />
            </div>

            {/* District Crime Analysis */}
            <div className="mt-6">
                <DistrictCrimeChart />
            </div>

            {/* Crime Hotspot Map */}
            <div className="mt-6">
                <CrimeHotspotMap />
            </div>
        </DashboardLayout>
    );
}