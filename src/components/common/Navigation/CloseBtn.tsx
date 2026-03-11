"use client"
import Image from "next/image"

type btnprops = {
    onClose: () => void
}
const CloseBtn = ({onClose}: btnprops) => {
    return (
        <button
            onClick={onClose}
            className="absolute right-4 top-7 text-gray-500 hover:text-gray-700"
        >
            <Image 
            src={'/assets/images/status/cancel.png'} 
            alt="cancel img" 
            width={20} 
            height={20} />
        </button>
    )
}

export default CloseBtn