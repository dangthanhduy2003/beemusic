import React, { useState } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";

export default function Premium({ auth }) {
    const [activeButton, setActiveButton] = useState("1-month");
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedModal, setSelectedModal] = useState(null);

    const handleButtonClick = (button) => {
        setActiveButton(button);
        setSelectedModal(button);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const handlePayment = async (selectedModal) => {
        const paymentData = {
            modal: selectedModal,
            // Thêm các thông tin khác cần thiết từ modal
        };

        try {
            const response = await fetch("/api/payment/store", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                console.log("Payment data saved successfully!");
            } else {
                console.error("Error saving payment data.");
            }
        } catch (error) {
            console.error("Error:", error);
        }


        closeModal();
    };

    const renderModalContent = () => {
        switch (selectedModal) {
            case "1-month":
                return (
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img
                            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                            src="/upload/images/1702390711_Mattroicuaem.jpg"
                            alt=""
                        />
                        <div className="flex flex-col justify-between p-4 leading-normal text-center">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Vietcombank
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Tran Hoai Nam <br />
                                1021447111 <br />
                                35.000đ
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
            case "3-month":
                return (
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img
                            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                            src="/upload/images/1702390711_Mattroicuaem.jpg"
                            alt=""
                        />
                        <div className="flex flex-col justify-between p-4 leading-normal text-center">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Vietcombank
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Tran Hoai Nam <br />
                                1021447111 <br />
                                60.000đ
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
            case "6-month":

                return (
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img
                            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                            src="/upload/images/1702390711_Mattroicuaem.jpg"
                            alt=""
                        />
                        <div className="flex flex-col justify-between p-4 leading-normal text-center">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Vietcombank
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Tran Hoai Nam <br />
                                1021447111 <br />
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
            default:
                return null;
        }
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
                <div
                    className={`max-w-sm p-6 ${
                        activeButton === "1-month" ? "bg-white" : "bg-white"
                    } border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
                    onClick={() => handleButtonClick("1-month")}
                >
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            1 tháng
                        </h5>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Tải nhạc không giới hạn, tạo playlist riêng theo sở
                        thích của bạn <br />
                        Kiếm tiền từ những sáng tạo của bạn và còn nhiều hơn thế
                        nữa!
                    </p>
                    <a
                        href="#"
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                            activeButton === "1-month" ? "active" : ""
                        }`}
                    >
                        35.000đ
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

                <div
                    className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    onClick={() => handleButtonClick("3-month")}
                >
                    <div className="flex">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            3 Tháng
                        </h5>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-red-900 dark:text-white ml-auto">
                            15%
                        </h5>
                    </div>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Tải nhạc không giới hạn, tạo playlist riêng theo sở
                        thích của bạn <br />
                        Kiếm tiền từ những sáng tạo của bạn và còn nhiều hơn thế
                        nữa!
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        60.000
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

                <div
                    className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    onClick={() => handleButtonClick("6-month")}
                >
                    <div className="flex">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            6 Tháng
                        </h5>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-red-900 dark:text-white ml-auto">
                            30%
                        </h5>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Tải nhạc không giới hạn, tạo playlist riêng theo sở
                        thích của bạn <br />
                        Kiếm tiền từ những sáng tạo của bạn và còn nhiều hơn thế
                        nữa!
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        100.000đ
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

                {/* Modal */}
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
                            <button
                                onClick={() => handlePayment(selectedModal)}
                                className="bg-blue-500 text-white p-2 rounded mt-4"
                            >
                                Đã thanh toán
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}
