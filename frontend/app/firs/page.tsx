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

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                        FIR Management
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400 mt-1">
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
                    className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg px-4 py-2 w-96 outline-none focus:border-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />

                <select
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                    className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg px-4 py-2 outline-none focus:border-blue-500 cursor-pointer"
                >
                    {districts.map((district) => (
                        <option key={district} className="bg-white dark:bg-slate-950" value={district}>
                            {district === "All" ? "All Districts" : district}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg px-4 py-2 outline-none focus:border-blue-500 cursor-pointer"
                >
                    <option value="All" className="bg-white dark:bg-slate-955">All Statuses</option>
                    <option value="Open" className="bg-white dark:bg-slate-955">Open</option>
                    <option value="Investigating" className="bg-white dark:bg-slate-955">Investigating</option>
                    <option value="Closed" className="bg-white dark:bg-slate-955">Closed</option>
                </select>

            </div>

            {/* Table */}

            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-md overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-100/70 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">

                        <tr>

                            <th className="text-left p-4 text-slate-600 dark:text-slate-350 font-semibold text-sm">FIR</th>

                            <th className="text-left p-4 text-slate-600 dark:text-slate-350 font-semibold text-sm">Crime</th>

                            <th className="text-left p-4 text-slate-600 dark:text-slate-355 font-semibold text-sm">District</th>

                            <th className="text-left p-4 text-slate-600 dark:text-slate-355 font-semibold text-sm">Status</th>

                            <th className="text-left p-4 text-slate-600 dark:text-slate-355 font-semibold text-sm">Date</th>

                            <th className="text-left p-4 text-slate-600 dark:text-slate-355 font-semibold text-sm">Action</th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/50">

                        {loading ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="text-center py-10 text-slate-500 dark:text-slate-400"
                                >
                                    Loading...
                                </td>

                            </tr>

                        ) : filteredFIRs.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="text-center py-10 text-slate-500 dark:text-slate-500"
                                >
                                    No records found matching filters.
                                </td>

                            </tr>

                        ) : (

                            filteredFIRs.map((fir) => (

                                <tr
                                    key={fir.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition"
                                >

                                    <td className="p-4 text-slate-800 dark:text-slate-200 font-semibold">{fir.fir}</td>

                                    <td className="p-4 text-slate-600 dark:text-slate-300">{fir.crime}</td>

                                    <td className="p-4 text-slate-600 dark:text-slate-300">{fir.district}</td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${fir.status === "Open"
                                                ? "bg-red-100 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                                                : fir.status === "Closed"
                                                    ? "bg-green-100 text-green-600 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                                                    : "bg-yellow-100 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20"
                                                }`}
                                        >
                                            {fir.status}
                                        </span>

                                    </td>

                                    <td className="p-4 text-slate-600 dark:text-slate-300">{fir.date}</td>

                                    <td className="p-4 flex items-center gap-3">

                                        <ViewFIRModal fir={fir} />

                                        <EditFIRModal
                                            fir={fir}
                                            onSuccess={fetchFIRs}
                                        />

                                        <button
                                            onClick={() =>
                                                window.location.href = `/investigation/${fir.id}`
                                            }
                                            className="bg-purple-50 dark:bg-purple-955/20 hover:bg-purple-100 dark:hover:bg-purple-900/20 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-lg text-sm transition font-medium cursor-pointer"
                                        >
                                            Investigate
                                        </button>

                                        <button
                                            className="text-red-600 dark:text-red-400 hover:text-red-750 dark:hover:text-red-300 text-sm transition ml-1 font-medium cursor-pointer"
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
                
                <div className="bg-slate-100/70 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center text-sm">

                    <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        FIR Records
                    </h2>

                    <span className="text-slate-500 dark:text-slate-400">
                        Showing {filteredFIRs.length} of {firs.length} FIRs
                    </span>

                </div>
            </div>

        </DashboardLayout >

    );

}