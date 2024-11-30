import React, { useState } from 'react'
import EachUtils from '@/utils/EachUtils'
import MovieCard from '@mods/BrowsePage/MovieCard'

import { useAtom } from 'jotai'
import { idMovieAtom } from '@/jotai/atoms'
import { LIST_VIDEO_RECOMMENDATION } from '@/constants/dummyVideo'
import BrowseLayout from '@/components/Layouts/BrowseLayout'

const Favorite = () => {
    const [, setIdMovie] = useAtom(idMovieAtom)
    const [isHover, setIsHover] = useState(false)

    return (
        <BrowseLayout>
            <div className='mt-20 px-8'>
                <h3 className='text-white text-2xl font-bold'>My Favorite Movies</h3>
            </div>
            <div className='grid sm:grid-cols-4 grid-cols-2 gap-4 px-8 py-8'>
                <EachUtils
                    of={LIST_VIDEO_RECOMMENDATION}
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
        </BrowseLayout>
    )
}

export default Favorite