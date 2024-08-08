import axios from "axios";
import { useEffect, useState } from "react";
import { PRIMARY_BACKEND } from "@/public/confing";

interface Triggers {
    id: string;
    name: string;
}

interface Actions {
    id: string;
    name: string;
}

interface ModalProps {
    showModal: boolean;
    onClose: () => void;
    type: 'trigger' | 'action';
    onClickHandler: (Id: string, name: string) => void;
}

export default function Modal({ showModal, onClose, type, onClickHandler }: ModalProps) {
    const [availableTriggers, setAvailableTriggers] = useState<Triggers[]>([]);
    const [availableActions, setAvailableActions] = useState<Actions[]>([]);

    useEffect(() => {
        async function getAvailableActionTriggers() {
            try {
                const availableTriggers = await axios.get(`${PRIMARY_BACKEND}/api/v1/trigger`, {
                    headers: { Authorization: localStorage.getItem('token') }
                });
                const availableActions = await axios.get(`${PRIMARY_BACKEND}/api/v1/action`, {
                    headers: { Authorization: localStorage.getItem('token')}
                });
                setAvailableTriggers(availableTriggers.data.availableTrigger);
                setAvailableActions(availableActions.data.availableAction);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getAvailableActionTriggers();
    }, []);

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg transform transition-all duration-300">
                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
                    <h2 className="text-2xl font-semibold">Create Your {type}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="mt-6 space-y-4">
                    <p className="text-lg text-gray-600">Select your {type === 'action' ? 'Action' : 'Trigger'}</p>
                    <div className="flex flex-col space-y-4">
                        {(type === 'action' ? availableActions : availableTriggers).map(item => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onClickHandler(item.id, item.name);
                                    onClose();
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
