"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">

                <Header />

                <main className="p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}