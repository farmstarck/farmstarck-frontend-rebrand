import { Trash2, X } from 'lucide-react'
import React from 'react'

interface modalProps {
    closeModal: (val: boolean) => void;
    isOpen: boolean
    deleteIcon?:boolean
    description?: string
    title?: string
    confirm_text?: string
    onConfirm: () => void
}
const ConfirmationModal = ({
    closeModal, isOpen, onConfirm, deleteIcon = true, description, title = 'Clear All', confirm_text }: modalProps) => {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-11/12 relative">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    onClick={() => closeModal(false)}
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                   {deleteIcon && <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Trash2 className="w-8 h-8 text-green-600" />
                    </div>}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600 mb-6">{description}</p>

                    <div className="gap-3 w-full flex items-center justify-between">
                        <button
                            onClick={() => closeModal(false)}
                            className='w-full text-white rounded-full bg-primary py-2 px-5 gap-1'>Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className='w-full text-white rounded-full bg-red-500 py-2 px-5 gap-1'>{confirm_text}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal