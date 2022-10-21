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
const Candidate = () => {
    const router = useRouter();
    const [candidates, setCandidates] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [candidateId, setCandidateId] = useState(null);
    const [desc, setDesc] = useState(false);
    const [candidate, setCandidate] = useState(null);
    const [votes, setVotes] = useState([]);

    const { id } = router.query;
    useEffect(() => {
        axios.get(`${baseUrl}/candidate/?id=${id}`).then((res) => {
            setCandidates(res.data);
            setLoading1(false);
        }).catch((err) => {
            console.log(err);
            setLoading1(false);

        })

    }, [id]);
    useEffect(() => {
        axios
            .get(`${baseUrl}/vote?positionId=${id}`)
            .then((res) => {
                setVotes(res.data)


            })
            .catch((err) => {


            });
    }, [candidates])



    return <div className="bg-black w-screen   relative md:overflow-y-hidden md:h-[100vh]   overflow-x-hidden  ">


        <div className="flex h-full ">
            <div className="hidden md:flex">
                <Sidebar index={true} />
            </div>
            <div className="flex flex-col w-full">
                <AdminNav />


                <div className="mt-20 md:mt-3 overflow-y-auto ">
                    <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold w-full flex justify-center underline ">POSITIONS</h1>
                    <div className="   p-4 flex flex-wrap gap-4 justify-center items-center">
                        {candidates.length ?
                            candidates.map((candidate, index) => {
                                return <div className="flex   w-full  bg-[rgba(255,255,255,.8)]  flex-col p-4 relative gap-4 max-w-[500px] md:w-[400px]" key={index}>
                                    <h1 className="shadow-lg p-4 text-xl text-center  font-bold underline">{candidate.name} </h1>
                                    <div className="flex flex-col items-center md:flex--row md:it-ems-start  gap-4">
                                        <div className="shadow-lg  overflow-hidden  h-[100px] w-[100px]  rounded-full min-w-[70px] min-h-[70px]">
                                            <img src={candidate.avatar} alt="" className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <div className="shadow-lg p-4 overflow-y-auto overflow-x-hidden relative">


                                                <p>
                                                    <span className="font-semibold">Votes Gathered:</span> <span className="text-[fuchsia]">{votes.filter((vote) => vote.candidateId === candidate._id).length}</span>
                                                </p>

                                                <p>
                                                    <span className="font-semibold">Total Votes:</span> <span className="text-[fuchsia] text-xl font-bold">{votes.length}</span>
                                                </p>

                                            </div>


                                            <div className="flex flex-wrap   justify-center mb-7">

                                                <button className="font-semibold shadow-lg p-4 w-[200px]" onClick={() => {
                                                    setOpen(votes.filter((vote) => vote.candidateId === candidate._id).length ? true : false)
                                                    setCandidateId(candidate._id)



                                                }}>
                                                    VIEW VOTES TABLE
                                                </button>

                                            </div>



                                        </div>
                                    </div>

                                </div>
                            }) : loading1 ?

                                (

                                    <Loading data="Loading.." />
                                )

                                : (

                                    <Loading data={'No candidate added yet'} />
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

                        <h1 className="text-2xl font-semibold text-center"> VoteS</h1>
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
