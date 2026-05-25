import React, { useEffect, useState } from "react";
import { ChevronLeft, Trash2, Edit } from "lucide-react";
import { useRouter } from "next/router";
import ProductModal from "@/components/dashboard/merchant/ProductModal";
import ConfirmDeletion from "@/components/dashboard/ui/ConfirmDeletion";
import ProductService from "@/services/product.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useSellerGuard } from "@/hooks/useSellerGuard";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import ModalLayout from "@/layouts/ModalLayout";
import UpdateProduct from "@/components/dashboard/merchant/UpdateProduct";
import ProductForm from "@/components/dashboard/merchant/ProductForm";

const SingleProduct = () => {
  useSellerGuard();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [showTransitions, setShowTransitions] = useState(false);
  const [screen, setScreen] = useState<"confirm" | "success" | "loading">(
    "confirm",
  );

  // ── Query ─────────────────────────────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey: ["seller-product", id as string],
    queryFn: () => ProductService.getSellerProductById(id as string),
    enabled: !!id,
    select: (res: any) => res.data,
  });

  const productData = data?.data ?? null;

  // ── Populate images from real data ───────────────────────────────
  useEffect(() => {
    if (productData) {
      const imgs: string[] = [];
      if (productData.imageUrl) imgs.push(productData.imageUrl);
      if (productData.images?.length) imgs.push(...productData.images);
      setDisplayImages(imgs);
    }
  }, [productData]);

  // ── Delete mutation ───────────────────────────────────────────────
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: () => ProductService.deleteProduct(id as string),
    onSuccess: () => {
      SuccessMessage("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      router.push("/dashboard/manage-products");
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const newUrl = URL.createObjectURL(e.target.files[0]);
      setDisplayImages((prev) => {
        const updated = [...prev];
        updated[index] = newUrl;
        return updated;
      });
    }
  };

  if (isLoading || !router.isReady) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="w-full flex-col flex items-center justify-center py-20 gap-4">
        <p className="text-gray-500 font-medium text-lg">Product not found.</p>
        <button
          onClick={() => router.back()}
          className="text-primary font-bold hover:underline"
        >
          Go back to products
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="w-full pb-10 mx-auto p-2 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 flex items-center justify-center bg-transparent border border-gray-400 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft
                size={16}
                className="text-gray-900"
                strokeWidth={3}
              />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">
              Product Details
            </h1>
          </div>

          <button
            onClick={() => setShowDeleteModal(true)}
            disabled={isDeleting}
            className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-semibold px-4 py-2 sm:py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 size={16} />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-6 sm:p-8">
          <h2 className="text-sm font-extrabold text-gray-900 mb-6 uppercase tracking-widest">
            PRODUCT ID: {productData.sku}
          </h2>

          {/* Info Grid */}
          <div className="flex flex-col gap-4 text-xs sm:text-sm mb-8">
            {[
              { label: "Product Name", value: productData.name },
              { label: "Location", value: productData.location },
              {
                label: "Price",
                value: `₦${Number(productData.pricePerUnit).toLocaleString()}`,
              },
              {
                label: "Discount",
                value:
                  productData.discountPerUnit > 0
                    ? `₦${Number(productData.discountPerUnit).toLocaleString()}`
                    : "N/A",
              },
              { label: "Type", value: productData.produceType || "N/A" },
              {
                label: "Quantity Type",
                value: productData.quantityType || "N/A",
              },
              { label: "Count", value: productData.countType || "N/A" },
              {
                label: "Stock",
                value:
                  productData.stockQuantity > 0
                    ? `In Stock (${productData.stockQuantity} units)`
                    : "Out of Stock",
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">{label}:</span>
                <span className="font-bold text-gray-800 capitalize">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <hr className="border-gray-200 mb-6" />

          {/* Images Gallery */}
          <div className="mb-8">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-4">
              Product Images
            </h3>
            {displayImages.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {displayImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-40 w-40 shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200 group"
                  >
                    <img
                      src={img}
                      alt={`Product Image ${idx + 1}`}
                      className="h-full w-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
                      onClick={() => setLightboxImg(img)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/500x500/f3f4f6/9ca3af?text=Not+Found";
                      }}
                    />
                    <label className="absolute inset-x-0 bottom-0 bg-black/60 py-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white text-xs font-semibold tracking-wide">
                        Change Image
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(e) => handleImageChange(e, idx)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">
                No images available for this product.
              </p>
            )}
          </div>

          <button
            onClick={() => setShowUpdateForm(true)}
            className="w-full flex justify-center items-center gap-2 border border-primary text-primary font-bold py-3 rounded-xl hover:bg-green-50 transition-colors text-sm"
          >
            <Edit size={16} />
            Update Product
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={lightboxImg}
              alt="Full scale"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute -top-4 -right-4 text-white text-2xl font-bold bg-black/50 hover:bg-black/80 w-10 h-10 rounded-full flex items-center justify-center"
              onClick={() => setLightboxImg(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <ConfirmDeletion
          closeModal={setShowDeleteModal}
          isOpen={showDeleteModal}
          onConfirm={() => deleteProduct()}
          message="Are you sure you want to delete this product?"
          cancelText="No, go back"
          confirmText="Yes, Continue"
        />
      )}

      {showTransitions && (
        <ProductModal
          screen={screen}
          update={true}
          onSubmit={() => {
            setScreen("loading");
            setTimeout(() => setScreen("success"), 2000);
          }}
          onClose={() => setShowTransitions(false)}
          setOpenModal={() => {}}
          title="Do you confirm that you want to update this product's details?"
          btn_text_green="Yes, Update"
          btn_text_white="Cancel"
        />
      )}

      {showUpdateForm && (
        <ModalLayout
          onClose={() => setShowUpdateForm(false)}
          maxWidth="max-w-2xl"
        >
          <div className="h-[90vh] flex flex-col overflow-hidden rounded-2xl bg-white">
            <ProductForm
              isEdit
              productId={id as string}
              initialData={productData}
              onClose={() => setShowUpdateForm(false)}
            />
          </div>
        </ModalLayout>
      )}
    </>
  );
};

// ← This was the missing piece
SingleProduct.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default SingleProduct;
