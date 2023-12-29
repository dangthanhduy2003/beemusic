import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

const LINE_HEIGHT = 57;

export default function LyricsMusic({ auth }) {
    const { state, currentTime, dispatch } = useMusic();
    const lyricsContainerRef = useRef(null);

    useEffect(() => {
        const currentLine = calculateCurrentLine();
        if (currentLine >= 2) {
            const scrollTop = (currentLine - 2) * LINE_HEIGHT; // Đặt scrollTop dựa trên dòng hiện tại
            lyricsContainerRef.current.scrollTop = scrollTop;
        }
    }, [currentTime]);

    useEffect(() => {
        const storedState = localStorage.getItem("musicPlayerState");
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            dispatch({ type: "RESTORE_STATE", musicPlayerState: parsedState });
        }
    }, [dispatch]);

    if (state.lrc) {
        state.lrc.forEach((item, index) => {
            const startTime = convertTimeToSeconds(item.start_time);
            const endTime = convertTimeToSeconds(item.end_time);

            const totalSectionTime = endTime - startTime;

            item.totalSectionTime = totalSectionTime;
            item.formattedTotalSectionTime = formatTime(totalSectionTime);
        });
    }

    // Hàm chuyển đổi thời gian thành giây
    function convertTimeToSeconds(time) {
        const [minutes, seconds] = time.split(":").map(Number);
        return minutes * 60 + seconds;
    }

    // Hàm định dạng thời gian thành mm:ss:xx
    function formatTime(totalTime) {
        const minutes = Math.floor(totalTime / 60);
        const seconds = Math.floor(totalTime % 60);
        const milliseconds = Math.floor((totalTime % 1) * 100);

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
        )}.${String(milliseconds).padStart(2, "0")}`;
    }

    const calculateCurrentLine = () => {
        if (state.lrc) {
            const currentSection = calculateCurrentSection();

            if (currentSection !== null) {
                const lines = state.lrc[currentSection].content.split("\n");
                const sectionStartTime = convertTimeToSeconds(
                    state.lrc[currentSection].start_time
                );
                const sectionTotalTime =
                    state.lrc[currentSection].totalSectionTime;

                for (let i = 0; i < lines.length; i++) {
                    const lineStartTime =
                        sectionStartTime +
                        (i / lines.length) * sectionTotalTime;
                    const lineEndTime =
                        sectionStartTime +
                        ((i + 1) / lines.length) * sectionTotalTime;

                    if (
                        currentTime >= lineStartTime &&
                        currentTime <= lineEndTime
                    ) {
                        return i;
                    }
                }
            }
        }
        return 0; // Return 0 if there is no lyrics or time information
    };

    const calculateCurrentSection = () => {
        if (state.lrc) {
            let cumulativeTime = convertTimeToSeconds(state.lrc[0].start_time);

            for (let i = 0; i < state.lrc.length; i++) {
                const section = state.lrc[i];
                const sectionEndTime =
                    convertTimeToSeconds(section.start_time) +
                    section.totalSectionTime;

                if (
                    currentTime >= cumulativeTime &&
                    currentTime <= sectionEndTime
                ) {
                    return i;
                }

                cumulativeTime += section.totalSectionTime;
            }
        }
        return null; // Return null if there is no lyrics or time information
    };

    return (
        <DefaultLayout auth={auth}>
            {state.lrc ? (
                <div
                    className="flex flex-row justify-center mt-2 p-4 rounded text-black font-semibold
                 lg:overflow-auto lg:h-2/3 text-lg bg-gradient-to-b from-indigo-300 overflow-scroll"
                    ref={lyricsContainerRef}
                >
                    <div className="text-3xl text-center leading-loose">
                        {state.lrc.map((section, sectionIndex) => (
                            <div
                                key={sectionIndex}
                                id={`line-${sectionIndex}`}
                                className="line-group"
                            >
                                {section.content
                                    .split("\n")
                                    .map((line, lineIndex) => (
                                        <span
                                            key={lineIndex}
                                            className={`text-black ${
                                                sectionIndex ===
                                                    calculateCurrentSection() &&
                                                lineIndex ===
                                                    calculateCurrentLine()
                                                    ? "text-white"
                                                    : ""
                                            }`}
                                        >
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                            </div>
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
