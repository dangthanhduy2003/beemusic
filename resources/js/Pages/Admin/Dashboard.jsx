import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Các chức năng
                </h2>
            }
        >
            <div className="py-4">
                <ul className="flex space-x-4">
                    <li className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        Menu Item 1
                    </li>
                    <li className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        Menu Item 2
                    </li>
                    <li className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        Menu Item 3
                    </li>
                </ul>
            </div>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Bạn đã đăng nhập!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
