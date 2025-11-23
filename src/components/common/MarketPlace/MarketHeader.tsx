"use client"
import { HomeIcon, MapPinIcon, TruckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import MarketSearch from './MarketSearch'

const MarketHeader = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState('en')
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
    const [showMobileLanguageDropdown, setShowMobileLanguageDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    
    const navs = [
        {
            title: "Visit Homepage",
            url: "/",
            icon: HomeIcon
        },
        {
            title: "Track Order",
            url: "underconstriction",
            icon: TruckIcon
        },
        {
            title: "Lagos, Nigeria",
            url: "#",
            icon: MapPinIcon
        },
    ]
    
    const languages = [
        { code: 'en', name: 'English', countryCode: 'US' },
        { code: 'fr', name: 'French', countryCode: 'FR' },
        { code: 'es', name: 'Spanish', countryCode: 'ES' },
        { code: 'de', name: 'German', countryCode: 'DE' },
        { code: 'it', name: 'Italian', countryCode: 'IT' },
    ]

    const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0]

    const handleLanguageChange = (code: string) => {
        setSelectedLanguage(code)
        setShowLanguageDropdown(false)
        setShowMobileLanguageDropdown(false)
    }

    const menuToggle = () => {
        const btn = document.getElementById("menu-btn")
        if (btn) btn.classList.toggle("open")
        setIsOpen((s) => !s)
    }

    const handleLinkClick = () => {
        if (isOpen) {
            menuToggle()
        }
        setShowMobileLanguageDropdown(false)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowLanguageDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])
    
    return (
        <div className='w-full z-50 bg-white fixed flex flex-col items-start  gap-4 top-0'>
            {/* Desktop Layout */}
            <div className="relative w-full flex items-center justify-between gap-4 px-3 pt-3">
                <div className='hidden md:flex items-center gap-4'>
                {navs.slice(0, 2).map((nav, index) => (
                    <React.Fragment key={nav.title}>
                        <Link href={nav.url} className='flex items-center gap-2 hover:opacity-80'>
                            <nav.icon className="w-5 h-5 primary-txt" />
                            <span className='text-sm'>{nav.title}</span>
                        </Link>
                        {index < 1 && <span className='text-gray-400'>|</span>}
                    </React.Fragment>
                ))}
            </div>
            
            <div className='hidden md:flex items-center gap-4'>
                {navs.slice(2).map((nav) => (
                    <React.Fragment key={nav.title}>
                        <div className='flex items-center gap-2 hover:opacity-80'>
                            <nav.icon className="w-5 h-5 primary-txt" />
                            <span className='text-sm'>{nav.title}</span>
                        </div>
                    </React.Fragment>
                ))}
                
                {/* Custom Language Dropdown - Desktop */}
                <div className='relative' ref={dropdownRef}>
                    <button 
                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                        className='flex items-center gap-2 primary-txt bg-transparent border-none outline-none cursor-pointer hover:opacity-80'
                    >
                        {/* <span className='text-xl leading-none'>{currentLanguage.flag}</span> */}
                        <span className='text-sm'>{currentLanguage.name}</span>
                        <ChevronDownIcon className='w-4 h-4 primary-txt' />
                    </button>
                    
                    {showLanguageDropdown && (
                        <div className='absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-[160px]'>
                            {languages.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors first:rounded-t-md last:rounded-b-md ${
                                        selectedLanguage === lang.code ? 'bg-gray-50' : ''
                                    }`}
                                >
                                    {/* <span className='text-xl leading-none'>{lang.flag}</span> */}
                                    <span>{lang.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Layout */}
            <div className='md:hidden flex items-center justify-between w-full'>
                <div className='flex items-center gap-3'>
                    <Link href="/">
                        <Image
                            src="/assets/svg/logo-primary.svg"
                            alt="farmstarck logo"
                            width={128}
                            height={32}
                            className="w-32"
                        />
                    </Link>
                </div>

                <button
                    id="menu-btn"
                    className="block hamburger focus:outline-none"
                    onClick={menuToggle}
                >
                    <span className="hamburger-top" style={{ background: "var(--primary)" }}></span>
                    <span className="hamburger-middle" style={{ background: "var(--primary)" }}></span>
                    <span className="hamburger-bottom" style={{ background: "var(--primary)" }}></span>
                </button>
                
                {isOpen && (
                    <div className='absolute top-full left-0 w-full bg-white shadow-lg z-10 px-4 py-6 space-y-3'>
                        {navs.map(nav => (
                            <Link 
                                key={nav.title} 
                                href={nav.url} 
                                className='flex items-center gap-2 primary-txt hover:opacity-80 py-3 border-b border-gray-100' 
                                onClick={handleLinkClick}
                            >
                                <nav.icon className="w-5 h-5" />
                                <span>{nav.title}</span>
                            </Link>
                        ))}
                        
                        {/* Language Toggle - Mobile */}
                        <div className='pt-3 border-t border-gray-200'>
                            <button
                                onClick={() => setShowMobileLanguageDropdown(!showMobileLanguageDropdown)}
                                className='w-full flex items-center justify-between gap-2 px-2 py-3 hover:bg-gray-50 rounded transition-colors'
                            >
                                <div className='flex items-center gap-3'>
                                    {/* <span className='text-xl leading-none'>{currentLanguage.flag}</span> */}
                                    <span className='text-sm'>{currentLanguage.name}</span>
                                </div>
                                <ChevronDownIcon className={`w-4 h-4 primary-txt transition-transform ${showMobileLanguageDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {showMobileLanguageDropdown && (
                                <div className='mt-2 pl-4 space-y-1'>
                                    {languages.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                handleLanguageChange(lang.code)
                                                handleLinkClick()
                                            }}
                                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors ${
                                                selectedLanguage === lang.code ? 'bg-gray-50' : ''
                                            }`}
                                        >
                                            {/* <span className='text-xl leading-none'>{lang.flag}</span> */}
                                            <span>{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            </div>

            <div className="w-full">
                <MarketSearch/>
            </div>

        </div>
    )
}

export default MarketHeader