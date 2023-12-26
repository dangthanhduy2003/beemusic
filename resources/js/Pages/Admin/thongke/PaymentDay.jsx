import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function PaymentDay({ auth }) {
    const [orderStatistics, setOrderStatistics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderStatistics = async () => {
            try {
                const response = await axios.get("/order-statistics-by-date", {
                    params: {
                        start_date: "2023-01-01",
                        end_date: "2023-12-31",
                    },
                });

                setOrderStatistics(response.data.order_statistics);
            } catch (error) {
                console.error("Error fetching order statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderStatistics();
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <h2>Order Statistics by Date</h2>
                        <ul>
                            {orderStatistics.map((stat) => (
                                <li key={stat.date}>
                                    Date: {stat.date}, Order Count:{" "}
                                    {stat.order_count}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
