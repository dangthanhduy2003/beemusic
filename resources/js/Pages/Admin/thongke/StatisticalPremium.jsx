import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function StatisticalPremium({ auth, transactions }) {
    useEffect(() => {
        console.log("Transactions:", transactions);
    }, [transactions]);

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <h1>Statistical Premium</h1>
                <div className="flex">
                    <div className="All">
                        <h3>Tất cả giao dịch</h3>
                        <p>Bạn có tất cả: {transactions ? transactions.length : 0} giao dịch</p>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
