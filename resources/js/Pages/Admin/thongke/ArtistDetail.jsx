import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function ArtistDetail({ auth, artistInfo, songs }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-white">
                    <div className="bg-gray-800 mb-4 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 text-white flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                    src={artistInfo.avatar}
                                    alt={`${artistInfo.name}'s Avatar`}
                                />

                                <h2 className="ml-4 text-lg">
                                    {artistInfo.name}
                                </h2>
                            </div>
                            <p>
                                Tổng lượt nghe:{" "}
                                {artistInfo.total_view.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <h3>Bài hát</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {songs.map((song) => (
                            <div
                                key={song.id}
                                className="max-w-sm mt-4 rounded overflow-hidden shadow-lg bg-gray-800 w-44"

                            >
                                <div className="aspect-w-16 aspect-h-9">
                                    <img
                                        className="object-cover w-44 h-44"
                                        src={`../upload/images/${song.thumbnail}`}
                                        alt={song.name}
                                    />
                                </div>
                                <div className="px-6 py-4 flex flex-col items-center justify-center">
                                    <div className="font-bold text-xl mb-2 text-white">
                                        {song.name}
                                    </div>
                                    <p className="text-base text-white">
                                        Views:{" "} {song.view.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
