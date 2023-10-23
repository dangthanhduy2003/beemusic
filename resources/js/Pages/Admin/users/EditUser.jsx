import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function EditUser({ auth, user, role }) {
    const [values, setValues] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        id_role: user.id_role,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setValues({ ...values, avatar: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/user/updated/${user.id}`, values);
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="bg-white p-4 rounded-lg">
                    <div>
                        <h2>Cập nhật Khách hàng</h2>
                    </div>
                    <div>
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div>
                                <label>Tên người dùng:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="avatar">Ảnh</label>
                                <img
                                    src={`http://localhost:8000/upload/images/${user.avatar}`}
                                    alt=""
                                />
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
                                    value={values.id_role}
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
                            <button type="submit">Sửa</button>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
