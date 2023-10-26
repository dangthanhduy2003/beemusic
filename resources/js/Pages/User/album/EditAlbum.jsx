import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { router } from "@inertiajs/react";

export default function EditCate({ auth, album }) {
    const [albumData, setAlbumData] = useState({
        name_album: album.name_album,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAlbumData({
            ...albumData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/album/update/${album.id}`, albumData);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="bg-cyan-100 p-10 rounded-lg">
                <div>
                    <h2 className="font-bold text-xl text-center">
                        CẬP NHẬT ALBUM
                    </h2>
                </div>
                <div className="w-5/6 mx-auto mt-8">
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
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sửa
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
