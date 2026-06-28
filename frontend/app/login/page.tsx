"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, User, Lock, Sun, Moon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function LoginPage() {
    const router = useRouter();
    const { user, login } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            router.replace("/dashboard");
        }
    }, [user, router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const success = login(username, password);

        if (!success) {
            setError("Invalid username or password.");
            return;
        }

        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/20 dark:from-blue-955/20 via-slate-50 dark:via-slate-955 to-slate-50 dark:to-slate-955 transition-colors">
            
            {/* Theme Toggle */}
            <div className="absolute top-6 right-6">
                <button
                    onClick={toggleTheme}
                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-sm cursor-pointer"
                >
                    {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-2xl p-10 w-full max-w-md text-slate-800 dark:text-slate-100 transition-colors">

                <div className="flex flex-col items-center mb-8">

                    <Shield
                        size={64}
                        className="text-blue-600 dark:text-blue-500"
                    />

                    <h1 className="text-3xl font-bold mt-4 text-slate-800 dark:text-slate-100 tracking-tight">
                        CrimeGPT-KA
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">
                        Crime Intelligence Platform
                    </p>

                </div>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <div>

                        <label className="font-medium text-slate-600 dark:text-slate-350 text-sm">
                            Username
                        </label>

                        <div className="flex items-center border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-955 rounded-lg px-3 mt-2 focus-within:border-blue-500 transition">

                            <User
                                size={18}
                                className="text-slate-400 dark:text-slate-500"
                            />

                            <input
                                className="w-full bg-transparent p-3 outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div>

                        <label className="font-medium text-slate-600 dark:text-slate-350 text-sm">
                            Password
                        </label>

                        <div className="flex items-center border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-955 rounded-lg px-3 mt-2 focus-within:border-blue-500 transition">

                            <Lock
                                size={18}
                                className="text-slate-400 dark:text-slate-500"
                            />

                            <input
                                type="password"
                                className="w-full bg-transparent p-3 outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {error && (
                        <p className="text-red-600 dark:text-red-400 text-sm font-semibold">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold transition cursor-pointer shadow-sm"
                    >
                        Login
                    </button>

                </form>

                <div className="mt-8 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-850 pt-4 space-y-1.5">

                    <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-1">
                        Demo Accounts
                    </p>

                    <p><b>Admin:</b> <span className="font-mono text-slate-700 dark:text-slate-300">admin</span> / <span className="font-mono text-slate-700 dark:text-slate-300">admin123</span></p>

                    <p><b>Officer:</b> <span className="font-mono text-slate-700 dark:text-slate-300">officer</span> / <span className="font-mono text-slate-700 dark:text-slate-300">officer123</span></p>

                </div>

            </div>

        </div>
    );
}