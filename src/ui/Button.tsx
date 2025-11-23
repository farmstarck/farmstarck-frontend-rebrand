import React from 'react'

interface btnProps {
    textClass?: string
    bg?: string
    label: string
}
const Button = ({
    textClass,
    label,
    bg = 'bg-primary'
}: btnProps) => {
    return (
        <button 

        className={`${textClass} ${bg} text-white w-fit px-6 py-2 satoshi rounded-full`}>{label}</button>
    )
}

export default Button