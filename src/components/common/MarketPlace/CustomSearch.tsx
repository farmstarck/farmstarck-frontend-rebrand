import { XMarkIcon } from "@heroicons/react/24/solid";
import { SearchIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ProductService from "@/services/product.service";
import { useNavigate } from "@/hooks/useNavigate";
import { getEffectivePrice } from "@/utils/pricing.utils";

interface SearchProduct {
  id: string;
  name: string;
  pricePerUnit: number;
  discountPerUnit?: number | null;
  imageUrl: string;
  category: {
    name: string;
  };
}

const CustomSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [_, setModal] = useState(false);
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { navigate } = useNavigate();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setModal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!searchValue.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await ProductService.searchProducts(searchValue);
        setResults(data.data);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  return (
    <div className="w-full relative" ref={wrapperRef}>
      <div className="flex items-center gap-2">
        <SearchIcon className="w-5 h-5 text-primary" />

        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 text-dark border-none outline-none"
          placeholder="Search for products"
        />

        {searchValue && (
          <button
            onClick={() => {
              setSearchValue("");
              setOpen(false);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-12 -left-3 w-[calc(100vw-2rem)] px-5 md:w-full md:left-0 bg-white shadow-lg rounded-md max-h-80 overflow-y-auto z-50 p-4">
          {loading ? (
            <p className="text-center text-sm text-gray-500">Searching...</p>
          ) : results.length > 0 ? (
            <div className="flex flex-col gap-4">
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(
                      `${"/market/marketplace/product"}/${item.category?.name}/${item.id}`,
                    );
                    setOpen(false);
                    setSearchValue("");
                  }}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
                >
                  <Image
                    src={item.imageUrl}
                    height={40}
                    width={40}
                    alt={item.name}
                    className="object-contain"
                  />
                  <div>
                    <p className="text-sm font-bold capitalize text-dark">
                      {item.name}
                    </p>
                    <p className="text-xs font-semibold text-gray-600">
                      ₦{getEffectivePrice(item).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full text-center flex flex-col items-center ">
              {/* Replace src below with your PNG */}
              <div className="w-32 h-32 relative">
                <img
                  src="/assets/images/marketplaces/notfound.png"
                  alt="not found"
                  className="object-contain "
                />
              </div>

              <p className="font-semibold text-primary text-lg">Not Found</p>
              <p className="text-sm text-gray-500 max-w-xs mt-2">
                Sorry, the keyword you entered cannot be found. Please check
                again or search with another keyword.
              </p>

              <button className="mt-6 bg-primary text-white py-3 px-8 rounded-full">
                Request a Product
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSearch;
