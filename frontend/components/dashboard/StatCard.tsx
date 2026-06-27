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
            bg: string;
            iconBg: string;
        }
    > = {
        "Total FIRs": {
            icon: <FileText size={28} />,
            bg: "from-blue-500 to-blue-700",
            iconBg: "bg-blue-100 text-blue-700",
        },

        "Open Cases": {
            icon: <FolderOpen size={28} />,
            bg: "from-red-500 to-red-700",
            iconBg: "bg-red-100 text-red-700",
        },

        "Investigating": {
            icon: <Search size={28} />,
            bg: "from-yellow-500 to-orange-500",
            iconBg: "bg-yellow-100 text-yellow-700",
        },

        "Closed Cases": {
            icon: <CheckCircle size={28} />,
            bg: "from-green-500 to-green-700",
            iconBg: "bg-green-100 text-green-700",
        },

        "High Priority": {
            icon: <AlertTriangle size={28} />,
            bg: "from-orange-500 to-red-500",
            iconBg: "bg-orange-100 text-orange-700",
        },

        "Critical Priority": {
            icon: <ShieldAlert size={28} />,
            bg: "from-red-700 to-black",
            iconBg: "bg-red-200 text-red-800",
        },

        "Districts Covered": {
            icon: <MapPin size={28} />,
            bg: "from-purple-500 to-indigo-700",
            iconBg: "bg-purple-100 text-purple-700",
        },
    };

    const style = styles[title] || {
        icon: <FileText size={28} />,
        bg: "from-slate-500 to-slate-700",
        iconBg: "bg-slate-100 text-slate-700",
    };

    return (
        <div
            className={`rounded-2xl bg-gradient-to-r ${style.bg} text-white shadow-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
        >
            <div className="flex justify-between items-center">

                <div>

                    <p className="text-white/80 text-sm font-medium">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {value}
                    </h2>

                </div>

                <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${style.iconBg}`}
                >
                    {style.icon}
                </div>

            </div>
        </div>
    );
}