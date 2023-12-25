import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
<<<<<<< HEAD
import axios from "axios";

export default function Dashboard({
    auth,
    transactions,
    transactionCountSuccess,
    transactionRefuse,
    transactionPending,
    revenue,
}) {
=======
import StatisticalPremium from "@/Pages/Admin/thongke/StatisticalPremium";

export default function Dashboard({ auth, revenueTotal, last15DaysRevenue, transactions }) {
>>>>>>> b4380f4 (fixxx)
    const [showGreeting, setShowGreeting] = useState(true);
    const transactionCount = transactions ? transactions.length : 0;
    const countSuccess = transactionCountSuccess ? transactionCountSuccess : 0;
    const pending = transactionPending ? transactionPending : 0;
    const Refuse = transactionRefuse ? transactionRefuse : 0;
    const userName = auth.user.name;

    const formattedRevenue = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(revenue || 0);

    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        axios
            .get("/dashboard-data")
            .then((response) => {
                console.log("API Response:", response.data);
                setTopUsers(response.data.topUsers);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
<<<<<<< HEAD
        <AuthenticatedLayout user={auth.user}>
            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-cyan-400 overflow-hidden shadow-sm sm:rounded-lg">
                        {auth.user.id_role === 2 && (
                            <div className="p-6 text-gray-900">
                                Bạn không có quyền truy cập.
                            </div>
                        )}
                        {auth.user.id_role !== 2 && showGreeting && (
                            <div className="p-4 text-gray-900">
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
=======
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
>>>>>>> b4380f4 (fixxx)
                    </div>
                    {auth.user.id_role === 1 && (
                        <div className="text-white pt-2">
                            <h2 className="block text-2xl">Premium</h2>
                            <div className="flex gap-10 mt-4">
                                <div className="bg-gray-800 p-4 rounded-md mb-4 flex-1">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Tổng số giao dịch
                                    </h2>
                                    <p>{transactionCount}</p>
                                </div>
                                <div className="bg-blue-600 p-4 rounded-md mb-4 flex-1">
                                    <h2 className="text-xl font-semibold mb-2">
                                        <a href="/PendingTransaction">
                                            Cần xử lí
                                        </a>
                                    </h2>
                                    <p>{pending}</p>
                                </div>
                                <div className="bg-green-600 p-4 rounded-md mb-4 flex-1">
                                    <h2 className="text-xl font-semibold mb-2">
                                        <a
                                            href="/SuccessfulTransaction"
                                            rel="stylesheet"
                                        >
                                            Thành công
                                        </a>
                                    </h2>
                                    <p>{countSuccess}</p>
                                </div>
                                <div className="bg-red-600 p-4 rounded-md mb-4 flex-1">
                                    <h2 className="text-xl font-semibold mb-2">
                                        <a href="/RefuseTransaction">
                                            Thất bại
                                        </a>
                                    </h2>
                                    <p>{Refuse}</p>
                                </div>

                                <div className="bg-orange-600 p-4 rounded-md mb-4 flex-1">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Doanh thu
                                    </h2>
                                    <p>{formattedRevenue}</p>
                                </div>
                            </div>
                            <h2 className="block text-2xl">Top nghệ sĩ</h2>
                            <div className="flex gap-10 mt-4">
                                {topUsers && topUsers.length > 0 ? (
                                    <div className="flex gap-10 mt-4">
                                        {topUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className="bg-gray-800 p-4 rounded-md mb-4"
                                                style={{ width: "200px" }}
                                            >
                                                <h2 className="text-xl font-semibold mb-2">
                                                    {user.name}
                                                </h2>
                                                <p>
                                                    <p>
                                                        Tổng view:{" "}
                                                        {user.total_view.toLocaleString()}
                                                    </p>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Không có nghệ sĩ nào.</p>
                                )}
                            </div>
                        </div>
                    )}
                    {auth.user.id_role === 3 && (
                        <div className="text-white">hi Artis</div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
