import React, { useEffect } from "react";
import Image from "next/image"
import { useVoter } from "../context/VoterAuthProvider";
import { useRouter } from "next/router";
import axios from "axios";
import { baseUrl } from "./data";

const VoterSide = ({ index }) => {
    const { currentUser: user, logout } = useVoter()


    const handleLogout = async () => {
        await logout()
    }
    const router = useRouter()


    if (index) {
        return <div className="hidden md:flex -mt-2 w-[300px] text-white p-4    opacity-90   flex-col  gap-4 my-4  h-full min-h-screen border-white border-r-[2px]" onClick={(e) => e.stopPropagation()}>
            <h1 className="text-xl font-semibold">ACCOUNT</h1>
            <div className="flex gap-4">
                <div className=" min-w-[50px] w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                    <Image src={user?.avatar} alt="" width="100%" objectFit="cover" height="100%" />
                </div>
                <div className="flex flex-col t">
                    <h1 className="font-semibold text-xl">{user?.name}</h1>
                    <h1 className="font-light">{user?.email?.slice(0, 20)}...</h1>
                </div>


            </div>

            <div className="flex  flex-col gap-2  uppercase mt-5">



                <h1 className="cursor-pointer px-4 py-3 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {
                    router.push("/voter")

                }}>Home</h1>

                <h1 className="cursor-pointer px-4 py-3 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {
                    router.push("/voter/positions")


                }}>POSITIONS</h1>



                <h1 className="cursor-pointer px-4 py-3 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {
                    router.push("/voter/vote")

                }}>VOTE</h1>

                <h1 className="cursor-pointer px-4 py-3 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {
                    handleLogout()

                }}>LOGOUT</h1>


            </div>



        </div>


    } else {
        return <div className=" w-[300px] text-white p-4    bg-[rgba(0,0,0.9)] opacity-[.98]  flex flex-col  gap-4 my-4 h-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-4">
                <div className=" min-w-[50px] w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                    <Image src={user?.avatar} alt="" width="100%" objectFit="cover" height="100%" />
                </div>
                <div className="flex flex-col t">
                    <h1 className="font-semibold text-xl">{user?.name}</h1>
                    <h1 className="font-light">{user?.email?.slice(0, 20)}...</h1>
                </div>


            </div>

            <div className="flex  flex-col gap-2  uppercase mt-5">



                <h1 className="cursor-pointer px-4 py-3 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {
                    router.push("/voter")

                }}>Home</h1>

                <h1 className="cursor-pointer px-4 py-3 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {
                    router.push("/voter/positions")


                }}>POSITIONS</h1>



                <h1 className="cursor-pointer px-4 py-3 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {
                    router.push("/voter/vote")

                }}>VOTE</h1>

                <h1 className="cursor-pointer px-4 py-3 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {
                    handleLogout()

                }}>LOGOUT</h1>


            </div>


        </div>
    };
}

export default VoterSide;
