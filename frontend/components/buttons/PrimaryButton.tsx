
"use client"
import React, { ReactNode } from 'react';

export default function PrimaryButton({ children, onClick, size }: { children: ReactNode, onClick: () => void, size: string }) {
  return (
    <div 
    className={`${size === "small" ? "text-sm px-4 py-2" : "text-lg px-6 py-3"} 
    bg-amber-700 text-white rounded-full hover:shadow-md focus:outline-none flex items-center justify-center`}
onClick={onClick}
    >
      {children}
    </div>
  );
}
