import React from 'react'

export default function Zapcell({ name, index , onClick }: {
    name: string;
    index: number;
    onClick : () => void;
}) {

    onClick
    return (
        <div  onClick={onClick}  className='w-64 p-4 flex flex-row justify-between items-center border shadow-sm rounded-lg bg-white hover:shadow-md transition-shadow duration-300 ease-in-out'>
            <div>
            </div>
            <div className='text-lg font-bold text-purple-700'>
                {index}
            </div>
            <div className='text-md font-semibold text-gray-700'>
                {name}
            </div>
        </div>
    )
}
