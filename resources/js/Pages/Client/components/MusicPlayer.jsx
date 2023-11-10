import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "./MusicPlayer.css";
import { useMusic } from "./MusicContext";
import { Link } from "@inertiajs/react";

export default function MusicPlayer() {
    const { isMusicPlayerVisible, state } = useMusic();
    const audioRef = useRef(null);

    if (!isMusicPlayerVisible) {
        return null;
    }

    return (
        <>
            <div className="control hidden lg:block px-2 h-1/6 w-full">
                <div className="control-main flex flex-row items-center">
                    {/* Music Info */}
                    {state.currentSong ? (
                        <>
                            <div className="flex flex-row w-1/4 gap-2">
                                <div>
                                    <img
                                        className="h-16 w-20 object-cover rounded"
                                        src={`http://localhost:8000/upload/images/${state.currentSong.thumbnail}`}
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col text-white ml-2">
                                    <span className="font-semibold text-lg">
                                        {state.currentSong.name}
                                    </span>
                                    <span className="font-thin text-base">
                                        {state.currentSong.artist}
                                    </span>
                                </div>
                                <div className="flex items-center text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-2/4 ml-40">
                                <AudioPlayer
                                    layout="stacked-reverse"
                                    src={`http://localhost:8000/upload/audio/${state.currentSong.link_file}`}
                                    autoPlay
                                    ref={audioRef}
                                    showSkipControls={true}
                                    showJumpControls={false}
                                    customAdditionalControls={[]}
                                    customVolumeControls={[]}
                                />
                            </div>
                            <div className="flex flex-row w-1/4 text-white justify-end gap-5 mr-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-7 h-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <Link
                                    href={`/music/lyrics/${state.currentSong.id}`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-7 h-7"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                                        />
                                    </svg>
                                </Link>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-row w-1/4">
                                <div className="h-16 w-16">
                                    <img src="" alt="" />
                                </div>
                                <div className="flex flex-col text-white ml-2">
                                    <span className="font-semibold text-lg"></span>
                                    <span className="font-thin text-base"></span>
                                </div>
                                <div className="flex items-center text-white"></div>
                            </div>
                            <div className="w-2/4 ml-40">
                                <AudioPlayer
                                    layout="stacked-reverse"
                                    showSkipControls={true}
                                    showJumpControls={false}
                                    customAdditionalControls={[]}
                                    customVolumeControls={[]}
                                    src=""
                                />
                            </div>
                            <div className="flex flex-row w-1/4 text-white justify-end gap-5 mr-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-7 h-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-7 h-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                                    />
                                </svg>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* Control Mobile */}
            <div className="control lg:hidden w-full fixed bottom-0">
                {/* Music Info */}
                <div className="flex justify-between rounded-lg bg-sky-800 p-2">
                    <div className="flex flex-row text-white gap-4">
                        <div className="h-14 w-14">
                            <img
                                src="https://cdn.tuoitre.vn/thumb_w/1060/471584752817336320/2023/5/7/son-tung-making-my-way-16834276740881763571256.jpg"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-base">
                                Making My Way
                            </span>
                            <span className="font-thin text-xs">
                                Sơn Tùng M-TP
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-10 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                            />
                        </svg>
                    </div>
                </div>
                {/* Menu Mobile */}
                <ul className="menu flex flex-row justify-between bg-neutral-800 text-white text-xs font-semibold md:justify-around">
                    <li>
                        <a className="flex flex-col">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                            </svg>
                            Trang chủ
                        </a>
                    </li>
                    <li>
                        <a className="flex flex-col">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                            </svg>
                            Thư viện
                        </a>
                    </li>
                    <li>
                        <a className="flex flex-col">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                                />
                            </svg>
                            Bảng xếp hạng
                        </a>
                    </li>
                    <li>
                        <a className="flex flex-col">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                />
                            </svg>
                            Thể loại
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
