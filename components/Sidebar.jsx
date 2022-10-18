import React, { useEffect } from "react";
import Image from "next/image"
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { baseUrl } from "./data";
const Sidebar = ({ index }) => {
    const { user } = useAuth()

    if (index) {
        return <div className="-mt-2 w-[300px] text-white p-4    opacity-90  flex flex-col  gap-4 my-4  h-full min-h-screen border-white border-r-[2px]" onClick={(e) => e.stopPropagation()}>
            <h1 className="text-xl font-semibold">ACCOUNT</h1>
            <div className="flex gap-4">
                <div className=" min-w-[50px] w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                    <Image src={user?.avatar} alt="" width="100%" objectFit="cover" height="100%" />
                </div>
                <div className="flex flex-col t">
                    <h1 className="font-semibold text-xl">{user?.name}</h1>
                    <h1 className="font-light">{user?.email.slice(0, 20)}...</h1>
                </div>


            </div>

            <div className="flex  flex-col gap-2  uppercase">

                <h1 className="cursor-pointer px-4 py-6 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {

                }}>Positions</h1>

                <h1 className="cursor-pointer px-4 py-6 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {


                }}>Candidates</h1>
                <h1 className="cursor-pointer px-4 py-6 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {


                }}>Admins</h1>
                <h1 className="cursor-pointer px-4 py-6 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {


                }}>Manual</h1>


            </div>



        </div>


    } else {
        return <div className=" w-[300px] text-white p-4    bg-[rgba(0,0,0.8)] opacity-90  flex flex-col  gap-4 my-4 h-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-4">
                <div className=" min-w-[50px] w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                    <Image src={user?.avatar} alt="" width="100%" objectFit="cover" height="100%" />
                </div>
                <div className="flex flex-col t">
                    <h1 className="font-semibold text-xl">{user?.name}</h1>
                    <h1 className="font-light">{user?.email.slice(0, 20)}...</h1>
                </div>


            </div>

            <div className="flex  flex-col gap-2 h-full uppercase text-center font-semibold">

                <h1 className="cursor-pointer px-4 py-6 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {

                }}>Positions</h1>

                <h1 className="cursor-pointer px-4 py-6 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {


                }}>Candidates</h1>
                <h1 className="cursor-pointer px-4 py-6 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {


                }}>Admins</h1>
                <h1 className="cursor-pointer px-4 py-6 text-white text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {


                }}>Manual</h1>


            </div>


        </div>
    };
}

export default Sidebar;
