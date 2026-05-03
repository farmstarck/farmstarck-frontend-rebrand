import { Check } from "lucide-react";
import React from "react";

interface ToggleProps {
  checked: boolean;
  onToggle: (nextValue: boolean) => void;
  ariaLabel?: string;
}

const NotificationToggle = ({
  checked,
  onToggle,
  ariaLabel = "Toggle setting",
}: ToggleProps) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={checked}
      onClick={() => onToggle(!checked)}
      className={`w-12 h-6 rounded-full transition-colors relative ${
        checked ? "bg-primary" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5  bg-white rounded-full transition-transform ${
          checked ? "translate-x-6" : "translate-x-0.5"
        }`}
      >
        {checked && (
          <Check size={14} className="text-primary m-auto mt-0.5" />
        )}
      </div>
    </button>
  );
};

export default NotificationToggle;
