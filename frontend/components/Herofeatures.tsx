import React from 'react'

type Props = {}

export default function Herofeatures({ text1, text2 }: { text1: string, text2: string }) {
    return (
        <div className='flex px-1'> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>

            <div className='font-bold px-1'>
                {text1}
            </div>
            <div className='px-1'>
                {text2}
            </div>
        </div>
    )
}