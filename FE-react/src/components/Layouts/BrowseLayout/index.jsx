import React from 'react'
import Navbar from '@/pages/Browse/Navbar'
import Loading from '@mods/Elements/Loading'

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '@/utils/firebase'
import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";

const BrowseLayout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenAtom)


    if (loading) return <Loading />

    if (error) return <p>error...</p>

    if (!user && !emailStorage && !tokenStorage) return location.replace("/")

    return (
        <>
            <Navbar />
            <div>
                {children}
            </div>
        </>
    )
}

export default BrowseLayout