"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Brain } from "lucide-react";

interface AIInsights {
    summary: string;
    highest_district: string;
    highest_crime: string;
    high_priority: number;
    open_cases: number;
}

export default function AIInsightsCard() {
    const [insights, setInsights] = useState<AIInsights | null>(null);

    useEffect(() => {
        const loadInsights = async () => {
            try {
                const response = await api.get("/dashboard/ai-insights");
                setInsights(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        loadInsights();
    }, []);

    if (!insights) {
        return (
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 p-6 rounded-2xl text-slate-500 dark:text-slate-400">
                Loading AI Insights...
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-white rounded-2xl shadow-sm dark:shadow-xl p-6">

            <div className="flex items-center gap-3 mb-5">
                <Brain className="text-blue-500 dark:text-blue-400 animate-pulse" size={34} />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    CrimeGPT Intelligence Center
                </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-7">
                {insights.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">

                <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Highest Crime District
                    </p>

                    <h3 className="text-xl font-bold mt-2 text-slate-800 dark:text-slate-200">
                        📍 {insights.highest_district}
                    </h3>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Most Reported Crime
                    </p>

                    <h3 className="text-xl font-bold mt-2 text-slate-800 dark:text-slate-200">
                        🚨 {insights.highest_crime}
                    </h3>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        High Priority Cases
                    </p>

                    <h3 className="text-3xl font-bold text-orange-655 dark:text-orange-400 mt-2">
                        {insights.high_priority}
                    </h3>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Open Cases
                    </p>

                    <h3 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                        {insights.open_cases}
                    </h3>
                </div>

                <div className="col-span-1 md:col-span-2 xl:col-span-4 mt-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/20 p-6">

                    <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
                        🤖 AI Recommendations
                    </h3>

                    <ul className="space-y-3 text-slate-600 dark:text-slate-300">

                        <li>
                          <span className="text-emerald-500 dark:text-emerald-400 mr-2">✓</span> Increase patrols in <span className="text-indigo-700 dark:text-indigo-300 font-bold">{insights.highest_district}</span>
                        </li>

                        <li>
                          <span className="text-emerald-500 dark:text-emerald-400 mr-2">✓</span> Deploy additional officers for{" "}
                          <span className="text-indigo-700 dark:text-indigo-300 font-bold">{insights.highest_crime}</span> investigations.
                        </li>

                        <li>
                          <span className="text-yellow-650 dark:text-yellow-400 mr-2">⚠</span> Monitor {insights.open_cases} active investigations.
                        </li>

                        <li>
                          <span className="text-red-500 dark:text-red-400 mr-2">⚠</span> Prioritize {insights.high_priority} high-risk FIRs.
                        </li>

                    </ul>

                </div>

            </div>

        </div>
    );
}