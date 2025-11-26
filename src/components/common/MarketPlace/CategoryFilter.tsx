import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

export interface CategoryGroup {
  groupName: string;
  items: string[];
}

export interface CategoryFilterProps {
  categoryGroups: CategoryGroup[];
  selected: string[];
  setSelected: (value: string[]) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categoryGroups,
  selected,
  setSelected,
}) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    categoryGroups.map((g) => g.groupName)
  );

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((g) => g !== groupName)
        : [...prev, groupName]
    );
  };

  const handleSelect = (item: string) => {
    setSelected(
      selected.includes(item)
        ? selected.filter((c) => c !== item)
        : [...selected, item]
    );
  };

  return (
    <div className="space-y-4">
      {categoryGroups.map((group) => (
        <div key={group.groupName} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Group Header */}
          <button
            onClick={() => toggleGroup(group.groupName)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selected.some((item) => group.items.includes(item))
                  ? "border-green-500 bg-white"
                  : "border-gray-300"
                  }`}
              >
                {selected.some((item) => group.items.includes(item)) && (
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                )}
              </div>
              <span className="font-medium text-gray-900">{group.groupName}</span>
            </div>
            {expandedGroups.includes(group.groupName) ? (
              <Minus className="w-4 h-4 text-gray-500" />
            ) : (
              <Plus className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {/* Group Items */}
          {expandedGroups.includes(group.groupName) && (
            <div className="px-4 pb-4 space-y-2">
              {group.items.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selected.includes(item)
                      ? "border-primary bg-white"
                      : "border-gray-300"
                      }`}
                  >
                    {selected.includes(item) && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selected.includes(item)}
                    onChange={() => handleSelect(item)}
                  />
                  <span className="text-gray-700 text-sm">{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};