import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function ListHome({ auth, home }) {
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);


    const openAddModal = () => {
        setAddModalIsOpen(true);
    };

    const closeAddModal = () => {
        setAddModalIsOpen(false);
    };

    const handleDelete = (id) => {
        const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (shouldDelete) {
            // Assuming you have a route for deleting the item using Inertia
            // Use Inertia's `delete` method instead of changing window.location.href
            // Example: Inertia.delete(`/home/delete/${id}`);
        }
    };



    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col h-full p-3 bg-neutral-900">
                {/* Search form */}
               

                {/* Header */}
                <div className="flex flex-row justify-between mt-2">
                    <h1 className="font-semibold text-white text-2xl">Danh sách hiển thị</h1>
                   
                </div>

                {/* Table */}
                <div className="mt-4 text-white">
                    <table className="w-full">
                        <thead>
                            {/* Table headers */}
                        </thead>

                        <tbody className="text-center text-base">
                            {home.map((item) => (
                                <tr key={item.id} className="border-b border-neutral-800">
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 mt-1.5 rounded">
                                            <Link href={`/home/listMusic/${item.id}`}>
                                                Xem danh sách
                                            </Link>
                                        </button>
                                    </td>
                                    <td>
                             <Link
                                                href={`/home/update/${item.id}`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 text-cyan-300"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                    />
                                                </svg>
                                            </Link>
                                            </td>
                                   
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
               
            </div>
        </AuthenticatedLayout>
    );
}
