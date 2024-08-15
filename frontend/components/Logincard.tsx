import React, { useState } from 'react';
import axios from 'axios';
const primaryBackendUrl = process.env.NEXT_PUBLIC_PRIMARY_BACKEND;

import { useRouter } from 'next/navigation';
export default function Logincard() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <div className='flex flex-col justify-center mx-auto p-6 border rounded-lg shadow-md max-w-md w-full'>
            <div className='flex flex-col py-4'>
                <label className='mb-2'>Work Email (required)</label>
                <input 
                    className='border border-gray-300 py-2 rounded-md px-4' 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>

            <div className='flex flex-col py-4'>
                <label className='mb-2'>Password (required)</label>
                <input 
                    className='border border-gray-300 py-2 rounded-md px-4' 
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>

            <button 
                className='bg-primarybutton text-white py-2 rounded-xl text-center font-bold my-4 hover:bg-orange-800 transition duration-300'
                onClick={async () => {
                    try {
                        console.log('Backend URL:', primaryBackendUrl);

                        const res = await axios.post(`${primaryBackendUrl}/api/v1/user/signin`, {
                            username: email,
                            password
                        });
                        if (res.data.token) {
                            localStorage.setItem("token", res.data.token);
                            router.push("/dashboard");
                        } else {
                            alert("Invalid credentials");
                        }
                    } catch (error) {
                        alert("Error signing in. Please try again.");
                    }
                }}
            >
                Login
            </button>
        </div>
    );
}
