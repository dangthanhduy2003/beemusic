import Footer from "./components/Footer";
import Header from "./components/Header";

export default function DefaultLayout({ auth, children }) {
    return (
        <>
            {auth ? <Header auth={auth.user} /> : <Header />}
            {children}
            <Footer />
        </>
    );
}
