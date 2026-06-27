"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import AddFIRModal from "@/components/firs/AddFIRModal";
import DashboardLayout from "@/components/layout/DashboardLayout";
import EditFIRModal from "@/components/firs/EditFIRModal";
import { deleteFIR } from "@/services/firService";
import ViewFIRModal from "@/components/firs/ViewFIRModal";

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

export default function FIRPage() {

    const [firs, setFirs] = useState<FIR[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [districtFilter, setDistrictFilter] = useState("All");
    const fetchFIRs = async () => {
        setLoading(true);

        try {
            const response = await api.get("/firs");
            setFirs(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFIRs();
    }, []);

    const filteredFIRs = firs.filter((fir) => {

        const matchesSearch =
            fir.fir.toLowerCase().includes(search.toLowerCase()) ||
            fir.crime.toLowerCase().includes(search.toLowerCase()) ||
            fir.district.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            fir.status === statusFilter;

        const matchesDistrict =
            districtFilter === "All" ||
            fir.district === districtFilter;

        return matchesSearch && matchesStatus && matchesDistrict;
    });

    const districts = [
        "All",
        ...new Set(firs.map((fir) => fir.district))
    ];

    return (

        <DashboardLayout>

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        FIR Management
                    </h1>

                    <p className="text-gray-500">
                        Create, update and manage FIR records.
                    </p>

                </div>

                <AddFIRModal onSuccess={fetchFIRs} />

            </div>

            <div className="flex gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Search FIR / Crime / District..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-96"
                />

                <select
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                >
                    {districts.map((district) => (
                        <option key={district}>
                            {district}
                        </option>
                    ))}
                </select>

            </div>

            {/* Table */}

            <div className="bg-white rounded-xl shadow border overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="text-left p-4">FIR</th>

                            <th className="text-left p-4">Crime</th>

                            <th className="text-left p-4">District</th>

                            <th className="text-left p-4">Status</th>

                            <th className="text-left p-4">Date</th>

                            <th className="text-left p-4">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="text-center py-10"
                                >
                                    Loading...
                                </td>

                            </tr>

                        ) : (

                            filteredFIRs.map((fir) => (

                                <tr
                                    key={fir.id}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="p-4">{fir.fir}</td>

                                    <td className="p-4">{fir.crime}</td>

                                    <td className="p-4">{fir.district}</td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${fir.status === "Open"
                                                ? "bg-red-100 text-red-700"
                                                : fir.status === "Closed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {fir.status}
                                        </span>

                                    </td>

                                    <td className="p-4">{fir.date}</td>

                                    <td className="p-4 flex gap-3">

                                        <ViewFIRModal fir={fir} />

                                        <EditFIRModal
                                            fir={fir}
                                            onSuccess={fetchFIRs}
                                        />

                                        <button
                                            onClick={() =>
                                                window.location.href = `/investigation/${fir.id}`
                                            }
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg"
                                        >
                                            Investigate
                                        </button>

                                        <button
                                            className="text-red-600"
                                            onClick={async () => {

                                                if (!confirm("Delete this FIR?")) return;

                                                try {

                                                    await api.delete(`/firs/${fir.id}`);

                                                    fetchFIRs();

                                                } catch (err) {

                                                    console.error(err);

                                                    alert("Failed to delete FIR.");

                                                }

                                            }}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>
                <div className="flex justify-between items-center">

                    <h2 className="text-lg font-semibold">
                        FIR Records
                    </h2>

                    <span className="text-gray-500">
                        Showing {filteredFIRs.length} of {firs.length} FIRs
                    </span>
                </div>
            </div>

        </DashboardLayout >

    );

}