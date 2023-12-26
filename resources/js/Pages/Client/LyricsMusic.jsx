import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function LyricsMusic({ auth }) {
    const { state, currentTime } = useMusic();
    const [currentLine, setCurrentLine] = useState("");
    const [highlightedLine, setHighlightedLine] = useState(-1);
    const [currentLines, setCurrentLines] = useState([]); // Khai báo currentLines ở đây

    const createLRCLines = (lyricsArray) =>
        lyricsArray.map((line) => {
            const match = line.match(/\[(\d+):(\d+)\.(\d+)\]([\s\S]*)/);
            return match
                ? `[${formatTime(
                      parseInt(match[1]) * 60 +
                          parseInt(match[2]) +
                          parseInt(match[3]) / 1000
                  )}] ${match[4]}`
                : line;
        });

    const findCurrentLines = (lyricsArray, currentTime) => {
        const lines = [];
        for (let i = 0; i < lyricsArray.length; i++) {
            const match = lyricsArray[i].match(/\[(\d+):(\d+)\.(\d+)\]/);
            if (match) {
                const lineTime =
                    parseInt(match[1]) * 60 +
                    parseInt(match[2]) +
                    parseFloat(match[3]) / 1000;
                const nextLineTime =
                    i < lyricsArray.length - 1
                        ? parseFloat(
                              lyricsArray[i + 1].match(
                                  /\[(\d+):(\d+)\.(\d+)\]/
                              )[0]
                          )
                        : Infinity;

                if (currentTime >= lineTime && currentTime < nextLineTime) {
                    lines.push(lineTime);
                }
            }
        }
        console.log("currentLines:", lines);
        return lines;
    };

    useEffect(() => {
        if (state.currentSong.lyrics) {
            const lyricsArray = state.currentSong.lyrics
                .split("\n")
                .filter(Boolean);

            const formattedLRCLines = createLRCLines(lyricsArray);
            setCurrentLine(formattedLRCLines.join("\n"));

            const lines = findCurrentLines(lyricsArray, currentTime);
            console.log("currentLines in useEffect:", lines);
            setCurrentLines(lines);
            setHighlightedLine(lines.length > 0 ? lines[0] : -1);
        }
    }, [currentTime, state.currentSong]);

    return (
        <DefaultLayout auth={auth}>
            {currentLine ? (
                <div className="flex flex-row justify-center mt-2 p-4 rounded text-black font-semibold lg:overflow-auto lg:h-2/3 text-lg bg-gradient-to-b from-indigo-300">
                    <div className="text-3xl text-center leading-loose">
                        {currentLine.split("\n").map((line, index) => (
                            <span
                                key={index}
                                className={`transition-colors duration-300 ${
                                    currentLines.includes(index)
                                        ? "text-yellow-500"
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
