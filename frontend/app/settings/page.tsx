"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {

    const [notifications, setNotifications] = useState(true);
    const [autoReports, setAutoReports] = useState(true);
    const [confidence, setConfidence] = useState(85);

    return (
        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}
                <div className="mb-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm dark:shadow-xl relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-50/20 dark:from-blue-955/20 via-white dark:via-slate-900 to-white dark:to-slate-900 transition-colors">

                    <h1 className="text-3xl font-bold text-slate-808 dark:text-slate-100">
                        System Settings ⚙️
                    </h1>

                    <p className="mt-2 text-slate-500 dark:text-slate-350">
                        Configure CrimeGPT-KA system preferences.
                    </p>

                </div>

                {/* System Info */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">

                        <h2 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4">
                            Organization
                        </h2>

                        <div className="space-y-2 text-slate-600 dark:text-slate-300">
                            <p><b>Department:</b> Karnataka Police Department</p>
                            <p><b>Platform:</b> CrimeGPT-KA Command Center</p>
                            <p><b>Version:</b> 1.0.0 (Production)</p>
                            <p><b>AI Engine:</b> CrimeGPT Intelligence Agent</p>
                        </div>

                    </div>

                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">

                        <h2 className="font-bold text-xl text-slate-850 dark:text-slate-100 mb-4">
                            System Status
                        </h2>

                        <div className="space-y-2 text-slate-600 dark:text-slate-350 font-medium">
                            <p className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                Backend API : Online
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                Database : Connected
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                AI Engine : Active
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                Map Service : Running
                            </p>
                        </div>

                    </div>

                </div>

                {/* Preferences */}

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">

                    <h2 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-6">
                        Preferences
                    </h2>

                    <div className="space-y-6 text-slate-650 dark:text-slate-300">

                        <div className="flex justify-between items-center">

                            <span>Enable Notifications</span>

                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={() =>
                                    setNotifications(!notifications)
                                }
                                className="w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-slate-850 bg-white dark:bg-slate-955 accent-blue-500"
                            />

                        </div>

                        <div className="flex justify-between items-center">

                            <span>Auto Generate Reports</span>

                            <input
                                type="checkbox"
                                checked={autoReports}
                                onChange={() =>
                                    setAutoReports(!autoReports)
                                }
                                className="w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-slate-855 bg-white dark:bg-slate-955 accent-blue-500"
                            />

                        </div>

                        <div>

                            <p className="mb-2">
                                AI Confidence Threshold : {confidence}%
                            </p>

                            <input
                                type="range"
                                min="50"
                                max="100"
                                value={confidence}
                                onChange={(e) =>
                                    setConfidence(Number(e.target.value))
                                }
                                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />

                        </div>

                    </div>

                </div>

                {/* Save */}

                <button
                    onClick={() => alert("Settings Saved Successfully")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-md transition font-semibold cursor-pointer"
                >
                    Save Settings
                </button>

            </div>

        </DashboardLayout>
    );
}