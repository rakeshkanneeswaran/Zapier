'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Appbar from '@/components/Appbar';
import Modal from '@/components/Modal';
import { PRIMARY_BACKEND } from '@/public/confing';
import { metadata } from '../layout';

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
    const [type, setType] = useState<'trigger' | 'action'>('trigger');
    const [selectedTrigger, setSelectedTrigger] = useState<RequestedTrigger>({
        availableTriggerId: 'Trigger',
        metaData: 'no metadata needed',
        name: 'Trigger',
    });
    const [selectedActions, setSelectedActions] = useState<RequestedActions[]>([]);
    const [index, setIndex] = useState(0);

    function changeTheAction(index: number, availableActionId: string, name: string) {
        const tempArray = [...selectedActions];
        tempArray[index] = { ...tempArray[index], availableActionId, name };
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
                metaData:{
                    body: rest.metaData.body,
                    subject: rest.metaData.subject,
                },
            }));
    
            // Sanitize trigger - only include fields expected by backend
            const { name, ...sanitizedTrigger } = selectedTrigger;
    
            // Send the sanitized payload to the backend
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${PRIMARY_BACKEND}/api/v1/zap`,
                { requestedActions: sanitizedActions, requestedTrigger: sanitizedTrigger },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    

    return (
        <div className="flex flex-col">
            <Appbar />
            <div className="flex justify-center py-4">
                <button onClick={handlePublish} className="p-2 border border-black">
                    Publish
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <ZapCell
                    name={selectedTrigger.name}
                    index={1}
                    onClick={() => {
                        setShowModal(true);
                        setType('trigger');
                    }}
                />

                {selectedActions.map((action, index) => (
                    <ZapCell
                        key={index}
                        name={action.name || 'Action'}
                        index={index + 2}
                        onClick={() => {
                            setIndex(index);
                            setType('action');
                            setShowModal(true);
                        }}
                    />
                ))}

                <div className="flex justify-center">
                    <button onClick={handleAddAction}>+</button>
                </div>

                <div>{JSON.stringify(selectedActions)}</div>
                <div>{JSON.stringify(selectedTrigger)}</div>

                <Modal
                    type={type}
                    onClose={() => setShowModal(false)}
                    showModal={showModal}
                    onClickHandler={type === 'action' ? (Id: string, name: string) => {
                        changeTheAction(index, Id, name);
                    } : (Id: string, name: string) => {
                        setSelectedTrigger({
                            availableTriggerId: Id,
                            name: name,
                            metaData: 'this is meta data',
                        });
                    }}
                />
            </div>
        </div>
    );
}

function ZapCell({ name, index, onClick }: { name: string; index: number; onClick: () => void }) {
    return (
        <button onClick={onClick} className="flex flex-row justify-center cursor-pointer">
            <div className="flex flex-row justify-between rounded-md border border-black w-1/6 py-2 px-6">
                <div>{index}</div>
                <div>{name}</div>
            </div>
        </button>
    );
}
