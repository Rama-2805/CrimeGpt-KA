"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

interface Officer {
    id: number;
    name: string;
    role: string;
    district: string;
    phone: string;
    email: string;
    status: "Active" | "On Leave" | "On Duty";
}

const officers: Officer[] = [
    {
        id: 1,
        name: "Shri Alok Kumar, IPS",
        role: "Additional Director General of Police (ADGP)",
        district: "Bengaluru Urban",
        phone: "+91 80-22211777",
        email: "adgp.laworder@ksp.gov.in",
        status: "Active"
    },
    {
        id: 2,
        name: "Shri Pratap Reddy, IPS",
        role: "Commissioner of Police",
        district: "Bengaluru Urban",
        phone: "+91 80-22942222",
        email: "cop.bengaluru@ksp.gov.in",
        status: "Active"
    },
    {
        id: 3,
        name: "Smt. Isha Pant, IPS",
        role: "Superintendent of Police (SP)",
        district: "Mysuru",
        phone: "+91 821-2444800",
        email: "sp.mysore@ksp.gov.in",
        status: "On Duty"
    },
    {
        id: 4,
        name: "Shri Harish Pandey, IPS",
        role: "Superintendent of Police (SP)",
        district: "Mangaluru",
        phone: "+91 824-2220800",
        email: "sp.dk@ksp.gov.in",
        status: "Active"
    },
    {
        id: 5,
        name: "Smt. Divya Sara Thomas, IPS",
        role: "Superintendent of Police (SP)",
        district: "Belagavi",
        phone: "+91 831-2405200",
        email: "sp.belgaum@ksp.gov.in",
        status: "On Leave"
    }
];

export default function OfficersPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="mb-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm dark:shadow-xl relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-50/20 dark:from-blue-955/20 via-white dark:via-slate-900 to-white dark:to-slate-900 transition-colors">
                    <h1 className="text-3xl font-bold text-slate-808 dark:text-slate-100">
                        Officer Directory 👮
                    </h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-355">
                        Karnataka Police Department assigned officers and contact details.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {officers.map((officer) => (
                        <div
                            key={officer.id}
                            className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-lg space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-150 dark:border-blue-500/20">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-808 dark:text-slate-100 text-lg leading-tight">
                                            {officer.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            {officer.role}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${officer.status === "Active"
                                            ? "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                                            : officer.status === "On Duty"
                                                ? "bg-blue-105 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                                                : "bg-yellow-105 text-yellow-605 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20"
                                        }`}
                                >
                                    {officer.status}
                                </span>
                            </div>

                            <hr className="border-slate-200 dark:border-slate-800" />

                            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                <p className="flex items-center gap-2">
                                    <MapPin size={16} className="text-slate-400 dark:text-slate-505" />
                                    <span>{officer.district}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone size={16} className="text-slate-400 dark:text-slate-505" />
                                    <span>{officer.phone}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail size={16} className="text-slate-400 dark:text-slate-505" />
                                    <span className="font-mono text-xs">{officer.email}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
