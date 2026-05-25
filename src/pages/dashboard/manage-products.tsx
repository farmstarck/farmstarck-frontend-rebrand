"use client";

import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Button from "@/ui/Button";
import ModalLayout from "@/layouts/ModalLayout";
import UploadProduct from "@/components/dashboard/merchant/UploadProduct";
import { MerchantProductCard } from "@/components/dashboard/merchant/MerchantProductCard";
import SearchAndFilter from "@/components/common/ui/SearchAndFilter";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useSellerGuard } from "@/hooks/useSellerGuard";
import React from "react";
import ProductService from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/common/ui/Pagination";
import { SellerOrderStatus } from "@/types/prisma-schema-types";
import ProductForm from "@/components/dashboard/merchant/ProductForm";
import { FilterOption } from "@/components/dashboard/buyer/ReusableFilter";

const ITEMS_PER_PAGE = 10;

const STOCK_STATUS_OPTIONS: FilterOption[] = [
  { value: "in_stock", label: "In Stock" },
  { value: "low_stock", label: "Low Stock" },
  { value: "out_of_stock", label: "Out of Stock" },
];

const APPROVAL_STATUS_OPTIONS: FilterOption[] = [
  { value: "pending", label: "Pending Approval" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const ManageProduct = () => {
  useSellerGuard();

  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined,
  );
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedApprovalStatuses, setSelectedApprovalStatuses] = useState<
    string[]
  >([]);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);
  const isDateRangeComplete = !!dateFrom && !!dateTo;

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedStatus, dateFrom, dateTo]);

  const params = useMemo(
    () => ({
      page,
      size: ITEMS_PER_PAGE,
      // status: selectedStatus as SellerOrderStatus,

      status: selectedStatuses[0],
      approvalStatus: selectedApprovalStatuses[0],

      date: isDateRangeComplete ? ("custom" as const) : undefined,
      startDate: isDateRangeComplete ? dateFrom : undefined,
      endDate: isDateRangeComplete ? dateTo : undefined,
      search: debouncedSearch || undefined,
    }),
    [
      page,
      selectedStatus,
      isDateRangeComplete,
      dateFrom,
      dateTo,
      debouncedSearch,
    ],
  );

  const { data, isLoading } = useQuery({
    queryKey: ["seller-products", params],
    queryFn: () => ProductService.getSellerProducts(params),
    select: (res: any) => ({
      products: res.data ?? [],
      totalPages: res.pagination?.totalPages ?? 1,
      totalRecords: res.pagination?.totalRecords ?? 0,
    }),
  });

  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleClear = () => {
    setSelectedStatus(undefined);
    setDateFrom("");
    setDateTo("");
    setSearch("");
    setPage(1);
  };

  return (
    <div className="w-full pb-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="px-3 gap-2 flex py-2.5 text-sm cursor-pointer bg-primary text-white rounded-md items-center"
        >
          <span className="rounded-full p-0.5 text-primary bg-white">
            <Plus size={18} />
          </span>
          Upload Product
        </button>
      </div>

      <div className="w-full bg-white min-h-[80vh] rounded-xl p-4">
        {/* Search + Filter */}
        <div className="mb-6">
          <SearchAndFilter
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search products..."
            statusText="Stock Status"
            statusOptions={STOCK_STATUS_OPTIONS}
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
            approvalStatusOptions={APPROVAL_STATUS_OPTIONS} // ← add
            selectedApprovalStatuses={selectedApprovalStatuses} // ← add
            setSelectedApprovalStatuses={setSelectedApprovalStatuses} // ← add
            onClearFilters={() => {
              setSelectedStatuses([]);
              setSelectedApprovalStatuses([]);
            }}
          />
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          /* Empty state */
          <div className="flex items-center flex-col gap-4 py-20 justify-center text-center">
            <Image
              alt="empty products"
              height={160}
              width={160}
              src="/assets/images/dashboard/merchant/outlet.png"
            />
            <p className="max-w-[260px] font-semibold text-gray-500 text-sm lg:text-base">
              {search || selectedStatus || dateFrom || dateTo
                ? "No products match your current filters."
                : "Your store is empty. Upload products and manage them here."}
            </p>
            {search || selectedStatus || dateFrom || dateTo ? (
              <button
                onClick={handleClear}
                className="text-sm text-white rounded-full font-semibold px-4 py-1.5 bg-primary"
              >
                Clear filters
              </button>
            ) : (
              <Button
                textClass="!rounded-full py-3 px-6"
                label="Upload product"
                showIcon
                icon="plus"
                onClick={() => setOpenModal(true)}
              />
            )}
          </div>
        ) : (
          /* Product list */
          <div className="flex flex-col gap-2.5">
            {products.map((product: any) => (
              <MerchantProductCard
                key={product.id}
                product={product}
                basePath="/dashboard/product"
              />
            ))}

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalItems={data?.totalRecords ?? 0}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            )}
          </div>
        )}
      </div>

      {openModal && (
        <ModalLayout onClose={() => setOpenModal(false)} maxWidth="max-w-2xl">
          <div className="h-[90vh] flex flex-col overflow-hidden rounded-2xl bg-white">
            <ProductForm onClose={() => setOpenModal(false)} />
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

ManageProduct.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default ManageProduct;
