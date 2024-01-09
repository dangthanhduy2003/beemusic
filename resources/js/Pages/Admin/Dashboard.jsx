import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import Chart from "react-google-charts";

export default function Dashboard({ auth, revenue }) {
    const [showGreeting, setShowGreeting] = useState(true);
    const [userMusicInfo, setUserMusicInfo] = useState([]);
    const [totalSongs, setTotalSongs] = useState(0);
    const [totalView, setTotalView] = useState(0);
    const [totalAlbums, setTotalAlbums] = useState(0);
    const [userName, setUserName] = useState(auth.user.name);
    const [topUsers, setTopUsers] = useState([]);
    const [successfulTransactions, setSuccessfulTransactions] = useState([]);
    const [dailyTransactions, setDailyTransactions] = useState([]);
    const [googleChartsLoaded, setGoogleChartsLoaded] = useState(false);

    useEffect(() => {
        axios
            .get("/user-music-info")
            .then((response) => {
                setUserMusicInfo(response.data.userMusicInfo);
                setTotalSongs(response.data.totalSongs);
                setTotalAlbums(response.data.totalAlbums);
            })
            .catch((error) => {});

        axios
            .get("/get-total-view")
            .then((response) => {
                setTotalView(response.data.totalView);
            })
            .catch((error) => {});

        axios
            .get("/dashboard-data")
            .then((response) => {
                setTopUsers(response.data.topUsers);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

        axios
            .get("/get-stripe-transactions")
            .then((response) => {
                const transactions = response.data.transactions;
                setSuccessfulTransactions(transactions);
            })
            .catch((error) => {
                console.error("Error fetching Stripe transactions:", error);
            });


        axios
            .get("/get-daily-stripe-transactions")
            .then((response) => {
                const dailyTransactions = response.data.dailyTransactions;
                setDailyTransactions(dailyTransactions);
            })
            .catch((error) => {
                console.error("Error fetching daily transactions:", error);
            });
    }, []);

    useEffect(() => {
        if (!googleChartsLoaded) {
            const script = document.createElement("script");
            script.src = "https://www.gstatic.com/charts/loader.js";
            script.async = true;
            script.onload = () => {
                google.charts.load("current", { packages: ["corechart"] });
                google.charts.setOnLoadCallback(() => {
                    setGoogleChartsLoaded(true);
                });
            };
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        }
    }, [googleChartsLoaded]);

    const drawDailyChart = (transactions) => {
        if (!googleChartsLoaded) {
            return;
        }

        const dailyRevenue = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.created * 1000);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const key = `${day}/${month}`;
            const amount = transaction.amount;

            if (acc[key]) {
                acc[key] += amount;
            } else {
                acc[key] = amount;
            }

            return acc;
        }, {});

        const data = [["Ngày", "Doanh thu"]].concat(
            Object.entries(dailyRevenue).map(([date, amount]) => [date, amount])
        );

        return (
            <Chart
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: "Thống kê doanh thu theo ngày",
                    curveType: "function",
                    legend: { position: "bottom" },
                    hAxis: {
                        direction: -1, // vẽ từ trái
                        slantedText: false,
                    },
                }}
            />
        );
    };
    const drawMonthlyChart = (transactions) => {
        if (!googleChartsLoaded) {
            return;
        }

        const monthlyRevenue = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.created * 1000);
            const month = date.getMonth() + 1;
            const amount = transaction.amount;
            const index = acc.findIndex((entry) => entry[0] === month);

            if (index !== -1) {
                acc[index][1] += amount;
            } else {
                acc.push([month, amount]);
            }

            return acc;
        }, []);

        const data = [["Tháng", "Doanh thu"]].concat(
            monthlyRevenue.map(([month, amount]) => [String(month), amount])
        );

        return (
            <Chart
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: "Thống kê doanh thu theo tháng",
                    curveType: "function",
                    legend: { position: "bottom" },
                    hAxis: {
                        direction: -1, // vẽ từ trái
                        slantedText: false,
                    },
                }}
            />
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4 text-base">
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
                                    <div className="p-5 text-gray-900">
                                        Xin chào,
                                        <span className="text-white">
                                            {auth.user.id_role === 1
                                                ? " Admin "
                                                : auth.user.id_role === 3
                                                ? " Artist "
                                                : ""}
                                            {userName}!
                                        </span>
                                        Bạn đã đăng nhập.
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                {auth.user.id_role === 1 && (
                    <div className="text-white pt-2 py-5 mx-auto sm:px-6 lg:px-4">
                        <h2>Payment</h2>
                        <div>
                            <h3>All Transactions:</h3>
                            <ul>
                                {Array.isArray(successfulTransactions) &&
                                    successfulTransactions.map(
                                        (transaction) => (
                                            <li key={transaction.id}>
                                                Amount:{" "}
                                                {transaction.amount.toLocaleString()}{" "}
                                                {transaction.currency}
                                            </li>
                                        )
                                    )}
                            </ul>
                        </div>

                        <h2 className="block text-xl">Top nghệ sĩ</h2>
                        <div className="flex gap-10">
                            {topUsers && topUsers.length > 0 ? (
                                <div className="flex gap-10 mt-4">
                                    {topUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="bg-gray-800 p-4 rounded-md mb-4 w-52"
                                        >
                                            <h2 className="text-base font-semibold mb-2">
                                                <a href={`/artist/${user.id}`}>
                                                    {user.name}
                                                </a>
                                            </h2>
                                            <p className="text-sm">
                                                Tổng view:{" "}
                                                {user.total_view.toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Không có nghệ sĩ nào.</p>
                            )}
                        </div>

                        <div>
                            <h2 className="block text-xl">
                                Biểu đồ theo tháng
                            </h2>
                            {drawMonthlyChart(successfulTransactions)}
                        </div>

                        <div>
                            <h2 className="block text-xl">Biểu đồ theo ngày</h2>
                            {drawDailyChart(successfulTransactions)}
                        </div>
                    </div>
                )}

                {auth.user.id_role === 3 && (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {userMusicInfo && userMusicInfo.length > 0 ? (
                            <div className="text-white pt-2">
                                <h2 className="block font-semibold text-2xl text-white mt-10">
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

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                                    {userMusicInfo.map((music) => (
                                        <div
                                            key={music.id}
                                            className="max-w-sm mt-4 rounded overflow-hidden shadow-lg bg-gray-800"
                                        >
                                            <div className="aspect-w-16 aspect-h-9">
                                                <img
                                                    className="object-cover h-44 w-44"
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
    );
}
