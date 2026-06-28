"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { createFIR } from "@/services/firService";
import { policeStations } from "@/data/policeStations";
import { districts } from "@/data/districts";
import { crimeTypes } from "@/data/crimeTypes";
import api from "@/services/api";
interface Props {
    onSuccess: () => void;
}

export default function AddFIRModal({ onSuccess }: Props) {
    const [open, setOpen] = useState(false);
    const [locating, setLocating] = useState(false);
    const [form, setForm] = useState({
        fir: "",
        crime: "",
        district: "",
        police_station: "",
        address: "",
        latitude: 0,
        longitude: 0,
        status: "Open",
        date: "",
        priority: "Medium",
        evidence: "",
    });

    const LocationPicker = dynamic(
        () => import("@/components/maps/LocationPicker"),
        { ssr: false }
    );
    const [evidence, setEvidence] = useState<File | null>(null);
    const detectLocation = () => {

        if (!navigator.geolocation) {
            alert("Geolocation is not supported.");
            return;
        }

        setLocating(true);
        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                try {

                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );

                    const data = await response.json();

                    setForm((prev) => ({
                        ...prev,
                        latitude,
                        longitude,
                        address: data.display_name || "",
                        district:
                            data.address?.city ||
                            data.address?.town ||
                            data.address?.county ||
                            "",
                    }));
                    setLocating(false);
                } catch (error) {

                    console.error(error);

                    setForm((prev) => ({
                        ...prev,
                        latitude,
                        longitude,
                    }));

                    alert("Location detected, but address lookup failed.");
                    setLocating(false);
                }

            },

            (error) => {

                console.error(error);

                alert("Unable to detect your location.");
                setLocating(false);
            }

        );

    };
    const submit = async () => {
        if (
            !form.fir.trim() ||
            !form.crime.trim() ||
            !form.district.trim() ||
            !form.police_station.trim() ||
            !form.address.trim() ||
            form.latitude === 0 ||
            form.longitude === 0 ||
            !form.date
        ) {
            alert("Please complete all fields and detect the location.");
            return;
        }

        try {
            console.log(form);
            let evidenceUrl = "";

            if (evidence) {

                const formData = new FormData();

                formData.append("file", evidence);

                const upload = await api.post(
                    "/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                evidenceUrl = upload.data.url;
            }
            console.log({
                ...form,
                evidence: evidenceUrl,
            });

            await createFIR({
                ...form,
                evidence: evidenceUrl,
            });

            alert("✅ FIR added successfully!");

            setForm({
                fir: "",
                crime: "",
                district: "",
                police_station: "",
                address: "",
                latitude: 0,
                longitude: 0,
                status: "Open",
                date: "",
                priority: "Medium",
                evidence: "",
            });

            setEvidence(null);
            setOpen(false);

            onSuccess();
        } catch (err: any) {
            console.error(err);
            alert(
                err.response?.data?.detail ||
                "Failed to add FIR."
            );
        }
    };    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-600/10 hover:bg-blue-600/20 dark:bg-blue-600/20 dark:hover:bg-blue-600/35 border border-blue-200 dark:border-blue-500/40 text-blue-700 dark:text-blue-300 px-5 py-2 rounded-lg font-medium transition cursor-pointer"
            >
                + Add FIR
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-2xl p-6 w-125 max-h-[90vh] overflow-y-auto space-y-4 text-slate-800 dark:text-slate-100">
                <h2 className="text-2xl font-bold text-slate-808 dark:text-slate-100">
                    Add FIR
                </h2>

                <input
                    className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-805 dark:text-slate-100 rounded-lg p-3 outline-none focus:border-blue-500"
                    placeholder="FIR Number"
                    value={form.fir}
                    onChange={(e) =>
                        setForm({ ...form, fir: e.target.value })
                    }
                />

                <select
                    className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-805 dark:text-slate-100 rounded-lg p-3 outline-none focus:border-blue-500 cursor-pointer"
                    value={form.crime}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            crime: e.target.value,
                        })
                    }
                >
                    <option value="" className="bg-white dark:bg-slate-950">Select Crime Type</option>

                    {crimeTypes.map((crime) => (
                        <option
                            key={crime}
                            value={crime}
                            className="bg-white dark:bg-slate-950"
                        >
                            {crime}
                        </option>
                    ))}
                </select>

                <select
                    className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-805 dark:text-slate-100 rounded-lg p-3 outline-none focus:border-blue-500 cursor-pointer"
                    value={form.district}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            district: e.target.value,
                            police_station: "", // Reset police station when district changes
                        })
                    }
                >
                    <option value="" className="bg-white dark:bg-slate-950">Select District</option>

                    {districts.map((district) => (
                        <option key={district} value={district} className="bg-white dark:bg-slate-955">
                            {district}
                        </option>
                    ))}
                </select>
                <select
                    className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-805 dark:text-slate-100 rounded-lg p-3 outline-none focus:border-blue-500 cursor-pointer"
                    value={form.police_station}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            police_station: e.target.value,
                        })
                    }
                >
                    <option value="" className="bg-white dark:bg-slate-950">Select Police Station</option>

                    {(policeStations[form.district] || []).map((station) => (
                        <option key={station} value={station} className="bg-white dark:bg-slate-955">
                            {station}
                        </option>
                    ))}
                </select>
                <div>
                    <label className="block mb-2 font-medium text-slate-650 dark:text-slate-350">
                        Evidence
                    </label>

                    <input
                        type="file"
                        accept="image/*,video/*,.pdf"
                        onChange={(e) =>
                            setEvidence(e.target.files?.[0] || null)
                        }
                        className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-600 dark:text-slate-350 rounded-lg p-2 outline-none"
                    />
                </div>
                <input
                    className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-805 dark:text-slate-100 rounded-lg p-3 outline-none focus:border-blue-500"
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            address: e.target.value,
                        })
                    }
                />
                <button
                    type="button"
                    onClick={detectLocation}
                    disabled={locating}
                    className="w-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-600/10 dark:hover:bg-emerald-600/20 disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-505 border border-emerald-200 dark:border-emerald-500/30 text-emerald-705 dark:text-emerald-400 font-semibold rounded-lg p-3 transition cursor-pointer"
                >
                    {locating ? "Detecting Location..." : "📍 Detect My Location"}
                </button>

                <div className="bg-slate-50 dark:bg-slate-955/40 border border-slate-200 dark:border-slate-850 rounded-lg p-3">

                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        <strong>Latitude:</strong>{" "}
                        {form.latitude ? form.latitude.toFixed(6) : "--"}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        <strong>Longitude:</strong>{" "}
                        {form.longitude ? form.longitude.toFixed(6) : "--"}
                    </p>
                </div>
                <LocationPicker
                    latitude={form.latitude}
                    longitude={form.longitude}
                    onLocationChange={(lat, lng) =>
                        setForm((prev) => ({
                            ...prev,
                            latitude: lat,
                            longitude: lng,
                        }))
                    }
                />
                <select
                    className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-805 dark:text-slate-100 rounded-lg p-3 outline-none focus:border-blue-500 cursor-pointer"
                    value={form.status}
                    onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                    }
                >
                    <option value="Open" className="bg-white dark:bg-slate-950">Open</option>
                    <option value="Investigating" className="bg-white dark:bg-slate-950">Investigating</option>
                    <option value="Closed" className="bg-white dark:bg-slate-950">Closed</option>
                </select>
                <select
                    className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-805 dark:text-slate-100 rounded-lg p-3 outline-none focus:border-blue-500 cursor-pointer"
                    value={form.priority}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            priority: e.target.value,
                        })
                    }
                >
                    <option value="Low" className="bg-white dark:bg-slate-950">Low</option>
                    <option value="Medium" className="bg-white dark:bg-slate-955">Medium</option>
                    <option value="High" className="bg-white dark:bg-slate-955">High</option>
                    <option value="Critical" className="bg-white dark:bg-slate-955">Critical</option>
                </select>
                <input
                    type="date"
                    className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-805 dark:text-slate-100 rounded-lg p-3 outline-none focus:border-blue-500"
                    value={form.date}
                    onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                    }
                />

                <div className="flex justify-end gap-3 pt-2">

                    <button
                        onClick={() => setOpen(false)}
                        className="border border-slate-205 dark:border-slate-808 text-slate-600 dark:text-slate-300 rounded-lg px-5 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={submit}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 transition cursor-pointer shadow-sm"
                    >
                        Save FIR
                    </button>

                </div>

            </div>

        </div>
    );
}