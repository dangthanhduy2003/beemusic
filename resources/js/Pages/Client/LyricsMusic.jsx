import DefaultLayout from "@/Layouts/DefaultLayout";

export default function LyricsMusic({ music }) {
    return (
        <>
            <DefaultLayout>
                <div>{music.lyrics}</div>
            </DefaultLayout>
        </>
    );
}
