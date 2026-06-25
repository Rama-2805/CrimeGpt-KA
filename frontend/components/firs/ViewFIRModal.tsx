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
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="text-blue-600 hover:text-blue-800"
            >
                View
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl shadow-xl w-175 max-h-[90vh] overflow-y-auto p-6">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl font-bold">
                                FIR Details
                            </h2>

                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-500 hover:text-black text-xl"
                            >
                                ✕
                            </button>

                        </div>

                        <div className="space-y-3">

                            <p><strong>FIR Number:</strong> {fir.fir}</p>

                            <p><strong>Crime:</strong> {fir.crime}</p>

                            <p><strong>District:</strong> {fir.district}</p>

                            <p><strong>Police Station:</strong> {fir.police_station}</p>

                            <div className="flex items-center gap-2">
                                <strong>Status:</strong>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${fir.status === "Open"
                                        ? "bg-red-100 text-red-700"
                                        : fir.status === "Closed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {fir.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <strong>Priority:</strong>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${fir.priority === "Critical"
                                        ? "bg-red-600 text-white"
                                        : fir.priority === "High"
                                            ? "bg-orange-500 text-white"
                                            : fir.priority === "Medium"
                                                ? "bg-yellow-300 text-black"
                                                : "bg-green-500 text-white"
                                        }`}
                                >
                                    {fir.priority}
                                </span>
                            </div>
                            <p><strong>Date:</strong> {fir.date}</p>

                            <p><strong>Address:</strong> {fir.address}</p>

                            <p>
                                <strong>Latitude:</strong>{" "}
                                {Number(fir.latitude).toFixed(6)}
                            </p>

                            <p>
                                <strong>Longitude:</strong>{" "}
                                {Number(fir.longitude).toFixed(6)}
                            </p>
                            <hr className="my-5" />

                            <h3 className="text-lg font-semibold">
                                Crime Location
                            </h3>

                            <LocationPicker
                                latitude={fir.latitude}
                                longitude={fir.longitude}
                                onLocationChange={() => { }}
                            />
                        </div>
                        <hr className="my-4" />

                        <h3 className="font-semibold text-lg">
                            Evidence
                        </h3>

                        {fir.evidence ? (

                            <>
                                {fir.evidence.endsWith(".jpg") ||
                                    fir.evidence.endsWith(".jpeg") ||
                                    fir.evidence.endsWith(".png") ? (

                                    <img
                                        src={`http://127.0.0.1:8000${fir.evidence}`}
                                        alt="Evidence"
                                        className="rounded-xl border w-full max-h-96 object-contain"
                                    />

                                ) : fir.evidence.endsWith(".mp4") ? (

                                    <video
                                        controls
                                        className="w-full rounded-lg"
                                    >
                                        <source
                                            src={`http://127.0.0.1:8000${fir.evidence}`}
                                        />
                                    </video>

                                ) : (

                                    <p className="text-gray-500">
                                        No evidence uploaded.
                                    </p>

                                )}
                                <hr className="my-6" />

                                <button
                                    onClick={generateSummary}
                                    disabled={loadingSummary}
                                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium"
                                >
                                    {loadingSummary
                                        ? "Generating AI Summary..."
                                        : "🤖 Generate AI Summary"}
                                </button>

                                {summary && (
                                    <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl p-4">
                                        <h3 className="text-lg font-semibold text-purple-700 mb-2">
                                            AI Case Summary
                                        </h3>

                                        <p className="text-gray-700 leading-7">
                                            {summary}
                                        </p>
                                    </div>
                                )}

                                {fir.evidence && (
                                    <div className="mt-4">
                                        <a
                                            href={`http://127.0.0.1:8000${fir.evidence}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block"
                                        >
                                            Download Evidence
                                        </a>
                                    </div>
                                )}
                            </>

                        ) : (

                            <p className="text-gray-500">
                                No evidence uploaded.
                            </p>

                        )}
                    </div>

                </div>
            )}
        </>
    );
}