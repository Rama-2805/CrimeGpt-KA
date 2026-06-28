"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface FIR {
    fir: string;
    crime: string;
    district: string;
    status: string;
    date: string;
}

export default function RecentCasesTable() {
    const [cases, setCases] = useState<FIR[]>([]);

    useEffect(() => {
        const fetchRecentCases = async () => {
            try {
                const response = await api.get("/dashboard/recent-firs");
                setCases(response.data);
            } catch (error) {
                console.error("Failed to fetch FIRs:", error);
            }
        };

        fetchRecentCases();
    }, []);

    return (
        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-md shadow-sm dark:shadow-lg">

            <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Recent FIRs
                </h2>
            </div>

            <div className="overflow-x-auto">

                <Table>

                    <TableHeader className="bg-slate-100/70 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">

                        <TableRow className="border-b border-slate-200 dark:border-slate-800 hover:bg-transparent">

                            <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">
                                FIR No
                            </TableHead>

                            <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">
                                Crime
                            </TableHead>

                            <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">
                                District
                            </TableHead>

                            <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">
                                Status
                            </TableHead>

                            <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">
                                Date
                            </TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {cases.map((item) => (

                            <TableRow
                                key={item.fir}
                                className="border-b border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition"
                            >

                                <TableCell className="font-semibold text-slate-800 dark:text-slate-100">
                                    {item.fir}
                                </TableCell>

                                <TableCell className="text-slate-600 dark:text-slate-300">
                                    {item.crime}
                                </TableCell>

                                <TableCell className="text-slate-600 dark:text-slate-300">
                                    {item.district}
                                </TableCell>

                                <TableCell>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold border ${item.status === "Open"
                                            ? "bg-red-100 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                                            : item.status === "Closed"
                                                ? "bg-green-100 text-green-600 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                                                : "bg-yellow-100 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20"
                                            }`}
                                    >
                                        {item.status}
                                    </span>

                                </TableCell>

                                <TableCell className="text-slate-300">
                                    {item.date}
                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </div>

        </div>
    );
}