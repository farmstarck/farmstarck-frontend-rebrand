// components/common/MarketPlace/LocationFilter.tsx
import React, { useState } from "react";
import { Minus, Plus, MapPin } from "lucide-react";

export interface LocationFilterProps {
  locations: string[];
  selected: string[];
  setSelected: (value: string[]) => void;
}

export const LocationFilter: React.FC<LocationFilterProps> = ({
  locations,
  selected,
  setSelected,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Check if "Show All" is active (no location selected)
  const isShowAllActive = selected.length === 0;

  // Handle location selection
  const handleLocationSelect = (location: string) => {
    if (location === "Show All") {
      setSelected([]);
      return;
    }

    if (selected.includes(location)) {
      // Deselect location
      setSelected([]);
    } else {
      // Select location (one selection allowed)
      setSelected([location]);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={toggleExpand}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="font-medium text-gray-900">Location</span>
          {selected.length > 0 && (
            <span className="text-xs text-primary font-medium px-2 py-0.5 bg-primary/10 rounded-full">
              {selected.length}
            </span>
          )}
        </div>
        {isExpanded ? (
          <Minus className="w-4 h-4 text-gray-500" />
        ) : (
          <Plus className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {/* Location List */}
      {isExpanded && (
        <div className="px-2 pb-4 space-y-2">
          {/* Show All Option */}
          <label
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors border-t border-gray-100 mt-2 pt-3"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isShowAllActive
                ? "border-primary bg-white"
                : "border-gray-300"
                }`}
            >
              {isShowAllActive && (
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              )}
            </div>
            <input
              type="radio"
              name="location-filter"
              className="hidden"
              checked={isShowAllActive}
              onChange={() => handleLocationSelect("Show All")}
            />
            <span className="text-sm text-primary font-medium">
              Show All
            </span>
          </label>

          {/* Individual Locations - Checkboxes for multi-select */}
          {locations.map((location) => (
            <label
              key={location}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selected.includes(location)
                    ? "border-primary bg-white"
                    : "border-gray-300"
                  }`}
              >
                {selected.includes(location) && (
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                )}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={selected.includes(location)}
                onChange={() => handleLocationSelect(location)}
              />
              <span className="text-sm text-dark">{location}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};