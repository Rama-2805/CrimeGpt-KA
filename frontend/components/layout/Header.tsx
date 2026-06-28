"use client";

import { useEffect, useState } from "react";
import { LogOut, Shield, CalendarDays, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {

    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const [today, setToday] = useState("");

    useEffect(() => {
        setToday(
            new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            })
        );
    }, []);

    return (
        <header className="flex items-center justify-between bg-white dark:bg-slate-900 px-8 py-5 border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-lg transition-colors duration-200">

            <div>

                <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
                    Crime Intelligence Dashboard
                </h1>

                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Karnataka Police Intelligence Platform
                </p>

            </div>

            <div className="flex items-center gap-5">

                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850 transition"
                    aria-label="Toggle Theme"
                >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">

                    <CalendarDays size={18} />

                    <span className="text-sm font-medium">
                        {today}
                    </span>

                </div>

                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40 px-4 py-2 rounded-full">

                    <Shield size={18} />

                    <span className="font-semibold capitalize">
                        {user?.role ?? "Guest"}
                    </span>

                </div>

                <button
                    onClick={() => {
                        logout();
                        router.push("/login");
                    }}
                    className="flex items-center gap-2 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-850/40 px-4 py-2 rounded-lg transition font-medium"
                >
                    <LogOut size={18} />
                    Logout
                </button>

            </div>

        </header>
    );
}