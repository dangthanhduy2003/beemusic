import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Chart from "react-google-charts";
export default function Statistical({ auth, paymentData }) {
    const [successfulTransactions, setSuccessfulTransactions] = useState([]);
    const [googleChartsLoaded, setGoogleChartsLoaded] = useState(false);

    useEffect(() => {
        axios
            .get("/get-stripe-transactions")
            .then((response) => {
                const transactions = response.data.transactions;
                setSuccessfulTransactions(transactions);
            })
            .catch((error) => {
                console.error("Error fetching Stripe transactions:", error);
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
                {auth.user.id_role === 1 && (
                    <div className="text-white pt-2 py-5 mx-auto sm:px-6 lg:px-4">
                        <h2 className="font-semibold text-white text-2xl">
                            Premium
                        </h2>
                        <div className="gap-3 flex mt-5">
                            <div style={{ width: "50%" }}>
                                {drawMonthlyChart(successfulTransactions)}
                                <h2 className="block text-sm text-center mt-1">
                                    Biểu đồ theo tháng
                                </h2>
                            </div>

                            <div style={{ width: "50%" }}>
                                {drawDailyChart(successfulTransactions)}
                                <h2 className="block text-sm text-center mt-1">
                                    Biểu đồ theo ngày
                                </h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
