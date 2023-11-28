import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import InputError from "@/Components/InputError";
export default function EditCate({ auth, album }) {
    const [albumData, setAlbumData] = useState({
        name_album: album.name_album,
        avatar: album.avatar,
    });
    const [imagePreview, setImagePreview] = useState(
        album.avatar
            ? `http://localhost:8000/upload/images/${album.avatar}`
            : null
    );
    //hiển thị lỗi
    const [errors, setErrors] = useState({});
    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setAlbumData({
            ...albumData,
            [name]: type === "file" ? files[0] : value,
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
            data.append("name_album", albumData.name_album);
            data.append("avatar", albumData.avatar);

            const response = await axios.post(
                `/album/update/${album.id}`,
                data
            );
            if (response.status === 200) {
                // Reload the page
                window.location.href = "/album/list";
            }
        } catch (errors) {
            if (errors.response && errors.response.status === 422) {
                setErrors(errors.response.data.errors);
            }
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="p-8 w-full">
                <div>
                    <h2 className="font-semibold text-white text-center text-2xl">
                        Sửa tên Ablums
                    </h2>
                </div>
                <div className="bg-neutral-400 rounded mt-4 p-14">
                    <form
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Tên album
                            </label>
                            <input
                                type="text"
                                name="name_album"
                                value={albumData.name_album}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.name_album && (
                                <InputError
                                    className="mt-2"
                                    message={errors.name_album[0]}
                                />
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="avatar"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Ảnh
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
                        </div>
                        {errors.avatar && (
                            <InputError
                                className="mt-2"
                                message={errors.avatar[0]}
                            />
                        )}
                        <div className="flex justify-between items-center">
                            <Link href={route("album.list")}>
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
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Sửa
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
