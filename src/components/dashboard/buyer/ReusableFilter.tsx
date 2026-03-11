"use client";
import React, { useState } from "react";
import { X, Calendar as CalendarIcon } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export interface FilterOption {
  value: string;
  label: string;
}

interface Props {
  /** Main toggle */
  isOpen: boolean;
  onClose: () => void;
  statusText?:string;

  /** Status filter (required) */
  statusOptions?: FilterOption[];
  selectedStatuses?: string[];
  setSelectedStatuses?: (v: string[]) => void;

  /** Priority filter (optional) */
  showPriorityFilter?: boolean;
  priorityOptions?: FilterOption[];
  selectedPriorities?: string[];
  setSelectedPriorities?: (v: string[]) => void;

  /** Date filter (optional) */
  dateFrom?: string;
  dateTo?: string;
  setDateFrom?: (v: string) => void;
  setDateTo?: (v: string) => void;

  /** Action handlers */
  onClear: () => void;
}

const ReusableFilter = ({
  isOpen,
  onClose,
  statusOptions = [],
  selectedStatuses = [],
  setSelectedStatuses,
  showPriorityFilter = false,
  priorityOptions = [],
  selectedPriorities = [],
  setSelectedPriorities,
  statusText ="Status",
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  onClear,
}: Props) => {
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);

  if (!isOpen) return null;

  const toggleStatus = (value: string) => {
    if (!setSelectedStatuses) return;
    setSelectedStatuses(
      selectedStatuses.includes(value)
        ? selectedStatuses.filter((s) => s !== value)
        : [value]
    );
  };

  const togglePriority = (value: string) => {
    if (!setSelectedPriorities) return;
    setSelectedPriorities(
      selectedPriorities.includes(value)
        ? selectedPriorities.filter((p) => p !== value)
        : [value]
    );
  };

  const hasActiveFilters = 
    selectedStatuses.length > 0 || 
    selectedPriorities.length > 0 || 
    dateFrom || 
    dateTo;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Filter Panel - Always on right side */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            {/* STATUS FILTER */}
            {statusOptions.length > 0 && setSelectedStatuses && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Filter by {statusText}
                </h3>
                <div className="space-y-2">
                  {statusOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedStatuses.includes(opt.value)
                            ? "border-primary"
                            : "border-gray-300 group-hover:border-gray-400"
                        }`}
                      >
                        {selectedStatuses.includes(opt.value) && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedStatuses.includes(opt.value)}
                        onChange={() => toggleStatus(opt.value)}
                      />
                      <span className="text-sm text-gray-700">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PRIORITY FILTER (Optional) */}
            {showPriorityFilter && priorityOptions.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Filter by Priority
                </h3>
                <div className="space-y-2">
                  {priorityOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedPriorities.includes(opt.value)
                            ? "border-primary"
                            : "border-gray-300 group-hover:border-gray-400"
                        }`}
                      >
                        {selectedPriorities.includes(opt.value) && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedPriorities.includes(opt.value)}
                        onChange={() => togglePriority(opt.value)}
                      />
                      <span className="text-sm text-gray-700">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* DATE FILTER with Calendar */}
            {setDateFrom && setDateTo && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Filter by Date
                </h3>
                
                {/* From Date */}
                <div className="mb-3">
                  <label className="block text-xs text-gray-600 mb-1.5">
                    From
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowFromCalendar(!showFromCalendar);
                        setShowToCalendar(false);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex items-center justify-between"
                    >
                      <span className={dateFrom ? "text-gray-900" : "text-gray-400"}>
                        {dateFrom ? formatDate(dateFrom) : "Select date"}
                      </span>
                      <CalendarIcon size={16} className="text-gray-400" />
                    </button>
                    
                    {showFromCalendar && (
                      <div className="absolute top-full left-0 mt-1 z-10 bg-white shadow-lg rounded-lg border border-gray-200">
                        <style jsx global>{`
                          .react-calendar {
                            border: none;
                            font-family: inherit;
                            width: 280px;
                          }
                          .react-calendar__tile--active {
                            background: #1C7B48 !important;
                            color: white !important;
                          }
                          .react-calendar__tile--now {
                            background: #f0fdf4;
                          }
                          .react-calendar__tile:enabled:hover {
                            background: #f0fdf4;
                          }
                          .react-calendar__tile--active:enabled:hover {
                            background: #166534 !important;
                          }
                          .react-calendar__navigation button:enabled:hover {
                            background: #f0fdf4;
                          }
                        `}</style>
                        <Calendar
                          onChange={(value:any) => {
                            if (value instanceof Date) {
                              setDateFrom(value.toISOString().slice(0, 10));
                              setShowFromCalendar(false);
                            }
                          }}
                          value={dateFrom ? new Date(dateFrom) : new Date()}
                          maxDate={dateTo ? new Date(dateTo) : undefined}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* To Date */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1.5">
                    To
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowToCalendar(!showToCalendar);
                        setShowFromCalendar(false);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex items-center justify-between"
                    >
                      <span className={dateTo ? "text-gray-900" : "text-gray-400"}>
                        {dateTo ? formatDate(dateTo) : "Select date"}
                      </span>
                      <CalendarIcon size={16} className="text-gray-400" />
                    </button>
                    
                    {showToCalendar && (
                      <div className="absolute top-full left-0 mt-1 z-10 bg-white shadow-lg rounded-lg border border-gray-200">
                        <Calendar
                          onChange={(value:any) => {
                            if (value instanceof Date) {
                              setDateTo(value.toISOString().slice(0, 10));
                              setShowToCalendar(false);
                            }
                          }}
                          value={dateTo ? new Date(dateTo) : new Date()}
                          minDate={dateFrom ? new Date(dateFrom) : undefined}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 space-y-3">
            {hasActiveFilters && (
              <button
                onClick={() => {
                  onClear();
                }}
                className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                Clear Filters
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableFilter;