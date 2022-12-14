import React, { useEffect } from "react";
import VoterNav from "../../components/VoterNav"
import Lines from "../../components/Lines";
import VoterSide from "../../components/VoterSide";
import { AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { useVoter } from "../../context/VoterAuthProvider"
const Index = () => {
    const { currentUser, logout } = useVoter()




    const router = useRouter();
    const cards = [
        {
            title: "ELECTION POSITIONS",
            desc: "All election positions related activities",
            roles: "You can add a new position, edit or delete a position, view the candidates that have applied for a position, add or delete a candidate",
            link: 'positions'
        },


        {
            title: "VOTE",
            desc: "You can view all the votes casted by voters",
            link: 'vote'
        },


    ]
    useEffect(() => {
        if (!currentUser) {
            toast.success("check sidebar if your details have been fetched, if not refresh")
        }
    }, [])
    return <div className="bg-black w-screen   relative md:overflow-y-hidden md:h-[100vh]   overflow-x-hidden  ">


        <div className="flex h-full overflow-y-hidden">
            <div className="hidden md:flex">
                <VoterSide index={true} />
            </div>
            <div className="flex flex-col w-full ">
                <VoterNav />
                <div className=" flex justify-center underline mt-20 md:mt-3 text-center w-full">
                    <h1 className="text-[18px] md:text-2xl text-[rgba(255,100,255,.5)] font-semibold  underline">Welcome To The Voter Dashboard</h1>

                </div>
                <div className="flex flex-wrap justify-center py-4 gap-4   md:overflow-y-auto px-8 items-center">


                    {
                        cards.map((card, index) => {
                            return <div className="flex h-[300px]  w-full md:w-[300px] bg-[rgba(255,255,255,.8)]  flex-col p-4 relative gap-4 " key={index} >
                                <h1 className="shadow-lg p-4 text-xl text-center  font-bold underline">{card.title} </h1>
                                <div className="shadow-lg p-4  md:h-[110px]">
                                    <p>
                                        <span className="font-semibold">Description:</span> <span className="text-[fuchsia]">{card.desc}</span>
                                    </p>


                                </div>

                                <div className="flex flex-wrap   justify-center mb-7">
                                    <button className="font-semibold shadow-lg p-4 w-[200px] flex items-center justify-center" onClick={() => router.push(`/voter/${card.link}`)}>
                                        <span>View</span> <AiOutlineArrowRight />
                                    </button>


                                </div>



                                <div className="absolute -bottom-4 translate-x-[-50%] opacity-90 text-white  left-[50%] bg-[fuchsia] p-4 rounded-full " onClick={() => router.push(`/voter/${card.link}`)}>
                                    <AiOutlineRight className="" />
                                </div>
                            </div>
                        })
                    }



                </div>

            </div>
        </div>
        <ToastContainer />

        <Lines />
    </div>;
};

export default Index;
