import React, { useEffect, useState } from "react";
import VoterNav from "../../components/VoterNav";
import Lines from "../../components/Lines";
import VoterSide from "../../components/VoterSide";
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

    const [jobs, setJobs] = useState([]);
    const [id, setId] = useState("");
    const [change, setChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [positionId, setPositionId] = useState("");
    const [pic, setPic] = React.useState(null)
    const [position, setPosition] = useState("");
    const [jobLoading, setJobLoading] = useState(true);

    const [values, setValues] = useState();
    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit1 = async (e) => {

        e.preventDefault();
        setLoading(true);

        const { name, adm, email, password, file, manifesto, bio } = e.target.elements;
        const nameValue = name.value;
        const admValue = adm.value;
        const emailValue = email.value;

        const fileValue = file.files[0];
        const manifestoValue = manifesto.value
        const bioValue = manifesto.value

        setLoading(true);
        const data = { position: position, positionId, name: nameValue, adm: admValue, email: emailValue, manifesto: manifestoValue, bio: bioValue, bio: bioValue }

        if (!fileValue) {
            axios.post(`${baseUrl}/apply`, data).then((res) => {


                toast.success("application sent successfully", toastOptions)
                setLoading(false)
                e.target.reset();


            }).catch((err) => {
                toast.error("Something went wrong", toastOptions)
                setLoading(false)

            }
            )
        }
        else {
            let fileName = `${Math.floor(Math.random() * 1000)}-${fileValue.name}`;
            data.pic = fileName;
            const storageRef = ref(storage, `candidate/${fileName}`);

            await uploadBytesResumable(storageRef, fileValue).then(() => {
                getDownloadURL(storageRef).then(async (url) => {

                    data.avatar = url;
                    data.pic = fileName;
                    axios.post(`${baseUrl}/apply`, data).then((res) => {



                        toast.success("application successfully", toastOptions)
                        setLoading(false)
                        e.target.reset();
                        setOpen2(false)


                    }).catch((err) => {
                        toast.error("Something went wrong", toastOptions)
                        setLoading(false)

                    }
                    )

                });
            }).catch((err) => {
                toast.error("Something went wrong", toastOptions)
                setLoading(false)
            })
        }

    }
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
    }, [change])




    return <div className="bg-black w-screen   relative md:overflow-y-hidden md:h-[100vh]   overflow-x-hidden  ">


        <div className="flex h-full ">
            <div className="hidden md:flex">
                <VoterSide index={true} />
            </div>
            <div className="flex flex-col w-full">
                <VoterNav />


                <div className="mt-20 md:mt-3 overflow-y-auto ">
                    <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold w-full flex justify-center underline ">POSITIONS</h1>
                    <div className="   p-4 flex flex-wrap gap-4 justify-center items-center">
                        {jobs.length ?
                            jobs.map((job, index) => {
                                return <div className="flex h-auto  md:h-[450px]  w-full md:w-[300px] bg-[rgba(255,255,255,.8)]  flex-col p-4 relative gap-4" key={index}>
                                    <h1 className="shadow-lg p-4 text-xl text-center  font-bold underline">{job.title} </h1>
                                    <div className="shadow-lg p-4 ">
                                        <p>
                                            <span className="font-semibold">Description:</span> <span className="text-[#ab4bab80]">{job.description}</span>
                                        </p>
                                        <p>
                                            <span className="font-semibold">Requirements:</span> <span className="text-[#ab4bab80]">{job.requirement}</span>
                                        </p>

                                    </div>

                                    <div className="flex flex-wrap   justify-center mb-7 overflow-y-auto">
                                        <button className="font-semibold shadow-lg p-4 w-[200px]"
                                            onClick={() => router.push(`/voter/candidate/${job._id}`)
                                            }
                                        >
                                            VIEW CANDIDATES
                                        </button>
                                        <button className="font-semibold shadow-lg p-4 w-[200px]" onClick={() => {
                                            setOpen2(true)
                                            setPositionId(job._id)
                                            setPosition(job.title)

                                        }}>
                                            APPLY FOR POSITION
                                        </button>


                                    </div>



                                    <div className="absolute -bottom-4 translate-x-[-50%] opacity-90 text-white  left-[50%] bg-[fuchsia] p-4 rounded-full ">
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

        <motion.div
            initial={{ x: '-200%' }}
            animate={
                {
                    x: open2 ? 0 : '-200%',
                    transition: {
                        duration: 0.5


                    },
                }
            }
            className="fixed overflow-auto items-start top-0 left-0  h-full px-4 py-  w-full z-20  flex  justify-center pt-8">
            <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  ">
                <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-4 -right-3 cursor-pointer" onClick={() => {
                    setOpen2(false)
                    setLoading(false)
                }} />

                <h1 className="text-2xl font-semibold text-center">APPLY</h1>
                <form onSubmit={handleSubmit1} className="grid grid-cols-1 md:grid-cols-2  gap-4 p-4 text-white">
                    <input className=" p-4 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black" type="text" placeholder="name" name="name" required />
                    <input className=" p-4 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black" type="email" placeholder="email" name="email" required />
                    <input className=" p-4 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black" type="text" required placeholder="admission number" name="adm" />
                    <input className=" p-4 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black hidden" id="file" type="file" placeholder="admission number" name="file" />
                    <label htmlFor="file" className=" p-4 outline-none gap-4 w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black flex text-[rgba(0,0,0,.8)] cursor-pointer">
                        <span>Choose Profile</span>
                        <AiFillPicture className="ml-2 text-2xl" />
                    </label>
                    <textarea className=" p-2 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black" type="text" placeholder="candidate bio(optional)" name="bio" />

                    <textarea className=" p-2 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black" type="text" placeholder="candidate manifesto(optional)" name="manifesto" />



                    <button className="text-white p-4   bg-[rgba(255,100,255,.8)]  hover:bg-white hover:text-black self-center  w-full    md:ml-20" type="submit">{loading ? 'loading...' : 'Apply for Position'}</button>


                </form>

            </div>
        </motion.div>
        <Lines />
        <ToastContainer />
    </div>;
};

export default Index;
