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
    useEffect(() => {
        axios.get(`${baseUrl}/candidate/?id=${id}`).then((res) => {
            setCandidates(res.data);
            setLoading1(false);
        }).catch((err) => {
            console.log(err);
            setLoading1(false);

        })

    }, [id, change]);



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

                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default Candidate;
