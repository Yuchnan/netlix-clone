import React from 'react'
import EachUtils from '@/utils/EachUtils'
import InputMembership from '@/components/modules/LandingPage/InputMembership'

import { JUMBOTRON_IMAGE } from "@/constants/listAsset"
import { useAtom } from 'jotai'
import { languageAtom } from '@/jotai/atoms'
import { LIST_JUMBOTRON_EN } from '@/constants/listJumbotrons'
import { LIST_JUMBOTRON_ID } from '@/constants/listJumbotrons'

const Jumbotron = () => {
    const  [language] = useAtom(languageAtom)
    return (
        <div className='mb-24 px-8'>
            <img 
            src={JUMBOTRON_IMAGE} 
            alt="netflix-bg"
            className='absolute top-0 left-0 object-cover w-full h-[700px] opacity-60'
            />
            <EachUtils
                of={language == "en" ? LIST_JUMBOTRON_EN : LIST_JUMBOTRON_ID}
                render={(item, index) => (
                    <div key={index} className='relative flex flex-col justify-center items-center mt-44 gap-4 text-center px-4'>
                        <h1 className='font-black text-white text-5xl'>{item.title}</h1>
                        <p className='text-white text-xl'>{item.desc}</p>
                        <InputMembership/>
                    </div>
                )}
            />            
        </div>
    )
}

export default Jumbotron