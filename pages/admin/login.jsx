import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toastOptions } from "../../components/data";
import { toast, ToastContainer } from "react-toastify"
import { baseUrl } from "../../components/data";
import axios from "axios"
const Login = () => {
    const router = useRouter()
    const [err, setErr] = React.useState("")
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const { email, password } = e.target.elements;

        const emailValue = email.value;
        const passwordValue = password.value;


        axios.get(`${baseUrl}/admin?email=${emailValue}`).then(async (res) => {
            if (!res.data) {
                return toast.error('You are not an admin dummy')
            }
            try {
                const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
                router.push("/admin")
                setLoading(false)
            } catch (error) {
                const errorCode = error.code;
                setErr(error.message)
                const errorMessage = error.message;
                setLoading(false)
            }

        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })



    }


    const variants = {
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: .2,
                delayChildren: .2,
            },

        },

        initial: {
            opacity: 0

        }

    }
    useEffect(() => {

        if (err) {
            toast.error(err, toastOptions)
        }
        setTimeout(() => {
            setErr("")
            setLoading(false)
        }, 3000)
    }, [err])

    return <div className="w-screen h-screen overflow-hidden bg-[rgb(40,35,51)] -md md:p-8 ">
        <div className="w-full flex-col  h-full bg-[rgba(230,230,230,.2)] md:bg-[rgb(46,41,56)] rounded p-4 overflow-y-auto md:p-8 flex items-center justify-center">
            <div className="border-[1px] border-[rgba(255, 100, 255)] shadow-4xl  text-white">
                <h1 className="text-center text-white text-3xl font-semibold ">ADMIN LOGIN</h1>
                <form action="" className=" max-h-[500px] max-w-[400px] flex flex-col gap-4 px-8 py-8  placeholder-[fuchsia] " onSubmit={handleSubmit}>
                    <input className=" p-4 outline-none min-w-[200px] bg-[rgba(255,255,255,.1)] rounded-md " type="email" placeholder="email" name="email" />
                    <input className=" p-4 outline-none min-w-[200px] bg-[rgba(255,255,255,.1)] rounded-md" type="password" placeholder="password" name="password" />
                    <button className="text-white p-4 outline-none min-w-[300px] bg-[rgba(255,255,255,.1)] rounded-md hover:bg-white hover:text-black" type="submit">{loading ? 'Loading...' : 'Login'}</button>
                    <p className="text-white"> Dont have account Account? <span className="text-[fuchsia] ml-3 cursor-pointer" onClick={() => router.push('/admin/register')}>Register</span></p>
                </form>

            </div>
        </div>
        <ToastContainer />

    </div>;
};

export default Login;
