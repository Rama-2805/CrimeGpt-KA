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
        <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">
                    Recent FIRs
                </h2>
            </div>

            <div className="overflow-x-auto">

                <Table>

                    <TableHeader className="bg-gray-100">

                        <TableRow>

                            <TableHead className="text-gray-900 font-semibold">
                                FIR No
                            </TableHead>

                            <TableHead className="text-gray-900 font-semibold">
                                Crime
                            </TableHead>

                            <TableHead className="text-gray-900 font-semibold">
                                District
                            </TableHead>

                            <TableHead className="text-gray-900 font-semibold">
                                Status
                            </TableHead>

                            <TableHead className="text-gray-900 font-semibold">
                                Date
                            </TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {cases.map((item) => (

                            <TableRow
                                key={item.fir}
                                className="hover:bg-gray-50"
                            >

                                <TableCell className="font-semibold text-gray-900">
                                    {item.fir}
                                </TableCell>

                                <TableCell className="text-gray-700">
                                    {item.crime}
                                </TableCell>

                                <TableCell className="text-gray-700">
                                    {item.district}
                                </TableCell>

                                <TableCell>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Open"
                                            ? "bg-red-100 text-red-700"
                                            : item.status === "Closed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {item.status}
                                    </span>

                                </TableCell>

                                <TableCell className="text-gray-700">
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