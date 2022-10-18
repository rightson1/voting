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
      <div className="flex  flex-col relative py-8">
        <div className="flex w-full justify-between">
          <div className="w-[150px] h-[150px] grid grid-rows-5 grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1, 1].map((item, index) => {
              return <div className="h-[4px] w-[4px] bg-white rounded-[50%]" key={index}></div>
            })}
          </div>
          <div className="flex flex-col items-center justify-center p-4 gap-4 md:flex-row bg-[rgba(255,255,255,.5)] z-[2]">
            <button className="p-4 shadow-lg bg-white" onClick={() => router.push("/")}>Login As Voter</button>
            <button className="p-4 shadow-lg bg-white" onClick={() => router.push("/admin/login")}>Login As Admin</button>
          </div>
        </div>
        <div className="flex px-4  -ml-2 flex-1 w-full h-full max-w-[400px] max-h-[400px] bg-[rgba(0,0,0,.6)] md:-ml-8 flex-col justify-center min-h-[250px]  gap-4 text-white  z-[3] ">
          <h1 className="font-semibold text-2xl xm:text-3xl text-white ">Mount Kenya University Online Voting System</h1>
          <p className="text-[12px] fomt-thin opacity-60"> To provide world class education, research and innovation for global transformation and sustainable development</p>
        </div>

        <div className="absolute top-10 right-0 w-[80%] h-[400px] z-[1] opacity-10">
          <img src="/mku.png" alt="" className="h-full w-full object-cover " />
        </div>




      </div>
    </div>

  </div>;
};

export default Us;
