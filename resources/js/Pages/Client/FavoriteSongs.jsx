import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/inertia-react";


export default function FavoriteSongs({ auth, favoriteSongs }) {
    const handleDelete = async (id) => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this favorite song?"
        );
        if (shouldDelete) {
            try {
                await axios.delete(`/favorite-songs/${id}`);
            } catch (error) {
                console.error("Error deleting favorite song:", error);
            }
        }
    };

    return (
        <>
            <DefaultLayout auth={auth}>
            <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <h1 className="lg:text-2xl lg:fixed top-5 start-96 text-base font-bold text-white">
                        Bài hát yêu thích của bạn
                    </h1>

                    <table class="table-auto w-full mt-2">
                        <thead>
                            <tr className="border-b-2 text-neutral-500 border-neutral-600">
                                <th className="lg:w-1/12">#</th>
                                <th className="lg:w-1/12"></th>
                                <th className="lg:w-4/12 text-left">Tiêu đề</th>
                                <th className="lg:w-3/12 text-left">Nghệ sĩ</th>
                                <th className="lg:w-3/12">Thao tác</th>
                            </tr>
                        </thead>

                        <tbody className="text-white text-base">
                        {Array.isArray(favoriteSongs) &&
                    favoriteSongs.length > 0 ? (
                        favoriteSongs.map((favoriteSong, index) => (
                                <tr
                                key={favoriteSong.id}
                                >
                                    <td className="relative group text-center">
                                        <span className="group-hover:hidden">
                                            {index + 1}
                                        </span>

                                    </td>
                                    <td className="flex justify-center my-2">
                                        <img
                                            src={`http://localhost:8000/upload/images/${favoriteSong.song.thumbnail}`}
                                            alt=""
                                            className="rounded-lg lg:w-16 lg:h-16 w-20 object-cover"
                                        />
                                    </td>
                                    <td className="text-left">
                                        <span>{favoriteSong.song.name}</span>
                                    </td>
                                    <td className="text-left">
                                        <span>{favoriteSong.song.artist}</span>
                                    </td>
                                    <td className="text-center">
                                    <Link
                                        as="button"
                                        onClick={() =>
                                            handleDelete(favoriteSong.id)
                                        }
                                        className="mt-2 text-red-500"
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
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </Link>
                                    </td>
                                </tr>
                                )) ) : (
                                    <tr
                                  className="w-full text-3xl">
                                        <td colspan="5" className="text-center text-red-600">Bạn chưa có bài hát yêu thích nào!</td>
                                        </tr>
                                        )}

                        </tbody>

                    </table>

            </div>
            </DefaultLayout>
        </>
    );
}
