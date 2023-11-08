import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function EditMusic({
    auth,
    music,
    musicCate,
    categories,
    selectedCategories,
}) {
    const [formData, setFormData] = useState({
        name: music.name,
        artist: music.artist,
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
                <div className="p-2 w-full">
                    <div>
                        <h2 className="font-semibold text-white text-center text-2xl">
                            Chỉnh sửa bài hát
                        </h2>
                    </div>
                    <div className="bg-neutral-400 rounded mt-4 p-4">
                        <form
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                            className="bg-neutral-200 rounded p-4"
                        >
                            <div className="flex flex-row gap-10 w-full">
                                <div className="mb-4 w-1/2">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 text-sm font-bold mb-2
                                "
                                    >
                                        Tên bài hát
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 w-1/2">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 text-sm font-bold mb-2
                                "
                                    >
                                        Tên nghệ sỹ
                                    </label>
                                    <input
                                        type="text"
                                        name="artist"
                                        value={formData.artist}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-10 w-full">
                                <div className="flex flex-col mb-4 w-1/2">
                                    <label
                                        htmlFor="thumbnail"
                                        className="block text-gray-700 text-sm font-bold mb-2
                                "
                                    >
                                        Ảnh
                                    </label>
                                    <div className="flex flex-row justify-center gap-2 items-center">
                                        <img
                                            src={`http://localhost:8000/upload/images/${music.thumbnail}`}
                                            alt=""
                                            className="w-24 h-24 rounded object-cover mr-4"
                                        />
                                        <input
                                            type="file"
                                            name="thumbnail"
                                            className="w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-cyan-200 file:text-violet-700
                                            hover:file:bg-cyan-400"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-4 w-1/2">
                                    <label
                                        htmlFor="link_file"
                                        className="block text-gray-700 text-sm font-bold mb-2
                                "
                                    >
                                        Âm thanh bài hát
                                    </label>
                                    <div className="mb-4">
                                        <audio controls className="w-full">
                                            <source
                                                src={`http://localhost:8000/upload/audio/${music.link_file}`}
                                                type="audio/mpeg"
                                            />
                                            Trình duyệt của bạn không hỗ trợ
                                            phát audio.
                                        </audio>
                                    </div>
                                    <input
                                        type="file"
                                        name="link_file"
                                        className="w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-cyan-200 file:text-violet-700
                                        hover:file:bg-cyan-400"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lyrics"
                                    className="block text-gray-700 text-sm font-bold mb-2
                                "
                                >
                                    Lời bài hát
                                </label>
                                <textarea
                                    type="textarea"
                                    name="lyrics"
                                    value={formData.lyrics}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="id_categories"
                                    className="block text-gray-700 text-sm font-bold mb-2
                                "
                                >
                                    Chọn danh mục:
                                </label>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex flex-row gap-2"
                                    >
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
                            <div className="flex justify-between">
                                <Link href={route("music.list")}>
                                    <button className="w-40 h-10 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded mt-5">
                                        Quay lại
                                    </button>
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
