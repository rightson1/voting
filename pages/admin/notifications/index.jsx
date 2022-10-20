import axios from "axios";
import { useRouter, } from "next/router";
import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import AdminNav from "../../../components/AdminNav";
import { AiOutlineArrowRight, AiOutlineRight, AiOutlineCloseCircle, AiFillPicture } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions, baseUrl } from "../../../components/data";
import { motion } from "framer-motion"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import Image from "next/image";
import { format } from "timeago.js"
const Candidate = () => {
    const router = useRouter();
    const [candidates, setCandidates] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [open, setOpen] = useState(false);
    const [candidateId, setCandidateId] = useState(null);
    const [all, setAll] = useState(false)
    const [votes, setVotes] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [read, setRead] = useState(true);
    const { id } = router.query;

    useEffect(() => {
        axios.get(`${baseUrl}/apply`).then(res => {
            setAll(res.data)
            setLoading1(false);



        }).catch(err => {
            setLoading1(false);

        }
        )
    }, [])
    useEffect(() => {
        axios.get(`${baseUrl}/apply?read=false`).then(res => {
            setNotifications(res.data)



        }).catch(err => {


        }
        )
    }, [])



    return <div className="bg-black w-screen   relative md:overflow-y-hidden md:h-[100vh]   overflow-x-hidden   h-screen">


        <div className="flex h-full ">
            <div className="hidden md:flex">
                <Sidebar index={true} />
            </div>
            <div className="flex flex-col w-full">
                <AdminNav />


                <div className="mt-20 md:mt-3 overflow-y-auto ">
                    <div className="flex w-full justify-center items-center gap-4 flex-row-reverse">
                        <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold  underline  cursor-pointer" onClick={() => setRead(false)} style={{
                            color: !read && 'white'
                        }} >UNREAD</h1>
                        <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold underline  cursor-pointer" onClick={() => setRead(true)}
                            style={{
                                color: read && 'white'
                            }}
                        >ALL</h1>

                    </div>
                    <div className="   p-4 flex flex-wrap gap-4 justify-center items-center">
                        {read ? all.length &&
                            all.map((item, index) => {
                                return <div key={index} className=" border-[2px] cursor-pointer min-h-[30px] flex gap-1 p-4 " onClick={() => router.push(`/admin/notifications/${item._id}`)}>
                                    <div className=" rounded-full overflow-hidden w-[50px] h-[50px] ml-4">
                                        <Image src={item.avatar || "/rightson.png"} alt="" width={70} height={70} />
                                    </div>
                                    <div className="flex flex-col px-3 opacity-[.7] text-white">

                                        <p><span className="font-bold">{item.name} </span>
                                            applied for a {item.position}</p>


                                    </div>
                                    <div className="justify-self-end opacity-[.5] text-white">
                                        {format(item.updatedAt)}
                                    </div>
                                </div>
                            })
                            : !read ? notifications.length &&

                                notifications.map((item, index) => {
                                    return <div key={index} className=" border-[2px] cursor-pointer min-h-[30px] flex gap-1 p-4 " onClick={() => router.push(`/admin/notifications/${item._id}`)}>
                                        <div className=" rounded-full overflow-hidden w-[50px] h-[50px] ml-4">
                                            <Image src={item.avatar || "/rightson.png"} alt="" width={70} height={70} />
                                        </div>
                                        <div className="flex flex-col px-3 opacity-[.7] text-white">

                                            <p><span className="font-bold">{item.name} </span>
                                                applied for a {item.position}</p>


                                        </div>
                                        <div className="justify-self-end opacity-[.5] text-white">
                                            {format(item.updatedAt)}
                                        </div>
                                    </div>
                                })
                                : loading1 ?

                                    (

                                        <Loading data="Loading.." />
                                    )

                                    : (

                                        <Loading data={'No Notifications for you today'} />
                                    )

                        }


                    </div>
                </div>
                <motion.div
                    initial={{ x: '-200%' }}
                    animate={
                        {
                            x: open ? 0 : '-200%',
                            transition: {
                                duration: 0.5


                            },
                        }
                    }
                    className="fixed items-start top-0 left-0  h-full px-4 py-  w-full z-20  flex  justify-center pt-8 overflow-y-auto bg-[rgba(0,0,0,.9)]">
                    <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  w-screen overflow-x-hidden ">
                        <div className="text-4xl text-white absolute top-0 rounded-full p-1 right-0 cursor-pointer  bg-black">
                            <AiOutlineCloseCircle onClick={() => {
                                setOpen(false)

                            }} />
                        </div>

                        <h1 className="text-2xl font-semibold text-center"> Voters</h1>
                        <div className="my-8 justify-center w-full overflow-auto max-h-[300px] pb-8  ">
                            <table className="border-[2px] border-white bg-white ">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Pic</th>
                                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Adm Nummber</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Position</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Candidate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {votes.filter((vote) => vote.candidateId === candidateId).map((voter, i) => {
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
                                                    <span>{voter.position}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="w-full flex justify-start text-xl">
                                                    <span>{voter.candidateName}</span>
                                                </div>
                                            </td>

                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>


                    </div>
                </motion.div>


            </div>
        </div>
    </div>
};

export default Candidate;
