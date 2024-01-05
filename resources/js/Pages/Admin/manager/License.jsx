import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function License({ auth, songLicense }) {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        setSongs(songLicense);
    }, [songLicense]);

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="py-5">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-white">
                        <h2 className="font-semibold text-white text-2xl">
                            Nhạc bán bản quyền
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {songs.map((song) => {
                                const formattedPrice = new Intl.NumberFormat(
                                    "vi-VN",
                                    {
                                        style: "currency",
                                        currency: "VND",
                                    }
                                ).format(song.price);

                                return (
                                    <div
                                        key={song.id}
                                        className="max-w-sm mt-4 rounded overflow-hidden shadow-lg bg-gray-800"
                                        style={{ width: "170px" }}
                                    >
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img
                                                style={{
                                                    width: "170px",
                                                    height: "170px",
                                                }}
                                                className="object-cover"
                                                src={`../upload/images/${song.thumbnail}`}
                                                alt={song.name}
                                            />
                                        </div>

                                        <div className="px-6 py-2 flex flex-col items-center justify-center">
                                            <div className="font-bold text-xl text-white">
                                                {song.name}
                                            </div>
                                            <span className="text-gray-500 text-sm">
                                                {song.artist}
                                            </span>
                                            <p className="text-base text-white">
                                                <p>Giá: {formattedPrice}</p>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
