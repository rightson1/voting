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
    const [values, setValues] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [candidateId, setCandidateId] = useState(null);
    const [desc, setDesc] = useState(false);
    const [change, setChange] = useState(false);
    const [candidate, setCandidate] = useState(null);
    const [file, setFile] = useState(null)
    const [pic, setPic] = useState(null)
    const { id } = router.query;
    const [position, setPosition] = useState()
    useEffect(() => {
        axios.get(`${baseUrl}/candidate/?id=${id}`).then((res) => {
            setCandidates(res.data);
            setLoading1(false);
        }).catch((err) => {
            console.log(err);
            setLoading1(false);

        })


    }, [id, change]);
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

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (!file) {

            axios.put(`${baseUrl}/candidate?id=${candidateId}`, values).then((res) => {
                setLoading(false)
                setChange(!change)
                toast.success("Candidate updated successfully", toastOptions);
                setOpen(false)
                e.target.reset()
                toast.success("Candidate Updated", toastOptions);
            }).catch((err) => {
                setLoading(false)
                toast.error(err.response.data.error, toastOptions);
            })

        }
        else {
            let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
            const fileRef = ref(storage, `/candidate/${name}`);
            uploadBytes(fileRef, file).then((res) => {

                deleteObject(ref(storage, `candidate/${pic}`)).then((res) => {
                    console.log('deleted')

                }).catch((err) => {

                    console.log(err);
                });
                getDownloadURL(res.ref).then((url) => {

                    const data = { ...values, avatar: url, pic: name }
                    axios.put(`${baseUrl}/candidate?id=${candidateId}`, data).then((res) => {
                        setLoading(false)
                        setChange(!change)
                        toast.success("Candidate updated successfully", toastOptions);
                        setOpen(false)
                        e.target.reset()
                        toast.success("Candidate Updated", toastOptions);
                    }).catch((err) => {
                        setLoading(false)
                        toast.error(err.response.data.error, toastOptions);
                    })

                })

            }).catch((err) => {
                setLoading(false)
                console.log(err);
            });
        }



    }
    useEffect(() => {
        axios.get(`${baseUrl}/jobs/?id=${id}`).then((res) => {

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
                <AdminNav candidate="/admin/positions" />


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

                                                <button className="font-semibold shadow-lg p-4 w-[200px]" onClick={() => {
                                                    setOpen(true)
                                                    setCandidateId(candidate._id)
                                                    setPic(candidate.pic)


                                                }}>
                                                    EDIT CANDIDATE
                                                </button>
                                                <button className="font-semibold shadow-lg p-4 w-[200px]"
                                                    onClick={() => {

                                                        handleDelete(candidate._id, candidate.pic)
                                                    }}
                                                >
                                                    DELETE CANDIDATE
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
                    className="fixed items-start top-0 left-0  h-full px-4 py-  w-full z-20  flex  justify-center pt-8 overflow-y-auto">
                    <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  ">
                        <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-4 -right-3 cursor-pointer" onClick={() => {
                            setOpen(false)

                        }} />

                        <h1 className="text-2xl font-semibold text-center">Edit Candidate</h1>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2  gap-4 p-4 text-white">
                            <input className=" p-4 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black" type="text" placeholder="name" name="name" onChange={handleChanges} />
                            <input className=" p-4 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black" type="email" placeholder="email" name="email" onChange={handleChanges} />
                            <input className=" p-4 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black" type="text" placeholder="admission number" name="adm" onChange={handleChanges} />
                            <input className=" p-4 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black hidden" id="file" type="file" placeholder="admission number" name="file" onChange={(e) => setFile(e.target.files[0])} />
                            <label htmlFor="file" className=" p-4 outline-none gap-4 w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black flex text-[rgba(0,0,0,.8)] cursor-pointer">
                                <span>Choose Profile</span>
                                <AiFillPicture className="ml-2 text-2xl" />
                            </label>
                            <textarea className=" p-2 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black" type="text" placeholder="candidate bio(optional)" name="bio" onChange={handleChanges} />

                            <textarea className=" p-2 outline-none w-full bg-[rgba(0,0,0,.1)] placeholder-black text-black border-b border-black" type="text" placeholder="candidate manifesto(optional)" name="manifesto" onChange={handleChanges} />



                            <button className="text-white p-4  w-full bg-[rgba(255,100,255,.8)]  hover:bg-white hover:text-black self-center  w-full    md:ml-20" type="submit">{loading ? 'loading...' : 'Add Candidate'}</button>


                        </form>

                    </div>
                </motion.div>
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
