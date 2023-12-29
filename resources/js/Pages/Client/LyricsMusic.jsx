import React, { useEffect, useRef } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function LyricsMusic({ auth }) {
    const { state, currentTime } = useMusic();
    const lyricsContainerRef = useRef(null); // cuộn

    state.lrc.forEach((item, index) => {
        const startTime = convertTimeToSeconds(item.start_time);
        const endTime = convertTimeToSeconds(item.end_time);

        // Tính tổng thời gian của mỗi đoạn
        const totalSectionTime = endTime - startTime;

        // Lưu tổng thời gian vào đối tượng
        item.totalSectionTime = totalSectionTime;

        // Định dạng tổng thời gian thành mm:ss:xx
        item.formattedTotalSectionTime = formatTime(totalSectionTime);
        console.log(item.formattedTotalSectionTime);
    });

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

    // Hàm định dạng currentTime thành mm:ss:xx
    const formattedCurrentTime = formatTime(currentTime);

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

    // cuộn nền
    useEffect(() => {
        const currentLine = calculateCurrentLine();
        const container = lyricsContainerRef.current;

        if (container) {
            const containerHeight = container.clientHeight;
            const lineHeight = container.scrollHeight / state.lrc.length;
            const scrollTo =
                currentLine * lineHeight - containerHeight / 2 + lineHeight / 2;

                if (
                    currentTime >= convertTimeToSeconds(state.lrc[0].start_time)

                ) {
                    container.scrollTo({
                        top: scrollTo,
                        behavior: "smooth",
                    });

                }
        }
    }, [currentTime, state.lrc]);

    return (
        <DefaultLayout auth={auth}>
            {state.lrc ? (
                <div
                    className="flex flex-row justify-center mt-2 p-4 rounded text-black font-semibold
                lg:overflow-auto lg:h-2/3 text-lg bg-gradient-to-b from-indigo-300"
                    ref={lyricsContainerRef}
                >
                    <div className="text-3xl text-center leading-loose">
                        {state.lrc.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
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
