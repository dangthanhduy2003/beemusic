import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

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
                <div className="p-8 w-full">
                    <div>
                        <h2 className="font-semibold text-white text-center text-2xl">
                            Chỉnh sửa thông tin
                        </h2>
                    </div>
                    <div className="bg-neutral-400 rounded mt-4 p-14">
                        <form
                            className="bg-neutral-200 rounded p-8"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="flex flex-row gap-10 w-full">
                                <div className="mb-4 w-1/2">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2
                                "
                                    >
                                        Tên người dùng:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 w-1/2">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2
                                "
                                    >
                                        Email:
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-10 w-full">
                                <div className="mb-4 w-1/2">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2
                                "
                                    >
                                        Password:
                                    </label>
                                    <input
                                        type="text"
                                        name="password"
                                        value={'Nếu bạn không thay đổi sẽ giữ mật khẩu cũ'}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 w-1/2">
                                    <label
                                        htmlFor="id_role"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Loại tài khoản:
                                    </label>

                                    <select
                                        name="id_role"
                                        value={values.id_role}
                                        onChange={handleInputChange}
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
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
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <label
                                    htmlFor="avatar"
                                    className="block text-gray-700 text-sm font-bold mb-2
                                "
                                >
                                    Ảnh:
                                </label>
                                <img
                                    src={`http://localhost:8000/upload/images/${user.avatar}`}
                                    alt=""
                                    className="w-24 h-24 rounded object-cover mr-4"
                                />
                                <input
                                    type="file"
                                    name="avatar"
                                    className="w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-cyan-200 file:text-violet-700
                                    hover:file:bg-cyan-400"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <Link href={route("user.list")}>
                                    <div className="text-red-700 mt-8">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-10 h-10"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                                <button
                                    type="submit"
                                    className="w-40 h-10 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded mt-5"
                                >
                                    Sửa
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
