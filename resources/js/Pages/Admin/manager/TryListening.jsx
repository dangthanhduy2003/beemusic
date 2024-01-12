import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import Modal from "react-modal";
import "./TryListening.css";

export default function TryListening({ isOpen, onClose, song }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const formattedPrice = song
        ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
          }).format(song.price)
        : "";

    const handleListen = (e) => {
        const currentTime = e.target.currentTime;

        if (currentTime >= 60) {
            setIsPlaying(false);
            e.target.pause();

            audioRef.current.audio.current.currentTime = 0;
        }
    };

    useEffect(() => {
        if (!isOpen && isPlaying) {
            setIsPlaying(false);
        }
    }, [isOpen]);
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Example Modal"
            className={"fixed inset-0 flex items-center justify-center"}
            overlayClassName={"fixed inset-0 bg-opacity-0"}
        >
            <div className="bg-neutral-300 bg-gradient-to-t from-teal-950 p-5 rounded-lg w-2/6">
                <div className="flex flex-row justify-end">
                    <button onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7 text-red-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                {song && (
                    <>
                        <div className="flex flex-row gap-4 text-black">
                            <img
                                className="object-cover w-40 h-40 rounded"
                                src={`../upload/images/${song.thumbnail}`}
                                alt=""
                            />
                            <div>
                                <h2 className="text-base font-semibold">
                                    {song.name}
                                </h2>
                                <span className="text-sm">{song.artist}</span>
                                <p className="text-base mt-4">
                                    Giá: {formattedPrice}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-white">
                                Bạn chỉ có thể nghe thử 1 phút đầu tiên của bài
                            </p>
                        </div>
                        <div className="w-full mt-4">
                            <AudioPlayer
                                ref={audioRef}
                                src={`../upload/audio/${song.link_file}`}
                                layout="stacked-reverse"
                                customAdditionalControls={[]}
                                showJumpControls={false}
                                onListen={handleListen}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            />
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}
