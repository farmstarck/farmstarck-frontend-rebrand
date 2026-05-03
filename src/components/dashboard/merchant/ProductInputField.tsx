import { CustomDropDown } from "@/components/common/CustomDropDown";
import React from "react";

type Option = {
  value: string | number;
  label: string;
};

interface InputFieldProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;

  // if options exist → render dropdown
  options?: Option[];
  type?: "text" | "text-area";

  placeholder?: string;
  disabled?: boolean;
}

const ProductInputField: React.FC<InputFieldProps> = ({
  label,
  required = false,
  value,
  onChange,
  type = "text",
  options,
  placeholder,
  disabled = false,
}) => {
  const isDropdown = Array.isArray(options) && options.length > 0;

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      <label className="text-sm text-dark font-normal">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Conditional Rendering */}
      {isDropdown ? (
        <CustomDropDown
          value={value}
          onChange={onChange}
          options={options}
          autoSelectFirst={false}
          placeholder={placeholder}
          disabled={disabled}
          width={"full"}
        />
      ) : type === "text" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-3 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:border-[var(--primary)] transition"
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-3 py-1 max-h-40 min-h-24 text-start rounded-lg border border-gray-300 bg-white text-sm outline-none focus:border-[var(--primary)] transition"
        />
      )}
    </div>
  );
};

export default ProductInputField;
