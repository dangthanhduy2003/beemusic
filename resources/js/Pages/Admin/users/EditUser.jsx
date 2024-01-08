import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import InputError from "@/Components/InputError";
export default function EditUser({ auth, user, role }) {
    //hiển thị lỗi
    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        id_role: user.id_role,
    });
    const [imagePreview, setImagePreview] = useState(
        user.avatar ? `../../upload/images/${user.avatar}` : null
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setValues({ ...values, avatar: file });
        const objectUrl = URL.createObjectURL(file);
        setImagePreview(objectUrl);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("name", values.name);
            data.append("email", values.email);
            data.append("password", values.password);
            data.append("id_role", values.id_role);
            data.append("avatar", values.avatar);

            const response = await axios.post(`/user/updated/${user.id}`, data);
            if (response.status === 200) {
                // Reload the page
                window.location.href = "/user/list";
            }
        } catch (errors) {
            if (errors.response && errors.response.status === 422) {
                setErrors(errors.response.data.errors);
            }
        }
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="p-8 w-full">
                    <div>
                        <h2 className="lg:fixed top-5 ml-2 start-1/5 font-medium text-cyan-500 text-center text-2xl">
                            Chỉnh sửa thông tin
                        </h2>
                    </div>
                    <div className="bg-neutral-400 rounded p-10">
                        <form
                            className="bg-neutral-200 rounded p-8"
                            onSubmit={handleSubmit}
                            zzz
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
                                        className="shadow appearance-none border w-full text-sm rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.name && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.name[0]}
                                        />
                                    )}
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
                                        className="shadow appearance-none border text-sm w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.email && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.email[0]}
                                        />
                                    )}
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
                                        placeholder="Không nhập mật khẩu mới sẽ sử dụng mật khẩu cũ"
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                        className="shadow border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight"
                                    >
                                        {role.map((option) => (
                                            <option
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.short_role}
                                            </option>
                                        ))}
                                        {errors.id_role && (
                                            <InputError
                                                className="mt-2"
                                                message={errors.id_role[0]}
                                            />
                                        )}
                                        F
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
                                    src={imagePreview}
                                    alt=""
                                    className="w-24 h-24 rounded object-cover mr-4"
                                />
                                <label
                                    htmlFor="avatar"
                                    className="block text-gray-700 text-sm font-bold mb-2
                                "
                                ></label>
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
                                {errors.avatar && (
                                    <InputError
                                        className="mt-2"
                                        message={errors.avatar[0]}
                                    />
                                )}
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
                                            className="w-8 h-8"
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
                                    className="w-40 h-10 bg-blue-700 hover:bg-blue-900 text-base text-white font-semibold rounded mt-5"
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
