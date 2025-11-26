import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface DropdownProps {
  value: string | number;
  onChange: (value: string) => void;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  icon?: React.ReactNode;
  textclass?:string;
  searchable?: boolean; // 👈 Added: controls visibility of search box
}

export const CustomDropDown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  textclass,
  placeholder,
  icon,
  searchable = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const refDiv = useRef<HTMLDivElement | null>(null);

  // Filter options based on search term
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().startsWith(search.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (refDiv.current && !refDiv.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside, true);
    return () => window.removeEventListener("click", handleClickOutside, true);
  }, []);

  return (
    <div ref={refDiv} className="relative w-full">
      {/* Trigger */}
      <div
        className={`flex items-center gap-2 ${open ? 'px-4':'px-3'} py-2  ${textclass} w-full bg-white border border-gray-200 rounded-lg hover:border-[var(--primary)] transition-all duration-200 cursor-pointer shadow-sm`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {icon && <span className="text-gray-500">{icon}</span>}
        <span className={`flex-1 ${!value ? "text-gray-400" : "text-gray-700"}`}>
          {value ? options.find((opt) => opt.value === value)?.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Options Dropdown */}
      {open && (
        <div className="absolute max-h-72 left-0 overflow-y-auto mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[10000]">
          {/* Search Box */}
          {searchable && (
            <div className="sticky top-0 bg-white border-b border-gray-100 flex items-center px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          )}

          {/* Filtered Options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value.toString());
                  setOpen(false);
                  setSearch(""); // reset search after selection
                }}
                className={`px-4  py-2 text-sm cursor-pointer transition-all ${
                  value === option.value
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
