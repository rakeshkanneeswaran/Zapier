
import axios from "axios"
import { useEffect, useState } from "react"
import { PRIMARY_BACKEND } from "@/public/confing"

interface triggers {
    id: string,
    name: string
}

interface actions {
    id: string,
    name: string
}

interface requestedTrigger {

    availableTriggerId: string,
    metaData?: string
    name: string

}

interface requestedActions {
    availableActionId: string,
    metaData: {
        body: string,
        subject: string

    }
}

export default function Modal({ showModal, onClose, type, onClickHandler }: { showModal: boolean, onClose: () => void, type: string, onClickHandler: (name: string, Id: string) => void }) {
    const [availableTriggers, setAvailableTriggers] = useState<triggers[]>([])
    const [availableActions, setAvailableActions] = useState<actions[]>([
    ])

    useEffect(() => {
        async function getAvaliableActionTiggers() {
            // Fetch available actions and triggers from primary API 
            const availableTriggers = await axios.get(`${PRIMARY_BACKEND}/api/v1/trigger`, { headers: { Authorization: `${localStorage.getItem('token')}` } })
            const availableActions = await axios.get(`${PRIMARY_BACKEND}/api/v1/action`, { headers: { Authorization: `${localStorage.getItem('token')}` } })
            setAvailableTriggers(availableTriggers.data.availableTrigger)
            setAvailableActions(availableActions.data.availableAction)
        }
        getAvaliableActionTiggers()
    }, [])

    return (
        <div className="bg-gray-100 flex items-center justify-center ">
            <div>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
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
                            {/* Modal Content */}
                            <div className="mt-6 space-y-4">
                                <p className="text-lg text-gray-600">Selecte your Trigger</p>
                                <div className="flex flex-col space-y-4">
                                    {type == "action" ? availableActions.map((action) => {
                                        return (<button onClick={() => {
                                            onClickHandler(action.id, action.name)
                                            onClose()
                                        }} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">{action.name}</button>)
                                    }) : availableTriggers.map((trigger) => {
                                        return (<button onClick={() => {
                                            onClickHandler(trigger.id, trigger.name, )
                                            onClose()
                                        }} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">{trigger.name}</button>)
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}