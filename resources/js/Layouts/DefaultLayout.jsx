import React, { useEffect } from "react";
import "./DefaultLayout.css";
import Slider from "../Pages/Client/components/Slider";
import Header from "@/Pages/Client/components/Header";

export default function DefaultLayout({ auth, children }) {
    return (
        <>
            {/* {auth ? <Header auth={auth.user} /> : <Header />}
            {children} */}
            {/* Main */}

            {/* Top */}
            <div className="flex lg:flex-row lg:h-5/6 lg:w-full">
                <Slider auth={auth} />
                {/* Content */}
                <div className="w-full lg:bg-gradient-to-t from-teal-950 bg-neutral-900 p-4 lg:w-4/5 lg:pt-2 lg:pl-5 lg:rounded-xl lg:my-2 lg:mr-2">
                    <Header auth={auth} />
                    {children}
                </div>
            </div>
        </>
    );
}
