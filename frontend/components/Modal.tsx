import axios from "axios";
import { useEffect, useState } from "react";
const primaryBackendUrl = process.env.NEXT_PUBLIC_PRIMARY_BACKEND;

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
    onClickHandler: (Id: string, name: string, metaData: any) => void;
}

export default function Modal({ showModal, onClose, type, onClickHandler }: ModalProps) {
    const [availableTriggers, setAvailableTriggers] = useState<Triggers[]>([]);
    const [availableActions, setAvailableActions] = useState<Actions[]>([]);
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');
    const [triggerMetaData, setTriggerMetaData] = useState("this is meta data");

    useEffect(() => {
        async function getAvailableActionTriggers() {
            try {
                const availableTriggers = await axios.get(`${primaryBackendUrl}/api/v1/trigger`, {
                    headers: { Authorization: localStorage.getItem('token') }
                });
                const availableActions = await axios.get(`${primaryBackendUrl}/api/v1/action`, {
                    headers: { Authorization: localStorage.getItem('token') }
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
                            <div key={item.id} className="flex-col flex">
                                <button
                                    onClick={() => {
                                        if (item.id === 'email') {
                                            onClickHandler(item.id, item.name, { body, subject });
                                        } else {
                                            onClickHandler(item.id, item.name, triggerMetaData);
                                        }
                                        onClose();
                                    }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                                >
                                    {item.name}
                                </button>
                                {type === 'action' && item.id === 'email' && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Enter Subject"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            className="mt-2 p-2 border border-gray-300 rounded-lg"
                                        />
                                        <textarea
                                            placeholder="Enter Body"
                                            value={body}
                                            onChange={(e) => setBody(e.target.value)}
                                            className="mt-2 p-2 border border-gray-300 rounded-lg"
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
