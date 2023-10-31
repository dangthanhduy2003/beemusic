import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import AddMusic from "./AddMusic";

export default function ListMusic({ auth, music, categories }) {
    const [addModalIsOpen, setaddModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7); // Đặt số mục trên mỗi trang

    const openAddModal = () => {
        setaddModalIsOpen(true);
    };

    const closeAddModal = () => {
        setaddModalIsOpen(false);
    };
    const handleDelete = (id) => {
        const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (shouldDelete) {
            window.location.href = `/music/delete/${id}`; // Chuyển hướng tới đường dẫn xóa
        }};

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = music.slice(indexOfFirstItem, indexOfLastItem);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="flex flex-col p-2 bg-neutral-200 font-sans">
                    <div>
                        <h2 className="font-bold text-lg">DANH SÁCH BÀI HÁT</h2>
                    </div>
                    <div>
                        <button
                            className="p-1 w-8 h-8 bg-amber-300 rounded-md text-lg hover:bg-amber-100 "
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

                        <AddMusic
                            isOpen={addModalIsOpen}
                            onRequestClose={closeAddModal}
                            categories={categories}
                        />
                    </div>
                    <div className="container mx-auto  border-black ">
                        <table className="min-w-full border-collapse border border-slate-500 text-center">
                            <thead>
                                <tr className="px-6 py-3 text-base font-semibold uppercase tracking-wider border border-slate-500 ">
                                    <th className="lg:w-1/12">#</th>
                                    <th className="lg:w-3/12">Tên bài hát</th>
                                    <th className="lg:w-2/12">Tên nghệ sỹ</th>
                                    <th className="lg:w-2/12">Âm thanh</th>
                                    <th className="lg:w-1/12">Ảnh</th>
                                    <th className="lg:w-1/12">Lượt nghe</th>

                                    <th className="lg:w-2/12">Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.artist}</td>
                                        <td>
                                            {item.link_file ? (
                                                <div>
                                                    <audio controls>
                                                        <source
                                                            src={`http://localhost:8000/upload/audio/${item.link_file}`}
                                                            type="audio/mpeg"
                                                        />
                                                        Trình duyệt của bạn
                                                        không hỗ trợ phát audio.
                                                    </audio>
                                                </div>
                                            ) : (
                                                <p>
                                                    Không tìm thấy file âm
                                                    thanh.
                                                </p>
                                            )}
                                        </td>
                                        <td>
                                            <img
                                                className="w-28"
                                                src={`http://localhost:8000/upload/images/${item.thumbnail}`}
                                                alt=""
                                            />
                                        </td>
                                        <td>{item.view}</td>

                                        <td>
                                            <button>
                                                <Link
                                                    href={`/music/update/${item.id}`}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6 t-lime-500"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                        />
                                                    </svg>
                                                </Link>
                                            </button>

                                            <button>
                                                <Link
                                                    onClick={() =>
                                                        handleDelete(item.id)
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
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination flex flex-row gap-2 mt-2">
                        {Array.from({
                            length: Math.ceil(music.length / itemsPerPage),
                        }).map((_, index) => (
                            <button
                                className="bg-cyan-400 w-12"
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
