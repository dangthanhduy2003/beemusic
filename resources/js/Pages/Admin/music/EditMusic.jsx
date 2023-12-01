import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import InputError from "@/Components/InputError";

export default function EditMusic({
    auth,
    music,
    musicCate,
    categories,
    selectedCategories,
}) {
    //hiển thị thông báo lỗi
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: music.name,
        artist: music.artist,
        link_file: "",
        thumbnail: music.thumbnail,
        lyrics: music.lyrics,
        id_categories: selectedCategories,
    });
    const [imagePreview, setImagePreview] = useState(
        music.thumbnail ? `../../upload/images/${music.thumbnail}` : null
    );

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
        if (name === "thumbnail" && files.length > 0) {
            const objectUrl = URL.createObjectURL(files[0]);
            setImagePreview(objectUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("artist", formData.artist);
            // data.append("thumbnail", formData.thumbnail);
            data.append("lyrics", formData.lyrics);
            // data.append("link_file", formData.link_file);
            formData.id_categories.forEach((categoryId) => {
                data.append("id_categories[]", categoryId);
            });

            const response = await axios.post(
                `/music/update/${music.id}`,
                data
            );
            if (response.status === 200) {
                window.location.href = "/music/list";
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
                                    {errors.name && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.name[0]}
                                        />
                                    )}
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
                                    {errors.artist && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.artist[0]}
                                        />
                                    )}
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
                                            src={imagePreview}
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
                                        {errors.thumbnail && (
                                            <InputError
                                                className="mt-2"
                                                message={errors.thumbnail[0]}
                                            />
                                        )}
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
                                                src={`../../upload/audio/${music.link_file}`}
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
                                    {errors.link_file && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.link_file[0]}
                                        />
                                    )}
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
                                {errors.lyrics && (
                                    <InputError
                                        className="mt-2"
                                        message={errors.lyrics[0]}
                                    />
                                )}
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
                                {errors.id_categories && (
                                    <InputError
                                        className="mt-2"
                                        message={errors.id_categories[0]}
                                    />
                                )}
                            </div>
                            <div className="flex justify-between items-center">
                                <Link href={route("music.list")}>
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
