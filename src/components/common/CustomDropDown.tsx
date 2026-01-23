import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface DropdownProps {
  value: string | number;
  onChange: (value: string) => void;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  icon?: React.ReactNode;
  textclass?: string;
  width?: string
  searchholder?:string
  disabled?:boolean
  searchable?: boolean;
}

export const CustomDropDown: React.FC<DropdownProps> = ({
  value,
  onChange,
  disabled  = false,
  options,
  width = 32,
  textclass,
  searchholder,
  placeholder = "Select an option",
  icon,
  searchable = false,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const refDiv = useRef<HTMLDivElement | null>(null);

  // 👉 Auto-select first option if value is empty
  useEffect(() => {
    if (!value && options.length > 0) {
      onChange(options[0].value.toString());
    }
  }, [value, options, onChange]);

  // Filter options
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().startsWith(search.toLowerCase())
  );

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (refDiv.current && !refDiv.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside, true);
    return () => window.removeEventListener("click", handleClickOutside, true);
  }, []);

  // Find selected label
  const selected = options.find((opt) => opt.value === value)?.label;

  return (
    <div ref={refDiv} className={`relative w-${width} `}>
      {/* Trigger */}
      <div
        className={`flex items-center gap-2 max-w-3xl px-3 py-2 ${textclass} w-full bg-white border border-gray-200 rounded-lg hover:border-[var(--primary)] transition-all duration-200 cursor-pointer`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {icon && <span className="text-gray-500">{icon}</span>}
        <span className={`flex-1 text-sm ${!value ? "text-gray-400" : "text-gray-700"}`}>
          {selected || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </div>

      {/* Options */}
      {open && !disabled && (
        <div className="absolute max-h-72 left-0 overflow-y-auto mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">

          {/* Search */}
          {searchable && (
            <div className="sticky top-0 bg-white border-b border-gray-100 flex items-center px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder={searchholder || 'search...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full  outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          )}

          {/* Option List */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value.toString());
                  setOpen(false);
                  setSearch("");
                }}
                className={`px-4 py-2 text-sm cursor-pointer transition-all ${value === option.value
                    ? "bg-[var(--primary)] text-white"
                    : "hover:bg-lite text-gray-700"
                  }`}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-400 text-center">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
