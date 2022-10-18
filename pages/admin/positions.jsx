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
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this position?")
        if (!confirm) {
            return;
        }
        try {
            const res = await axios.delete(`${baseUrl}/jobs?id=${id}`, { id })
            if (res.data.job) {
                toast.success("Position deleted successfully", toastOptions)
                setChange(!change)
            }
        } catch (error) {
            toast.error("Error deleting position", toastOptions)
        }
    }

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();


        const data = {
            ...values, id
        }
        axios.put(`${baseUrl}/jobs/`, data)
            .then((res) => {

                toast.success("Position updated successfully", toastOptions);
                setLoading(false);
                e.target.reset()
                setChange(!change)
                setOpen(false)
            }
            )
            .catch((err) => {
                toast.error("Error updating position", toastOptions);
            });
    }

    const handleSubmit1 = async (e) => {
        console.log(position)
        e.preventDefault();
        setLoading(true);
        const admin = user.name
        const { name, adm, email, password, file, manifesto, bio } = e.target.elements;
        const nameValue = name.value;
        const admValue = adm.value;
        const emailValue = email.value;

        const fileValue = file.files[0];
        const manifestoValue = manifesto.value
        const bioValue = manifesto.value

        setLoading(true);
        const data = { position: position, admin, positionId, name: nameValue, adm: admValue, email: emailValue, manifesto: manifestoValue, bio: bioValue, bio: bioValue }

        if (!fileValue) {
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
        else {
            let fileName = `${Math.floor(Math.random() * 1000)}-${fileValue.name}`;
            data.pic = fileName;
            const storageRef = ref(storage, `candidate/${fileName}`);

            await uploadBytesResumable(storageRef, fileValue).then(() => {
                getDownloadURL(storageRef).then(async (url) => {

                    data.avatar = url;
                    data.pic = fileName;
                    axios.post(`${baseUrl}/candidate`, data).then((res) => {

                        if (!res.data.name) {
                            setLoading(false)
                            toast.error("candidate is alredy registered, on this or another position", toastOptions)
                        }
                        else {
                            toast.success("candidate registered successfully", toastOptions)
                            setLoading(false)
                            e.target.reset();
                            setOpen2(false)
                        }

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




    return <div className="bg-black w-screen  h-screen   relative    overflow-x-hidden  ">


        <div className="flex">
            <div className="hidden md:flex">
                <Sidebar index={true} />
            </div>
            <div className="flex flex-col w-full">
                <AdminNav />

                <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold w-full flex justify-center underline mt-3">POSITIONS</h1>
                <div className="   p-4 flex flex-wrap gap-4 justify-center items-center  ">
                    {jobs.length ?
                        jobs.map((job, index) => {
                            return <div className="flex h-auto  w-full md:w-[300px] bg-[rgba(255,255,255,.8)]  flex-col p-4 relative gap-4" key={index}>
                                <h1 className="shadow-lg p-4 text-xl text-center  font-bold underline">{job.title} </h1>
                                <div className="shadow-lg p-4 ">
                                    <p>
                                        <span className="font-semibold">Description:</span> <span className="text-[#ab4bab80]">{job.description}</span>
                                    </p>
                                    <p>
                                        <span className="font-semibold">Requirements:</span> <span className="text-[#ab4bab80]">{job.requirement}</span>
                                    </p>

                                </div>

                                <div className="flex flex-wrap   justify-center mb-7">
                                    <button className="font-semibold shadow-lg p-4 w-[200px]"
                                        onClick={() => router.push(`/admin/candidate/${job._id}`)
                                        }
                                    >
                                        VIEW APPLICANTS
                                    </button>
                                    <button className="font-semibold shadow-lg p-4 w-[200px]" onClick={() => {
                                        setOpen2(true)
                                        setPositionId(job._id)
                                        setPosition(job.title)

                                    }}>
                                        ADD APPLICANTS
                                    </button>
                                    <button className="font-semibold shadow-lg p-4 w-[200px]"
                                        onClick={() => {

                                            handleDelete(job._id)
                                        }}
                                    >
                                        DELETE POSITION
                                    </button>
                                    <button className="font-semibold shadow-lg p-4 w-[200px]" onClick={() => {
                                        setOpen(true)

                                        setId(job._id)
                                    }}>
                                        EDIT POSITION
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
            className="fixed top-0 left-0  h-full w-full z-20  flex  items-center justify-center overflow-y-scroll pt-8">
            <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute top-4 right-4 cursor-pointer" onClick={() => {
                setOpen(false)
                setLoading(false)
            }} />
            <div className="flex flex-col gap-4 p-4 shadow-lg bg-white">
                <h1 className="text-2xl font-semibold text-center">Edit Position</h1>
                <form className="flex rounded p-4 flex-col items-center  gap-4" onSubmit={handleSubmit}>
                    <div className="div flex flex-col w-full text-[rgba(0,0,0,.8)] items-center gap-2">
                        <label htmlFor="" className="opacity-60">Enter Position Title</label>
                        <input className=" p-4 outline-none min-w-[300px] bg-[rgba(0,0,0,.1)] border-b border-black placeholder:text-left" type="text" placeholder="title" name="title" onChange={handleChanges} />
                    </div>
                    <div className="div flex flex-col w-full text-[rgba(0,0,0,.8)] items-center gap-2">
                        <label htmlFor="" className="opacity-60">Enter position description</label>
                        <textarea className=" p-2 outline-none min-w-[300px] bg-[rgba(0,0,0,.1)] border-b border-black placeholder:text-left" type="text" placeholder="describe this position" name="description" onChange={handleChanges} />
                    </div>
                    <div className="div flex flex-col w-full text-[rgba(0,0,0,.8)] items-center gap-2">
                        <label htmlFor="" className="opacity-60">Candidate Requirement</label>
                        <textarea className=" p-2 outline-none min-w-[300px] bg-[rgba(0,0,0,.1)] border-b border-black placeholder:text-left" type="text" placeholder="minimum requirement to vie" name="requirement" onChange={handleChanges} />
                    </div>
                    <button className="text-white p-4 outline-none min-w-[300px] bg-[rgba(255,100,255,.9)] mt-3 hover:bg-white hover:border-black hover:border-[1px] hover:text-black " type="submit">{loading ? 'loading...' : 'Edit Job'}</button>
                </form>

            </div>
        </motion.div>
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

                <h1 className="text-2xl font-semibold text-center">Edit Candidate</h1>
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



                    <button className="text-white p-4   bg-[rgba(255,100,255,.8)]  hover:bg-white hover:text-black self-center  w-full    md:ml-20" type="submit">{loading ? 'loading...' : 'Add Candidate'}</button>


                </form>

            </div>
        </motion.div>
        <Lines />
        <ToastContainer />
    </div>;
};

export default Index;
