import React, { useState } from 'react'

import { JUMBOTRON_IMAGE } from '@/constants/listAsset'
import { GoChevronLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { emailAtom, emailStorageAtom, tokenAtom } from '@/jotai/atoms'
import { useAtom } from 'jotai'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { toast } from 'react-toastify'
import DefaultLayout from '@/components/Layouts/DefaultLayout'

const Register = () => {
    const navigate = useNavigate()

    const [, setToken] = useAtom(tokenAtom)
    const [, setEmailStorage] = useAtom(emailStorageAtom
    )
    const [email, setEmail] = useAtom(emailAtom)
    const [password, setPassword] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const login = await signInWithEmailAndPassword(auth, email, password)
            if (login) {
                const firebaseToken = await getIdToken(login.user)
                setToken(firebaseToken)
                setEmailStorage(login.user.email)
                navigate("/browse")
            }
        } catch (error) {
            toast(error.message)
        }
    }

    return (
        <DefaultLayout>
            <img
                src={JUMBOTRON_IMAGE}
                className='w-full h-[100vh] object-cover opacity-70'
            />
            <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/80 px-8 py-16 rounded-xl max-w-xl w-full'>
                <form className='flex flex-col gap-4'>
                    <div className='text-white text-xl font-semibold mb-2 flex items-center gap-2'>
                        <GoChevronLeft
                            size={28}
                            className='text-slate-200 hover:text-white cursor-pointer'
                            onClick={() => navigate("/")}
                        />
                        <h3>Sign In</h3>
                    </div>
                    <div className='relative'>
                        <input
                            placeholder="Email"
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent'
                        />
                        <label
                            className='absolute top-0 left-0 pl-4 peer-placeholder-shown:top-3.5 peer-focus:-top-[4px] transition-all text-lg -z-10'
                        >Email</label>
                    </div>
                    <div className='relative'>
                        <input
                            placeholder="Password"
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent'
                        />
                        <label
                            className='absolute top-0 left-0 pl-4 peer-placeholder-shown:top-3.5 peer-focus:-top-[4px] transition-all text-lg -z-10'
                        >Password</label>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <button
                            onClick={handleLogin}
                            className='bg-red-500 py-3 w-full text-white font-bold rounded-md'
                        >
                            Sign In
                        </button>
                        <p>Not having an account?
                            <span
                                onClick={() => navigate("/register")}
                                className='text-blue-500 underline cursor-pointer ml-2'
                            >
                                Sign up here
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    )
}

export default Register