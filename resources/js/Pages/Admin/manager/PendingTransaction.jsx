import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function PendingTransaction({ auth, paymentData }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(30);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [data, setData] = useState(paymentData);

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

    const openModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    const getCsrfToken = () => {
        return document.head.querySelector('meta[name="csrf-token"]').content;
    };

    const handleStatusUpdate = async (action) => {
        const newStatus = action === "approve" ? 2 : 4;

        try {
            const csrfToken = getCsrfToken();
            const response = await fetch("/api/update-transaction-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({
                    transaction_id: selectedTransaction.id,
                    new_status: newStatus,
                }),
            });

            if (response.ok) {
                // Lấy dữ liệu mới sau khi cập nhật
                const updatedDataResponse = await fetch(
                    "/get-all-transactions"
                );
                const updatedData = await updatedDataResponse.json();
                setData(updatedData);

                handleModalClose();
                window.location.reload();
            } else {
                const responseData = await response.json();
                console.error(
                    "Error updating transaction status:",
                    responseData.error
                );
            }
        } catch (error) {
            console.error("Error updating transaction status:", error.message);
        }
    };

    useEffect(() => {
        // Nếu paymentData thay đổi, cập nhật data
        setData(paymentData);
    }, [paymentData]);

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="flex flex-col h-full p-3 bg-neutral-900">
                    <div className="flex flex-row justify-between mt-2">
                        <h2 className="font-semibold text-white text-2xl">
                            Giao dịch cần xử lí
                        </h2>
                    </div>
                    <div className="flex space-x-10 mt-2">
                        <Link
                            href={route("manager.pending")}
                            className="bg-zinc-800 text-white py-3 ml-4 px-2 rounded-md transition-all duration-300"
                        >
                            Cần xử lí
                        </Link>
                        <Link
                            href={route("manager.success")}
                            className="bg-zinc-800 text-white py-3 px-2 rounded-md transition-all duration-300"
                        >
                            Giao dịch thành công
                        </Link>
                        <Link
                            href={route("manager.refuse")}
                            className="bg-zinc-800 text-white py-3 px-2 rounded-md transition-all duration-300"
                        >
                            Giao dịch thất bại
                        </Link>
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
                                            onClick={() =>
                                                openModal(transaction)
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            <td>{transaction.id}</td>
                                            <td>{transaction.user.name}</td>
                                            <td>{transaction.order_id}</td>
                                            <td>
                                                {formatCurrency(
                                                    transaction.amount
                                                )}
                                            </td>
                                            <td>
                                                {transaction.status === 1
                                                    ? "Đang chờ xử lí"
                                                    : transaction.status === 2
                                                    ? "Thành công"
                                                    : transaction.status === 4
                                                    ? "Bị từ chối"
                                                    : "Trạng thái không xác định"}
                                            </td>
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
                            length: Math.ceil(
                                paymentData.length / itemsPerPage
                            ),
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

            {/* Modal */}
            {isModalOpen && selectedTransaction && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg relative">
                        <button
                            onClick={handleModalClose}
                            className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-800"
                        >
                            X
                        </button>
                        <div>
                            <h3>ID: {selectedTransaction.id}</h3>
                            <p>Người mua: {selectedTransaction.user.name}</p>
                            <p>Order ID: {selectedTransaction.order_id}</p>
                            <p>
                                Số tiền:{" "}
                                {formatCurrency(selectedTransaction.amount)}
                            </p>
                            <p>
                                Trạng thái:{" "}
                                {selectedTransaction.status === 1
                                    ? "Đang chờ xử lí"
                                    : "Chưa mua"}
                            </p>
                            <div className="flex">
                                <button
                                    onClick={() =>
                                        handleStatusUpdate("approve")
                                    }
                                >
                                    Đồng ý
                                </button>{" "}
                                |
                                <button
                                    onClick={() => handleStatusUpdate("reject")}
                                >
                                    Từ chối
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
