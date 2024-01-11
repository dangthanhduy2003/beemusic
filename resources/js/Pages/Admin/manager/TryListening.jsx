import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import Modal from "react-modal";
import "./TryListening.css";

export default function TryListening({ isOpen, onClose, song }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Example Modal"
            className={"fixed inset-0 flex items-center justify-center"}
            overlayClassName={"fixed inset-0 bg-opacity-0"}
        >
            <div className="bg-neutral-200 p-10 rounded-lg w-2/6 h-72">
                <button onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-red-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                {song && (
                    <>
                        <h2>{song.name}</h2>
                        <span>{song.artist}</span>
                        <div className="w-full">
                            <AudioPlayer
                                src={`../upload/audio/${song.link_file}`}
                                layout="stacked-reverse"
                                customAdditionalControls={[]}
                                showJumpControls={false}
                            />
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}
