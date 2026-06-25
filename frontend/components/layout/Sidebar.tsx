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
    ClipboardList,
    Settings,
    Shield,
} from "lucide-react";

const menu = [
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
        icon: ClipboardList,
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
        <aside className="w-72 min-h-screen bg-slate-950 text-white border-r border-slate-800">
            <div className="flex items-center gap-3 p-6 border-b border-slate-800">
                <Shield className="text-blue-500" size={30} />
                <div>
                    <h1 className="font-bold text-xl">CrimeGPT-KA</h1>
                    <p className="text-xs text-slate-400">
                        Karnataka Police Intelligence
                    </p>
                </div>
            </div>

            <nav className="p-4 space-y-2">
                {menu.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${active
                                ? "bg-blue-600 text-white"
                                : "text-slate-300 hover:bg-slate-800"
                                }`}
                        >
                            <Icon size={20} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}