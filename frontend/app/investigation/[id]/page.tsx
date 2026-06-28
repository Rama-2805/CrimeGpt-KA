"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/services/api";
import {
    createInvestigation,
    updateInvestigation,
    getInvestigations,
} from "@/services/investigationService";

export default function InvestigationPage() {
    const { id } = useParams();

    const [officer, setOfficer] = useState("");
    const [notes, setNotes] = useState("");
    const [progress, setProgress] = useState(0);
    const [investigationId, setInvestigationId] = useState<number | null>(null);
    const [timeline, setTimeline] = useState<string[]>([]);
    const [fir, setFir] = useState<any>(null);
    const [aiInsights, setAiInsights] = useState<any>(null);
    const [loadingAI, setLoadingAI] = useState(false);
    useEffect(() => {
        const loadInvestigation = async () => {
            try {
                const list = await getInvestigations();

                const existing = list.find(
                    (item: any) => item.fir_id === Number(id)
                );

                if (!existing) return;

                setInvestigationId(existing.id);
                setOfficer(existing.officer);
                setNotes(existing.notes);
                setProgress(existing.progress);

            } catch (err) {
                console.error(err);
            }
        };

        loadInvestigation();
        const loadFIR = async () => {
            try {
                const response = await api.get(`/firs/${id}`);
                setFir(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        loadFIR();
    }, [id]);
    const saveInvestigation = async () => {
        try {

            const data = {
                fir_id: Number(id),
                officer,
                notes,
                progress,
                status:
                    progress === 100
                        ? "Completed"
                        : "Investigating",
            };

            if (investigationId) {

                await updateInvestigation(
                    investigationId,
                    data
                );

            } else {

                const created =
                    await createInvestigation(data);

                setInvestigationId(created.id);
            }
            const currentTime = new Date().toLocaleString();

            setTimeline((prev) => [
                ...prev,
                `${currentTime} - Investigation updated (${progress}%)`,
            ]);

            alert("✅ Investigation saved.");

        } catch (err) {
            console.error(err);
            alert("Failed to save investigation.");
        }
    };
    const generateInsights = async () => {
        if (!fir) return;

        try {
            setLoadingAI(true);

            const response = await api.post(
                "/investigation/insights",
                {
                    crime: fir.crime,
                    district: fir.district,
                    priority: fir.priority,
                }
            );

            setAiInsights(response.data);

        } catch (err) {
            console.error(err);
            alert("Failed to generate AI insights.");
        } finally {
            setLoadingAI(false);
        }
    };
    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto p-8 text-slate-800 dark:text-slate-100">

                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">
                    Investigation Dashboard
                </h1>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-2xl p-6 space-y-6">

                    <div className="grid grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-955/40 border border-slate-205 dark:border-slate-850 rounded-xl p-5 text-sm">

                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">FIR Number</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-100 text-lg mt-1">
                                {fir?.fir}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Crime</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-100 text-lg mt-1">
                                {fir?.crime}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">District</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-100 text-base mt-1">
                                {fir?.district}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Police Station</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-100 text-base mt-1">
                                {fir?.police_station}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Priority</p>
                            <span className="bg-red-100 dark:bg-red-500/15 text-red-655 dark:text-red-400 border border-red-200 dark:border-red-500/20 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                                {fir?.priority}
                            </span>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Status</p>
                            <span className="bg-blue-105 dark:bg-blue-500/15 text-blue-650 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                                {fir?.status}
                            </span>
                        </div>
                        <div className="col-span-2">

                            <p className="text-sm text-slate-550 dark:text-slate-400 mb-3">
                                Evidence
                            </p>

                            {!fir?.evidence ? (

                                <p className="text-slate-450 dark:text-slate-500">
                                    No evidence uploaded.
                                </p>

                            ) : fir.evidence.endsWith(".jpg") ||
                                fir.evidence.endsWith(".jpeg") ||
                                fir.evidence.endsWith(".png") ? (

                                <img
                                    src={`http://127.0.0.1:8000${fir.evidence}`}
                                    alt="Evidence"
                                    className="rounded-xl border border-slate-200 dark:border-slate-800 max-h-96 object-contain"
                                />

                            ) : fir.evidence.endsWith(".mp4") ? (

                                <video
                                    controls
                                    className="rounded-xl w-full border border-slate-200 dark:border-slate-800"
                                >
                                    <source
                                        src={`http://127.0.0.1:8000${fir.evidence}`}
                                    />
                                </video>

                            ) : (

                                <a
                                    href={`http://127.0.0.1:8000${fir.evidence}`}
                                    target="_blank"
                                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition"
                                >
                                    Open Evidence File
                                </a>

                            )}

                        </div>
                    </div>

                    <div>

                        <label className="font-medium text-slate-650 dark:text-slate-350">
                            Assigned Officer
                        </label>

                        <input
                            className="w-full border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-955 text-slate-850 dark:text-slate-100 rounded-lg p-3 mt-2 outline-none focus:border-blue-500 transition"
                            value={officer}
                            onChange={(e) =>
                                setOfficer(e.target.value)
                            }
                            placeholder="Inspector Name"
                        />

                    </div>

                    <div>

                        <label className="font-medium text-slate-650 dark:text-slate-350">
                            Investigation Progress
                        </label>

                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={progress}
                            onChange={(e) =>
                                setProgress(Number(e.target.value))
                            }
                            className="w-full mt-3 h-2 bg-slate-200 dark:bg-slate-955 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />

                        <p className="font-bold text-blue-600 dark:text-blue-400 mt-2">
                            {progress}%
                        </p>

                    </div>

                    <div>

                        <label className="font-medium text-slate-650 dark:text-slate-350">
                            Investigation Notes
                        </label>

                        <textarea
                            rows={6}
                            className="w-full border border-slate-205 dark:border-slate-855 bg-white dark:bg-slate-955 text-slate-800 dark:text-slate-100 rounded-lg p-3 mt-2 outline-none focus:border-blue-500 transition"
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                            placeholder="Write investigation notes..."
                        />

                    </div>

                    <div className="flex gap-4 items-center justify-between">

                        <div className="flex gap-3">

                            <button
                                onClick={saveInvestigation}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition cursor-pointer shadow-sm"
                            >
                                Save Investigation
                            </button>

                            <button
                                onClick={() =>
                                    window.open(
                                        `http://127.0.0.1:8000/report/${id}`,
                                        "_blank"
                                    )
                                }
                                className="bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/20 border border-emerald-250 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 px-6 py-3 rounded-lg font-semibold transition cursor-pointer"
                            >
                                Download Report
                            </button>

                        </div>

                        <button
                            onClick={generateInsights}
                            className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-955/20 dark:hover:bg-purple-900/20 border border-purple-250 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 px-6 py-3 rounded-lg font-semibold transition cursor-pointer"
                        >
                            {loadingAI ? "Generating..." : "Generate AI Insights"}
                        </button>

                    </div>
                    {aiInsights && (
                        <div className="mt-8 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/30 rounded-xl p-6 text-slate-700 dark:text-slate-200">

                            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
                                🤖 AI Investigation Insights
                            </h2>

                            <p className="text-slate-650 dark:text-slate-300">
                                <strong>Risk:</strong> {aiInsights.risk}
                            </p>
                            <div className="mt-4 text-slate-650 dark:text-slate-300">
                                <strong>Response Time:</strong>
                                <p className="text-slate-600 dark:text-slate-350 mt-1">{aiInsights.response_time}</p>
                            </div>

                            <div className="mt-4 text-slate-650 dark:text-slate-300">
                                <strong>Forensic Team Required:</strong>
                                <p className="text-slate-600 dark:text-slate-350 mt-1">
                                    {aiInsights.forensic_required ? "✅ Yes" : "❌ No"}
                                </p>
                            </div>

                            <div className="mt-4">
                                <strong>Evidence Checklist</strong>

                                <ul className="list-disc ml-6 mt-2 text-slate-600 dark:text-slate-350">
                                    {(aiInsights.evidence_checklist || []).map((item: string) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <p className="mt-4 font-semibold text-slate-800 dark:text-slate-200">
                                IPC Sections
                            </p>

                            <ul className="list-disc ml-6 mt-1 text-slate-600 dark:text-slate-355">
                                {aiInsights.ipc.map((item: string) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>

                            <p className="mt-4 font-semibold text-slate-800 dark:text-slate-200">
                                Recommended Units
                            </p>

                            <ul className="list-disc ml-6 mt-1 text-slate-600 dark:text-slate-355">
                                {aiInsights.units.map((item: string) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>

                            <p className="mt-4 font-semibold text-slate-800 dark:text-slate-200">
                                Investigation Steps
                            </p>

                            <ul className="list-disc ml-6 mt-1 text-slate-600 dark:text-slate-355">
                                {aiInsights.steps.map((item: string) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>

                        </div>
                    )}
                    <div className="mt-8">

                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                            Investigation Timeline
                        </h2>

                        <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-xl p-4">

                            {timeline.length === 0 ? (

                                <p className="text-slate-500">
                                    No investigation activity yet.
                                </p>

                            ) : (

                                <ul className="space-y-3">

                                    {timeline.map((item, index) => (

                                        <li
                                            key={index}
                                            className="border-l-4 border-blue-500 pl-4 text-slate-600 dark:text-slate-300"
                                        >
                                            {item}
                                        </li>

                                    ))}

                                </ul>

                            )}

                        </div>

                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}