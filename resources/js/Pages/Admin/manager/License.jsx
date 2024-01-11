import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TryListening from "./TryListening";

export default function License({ auth, songLicense }) {
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setSongs(songLicense);
    }, [songLicense]);

    const openModal = (song) => {
        setSelectedSong(song);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSong(null);
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="py-5">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-white">
                        <div className="flex flex-row justify-between">
                            <h1 className="lg:fixed top-5 ml-2 start-1/5 font-medium text-cyan-500 text-center text-2xl">
                                Nhạc bán bản quyền
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
                                        className="max-w-sm mt-4 rounded overflow-hidden shadow-lg bg-gray-800 w-52"
                                    >
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img
                                                className="object-cover w-52 h-48"
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
                                            <button
                                                onClick={() => openModal(song)}
                                            >
                                                Nghe thử
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <TryListening
                isOpen={isModalOpen}
                onClose={closeModal}
                song={selectedSong}
            />
        </>
    );
}
