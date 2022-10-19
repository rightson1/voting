import React, { useEffect } from "react";
import { AiFillPicture } from "react-icons/ai"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { baseUrl } from "../../components/data"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { storage } from "../../firebase";
import { toastOptions } from "../../components/data";
import { toast, ToastContainer } from "react-toastify"
const Register = () => {
    const [err, setErr] = React.useState("")

    const [loading, setLoading] = React.useState(false);

    const router = useRouter()
    const [pic, setPic] = React.useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, name, adm, file } = e.target.elements;


        const emailValue = email.value;
        const passwordValue = password.value;
        const nameValue = name.value;
        const admValue = adm.value;
        const fileValue = file.files[0];


        setLoading(true);


        axios.get(`${baseUrl}/voter?email=${admValue}`).then(async (res) => {


            if (!res.data) {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);

                    let fileName = `${Math.floor(Math.random() * 1000)}-${fileValue.name}`;
                    const storageRef = ref(storage, `voter/${fileName}`);

                    await uploadBytesResumable(storageRef, fileValue).then(() => {
                        getDownloadURL(storageRef).then(async (url) => {


                            const data = { email: emailValue, password: passwordValue, name: nameValue, adm: admValue, pic: fileName, avatar: url }

                            await axios.post(`${baseUrl}/voter`, data).then((res) => {
                                router.push("/voter/login")

                                setLoading(false)
                            }).catch((err) => {

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
            else {
                setErr('You already have an account')
                return
            }

        }).catch((err) => {
            setErr('Something went wrong')
        })



    }

    useEffect(() => {

        if (err) {
            toast.error(err, toastOptions)
        }
        setTimeout(() => {
            setErr("")
        }, 3000)
    }, [err])

    return <div className="w-screen h-screen overflow-hidden bg-[rgb(40,35,51)] -md md:p-8 ">

        <div className="w-full flex-col  h-full bg-[rgba(230,230,230,.2)] md:bg-[rgb(46,41,56)] rounded p-4 overflow-y-auto md:p-8 flex items-center justify-center">
            <h1 className="text-white text-xl fonr-bold">VOTER REGISTRATION FORM</h1>
            <form action="" className=" max-h-[500px] max-w-[400px] flex flex-col gap-4 px-8 py-8  placeholder-[fuchsia] " onSubmit={handleSubmit}>
                <input className=" p-4 outline-none min-w-[300px] bg-[rgba(255,255,255,.1)] rounded-md " type="text" required placeholder="name" name="name" />
                <input className=" p-4 outline-none min-w-[300px] bg-[rgba(255,255,255,.1)] rounded-md" type="email" required placeholder="email" name="email" />
                <input className=" p-4 outline-none min-w-[300px] bg-[rgba(255,255,255,.1)] rounded-md text-white" type="text" required placeholder="admission number" name="adm" />
                <input className=" p-4 outline-none min-w-[300px] bg-[rgba(255,255,255,.1)] rounded-md" type="password" required placeholder="password" name="password" />
                <input className=" hidden" type="file" required placeholder="file" id="file" name="file" />
                <label htmlFor="file" className=" p-4 outline-none min-w-[300px] bg-[rgba(255,255,255,.1)] rounded-md text-white flex gap-5">
                    <AiFillPicture className="text-white text-2xl" />
                    <span className="opacity-70 ">    Add Avatar</span>

                </label>
                <button className="text-white p-4 outline-none min-w-[300px] bg-[rgba(255,255,255,.1)] rounded-md hover:bg-white hover:text-black" type="submit">{loading ? 'Loading....' : 'Register'}</button>

                <p className="text-white"> Already have an Account? <span className="text-[fuchsia] ml-3 cursor-pointer" onClick={() => router.push('/voter/login')}>Login</span></p>
            </form>
        </div>
        <ToastContainer />

    </div>;
};

export default Register;
