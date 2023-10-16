import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-neutral-900">
            <div>
                <Link href="/">
                    <span className="lg:text-2xl font-bold text-cyan-400">
                        BEE MUSIC
                    </span>
                </Link>
            </div>

            <div className="w-full lg:bg-neutral-800 sm:max-w-md mt-6 px-10 py-16 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
