// PaymentTransaction.jsx
import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function PaymentTransaction({ auth, paymentData }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = paymentData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const formatCurrency = (amount) => {
        const formatter = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });
        return formatter.format(amount);
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="flex flex-col h-full p-3 bg-neutral-900">
                    <div className="flex flex-row justify-between mt-2">
                        <h2 className="font-semibold text-white text-2xl">
                            Danh sách giao dịch
                        </h2>
                    </div>
                    <div className="mt-4 text-white">
                        <table className="w-full">
                            <thead>
                                <tr className="text-xl font-light h-10 border-b border-neutral-700">
                                    <th className="lg:w-2/12">ID</th>
                                    <th className="lg:w-2/12">Người mua</th>
                                    <th className="lg:w-4/12">Order ID</th>
                                    <th className="lg:w-2/12">Số tiền</th>
                                    <th className="lg:w-4/12">Trạng thái</th>
                                </tr>
                            </thead>

                            <tbody className="text-center text-base">
                                {currentItems.length > 0 ? (
                                    currentItems.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="border-b border-neutral-800"
                                        >
                                            <td>{transaction.id}</td>
                                            <td>{transaction.user.name}</td>
                                            <td>{transaction.order_id}</td>
                                            {/* Chuyển định dạng số tiền sang VND bằng hàm formatCurrency */}
                                            <td>{formatCurrency(transaction.amount)}</td>
                                            <td>{transaction.status === 1 ? 'Thành công' : 'Chưa mua'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">
                                            No transactions available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination flex flex-row gap-2 mt-1">
                        {Array.from({
                            length: Math.ceil(paymentData.length / itemsPerPage),
                        }).map((_, index) => (
                            <button
                                className="bg-cyan-400 hover:bg-cyan-200 w-10 h-7 rounded-md"
                                key={index}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
