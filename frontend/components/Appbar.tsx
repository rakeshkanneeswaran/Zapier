"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { LinkButton } from './buttons/LinkButton';// Assuming LinkButton is a separate component
import PrimaryButton from './buttons/PrimaryButton';


export default function Appbar() {
    const router = useRouter();

    return (
        <div className="h-14 flex justify-between items-center  shadow-md px-5 ">
            <div className="text-3xl font-bold cursor-pointer"  onClick={()=>{router.push("/")}}>
                Automate<span className='text-orange-600'>X</span>
            </div>
            <div className="flex space-x-4">
                <LinkButton onClick={() => router.push('https://zapier.com/l/contact-sales?demo_source=cs_nav_header_/')}>
                    Contact Sales
                </LinkButton>
                <LinkButton onClick={() => router.push('/login')}>
                    Login
                </LinkButton>
                <PrimaryButton size="small" onClick={async () => { 

                    
                    
                    router.push('/signup')
                    
                    }}>
                    Sign Up
                </PrimaryButton>
            </div>
        </div>
    );
}
