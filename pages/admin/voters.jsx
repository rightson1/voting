import React, { useEffect, useState } from "react";
import AdminNav from "../../components/AdminNav";
import Lines from "../../components/Lines";
import Sidebar from "../../components/Sidebar";
import { AiOutlineArrowRight, AiOutlineRight, AiOutlineCloseCircle, AiFillPicture } from "react-icons/ai";
import axios from "axios";
import { baseUrl } from "../../components/data";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthProvider";
import { motion } from "framer-motion"
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../components/data";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import Loading from "../../components/Loading";
const Index = () => {
    const { user } = useAuth();
    const router = useRouter();

    const [voters, setVoters] = useState([]);

    const [voterLoading, setVoterLoading] = useState(true);


    const [cols, setCols] = useState(5);
    const [colsList, setColList] = useState([])
    const [header, setHeader] = useState(null)
    const [hColor, setColor] = useState(null)
    const [tColor, setTColor] = useState(null)
    const [border, setBorder] = useState(null)
    const [rows, setRows] = useState(5);

    const [rowList, setRowList] = useState([])


    useEffect(() => {
        axios
            .get(`${baseUrl}/voter`)
            .then((res) => {
                setVoters(res.data)
                setVoterLoading(false)

            })
            .catch((err) => {
                setVoterLoading(false)

            });
    }, [])





    return <div className="bg-black w-screen   relative md:overflow-y-hidden md:h-[100vh]   overflow-x-hidden   min-h-screen">


        <div className="flex h-full ">
            <div className="hidden md:flex">
                <Sidebar index={true} />
            </div>
            <div className="flex flex-col w-full">
                <AdminNav />


                <div className="mt-20 md:mt-3 overflow-y-auto ">
                    <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold w-full flex justify-center underline ">VOTES</h1>
                    <div className="   p-4 flex flex-wrap gap-4 justify-center items-center">

                        {
                            voters ? <div className="my-8 justify-center w-full overflow-auto max-h-[300px] pb-8">
                                <table className="border-[2px] border-white min-w-full bg-white">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Pic</th>
                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Adm Number</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {voters.map((voter, i) => {
                                            return <tr key={i} className="my-2 px-8 border-black border-b" >
                                                <td className="py-4">
                                                    <div className=" flex justify-center w-[50px] h-[50px]  rounded-[50%]">
                                                        <img src={voter.avatar} alt="" className="w-[50px] h-[50px]  rounded-[50%]" />
                                                    </div>

                                                </td>
                                                <td className="">
                                                    <div className="w-full flex justify-start text-xl">
                                                        <span>{voter.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <div className="w-full flex justify-start text-xl">
                                                        <span>{voter.adm}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <div className="w-full flex justify-start text-xl">
                                                        <span>{voter.email}</span>
                                                    </div>
                                                </td>

                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                            </div> : !voterLoading ?



                                <Loading data="No voters added yet" />


                                :

                                <Loading data='loading...' />



                        }
                    </div>


                </div>
            </div>
        </div>

        <Lines />

    </div>;
};

export default Index;

