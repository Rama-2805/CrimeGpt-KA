"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BarChart3,
    MapPinned,
    Network,
    Bot,
    FileText,
    Settings,
    Shield,
    Users,
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart3,
    },
    {
        title: "Hotspots",
        href: "/hotspots",
        icon: MapPinned,
    },
    {
        title: "Network",
        href: "/network",
        icon: Network,
    },
    {
        title: "AI Assistant",
        href: "/assistant",
        icon: Bot,
    },
    {
        title: "FIR Management",
        href: "/firs",
        icon: FileText,
    },
    {
        title: "Officer Directory",
        href: "/officers",
        icon: Users,
    },
    {
        title: "Reports",
        href: "/reports",
        icon: FileText,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export default function Sidebar() {

    const pathname = usePathname();

    return (
        <aside className="w-72 min-h-screen bg-slate-100 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white flex flex-col transition-colors duration-200">

            {/* Logo */}

            <div className="border-b border-slate-200 dark:border-slate-800 px-7 py-8">

                <div className="flex items-center gap-3">

                    <Shield className="text-blue-500" size={34} />

                    <div>

                        <h1 className="text-3xl font-bold text-slate-805 dark:text-slate-100">
                            CrimeGPT-KA
                        </h1>

                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Karnataka Police Intelligence
                        </p>

                    </div>

                </div>

            </div>

            {/* Menu */}

            <nav className="flex-1 mt-6 px-4">

                <div className="space-y-2">

                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        const active =
                            pathname === item.href;

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 border ${active
                                    ? "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-500/20 font-semibold shadow-[inset_0_0_12px_rgba(59,130,246,0.06)]"
                                    : "border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-white"
                                    }`}
                            >

                                <Icon size={22} />

                                <span className="text-lg">
                                    {item.title}
                                </span>

                            </Link>
                        );
                    })}

                </div>

            </nav>

            {/* Footer */}

            <div className="border-t border-slate-200 dark:border-slate-800 p-5">

                <p className="text-slate-500 dark:text-gray-400 text-sm">
                    CrimeGPT-KA v1.0
                </p>

                <p className="text-slate-400 dark:text-gray-505 text-xs mt-1">
                    © Karnataka Police
                </p>

            </div>

        </aside>
    );
}