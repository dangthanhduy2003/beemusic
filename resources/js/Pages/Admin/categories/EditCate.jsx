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
                <div>
                    <div>
                        <h2>Cập nhật danh mục</h2>
                    </div>
                    <div>
                        <form
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label htmlFor="name">Tên Danh mục</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={categoryData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="avatar">Ảnh danh mục</label>
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
                            <button type="submit">Sửa</button>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
