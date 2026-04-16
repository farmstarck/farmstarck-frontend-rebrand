"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** How many numbered buttons to show around the current page (default 2) */
  siblingCount?: number;
  /** Show "X of Y results" label (default true) */
  showLabel?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showLabel = true,
  totalItems,
  itemsPerPage,
}) => {
  if (totalPages <= 1) return null;

  /** Build page number array with ellipsis represented as -1 */
  const buildPages = (): (number | -1)[] => {
    const totalShown = siblingCount * 2 + 5; // siblings + first + last + 2 dots + current

    if (totalPages <= totalShown) return range(1, totalPages);

    const leftSib = Math.max(currentPage - siblingCount, 1);
    const rightSib = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSib > 2;
    const showRightDots = rightSib < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + siblingCount * 2);
      return [...leftRange, -1, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = range(totalPages - (3 + siblingCount * 2) + 1, totalPages);
      return [1, -1, ...rightRange];
    }

    return [1, -1, ...range(leftSib, rightSib), -1, totalPages];
  };

  const pages = buildPages();

  const itemBase =
    "min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors select-none";
  const active =
    "bg-primary text-white shadow-sm";
  const inactive =
    "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 cursor-pointer";
  const arrowBase =
    "h-9 px-3 flex items-center gap-1 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  const labelText = (() => {
    if (!showLabel || !totalItems || !itemsPerPage) return null;
    const from = (currentPage - 1) * itemsPerPage + 1;
    const to = Math.min(currentPage * itemsPerPage, totalItems);
    return `${from}–${to} of ${totalItems}`;
  })();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4">
      {/* Label */}
      <p className="text-sm text-gray-500 order-2 sm:order-1">
        {labelText ? (
          <>Showing <span className="font-semibold text-gray-700">{labelText}</span> results</>
        ) : (
          <>Page <span className="font-semibold text-gray-700">{currentPage}</span> of <span className="font-semibold text-gray-700">{totalPages}</span></>
        )}
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={arrowBase}
          aria-label="Previous page"
        >
          <ChevronLeft size={15} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Pages */}
        {pages.map((p, idx) =>
          p === -1 ? (
            <span
              key={`dot-${idx}`}
              className="min-w-[36px] h-9 flex items-center justify-center text-gray-400 text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`${itemBase} ${p === currentPage ? active : inactive}`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={arrowBase}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
