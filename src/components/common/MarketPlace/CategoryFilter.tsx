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

  // ✅ Modified: Single selection per group (independent categories)
  const handleSelect = (item: string, groupName: string) => {
    // Remove any previously selected item from this specific group
    const itemsInCurrentGroup = categoryGroups.find(g => g.groupName === groupName)?.items || [];
    const filteredSelected = selected.filter(s => !itemsInCurrentGroup.includes(s));
    
    // If clicking the already selected item, just deselect it
    if (selected.includes(item)) {
      setSelected(filteredSelected);
    } else {
      // Add the new selection from this group
      setSelected([...filteredSelected, item]);
    }
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
            <div className="px-1 pb-4 space-y-2">
              {group.items.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selected.includes(item)
                        ? "border-primary bg-white"
                        : "border-gray-300"
                    }`}
                  >
                    {selected.includes(item) && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <input
                    type="radio"
                    name={`category-filter-${group.groupName}`}
                    className="hidden"
                    checked={selected.includes(item)}
                    onChange={() => handleSelect(item, group.groupName)}
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