import React, { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth, revenueTotal, last15DaysRevenue }) {
    const [showGreeting, setShowGreeting] = useState(true);
    const userName = auth.user.name;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGreeting(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Update chart with new data when revenueTotal or last15DaysRevenue changes
        updateChart();
    }, [revenueTotal, last15DaysRevenue]);

    const updateChart = () => {
        const chartData = {
            labels: ["Last 15 Days", "Total Revenue"],
            datasets: [
                {
                    fill: false,
                    lineTension: 0,
                    backgroundColor: ["rgba(255,0,0,1.0)", "rgba(0,0,255,1.0)"],
                    borderColor: ["rgba(255,0,0,0.1)", "rgba(0,0,255,0.1)"],
                    data: [last15DaysRevenue, revenueTotal],
                },
            ],
        };

        const chartOptions = {
            legend: { display: true },
            scales: {
                yAxes: [{ ticks: { beginAtZero: true } }],
            },
        };

        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: chartOptions,
        });
    };

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
                        <canvas
                            id="myChart"
                            style={{
                                width: "100%",
                                maxWidth: "600px",
                            }}
                        ></canvas>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
