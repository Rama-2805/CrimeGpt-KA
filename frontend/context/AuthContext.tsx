"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

interface User {
    username: string;
    role: "admin" | "officer";
}

interface AuthContextType {
    user: User | null;
    login: (
        username: string,
        password: string
    ) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("crimegpt-user");

        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const login = (
        username: string,
        password: string
    ) => {

        if (
            username === "admin" &&
            password === "admin123"
        ) {

            const admin = {
                username,
                role: "admin" as const,
            };

            localStorage.setItem(
                "crimegpt-user",
                JSON.stringify(admin)
            );

            setUser(admin);

            return true;
        }

        if (
            username === "officer" &&
            password === "officer123"
        ) {

            const officer = {
                username,
                role: "officer" as const,
            };

            localStorage.setItem(
                "crimegpt-user",
                JSON.stringify(officer)
            );

            setUser(officer);

            return true;
        }

        return false;
    };

    const logout = () => {

        localStorage.removeItem("crimegpt-user");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}