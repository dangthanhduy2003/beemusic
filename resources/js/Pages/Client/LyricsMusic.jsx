import DefaultLayout from "@/Layouts/DefaultLayout";

export default function LyricsMusic({ auth, music }) {
    return (
        <>
            <DefaultLayout auth={auth}>
                {music.lyrics ? (
                    <div
                        className="flex flex-row mt-2 p-4 rounded text-black font-semibold lg:overflow-auto lg:h-2/3 text-lg
                        bg-indigo-300"
                    >
                        <div className="text-3xl">{music.lyrics}</div>
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
