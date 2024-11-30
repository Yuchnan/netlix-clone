import React from "react";
import Navbar from "@/pages/Landing/Navbar";
import Loading from "@mods/Elements/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";

const DefaultLayout = ({children}) => {
    const [loading, error, user] = useAuthState(auth)

    if (loading) return <Loading />

    if (error) return <p>error...</p>

    if (user) return location.replace("/browse")

    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}

export default DefaultLayout