import React, { useEffect } from "react";
import nairobi from "../public/nairobi.jpg"
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import HomeNav from "../components/HomeNav";
const Us = () => {
    const router = useRouter()
    const variants = {
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: .2,
                delayChildren: .2,
            },

        },

        initial: {
            opacity: 0

        }

    }

    return <div className="w-screen h-screen overflow-hidden bg-[rgb(40,35,51)] -md md:p-8 ">
        <div className="w-full h-full bg-[rgb(46,41,56)] rounded p-4 overflow-y-auto md:p-8">
            <HomeNav />
            <div className="flex  flex-col relative py-8 lg:px-16">
                <div className="flex w-full justify-between">

                </div>
                <div className="self-center lg:self-start flex px-4  -ml-2 flex-1 w-full h-full max-w-[400px] max-h-[400px] bg-[rgba(0,0,0,.6)] md:-ml-8 flex-col justify-center min-h-[250px]  gap-4 text-white  z-[3] ">
                    <h1 className="font-semibold text-2xl xm:text-3xl text-white ">Voter</h1>
                    <p className="text-[12px] font-thin opacity-60"> To become a voter click on the  login as voter then register if you dont have an account,from there you can be able to see the candites and there manifestos</p>
                    <h1 className="font-semibold text-2xl xm:text-3xl text-white ">Election Candidate</h1>
                    <p className="text-[12px] font-thin opacity-60"> Click on the {"Login as Voter"} button then register if dont have an account and from there you can be able to apply for you favourite position and wait for admin approval </p>
                </div>
                <div className="self-center lg:self-end  mt-4 flex px-4  lg:-mt-[100px] -ml-2 flex-1 w-full h-full max-w-[400px] max-h-[400px] bg-[rgba(0,0,0,.6)] md:-ml-8 flex-col justify-center min-h-[250px]  gap-4 text-white  z-[3] ">
                    <h1 className="font-semibold text-2xl xm:text-3xl text-white ">Admin</h1>
                    <p className="text-[12px] fomt-thin opacity-60">Click on the login as admin then create an account, Due to security reasons and the need to maintain integrity there will be a manual after you have logged in</p>
                </div>

                <div className="absolute top-10 right-0 w-[80%] h-[400px] z-[1] opacity-10">
                    <img src="/mku.png" alt="" className="h-full w-full object-cover " />
                </div>
                <div className="absolute bottom-0 -left-8 w-[80%] h-[400px] z-[1] opacity-10">
                    <img src="/nairobi.jpg" alt="" className="h-full w-full " />
                </div>


            </div>
        </div>

    </div>;
};

export default Us;
