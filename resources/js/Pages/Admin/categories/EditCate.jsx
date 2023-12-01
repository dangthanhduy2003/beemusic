import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import InputError from "@/Components/InputError";
export default function EditCate({ auth, categories }) {
    const [categoryData, setCategoryData] = useState({
        name: categories.name,
        avatar: categories.avatar,
    });
    const [imagePreview, setImagePreview] = useState(
        categories.avatar ? `../../upload/images/${categories.avatar}` : null
    );

    //hiển thị lỗi
    const [errors, setErrors] = useState({});
    const handleInputChange = (e) => {
        const { name, type, files } = e.target;

        setCategoryData({
            ...categoryData,
            [name]: type === "file" ? files[0] : e.target.value,
        });

        if (type === "file" && files.length > 0) {
            const objectUrl = URL.createObjectURL(files[0]);
            setImagePreview(objectUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("name", categoryData.name);
            data.append("avatar", categoryData.avatar);
            const response = await axios.post(
                `/categories/updated/${categories.id}`,
                data
            );

            if (response.status === 200) {
                // Reload the page
                window.location.href = "/categories/list";
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
                        <h2 className="font-semibold text-white text-center text-2xl">
                            Chỉnh sửa danh mục
                        </h2>
                    </div>
                    <div className="bg-neutral-400 rounded mt-4 p-14">
                        <form
                            className="bg-neutral-200 rounded p-8"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 text-sm font-bold mb-2
                                "
                                >
                                    Tên Danh mục
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={categoryData.name}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.name && (
                                    <InputError
                                        className="mt-2"
                                        message={errors.name[0]}
                                    />
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="avatar"
                                    className="block text-gray-700 text-sm font-bold mb-2
                                "
                                >
                                    Ảnh danh mục
                                </label>
                                <img
                                    src={imagePreview}
                                    alt=""
                                    className="w-24 h-24 rounded object-cover mr-4"
                                />
                                <input
                                    type="file"
                                    name="avatar"
                                    className="w-full text-sm text-slate-500 mt-2
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-cyan-200 file:text-violet-700
                                    hover:file:bg-cyan-400"
                                    onChange={handleInputChange}
                                />
                                {errors.avatar && (
                                    <InputError
                                        className="mt-2"
                                        message={errors.avatar[0]}
                                    />
                                )}
                            </div>
                            <div className="flex justify-between items-center">
                                <Link href={route("categories.list")}>
                                    <div className="text-red-700 mt-4">
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
