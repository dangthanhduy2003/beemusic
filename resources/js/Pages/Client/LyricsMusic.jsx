import DefaultLayout from "@/Layouts/DefaultLayout";

export default function LyricsMusic({ auth, music }) {
    return (
        <>
            <DefaultLayout auth={auth}>
                <div
                    className="flex flex-row mt-2 p-4 rounded text-black font-semibold lg:overflow-auto lg:h-2/3 text-lg
                    bg-cyan-200 text-justify"
                >
                    <div className="lg:hover:text-slate-500 text-4xl"> {music.lyrics}</div>


                </div>
            </DefaultLayout>
        </>
    );
}
