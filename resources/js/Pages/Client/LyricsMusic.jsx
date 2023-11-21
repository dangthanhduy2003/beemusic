import DefaultLayout from "@/Layouts/DefaultLayout";

export default function LyricsMusic({ auth, music }) {
    return (
        <>
            <DefaultLayout auth={auth}>
                <div
                    className="mt-2 p-4 rounded text-black font-semibold lg:overflow-auto lg:h-2/3 text-lg
                bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                >
                    {music.lyrics}
                </div>
            </DefaultLayout>
        </>
    );
}
