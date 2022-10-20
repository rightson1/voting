import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import Lines from "../../../components/Lines";
import Sidebar from "../../../components/Sidebar";
import { AiOutlineArrowRight, AiOutlineRight, AiOutlineCloseCircle, AiFillPicture } from "react-icons/ai";
import axios from "axios";
import { baseUrl } from "../../../components/data";
import { useRouter } from "next/router";
import { useAuth } from "../../../context/AuthProvider";
import { motion } from "framer-motion"
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../../components/data";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import Loading from "../../../components/Loading";
const Index = () => {
    const { user } = useAuth();
    const router = useRouter();

    const [jobs, setJobs] = useState([]);

    const [jobLoading, setJobLoading] = useState(true);


    useEffect(() => {
        axios
            .get(`${baseUrl}/jobs`)
            .then((res) => {
                setJobs(res.data)
                setJobLoading(false)

            })
            .catch((err) => {
                setJobLoading(false)

            });
    }, [])




    return <div className="bg-black w-screen   relative md:overflow-y-hidden md:h-[100vh]   overflow-x-hidden  ">


        <div className="flex h-full ">
            <div className="hidden md:flex">
                <Sidebar index={true} />
            </div>
            <div className="flex flex-col w-full">
                <AdminNav />


                <div className="mt-20 md:mt-3 overflow-y-auto ">
                    <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold w-full flex justify-center underline ">VOTES</h1>
                    <div className="   p-4 flex flex-wrap gap-4 justify-center items-center">
                        {jobs.length ?
                            jobs.map((job, index) => {
                                return <div className="flex h-auto  md:h-[200px]  w-full md:w-[300px] bg-[rgba(255,255,255,.8)]  flex-col p-4 relative gap-4" key={index}>
                                    <h1 className="shadow-lg p-4 text-xl text-center  font-bold underline">{job.title} </h1>


                                    <div className="flex flex-wrap   justify-center mb-7 overflow-y-auto">
                                        <button className="font-semibold shadow-lg p-4 w-[200px]"
                                            onClick={() => router.push(`/admin/votes/${job._id}`)
                                            }
                                        >
                                            VIEW VOTES
                                        </button>

                                    </div>



                                    <div className="absolute -bottom-4 translate-x-[-50%] opacity-90 text-white  left-[50%] bg-[fuchsia] p-4 rounded-full  cursor-pointer" onClick={() => router.push(`/admin/votes/${job._id}`)
                                    }>
                                        <AiOutlineRight className="" />
                                    </div>
                                </div>
                            }) : !jobLoading ?

                                (

                                    <Loading data="No positions created yet" />
                                )

                                : (

                                    <Loading data={'loading...'} />
                                )

                        }


                    </div>
                    \

                </div>
            </div>
        </div>

        <Lines />

    </div>;
};

export default Index;
