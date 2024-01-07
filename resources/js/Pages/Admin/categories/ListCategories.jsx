import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import AddCate from "./AddCate";

export default function ListCategories({ auth, categories }) {
    const [addModalIsOpen, setaddModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const openAddModal = () => {
        setaddModalIsOpen(true);
    };

    const closeAddModal = () => {
        setaddModalIsOpen(false);
    };
    const handleDelete = (id) => {
        const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (shouldDelete) {
            window.location.href = `/categories/delete/${id}`; // Chuyển hướng tới đường dẫn xóa
        }
    };

    const handleSearch = (e) => {
        setCurrentPage(1); // Reset về trang đầu tiên khi thực hiện tìm kiếm mới
        setSearchTerm(e.target.value);
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCategories.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="flex flex-col h-full p-3 bg-neutral-900">
                    <form className="lg:fixed top-4 start-80 w-96 ml-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="default-search"
                                className="block w-full h-10 p-4 ps-10 text-sm text-white
                                rounded-full bg-neutral-700 focus:ring-blue-500 focus:border-blue-500 
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Tìm kiếm thể loại"
                                onChange={handleSearch}
                                value={searchTerm}
                            />
                        </div>
                    </form>
                    <div className="flex flex-row justify-between mt-2">
                        <h2 className="font-semibold text-white text-2xl">
                            Danh sách thể loại
                        </h2>
                        <button
                            className="flex items-center justify-center w-12 h-8 bg-cyan-400 rounded-md hover:bg-cyan-200 mr-7"
                            onClick={openAddModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>

                        <AddCate
                            isOpen={addModalIsOpen}
                            onRequestClose={closeAddModal}
                        />
                    </div>
                    <div className="mt-4 text-white">
                        <table className="w-full">
                            <thead>
                                <tr className="text-xl font-light h-10 border-b border-neutral-700">
                                    <th className="lg:w-2/12">STT</th>
                                    <th className="lg:w-4/12">Tên danh mục</th>
                                    <th className="lg:w-2/12">Ảnh danh mục</th>
                                    <th className="lg:w-4/12">Thao tác</th>
                                </tr>
                            </thead>

                            <tbody className="text-center text-base">
                                {currentItems ? (
                                    currentItems.map((item,index) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-neutral-800"
                                        >
                                             <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td className="flex justify-center">
                                                <img
                                                    className="w-28 h-24 object-scale-down"
                                                    src={`../upload/images/${item.avatar}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td>
                                                <div className="flex flex-row justify-center gap-2">
                                                    <Link
                                                        href={`/categories/update/${item.id}`}
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

                                                    <Link
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 text-red-500"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">
                                            No categories available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination flex flex-row gap-2 mt-1">
                        {Array.from({
                            length: Math.ceil(categories.length / itemsPerPage),
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
        </>
    );
}
