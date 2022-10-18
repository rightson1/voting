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
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "../../firebase";
const Index = () => {
    const { user, admin } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [open1, setOpen1] = useState(false);
    const [pic, setPic] = useState("")
    const [other, setOther] = useState([])


    const [users, setUsers] = useState([]);

    const router = useRouter();

    useEffect(() => {
        axios.get(`${baseUrl}/admin`).then((res) => {
            setUsers(res.data)
        }).catch((err) => {
            console.log(err)
        }
        )

    }, [])

    useEffect(() => {
        setOther(users.filter((item) => item._id !== user._id))
    }, [users])
    console.log(other)
    const del = async () => {
        const confirm = window.confirm("Are you sure you want to delete your account?")
        if (!confirm) {
            return;
        }

        if (!(users.length >= 2)) {
            toast.error("You are the only admin , you cannot delete account", toastOptions)
            return;
        }

        axios.delete(`${baseUrl}/admin?id=${user._id}`).then((res) => {


            toast.success("User deleted successfully", toastOptions)
            deleteUser(auth.currentUser).then(() => {


            }).catch((error) => {


                axios.post(`${baseUrl}/admin`, user).then((res) => {
                    toast.success("Admin created successfully", toastOptions)
                    setLoading(false)
                    router.push("/admin/login")

                })
            });

        }).catch((err) => {
            toast.error("Something went wrong", toastOptions)
        })


    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, name, adm, file } = e.target.elements;


        const emailValue = email.value;
        const passwordValue = password.value;
        const nameValue = name.value;
        const admValue = adm.value;
        const fileValue = file.files[0];


        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);

            let fileName = `${Math.floor(Math.random() * 1000)}-${fileValue.name}`;
            const storageRef = ref(storage, `admin/${fileName}`);
            setPic(fileName)
            await uploadBytesResumable(storageRef, fileValue).then(() => {
                getDownloadURL(storageRef).then(async (url) => {


                    const data = { email: emailValue, password: passwordValue, name: nameValue, adm: admValue, pic: fileName, avatar: url }

                    await axios.post(`${baseUrl}/admin`, data).then((res) => {
                        toast.success("Admin created successfully", toastOptions)
                        setLoading(false)
                        router.push("/admin/login")

                    }).catch((err) => {
                        toast.error("Something went wrong", toastOptions)

                        setLoading(false)
                        setErr("Something went wrong")
                    })

                });
            });


        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
            setErr(errorMessage)
            console.log(errorCode, errorMessage);

        }

    }

    return <div className="bg-black w-screen   relative md:overflow-y-hidden md:h-[100vh]   overflow-x-hidden  ">


        <div className="flex h-full ">
            <div className="hidden md:flex">
                <Sidebar index={true} />
            </div>
            <div className="flex flex-col w-full">
                <AdminNav />


                <div className="mt-20 md:mt-3 overflow-y-auto ">
                    <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold w-full flex justify-center underline ">ADMIN SECTION</h1>
                    <div className="   p-4 flex flex-wrap gap-4 justify-center items-center">
                        <div className="flex   w-full  bg-[rgba(255,255,255,.8)]  flex-col p-4 relative gap-4 max-w-[500px] md:w-[400px] " >
                            <h1 className="shadow-lg p-4 text-xl text-center  font-bold underline">{user?.name} </h1>
                            <div className="flex flex-col items-center md:flex--row md:it-ems-start  gap-4">
                                <div className="shadow-lg  overflow-hidden  h-[100px] w-[100px]  rounded-full min-w-[70px] min-h-[70px]">
                                    <img src={user?.avatar} alt="" className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <div className="shadow-lg p-4 overflow-y-auto overflow-x-hidden relative">
                                        <p className="flex gap-8 items-center">
                                            <span className="font-semibold">Adm:</span><span className="text-[fuchsia]">{user?.adm}</span>
                                        </p>

                                        <p>
                                            <span className="font-semibold">Email:</span> <span className="text-[fuchsia]">{user?.email}</span>
                                        </p>

                                    </div>


                                    <div className="flex flex-wrap   justify-center mb-7">

                                        <button className="font-semibold shadow-lg p-4 w-[200px]" onClick={() => {
                                            setOpen(true)

                                        }}>
                                            ADD ADMIN
                                        </button>
                                        <button className="font-semibold shadow-lg p-4 w-[200px]"
                                            onClick={() => {
                                                del()

                                            }}
                                        >
                                            DELETE YOUR ACCOUNT
                                        </button>

                                    </div>

                                    <button className="absolute -bottom-1 left-[50%] translate-x-[-50%] text-[14px] shadow-4xl
                                      p-2 bg-white rounded-[20px]"
                                        onClick={() => setOpen1(true)
                                        }
                                    >
                                        OTHER ADMINS
                                    </button>

                                </div>
                            </div>

                        </div>


                    </div>


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
            className="fixed overflow-auto items-start top-0 left-0  h-full px-4 py-  w-full z-20  flex  justify-center pt-8">
            <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  ">
                <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-4 -right-3 cursor-pointer" onClick={() => {
                    setOpen(false)

                }} />

                <h1 className="text-center text-black text-xl ">LOGIN</h1>
                <form action="" className=" max-h-[500px] max-w-[400px] flex flex-col gap-4 px-8 py-8  placeholder-[fuchsia] " onSubmit={handleSubmit}>
                    <input className=" p-4 outline-none min-w-[300px] bg-[rgba(0,0,0,.2)] border-b-[1px] border-black  placeholder-black " type="text" placeholder="name" name="name" />
                    <input className=" p-4 outline-none min-w-[300px] bg-[rgba(0,0,0,.2)] border-b-[1px] border-black  placeholder-black" type="email" placeholder="email" name="email" />
                    <input className=" p-4 outline-none min-w-[300px] bg-[rgba(0,0,0,.2)] border-b-[1px] border-black  placeholder-black text-white" type="text" placeholder="admission number" name="adm" />
                    <input className=" p-4 outline-none min-w-[300px] bg-[rgba(0,0,0,.2)] border-b-[1px] border-black  placeholder-black" type="password" placeholder="password" name="password" />
                    <input className=" hidden" type="file" placeholder="file" id="file" name="file" />
                    <label htmlFor="file" className=" p-4 outline-none min-w-[300px] bg-[rgba(0,0,0,.2)] border-b-[1px] border-black  placeholder-black text-white flex gap-5">
                        <AiFillPicture className="text-white text-2xl" />
                        <span className="opacity-70 ">    Add Avatar</span>

                    </label>
                    <button className="text-white p-4 outline-none min-w-[300px] bg-[rgba(255,0,255,.9)] border-b-[1px] border-black  placeholder-black hover:bg-white hover:text-black" type="submit">{loading ? 'Loading....' : 'Register'}</button>

                </form>

            </div>
        </motion.div>
        <motion.div
            initial={{ x: '-200%' }}
            animate={
                {
                    x: open1 ? 0 : '-200%',
                    transition: {
                        duration: 0.5


                    },
                }
            }
            className="fixed overflow-auto items-start top-0 left-0  h-full px-4 py-  w-full z-20  flex  justify-center pt-8">
            <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  ">
                <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-4 -right-3 cursor-pointer" onClick={() => {
                    setOpen1(false)

                }} />

                <h1 className="text-center text-black text-xl  min-w-[300px]">ADMINS</h1>
                {other.length ?
                    other.map((user, index) => (
                        <div className="flex   w-full  bg-[rgba(255,255,255,.8)]  flex-col p-4 relative gap-4 max-w-[500px] md:w-[400px]" key={index}>
                            <h1 className="shadow-lg p-4 text-xl text-center  font-bold underline">{user?.name} </h1>
                            <div className="flex flex-col items-center md:flex--row md:it-ems-start  gap-4">
                                <div className="shadow-lg  overflow-hidden  h-[100px] w-[100px]  rounded-full min-w-[70px] min-h-[70px]">
                                    <img src={user?.avatar} alt="" className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <div className="shadow-lg p-4 overflow-y-auto overflow-x-hidden relative">
                                        <p className="flex gap-8 items-center">
                                            <span className="font-semibold">Adm:</span><span className="text-[fuchsia]">{user?.adm}</span>
                                        </p>

                                        <p>
                                            <span className="font-semibold">Email:</span> <span className="text-[fuchsia]">{user?.email}</span>
                                        </p>

                                    </div>






                                </div>
                            </div>

                        </div>


                    )) :
                    <div className="w-full flex justify-center">
                        <h1 className="text-red-900">
                            No Other Admins
                        </h1>
                    </div>
                }
            </div>
        </motion.div>
        <Lines />
        <ToastContainer />
    </div>;
};

export default Index;
