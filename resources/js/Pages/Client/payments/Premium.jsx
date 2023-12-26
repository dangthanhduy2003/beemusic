import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import axios from "axios";

export default function Premium({ auth }) {
    const [activeButton, setActiveButton] = useState("1-month");
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedModal, setSelectedModal] = useState(null);
    const [selectedOrderType, setSelectedOrderType] = useState(null);
    const [isPaymentConfirmed, setPaymentConfirmed] = useState(false);
    const [userPaymentStatus, setUserPaymentStatus] = useState(0);

    const modalData = [
        {
            key: "1",
            imageSrc: "/upload/images/1702390711_Mattroicuaem.jpg",
            bankName: "Vietcombank",
            accountInfo: "Tran Hoai Nam\n1021447111",
            amount: "35.000đ",
            order_type: 1,
        },
        {
            key: "2",
            imageSrc: "/upload/images/1702390711_Mattroicuaem.jpg",
            bankName: "Vietcombank",
            accountInfo: "Tran Hoai Nam\n1021447111",
            amount: "60.000đ",
            order_type: 2,
        },
        {
            key: "3",
            imageSrc: "/upload/images/1702390711_Mattroicuaem.jpg",
            bankName: "Vietcombank",
            accountInfo: "Tran Hoai Nam\n1021447111",
            amount: "100.000đ",
            order_type: 3,
        },
    ];

    useEffect(() => {
        // Fetch the user's payment status when the component mounts
        const fetchPaymentStatus = async () => {
            try {
                const response = await axios.get("/api/user/payment/status", {
                    params: {
                        user_id: auth.user.id,
                    },
                });

                if (response.data.success) {
                    setUserPaymentStatus(response.data.status);
                } else {
                    console.error("Error fetching user payment status");
                }
            } catch (error) {
                console.error("Error fetching user payment status:", error);
            }
        };

        fetchPaymentStatus();
    }, [auth.user.id]);

    const handleButtonClick = (button) => {
        if (userPaymentStatus === 0) {
            setActiveButton(button);
            setSelectedModal(button);
            setSelectedOrderType(
                modalData.find((item) => item.key === button)?.order_type ||
                    null
            );
            setModalOpen(true);
        } else {
            // Handle the case where payment has already been made
            console.log("Payment has already been made!");
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setPaymentConfirmed(false);
    };

    const handlePayment = async () => {
        try {
            const user_id = auth.user.id;
            const selectedData = modalData.find(
                (item) => item.key === selectedModal
            );

            if (selectedData) {
                const { key, bankName, accountInfo, imageSrc } = selectedData;

                // Chuyển đổi giá trị amount thành kiểu số nguyên
                const amount = parseInt(
                    selectedData.amount.replace(/\D/g, ""),
                    10
                );

                const paymentData = {
                    user_id: user_id,
                    order_type: selectedOrderType,
                    amount: amount,
                    modal: key,
                    bankName: bankName,
                    accountInfo: accountInfo,
                    imageSrc: imageSrc,
                };

                const csrfToken = document.head.querySelector(
                    'meta[name="csrf-token"]'
                ).content;

                const response = await axios.post(
                    "/api/payment/store",
                    paymentData,
                    {
                        headers: {
                            "X-CSRF-TOKEN": csrfToken,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.data.success) {
                    console.log("Dữ liệu thanh toán đã được lưu thành công!");
                    setPaymentConfirmed(true);
                    setTimeout(() => {
                        closeModal();
                    }, 3000);
                } else {
                    console.error(
                        "Lỗi khi lưu dữ liệu thanh toán. Mã trạng thái:",
                        response.status
                    );
                }
            }
        } catch (error) {
            console.error("Lỗi:", error);
        }

        closeModal();
    };

    const renderModalContent = () => {
        const selectedData = modalData.find(
            (item) => item.key === selectedModal
        );

        if (selectedData) {
            const { imageSrc, bankName, accountInfo, amount } = selectedData;

            const isPaymentAllowed = userPaymentStatus === 0;

            return (
                <div
                    className={`flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl ${
                        isPaymentAllowed ? "hover:bg-gray-100" : ""
                    } dark:border-gray-700 dark:bg-gray-800 ${
                        isPaymentAllowed ? "dark:hover:bg-gray-700" : ""
                    }`}
                >
                    <img
                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                        src={imageSrc}
                        alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal text-center">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {bankName}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {accountInfo} <br />
                            {amount}
                        </p>
                        {isPaymentAllowed && (
                            <button
                                onClick={handlePayment}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Đã thanh toán
                            </button>
                        )}
                        {!isPaymentAllowed && (
                            <p className="text-red-500">
                                Bạn đã thanh toán trước đó. Không thể thanh toán
                                lại.
                            </p>
                        )}
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <DefaultLayout auth={auth}>
            <div className="flex flex-col items-center justify-center overflow-auto">
                <h1 className="text-2xl fixed top-5 start-96 text-base font-bold text-white">
                    Premium
                </h1>
                <div className="mt-10 text-2xl text-blue-600 flex justify-center">
                    BEEMUSIC PREMIUM
                </div>
                <div className="mt-9 text-4xl text-blue-400 justify-center">
                    <h2 className="text-blue-400 flex justify-center">
                        Tải xuống không giới hạn & Kiếm tiền không giới hạn
                    </h2>
                    <h2 className="text-blue-400 mt-2 flex justify-center">
                        Không chỉ là nghe nhạc
                    </h2>
                </div>
                <h2 className="mt-10 text-2xl text-center text-blue-400">
                    35.000đ/ tháng
                </h2>
                <button
                    className="text-4xl mt-10 bg-blue-500 text-gray-300 px-7 py-4 rounded"
                    style={{ borderRadius: "100px" }}
                    onClick={() => handleButtonClick("1-month")}
                >
                    Premium
                </button>

                <h2 className="mt-10 text-xl text-center text-blue-400">
                    Hãy không ngừng sáng tạo và nhận lại những mức thu lao hấp
                    dẫn!
                </h2>
            </div>
            <div className="text-white text-4xl text-center mt-10">ảnh</div>
            <div className="flex items-center gap-4 mt-10 justify-center">
                {modalData.map((modal) => (
                    <div
                        key={modal.key}
                        className={`max-w-sm p-6 ${
                            activeButton === modal.key ? "bg-white" : "bg-white"
                        } border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
                        onClick={() => handleButtonClick(modal.key)}
                    >
                        <div>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {modal.amount}
                            </h5>
                        </div>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Tải nhạc không giới hạn, tạo playlist riêng theo sở
                            thích của bạn <br />
                            Kiếm tiền từ những sáng tạo của bạn và còn nhiều hơn
                            thế nữa!
                        </p>
                        <a
                            href="#"
                            className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                                activeButton === modal.key ? "active" : ""
                            }`}
                        >
                            {modal.amount}
                            <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </a>
                    </div>
                ))}

                {isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-lg relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-800"
                            >
                                X
                            </button>
                            {renderModalContent()}
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}
