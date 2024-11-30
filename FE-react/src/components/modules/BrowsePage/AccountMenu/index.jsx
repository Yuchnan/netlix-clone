import React from 'react'

import { auth } from '@/utils/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { emailStorageAtom, tokenAtom } from '@/jotai/atoms'

const AccountMenu = () => {
    const navigate = useNavigate()
    const [, setIsToken] = useAtom(tokenAtom)
    const [, setEmailStorage] = useAtom(emailStorageAtom)

    return (
        <div className='
        flex dropdown dropdown-hover dropdown-end'>
            <div className="avatar" tabIndex={0}>
                <div className="w-10 rounded">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <button 
                onClick={() => {
                    signOut(auth).then(() => {
                        setIsToken(null)
                        setEmailStorage(null)
                        navigate("/")
                    })
                }}
                tabIndex={0} 
                className='dropdown-content top-10 w-32 bg-black py-1'
            >
                Sign Out
            </button>
        </div>
    )
}

export default AccountMenu