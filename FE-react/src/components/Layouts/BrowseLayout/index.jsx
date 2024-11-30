import React from 'react'
import Navbar from '@/pages/Browse/Navbar'
import Loading from '@mods/Elements/Loading'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '@/utils/firebase'

const BrowseLayout = ({children}) => {
    const [user, loading, error] = useAuthState(auth)

    if (loading) return <Loading />

    if (error) return <p>error...</p>

    if (!user) return location.replace("/")

    return (
        <>
            <Navbar/>
            <div>
                {children}
            </div>
        </>
    )
}

export default BrowseLayout