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
                <div className="bg-cyan-100 p-10 rounded-lg">
                    <div>
                        <h2 className="font-bold text-xl text-center">CẬP NHẬT KHÁCH HÀNG</h2>
                    </div>
                    <div className="w-5/6 mx-auto mt-8">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2
                                ">Tên người dùng:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2
                                ">Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2
                                ">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2
                                ">Ảnh</label>
                                <img
                                    src={`http://localhost:8000/upload/images/${user.avatar}`}
                                    alt=""
                                    className="w-20"
                                />
                                <input
                                    type="file"
                                    name="avatar"
                                    onChange={handleFileChange}

                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="id_role" className="block text-gray-700 text-sm font-bold mb-2">Loại tài khoản</label>

                                <select
                                    name="id_role"
                                    value={values.id_role}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sửa</button>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
