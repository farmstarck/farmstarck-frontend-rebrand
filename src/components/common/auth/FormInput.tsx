import React from "react";

interface formProps {
  value: string;
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  textClass?: string;
  bold?: boolean;
  type?: "text" | "number" | "numeric";
  maxLength?: number;
  readOnly?: boolean;
}

const formatNumberWithCommas = (value: string) => {
  if (!value) return "";
  return Number(value).toLocaleString("en-NG");
};

const FormInput = ({
  value,
  onChange,
  name,
  bold = true,
  placeholder,
  label,
  textClass,
  type = "text",
  maxLength,
  readOnly = false,
}: formProps) => {
  const isDigitOnly = type === "numeric" || type === "number";
  const displayValue = type === "number" ? formatNumberWithCommas(value) : value;

  const handleChange = (inputValue: string) => {
    let nextValue = inputValue;

    if (isDigitOnly) {
      nextValue = inputValue.replace(/\D/g, "");
    }

    if (maxLength) {
      nextValue = nextValue.slice(0, maxLength);
    }

    onChange(nextValue);
  };

  return (
    <div className="w-full">
      <label className={`block text-sm ${bold ? "font-semibold" : ""}  mb-2`}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        inputMode={isDigitOnly ? "numeric" : undefined}
        value={displayValue}
        readOnly={readOnly}
        onChange={(e) => handleChange(e.target.value)}
        className={`${textClass} w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all ${
          readOnly ? "bg-gray-50 cursor-not-allowed" : ""
        }`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
