import React, { useState } from "react";
import Modal from "react-modal";
import { router } from "@inertiajs/react";

export default function AddMusic({ isOpen, onRequestClose, categories }) {
    const [formData, setFormData] = useState({
        name: "",
        thumbnail: "",
        lyrics: "",
        link_file: "",
        artist: "",
        id_categories: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, link_file: file });
    };

    const handleFileThumbnail = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, thumbnail: file });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setFormData({
                ...formData,
                id_categories: [...formData.id_categories, name],
            });
        } else {
            setFormData({
                ...formData,
                id_categories: formData.id_categories.filter(
                    (id) => id !== name
                ),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/music/add", formData);
        onRequestClose();
    };
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Example Modal"
                className={
                    "fixed inset-0 flex items-center justify-center px-36"
                }
                overlayClassName={"fixed inset-0 bg-opacity-0"}
            >
                <div className="bg-cyan-200 p-8 rounded w-screen">
                    <div className="flex flex-row justify-between">
                        <h2 className="font-bold text-xl text-center">
                            Thêm bài hát
                        </h2>
                        <button onClick={onRequestClose}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-9 h-9 text-red-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-2">
                        <form
                            className="bg-white shadow-md rounded p-8"
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-row gap-10 w-full">
                                <div className="mb-4 w-1/2">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Tên bài hát
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 w-1/2">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Tên nghệ sỹ
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="artist"
                                        autoComplete="off"
                                        value={formData.artist}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-10 w-full">
                                <div className="flex flex-row justify-center items-center gap-2 mb-4 w-1/2">
                                    <label
                                        htmlFor="thumbnail"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Ảnh
                                    </label>
                                    {formData.thumbnail && (
                                        <img
                                            src={URL.createObjectURL(
                                                formData.thumbnail
                                            )}
                                            alt=""
                                            className="w-24 h-24 rounded object-cover mr-5"
                                        />
                                    )}
                                    <input
                                        required
                                        type="file"
                                        name="thumbnail"
                                        className="w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-cyan-200 file:text-violet-700
                                        hover:file:bg-cyan-400"
                                        onChange={handleFileThumbnail}
                                    />
                                </div>
                                <div className="flex flex-row justify-center items-center gap-2 mb-4 w-1/2">
                                    <label
                                        htmlFor="link_file"
                                        className="block text-gray-700 text-sm font-bold mb-2 w-32"
                                    >
                                        Tải bài hát lên
                                    </label>
                                    <input
                                        type="file"
                                        name="link_file"
                                        className="w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-cyan-200 file:text-violet-700
                                        hover:file:bg-cyan-400"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lyrics"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Lời bài hát
                                </label>
                                <textarea
                                    name="lyrics"
                                    value={formData.lyrics}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                ></textarea>
                            </div>
                            <div>
                                <label
                                    htmlFor="id_categories"
                                    className="block text-gray-700 text-sm font-bold mb-4"
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
                                            name={category.id}
                                            checked={formData.id_categories.includes(
                                                category.id.toString()
                                            )}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label
                                            htmlFor={`category_${category.id}`}
                                        >
                                            {category.name}
                                        </label>
                                        <br />
                                    </div>
                                ))}
                            </div>
                            <br />
                            <div className="flex justify-center">
                                <button
                                    name="sbm"
                                    type="submit"
                                    className="w-40 h-10 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded mt-5"
                                >
                                    Thêm bài hát
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
}
