import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "@/Layouts/DefaultLayout";
import styled from "styled-components";
import { Link } from "@inertiajs/inertia-react";

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const StyledBox = styled.div`
    background-color: ${(props) => props.bgColor || getRandomColor()};
`;

export default function SongHistory({ auth, songHistory }) {

    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="grid grid-cols-3 w-full md:grid-cols-6 lg:grid-cols-6 gap-4 lg:gap-6 mt-3">
                    {Array.isArray(songHistory) && songHistory.length > 0 ? (
                        songHistory.map((song) => (
                            <StyledBox
                                key={song.id}
                                className="grid justify-items-center h-32 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:rounded-lg lg:w-44 lg:h-56"
                            >
                                <img
                                    src={`http://localhost:8000/upload/images/${song.song.thumbnail}`}
                                    alt={song.song.name}
                                    className="w-full rounded-lg"
                                    style={{ height: "100px" }}
                                />
                                <div className="text-white text-center mt-2">
                                    <span className="block font-semibold text-sm">
                                        {song.song.name}
                                    </span>
                                    <span
                                        className="block text-sm"
                                        style={{ color: "#ccc" }}
                                    >
                                        {song.song.artist}
                                    </span>
                                </div>
                            </StyledBox>
                        ))
                    ) : (
                        <span
                            className="text-lg"
                            style={{ color: "#00B1DE", width: "300px" }}
                        >
                            Bạn chưa có bài hát nào trong lịch sử nghe!
                        </span>
                    )}
                </div>
            </DefaultLayout>
        </>
    );
}
