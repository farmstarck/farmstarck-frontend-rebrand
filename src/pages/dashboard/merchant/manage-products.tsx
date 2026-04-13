"use client";

import { Plus } from "lucide-react";
import { MerchantProducts } from "@/data/ProductsData";
import { useState } from "react";
import Image from "next/image";
import Button from "@/ui/Button";
import ModalLayout from "@/layouts/ModalLayout";
import UploadProduct from "@/components/dashboard/merchant/UploadProduct";
import { MerchantProductCard } from "@/components/dashboard/merchant/MerchantProductCard";
import CustomSearch from "@/components/common/MarketPlace/CustomSearch";
import SearchAndFilter from "@/components/common/ui/SearchAndFilter";

const ManageProduct = () => {
  const [openModal, setOpenModal] = useState(false);

  const prodImg = `/assets/images/dashboard/merchant/outlet.png`;

  const [search, setSearch] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const filtered = MerchantProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="w-full pb-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Products</h1>

        {MerchantProducts.length > 1 && (
          <div
            onClick={() => setOpenModal(true)}
            className="px-2.5 gap-2 flex py-2.5 text-sm cursor-pointer bg-primary text-white rounded-md"
          >
            <span className="rounded-full p-0.5 text-primary bg-white">
              <Plus size={18} />
            </span>
            Upload Product
          </div>
        )}
      </div>

      <div className="mt-5 w-full bg-white min-h-[100vh] rounded-md p-3">
        {MerchantProducts.length > 10 ? (
          <div className="flex items-center flex-col gap-3 h-[90dvh] justify-center">
            <Image alt="product-img" height={200} width={200} src={prodImg} />
            <div className="max-w-[260px] text-center font-bold text-sm lg:text-lg">
              Your store is empty. Upload products and manage them here
            </div>

            <div className="w-full flex items-center justify-center">
              <Button
                textClass="!w-1/3 !rounded-full py-3"
                label="Upload product"
                showIcon={true}
                icon="plus"
                onClick={() => setOpenModal(true)}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
           <div className="w-full mb-10 flex items-center justify-between">
            <SearchAndFilter
              search={search}
              onSearchChange={val => { setSearch(val); setPage(1) }}
              searchPlaceholder="Search by product name"
              statusOptions={[
                { value: "active", label: "In Stock" },       
                { value: "out_of_stock", label: "Out of Stock" },
                { value: "low_stock", label: "Low Stock" },
                { value: "draft", label: "Draft" },
              ]}
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
              dateFrom={dateFrom}
              dateTo={dateTo}
              setDateFrom={setDateFrom}
              setDateTo={setDateTo}
              onClearFilters={() => { setSelectedStatuses([]); setDateFrom(''); setDateTo(''); setPage(1) }}
            />
           </div>

            <div className="flex flex-col gap-2.5">
            {paginated.map((product) => (
              <MerchantProductCard key={product.id} product={product} />
            ))}
          </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <ModalLayout onClose={() => setOpenModal(false)}>
          <UploadProduct setOpenModal={setOpenModal} />
        </ModalLayout>
      )}
    </div>
  );
};

export default ManageProduct;
