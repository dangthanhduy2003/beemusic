import React, { useState } from "react";
import Modal from "react-modal";
import { router } from "@inertiajs/react";

export default function AddAlbum({ isOpen, onRequestClose}) {
    const [formData, setFormData] = useState({
        name_album: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/album/add", formData);
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
                <div className="bg-cyan-200 p-8 rounded w-96">
                <div className="flex flex-row justify-between">
                        <h2 className="font-bold text-xl text-center">Thêm bài hát</h2>
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
                    <div  className="mx-auto mt-8">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4">
                                <label htmlFor="name"  className="block text-gray-700 text-sm font-bold mb-2">Tên album</label>
                                <input
                                    required
                                    type="text"
                                    name="name_album"
                                    autoComplete="off"
                                    value={formData.name_album}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex justify-center">
                            <button name="sbm" type="submit"
                               className="w-40 h-10 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded mt-5">
                                Thêm
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
}
