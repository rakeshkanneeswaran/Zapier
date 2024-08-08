
"use client"
import React, { ReactNode } from 'react';

export default function Actioncreate({ children, onClick, size }: { children: ReactNode, onClick: () => void, size: string }) {
    return (
        <div
            className=" px-4 py-2  bg-black text-white text-lg rounded-sm hover:shadow-md cursor-pointer focus:outline-none flex items-center justify-center"
            onClick={onClick}
        >
            {children}
        </div>
    );
}
