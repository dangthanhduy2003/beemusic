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
                className={"fixed inset-0 flex items-center justify-center w-screen"}
                overlayClassName={"fixed inset-0 bg-opacity-0"}
            >
                <div className="bg-cyan-100 p-10 rounded-lg">
                    <div>
                        <h2 className="font-bold text-xl text-center">THÊM KHÁCH HÀNG</h2>
                    </div>
                    <div className="mx-auto mt-8">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2
                                ">Tên khách hàng</label>
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
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
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
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu</label>
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
                                <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">Ảnh</label>
                                <input
                                    type="file"
                                    name="avatar"
                                    onChange={handleFileChange}

                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="id_role"  className="block text-gray-700 text-sm font-bold mb-2">Loại tài khoản</label>

                                <select
                                    name="id_role"
                                    value={formData.id_role}
                                    onChange={handleInputChange}
                                    className="block appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            <div className="flex items-center justify-between">
                            <button name="sbm" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Thêm
                            </button>
                            </div>
                        </form>
                    </div>
                    <button onClick={onRequestClose}>Đóng</button>
                </div>
            </Modal>
        </>
    );
}
