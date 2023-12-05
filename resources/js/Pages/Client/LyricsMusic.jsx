import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function LyricsMusic({ auth }) {
    const { state } = useMusic();
    return (
        <>
            <DefaultLayout auth={auth}>
                {state.currentSong.lyrics ? (
                    <div className="flex flex-row justify-center mt-2 p-4 rounded text-black font-semibold lg:overflow-auto lg:h-2/3 text-lg bg-gradient-to-b from-indigo-300">
                        <div className="text-3xl text-center leading-loose">
                            {state.currentSong.lyrics &&
                                state.currentSong.lyrics
                                    .split("\n")
                                    .map((line, index) => (
                                        <span
                                            key={index}
                                            className="hover:text-white transition-colors duration-300"
                                        >
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex flex-row justify-center items-center mt-2 p-4 rounded text-black font-semibold lg:overflow-auto lg:h-2/3 text-lg
                        bg-indigo-300"
                    >
                        <div className="text-3xl">
                            Bài hát này tạm thời chưa có lời
                        </div>
                    </div>
                )}
            </DefaultLayout>
        </>
    );
}
