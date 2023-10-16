import DefaultLayout from "@/Layouts/DefaultLayout";

export default function Charts({ auth }) {
    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <h1 className="lg:text-xl text-base font-bold text-white">
                        Bảng xếp hạng
                    </h1>
                    <table class="table-auto w-full text-left mt-2">
                        <thead>
                            <tr className="border-b-2 text-neutral-500 border-neutral-600">
                                <th className="lg:w-1/12">#</th>
                                <th className="lg:w-4/12">Tiêu đề</th>
                                <th className="lg:w-3/12">lượt phát</th>
                                <th className="lg:w-3/12">Album</th>
                                <th className="lg:w-1/12">
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
                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-white text-base">
                            <tr>
                                <td>1</td>
                                <td>
                                    <div className="flex flex-row p-2">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5d/JungkookSeven.jpg/220px-JungkookSeven.jpg"
                                            alt=""
                                            className="w-16"
                                        />
                                        <div className="flex flex-col ml-3">
                                            <span>Seven (feat.Latto)</span>
                                            <span>Jung Kook, Latto</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="">
                                    <span>4.558.257</span>
                                </td>
                                <td className="">
                                    <span>Seven (feat.Latto)</span>
                                </td>
                                <td className="">
                                    <span>3:04</span>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <div className="flex flex-row p-2">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5d/JungkookSeven.jpg/220px-JungkookSeven.jpg"
                                            alt=""
                                            className="w-16"
                                        />
                                        <div className="flex flex-col ml-3">
                                            <span>Seven (feat.Latto)</span>
                                            <span>Jung Kook, Latto</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span>4.558.257</span>
                                </td>
                                <td>
                                    <span>Seven (feat.Latto)</span>
                                </td>
                                <td>
                                    <span>3:04</span>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>
                                    <div className="flex flex-row p-2">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5d/JungkookSeven.jpg/220px-JungkookSeven.jpg"
                                            alt=""
                                            className="w-16"
                                        />
                                        <div className="flex flex-col ml-3">
                                            <span>Seven (feat.Latto)</span>
                                            <span>Jung Kook, Latto</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span>4.558.257</span>
                                </td>
                                <td>
                                    <span>Seven (feat.Latto)</span>
                                </td>
                                <td>
                                    <span>3:04</span>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>
                                    <div className="flex flex-row p-2">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5d/JungkookSeven.jpg/220px-JungkookSeven.jpg"
                                            alt=""
                                            className="w-16"
                                        />
                                        <div className="flex flex-col ml-3">
                                            <span>Seven (feat.Latto)</span>
                                            <span>Jung Kook, Latto</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span>4.558.257</span>
                                </td>
                                <td>
                                    <span>Seven (feat.Latto)</span>
                                </td>
                                <td>
                                    <span>3:04</span>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>
                                    <div className="flex flex-row p-2">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5d/JungkookSeven.jpg/220px-JungkookSeven.jpg"
                                            alt=""
                                            className="w-16"
                                        />
                                        <div className="flex flex-col ml-3">
                                            <span>Seven (feat.Latto)</span>
                                            <span>Jung Kook, Latto</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span>4.558.257</span>
                                </td>
                                <td>
                                    <span>Seven (feat.Latto)</span>
                                </td>
                                <td>
                                    <span>3:04</span>
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>
                                    <div className="flex flex-row p-2">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5d/JungkookSeven.jpg/220px-JungkookSeven.jpg"
                                            alt=""
                                            className="w-16"
                                        />
                                        <div className="flex flex-col ml-3">
                                            <span>Seven (feat.Latto)</span>
                                            <span>Jung Kook, Latto</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span>4.558.257</span>
                                </td>
                                <td>
                                    <span>Seven (feat.Latto)</span>
                                </td>
                                <td>
                                    <span>3:04</span>
                                </td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>
                                    <div className="flex flex-row p-2">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5d/JungkookSeven.jpg/220px-JungkookSeven.jpg"
                                            alt=""
                                            className="w-16"
                                        />
                                        <div className="flex flex-col ml-3">
                                            <span>Seven (feat.Latto)</span>
                                            <span>Jung Kook, Latto</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span>4.558.257</span>
                                </td>
                                <td>
                                    <span>Seven (feat.Latto)</span>
                                </td>
                                <td>
                                    <span>3:04</span>
                                </td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>
                                    <div className="flex flex-row p-2">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5d/JungkookSeven.jpg/220px-JungkookSeven.jpg"
                                            alt=""
                                            className="w-16"
                                        />
                                        <div className="flex flex-col ml-3">
                                            <span>Seven (feat.Latto)</span>
                                            <span>Jung Kook, Latto</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span>4.558.257</span>
                                </td>
                                <td>
                                    <span>Seven (feat.Latto)</span>
                                </td>
                                <td>
                                    <span>3:04</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DefaultLayout>
        </>
    );
}
