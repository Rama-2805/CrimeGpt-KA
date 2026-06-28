"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {

        if (!user) {
            router.replace("/login");
        }

    }, [user, router]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return <>{children}</>;
}