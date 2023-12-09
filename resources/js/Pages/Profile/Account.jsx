import React, { useState, useEffect } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import DefaultLayout from "@/Layouts/DefaultLayout";
import DangerButton from "@/Components/DangerButton";
import Modal from "react-modal";
import { Cookies } from "react-cookie";

export default function Account({ auth }) {
    const { user } = auth;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        password: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ModalOpen, IsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [successName, setSuccessName] = useState("");
    const [imagePreview, setImagePreview] = useState(
        user.avatar ? `../upload/images/${user.avatar}` : null
    );

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData({ ...formData, avatar: selectedFile });
        const objectUrl = URL.createObjectURL(selectedFile);
        setImagePreview(objectUrl);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("avatar", formData.avatar);

        try {
            const response = await axios.post(
                `/editUser/${user.id}`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setSuccessName(response.data.success);
            setErrors({});
            setIsModalOpen(true);
            // Đóng modal sau 3 giây (3000 miligiây)
            setTimeout(() => {
                setIsModalOpen(false);
            }, 2000);
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Error updating user:", error.message);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `/updatePassword/${user.id}`,
                formData
            );
            setSuccessMessage(response.data.success);
            setErrors({});
            IsModalOpen(true);
            // Đóng modal sau 3 giây (3000 miligiây)
            setTimeout(() => {
                IsModalOpen(false);
            }, 2000);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //xóa tài khoản
    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const cookies = new Cookies();
            cookies.remove("your_auth_cookie_name");

            await Inertia.get(`/deleteUser/${user.id}`);

            window.location.href = "/";
        } catch (error) {
            console.error("Lỗi khi xóa tài khoản:", error);
            // Xử lý lỗi
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    return (
        <DefaultLayout auth={auth}>
            <div className="lg:overflow-auto lg:h-2/3 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-neutral-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Thông tin cá nhân
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Cập nhật thông tin hồ sơ và địa chỉ email
                                    của tài khoản của bạn.
                                </p>
                            </header>
                            <form
                                className="mt-6 space-y-6"
                                onSubmit={onSubmit}
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Tên người dùng"
                                    />
                                    <TextInput
                                        id="name"
                                        className="mt-1 pl-1 block w-full"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        autoComplete="name"
                                    />
                                    {errors.name && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.name[0]}
                                        />
                                    )}
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 pl-1 block w-full"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                    />
                                    {errors.email && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.email[0]}
                                        />
                                    )}
                                </div>
                                <img
                                    src={imagePreview}
                                    alt=""
                                    className="w-24 h-24 rounded object-cover mr-4"
                                />
                                <div>
                                    <InputLabel
                                        htmlFor="avatar"
                                        value="Ảnh đại diện"
                                    />
                                    <input
                                        id="avatar"
                                        type="file"
                                        className="mt-1 block w-full"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <PrimaryButton type="submit">Lưu</PrimaryButton>
                            </form>
                            {successName && (
                                <Modal
                                    isOpen={isModalOpen}
                                    contentLabel="Deleted Successfully"
                                    className={
                                        "fixed inset-0 flex items-center justify-center lg:left-96 lg:px-36"
                                    }
                                    overlayClassName={
                                        "fixed inset-0 bg-opacity-0"
                                    }
                                >
                                    <div className="flex items-center gap-2 bg-neutral-700 p-8 font-semibold text-white text-lg rounded w-26 h-26">
                                        <h2>{successName}</h2>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 stroke-green-500 stroke-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>
                                    </div>
                                </Modal>
                            )}
                        </section>
                    </div>

                    <div className="p-4 sm:p-8 bg-neutral-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Cập nhật mật khẩu
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Đảm bảo tài khoản của bạn đang sử dụng mật
                                    khẩu dài, ngẫu nhiên để duy trì chắc chắn.
                                </p>
                            </header>

                            <form
                                className="mt-6 space-y-6"
                                onSubmit={handleSubmit}
                            >
                                <div className="border border-black rounded-lg p-4">
                                    <InputLabel
                                        htmlFor="current_password"
                                        value="Mật khẩu hiện tại"
                                    />
                                    <TextInput
                                        id="current_password"
                                        type="password"
                                        className="mt-1 pl-1 block w-full"
                                        autoComplete="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.password[0]}
                                            name="current_password"
                                        />
                                    )}
                                </div>

                                <div className="border border-black rounded-lg p-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Mật khẩu mới"
                                    />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        className="mt-1 pl-1 block w-full"
                                        autoComplete="new-password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.newPassword && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.newPassword[0]}
                                            name="newPassword"
                                        />
                                    )}
                                </div>

                                <div className="border border-black rounded-lg p-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Nhập lại mật khẩu"
                                    />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        className="mt-1 pl-1 block w-full"
                                        autoComplete="new-password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.confirmPassword && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.confirmPassword[0]}
                                            name="confirmPassword"
                                        />
                                    )}
                                </div>

                                <PrimaryButton type="submit">Lưu</PrimaryButton>
                                {successMessage && (
                                    <Modal
                                        isOpen={ModalOpen}
                                        contentLabel="Deleted Successfully"
                                        className={
                                            "fixed inset-0 flex items-center justify-center lg:left-96 lg:px-36"
                                        }
                                        overlayClassName={
                                            "fixed inset-0 bg-opacity-0"
                                        }
                                    >
                                        <div className="flex items-center gap-2 bg-neutral-700 p-8 font-semibold text-white text-lg rounded w-26 h-26">
                                            <h2>{successMessage}</h2>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 stroke-green-500 stroke-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.5 12.75l6 6 9-13.5"
                                                />
                                            </svg>
                                        </div>
                                    </Modal>
                                )}
                            </form>
                        </section>
                    </div>

                    <div className="p-4 sm:p-8 bg-neutral-200 shadow sm:rounded-lg">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Xóa tài khoản
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Sau khi tài khoản của bạn bị xóa, tất cả tài
                                    nguyên và dữ liệu của tài khoản đó sẽ bị xóa
                                    vĩnh viễn. Trước xóa tài khoản của bạn, vui
                                    lòng tải xuống mọi dữ liệu hoặc thông tin mà
                                    bạn muốn giữ lại.
                                </p>
                            </header>
                            <DangerButton onClick={handleDeleteAccount}>
                                Xóa tài khoản
                            </DangerButton>
                        </section>
                    </div>

                    {showDeleteModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-4 sm:p-8 w-96 sm:w-1/2 rounded-lg">
                                <p className="text-lg font-medium text-gray-900">
                                    Xác nhận xóa tài khoản
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Bạn chắc chắn muốn xóa tài khoản của mình?
                                </p>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        className="mr-2 text-red-600"
                                        onClick={handleCancelDelete}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className="text-blue-600"
                                        onClick={handleConfirmDelete}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
