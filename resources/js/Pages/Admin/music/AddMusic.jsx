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
                className={"fixed inset-0 flex items-center justify-center"}
                overlayClassName={"fixed inset-0 bg-opacity-0"}
            >
                <div className="bg-cyan-100 p-4 rounded-lg">
                    <div>
                        <h2 className="font-bold text-xl text-center">
                            THÊM BÀI HÁT
                        </h2>
                    </div>
                    <div className="mx-auto mt-8">
                        <form
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4">
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
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-4">
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
                            <div className="flex flex-row">
                                <div className="mb-4">
                                    <label
                                        htmlFor="thumbnail"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Ảnh
                                    </label>
                                    <input
                                        required
                                        type="file"
                                        name="thumbnail"
                                        onChange={handleFileThumbnail}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="link_file"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Tải bài hát lên
                                    </label>
                                    <input
                                        type="file"
                                        name="link_file"
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
                            <div className="grid grid-cols-4 gap-4 mb-2">
                                <label
                                    htmlFor="id_categories"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Chọn danh mục:
                                </label>

                                {categories.map((category) => (
                                    <div key={category.id}>
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
                            <div className="flex items-center justify-between">
                                <button
                                    name="sbm"
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Thêm
                                </button>
                            </div>
                        </form>
                    </div>
                    <button onClick={onRequestClose}>Close</button>
                </div>
            </Modal>
        </>
    );
}
