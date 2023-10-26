import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

export default function EditMusic({
    auth,
    music,
    musicCate,
    categories,
    selectedCategories,
}) {
    const [formData, setFormData] = useState({
        name: music.name,
        link_file: "",
        thumbnail: music.thumbnail,
        lyrics: music.lyrics,
        id_categories: selectedCategories,
    });

    const handleInputChange = (e) => {
        const { name, value, files, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]:
                name === "thumbnail" || name === "link_file"
                    ? files[0] || value
                    : value,
            id_categories: checked
                ? [...prevData.id_categories, parseInt(value)]
                : prevData.id_categories.filter((id) => id !== parseInt(value)),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/music/update/${music.id}`, formData);
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="bg-cyan-100 p-10 rounded-lg">
                <div>
                        <h2 className="font-bold text-xl text-center">CẬP NHẬT BÀI HÁT</h2>
                    </div>
                    <div className="w-5/6 mx-auto mt-8">
                        <form
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2
                                ">Tên bài hát</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4 ">
                                <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2
                                ">Ảnh</label>
                                <input
                                    type="file"
                                    name="thumbnail"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="link_file" className="block text-gray-700 text-sm font-bold mb-2
                                ">
                                    Âm thanh bài hát
                                </label>
                                <div>
                                    <audio controls>
                                        <source
                                            src={`http://localhost:8000/upload/audio/${music.link_file}`}
                                            type="audio/mpeg"
                                        />
                                        Trình duyệt của bạn không hỗ trợ phát
                                        audio.
                                    </audio>
                                </div>
                                <br />
                                <input
                                    type="file"
                                    name="link_file"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lyrics" className="block text-gray-700 text-sm font-bold mb-2
                                ">Lời bài hát</label>
                                <textarea 
                                    type="textarea"
                                    rows="4" cols="50"
                                    name="lyrics"
                                    value={formData.lyrics}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                              
                            </div>
                            <div className="mb-4">
                                <label htmlFor="id_categories" className="block text-gray-700 text-sm font-bold mb-2
                                ">
                                    Chọn danh mục:
                                </label>
                                {categories.map((category) => (
                                    <div key={category.id}>
                                        <input
                                            type="checkbox"
                                            id={`category_${category.id}`}
                                            name="id_categories"
                                            value={category.id}
                                            checked={formData.id_categories.includes(
                                                category.id
                                            )}
                                            onChange={handleInputChange}
                                        />
                                        <label
                                            htmlFor={`category_${category.id}`}
                                        >
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sửa</button>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
