"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
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

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Investigation Dashboard
                </h1>

                <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">

                    <div>
                        <h2 className="text-xl font-semibold">
                            FIR ID
                        </h2>

                        <p className="text-blue-600 font-bold text-lg">
                            {id}
                        </p>
                    </div>

                    <div>

                        <label className="font-medium">
                            Assigned Officer
                        </label>

                        <input
                            className="w-full border rounded-lg p-3 mt-2"
                            value={officer}
                            onChange={(e) =>
                                setOfficer(e.target.value)
                            }
                            placeholder="Inspector Name"
                        />

                    </div>

                    <div>

                        <label className="font-medium">
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
                            className="w-full mt-3"
                        />

                        <p className="font-bold mt-2">
                            {progress}%
                        </p>

                    </div>

                    <div>

                        <label className="font-medium">
                            Investigation Notes
                        </label>

                        <textarea
                            rows={6}
                            className="w-full border rounded-lg p-3 mt-2"
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                            placeholder="Write investigation notes..."
                        />

                    </div>

                    <button
                        onClick={saveInvestigation}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        Save Investigation
                    </button>
                    <div className="mt-8">

                        <h2 className="text-xl font-semibold mb-4">
                            Investigation Timeline
                        </h2>

                        <div className="bg-gray-50 rounded-xl p-4 border">

                            {timeline.length === 0 ? (

                                <p className="text-gray-500">
                                    No investigation activity yet.
                                </p>

                            ) : (

                                <ul className="space-y-3">

                                    {timeline.map((item, index) => (

                                        <li
                                            key={index}
                                            className="border-l-4 border-blue-600 pl-4"
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