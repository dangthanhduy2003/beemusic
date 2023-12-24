import React, { useState } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import axios from "axios";

export default function Premium({ auth }) {
    const [activeButton, setActiveButton] = useState("1-month");
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedModal, setSelectedModal] = useState(null);
    const [selectedOrderType, setSelectedOrderType] = useState(null);

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

    const handleButtonClick = (button) => {
        setActiveButton(button);
        setSelectedModal(button);
        setSelectedOrderType(
            modalData.find((item) => item.key === button)?.order_type || null
        );
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handlePayment = async () => {
        try {
            const user_id = auth.user.id;
            const selectedData = modalData.find(
                (item) => item.key === selectedModal
            );

            if (selectedData) {
                const { key, bankName, accountInfo, amount, imageSrc } =
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

                console.log("Payment Data:", paymentData);

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

                if (response.status === 200) {
                    console.log("Dữ liệu thanh toán đã được lưu thành công!");
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

            return (
                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
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
                        <button
                            onClick={() => handlePayment(selectedModal)}
                            className="!bg-none bg-blue-500 text-white p-2 rounded"
                        >
                            Đã thanh toán
                        </button>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <DefaultLayout auth={auth}>
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
