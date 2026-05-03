import { Trash2, X } from 'lucide-react'

interface DeleteModalProps {
    closeModal: (val: boolean) => void;
    isOpen: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
}

const DeleteConfirmationModal = ({ 
    closeModal, 
    isOpen, 
    onConfirm,
    title = "Delete Item",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel"
}: DeleteModalProps) => {
    
    const handleConfirm = () => {
        onConfirm();
        closeModal(false);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full relative">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => closeModal(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <Trash2 className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                            <p className="text-gray-600 mb-6">{message}</p>

                            <div className="gap-3 w-full flex items-center justify-between">
                                <button
                                    onClick={() => closeModal(false)}
                                    className='w-full text-gray-700 border-2 border-gray-300 rounded-full hover:bg-gray-50 py-2 px-5 font-medium transition-colors'
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className='w-full text-white rounded-full bg-red-500 hover:bg-red-600 py-2 px-5 font-medium transition-colors'
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteConfirmationModal