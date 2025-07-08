
'use client';
import Header from "@/components/Dashboard/Header/Header";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);

    useEffect(() => {
        const token = getCookie("token");

        // যদি token না থাকে, সরাসরি login এ পাঠিয়ে দাও
        if (!token && !loading) {
            setIsChecking(false);
            router.push("/login");
            return;
        }

        // AuthWrapper থেকে user load হওয়ার জন্য একটু wait করি
        const checkAuth = () => {
            if (!loading) {
                setIsChecking(false);
                // Token আছে কিন্তু user নেই মানে authentication failed
                if (!user?.email && !token && !loading) {
                    router.push("/login");
                }
            }
        };

        checkAuth();
    }, [user, loading, router]);

    // যদি token না থাকে বা user না থাকে, কিছু render করবো না
    const token = getCookie("token");

    if (!token && (!loading && !user)) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-600">
                <p className="text-lg font-semibold text-white">Please login to access the dashboard.</p>
            </div>
        );
    }


    // Loading state
    if (isChecking || loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-600">
                <p className="text-lg font-semibold text-white">Loading...</p>
            </div>
        );
    }


    if (user?.email) {
        return (
            <div className="h-screen max-h-screen overflow-hidden bg-gray-50">
                <div className="flex h-full">
                    <Sidebar />
                    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 bg-gray-50">
                            <div className="max-w-full">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <p>You are not logged in </p>
            </div>
        )
    }


}