import Image from 'next/image';

interface DeleteModalProps {
    closeModal: (val: boolean) => void;
    isOpen: boolean;
    message?: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    closeAfterConfirm?: boolean;
}

const ConfirmDeletion = ({
    closeModal,
    isOpen,
    onConfirm,
    message = "Are you sure you want to delete this product?",
    confirmText = "Yes, continue",
    cancelText = "No, go back",
    closeAfterConfirm = true,
}: DeleteModalProps) => {

    const handleConfirm = () => {
        onConfirm();
        if (closeAfterConfirm) {
            closeModal(false);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full relative">
                        <button
                            onClick={() => closeModal(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                        >
                            <Image src={'/assets/images/status/cancel.png'} alt="cancel img" width={20} height={20} />
                        </button>

                        <div className="flex flex-col gap-7 mt-5 items-center text-center">
                            <h3 className="text-base  font-bold text-gray-900 mb-2">{message}</h3>


                            <div className="gap-3 w-full flex flex-col items-center justify-between">
                                <button
                                    onClick={handleConfirm}
                                    className='w-full text-gray-700 border border-primary rounded-full hover:bg-primary hover:text-white py-2 px-5 font-medium transition-colors'
                                >
                                    {confirmText}
                                </button>
                                <button
                                    onClick={()=>closeModal(false)}
                                    className='w-full text-white rounded-full bg-red-500 hover:bg-red-600 py-2 px-5 font-medium transition-colors'
                                >
                                    {cancelText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConfirmDeletion
