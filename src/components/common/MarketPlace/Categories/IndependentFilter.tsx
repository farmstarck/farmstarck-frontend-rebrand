import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

export interface CategoryGroup {
  groupName: string;
  items: string[];
}

export interface IndependentFilterProps {
  categoryGroups: CategoryGroup[];
  selected: string[];
  setSelected: (value: string[]) => void;
}

export const IndependentFilter: React.FC<IndependentFilterProps> = ({
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

  // Check if "Show All" is active for this group (no selection from this group)
  const isShowAllActive = (group: CategoryGroup): boolean => {
    const groupItems = group.items.filter(item => item !== "Show All");
    return !groupItems.some(item => selected.includes(item));
  };

  // Get the selected item for this group (if any)
  const getSelectedItemInGroup = (group: CategoryGroup): string | null => {
    const groupItems = group.items.filter(item => item !== "Show All");
    const selectedItem = groupItems.find(item => selected.includes(item));
    return selectedItem || null;
  };

  // Handle item selection (single select per group)
  const handleItemSelect = (item: string, group: CategoryGroup) => {
    const groupItems = group.items.filter(i => i !== "Show All");
    
    // If "Show All" is clicked, remove any selection from this group
    if (item === "Show All") {
      setSelected(selected.filter(s => !groupItems.includes(s)));
      return;
    }

    // Remove any previously selected item from this group
    const filteredSelected = selected.filter(s => !groupItems.includes(s));
    
    // If clicking the already selected item, deselect it (back to "Show All")
    if (selected.includes(item)) {
      setSelected(filteredSelected);
    } else {
      // Add the new selection from this group
      setSelected([...filteredSelected, item]);
    }
  };

  return (
    <div className="space-y-4">
      {categoryGroups.map((group) => {
        const showAllActive = isShowAllActive(group);

        return (
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
              <div className="px-2 pb-4 space-y-2">
                {group.items.map((item) => {
                  const isShowAll = item === "Show All";
                  const isChecked = isShowAll 
                    ? showAllActive
                    : selected.includes(item);

                  return (
                    <label
                      key={item}
                      className={`flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors `}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isChecked
                            ? "border-primary bg-white"
                            : "border-gray-300"
                        }`}
                      >
                        {isChecked && (
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <input
                        type="radio"
                        name={`filter-${group.groupName}`}
                        className="hidden"
                        checked={isChecked}
                        onChange={() => handleItemSelect(item, group)}
                      />
                      <span className={`text-sm ${isShowAll ? 'font-medium' : 'text-dark'}`}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};