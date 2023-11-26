import React, { useState } from "react";
import Modal from "react-modal";
import { router } from "@inertiajs/react";

export default function AddCate({ isOpen, onRequestClose }) {
    const [formData, setFormData] = useState({

        name: "",
        avatar: null,
    });
    const [errors, setErrors] = useState({});
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
                <div className="bg-cyan-200 p-8 rounded">
                    <div className="flex flex-row justify-between">
                        <h2 className="font-bold text-xl text-center">Thêm thể loại</h2>
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
                    <div className="mx-auto mt-8">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                autoComplete="off"
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs italic mt-2">{errors.categories[0]}</p>
                            )}

                            <div className="form-group">
                                <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">Ảnh thể loại</label>
                                <div className="flex flex-row justify-center items-center">
                                    <input
                                        required
                                        type="file"
                                        name="avatar"
                                        autoComplete="off"
                                        className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-cyan-200 file:text-violet-700
                                    hover:file:bg-cyan-400"
                                        onChange={handleInputChange}
                                    />
                                    {formData.avatar && (
                                        <img
                                            src={URL.createObjectURL(
                                                formData.avatar
                                            )}
                                            alt=""
                                            className="w-24 h-24 rounded object-cover"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button name="sbm" type="submit"
                                    className="w-40 h-10 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded">
                                    Thêm thể loại
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </Modal>
        </>
    );
}
