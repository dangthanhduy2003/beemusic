import React, { useState } from "react";
import Modal from "react-modal";
import { router } from "@inertiajs/react";

export default function AddMusic({ isOpen, onRequestClose, categories }) {
    const [formData, setFormData] = useState({
        name: "",
        thumbnail: "",
        lyrics: "",
        link_file: "",
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
                <div className="bg-white p-4 rounded-lg">
                    <div>
                        <h2>Thêm bài hát</h2>
                    </div>
                    <div>
                        <form
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label htmlFor="name">Tên bài hát</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="thumbnail">Ảnh</label>
                                <input
                                    required
                                    type="file"
                                    name="thumbnail"
                                    onChange={handleFileThumbnail}
                                />
                            </div>
                            <div>
                                <label htmlFor="lyrics">Lời bài hát</label>
                                <textarea
                                    name="lyrics"
                                    required
                                    value={formData.lyrics}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="link_file">
                                    Tải bài hát lên
                                </label>
                                <input
                                    type="file"
                                    name="link_file"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="id_categories">
                                    Chọn danh mục:
                                </label>
                                <br />
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
                            <button name="sbm" type="submit">
                                Thêm
                            </button>
                        </form>
                    </div>
                    <button onClick={onRequestClose}>Close Modal</button>
                </div>
            </Modal>
        </>
    );
}
