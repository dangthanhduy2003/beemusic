import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/inertia-react";


export default function SongHistory({ auth, songHistory }) {

    return (
        <>
            <DefaultLayout auth={auth}>
            <div className="mt-2 lg:overflow-auto lg:h-2/3">
    <h1 className="lg:text-2xl lg:fixed top-5 start-96 text-base font-bold text-white">
        Đã nghe gần đây
    </h1>
    {Array.isArray(songHistory) && songHistory.length > 0 ? (
        <div className="grid grid-cols-3 w-full md:grid-cols-6 lg:grid-cols-6 gap-4 lg:gap-6 mt-3">
            {songHistory.map((song) => (
                <div
                    key={song.id}
                    className="grid justify-items-center lg:bg-neutral-700 lg:hover:bg-zinc-700 lg:rounded-lg lg:w-44 lg:h-60"
                >
                    <img
                        src={`http://localhost:8000/upload/images/${song.song.thumbnail}`}
                        alt={song.song.name}
                        className="w-40 h-36 rounded-lg object-cover mt-2"
                    />
                    <div className="text-white text-center mt-2">
                        <span className="block font-semibold text-sm">
                            {song.song.name}
                        </span>
                        <span className="text-sm">{song.song.artist}</span>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div className="w-full text-3xl mt-3 text-center text-red-600">
            Bạn đã chưa có bài hát nào vừa nghe!
        </div>
    )}
</div>
            </DefaultLayout>
        </>
    );
}
