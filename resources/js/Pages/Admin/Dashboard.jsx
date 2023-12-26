import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function Dashboard({
    auth,
    transactions,
    transactionCountSuccess,
    transactionRefuse,
    transactionPending,
    revenue,
}) {
    const [showGreeting, setShowGreeting] = useState(true);
    const [userMusicInfo, setUserMusicInfo] = useState([]);
    const [totalSongs, setTotalSongs] = useState(0);
    const [totalView, setTotalView] = useState(0);
    const [totalAlbums, settotalAlbums] = useState(0);
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
            .get("/user-music-info")
            .then((response) => {
                setUserMusicInfo(response.data.userMusicInfo);
                setTotalSongs(response.data.totalSongs);
                settotalAlbums(response.data.totalAlbums);
            })
            .catch((error) => {

            });

        axios
            .get("/user-music-info")
            .then((response) => {
                setUserMusicInfo(response.data.userMusicInfo);
            })
            .catch((error) => {

            });

        axios
            .get("/get-total-view")
            .then((response) => {
                setTotalView(response.data.totalView);
            })
            .catch((error) => {

            });

        axios
            .get("/dashboard-data")
            .then((response) => {
                setTopUsers(response.data.topUsers);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [userMusicInfo]);

    return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5803463 (committtttt)
=======
>>>>>>> 5803463 (committtttt)
=======
>>>>>>> back-end
        <AuthenticatedLayout user={auth.user}>
            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-cyan-700 overflow-hidden shadow-sm sm:rounded-lg">
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6564759 (cmf)
=======
>>>>>>> 173ac7d (cmft)
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
                                            Xin chào,
                                            <span style={{ color: "#ffffff" }}>
                                                {auth.user.id_role === 1
                                                    ? "Admin"
                                                    : auth.user.id_role === 3
                                                    ? "Artist"
                                                    : ""}
                                                {userName}!
                                            </span>
                                            Bạn đã đăng nhập.
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
<<<<<<< HEAD
                        <StatisticalPremium
                            auth={auth}
                            revenueTotal={revenueTotal}
                            last15DaysRevenue={last15DaysRevenue}
                            transactions={transactions}
                        />
=======
>>>>>>> 173ac7d (cmft)
                    </div>
                    {auth.user.id_role === 1 && (
                        <div className="text-white pt-2 py-5">
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
<<<<<<< HEAD
=======

>>>>>>> 173ac7d (cmft)
                            <div className="flex gap-10">
                                {topUsers && topUsers.length > 0 ? (
                                    <div className="flex gap-10 mt-4">
                                        {topUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className="bg-gray-800 p-4 rounded-md mb-4"
                                                style={{ width: "200px" }}
                                            >
                                                <h2 className="text-xl font-semibold mb-2">
                                                    <a
                                                        href={`/artist/${user.id}`}
                                                    >
                                                        {user.name}
                                                    </a>
                                                </h2>
                                                <p>
                                                    Tổng view:{" "}
                                                    {user.total_view.toLocaleString()}
<<<<<<< HEAD
                                                    {user.name}
                                                </p>
                                                <p>
                                                    Tổng view:{" "}
                                                    {user.total_view.toLocaleString()}
                                                </p>

                                                <p>
                                                    Tổng view:{" "}
                                                    {user.total_view.toLocaleString()}
=======
>>>>>>> 173ac7d (cmft)
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
                        <div>
                            {userMusicInfo && userMusicInfo.length > 0 ? (
                                <div className="text-white pt-2">
                                    <h2 className="block text-2xl text-white">
                                        Thống kê Artist: {userName}
                                    </h2>
                                    <div className="flex gap-10 mt-4">
                                        <div className="bg-gray-800 p-4 rounded-md mb-4 flex-1">
                                            <h2 className="text-xl font-semibold mb-2">
                                                Tổng số Views
                                            </h2>
                                            <p>{totalView.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-blue-800 p-4 rounded-md mb-4 flex-1">
                                            <h2 className="text-xl font-semibold mb-2">
                                                Tổng số bài hát
                                            </h2>
                                            <p>{totalSongs}</p>
                                        </div>
                                        <div className="bg-green-800 p-4 rounded-md mb-4 flex-1">
                                            <h2 className="text-xl font-semibold mb-2">
                                                Tổng số Albums
                                            </h2>
                                            <p>{totalAlbums}</p>
                                        </div>
                                        <div className="bg-red-800 p-4 rounded-md mb-4 flex-1">
                                            <h2 className="text-xl font-semibold mb-2">
                                                Số tiền bạn nhận được
                                            </h2>
                                            <p>0đ</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {userMusicInfo.map((music) => (
                                            <div
                                                key={music.id}
                                                className="max-w-sm mt-4 rounded overflow-hidden shadow-lg bg-gray-800"
                                                style={{ width: "170px" }}
                                            >
                                                <div className="aspect-w-16 aspect-h-9">
                                                    <img
                                                        style={{
                                                            width: "170px",
                                                            height: "170px",
                                                        }}
                                                        className="object-cover"
                                                        src={`../upload/images/${music.thumbnail}`}
                                                        alt={music.name}
                                                    />
                                                </div>
                                                <div className="px-6 py-4 flex flex-col items-center justify-center">
                                                    <div className="font-bold text-xl mb-2 text-white">
                                                        {music.name}
                                                    </div>
                                                    <p className="text-base text-white">
                                                        Views: {music.view}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p>Không có thông tin âm nhạc nào.</p>
                            )}
                        </div>
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
