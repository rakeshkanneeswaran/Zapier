
"use client"
import React from 'react'
import PrimaryButton from './buttons/PrimaryButton'
import Herofeatures from './Herofeatures'

export default function Hero() {
    return (
        <div className='flex flex-col justify-center items-center py-10 px-5'>
            <div className='justify-center flex flex-col items-center pb-7'>
                <h1 className='text-7xl text-bold font-sans shadow-primarybutton '>Automate as fast as you can type </h1>
            </div>

            <p className='text-2xl px-24 py-4 pb-5 mx-auto text-center'>AI gives you automation superpowers, and AutomateX puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.</p>
            <PrimaryButton onClick={() => {

            }} size=''>Start free with email</PrimaryButton>

            <div className='flex flex-row justify-around py-6'>

                <Herofeatures text1='Free forever' text2='for core features'></Herofeatures>
                <Herofeatures text1='More apps' text2='than any other platform'></Herofeatures>
                <Herofeatures text1='Cutting-edge' text2='AI features'></Herofeatures>
            

            </div>



        </div>
    )
}
