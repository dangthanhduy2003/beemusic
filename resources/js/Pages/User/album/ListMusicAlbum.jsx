import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import AddMusicAlbum from "./AddMusicAlbum";

export default function ListMusicAlbum({ auth,musicCate,musicList,id_album}) {
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Số lượng mục trên mỗi trang
    const openAddModal = () => {
        setAddModalIsOpen(true);
    };

    const closeAddModal = () => {
        setAddModalIsOpen(false);
    };
    const handleDelete = (id) => {
        const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (shouldDelete) {
            window.location.href = `/album/DeleteMusic/${id}/${id_album}`; // Chuyển hướng tới đường dẫn xóa
        }
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = musicCate.slice(indexOfFirstItem, indexOfLastItem);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col h-full p-2 bg-neutral-200 font-sans">
                <div>
                    <h1 className="font-semibold text-2xl">DANH SÁCH NHẠC CỦA BẠN</h1>
                </div>
                <div>
                    <button
                        className="p-1 w-8 h-8 bg-amber-300 rounded-md text-lg hover:bg-amber-100"
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
                    <AddMusicAlbum
                            isOpen={addModalIsOpen}
                            onRequestClose={closeAddModal}
                            musicList = {musicList}
                            id_album = {id_album}
              
                        />
                </div>

                <div className="container mx-auto mt-2 bg-neutral-100 p-4">
                    <table className="min-w-full text-center">
                        <thead>
                            <tr className="px-6 py-3 h-10 text-base font-light uppercase tracking-wide bg-neutral-200">
                                <th className="lg:w-1/12">#</th>
                                <th className="lg:w-3/12">Tên bài hát</th>
                                <th className="lg:w-3/12">Ảnh bài hát</th>
                                <th className="lg:w-3/12">Âm thanh</th>
                                <th className="lg:w-2/12">Thao tác</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                                <img
                                                    className="w-24 "
                                                    src={`http://localhost:8000/upload/images/${item.thumbnail}`}
                                                    alt=""
                                                />
                                    </td>
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
                                   

                                            <button>
                                                <Link
                                                     onClick={() =>
                                                        handleDelete(item.id,id_album)
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
                    {Array.from({ length: Math.ceil(musicCate.length / itemsPerPage) }).map((_, index) => (
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
    );
}
