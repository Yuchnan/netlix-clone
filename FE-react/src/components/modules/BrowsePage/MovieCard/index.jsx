import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Skeleton from './Skeleton'

import { GoPlay, GoPlus, GoChevronDown, GoTrash } from 'react-icons/go'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { emailStorageAtom, idMovieAtom, isFavoritedAtom, isFetchingAtom, isOpenModalAtom, tokenAtom } from '@/jotai/atoms'
import { getVideoUrl } from '@/utils/getVideoUrl'
import { useNavigate } from 'react-router-dom'
import { apiInstanceExpress } from '@/utils/apiInstance'
import { toast } from 'react-toastify'
import { checkFavoriteMovies } from '@/utils/checkFavoriteMovies'

const MovieCard = ({ data, isHover, setIsHover }) => {
    const navigate = useNavigate()

    const [, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [idMovie, setIdMovie] = useAtom(idMovieAtom)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenAtom)
    const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom)

    const [videoUrl, setVideoUrl] = useState(null)
    const [isFetching] = useAtom(isFetchingAtom)

    if (isFetching) return <Skeleton />

    const handleAddFavMovie = async () => {
        if (!emailStorage && tokenStorage) return
        try {
            const addFavMovie = await apiInstanceExpress.post('my-movies', {
                email: emailStorage,
                token: tokenStorage,
                data: data
            })
            if (addFavMovie.status === 201) {
                toast(`Berhasil menambahkan ${data.title} ke favorite`)
                setIsFavorited(true)
            } else {
                toast(`Gagal menambahkan ${data.title} ke favorite`)
            }
        } catch (error) {
            console.log(error)
            toast(`Sorry,${error.message}`)
        }
    }

    const handleRemoveFavMovie = async () => {
        if (!emailStorage && !tokenStorage) return;
        try {
            const removeMovie = await apiInstanceExpress.delete('my-movies', {
                data: {
                    email: emailStorage,
                    token: tokenStorage,
                    movieID: data.id
                }
            })
            if (removeMovie.status === 204) {
                toast(`Berhasil menghapus ${data.title} dari favorite`)
            } else {
                toast(`Gagal menghapus ${data.title} dari favorite`)
            }
            setIsFavorited(false)
        } catch (error) {
            console.log(error)
            toast(`Sorry, ${error.message}`)
        }
    }

    return (
        <>
            {isHover && idMovie == data.id ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0, ease: "easeInOut" }}
                    className='relative shadow-md transition-all w-full'
                >
                    <ReactPlayer
                        url={`https://youtube.com/watch?v=${videoUrl}`}
                        playing={true}
                        loop={true}
                        muted={true}
                        width={"100%"}
                        height={"180px"}
                        controls={false}
                    />
                    <div className='p-2 bg-[#141414] flex flex-col gap-1.5'>
                        <section className='mt-1 flex justify-between'>
                            <div className='flex gap-2'>
                                <button onClick={() => navigate("/watch/" + videoUrl)}>
                                    <GoPlay size={32} />
                                </button>
                                <button
                                    onClick={isFavorited ? handleRemoveFavMovie : handleAddFavMovie}
                                    className='hover:text-white transition-all'
                                >
                                    {isFavorited ? <GoTrash size={32} /> : <GoPlus size={32} />}
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => setIsOpenModal(true)}
                                    className='rounded-full p-1 border'
                                >
                                    <GoChevronDown size={20} />
                                </button>
                            </div>
                        </section>
                        <section className='text-left'>
                            <h2 className='font-semibold'>{data.title}</h2>
                            <p className='text-green-400'>Popularity: {data.popularity}</p>
                        </section>
                    </div>
                </motion.div>
            ) :
                <img
                    onMouseEnter={() => {
                        setIsHover(true)
                        setIdMovie(data.id)
                        getVideoUrl({ movie_id: data.id }).then(result => setVideoUrl(result))
                        checkFavoriteMovies({ emailStorage, tokenStorage, idMovie: data.id }).then(result => setIsFavorited(result))
                    }}
                    src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`}
                    className='w-full max-h-48 cursor-pointer'
                />

            }
        </>
    )
}

export default MovieCard