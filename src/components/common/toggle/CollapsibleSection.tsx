// components/settings/CollapsibleSection.tsx
import { Minus, Plus } from "lucide-react";

interface CollapsibleSectionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

const CollapsibleSection = ({ title, isOpen, onToggle, children }: CollapsibleSectionProps) => {
    return (
        <div className="w-11/12 mx-auto rounded-2xl shadow-md">
            <button
                onClick={onToggle}
                className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <span className="font-semibold text-gray-900">{title}</span>
                {isOpen ? (
                    <Minus size={20} className="text-primary" />
                ) : (
                    <Plus size={20} className="text-gray-400" />
                )}
            </button>

            {isOpen && <div className="px-4 lg:px-6 pb-4">{children}</div>}
        </div>
    );
};

export default CollapsibleSection;
