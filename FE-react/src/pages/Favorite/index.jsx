import BrowseLayout from '@/components/Layouts/BrowseLayout'
import React, { useEffect, useState } from 'react'
import EachUtils from '@/utils/EachUtils'
import MovieCard from '@mods/BrowsePage/MovieCard'

import { useAtom } from 'jotai'
import { emailStorageAtom, idMovieAtom, tokenAtom } from '@/jotai/atoms'
import { apiInstanceExpress } from '@/utils/apiInstance'
import Modal from '@/components/modules/BrowsePage/Modal'

const Favorite = () => {
    const [, setIdMovie] = useAtom(idMovieAtom)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenAtom)

    const [isHover, setIsHover] = useState(false)
    const [movieList, setMovieList] = useState([])

    const getFavMovies = async () => {
        try {
            const url = `my-movies/${emailStorage}/${tokenStorage}`
            const movies = await apiInstanceExpress.get(url)
            if (movies.status === 200) return movies.data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    useEffect(() => {
        if (emailStorage && tokenStorage) {
            getFavMovies().then(result => setMovieList(result.data.favoriteMovies))
        }
    }, [emailStorage, tokenStorage])

    return (
        <BrowseLayout>
            <div className='mt-20 px-8'>
                <h3 className='text-white text-2xl font-bold'>My Favorite Movies</h3>
            </div>
            <div className='grid sm:grid-cols-4 grid-cols-2 gap-4 px-8 py-8'>
                <EachUtils
                    of={movieList}
                    render={(item, index) => (
                        <div
                            className='h-72'
                            key={index}

                            onMouseLeave={() => {
                                setIsHover(false)
                                setIdMovie(null)
                            }}
                        >
                            <MovieCard
                                data={item}
                                isHover={isHover}
                                setIsHover={setIsHover}
                            />
                        </div>
                    )}
                />
            </div>
            <Modal />
        </BrowseLayout>
    )
}

export default Favorite