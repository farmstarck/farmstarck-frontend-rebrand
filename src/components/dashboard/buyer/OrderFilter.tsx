"use client";
import React from "react";
import { X } from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Props {
  selectedStatuses: string[];
  setSelectedStatuses: (v: string[]) => void;
  dateFrom: string;
  dateTo: string;
  setDateFrom: (v: string) => void;
  setDateTo: (v: string) => void;
  onClear: () => void;
  onClose: () => void;
  statusOptions: { value: string; label: string }[];
}

const OrderFilter = ({
  selectedStatuses,
  setSelectedStatuses,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  onClear,
  onClose,
  statusOptions,
}: Props) => {
  const handleStatusToggle = (value: string) => {
    setSelectedStatuses(
      selectedStatuses.includes(value)
        ? selectedStatuses.filter((s) => s !== value)
        : [value]
    );
  };

  return (
    <div className="p-4 lg:p-6  bg-gray-50 border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">Filters</h2>
        <button
          onClick={onClose}
          className="lg:hidden p-1 hover:bg-gray-200 rounded"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* STATUS FILTER */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Filter By Status</h3>
          <div className="space-y-2">
            {statusOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              >
                {/* CUSTOM CHECK INDICATOR LIKE YOUR SAMPLE */}
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    selectedStatuses.includes(opt.value)
                      ? "border-primary bg-white"
                      : "border-gray-300"
                  }`}
                >
                  {selectedStatuses.includes(opt.value) && (
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  )}
                </div>

                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedStatuses.includes(opt.value)}
                  onChange={() => handleStatusToggle(opt.value)}
                />

                <span className="text-gray-700 text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* DATE FILTER */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Filter By Date</h3>

          <DateRange
            ranges={[
              {
                startDate: dateFrom ? new Date(dateFrom) : new Date(),
                endDate: dateTo ? new Date(dateTo) : new Date(),
                key: "selection",
              },
            ]}
            onChange={(range) => {
              setDateFrom(range.selection.startDate!.toISOString().slice(0, 10));
              setDateTo(range.selection.endDate!.toISOString().slice(0, 10));
            }}
            rangeColors={["#1C7B48"]} // your primary color
            color="#1C7B48"
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={onClear}
          className="w-fit  px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors"
        >
          Clear Filters
        </button>

        <button
          onClick={onClose}
          className="w-fit px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default OrderFilter;
