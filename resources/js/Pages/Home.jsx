import DefaultLayout from "@/Layouts/DefaultLayout";

export default function Home({ auth }) {
    return (
        <>
            <DefaultLayout auth={auth}>
                <h3>Trang chủ</h3>
            </DefaultLayout>
        </>
    );
}
