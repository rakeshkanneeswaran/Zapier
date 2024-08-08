
"use client"
import React from 'react';
import Logincard from '@/components/Logincard';
import Appbar from '@/components/Appbar';

export default function Page() {
    return (
        <div>
            <Appbar />
            <div className='flex flex-col md:flex-row justify-center items-center py-20 px-4 md:px-20'>
                <div className='w-full md:w-1/2 flex flex-col pl-0 md:pl-7 text-center md:text-left'>
                    <h1 className='font-sans text-3xl md:text-6xl font-bold'>
                        Join millions worldwide who automate their work using Zapier.
                    </h1>
                    <div className='pt-5'>
                        <div className='flex flex-row items-center gap-2 md:gap-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20" color="success400" name="formCheckCircle">
                                <path fill="#2D2E2E" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8.21 10.79l2.79 2.8 5.29-5.3 1.42 1.42-6.71 6.7-4.21-4.2 1.42-1.42Z"></path>
                            </svg>
                            Easy setup, no coding required
                        </div>
                        <div className='flex flex-row items-center gap-2 md:gap-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20" color="success400" name="formCheckCircle">
                                <path fill="#2D2E2E" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8.21 10.79l2.79 2.8 5.29-5.3 1.42 1.42-6.71 6.7-4.21-4.2 1.42-1.42Z"></path>
                            </svg>
                            Free forever for core features
                        </div>
                        <div className='flex flex-row items-center gap-2 md:gap-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20" color="success400" name="formCheckCircle">
                                <path fill="#2D2E2E" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8.21 10.79l2.79 2.8 5.29-5.3 1.42 1.42-6.71 6.7-4.21-4.2 1.42-1.42Z"></path>
                            </svg>
                            Secure and reliable
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-1/2 mt-10 md:mt-0'>
                    <Logincard />
                </div>
            </div>
        </div>
    );
}
