import React, { useState } from "react";
import { useProductForm } from "@/hooks/useProductForm";
import ProductInputField from "./ProductInputField";
import { ProductImageUpload } from "./ProductImageUpload";
import ProductModal from "./ProductModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductService from "@/services/product.service";
import { ErrorMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";
import { Package, Tag, Layers, Scale, Info, X } from "lucide-react";
import {
  CONDITIONS,
  QUANTITY_TYPES,
  COUNT_TYPES,
  PRODUCE_TYPES,
} from "@/types";

interface ProductFormInitialData {
  name?: string;
  description?: string;
  categoryId?: string;
  subcategoryId?: string;
  location?: string;
  pricePerUnit?: number;
  discountPerUnit?: number;
  stockQuantity?: number;
  quantityType?: string;
  countType?: string;
  condition?: string;
  produceType?: string;
  quantityPerUnit?: number;
  weightRange?: string;
  volumeRange?: string;
  brand?: string;
  expiryDate?: string;
  imageUrl?: string;
  images?: string[];
  specifications?: string | string[] | Record<string, unknown>;
}

interface Props {
  isEdit?: boolean;
  productId?: string;
  initialData?: ProductFormInitialData;
  onClose: () => void;
}

const Section = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-primary" />
      </div>
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const ProductForm = ({
  isEdit = false,
  productId,
  initialData,
  onClose,
}: Props) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [screen, setScreen] = useState<"confirm" | "success" | "loading">(
    "confirm",
  );
  const [specInput, setSpecInput] = useState("");
  const { stateOptions } = useStatesAndLgas();

  const {
    form,
    thumbnail,
    images,
    categories,
    subCategories,
    visibility,
    handleChange,
    addSpecification,
    removeSpecification,
    setThumbnail,
    setImages,
    buildFormData,
    validate,
  } = useProductForm(
    isEdit && initialData
      ? {
          name: initialData.name ?? "",
          description: initialData.description ?? "",
          categoryId: initialData.categoryId ?? "",
          subcategoryId: initialData.subcategoryId ?? "",
          location: initialData.location ?? "",
          pricePerUnit: String(initialData.pricePerUnit ?? ""),
          discountPerUnit: String(initialData.discountPerUnit ?? ""),
          stockQuantity: String(initialData.stockQuantity ?? ""),
          quantityType: initialData.quantityType ?? "",
          countType: initialData.countType ?? "",
          condition: initialData.condition ?? "new",
          produceType: initialData.produceType ?? "",
          quantityPerUnit: String(initialData.quantityPerUnit ?? ""),
          weightRange: initialData.weightRange ?? "",
          volumeRange: initialData.volumeRange ?? "",
          brand: initialData.brand ?? "",
          expiryDate: initialData.expiryDate?.slice(0, 10) ?? "",
          specifications: initialData.specifications,
        }
      : undefined,
  );

  // ── Mutations ─────────────────────────────────────────────────────
  const { mutate: createProduct } = useMutation({
    mutationFn: () => ProductService.createProduct(buildFormData()),
    onSuccess: () => {
      setScreen("success");
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
    },
    onError: (err) => {
      setScreen("confirm");
      ErrorMessage(renderAxiosOrAuthError(err));
    },
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: () => ProductService.updateProduct(productId!, buildFormData()),
    onSuccess: () => {
      setScreen("success");
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      queryClient.invalidateQueries({
        queryKey: ["seller-product", productId],
      });
    },
    onError: (err) => {
      setScreen("confirm");
      ErrorMessage(renderAxiosOrAuthError(err));
    },
  });

  const handleSubmit = () => {
    const error = validate();
    if (error) {
      ErrorMessage(error);
      return;
    }
    setShowModal(true);
    setScreen("confirm");
  };

  const handleConfirm = () => {
    setScreen("loading");
    isEdit ? updateProduct() : createProduct();
  };

  const handleSpecKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (specInput.trim()) {
        addSpecification(specInput.trim());
        setSpecInput("");
      }
    }
  };

  const {
    categoryType,
    showCondition,
    showProduceType,
    showWeightRange,
    showVolumeRange,
    showBrand,
    showSpecifications,
    showExpiryDate,
    showQuantityPerUnit,
  } = visibility;

  const hasProductDetails =
    showProduceType ||
    showWeightRange ||
    showVolumeRange ||
    showBrand ||
    showExpiryDate ||
    showSpecifications ||
    showCondition;

  return (
    <>
      <div className="flex flex-col h-full w-full">
        {/* ── Sticky header ─────────────────────────────────────── */}
        <div className="px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-bold text-gray-900">
            {isEdit ? "Update Product" : "Upload Product"}
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {isEdit
              ? "Edit your product details below"
              : "Fill in the details to list your product on the marketplace"}
          </p>
        </div>

        {/* ── Scrollable body ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Basic Info */}
          <Section icon={Info} title="Basic Information">
            <ProductInputField
              label="Product Name"
              required
              value={form.name}
              onChange={(v) => handleChange("name", v)}
              placeholder="e.g. Premium Organic Tomatoes"
            />
            <ProductInputField
              label="Description"
              required
              value={form.description}
              onChange={(v) => handleChange("description", v)}
              placeholder="Describe your product — freshness, origin, usage..."
              type="text-area"
            />
          </Section>

          {/* Category */}
          <Section icon={Layers} title="Category">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProductInputField
                label="Category"
                required
                value={form.categoryId}
                onChange={(v) => handleChange("categoryId", v)}
                placeholder="Select category"
                options={categories}
              />
              <ProductInputField
                label="Sub Category"
                required
                value={form.subcategoryId}
                onChange={(v) => handleChange("subcategoryId", v)}
                placeholder={
                  form.categoryId
                    ? "Select sub-category"
                    : "Select a category first"
                }
                options={subCategories}
                disabled={!form.categoryId}
              />
            </div>
            <ProductInputField
              label="Location"
              required
              value={form.location}
              onChange={(v) => handleChange("location", v)}
              placeholder="Select your state"
              options={stateOptions}
            />
          </Section>

          {/* Pricing */}
          <Section icon={Tag} title="Pricing">
            <div className="grid grid-cols-2 gap-4">
              <ProductInputField
                label="Price (₦)"
                required
                value={form.pricePerUnit}
                onChange={(v) => handleChange("pricePerUnit", v)}
                placeholder="0.00"
              />
              <ProductInputField
                label="Discount Price (₦)"
                value={form.discountPerUnit}
                onChange={(v) => handleChange("discountPerUnit", v)}
                placeholder="0.00"
              />
            </div>
          </Section>

          {/* Stock & Quantity */}
          <Section icon={Package} title="Stock & Quantity">
            <div className="grid grid-cols-2 gap-4">
              <ProductInputField
                label="Stock Quantity"
                required
                value={form.stockQuantity}
                onChange={(v) => handleChange("stockQuantity", v)}
                placeholder="e.g. 100"
              />

              <ProductInputField
                label="Quantity Type"
                required
                value={form.quantityType}
                onChange={(v) => handleChange("quantityType", v)}
                options={QUANTITY_TYPES}
                placeholder="Select type"
              />
            </div>

            <ProductInputField
              label="Count Type"
              value={form.countType}
              onChange={(v) => handleChange("countType", v)}
              options={COUNT_TYPES}
              placeholder="Select count"
            />

            {/* Only shows when Bulk is selected */}
            {showQuantityPerUnit && (
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl">
                <ProductInputField
                  label="Quantity Per Unit"
                  value={form.quantityPerUnit}
                  onChange={(v) => handleChange("quantityPerUnit", v)}
                  placeholder="e.g. 50 items per basket"
                />
                <p className="text-xs text-primary/70 mt-1.5">
                  How many individual items are in one bulk unit?
                </p>
              </div>
            )}
          </Section>

          {/* Product Details — conditional on category */}
          {hasProductDetails && (
            <Section icon={Scale} title="Product Details">
              {/* Food + Feeds */}
              {showProduceType && (
                <ProductInputField
                  label="Produce Type"
                  value={form.produceType}
                  onChange={(v) => handleChange("produceType", v)}
                  options={PRODUCE_TYPES}
                  placeholder="Fresh or Processed?"
                />
              )}

              {/* Food + Feeds — expiry */}
              {showExpiryDate && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => handleChange("expiryDate", e.target.value)}
                    className="w-full px-3 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                  />
                </div>
              )}

              {/* Weight — Food, Feeds, Agrochem, Machinery */}
              {showWeightRange && (
                <ProductInputField
                  label="Weight Range"
                  value={form.weightRange}
                  onChange={(v) => handleChange("weightRange", v)}
                  placeholder="e.g. 1kg – 5kg"
                />
              )}

              {/* Volume — Agrochem only */}
              {showVolumeRange && (
                <ProductInputField
                  label="Volume Range"
                  value={form.volumeRange}
                  onChange={(v) => handleChange("volumeRange", v)}
                  placeholder="e.g. 1L – 5L"
                />
              )}

              {/* Brand — Agrochem + Machinery */}
              {showBrand && (
                <ProductInputField
                  label="Brand"
                  value={form.brand}
                  onChange={(v) => handleChange("brand", v)}
                  placeholder="e.g. John Deere, Syngenta"
                />
              )}

              {/* Condition — Machinery only */}
              {showCondition && (
                <ProductInputField
                  label="Condition"
                  value={form.condition}
                  onChange={(v) => handleChange("condition", v)}
                  options={CONDITIONS}
                  placeholder="Select condition"
                />
              )}

              {/* Specifications — Machinery only */}
              {showSpecifications && (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Specifications
                    </label>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Type a spec and press{" "}
                      <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">
                        Enter
                      </kbd>{" "}
                      to add it — e.g.{" "}
                      <span className="font-mono text-gray-500">
                        horsepower: 50HP
                      </span>
                    </p>
                  </div>

                  <input
                    type="text"
                    value={specInput}
                    onChange={(e) => setSpecInput(e.target.value)}
                    onKeyDown={handleSpecKeyDown}
                    placeholder="e.g. horsepower: 50HP"
                    className="w-full px-3 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                  />

                  {form.specifications.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      {form.specifications.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-100 group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span className="text-sm text-gray-700">
                              {spec}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSpecification(i)}
                            className="w-5 h-5 flex items-center justify-center rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Section>
          )}

          {/* Images */}
          <Section icon={Package} title="Product Images">
            <ProductImageUpload
              images={images}
              onChange={setImages}
              thumbnail={thumbnail}
              onThumbnailChange={setThumbnail}
              existingThumbnail={isEdit ? initialData?.imageUrl : undefined}
              existingImages={isEdit ? initialData?.images : undefined}
            />
          </Section>
        </div>

        {/* ── Sticky footer ─────────────────────────────────────── */}
        <div className="px-6 py-4 border-t border-gray-100 shrink-0 bg-white">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              {isEdit ? "Update Product" : "Upload Product"}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ProductModal
          screen={screen}
          update={isEdit}
          onSubmit={handleConfirm}
          onClose={() => setShowModal(false)}
          setOpenModal={() => onClose()}
          title={
            isEdit
              ? "Do you confirm that you want to update this product?"
              : "Do you confirm that the product information is accurate?"
          }
          btn_text_green={isEdit ? "Yes, Update" : "Yes, Upload"}
          btn_text_white="Check Again"
        />
      )}
    </>
  );
};

export default ProductForm;
