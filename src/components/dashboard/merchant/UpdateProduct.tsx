import React, { useEffect, useState } from "react";
import { useProductForm } from "@/hooks/useProductForm";
import ProductInputField from "./ProductInputField";
import { ProductImageUpload } from "./ProductImageUpload";
import ProductModal from "./ProductModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductService from "@/services/product.service";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";

interface Props {
  productId: string;
  initialData: any; // product from API
  onClose: () => void;
}

// Reuse the same constant arrays from UploadProduct
const QUANTITY_TYPES = [
  { value: "bulk", label: "Bulk" },
  { value: "unit", label: "Unit" },
];
const COUNT_TYPES = [
  { value: "pieces", label: "Pieces" },
  { value: "dozen", label: "Dozen" },
  { value: "kilogram", label: "Kilogram" },
  { value: "carton", label: "Carton" },
  { value: "liter", label: "Liter" },
  { value: "crate", label: "Crate" },
  { value: "bag", label: "Bag" },
  { value: "basket", label: "Basket" },
  { value: "each", label: "Each" },
  { value: "pack", label: "Pack" },
];
const CONDITIONS = [
  { value: "new", label: "New" },
  { value: "fairly_used", label: "Fairly Used" },
  { value: "seller_refurbished", label: "Seller Refurbished" },
  { value: "manufacturer_refurbished", label: "Manufacturer Refurbished" },
  { value: "other", label: "Other" },
];
const PRODUCE_TYPES = [
  { value: "fresh", label: "Fresh Produce" },
  { value: "processed", label: "Processed" },
];

const UpdateProduct = ({ productId, initialData, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [screen, setScreen] = useState<"confirm" | "success" | "loading">(
    "confirm",
  );

  const { stateOptions } = useStatesAndLgas();

  const {
    form,
    thumbnail,
    images,
    categories,
    subCategories,
    showSpecifications,
    showExpiryDate,
    showBrand,
    showProduceType,
    showWeightVolume,
    handleChange,
    setThumbnail,
    setImages,
    buildFormData,
    validate,
    setForm,
  } = useProductForm({
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    categoryId: initialData?.categoryId ?? "",
    subcategoryId: initialData?.subcategoryId ?? "",
    location: initialData?.location ?? "",
    pricePerUnit: String(initialData?.pricePerUnit ?? ""),
    discountPerUnit: String(initialData?.discountPerUnit ?? ""),
    stockQuantity: String(initialData?.stockQuantity ?? ""),
    quantityType: initialData?.quantityType ?? "",
    countType: initialData?.countType ?? "",
    condition: initialData?.condition ?? "new",
    produceType: initialData?.produceType ?? "",
    quantityPerUnit: String(initialData?.quantityPerUnit ?? ""),
    weightRange: initialData?.weightRange ?? "",
    volumeRange: initialData?.volumeRange ?? "",
    brand: initialData?.brand ?? "",
    expiryDate: initialData?.expiryDate
      ? initialData.expiryDate.slice(0, 10)
      : "",
    specifications: initialData?.specifications
      ? JSON.stringify(initialData.specifications)
      : "",
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: () => ProductService.updateProduct(productId, buildFormData()),
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

  return (
    <div className="max-w-xl mx-auto rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Update Product</h2>

      <div className="flex flex-col gap-4">
        <ProductInputField
          label="Product Name"
          required
          value={form.name}
          onChange={(v) => handleChange("name", v)}
          placeholder="Name of the product"
        />

        <ProductInputField
          label="Description"
          required
          value={form.description}
          onChange={(v) => handleChange("description", v)}
          placeholder="Describe your product"
          type="text-area"
        />

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
            form.categoryId ? "Select sub-category" : "Select a category first"
          }
          options={subCategories}
          disabled={!form.categoryId}
        />

        <ProductInputField
          label="Location"
          required
          value={form.location}
          onChange={(v) => handleChange("location", v)}
          placeholder="Select location"
          options={stateOptions}
        />

        <div className="grid grid-cols-2 gap-3">
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

        <div className="grid grid-cols-2 gap-3">
          <ProductInputField
            label="Stock Quantity"
            required
            value={form.stockQuantity}
            onChange={(v) => handleChange("stockQuantity", v)}
            placeholder="e.g. 100"
          />
          <ProductInputField
            label="Quantity Per Unit"
            value={form.quantityPerUnit}
            onChange={(v) => handleChange("quantityPerUnit", v)}
            placeholder="e.g. 50"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ProductInputField
            label="Quantity Type"
            required
            value={form.quantityType}
            onChange={(v) => handleChange("quantityType", v)}
            options={QUANTITY_TYPES}
            placeholder="Select type"
          />
          <ProductInputField
            label="Count Type"
            value={form.countType}
            onChange={(v) => handleChange("countType", v)}
            options={COUNT_TYPES}
            placeholder="Select count"
          />
        </div>

        <ProductInputField
          label="Condition"
          value={form.condition}
          onChange={(v) => handleChange("condition", v)}
          options={CONDITIONS}
          placeholder="Select condition"
        />

        {showProduceType && (
          <ProductInputField
            label="Produce Type"
            value={form.produceType}
            onChange={(v) => handleChange("produceType", v)}
            options={PRODUCE_TYPES}
            placeholder="Fresh or Processed?"
          />
        )}

        {showWeightVolume && (
          <div className="grid grid-cols-2 gap-3">
            <ProductInputField
              label="Weight Range"
              value={form.weightRange}
              onChange={(v) => handleChange("weightRange", v)}
              placeholder="e.g. 1kg - 5kg"
            />
            <ProductInputField
              label="Volume Range"
              value={form.volumeRange}
              onChange={(v) => handleChange("volumeRange", v)}
              placeholder="e.g. 1L - 5L"
            />
          </div>
        )}

        {showBrand && (
          <ProductInputField
            label="Brand"
            value={form.brand}
            onChange={(v) => handleChange("brand", v)}
            placeholder="e.g. John Deere"
          />
        )}

        {showExpiryDate && (
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-dark font-normal">Expiry Date</label>
            <input
              type="date"
              value={form.expiryDate}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
              className="w-full px-3 py-3 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:border-primary transition"
            />
          </div>
        )}

        {showSpecifications && (
          <ProductInputField
            label="Specifications"
            value={form.specifications}
            onChange={(v) => handleChange("specifications", v)}
            placeholder='e.g. {"horsepower": "50HP", "fuel": "diesel"}'
            type="text-area"
          />
        )}

        {/* Show existing images as reference */}
        {initialData?.images?.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Current images (upload new ones to replace):
            </p>
            <div className="flex gap-2 flex-wrap">
              {initialData.images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt={`img-${i}`}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200 opacity-60"
                />
              ))}
            </div>
          </div>
        )}

        <ProductImageUpload
          images={images}
          onChange={setImages}
          thumbnail={thumbnail}
          onThumbnailChange={setThumbnail}
        />

        <button
          onClick={handleSubmit}
          className="mt-4 bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Update Product
        </button>
      </div>

      {showModal && (
        <ProductModal
          screen={screen}
          update
          onSubmit={() => {
            setScreen("loading");
            updateProduct();
          }}
          onClose={() => setShowModal(false)}
          setOpenModal={() => onClose()}
          title="Do you confirm that you want to update this product?"
          btn_text_green="Yes, Update"
          btn_text_white="Check Again"
        />
      )}
    </div>
  );
};

export default UpdateProduct;
