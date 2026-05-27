"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const PRICE_MIN = 0;
const PRICE_MAX = 500_000;
const STEP = 1_000;

interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onChange: (min: number | undefined, max: number | undefined) => void;
}

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  onChange,
}: PriceRangeFilterProps) => {
  const [localMin, setLocalMin] = useState<number>(minPrice ?? PRICE_MIN);
  const [localMax, setLocalMax] = useState<number>(maxPrice ?? PRICE_MAX);
  const [minInput, setMinInput] = useState<string>(String(minPrice ?? PRICE_MIN));
  const [maxInput, setMaxInput] = useState<string>(String(maxPrice ?? PRICE_MAX));
  const [minError, setMinError] = useState<string>("");
  const [maxError, setMaxError] = useState<string>("");

  const trackRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDraggingMin = useRef(false);
  const isDraggingMax = useRef(false);

  // ── Sync when parent clears the filter externally (e.g. clearAll) ─
  useEffect(() => {
    setLocalMin(minPrice ?? PRICE_MIN);
    setLocalMax(maxPrice ?? PRICE_MAX);
    setMinInput(String(minPrice ?? PRICE_MIN));
    setMaxInput(String(maxPrice ?? PRICE_MAX));
    setMinError("");
    setMaxError("");
  }, [minPrice, maxPrice]);

  // ── Debounced API call ────────────────────────────────────────────
  const emitChange = useCallback(
    (min: number, max: number) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange(
          min === PRICE_MIN ? undefined : min,
          max === PRICE_MAX ? undefined : max,
        );
      }, 600);
    },
    [onChange],
  );

  // ── Text input handlers ───────────────────────────────────────────
  const handleMinInput = (raw: string) => {
    setMinInput(raw);
    setMinError("");

    const num = Number(raw.replace(/,/g, ""));
    if (raw === "" || isNaN(num)) return;

    if (num < 0) {
      setLocalMin(0);
      setMinInput("0");
      emitChange(0, localMax);
      return;
    }
    if (num >= localMax) {
      setMinError("Min price must be less than max price");
      return;
    }

    setLocalMin(num);
    emitChange(num, localMax);
  };

  const handleMaxInput = (raw: string) => {
    setMaxInput(raw);
    setMaxError("");

    const num = Number(raw.replace(/,/g, ""));
    if (raw === "" || isNaN(num)) return;

    if (num > PRICE_MAX) {
      setMaxError(`Maximum price is ₦${PRICE_MAX.toLocaleString()}`);
      setLocalMax(PRICE_MAX);
      emitChange(localMin, PRICE_MAX);
      return;
    }
    if (num <= localMin) {
      setMaxError("Max price must be greater than min price");
      return;
    }

    setLocalMax(num);
    emitChange(localMin, num);
  };

  // ── Sync slider → inputs ─────────────────────────────────────────
  const updateFromSlider = useCallback(
    (min: number, max: number) => {
      setLocalMin(min);
      setLocalMax(max);
      setMinInput(String(min));
      setMaxInput(String(max));
      setMinError("");
      setMaxError("");
      emitChange(min, max);
    },
    [emitChange],
  );

  // ── Slider helpers ────────────────────────────────────────────────
  const getPercentage = (value: number) =>
    ((value - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const getValueFromClientX = useCallback((clientX: number): number => {
    if (!trackRef.current) return PRICE_MIN;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const raw = PRICE_MIN + ratio * (PRICE_MAX - PRICE_MIN);
    return Math.round(raw / STEP) * STEP;
  }, []);

  // ── Mouse drag ────────────────────────────────────────────────────
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingMin.current) {
        const val = getValueFromClientX(e.clientX);
        if (val < localMax) updateFromSlider(val, localMax);
      }
      if (isDraggingMax.current) {
        const val = getValueFromClientX(e.clientX);
        if (val > localMin) updateFromSlider(localMin, val);
      }
    };
    const onMouseUp = () => {
      isDraggingMin.current = false;
      isDraggingMax.current = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [localMin, localMax, getValueFromClientX, updateFromSlider]);

  // ── Touch drag — passive:false so preventDefault works ───────────
  useEffect(() => {
    const minEl = minThumbRef.current;
    const maxEl = maxThumbRef.current;
    if (!minEl || !maxEl) return;

    const onMinTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const val = getValueFromClientX(e.touches[0].clientX);
      if (val < localMax) updateFromSlider(val, localMax);
    };
    const onMaxTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const val = getValueFromClientX(e.touches[0].clientX);
      if (val > localMin) updateFromSlider(localMin, val);
    };
    const onTouchEnd = () => {
      isDraggingMin.current = false;
      isDraggingMax.current = false;
    };

    minEl.addEventListener("touchmove", onMinTouchMove, { passive: false });
    minEl.addEventListener("touchend", onTouchEnd);
    maxEl.addEventListener("touchmove", onMaxTouchMove, { passive: false });
    maxEl.addEventListener("touchend", onTouchEnd);

    return () => {
      minEl.removeEventListener("touchmove", onMinTouchMove);
      minEl.removeEventListener("touchend", onTouchEnd);
      maxEl.removeEventListener("touchmove", onMaxTouchMove);
      maxEl.removeEventListener("touchend", onTouchEnd);
    };
  }, [localMin, localMax, getValueFromClientX, updateFromSlider]);

  const minPct = getPercentage(localMin);
  const maxPct = getPercentage(localMax);
  const isFiltered = localMin > PRICE_MIN || localMax < PRICE_MAX;

  return (
    <div className="w-full flex flex-col gap-3 select-none">

      {/* ── Text inputs ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-2">
        {/* Min */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            Min Price
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:border-primary transition-colors">
            <span className="text-gray-400 text-sm mr-1">₦</span>
            <input
              type="number"
              inputMode="numeric"
              value={minInput}
              onChange={(e) => handleMinInput(e.target.value)}
              onBlur={() => {
                if (minInput === "" || isNaN(Number(minInput))) {
                  setMinInput("0");
                  setLocalMin(0);
                  emitChange(0, localMax);
                }
              }}
              placeholder="0"
              className="w-full text-sm font-semibold text-gray-900 outline-none bg-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          {minError && (
            <p className="text-[10px] text-red-500 font-medium">{minError}</p>
          )}
        </div>

        {/* Max */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            Max Price
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:border-primary transition-colors">
            <span className="text-gray-400 text-sm mr-1">₦</span>
            <input
              type="number"
              inputMode="numeric"
              value={maxInput}
              onChange={(e) => handleMaxInput(e.target.value)}
              onBlur={() => {
                if (maxInput === "" || isNaN(Number(maxInput))) {
                  setMaxInput(String(PRICE_MAX));
                  setLocalMax(PRICE_MAX);
                  emitChange(localMin, PRICE_MAX);
                }
              }}
              placeholder={String(PRICE_MAX)}
              className="w-full text-sm font-semibold text-gray-900 outline-none bg-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          {maxError && (
            <p className="text-[10px] text-red-500 font-medium">{maxError}</p>
          )}
        </div>
      </div>

      {/* ── Dual slider ────────────────────────────────────────── */}
      <div className="px-2.5 pt-2 pb-1" style={{ touchAction: "none" }}>
        <div ref={trackRef} className="relative h-1.5 rounded-full bg-gray-200">
          {/* Active range */}
          <div
            className="absolute h-full rounded-full bg-primary"
            style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
          />

          {/* Min thumb */}
          <div
            ref={minThumbRef}
            onMouseDown={(e) => {
              e.preventDefault();
              isDraggingMin.current = true;
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              isDraggingMin.current = true;
            }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-primary shadow-md cursor-grab active:cursor-grabbing active:scale-125 transition-transform"
            style={{ left: `${minPct}%`, zIndex: 20 }}
          />

          {/* Max thumb */}
          <div
            ref={maxThumbRef}
            onMouseDown={(e) => {
              e.preventDefault();
              isDraggingMax.current = true;
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              isDraggingMax.current = true;
            }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-primary shadow-md cursor-grab active:cursor-grabbing active:scale-125 transition-transform"
            style={{ left: `${maxPct}%`, zIndex: 20 }}
          />
        </div>

        {/* Bound labels */}
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-gray-400">₦0</span>
          <span className="text-[10px] text-gray-400">
            ₦{PRICE_MAX.toLocaleString()}
          </span>
        </div>
      </div>

      {/* ── Active range summary ────────────────────────────────── */}
      {isFiltered && (
        <div className="flex items-center justify-between bg-primary/5 rounded-xl px-3 py-2">
          <p className="text-xs font-semibold text-primary">
            ₦{localMin.toLocaleString()} — ₦{localMax.toLocaleString()}
          </p>
          <button
            onClick={() => {
              setLocalMin(PRICE_MIN);
              setLocalMax(PRICE_MAX);
              setMinInput("0");
              setMaxInput(String(PRICE_MAX));
              setMinError("");
              setMaxError("");
              if (debounceRef.current) clearTimeout(debounceRef.current);
              onChange(undefined, undefined);
            }}
            className="text-[10px] text-gray-400 hover:text-red-500 font-semibold transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceRangeFilter;
