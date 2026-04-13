import { Check, Plus } from "lucide-react";
import React from "react";

interface btnProps {
  textClass?: string;
  bg?: string;
  label: string;
  onClick?: () => void;
  showIcon?: boolean;
  icon?: React.ReactNode | string;
}

const Button = ({
  textClass,
  label,
  showIcon = false,
  onClick,
  icon,
  bg = "bg-primary",
}: btnProps) => {
  let renderedIcon: React.ReactNode = null;

  if (showIcon) {
    switch (icon) {
      case "plus":
        renderedIcon = <Plus size={12} />;
        break;
      default:
        renderedIcon = <Check size={12} />;
    }

    return (
      <button
      onClick={onClick}
        className={`${textClass} ${bg} text-white px-4 py-2 rounded-md flex items-center justify-center gap-2`}
      >
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-primary">
          {renderedIcon}
        </span>
        {label}
      </button>
    );
  }

  return (
    <button
      className={`${textClass} ${bg} text-white px-4 py-2 rounded-md`}
    >
      {label}
    </button>
  );
};

export default Button;