import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StatisticalPremium from "@/Pages/Admin/thongke/StatisticalPremium";

export default function Dashboard({ auth, revenueTotal, last15DaysRevenue, transactions }) {
    const [showGreeting, setShowGreeting] = useState(true);
    const userName = auth.user.name;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGreeting(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="py-5">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-cyan-400 overflow-hidden shadow-sm sm:rounded-lg">
                            {auth.user.id_role === 2 ? (
                                <>
                                    <div className="p-6 text-gray-900">
                                        Bạn không có quyền truy cập.
                                    </div>
                                </>
                            ) : (
                                <>
                                    {showGreeting && (
                                        <div className="p-6 text-gray-900">
                                            Xin chào,{" "}
                                            <span style={{ color: "#ffffff" }}>
                                                {auth.user.id_role === 1
                                                    ? "Admin"
                                                    : auth.user.id_role === 3
                                                    ? "Artist"
                                                    : ""}{" "}
                                                {userName}!
                                            </span>{" "}
                                            Bạn đã đăng nhập.
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <StatisticalPremium
                            auth={auth}
                            revenueTotal={revenueTotal}
                            last15DaysRevenue={last15DaysRevenue}
                            transactions={transactions}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
