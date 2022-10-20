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
import { useAuth } from "../../../context/AuthProvider";

const Candidate = () => {
    const router = useRouter();
    const { user } = useAuth()

    const [candidate, setCandidates] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [values, setValues] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [desc, setDesc] = useState(false);
    const [change, setChange] = useState(false);


    const { id } = router.query;

    useEffect(() => {
        axios.get(`${baseUrl}/apply?_id=${id}`).then((res) => {
            setCandidates(res.data);
            setLoading1(false);
        }).catch((err) => {
            console.log(err);
            setLoading1(false);

        })



    }, [id]);

    const handleAccept = () => {
        const data = {
            name: candidate.name, email: candidate.email, adm: candidate.adm,
            admin: user._id, pic: candidate.pic, avatar: candidate.avatar, position: candidate.position, positionId: candidate.positionId,
            bio: candidate.bio, manifesto: candidate.manifesto
        }
        axios.post(`${baseUrl}/candidate`, data).then((res) => {

            if (!res.data.name) {
                setLoading(false)
                toast.error("candidate is alredy registered, on this or another position", toastOptions)

            } else {
                toast.success("candidate registered successfully", toastOptions)
                setLoading(false)
                e.target.reset();
            }

        }).catch((err) => {

            toast.error("Something went wrong", toastOptions)
            setLoading(false)

        }
        )
    }

    const handleDelete = async (candidateId, pic) => {


        await axios.delete(`${baseUrl}/candidate?id=${candidateId}`).then(async (res) => {
            toast.success("Candidate deleted successfully", toastOptions);
            const storageRef = ref(storage, `candidate/${pic}`);

            await deleteObject(storageRef).then(() => {
                toast.success("Candidate deleted successfully", toastOptions);
                setLoading(false);
                setOpen(false);
                setChange(!change);
            }).catch((err) => {
                toast.error("Something went wrong", toastOptions);
                setLoading(false);
                setOpen(false);
            })
        }).catch((err) => {
            toast.error("Something went wrong", toastOptions);
            setLoading(false);
            setOpen(false);
        })

    }
    useEffect(() => {
        axios.get(`${baseUrl}/apply?_id=${id}`).then((res) => {

            setPosition(res.data)
        }).catch((err) => {


        })

    }, [id]);
    return <div className="bg-black w-screen   relative md:overflow-y-hidden md:h-[100vh]   overflow-x-hidden  ">


        <div className="flex h-full ">
            <div className="hidden md:flex">
                <Sidebar index={true} />
            </div>
            <div className="flex flex-col w-full">
                <AdminNav candidate="/admin/notifications" />


                <div className="mt-20 md:mt-3 overflow-y-auto ">
                    <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold w-full flex justify-center underline "> Job Application</h1>

                    <div className="   p-4 flex flex-wrap gap-4 justify-center items-center">
                        {candidate ?

                            <div className="flex   w-full  bg-[rgba(255,255,255,.8)]  flex-col p-4 relative gap-4 max-w-[500px] md:w-[400px]" >
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


                                                }}>
                                                    CLICK TO VIEW
                                                </button>
                                            </p>

                                            <p>
                                                <span className="font-semibold">Job Applying for:</span> <span className="text-[fuchsia]">{candidate.position}</span>
                                            </p>

                                        </div>


                                        <div className="flex flex-wrap   justify-center mb-7">

                                            <button className="font-semibold shadow-lg p-4 w-[200px]" onClick={() => {

                                                handleAccept();

                                            }}>
                                                {!loading ? 'ACCEPT' : 'WAIT....'}
                                            </button>
                                            <button className="font-semibold shadow-lg p-4 w-[200px]" onClick={() => {

                                                handleAccept();

                                            }}>
                                                MARK AS READ
                                            </button>
                                            <button className="font-semibold shadow-lg p-4 w-[200px]"
                                                onClick={() => {

                                                    handleDelete(candidate._id, candidate.pic)
                                                }}
                                            >
                                                DELETE NOTIFICATION
                                            </button>

                                        </div>



                                    </div>
                                </div>

                            </div>
                            : loading1 ?

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
                                                <span className="font-semibold">Position :</span><span>
                                                    {candidate.position}
                                                </span>
                                            </p>
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
