import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import AddMusicAlbum from "@/Pages/User/album/AddMusicAlbum";

export default function ListMusicHome({
    auth,
    musicCate,
    musicList,
    id_album,
}) {
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const openAddModal = () => {
        setAddModalIsOpen(true);
    };

    const closeAddModal = () => {
        setAddModalIsOpen(false);
    };

    const handleDelete = (id) => {
        const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (shouldDelete) {
            window.location.href = `/album/DeleteMusic/${id}/${id_album}`;
        }
    };

    const handleSearch = (e) => {
        setCurrentPage(1);
        setSearchTerm(e.target.value);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredMusic = musicList.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentItems = filteredMusic.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col h-full p-3 bg-neutral-900">
                <form className="lg:fixed top-4 start-80 w-96 ml-2">
                    {/* ... Your search form */}
                </form>
                <div className="flex flex-row justify-between mt-2">
                    <h1 className="font-semibold text-white text-2xl">
                        Danh sách nhạc của bạn
                    </h1>
                    <button
                        className="flex items-center justify-center w-12 h-8 bg-cyan-400 rounded-md hover:bg-cyan-200 mr-7"
                        onClick={openAddModal}
                    >
                        {/* ... Add button */}
                    </button>
                    <AddMusicAlbum
                        isOpen={addModalIsOpen}
                        onRequestClose={closeAddModal}
                        musicList={musicList}
                        id_album={id_album}
                    />
                </div>
                <div className="mt-4 text-white">
                    <table className="w-full">
                        <thead>{/* ... Table headers */}</thead>
                        <tbody className="text-center text-base">
                            {currentItems.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-neutral-800"
                                >
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td className="flex justify-center">
                                        <img
                                            className="w-28 h-24 object-scale-down"
                                            src={`../../upload/images/${item.thumbnail}`}
                                            alt=""
                                        />
                                    </td>
                                    <td className="p-2">
                                        {item.link_file ? (
                                            <div className="flex items-center">
                                                <audio
                                                    controls
                                                    className="w-full"
                                                >
                                                    <source
                                                        src={`../../upload/audio/${item.link_file}`}
                                                        type="audio/mpeg"
                                                    />
                                                    Trình duyệt của bạn không hỗ
                                                    trợ phát audio.
                                                </audio>
                                            </div>
                                        ) : (
                                            <p>Không tìm thấy file âm thanh.</p>
                                        )}
                                    </td>
                                    <td>
                                        <button>
                                            <Link
                                                onClick={() =>
                                                    handleDelete(
                                                        item.id,
                                                        id_album
                                                    )
                                                }
                                            >
                                                {/* ... Delete button */}
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
                        length: Math.ceil(filteredMusic.length / itemsPerPage),
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
