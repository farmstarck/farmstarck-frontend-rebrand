"use client";
import { useNavigate } from "@/hooks/useNavigate";
import {
  MoreVertical,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ConfirmDeletion from "../ui/ConfirmDeletion";
import { Product } from "@/types/prisma-schema-types";
import ModalLayout from "@/layouts/ModalLayout";
import ProductForm from "./ProductForm";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import ProductService from "@/services/product.service";
import { SuccessMessage, ErrorMessage } from "@/utils/PageUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productMutations } from "@/queries/product.queries";

type StatusBadgeProps = { status: string; quantity: number; isActive: boolean };

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

const StatusBadge = ({ status, quantity, isActive }: StatusBadgeProps) => {
  // Deactivated overrides everything
  if (!isActive && status === "approved") {
    return (
      <span className="inline-block rounded-md px-2.5 py-1.5 text-sm font-semibold bg-gray-100 text-gray-500">
        Deactivated
      </span>
    );
  }

  const stockStatus =
    status === "approved"
      ? quantity === 0
        ? "out_of_stock"
        : quantity < 5
          ? "low_stock"
          : "approved"
      : status;

  const map: Record<string, { label: string; className: string }> = {
    approved: {
      label: `In Stock: ${quantity} units`,
      className: "bg-primary/10 text-primary",
    },
    low_stock: {
      label: `Low Stock: ${quantity} units`,
      className: "bg-orange-100 text-orange-600",
    },
    out_of_stock: {
      label: "Out of Stock",
      className: "bg-red-100 text-red-600",
    },
    pending: {
      label: "Pending Approval",
      className: "bg-yellow-100 text-yellow-700",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-100 text-red-600",
    },
  };

  const current = map[stockStatus] ?? map.pending;

  return (
    <span
      className={`inline-block rounded-md px-2.5 py-1.5 text-sm font-semibold ${current.className}`}
    >
      {current.label}
    </span>
  );
};

// ── Rejection details modal ────────────────────────────────────────
export type MerchantProductCardProduct = {
  id: string;
  userId: string;
  name: string;
  description: string;
  pricePerUnit: number;
  discountPerUnit: number;
  stockQuantity: number;
  categoryId: string;
  subcategoryId: string;
  countType?: string | null;
  weightRange?: string | null;
  volumeRange?: string | null;
  brand?: string | null;
  quantityType: string;
  condition: string;
  status: string;
  produceType?: string | null;
  quantityPerUnit?: number;
  isActive: boolean;
  sku: string;
  imageUrl: string;
  images: string[];
  location: string;
  locationLga?: string;
  rejectionReason?: string;
  rejectionScreenshots?: string[];
  ratingCount?: number;
  expiryDate?: string | Date | null;
  specifications?: Record<string, unknown> | null;
  ratingSum: number;
  popularity: number;
  viewCount: number;
  soldCount: number;
  deletedAt?: Date | null;
  createdAt?: Date | string;
  seller?: Product['seller'];
  reviews?: Product['reviews'];
};

const RejectionModal = ({
  product,
  onClose,
}: {
  product: MerchantProductCardProduct;
  onClose: () => void;
}) => (
  <ModalLayout onClose={onClose} maxWidth="max-w-lg">
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
          <AlertCircle size={20} className="text-red-500" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Product Rejected</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Review the feedback below and update your product accordingly.
          </p>
        </div>
      </div>

      {/* Product name */}
      <div className="mb-4 p-3 bg-gray-50 rounded-xl">
        <p className="text-xs text-gray-400 uppercase tracking-wide">Product</p>
        <p className="text-sm font-semibold text-gray-900 mt-0.5 capitalize">
          {product.name}
        </p>
      </div>

      {/* Rejection reason */}
      {product.rejectionReason && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Reason
          </p>
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-800 leading-relaxed">
              {product.rejectionReason}
            </p>
          </div>
        </div>
      )}

      {/* Screenshot — like Apple's rejection email */}
      {(product.rejectionScreenshots ?? []).length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Screenshots ({(product.rejectionScreenshots ?? []).length})
          </p>
          <div className="flex flex-col gap-3">
            {(product.rejectionScreenshots ?? []).map((url: string, i: number) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-gray-200"
              >
                <img
                  src={url}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full h-auto object-contain max-h-72"
                />
                <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Screenshot {i + 1}
                  </span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    <ImageIcon size={11} />
                    View full
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Close
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Edit Product
        </button>
      </div>
    </div>
  </ModalLayout>
);

export const MerchantProductCard = ({
  product,
  basePath = "/dashboard/merchant/product",
}: {
  product: MerchantProductCardProduct;
  basePath?: string;
}) => {
  const [more, setMore] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { navigate } = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMore(false);
      }
    };
    if (more) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [more]);

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: () => ProductService.deleteProduct(product.id),
    onSuccess: () => {
      SuccessMessage("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      setShowDeleteModal(false);
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const { mutate: toggleActive, isPending: isTogglingActive } = useMutation({
    ...productMutations.toggleActive(),
    onSuccess: (res: { message: string }) => {
      SuccessMessage(res.message);
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const isRejected = product.status === "rejected";
  const isPending = product.status === "pending";

  return (
    <>
      <div
        onClick={() => navigate(`${basePath}/${product.id}`)}
        className={`flex items-start gap-3 relative justify-between rounded-lg border bg-white p-2.5 cursor-pointer hover:shadow-sm transition-all ${
          isRejected
            ? "border-red-200 bg-red-50/30"
            : !product.isActive
              ? "border-gray-200 opacity-70"
              : "border-gray-300"
        }`}
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* Image with status tag overlay */}
          <div className="h-40 w-40 shrink-0 rounded-md overflow-hidden bg-gray-100 relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`h-full w-full object-cover ${!product.isActive ? "grayscale" : ""}`}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/160x160/f3f4f6/9ca3af?text=IMG";
              }}
            />

            {/* Status tag — top left corner */}
            {product.status === "pending" && (
              <span className="absolute top-2 left-2 bg-yellow-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide shadow-sm">
                Pending
              </span>
            )}
            {product.status === "rejected" && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide shadow-sm">
                Rejected
              </span>
            )}
            {!product.isActive && product.status === "approved" && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded-md">
                  Inactive
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-base md:text-xl font-semibold text-gray-800 truncate capitalize">
              {product.name}
            </p>
            <p className="text-sm md:text-base text-dark mt-0.5">
              Amount:{" "}
              <span className="font-bold">
                {formatNaira(product.pricePerUnit)}
              </span>
            </p>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              <StatusBadge
                status={product.status}
                quantity={product.stockQuantity}
                isActive={product.isActive}
              />

              {/* Rejection CTA */}
              {isRejected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRejectionModal(true);
                  }}
                  className="flex items-center gap-1 text-xs text-red-500 font-semibold hover:underline"
                >
                  <AlertCircle size={12} />
                  View reason
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT — Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMore((prev) => !prev);
            }}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400"
          >
            <MoreVertical size={16} />
          </button>

          {more && (
            <div className="absolute top-6 right-2 mt-1 w-52 font-semibold border border-gray-200 rounded-xl shadow-lg z-10 bg-white overflow-hidden">
              {/* Edit */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMore(false);
                  setShowUpdateForm(true);
                }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <Pencil size={14} className="text-gray-400" />
                Edit Product
              </button>

              {/* Toggle active — only for approved products */}
              {product.status === "approved" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMore(false);
                    toggleActive(product.id);
                  }}
                  disabled={isTogglingActive}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {product.isActive ? (
                    <>
                      <EyeOff size={14} className="text-orange-400" />
                      <span className="text-orange-600">Deactivate</span>
                    </>
                  ) : (
                    <>
                      <Eye size={14} className="text-green-500" />
                      <span className="text-green-600">Activate</span>
                    </>
                  )}
                </button>
              )}

              {/* View rejection reason */}
              {isRejected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMore(false);
                    setShowRejectionModal(true);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 flex items-center gap-2 text-red-500 transition-colors"
                >
                  <AlertCircle size={14} />
                  View Rejection Reason
                </button>
              )}

              <div className="border-t border-gray-100" />

              {/* Delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMore(false);
                  setShowDeleteModal(true);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <Trash2 size={14} />
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showUpdateForm && (
        <ModalLayout
          onClose={() => setShowUpdateForm(false)}
          maxWidth="max-w-2xl"
        >
          <div className="h-[90vh] flex flex-col overflow-hidden rounded-2xl bg-white">
            <ProductForm
              isEdit
              productId={product.id as string}
              initialData={{
                ...product,
                countType: product.countType ?? undefined,
                weightRange: product.weightRange ?? undefined,
                volumeRange: product.volumeRange ?? undefined,
                brand: product.brand ?? undefined,
                produceType: product.produceType ?? undefined,
                specifications: product.specifications ?? undefined,
              }}
              onClose={() => setShowUpdateForm(false)}
            />
          </div>
        </ModalLayout>
      )}

      {showRejectionModal && (
        <RejectionModal
          product={product}
          onClose={() => setShowRejectionModal(false)}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeletion
          closeModal={setShowDeleteModal}
          isOpen={showDeleteModal}
          onConfirm={deleteProduct}
          message="Are you sure you want to delete this product?"
          cancelText="No, go back"
          confirmText="Yes, Continue"
        />
      )}
    </>
  );
};
