import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthProvider";

const Protected = ({ children }) => {
    const { admin } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!admin) {
            router.push('/')
            return;
        }
    }, [admin, router.push])

    return <>
        {admin ? children : null}
    </>
};

export default Protected;
