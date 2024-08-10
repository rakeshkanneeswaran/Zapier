import React from "react";

interface ZapModalProps {
    showModal: boolean;
    onClose: () => void;
    zapId: string;
}

export default function ZapModal({ showModal, onClose, zapId }: ZapModalProps) {
    const webhookUrl = `/hooks/catch/${zapId}`;

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(webhookUrl);
        alert("Webhook URL copied to clipboard!");
    };

    if (!showModal) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg transform transition-all duration-300">
                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
                    <h2 className="text-2xl font-semibold">Zap Published</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="mt-6 space-y-4">
                    <p className="text-lg text-gray-600">This is your Zap webhook URL:</p>
                    <p className="text-lg text-gray-600 font-mono border border-black rounded-md bg-red-100">{webhookUrl}</p>
                    <p className="text-lg text-gray-600">Your Zap has been successfully published.</p>
                    <button onClick={handleCopyToClipboard} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                        Copy Webhook URL
                    </button>
                </div>
            </div>
        </div>
    );
}
