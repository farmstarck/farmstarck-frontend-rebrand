import { XMarkIcon } from '@heroicons/react/24/solid'
import { SearchIcon } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { AllProducts } from '@/data/ProductsData'

const CustomSearch = () => {

    const [searchValue, setSearchValue] = useState('')
    const [modal, setModal] = useState(false)
    const [filtered, setFiltered] = useState(AllProducts)

    const wrapperRef = useRef<HTMLDivElement | null>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setModal(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    useEffect(() => {
        if (searchValue.trim() === "") {
            setFiltered(AllProducts)
            setModal(false)
            return
        }

        const filteredProducts = AllProducts.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        )

        setFiltered(filteredProducts)
    }, [searchValue])

    const handleClearSearch = () => {
        setSearchValue('')
        setModal(false)
    }

    return (
        <div className='w-full' ref={wrapperRef}>
            <div className="flex-1 flex items-center gap-2 relative">
                <SearchIcon className='w-5 h-5 text-primary cursor-pointer' />

                <input
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                        setModal(true)
                    }}
                    className='flex-1 text-dark border-none outline-none'
                    placeholder='search for products'
                    type="text"
                />

                {searchValue && (
                    <button
                        onClick={handleClearSearch}
                        className='text-gray-400 hover:text-gray-600'
                    >
                        <XMarkIcon className='w-5 h-5' />
                    </button>
                )}

                {/* ---- DROPDOWN ---- */}
                {modal && (
                    <div
                        className=" absolute top-10 left-0 w-full bg-white shadow-lg rounded-md max-h-80  overflow-y-auto z-50 p-4  transition-all duration-300 ease-out  animate-[fadeSlide_0.25s_ease-out]">


                        {/* If result found */}
                        {filtered.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {filtered.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={()=> {
                                            setModal(false);
                                            setSearchValue('')
                                        }}
                                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
                                    >
                                        <Image
                                            src={item.image}
                                            height={40}
                                            width={40}
                                            alt={item.title}
                                            className="object-contain"
                                        />
                                        <span className='text-sm text-dark'>
                                            {item.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // ----- NOT FOUND UI -----
                            <div className='w-full text-center flex flex-col items-center '>

                                {/* Replace src below with your PNG */}
                                <div className="w-32 h-32 relative">
                                    <Image
                                        src="/assets/images/marketplaces/notfound.png"
                                        alt="not found"
                                        fill
                                        className='object-contain '
                                    />
                                </div>

                                <p className='font-semibold text-primary text-lg'>Not Found</p>
                                <p className='text-sm text-gray-500 max-w-xs mt-2'>
                                    Sorry, the keyword you entered cannot be found.
                                    Please check again or search with another keyword.
                                </p>

                                <button className='mt-6 bg-primary text-white py-3 px-8 rounded-full'>
                                    Request a Product
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomSearch
