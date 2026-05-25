"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MerchantProducts } from "@/data/ProductsData";
import { MerchantProductCard as ProductCard } from "@/components/dashboard/merchant/MerchantProductCard";
import { Product } from "@/types/prisma-schema-types";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const productImgPath = "/assets/images/dashboard/merchant";


const FilterModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 pt-24">
    <div className="w-80 rounded-xl bg-white shadow-xl p-5 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg"
      >
        ✕
      </button>
      <h3 className="font-semibold text-sm text-gray-700 mb-3">
        Filter By Status
      </h3>
      {["In Stock", "Out of Stock", "Low Stock", "Draft"].map((s) => (
        <label key={s} className="flex items-center gap-2 mb-2 cursor-pointer">
          <input type="radio" name="status" className="accent-green-500" />
          <span className="text-sm text-gray-700">{s}</span>
        </label>
      ))}

      <h3 className="font-semibold text-sm text-gray-700 mt-4 mb-3">
        Filter By Date
      </h3>
      <div className="flex gap-2">
        <div className="flex-1">
          <p className="text-xs text-gray-400 mb-1">From</p>
          <div className="flex items-center border border-gray-200 rounded-md px-2 py-1.5">
            <input type="date" className="text-xs text-gray-600 w-full outline-none" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-400 mb-1">To</p>
          <div className="flex items-center border border-gray-200 rounded-md px-2 py-1.5">
            <input type="date" className="text-xs text-gray-600 w-full outline-none" />
          </div>
        </div>
      </div>

      <button className="mt-4 w-full bg-green-500 text-white text-sm rounded-md py-2.5 font-medium hover:bg-green-600 transition-colors">
        Filter
      </button>
      <button className="mt-2 w-full border border-gray-200 text-gray-600 text-sm rounded-md py-2.5 font-medium hover:bg-gray-50 transition-colors">
        Reset Filter
      </button>
    </div>
  </div>
);

// ─── Manage Products Page ─────────────────────────────────────────────────────
const ManageProducts = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const onSelectProduct = () => {};

  const filtered = MerchantProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full pb-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold text-gray-800">Manage Products</h1>
        <button
          onClick={() => {}}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-md transition-colors"
        >
          <span className="bg-white text-green-500 rounded-full p-0.5">
            <Plus size={14} />
          </span>
          Upload Product
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2">
          <Search size={14} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="text-sm text-gray-700 outline-none w-full bg-transparent"
          />
        </div>
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 text-xs font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Filter size={13} />
          Filter
        </button>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-2.5">
        {paginated.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-md border border-gray-200 text-gray-500 disabled:opacity-40 hover:bg-gray-50"
          >
            <ChevronLeft size={14} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0, 3)
            .map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-7 w-7 rounded-md text-xs font-medium transition-colors ${
                  page === n
                    ? "bg-green-500 text-white"
                    : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}

          {totalPages > 3 && (
            <>
              <span className="text-gray-400 text-xs">…</span>
              {[8, 9, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="h-7 w-7 rounded-md text-xs font-medium border border-gray-200 text-gray-500 hover:bg-gray-50"
                >
                  {n}
                </button>
              ))}
            </>
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded-md border border-gray-200 text-gray-500 disabled:opacity-40 hover:bg-gray-50"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Filter Modal */}
      {showFilter && <FilterModal onClose={() => setShowFilter(false)} />}
    </div>
  );
};

export { ManageProducts, MerchantProducts };
export type { Product };
export default ManageProducts;