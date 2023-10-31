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
                <div className="bg-cyan-100 p-10 rounded-lg">
                <div>
                        <h2 className="font-bold text-xl text-center">THÊM BÀI HÁT</h2>
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
                            <div className="flex items-center justify-between">
                            <button name="sbm" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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
