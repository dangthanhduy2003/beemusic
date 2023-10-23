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
                <div>
                    <div>
                        <h2>Cập nhật bài hát</h2>
                    </div>
                    <div>
                        <form
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label htmlFor="name">Tên bài hát</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="thumbnail">Ảnh</label>
                                <input
                                    type="file"
                                    name="thumbnail"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="link_file">
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
                                <input
                                    type="file"
                                    name="link_file"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lyrics">Lời bài hát</label>
                                <input
                                    type="text"
                                    name="lyrics"
                                    value={formData.lyrics}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="id_categories">
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

                            <button type="submit">Sửa</button>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
