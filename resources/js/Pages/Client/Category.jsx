import DefaultLayout from "@/Layouts/DefaultLayout";

export default function Category({ auth,cate }) {
    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <section className="text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            Thể loại
                        </h1>

                        <div className="grid grid-cols-2 md:grid-cols-5 text-xs md:gap-y-8 gap-3 w-full mt-4">
                            {cate.map((item)=>(
                            <div  key={item.id} className="flex flex-col hover:bg-slate-200 bg-teal-300 w-44 h-24 lg:w-52 lg:h-44 rounded overflow-hidden">
                                <span className="font-bold lg:text-lg p-2">
                                {item.name}
                                </span>
                                <div className="w-28 lg:w-36 h-36 ml-20 lg:mt-6">
                                    <img
                                         src={`http://localhost:8000/upload/images/${item.avatar}`}
                                        className="w-full h-full transform -rotate-45"
                                    />
                                </div>
                            </div>
                            ))}
                        </div>

                    </section>
                </div>
            </DefaultLayout>
        </>
    );
}
