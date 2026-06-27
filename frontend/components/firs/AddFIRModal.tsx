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
    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
            >
                + Add FIR
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl p-6 w-125 max-h-[90vh] overflow-y-auto space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    Add FIR
                </h2>

                <input
                    className="w-full border rounded-lg p-3 text-black"
                    placeholder="FIR Number"
                    value={form.fir}
                    onChange={(e) =>
                        setForm({ ...form, fir: e.target.value })
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
                        setForm({
                            ...form,
                            district: e.target.value,
                            police_station: "", // Reset police station when district changes
                        })
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
                    className="w-full border rounded-lg p-3 text-black"
                    value={form.police_station}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            police_station: e.target.value,
                        })
                    }
                >
                    <option value="">Select Police Station</option>

                    {(policeStations[form.district] || []).map((station) => (
                        <option key={station} value={station}>
                            {station}
                        </option>
                    ))}
                </select>
                <div>
                    <label className="block mb-2 font-medium text-gray-700">
                        Evidence
                    </label>

                    <input
                        type="file"
                        accept="image/*,video/*,.pdf"
                        onChange={(e) =>
                            setEvidence(e.target.files?.[0] || null)
                        }
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <input
                    className="w-full border rounded-lg p-3 text-black"
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
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg p-3"
                >
                    {locating ? "Detecting Location..." : "📍 Detect My Location"}
                </button>

                <div className="bg-gray-50 rounded-lg p-3 border">

                    <p className="text-sm text-gray-700">
                        <strong>Latitude:</strong>{" "}
                        {form.latitude ? form.latitude.toFixed(6) : "--"}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
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
                    className="w-full border rounded-lg p-3 text-black"
                    value={form.status}
                    onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                    }
                >
                    <option value="Open">Open</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Closed">Closed</option>
                </select>
                <select
                    className="w-full border rounded-lg p-3 text-black"
                    value={form.priority}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            priority: e.target.value,
                        })
                    }
                >
                    <option value="Low">🟢 Low</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="High">🟠 High</option>
                    <option value="Critical">🔴 Critical</option>
                </select>
                <input
                    type="date"
                    className="w-full border rounded-lg p-3 text-black"
                    value={form.date}
                    onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                    }
                />

                <div className="flex justify-end gap-3 pt-2">

                    <button
                        onClick={() => setOpen(false)}
                        className="border border-gray-300 rounded-lg px-5 py-2 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={submit}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2"
                    >
                        Save FIR
                    </button>

                </div>

            </div>

        </div>
    );
}