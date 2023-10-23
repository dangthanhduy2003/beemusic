import "./DefaultLayout.css";
import Footer from "../Pages/Client/components/Footer";
import Header from "../Pages/Client/components/Header";
import Search from "../Pages/Client/components/Search";

export default function DefaultLayout({ children }) {
    return (
        <>
            {/* {auth ? <Header auth={auth.user} /> : <Header />}
            {children} */}
            <div className="container bg-black font-sans">
                {/* Main */}
                <div className="flex flex-col h-screen">
                    {/* Top */}
                    <div className="flex lg:flex-row lg:h-5/6 lg:w-full">
                        <Header />
                        {/* Content */}
                        <div className="w-full bg-neutral-900 p-4 lg:w-4/5 lg:pt-2 lg:pl-5 lg:rounded-xl lg:my-2 lg:mr-2">
                            <Search />
                            {children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
