'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Appbar from '@/components/Appbar';
import Modal from '@/components/Modal';
const primaryBackendUrl = process.env.NEXT_PUBLIC_PRIMARY_BACKEND;
import ZapModal from '@/components/zapModal';

interface Trigger {
    id: string;
    name: string;
}

interface Action {
    id: string;
    name: string;
}

interface RequestedTrigger {
    availableTriggerId: string;
    metaData?: string;
    name: string;
}

interface RequestedActions {
    availableActionId: string;
    metaData: {
        body: string;
        subject: string;
    };
    name: string;
}

export default function Page() {
    const [showModal, setShowModal] = useState(false);
    const [showZapModal, setShowZapModal] = useState(false)
    const [zapId, setZapId] = useState("")
    const [type, setType] = useState<'trigger' | 'action'>('trigger');
    const [selectedTrigger, setSelectedTrigger] = useState<RequestedTrigger>({
        availableTriggerId: 'Trigger',
        metaData: 'no metadata needed',
        name: 'Trigger',
    });
    const [selectedActions, setSelectedActions] = useState<RequestedActions[]>([]);
    const [index, setIndex] = useState(0);

    function changeTheAction(index: number, availableActionId: string, name: string, metaData: any) {
        const tempArray = [...selectedActions];
        tempArray[index] = { ...tempArray[index], availableActionId, name, metaData };
        setSelectedActions(tempArray);
    }

    const handleAddAction = () => {
        setSelectedActions((prevActions) => [
            ...prevActions,
            { availableActionId: '', name: '', metaData: { body: '', subject: '' } },
        ]);
    };

    const handlePublish = async () => {
        try {
            // Sanitize actions - convert 'metaData' to a JSON string if needed by backend
            const sanitizedActions = selectedActions.map(({ name, ...rest }) => ({
                ...rest,
                metaData: {
                    body: rest.metaData.body,
                    subject: rest.metaData.subject,
                },
            }));
            // Sanitize trigger - only include fields expected by backend
            const { name, ...sanitizedTrigger } = selectedTrigger;

            // Send the sanitized payload to the backend
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${primaryBackendUrl}/api/v1/zap`,
                { requestedActions: sanitizedActions, requestedTrigger: sanitizedTrigger },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            if (!response.data.zapId) {
                alert("somthing went woring")
            }
            else {
                setZapId(`${response.data.userId}/${response.data.zapId}`);
                setShowZapModal(true);
            }
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="flex flex-col min-h-screen">
            <Appbar />
            <main className="flex-grow p-4">
                <div className="flex justify-center mb-4">
                    <button
                        onClick={handlePublish}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                    >
                        Publish
                    </button>
                </div>

                <div className="flex flex-col gap-4">

                    <div className='flex flex-col w-full'>
                        <ZapCell
                            name={selectedTrigger.name}
                            index={1}
                            onClick={() => {
                                setShowModal(true);
                                setType('trigger');
                            }}
                        />
                        <div className='flex justify-center w-full'>
                            <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path d="M26.29 20.29 18 28.59V0h-2v28.59l-8.29-8.3-1.42 1.42 10 10a1 1 0 0 0 1.41 0l10-10z" data-name="2-Arrow Down" />
                            </svg>
                        </div>
                    </div>

                    {selectedActions.map((action, index) => (
                        <div key={index} className='flex flex-col w-full'>
                            <ZapCell
                                name={action.name || 'Action'}
                                index={index + 2}
                                onClick={() => {
                                    setIndex(index);
                                    setType('action');
                                    setShowModal(true);
                                }}
                            />
                            <div className='flex justify-center w-full'>
                                <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                    <path d="M26.29 20.29 18 28.59V0h-2v28.59l-8.29-8.3-1.42 1.42 10 10a1 1 0 0 0 1.41 0l10-10z" data-name="2-Arrow Down" />
                                </svg>
                            </div>
                        </div>
                    ))}


                    <div className="flex justify-center">
                        <button
                            onClick={handleAddAction}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
                        >
                            Add Action
                        </button>
                    </div>

                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-lg font-semibold">Selected Actions:</h3>
                        <pre>{JSON.stringify(selectedActions, null, 2)}</pre>
                    </div>
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-lg font-semibold">Selected Trigger:</h3>
                        <pre>{JSON.stringify(selectedTrigger, null, 2)}</pre>
                    </div>

                    <div>
                        <ZapModal showModal={showZapModal} zapId={zapId} onClose={() => { setShowZapModal(false) }}></ZapModal>
                    </div>

                    <Modal
                        type={type}
                        onClose={() => setShowModal(false)}
                        showModal={showModal}
                        onClickHandler={type === 'action' ? (Id: string, name: string, metaData: any) => {
                            changeTheAction(index, Id, name, metaData);
                        } : (Id: string, name: string) => {
                            setSelectedTrigger({
                                availableTriggerId: Id,
                                name: name,
                                metaData: 'this is meta data',
                            });
                        }}
                    />
                </div>
            </main>
        </div>
    );
}

function ZapCell({ name, index, onClick }: { name: string; index: number; onClick: () => void }) {
    return (
        <button onClick={onClick} className="flex flex-row justify-center">
            <div className="flex flex-row items-center justify-between rounded-lg border border-gray-300 bg-white w-full max-w-xs p-4 shadow-md hover:bg-gray-100 transition duration-300">
                <div className="text-lg font-semibold">{index}</div>
                <div className="text-lg">{name}</div>
            </div>
        </button>
    );
}
