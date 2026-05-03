 "use client";
import { merchantProductProps } from "@/data/ProductsData";
import { useNavigate } from "@/hooks/useNavigate";
import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ConfirmDeletion from "../ui/ConfirmDeletion";

type StatusBadgeProps = { status: string; quantity: number };


const formatNaira = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

const StatusBadge = ({ status, quantity }: StatusBadgeProps) => {
  const map: Record<string, { label: string; className: string }> = {
    active: {
      label: `Stock: ${quantity} units`,
      className: "bg-primary text-white",
    },
    low_stock: {
      label: `Stock Low: ${quantity} units`,
      className: "bg-orange-100 text-orange-600",
    },
    out_of_stock: {
      label: "Stock Out of Stock",
      className: "bg-red-100 text-red-600",
    },
    draft: {
      label: "Draft",
      className: "bg-gray-100 text-gray-500",
    },
  };

  const { label, className } = map[status] ?? map.draft;

  return (
    <span
      className={`inline-block rounded-md px-2.5 py-1.5 text-sm font-semibold ${className}`}
    >
      {label}
    </span>
  );
};




 

export const MerchantProductCard = ({ product }: { product: merchantProductProps }) => {
  const [more, setMore] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const {navigate} = useNavigate()


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMore(false);
      }
    };

    if (more) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [more]);


  const handleConfirm = () =>{
    console.log("deleted")
    setShowDeleteModal(false)
  }

  

  return (
    <>
      <div 
      onClick={() => navigate(`/dashboard/merchant/product/${product.id}`)}
      className="flex items-start gap-3 relative justify-between rounded-lg border border-gray-300 bg-white p-2.5 cursor-pointer hover:shadow-sm transition-shadow">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
          
          {/* Image */}
          <div className="h-40 w-40 shrink-0 rounded-md overflow-hidden bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/56x56/f3f4f6/9ca3af?text=IMG";
              }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-base md:text-xl font-semibold text-gray-800 truncate">
              {product.name}
            </p>

            <p className="text-sm md:text-base text-dark mt-0.5">
              Amount:{" "}
              <span className="font-bold">
                {formatNaira(product.pricePerUnit)}
              </span>
            </p>

            <div className="mt-1">
              <StatusBadge
                status={product.status}
                quantity={product.stockQuantity}
              />
            </div>
          </div>
        </div>

        {/* RIGHT (Dropdown) */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setMore((prev) => !prev)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400"
          >
            <MoreVertical size={16} />
          </button>

          {more && (
            <div className="absolute top-6 right-2 mt-1 w-52 font-semibold border border-gray-300 rounded-md shadow-lg z-10 bg-white">
              
              {/* EDIT */}
              <button
                onClick={() => {
                  setMore(false);
                  navigate(`/merchant/products/edit/${product.id}`);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Edit Product
              </button>

              {/* DELETE */}
              <button
                onClick={() => {
                  setMore(false);
                  setShowDeleteModal(true);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
              >
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <ConfirmDeletion 
        closeModal={setShowDeleteModal}
        isOpen={showDeleteModal}
        onConfirm={handleConfirm}
        message="Are you sure you want to delete this product?"
        cancelText="No, go back"
        confirmText="Yes, Continue"
        />
      )}
    </>
  );
};
 