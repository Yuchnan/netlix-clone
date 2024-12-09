import React, { useEffect, useState } from 'react'
import CarouselLayout from '@layouts/CarouselLayout'
import EachUtils from '@/utils/EachUtils'
import MovieCard from '../MovieCard'

import { useAtom } from 'jotai'
import { idMovieAtom, isFetchingAtom } from '@/jotai/atoms'
import { getMoviesByType } from '@/utils/TMDB/getMoviesByType'

const MovieList = ({ title, moviesType }) => {
    const [, setIdMovie] = useAtom(idMovieAtom)
    const [isHover, setIsHover] = useState(false)
    const [movieList, setMovieList] = useState([])
    const [, setIsFetching] = useAtom(isFetchingAtom)

    useEffect(() => {
        if (moviesType) {
            getMoviesByType({ moviesType }).then((result) => {
                setIsFetching(true)
                setMovieList(result)
            }).finally(() => {
                setTimeout(() => {
                    setIsFetching(false)
                }, 500)
            })
        }
    }, [moviesType])

    return (
        <section className='px-8 py-4 relative'>
            <h3 className='text-white text-3xl font-semibold mb-2'>{title}</h3>
            <CarouselLayout>
                <EachUtils
                    of={movieList}
                    render={(item, index) => (
                        <div
                            className='w-1/2 md:w-1/4 lg:w-1/6 carousel-item px-1'
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
                                moviesType={moviesType}
                            />
                        </div>
                    )}
                />
            </CarouselLayout>
        </section>
    )
}

export default MovieList