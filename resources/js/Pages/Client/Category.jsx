import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/react";
import styled from "styled-components";

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const StyledBox = styled.div`
    background-color: ${(props) => props.bgColor || getRandomColor()};
`;

export default function Category({ auth, cate }) {
    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <section className="text-white">
                        <h1 className="lg:text-2xl lg:fixed top-5 start-96 text-base font-bold">
                            Thể loại
                        </h1>

                        <div className="grid grid-cols-2 md:grid-cols-5 text-xs md:gap-y-8 gap-3 w-full mt-4">
                            {cate.map((item) => (
                                <StyledBox
                                    key={item.id}
                                    className="flex flex-col hover:bg-teal-400 w-44 h-24 lg:w-52 lg:h-44 rounded overflow-hidden"
                                >
                                    <Link href={`/songCate/${item.id}`}>
                                        <span className="font-bold lg:text-lg p-2">
                                            {item.name}
                                        </span>
                                        <div className="w-28 lg:w-36 h-40 ml-20 lg:mt-6">
                                            <img
                                                src={`../upload/images/${item.avatar}`}
                                                className="w-full h-full transform -rotate-45 object-cover"
                                            />
                                        </div>
                                    </Link>
                                </StyledBox>
                            ))}
                        </div>
                    </section>
                </div>
            </DefaultLayout>
        </>
    );
}
