import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import axios from "axios";
import styled from "styled-components";

const availableColors = ["#11009E", "#392467", "#451952"];

const getRandomColor = () => {
    return availableColors[Math.floor(Math.random() * availableColors.length)];
};

const StyledBox = styled.div`
    background-color: ${(props) => props.bgColor || getRandomColor()};
`;

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
            imageSrc: "/upload/images/1703725348022.png",
            bankName: "Vietcombank",
            accountInfo: "Tran Hoai Nam\n1021447111",
            amount: "35.000đ",
            order_type: 1,
        },
        {
            key: "2",
            imageSrc: "/upload/images/1703725348022.png",
            bankName: "Vietcombank",
            accountInfo: "Tran Hoai Nam\n1021447111",
            amount: "60.000đ",
            order_type: 2,
        },
        {
            key: "3",
            imageSrc: "/upload/images/1703725348022.png",
            bankName: "Vietcombank",
            accountInfo: "Tran Hoai Nam\n1021447111",
            amount: "100.000đ",
            order_type: 3,
        },
    ];

    useEffect(() => {
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
                const { key, bankName, accountInfo, imageSrc, amount } =
                    selectedData;

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
                    setPaymentConfirmed(true);
                    setTimeout(() => {
                        closeModal();
                        window.location.reload();
                    });
                } else {
                }
            }
        } catch (error) {}

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
                    className={`flex flex-col bg-white p-2 px-6 pb-6 border border-gray-200 rounded-lg shadow md:max-w-xl ${
                        isPaymentAllowed ? "hover:bg-gray-100" : ""
                    } dark:border-gray-700 dark:bg-gray-800 ${
                        isPaymentAllowed ? "dark:hover:bg-gray-700" : ""
                    }`}
                >
                    <button onClick={closeModal} className="flex justify-end">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7 stroke-2 stroke-red-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <div className="flex flex-row">
                        <img
                            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                            src={imageSrc}
                            alt="d"
                        />
                        <div className="flex flex-col gap-4 text-center p-4">
                            <div className="text-2xl font-bold text-black">
                                {bankName}
                            </div>
                            <div className="flex flex-col font-normal text-black">
                                <span>{accountInfo}</span>
                                <span>{amount}</span>
                            </div>
                            {auth.user && auth.user.status === 0 && (
                                <div className="flex flex-col items-center gap-2 text-black">
                                    Đảm bảo bạn đã thanh toán trước khi click
                                    vào nút thanh toán
                                    <button
                                        onClick={handlePayment}
                                        className="w-28 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                                    >
                                        Thanh toán
                                    </button>
                                </div>
                            )}
                            {auth.user && auth.user.status === 1 && (
                                <p className="text-red-500">
                                    Bạn đã thanh toán trước đó. Chờ kiểm tra và
                                    không thể thanh toán lại.
                                </p>
                            )}
                            {auth.user && auth.user.status === 2 && (
                                <button
                                    onClick={handlePayment}
                                    className="w-28 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                                    disabled
                                >
                                    Đã thanh toán
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <DefaultLayout auth={auth}>
            <div className="mt-2 lg:overflow-auto lg:h-2/3">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="lg:text-2xl text-green-400 lg:fixed top-6 right-1/3 text-base font-bold">
                        BEEMUSIC PREMIUM
                    </h1>
                    <h2 className="mt-3 text-3xl text-cyan-400">
                        Không chỉ là nghe nhạc
                    </h2>
                    <h2 className="mt-1 text-3xl text-cyan-400">
                        Tải xuống & Kiếm tiền không giới hạn
                    </h2>
                    <div className="flex flex-row gap-3 mt-3 text-3xl">
                        <p className="line-through text-gray-500">99.000đ</p>
                        <p className="text-red-500">35.000đ/tháng</p>
                    </div>
                    <button
                        className="lg:text-3xl w-60 h-14 font-semibold mt-5 bg-blue-600 hover:bg-violet-700 active:bg-blue-700
                        focus:outline-none focus:ring focus:ring-blue-300 text-white p-2 rounded-full
                        shadow-lg shadow-indigo-500/40"
                        onClick={() => handleButtonClick("1-month")}
                    >
                        Mua Premium
                    </button>
                    <h2 className="mt-5 text-3xl text-white">
                        Chọn gói tiết kiệm và phù hợp đối với bạn
                    </h2>
                </div>
                <div className="flex gap-4 mt-8 justify-between">
                    {modalData.map((modal) => (
                        <StyledBox
                            key={modal.key}
                            className={`max-w-sm p-6 ${
                                activeButton === modal.key
                                    ? "bg-neutral-900"
                                    : "bg-neutral-900"
                            } rounded-lg`}
                            onClick={() => handleButtonClick(modal.key)}
                        >
                            <div className="border-b border-gray-400 w-full mb-2">
                                <h5 className="mb-2 text-2xl font-semibold text-white">
                                    {modal.amount}
                                </h5>
                            </div>
                            <div className="flex flex-row gap-2 mb-3 font-normal text-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-6 stroke-green-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                    />
                                </svg>
                                <span>Tải nhạc không giới hạn</span>
                            </div>
                            <div className="flex flex-row gap-2 mb-3 font-normal text-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-6 stroke-green-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                    />
                                </svg>
                                <span>
                                    Tạo playlist riêng theo sở thích của bạn
                                </span>
                            </div>
                            <div className="flex flex-row gap-2 mb-3 font-normal text-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-6 stroke-green-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                    />
                                </svg>
                                <span>Kiếm tiền từ những sáng tạo của bạn</span>
                            </div>
                            <a
                                href="#"
                                className={`flex flex-row p-2 gap-2 w-28 items-center text-base font-medium text-gray-200 rounded-lg
                                bg-violet-600 hover:bg-violet-600 active:bg-violet-700
                                focus:outline-none focus:ring focus:ring-violet-300 border-b border-gray-400 shadow-lg shadow-indigo-500/40 ${
                                    activeButton === modal.key ? "active" : ""
                                }`}
                            >
                                {modal.amount}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </a>
                        </StyledBox>
                    ))}

                    {isModalOpen && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
                            <div className="bg-cyan-200 p-8 rounded-lg">
                                {renderModalContent()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
