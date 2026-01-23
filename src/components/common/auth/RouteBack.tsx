"use client";

import { ChevronLeft, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface MenuOption {
    label: string;
    onClick: () => void;
}

interface routeProps {
    children: React.ReactNode;
    label: string;
    menu?: boolean;
    menuOptions?: MenuOption[];
}

const RouteBack = ({
    children,
    label,
    menu = false,
    menuOptions = [],
}: routeProps) => {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className="w-full lg:px-4 relative">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between w-full">
                <button
                    onClick={() => router.back()}
                    className="p-2 flex items-center gap-2 rounded-lg transition-colors"
                >
                    <ChevronLeft size={20} />
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                        {label}
                    </h1>
                </button>

                {menu && menuOptions.length > 0 && (
                    <div
                        onClick={() => setOpenMenu((prev) => !prev)}
                        className="p-3 cursor-pointer rounded-full bg-white"
                    >
                        <MenuIcon />
                    </div>
                )}
            </div>

            {/* Menu */}
            {openMenu && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpenMenu(false)}
                    />

                    <div className="absolute right-6 top-10 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {menuOptions.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    item.onClick();
                                    setOpenMenu(false);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {/* Content */}
            <div className="bg-white p-5 lg:p-10 w-full rounded-2xl shadow-sm">
                {children}
            </div>
        </div>
    );
};

export default RouteBack;
