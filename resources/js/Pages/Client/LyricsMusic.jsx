import React, { useEffect, useRef } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function LyricsMusic({ auth }) {
    const { state, currentTime, duration } = useMusic();
    const lyricsContainerRef = useRef(null);

    const calculateCurrentLine = () => {
        if (state.currentSong && state.currentSong.lyrics) {
            const lines = state.currentSong.lyrics.split("\n");
            const currentPercentage = (currentTime / duration) * 200;

            let currentLine = 0;
            for (let i = 0; i < lines.length; i++) {
                const linePercentage = (i / lines.length) * 100;
                if (linePercentage >= currentPercentage) {
                    currentLine = i;
                    break;
                }
            }
            return currentLine;
        }
        return 0; // Trả về 0 nếu không có lời bài hát hoặc thông tin thời gian
    };

    useEffect(() => {
        const currentLine = calculateCurrentLine();
        const container = lyricsContainerRef.current;

        if (container) {
            const containerHeight = container.clientHeight;
            const lineHeight =
                container.scrollHeight /
                state.currentSong.lyrics.split("\n").length;
            const scrollTo =
                currentLine * lineHeight - containerHeight / 2 + lineHeight / 2;

            container.scrollTo({
                top: scrollTo,
                behavior: "smooth",
            });
        }
    }, [currentTime, duration, state.currentSong]);

    return (
        <DefaultLayout auth={auth}>
            {state.currentSong.lyrics ? (
                <div
                    className="flex flex-row justify-center mt-2 p-4 rounded text-black font-semibold
                lg:overflow-auto lg:h-2/3 text-lg bg-gradient-to-b from-indigo-300"
                    ref={lyricsContainerRef}
                >
                    <div className="text-3xl text-center leading-loose">
                        {state.currentSong.lyrics
                            .split("\n")
                            .map((line, index) => (
                                <span
                                    key={index}
                                    className={`text-black ${
                                        index === calculateCurrentLine()
                                            ? "text-white"
                                            : ""
                                    }`}
                                >
                                    {line}
                                    <br />
                                </span>
                            ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-row justify-center items-center mt-2 p-4 rounded text-black font-semibold lg:overflow-auto lg:h-2/3 text-lg bg-indigo-300">
                    <div className="text-3xl">
                        Bài hát này tạm thời chưa có lời
                    </div>
                </div>
            )}
        </DefaultLayout>
    );
}
