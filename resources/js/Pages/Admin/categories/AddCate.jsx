import React, { useState } from "react";
import Modal from "react-modal";
import { router } from "@inertiajs/react";

export default function AddCate({ isOpen, onRequestClose }) {
    const [formData, setFormData] = useState({
        name: "",
        avatar: null,
    });

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/categories/add", formData);
        onRequestClose();
    };
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                ariaHideApp={false}
                contentLabel="Example Modal"
                className={"fixed inset-0 flex items-center justify-center"}
                overlayClassName={"fixed inset-0 bg-opacity-0"}
            >
                <div className="bg-white p-4 rounded-lg">
                    <div>
                        <h2>Thêm thể loại</h2>
                    </div>
                    <div>
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div>
                                <label htmlFor="name">Tên thể loại</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="avatar">Ảnh thể loại</label>
                                <input
                                    required
                                    type="file"
                                    name="avatar"
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                />
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
