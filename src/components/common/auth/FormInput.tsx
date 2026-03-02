import React from 'react'
interface formProps {
    value: string
    name: string
    onChange: (value: string) => void;
    placeholder: string
    label: string
    textClass?: string
}
const FormInput = ({ value, onChange, name, placeholder, label, textClass }: formProps) => {
    return (
        <div className='w-full'>
            <label className="block text-sm font-semibold mb-2">
                {label}
            </label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${textClass} w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                placeholder={placeholder}
            />
        </div>
    )
}

export default FormInput