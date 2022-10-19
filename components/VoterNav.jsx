import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io"
import { BiUserCircle } from "react-icons/bi";
import { useAuth } from "../context/AuthProvider";
import { motion } from "framer-motion"
import Image from "next/image"
import VoterSide from "./VoterSide";
import { BiArrowBack } from "react-icons/bi";

const AdminNav = ({ candidate }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const { logout, currentUser } = useAuth()



    const handleLogout = async () => {
        await logout()
    }
    return <>
        <div className="fixed md:sticky   border-b-[1px] border-white flex   justify-between px-4 md:px-4 items-center text-white opacity-[.98] min-h-[70px] md:h-[80px] w-full top-0 left-0 bg-black z-10  ">

            <h1 className="flex  cursor-pointer" onClick={() => {

                router.push(candidate ? candidate : '/voter')

            }}>
                <BiArrowBack className="text-3xl text-[fuchsia]" />
            </h1>
            <h1 className="" onClick={() => {

                // router.push('/')
            }}>
                <IoMdNotificationsOutline className="text-3xl text-[fuchsia]" />
            </h1>



            <button onClick={handleLogout} className="hidden md:flex mr-5 px-4 py-2 border-[1px] border-[fuchsia]">Logout</button>
            <motion.div className="close xm:cursor-pointer md:hidden mr-5 text-2xl cursor-pointer w-[50px] justify-center flex" onClick={() => setOpen(!open)} layout>
                {open ? <div className="flex flex-col gap-2">
                    <motion.div
                        initial={{
                            rotate: 0,
                        }}
                        animate={{
                            rotate: '-45deg',

                        }}

                        className="bg-[fuchsia] w-[30px] h-[2px] -ml-3"></motion.div>
                    <motion.div
                        initial={{
                            rotate: 0,
                        }}
                        animate={{
                            rotate: '45deg',
                        }}

                        className="bg-[fuchsia] w-[30px] h-[2px] -ml-3"></motion.div>
                    <motion.div
                        initial={{
                            scaleX: 1,
                        }}
                        animate={{
                            scaleX: 0,
                        }}

                        className="bg-[fuchsia] w-[30px] h-[2px] "></motion.div>
                </div> :
                    <div className="flex flex-col gap-2">
                        <motion.div
                            animate={{
                                rotate: 0,
                            }}
                            initial={{
                                rotate: '-45deg',

                            }}
                            className="bg-[fuchsia] w-[30px] h-[2px] -ml-3"></motion.div>
                        <div className="bg-[fuchsia] w-[30px] h-[2px]"></div>
                        <div className="bg-[fuchsia] w-[30px] h-[2px] -ml-3"></div>
                    </div>
                }
            </motion.div>

        </div>
        <div className={!open ? `absolute h-full w-screen top-[80px] left-0 z-10 transition duration-[.3s] -translate-x-[100vw]` :
            "absolute h-full w-screen  top-[80px] left-0 z-10 translate-x-0 transition duration-[.5s] bg-[rgba(255,0,255,.1)]"}
            onClick={() => setOpen(false)}>
            <VoterSide />
        </div>
    </>

};





export default AdminNav;
