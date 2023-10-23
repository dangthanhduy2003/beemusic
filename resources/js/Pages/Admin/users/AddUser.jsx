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
                <div className="bg-white p-4 rounded-lg">
                    <div>
                        <h2>Thêm khách hàng</h2>
                    </div>
                    <div>
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div>
                                <label htmlFor="name">Tên khách hàng</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Mật khẩu</label>
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    autoComplete="off"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="avatar">Ảnh</label>
                                <input
                                    type="file"
                                    name="avatar"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="id_role">Loại tài khoản</label>

                                <select
                                    name="id_role"
                                    value={formData.id_role}
                                    onChange={handleInputChange}
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
                            <button name="sbm" type="submit">
                                Thêm
                            </button>
                        </form>
                    </div>
                    <button onClick={onRequestClose}>Close Modal</button>
                </div>
            </Modal>
        </>
    );
}
