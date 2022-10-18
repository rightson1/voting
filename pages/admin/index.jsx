import React, { useEffect } from "react";
import AdminNav from "../../components/AdminNav";
import Lines from "../../components/Lines";
import Sidebar from "../../components/Sidebar";
import { AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import axios from "axios";
import { baseUrl } from "../../components/data";
import { useAuth } from "../../context/AuthProvider";
import { useRouter } from "next/router";

const Index = () => {
    const { user } = useAuth();
    const router = useRouter();
    const cards = [
        {
            title: "ELECTION POSITIONS",
            desc: "All election positions related activities",
            roles: "You can add a new position, edit or delete a position, view the candidates that have applied for a position, add or delete a candidate",
            link: 'positions'
        },
        {
            title: "ADD ELECTROL POSITION",
            desc: "Click to add a new electrol position",
            link: 'new-position',
            roles: "You can add a new position"
        },

        {
            title: "VIEW VOTERS",
            desc: "You can view registered voters",
            link: 'voters'
        },
    ]
    return <div className="bg-black w-screen   relative overflow-y-auto   overflow-x-hidden">


        <div className="flex">
            <div className="hidden md:flex">
                <Sidebar index={true} />
            </div>
            <div className="flex flex-col w-full">
                <AdminNav />

                <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold w-full flex justify-center underline mt-3">Welcome To The Admin Dashboard</h1>
                <div className="flex flex-wrap justify-center py-4 gap-4   roud">


                    {
                        cards.map((card, index) => {
                            return <div className="flex h-auto  w-full md:w-[300px] bg-[rgba(255,255,255,.8)]  flex-col p-4 relative gap-4" key={index} >
                                <h1 className="shadow-lg p-4 text-xl text-center  font-bold underline">{card.title} </h1>
                                <div className="shadow-lg p-4  md:h-[110px]">
                                    <p>
                                        <span className="font-semibold">Description:</span> <span className="text-[#ab4bab80]">{card.desc}</span>
                                    </p>


                                </div>

                                <div className="flex flex-wrap   justify-center mb-7">
                                    <button className="font-semibold shadow-lg p-4 w-[200px] flex items-center justify-center" onClick={() => router.push(`/admin/${card.link}`)}>
                                        <span>View</span> <AiOutlineArrowRight />
                                    </button>


                                </div>



                                <div className="absolute -bottom-4 translate-x-[-50%] opacity-90 text-white  left-[50%] bg-[fuchsia] p-4 rounded-full " onClick={() => router.push(`/admin/${card.link}`)}>
                                    <AiOutlineRight className="" />
                                </div>
                            </div>
                        })
                    }


                </div>

            </div>
        </div>

        <Lines />
    </div>;
};

export default Index;
