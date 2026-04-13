"use client"
import React, { useEffect } from "react";

interface ModalLayoutProps {
    children: React.ReactNode;
    onClose: () => void;
    closeOnOutsideClick?: boolean;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
    children,
    onClose,
    closeOnOutsideClick = true,
}) => {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);

        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleOutsideClick = () => {
        if (closeOnOutsideClick) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={handleOutsideClick}
        >
            <div
                className="bg-white rounded-sm p-6 w-full max-w-md lg:max-w-xl overflow-auto max-h-[95dvh] shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalLayout;
