import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

export default function EditCate({ auth, categories }) {
    const [categoryData, setCategoryData] = useState({
        name: categories.name,
        avatar: categories.avatar,
    });

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setCategoryData({
            ...categoryData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/categories/updated/${categories.id}`, categoryData);
    };
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="bg-cyan-100 p-10 rounded-lg">
                    <div>
                        <h2 className="font-bold text-xl text-center">
                            CẬP NHẬT DANH MỤC
                        </h2>
                    </div>
                    <div className="w-5/6 mx-auto mt-8">
                        <form
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
                                    src={`http://localhost:8000/upload/images/${categories.avatar}`}
                                    alt=""
                                />
                                <input
                                    type="file"
                                    name="avatar"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Sửa
                            </button>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
