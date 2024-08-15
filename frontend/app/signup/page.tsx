"use client"
import React, { useState } from 'react';
import axios from 'axios';
const primaryBackendUrl = process.env.NEXT_PUBLIC_PRIMARY_BACKEND;
export default function Page() {
    const [password, setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4">
                <div className="bg-white px-8 py-10 rounded-lg shadow-md text-black w-full">
                    <h1 className="mb-10 text-4xl font-bold text-center">Sign up</h1>

                    <div className="flex space-x-4 mb-6">
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-4 rounded-lg text-lg"
                            name="first_name"
                            placeholder="First Name"
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-4 rounded-lg text-lg"
                            name="last_name"
                            placeholder="Last Name"
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </div>

                    <input
                        type="text"
                        className="block border border-grey-light w-full p-4 rounded-lg mb-6 text-lg"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-4 rounded-lg mb-6 text-lg"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    <button
                        type="submit"
                        className="w-full text-center py-4 rounded-lg bg-primarybutton text-white text-lg hover:bg-orange-800 focus:outline-none my-2"
                        onClick={async () => {
                            const result = await axios.post(`${primaryBackendUrl}/api/v1/user/signup`, {
                                firstName,
                                username,
                                lastName,
                                password
                            })

                            if(result.status == 201){
                                alert("Account created successfully")
                                window.location.href = "/login/"
                            }
                        }}
                    >
                        Create Account
                    </button>

                    <div className="text-center text-sm text-grey-dark mt-6">
                        By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark ml-1" href="#">
                            Terms of Service
                        </a> and
                        <a className="no-underline border-b border-grey-dark text-grey-dark ml-1" href="#">
                            Privacy Policy
                        </a>.
                    </div>
                </div>

                <div className="text-grey-dark mt-8 text-lg">
                    Already have an account?
                    <a className="no-underline border-b border-blue text-blue ml-1" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    );
}
