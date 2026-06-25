import { Search, Bell, CircleUserRound } from "lucide-react";

export default function Header() {
    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">

            <h1 className="text-3xl font-bold text-gray-900">
                Crime Intelligence Dashboard
            </h1>

            <div className="flex items-center gap-6">

                <Search
                    size={24}
                    className="text-gray-700 cursor-pointer hover:text-blue-600"
                />

                <Bell
                    size={24}
                    className="text-gray-700 cursor-pointer hover:text-blue-600"
                />

                <CircleUserRound
                    size={32}
                    className="text-gray-700 cursor-pointer hover:text-blue-600"
                />

            </div>

        </header>
    );
}