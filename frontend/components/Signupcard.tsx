import React from 'react';
export default function Signupcard() {
    return (
        <div className='flex flex-col justify-center max-w-md mx-auto p-4 border'>
            <div className='flex flex-col py-4'>
                <label className='mb-2'>Work Email (required)</label>
                <input className='border border-black py-2 rounded-md px-2' type="text" />
            </div>

            <div className='flex flex-row justify-between py-4 gap-4'>
                <div className='flex flex-col w-full'>
                    <label className='mb-2'>First Name (required)</label>
                    <input className='border border-black py-2 rounded-md px-2' type="text" />
                </div>

                <div className='flex flex-col w-full'>
                    <label className='mb-2'>Last Name (required)</label>
                    <input className='border border-black py-2 rounded-md px-2' type="text" />
                </div>
            </div>

            <div className='bg-primarybutton text-white py-2 rounded-xl text-center font-bold my-4'>
                Get started free
            </div>

            <div className='text-sm text-center'>
                By signing up, you agree to Zapier&apos;s terms of service and privacy policy.
            </div>
        </div>
    );
}
