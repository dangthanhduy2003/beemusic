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
