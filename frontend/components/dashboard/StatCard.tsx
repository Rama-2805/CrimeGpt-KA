import { ReactNode } from "react";
import {
    FileText,
    FolderOpen,
    Search,
    CheckCircle,
    AlertTriangle,
    ShieldAlert,
    MapPin,
} from "lucide-react";

interface Props {
    title: string;
    value: string;
}

export default function StatCard({ title, value }: Props) {

    const styles: Record<
        string,
        {
            icon: ReactNode;
            iconBg: string;
        }
    > = {
        "Total FIRs": {
            icon: <FileText size={24} />,
            iconBg: "bg-blue-100 text-blue-600 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
        },

        "Open Cases": {
            icon: <FolderOpen size={24} />,
            iconBg: "bg-red-100 text-red-650 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.15)]",
        },

        "Investigating": {
            icon: <Search size={24} />,
            iconBg: "bg-yellow-100 text-yellow-650 border border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20 shadow-[0_0_12px_rgba(234,179,8,0.15)]",
        },

        "Closed Cases": {
            icon: <CheckCircle size={24} />,
            iconBg: "bg-green-100 text-green-655 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20 shadow-[0_0_12px_rgba(34,197,94,0.15)]",
        },

        "High Priority": {
            icon: <AlertTriangle size={24} />,
            iconBg: "bg-orange-100 text-orange-650 border border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20 shadow-[0_0_12px_rgba(249,115,22,0.15)]",
        },

        "Critical Priority": {
            icon: <ShieldAlert size={24} />,
            iconBg: "bg-rose-100 text-rose-650 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/25 shadow-[0_0_15px_rgba(244,63,94,0.25)]",
        },

        "Districts Covered": {
            icon: <MapPin size={24} />,
            iconBg: "bg-purple-100 text-purple-650 border border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.15)]",
        },
    };

    const style = styles[title] || {
        icon: <FileText size={24} />,
        iconBg: "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20",
    };

    return (
        <div
            className="rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-white shadow-sm dark:shadow-md p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl dark:shadow-slate-950/20"
        >
            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                        {value}
                    </h2>
                    
                    <p className="text-slate-400 dark:text-slate-500 mt-2 text-sm">
                        Updated just now
                    </p>

                </div>

                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${style.iconBg}`}
                >
                    {style.icon}
                </div>

            </div>
        </div>
    );
}