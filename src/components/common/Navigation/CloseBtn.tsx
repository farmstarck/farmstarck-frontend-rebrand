"use client"
import Image from "next/image"

type btnprops = {
    onClose: () => void
    width?: number
    height?: number
}
const CloseBtn = ({onClose,width=20,height=20}: btnprops) => {
    return (
        <button
            onClick={onClose}
            className="absolute right-4 top-7 text-gray-500 hover:text-gray-700"
        >
            <Image 
            src={'/assets/images/status/cancel.png'} 
            alt="cancel img" 
            width={width} 
            height={height} />
        </button>
    )
}

export default CloseBtn