"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
  step?: number;
  formatValue?: (value: number) => string;
}

const PriceRangeSlider = ({
  min,
  max,
  minValue,
  maxValue,
  onChange,
  step = 500,
  formatValue = (v) => `₦${v.toLocaleString()}`,
}: PriceRangeSliderProps) => {
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);

  const getPercentage = (value: number) =>
    max === min ? 0 : ((value - min) / (max - min)) * 100;

  const getValueFromPosition = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const position = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = min + position * (max - min);
      const stepped = Math.round(rawValue / step) * step;
      return Math.min(max, Math.max(min, stepped));
    },
    [min, max, step],
  );

  // ── Mouse: min ────────────────────────────────────────────────────
  const handleMouseMoveMin = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingMin) return;
      const value = getValueFromPosition(e.clientX);
      if (value < maxValue) onChange(value, maxValue);
    },
    [isDraggingMin, maxValue, onChange, getValueFromPosition],
  );

  // ── Mouse: max ────────────────────────────────────────────────────
  const handleMouseMoveMax = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingMax) return;
      const value = getValueFromPosition(e.clientX);
      if (value > minValue) onChange(minValue, value);
    },
    [isDraggingMax, minValue, onChange, getValueFromPosition],
  );

  const handleMouseUp = useCallback(() => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  }, []);

  useEffect(() => {
    if (!isDraggingMin) return;
    window.addEventListener("mousemove", handleMouseMoveMin);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveMin);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingMin, handleMouseMoveMin, handleMouseUp]);

  useEffect(() => {
    if (!isDraggingMax) return;
    window.addEventListener("mousemove", handleMouseMoveMax);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveMax);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingMax, handleMouseMoveMax, handleMouseUp]);

  // ── Touch: min — must use passive:false to call preventDefault ────
  const handleTouchMoveMin = useCallback(
    (e: TouchEvent) => {
      e.preventDefault(); // blocks page scroll while dragging
      const value = getValueFromPosition(e.touches[0].clientX);
      if (value < maxValue) onChange(value, maxValue);
    },
    [maxValue, onChange, getValueFromPosition],
  );

  // ── Touch: max ────────────────────────────────────────────────────
  const handleTouchMoveMax = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      const value = getValueFromPosition(e.touches[0].clientX);
      if (value > minValue) onChange(minValue, value);
    },
    [minValue, onChange, getValueFromPosition],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  }, []);

  // Attach touch listeners imperatively so { passive: false } is honoured
  useEffect(() => {
    const el = minThumbRef.current;
    if (!el) return;
    el.addEventListener("touchmove", handleTouchMoveMin, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);
    return () => {
      el.removeEventListener("touchmove", handleTouchMoveMin);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchMoveMin, handleTouchEnd]);

  useEffect(() => {
    const el = maxThumbRef.current;
    if (!el) return;
    el.addEventListener("touchmove", handleTouchMoveMax, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);
    return () => {
      el.removeEventListener("touchmove", handleTouchMoveMax);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchMoveMax, handleTouchEnd]);

  const minPct = getPercentage(minValue);
  const maxPct = getPercentage(maxValue);

  return (
    <div className="w-full px-1 py-3 select-none" style={{ touchAction: "none" }}>
      {/* Current value labels */}
      <div className="flex justify-between mb-3">
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          {formatValue(minValue)}
        </span>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          {formatValue(maxValue)}
        </span>
      </div>

      {/* Track */}
      <div ref={trackRef} className="relative h-1.5 rounded-full bg-gray-200 mx-2.5">
        {/* Active range highlight */}
        <div
          className="absolute h-full rounded-full bg-primary"
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
        />

        {/* Min thumb */}
        <div
          ref={minThumbRef}
          onMouseDown={(e) => { e.preventDefault(); setIsDraggingMin(true); }}
          onTouchStart={(e) => { e.preventDefault(); setIsDraggingMin(true); }}
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-primary shadow-md cursor-grab active:cursor-grabbing transition-transform ${
            isDraggingMin ? "scale-125" : "hover:scale-110"
          }`}
          style={{ left: `${minPct}%`, zIndex: isDraggingMin ? 30 : 20 }}
        />

        {/* Max thumb */}
        <div
          ref={maxThumbRef}
          onMouseDown={(e) => { e.preventDefault(); setIsDraggingMax(true); }}
          onTouchStart={(e) => { e.preventDefault(); setIsDraggingMax(true); }}
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-primary shadow-md cursor-grab active:cursor-grabbing transition-transform ${
            isDraggingMax ? "scale-125" : "hover:scale-110"
          }`}
          style={{ left: `${maxPct}%`, zIndex: isDraggingMax ? 30 : 20 }}
        />
      </div>

      {/* Bound labels */}
      <div className="flex justify-between mt-2.5">
        <span className="text-[10px] text-gray-400">{formatValue(min)}</span>
        <span className="text-[10px] text-gray-400">{formatValue(max)}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
