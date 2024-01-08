import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function ListHome({ auth, home }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col h-full p-3 bg-neutral-900">
                <div className="flex flex-row justify-between">
                    <h1 className="lg:fixed top-5 ml-2 start-1/5 font-medium text-cyan-500 text-center text-2xl">
                        Danh sách hiển thị
                    </h1>
                </div>
                <div className="mt-2">
                    <table className="w-full">
                        <thead>
                            <tr className="text-base text-neutral-400 font-light h-10 border-b border-neutral-700">
                                <th className="lg:w-1/12">STT</th>
                                <th className="lg:w-2/12">Chủ đề</th>
                                <th className="lg:w-2/12">Danh sách nhạc</th>
                                <th className="lg:w-1/12">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-sm text-white">
                            {home.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-neutral-800"
                                >
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td className="py-2">
                                        <button className="bg-blue-600 hover:bg-cyan-700 text-white text-sm font-bold py-2 px-4 rounded">
                                            <Link
                                                href={`/home/listMusic/${item.id}`}
                                            >
                                                Xem danh sách
                                            </Link>
                                        </button>
                                    </td>
                                    <td>
                                        <div className="flex justify-center">
                                            <Link
                                                href={`/home/update/${item.id}`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5 text-cyan-300"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
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
