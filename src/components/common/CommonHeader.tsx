import React from 'react'

interface headerProps {
    title: string,
    desc: string;
    styled?: string;
    styling?: string;
}
const CommonHeader = ({ title, desc, styled ,styling}: headerProps) => {
    return (
        <div className="bg-lite ">
            <div className="p-5 relative flex flex-col justify-center items-center ">
                <div className="w-full flex flex-col py-10 gap-3 md:gap-5 items-center ">
                    <h2 className="uppercase text-sm md:text-base text-center text-dark-green font-bold leading-relaxed">
                        {title}
                    </h2>
                    <h1 className={`text-center text-2xl md:text-4xl text-dark-green font-extrabold ${styling}`}>
                        {desc}{" "}
                        <span className="text-primary">{styled}</span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default CommonHeader