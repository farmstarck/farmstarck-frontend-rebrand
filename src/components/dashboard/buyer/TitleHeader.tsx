import React from 'react'

type Text = {
    title: string
}
const TitleHeader = ({ title }: Text) => {
    return (
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">{title}</h1>
    )
}

export default TitleHeader