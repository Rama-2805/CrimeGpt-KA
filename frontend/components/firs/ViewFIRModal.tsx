"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import api from "@/services/api";
const LocationPicker = dynamic(
    () => import("@/components/maps/LocationPicker"),
    { ssr: false }
);

interface FIR {
    id: number;

    fir: string;
    crime: string;

    district: string;
    police_station: string;

    address: string;

    latitude: number;
    longitude: number;

    priority: string;

    status: string;

    evidence: string;

    date: string;
}

interface Props {
    fir: FIR;
}

export default function ViewFIRModal({ fir }: Props) {
    const [open, setOpen] = useState(false);
    const [summary, setSummary] = useState("");
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [insights, setInsights] = useState<any>(null);
    const [loadingInsights, setLoadingInsights] = useState(false);

    const generateSummary = async () => {
        try {
            setLoadingSummary(true);

            const response = await api.post("/ai/summary", {
                fir: fir.fir,
                crime: fir.crime,
                district: fir.district,
                police_station: fir.police_station,
                address: fir.address,
                priority: fir.priority,
                status: fir.status,
                date: fir.date,
            });

            setSummary(response.data.summary);

        } catch (err) {
            console.error(err);
            alert("Failed to generate AI summary.");
        } finally {
            setLoadingSummary(false);
        }
    };
    const generateInsights = async () => {
        try {
            setLoadingInsights(true);

            const response = await api.post("/investigation/insights", {
                crime: fir.crime,
                district: fir.district,
                priority: fir.priority,
            });

            setInsights(response.data);

        } catch (err) {
            console.error(err);
            alert("Failed to generate investigation insights.");
        } finally {
            setLoadingInsights(false);
        }
    };
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition cursor-pointer"
            >
                View
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-2xl w-175 max-h-[90vh] overflow-y-auto p-6 text-slate-800 dark:text-slate-100">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl font-bold text-slate-808 dark:text-slate-100">
                                FIR Details
                            </h2>

                            <button
                                onClick={() => setOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl"
                            >
                                ✕
                            </button>

                        </div>

                        <div className="space-y-4">

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <p><strong className="text-slate-500 dark:text-slate-450">FIR Number:</strong> <span className="text-slate-800 dark:text-slate-200">{fir.fir}</span></p>
                                <p><strong className="text-slate-500 dark:text-slate-455">Crime:</strong> <span className="text-slate-800 dark:text-slate-200">{fir.crime}</span></p>
                                <p><strong className="text-slate-500 dark:text-slate-455">District:</strong> <span className="text-slate-800 dark:text-slate-200">{fir.district}</span></p>
                                <p><strong className="text-slate-500 dark:text-slate-455">Police Station:</strong> <span className="text-slate-800 dark:text-slate-200">{fir.police_station}</span></p>
                                <p><strong className="text-slate-500 dark:text-slate-455">Date:</strong> <span className="text-slate-800 dark:text-slate-200">{fir.date}</span></p>
                                <p><strong className="text-slate-500 dark:text-slate-455">Address:</strong> <span className="text-slate-800 dark:text-slate-200">{fir.address}</span></p>
                                <p><strong className="text-slate-500 dark:text-slate-455">Latitude:</strong> <span className="text-slate-800 dark:text-slate-200">{Number(fir.latitude).toFixed(6)}</span></p>
                                <p><strong className="text-slate-500 dark:text-slate-455">Longitude:</strong> <span className="text-slate-800 dark:text-slate-200">{Number(fir.longitude).toFixed(6)}</span></p>
                            </div>

                            <div className="flex items-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <strong className="text-slate-500 dark:text-slate-400">Status:</strong>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${fir.status === "Open"
                                            ? "bg-red-105 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                                            : fir.status === "Closed"
                                                ? "bg-green-105 text-green-600 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                                                : "bg-yellow-105 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20"
                                            }`}
                                    >
                                        {fir.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <strong className="text-slate-500 dark:text-slate-400">Priority:</strong>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${fir.priority === "Critical"
                                            ? "bg-rose-100 text-rose-650 border-rose-200 dark:bg-rose-500/15 dark:text-rose-455 dark:border-rose-500/25"
                                            : fir.priority === "High"
                                                ? "bg-orange-100 text-orange-650 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20"
                                                : fir.priority === "Medium"
                                                    ? "bg-yellow-100 text-yellow-650 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20"
                                                    : "bg-green-100 text-green-650 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                                            }`}
                                    >
                                        {fir.priority}
                                    </span>
                                </div>
                            </div>

                            <hr className="my-5 border-slate-200 dark:border-slate-800" />

                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                                Crime Location
                            </h3>

                            <LocationPicker
                                latitude={fir.latitude}
                                longitude={fir.longitude}
                                onLocationChange={() => { }}
                            />

                            <hr className="my-5 border-slate-200 dark:border-slate-800" />

                            <div>
                                <h3 className="font-semibold text-lg text-slate-808 dark:text-slate-200 mb-3">
                                    Evidence
                                </h3>

                                {fir.evidence ? (
                                    <div className="space-y-3">
                                        {fir.evidence.endsWith(".jpg") ||
                                        fir.evidence.endsWith(".jpeg") ||
                                        fir.evidence.endsWith(".png") ? (
                                            <img
                                                src={`http://127.0.0.1:8000${fir.evidence}`}
                                                alt="Evidence"
                                                className="rounded-xl border border-slate-200 dark:border-slate-800 w-full max-h-96 object-contain"
                                            />
                                        ) : fir.evidence.endsWith(".mp4") ? (
                                            <video
                                                controls
                                                className="w-full rounded-lg border border-slate-200 dark:border-slate-800"
                                            >
                                                <source
                                                    src={`http://127.0.0.1:8000${fir.evidence}`}
                                                />
                                            </video>
                                        ) : (
                                            <p className="text-slate-600 dark:text-slate-350">
                                                File: <span className="underline">{fir.evidence}</span>
                                            </p>
                                        )}

                                        <div className="mt-2">
                                            <a
                                                href={`http://127.0.0.1:8000${fir.evidence}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-600/20 dark:hover:bg-blue-600/35 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg inline-block text-sm transition font-medium"
                                            >
                                                Download Evidence
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-slate-450 dark:text-slate-500">
                                        No evidence uploaded.
                                    </p>
                                )}
                            </div>

                            <hr className="my-6 border-slate-200 dark:border-slate-800" />

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={generateSummary}
                                    disabled={loadingSummary}
                                    className="bg-purple-50 hover:bg-purple-100 disabled:bg-slate-100 disabled:text-slate-400 dark:bg-purple-950/20 dark:hover:bg-purple-900/20 dark:disabled:bg-slate-800 dark:disabled:text-slate-505 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 py-3 rounded-lg font-medium transition cursor-pointer"
                                >
                                    {loadingSummary
                                        ? "Generating AI Summary..."
                                        : "🤖 Generate AI Summary"}
                                </button>

                                <button
                                    onClick={generateInsights}
                                    disabled={loadingInsights}
                                    className="bg-indigo-50 hover:bg-indigo-100 disabled:bg-slate-100 disabled:text-slate-400 dark:bg-indigo-950/20 dark:hover:bg-indigo-900/20 dark:disabled:bg-slate-800 dark:disabled:text-slate-505 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 py-3 rounded-lg font-medium transition cursor-pointer"
                                >
                                    {loadingInsights
                                        ? "Generating Insights..."
                                        : "🕵 Generate AI Insights"}
                                </button>
                            </div>

                            {summary && (
                                <div className="mt-4 bg-purple-50 dark:bg-purple-955/20 border border-purple-200 dark:border-purple-800/30 rounded-xl p-4 text-slate-700 dark:text-slate-200">
                                    <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
                                        AI Case Summary
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-7">
                                        {summary}
                                    </p>
                                </div>
                            )}

                            {insights && (
                                <div className="mt-4 bg-indigo-50 dark:bg-indigo-955/20 border border-indigo-200 dark:border-indigo-800/30 rounded-xl p-4 text-slate-700 dark:text-slate-200 space-y-3">
                                    <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
                                        AI Investigation Insights
                                    </h3>
                                    <p>
                                        <strong>Risk Level:</strong> {insights.risk}
                                    </p>
                                    <div>
                                        <strong>Applicable IPC Sections:</strong>
                                        <ul className="list-disc ml-6 mt-1 text-slate-600 dark:text-slate-350">
                                            {insights.ipc.map((ipc: string) => (
                                                <li key={ipc}>{ipc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <strong>Recommended Units:</strong>
                                        <ul className="list-disc ml-6 mt-1 text-slate-600 dark:text-slate-350">
                                            {insights.units.map((unit: string) => (
                                                <li key={unit}>{unit}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <strong>Investigation Steps:</strong>
                                        <ul className="list-disc ml-6 mt-1 text-slate-600 dark:text-slate-350">
                                            {insights.steps.map((step: string) => (
                                                <li key={step}>{step}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}