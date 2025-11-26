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

  // Check if all items in a group are selected (excluding "Show All")
  const isGroupFullySelected = (group: CategoryGroup): boolean => {
    const groupItems = group.items.filter(item => item !== "Show All");
    return groupItems.every(item => selected.includes(item));
  };

  // Check if any item in a group is selected
  const isGroupPartiallySelected = (group: CategoryGroup): boolean => {
    const groupItems = group.items.filter(item => item !== "Show All");
    return groupItems.some(item => selected.includes(item));
  };

  // Handle "Show All" toggle for a specific group
  const handleShowAllToggle = (group: CategoryGroup) => {
    const groupItems = group.items.filter(item => item !== "Show All");
    const allSelected = isGroupFullySelected(group);

    if (allSelected) {
      // Uncheck all items in this group
      setSelected(selected.filter(item => !groupItems.includes(item)));
    } else {
      // Check all items in this group
      const newSelected = [...selected];
      groupItems.forEach(item => {
        if (!newSelected.includes(item)) {
          newSelected.push(item);
        }
      });
      setSelected(newSelected);
    }
  };

  // Handle individual item selection
  const handleItemSelect = (item: string, group: CategoryGroup) => {
    if (item === "Show All") {
      handleShowAllToggle(group);
      return;
    }

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
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isGroupPartiallySelected(group)
                    ? "border-primary bg-white"
                    : "border-gray-300"
                }`}
              >
                {isGroupPartiallySelected(group) && (
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                )}
              </div>
              <span className="font-medium text-gray-900">{group.groupName}</span>
              {isGroupPartiallySelected(group) && (
                <span className="text-xs text-primary font-medium">
                  ({group.items.filter(item => item !== "Show All" && selected.includes(item)).length})
                </span>
              )}
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
              {group.items.map((item) => {
                const isShowAll = item === "Show All";
                const isChecked = isShowAll 
                  ? isGroupFullySelected(group)
                  : selected.includes(item);

                return (
                  <label
                    key={item}
                    className={`flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors ${
                      isShowAll ? " mt-2" : ""
                    }`}
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
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={() => handleItemSelect(item, group)}
                    />
                    <span className={`text-sm text-dark`}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};