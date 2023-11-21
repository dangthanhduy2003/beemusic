import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "./MusicPlayer.css";
import { useMusic } from "./MusicContext";
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

export default function MusicPlayer() {
    const { isMusicPlayerVisible, state, dispatch } = useMusic();
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isAddingFavorite, setIsAddingFavorite] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.audio.current.volume = volume;
        }

        const storedState = localStorage.getItem("musicPlayerState");

        if (storedState) {
            const parsedState = JSON.parse(storedState);
            // Cập nhật trạng thái từ localStorage
            dispatch({
                type: "RESTORE_STATE",
                musicPlayerState: parsedState,
            });
        }
    }, [volume]);

<<<<<<< HEAD
=======
    useEffect(() => {
        if (state.currentSong && state.currentSong.id) {
            setIsFavorite(setIsAddingFavorite(state.currentSong.id));
        }
    }, [state.currentSong]);

>>>>>>> main
    const addToListenHistory = async (songId) => {
        try {
            const response = await axios.post("/listen-history/add", {
                song_id: songId,
            });
            console.log(response.data.message);
        } catch (error) {
            console.error("Error adding to listen history:", error);
        }
    };

    const handlePlay = () => {
        Inertia.post(`/view/${state.currentSong.id}`);
        addToListenHistory(state.currentSong.id);
<<<<<<< HEAD
        Inertia.post(`/view/${state.currentSong.id}`);
=======
>>>>>>> main
    };

    const handleChange = (e) => {
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue)) {
            setVolume(newValue);
        }
    };

    const handleClick = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.audio.current.muted = !isMuted;
        }
    };

    const handleNext = () => {
        dispatch({ type: "NEXT" });
    };

    const handleBack = () => {
        dispatch({ type: "BACK" });
    };

    const handleSongEnd = () => {
        dispatch({ type: "END" });
    };

    if (!isMusicPlayerVisible) {
        return null;
    }

    const addFavorite = async (songId) => {
        try {
            setIsAddingFavorite(true);
            const response = await axios.post("/favorite-song/add", {
                song_id: songId,
            });
            console.log(response.data.message);
            setIsFavorite(true); // Set favorite status to true on successful add
        } catch (error) {
            console.error("Error adding favorite song:", error);
        } finally {
            setIsAddingFavorite(false);
        }
    };

<<<<<<< HEAD



    const isSongInFavorites = (songId) => {};

=======
>>>>>>> main
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
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addFavorite(state.currentSong.id);
                                    }}
                                    className="flex items-center mr-10"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={isFavorite ? "white" : "none"}
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 stroke-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="w-2/4 ml-40">
                                <AudioPlayer
                                    layout="stacked-reverse"
                                    id="audio"
                                    src={`http://localhost:8000/upload/audio/${state.currentSong.link_file}`}
                                    autoPlay
                                    ref={audioRef}
                                    showSkipControls={true}
                                    showJumpControls={false}
                                    customAdditionalControls={[]}
                                    customVolumeControls={[]}
                                    onClickNext={handleNext}
                                    onClickPrevious={handleBack}
                                    onEnded={handleSongEnd}
                                    onPlay={handlePlay}
                                />
                            </div>
                            <div className="flex flex-row w-1/4 text-white justify-end items-center gap-2">
                                <Link href={"/playlist"}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 hover:stroke-blue-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                        />
                                    </svg>
                                </Link>
                                <Link href={`/lyrics/${state.currentSong.id}`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 hover:stroke-blue-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                                        />
                                    </svg>
                                </Link>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 cursor-pointer hover:stroke-blue-500"
                                    onClick={handleClick}
                                >
                                    {isMuted ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                                        />
                                    )}
                                </svg>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    className="w-28 h-1 bg-neutral-700"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleChange}
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
                            <div className="flex flex-row w-1/4 text-neutral-500 justify-end items-center gap-2">
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
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 cursor-pointer"
                                    onClick={handleClick}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                                    />
                                </svg>
                                <div className="w-28 h-1 rounded-lg bg-neutral-500"></div>
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
