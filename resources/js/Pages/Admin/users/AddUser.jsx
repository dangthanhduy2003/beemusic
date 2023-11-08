import React, { useState } from "react";
import Modal from "react-modal";
import { router } from "@inertiajs/react";

export default function AddUser({ isOpen, onRequestClose, role }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        avatar: null,
        id_role: 2, // Thay đổi giá trị mặc định tại đây
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, avatar: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/user/add", formData);
        onRequestClose();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                ariaHideApp={false}
                contentLabel="Example Modal"
                className={"fixed inset-0 flex items-center justify-center"}
                overlayClassName={"fixed inset-0 bg-opacity-0"}
            >
                <div className="bg-cyan-200 p-8 rounded">
                    <div className="flex flex-row justify-between">
                        <h2 className="font-bold text-xl text-center">
                            Thêm người dùng
                        </h2>
                        <button onClick={onRequestClose}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-9 h-9 text-red-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="mx-auto mt-4">
                        <form
                            className="bg-white shadow-md rounded p-8"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 text-sm font-bold mb-2
                                "
                                >
                                    Tên khách hàng
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    autoComplete="off"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="avatar"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Ảnh
                                </label>
                                <div className="flex flex-row justify-center items-center">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-cyan-200 file:text-violet-700
                                    hover:file:bg-cyan-400"
                                        onChange={handleFileChange}
                                    />
                                    {formData.avatar && (
                                        <img
                                            src={URL.createObjectURL(
                                                formData.avatar
                                            )}
                                            alt=""
                                            className="w-24 h-24 rounded-full object-cover"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="id_role"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Loại tài khoản
                                </label>

                                <select
                                    name="id_role"
                                    value={formData.id_role}
                                    onChange={handleInputChange}
                                    className="block w-full shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    {role.map((option) => (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.short_role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    name="sbm"
                                    type="submit"
                                    className="w-40 h-10 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded"
                                >
                                    Thêm người dùng
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
}
