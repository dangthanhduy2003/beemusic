import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function ListHome({ auth, home }) {
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHomes = home.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                            {currentHomes.map((item) => (
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
                <div className="pagination flex flex-row gap-2 mt-2">
                    {Array.from({
                        length: Math.ceil(home.length / itemsPerPage),
                    }).map((_, index) => (
                        <button
                            className="bg-cyan-400 hover:bg-cyan-200 w-10 h-7 rounded-md"
                            key={index}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
