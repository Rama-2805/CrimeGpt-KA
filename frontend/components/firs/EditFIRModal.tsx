"use client";

import { useState, useEffect } from "react";
import { updateFIR } from "@/services/firService";
import { policeStations } from "@/data/policeStations";
import { districts } from "@/data/districts";
import { crimeTypes } from "@/data/crimeTypes";
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
    onSuccess: () => void;
}

export default function EditFIRModal({
    fir,
    onSuccess,
}: Props) {
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState(fir);

    useEffect(() => {
        setForm(fir);
    }, [fir]);

    const districts = [
        "Bagalkote",
        "Ballari",
        "Belagavi",
        "Bengaluru Rural",
        "Bengaluru Urban",
        "Bidar",
        "Chamarajanagar",
        "Chikkaballapur",
        "Chikkamagaluru",
        "Chitradurga",
        "Dakshina Kannada",
        "Davanagere",
        "Dharwad",
        "Gadag",
        "Hassan",
        "Haveri",
        "Kalaburagi",
        "Kodagu",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mysuru",
        "Raichur",
        "Ramanagara",
        "Shivamogga",
        "Tumakuru",
        "Udupi",
        "Uttara Kannada",
        "Vijayanagara",
        "Vijayapura",
        "Yadgir",
    ];
    const submit = async () => {
        try {
            await updateFIR(fir.id, form);

            alert("FIR updated successfully.");

            setOpen(false);

            onSuccess();

        } catch (err: any) {

            alert(
                err.response?.data?.detail ||
                "Failed to update FIR."
            );
        }
    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="text-green-600 hover:text-green-800"
            >
                Edit
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-6 w-125 space-y-4">

                <h2 className="text-2xl font-bold">
                    Edit FIR
                </h2>

                <input
                    className="w-full border rounded p-3"
                    value={form.fir}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            fir: e.target.value,
                        })
                    }
                />

                <select
                    className="w-full border rounded-lg p-3 text-black"
                    value={form.crime}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            crime: e.target.value,
                        })
                    }
                >
                    <option value="">Select Crime Type</option>

                    {crimeTypes.map((crime) => (
                        <option
                            key={crime}
                            value={crime}
                        >
                            {crime}
                        </option>
                    ))}
                </select>

                <select
                    className="w-full border rounded-lg p-3 text-black"
                    value={form.district}
                    onChange={(e) =>
                        setForm({ ...form, district: e.target.value })
                    }
                >
                    <option value="">Select District</option>

                    {districts.map((district) => (
                        <option key={district} value={district}>
                            {district}
                        </option>
                    ))}
                </select>

                <select
                    className="w-full border rounded p-3"
                    value={form.status}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            status: e.target.value,
                        })
                    }
                >
                    <option>Open</option>
                    <option>Investigating</option>
                    <option>Closed</option>
                </select>

                <input
                    type="date"
                    className="w-full border rounded p-3"
                    value={form.date}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            date: e.target.value,
                        })
                    }
                />

                <div className="flex justify-end gap-3">

                    <button
                        onClick={() => setOpen(false)}
                        className="border px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={submit}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Update
                    </button>

                </div>

            </div>

        </div>
    );
}