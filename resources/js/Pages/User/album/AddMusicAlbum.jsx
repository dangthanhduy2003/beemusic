import React, { useState } from "react";
import Modal from "react-modal";
import { router } from "@inertiajs/react";

export default function AddMusicAlbum({ isOpen, onRequestClose,musicList,id_album}) {
    const [formData, setFormData] = useState({
        id_music:[],
        
        
    });
console.log(id_album);


    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setFormData({
                ...formData,
                id_music: [...formData.id_music,name],
            });
        } else {
            setFormData({
                ...formData,
                id_music: formData.id_music.filter(
                    (id) => id !== name
                ),
            });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/album/addMusicAlbum/${id_album}`, formData);
        onRequestClose();
    };
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Example Modal"
                className={"fixed inset-0 flex items-center justify-center"}
                overlayClassName={"fixed inset-0 bg-opacity-0"}
            >
                <div className="bg-cyan-100 p-10 rounded-lg">
                <div>
                        <h2 className="font-bold text-xl text-center">THÊM BÀI HÁT</h2>
                    </div>
                    <div  className="mx-auto mt-8">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                           
                            <div className="grid grid-cols-4 gap-4 mb-2">
                                <label
                                    htmlFor="id_categories"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Chọn bài hát:
                                </label>

        {musicList.map((music) => (
        <div  className="flex flex-col" key={music.id}>
            <input
                type="checkbox"
                id={`music_${music.id}`}
                name={music.id}
                    checked={formData.id_music.includes(
                        music.id.toString()
                    )}
                onChange={handleCheckboxChange}
            />
            <label
                htmlFor={`music_${music.id}`}
            >
                {/* chỗ hiển thị ra ngoài */}
                <div className="flex flex-row">
                <span>{music.name}</span>
               <span>{music.artist}</span> 
               <img className="w-28"  src={`http://localhost:8000/upload/images/${music.thumbnail}`} alt="" />
               </div>
                {/* end */}
            </label>
            <br />
        </div>
    ))}
                            </div>
                            <div className="flex items-center justify-between">
                            <button name="sbm" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Thêm
                            </button>
                            </div>
                        </form>
                    </div>
                    <button onClick={onRequestClose}>Close</button>
                </div>
            </Modal>
        </>
    );
}
