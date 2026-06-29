"use client";

import { useTheme } from "@/context/ThemeContext";
import DashboardLayout from "@/components/layout/DashboardLayout";

import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";

const baseNodes = [
    {
        id: "1",
        position: { x: 250, y: 20 },
        data: { label: "👤 Rahul (Suspect)" },
        type: "suspect"
    },
    {
        id: "2",
        position: { x: 70, y: 180 },
        data: { label: "🚔 FIR001\nTheft" },
        type: "fir"
    },
    {
        id: "3",
        position: { x: 430, y: 180 },
        data: { label: "🚔 FIR005\nRobbery" },
        type: "fir"
    },
    {
        id: "4",
        position: { x: 250, y: 360 },
        data: { label: "👤 Ajay (Suspect)" },
        type: "suspect"
    },
    {
        id: "5",
        position: { x: 600, y: 360 },
        data: { label: "👤 Unknown" },
        type: "unknown"
    },
];

export default function NetworkPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const formattedNodes = baseNodes.map((node) => {
        let style = {};
        if (isDark) {
            if (node.type === "suspect") {
                style = { background: '#0f172a', color: '#f8fafc', border: '1px solid #f43f5e', borderRadius: '8px', padding: '10px', boxShadow: '0 0 12px rgba(244, 63, 94, 0.25)' };
            } else if (node.type === "fir") {
                style = { background: '#0f172a', color: '#f8fafc', border: '1px solid #3b82f6', borderRadius: '8px', padding: '10px', boxShadow: '0 0 12px rgba(59, 130, 246, 0.2)' };
            } else {
                style = { background: '#0f172a', color: '#f8fafc', border: '1px solid #64748b', borderRadius: '8px', padding: '10px' };
            }
        } else {
            if (node.type === "suspect") {
                style = { background: '#fff1f2', color: '#9f1239', border: '1px solid #f43f5e', borderRadius: '8px', padding: '10px', boxShadow: '0 0 10px rgba(244, 63, 94, 0.1)' };
            } else if (node.type === "fir") {
                style = { background: '#eff6ff', color: '#1e40af', border: '1px solid #3b82f6', borderRadius: '8px', padding: '10px', boxShadow: '0 0 10px rgba(59, 130, 246, 0.1)' };
            } else {
                style = { background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px' };
            }
        }
        return { ...node, style };
    });

    const formattedEdges = [
        {
            id: "e1",
            source: "1",
            target: "2",
            animated: true,
            style: { stroke: '#f43f5e', strokeWidth: 2 }
        },
        {
            id: "e2",
            source: "1",
            target: "3",
            animated: true,
            style: { stroke: '#f43f5e', strokeWidth: 2 }
        },
        {
            id: "e3",
            source: "2",
            target: "4",
            style: { stroke: '#3b82f6', strokeWidth: 2 }
        },
        {
            id: "e4",
            source: "3",
            target: "5",
            style: { stroke: isDark ? '#64748b' : '#cbd5e1', strokeWidth: 2 }
        },
    ];

    return (

        <DashboardLayout>

            {/* Header */}

            <div className="mb-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm dark:shadow-xl relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-50/20 dark:from-blue-955/20 via-white dark:via-slate-900 to-white dark:to-slate-900 transition-colors">

                <h1 className="text-4xl font-bold text-slate-805 dark:text-slate-100">
                    Criminal Network Intelligence 🌐
                </h1>

                <p className="mt-3 text-slate-500 dark:text-slate-350">
                    AI-powered relationship analysis between suspects, FIRs and investigations.
                </p>

            </div>

            {/* KPI */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">

                    <p className="text-slate-500 dark:text-slate-400">
                        Connected FIRs
                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-slate-900 dark:text-slate-100">
                        24
                    </h2>

                </div>

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">

                    <p className="text-slate-500 dark:text-slate-400">
                        Suspects
                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-slate-900 dark:text-slate-100">
                        11
                    </h2>

                </div>

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">

                    <p className="text-slate-550 dark:text-slate-400">
                        Criminal Networks
                    </p>

                    <h2 className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">
                        5
                    </h2>

                </div>

                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg">

                    <p className="text-slate-550 dark:text-slate-400">
                        AI Confidence
                    </p>

                    <h2 className="text-4xl font-bold text-emerald-605 dark:text-emerald-400 mt-2">
                        94%
                    </h2>

                </div>

            </div>

            {/* Graph */}

            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-8 shadow-sm dark:shadow-xl">

                <h2 className="text-2xl font-bold text-slate-808 dark:text-slate-100 mb-6">
                    Investigation Network
                </h2>

                <div style={{ height: 550 }} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-955 transition-colors">

                    <ReactFlow
                        nodes={formattedNodes}
                        edges={formattedEdges}
                        fitView
                    >

                        <MiniMap style={{ background: isDark ? '#0f172a' : '#ffffff', border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0' }} nodeColor="#3b82f6" maskColor={isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.6)"} />

                        <Controls className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 fill-slate-800 dark:fill-slate-100" />

                        <Background color={isDark ? "#334155" : "#cbd5e1"} gap={16} />

                    </ReactFlow>

                </div>

            </div>

            {/* AI */}

            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl">

                <h2 className="text-2xl font-bold text-slate-808 dark:text-slate-100 mb-6">
                    🤖 AI Relationship Analysis
                </h2>

                <div className="space-y-4">

                    <div className="bg-red-50 dark:bg-red-955/20 border-l-4 border-red-500 p-4 rounded text-slate-700 dark:text-slate-200">

                        Rahul is linked to multiple FIRs.

                    </div>

                    <div className="bg-orange-50 dark:bg-orange-955/20 border-l-4 border-orange-500 p-4 rounded text-slate-700 dark:text-slate-200">

                        FIR001 and FIR005 may belong to the same criminal network.

                    </div>

                    <div className="bg-blue-50 dark:bg-blue-955/20 border-l-4 border-blue-500 p-4 rounded text-slate-700 dark:text-slate-200">

                        Recommend monitoring repeat suspects.

                    </div>

                    <div className="bg-green-50 dark:bg-green-955/20 border-l-4 border-green-500 p-4 rounded text-slate-700 dark:text-slate-200">

                        AI Confidence: 94%

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}