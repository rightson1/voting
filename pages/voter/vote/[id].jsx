import axios from "axios";
import { useRouter, } from "next/router";
import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import VoterSide from "../../../components/VoterSide";
import VoterNav from "../../../components/VoterNav";
import { AiOutlineArrowRight, AiOutlineRight, AiOutlineCloseCircle, AiFillPicture } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions, baseUrl } from "../../../components/data";
import { motion } from "framer-motion"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import Image from "next/image";
import { useVoter } from "../../../context/VoterAuthProvider";
import { ToastOptions } from "react-toastify";

const Candidate = () => {

    const { currentUser: user } = useVoter()

    const router = useRouter();
    const [candidates, setCandidates] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [position, setPosition] = useState()
    const [loading2, setLoading2] = useState(false)
    const [desc, setDesc] = useState(false);
    const [voted, setVoted] = useState(null)

    const [candidate, setCandidate] = useState(null);

    const { id } = router.query;
    useEffect(() => {
        axios.get(`${baseUrl}/jobs/?id=${id}`).then((res) => {

            setPosition(res.data)
        }).catch((err) => {


        })

    }, [id]);

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
        axios.get(`${baseUrl}/vote?voterId=${user?._id}&positionId=${id}`).then((res) => {
            setVoted(res.data)

        }).catch((err) => {


        })

    }, [user, loading2]);


    const handleVote = (candidateId, candidateName) => {
        setLoading2(true)

        const data = { name: user.name, adm: user.adm, voterId: user._id, avatar: user.avatar, position: position.title, positionId: id, candidateName, candidateId }
        axios.post(`${baseUrl}/vote`, data).then((res) => {

            if (res.data.voterId) {
                toast.success('Voted Sucessfull')
                setLoading2(false)
            } else {
                toast.success(res.data)
                setLoading2(false)
            }
        }).catch((err) => {
            setLoading2(false)


        })
    }


    return <div className="bg-black w-screen   relative md:overflow-y-hidden md:h-[100vh]   overflow-x-hidden  ">


        <div className="flex h-full ">
            <div className="hidden md:flex">
                <VoterSide index={true} />
            </div>
            <div className="flex flex-col w-full">
                <VoterNav candidate="/voter/vote" />


                <div className="mt-20 md:mt-3 overflow-y-auto ">
                    <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold w-full flex justify-center underline ">{position?.title.toUpperCase()} CANDIDATES</h1>
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
                                                <p className="flex gap-8 items-center">
                                                    <span className="font-semibold">Details:</span> <button className="font-semibold shadow-lg p-2" onClick={() => {
                                                        setDesc(true)
                                                        setCandidate(candidate)

                                                    }}>
                                                        CLICK TO VIEW
                                                    </button>
                                                </p>

                                                <p>
                                                    <span className="font-semibold">Email:</span> <span className="text-[fuchsia]">{candidate.email}</span>
                                                </p>

                                            </div>


                                            <div className="flex flex-wrap   justify-center mb-7">


                                                {voted ? <button className="font-semibold shadow-lg p-1 text-[14px] mt-4 w-[200px]"


                                                >
                                                    You already voted

                                                </button> :
                                                    <button className="font-semibold shadow-lg p-1 text-[14px] mt-4 w-[200px]"
                                                        onClick={() => handleVote(candidate._id, candidate.name)
                                                        }
                                                    >
                                                        {loading2 ? 'Loading' : `vote for ${candidate.name}`}

                                                    </button>
                                                }

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
                            x: desc ? 0 : '-200%',
                            transition: {
                                duration: 0.5


                            },
                        }
                    }
                    className="fixed items-start top-0 left-0  h-full px-4 py-  w-full z-20  flex  justify-center pt-8 overflow-y-auto  bg-[rgba(0,0,0,.8)]">
                    <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  ">
                        <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-4 -right-3 cursor-pointer" onClick={() => {
                            setDesc(false)

                        }} />

                        {
                            candidate &&
                            <div className="flex   w-full  bg-[rgba(255,255,255,.8)]  flex-col p-4 relative gap-4 max-w-[500px] md:w-[400px]">
                                <h1 className="shadow-lg p-4 text-xl text-center  font-bold underline">{candidate.name} </h1>
                                <div className="flex flex-col items-center md:flex--row md:it-ems-start  gap-4">
                                    <div className="shadow-lg  overflow-hidden  h-[100px] w-[100px]  rounded-full min-w-[70px] min-h-[70px]">
                                        <img src={candidate.avatar} alt="" className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <div className="shadow-lg p-4 overflow-y-auto overflow-x-hidden relative">
                                            <p className="flex gap-8 items-start justify-start">
                                                <span className="font-semibold">Bio:</span><span>
                                                    {candidate.bio}
                                                </span>
                                            </p>

                                            <p>
                                                <span className="font-semibold">Manifesto:</span> <span className="text-[fuchsia]">{candidate.manifesto}</span>
                                            </p>

                                        </div>





                                    </div>
                                </div>

                            </div>
                        }

                    </div>
                </motion.div>
                <ToastContainer />
            </div>
        </div>

    </div>
};

export default Candidate;
