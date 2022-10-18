import React, { useEffect, useState } from "react";
import AdminNav from "../../components/AdminNav";
import Lines from "../../components/Lines";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { baseUrl, toastOptions } from "../../components/data";
import { useAuth } from "../../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const Index = () => {
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const position = e.target.position.value;
        const description = e.target.description.value;
        const requirement = e.target.requirement.value;
        const data = {
            title: position,
            description,
            requirement,
            admin: user._id,

        };

        axios
            .post(`${baseUrl}/jobs`, data)
            .then((res) => {
                toast.success("Position created successfully", toastOptions);
                setLoading(false);
                e.target.reset()
            })
            .catch((err) => {
                toast.error("Error creating position", toastOptions);
                setLoading(false);
            });

    }
    return <div className="bg-black w-screen min-h-screen  relative overflow-y-auto   overflow-x-hidden">


        <div className="flex">
            <div className="hidden md:flex">
                <Sidebar index={true} />
            </div>
            <div className="flex flex-col w-full">
                <AdminNav />

                <h1 className="text-2xl text-[rgba(255,100,255,.5)] font-semibold w-full flex justify-center underline mt-3">Add A New Electrol Position</h1>
                <form className="flex rounded p-4 flex-col items-center my-8 gap-4" onSubmit={handleSubmit}>
                    <div className="div flex flex-col w-full text-white items-center gap-2">
                        <label htmlFor="" className="opacity-60">Enter Position Title</label>
                        <input className=" p-4 outline-none min-w-[300px] bg-[rgba(255,255,255,.1)] border-b border-white" type="text" placeholder="title" name="position" />
                    </div>
                    <div className="div flex flex-col w-full text-white items-center gap-2">
                        <label htmlFor="" className="opacity-60">Enter position description</label>
                        <textarea className=" p-2 outline-none min-w-[300px] bg-[rgba(255,255,255,.1)] border-b border-white" type="text" placeholder="describe this position" name="description" />
                    </div>
                    <div className="div flex flex-col w-full text-white items-center gap-2">
                        <label htmlFor="" className="opacity-60">Candidate Requirement</label>
                        <textarea className=" p-2 outline-none min-w-[300px] bg-[rgba(255,255,255,.1)] border-b border-white" type="text" placeholder="minimum requirement to vie" name="requirement" />
                    </div>
                    <button className="text-white p-4 outline-none min-w-[300px] bg-[rgba(255,100,255,.4)] mt-3 hover:bg-white hover:text-black" type="submit">{loading ? 'loading' : 'Create Position'}</button>
                </form>


            </div>
        </div>

        <Lines />
        <ToastContainer {...toastOptions} />
    </div>;
};

export default Index;
