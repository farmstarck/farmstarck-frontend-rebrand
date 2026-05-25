import React, { useState } from "react";
import ProductInputField from "./ProductInputField";
import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";
import {
  productBrands,
  productCategories,
  productConditions,
  productCounts,
  productQty,
  productSubCategories,
} from "@/utils/productRequirements";
import { ProductImageUpload } from "./ProductImageUpload";
import ProductModal from "./ProductModal";

interface props{
  setOpenModal: (val:boolean) => void
}
const UploadProduct = ({setOpenModal}:props) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    category: "",
    subCategory: "",
    productType: "",
    price: "",
    discount: "",
    qtyType: "",
    count: "",
    weight: "weight",
    volume: "",
    condition: "",
    brand: "",
    stockQty: "",
    specification: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [showTransitions, setShowTransitions] = useState(false);
  const [screen, setScreen] = useState<"confirm" | "success" | "loading">(
    "confirm",
  );

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const { stateOptions } = useStatesAndLgas();

  const productTypes = [
    { value: "fresh", label: "Fresh Produce" },
    { value: "processed", label: "Processed Goods" },
    { value: "bulk", label: "Bulk Supply" },
  ];

  const handleSubmit = () => {
    // if(Object.values(form).some((val) => val === "")) {
    //   ErrorMessage("Please fill all required fields");
    //   return;
    // }
    // if (images.length === 0) {
    //   ErrorMessage("Please upload at least one product image");
    //   return;
    // }
    // // attach images to FormData for API call
    // const formData = new FormData();
    // Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    // images.forEach((img, i) => formData.append(`image_${i}`, img));

    setShowTransitions(true);
    setScreen("confirm");

    // console.log("Submitting:", form, images);
    // call your API here
  };

  const handleProductUpload = () => {
    setScreen("loading");
    console.log("Uploading product...");
    setTimeout(() => {
      setScreen("success");
    }, 5000);
  };

  return (
    <div className="max-w-xl mx-auto rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Upload Product</h2>

      <div className="flex flex-col gap-4">
        {/* Product Name */}
        <ProductInputField
          label="Product Name"
          required
          value={form.name}
          onChange={(val) => handleChange("name", val)}
          placeholder="Name of the product"
        />

        {/* Location */}
        <ProductInputField
          label="Location"
          required
          value={form.location}
          onChange={(val) => handleChange("location", val)}
          placeholder="Select your location"
          options={stateOptions}
        />

        {/* Category */}
        <ProductInputField
          label="Category"
          required
          value={form.category}
          onChange={(val) => handleChange("category", val)}
          placeholder="Select category"
          options={productCategories}
        />

        {/* Sub Category */}
        <ProductInputField
          label="Sub Category"
          required
          value={form.subCategory}
          onChange={(val) => handleChange("subCategory", val)}
          placeholder="Select sub-category"
          options={productSubCategories}
        />

        {/* Product Type */}
        <ProductInputField
          label="Product Type"
          required
          value={form.productType}
          onChange={(val) => handleChange("productType", val)}
          placeholder="Select product type"
          options={productTypes}
        />

        {/* Price */}
        <ProductInputField
          label="Price"
          required
          value={form.price}
          onChange={(val) => handleChange("price", val)}
          placeholder="₦ 0.00"
        />

        {/* Discount Price */}
        <ProductInputField
          label="Discount"
          required
          value={form.discount}
          onChange={(val) => handleChange("discount", val)}
          placeholder="₦ 0.00"
        />

        {/* Quantity type */}
        <ProductInputField
          label="Quantity Type"
          required
          value={form.qtyType}
          onChange={(val) => handleChange("qtyType", val)}
          options={productQty}
          placeholder="Select quantity type"
        />

        {/* Count */}
        <ProductInputField
          label="Count"
          required
          value={form.count}
          onChange={(val) => handleChange("count", val)}
          options={productCounts}
          placeholder="Select Count"
        />

        {/* Weight */}
        <ProductInputField
          label="Weight"
          required
          value={form.weight}
          onChange={(val) => handleChange("weight", val)}
          placeholder="Input product weight in gram/kilogram"
        />

        {/* Volume */}
        <ProductInputField
          label="Volume"
          required
          value={form.volume}
          onChange={(val) => handleChange("volume", val)}
          placeholder="Input product volume in litres"
        />

        {/* Condition */}
        <ProductInputField
          label="Condition"
          required
          value={form.condition}
          onChange={(val) => handleChange("condition", val)}
          placeholder="Input product condition"
          options={productConditions}
        />

        {/* Brand */}
        <ProductInputField
          label="Brand"
          required
          value={form.brand}
          onChange={(val) => handleChange("brand", val)}
          placeholder="Select brand"
          options={productBrands}
        />

        {/* Stock Quantity */}
        <ProductInputField
          label="Stock Quantity"
          required
          value={form.stockQty}
          onChange={(val) => handleChange("stockQty", val)}
          placeholder="Input stock Qty"
        />

        {/* Specification */}
        <ProductInputField
          label="Specification"
          required
          value={form.specification}
          onChange={(val) => handleChange("specification", val)}
          placeholder="Input product specifications"
        />

        {/* Description */}
        <ProductInputField
          label="Product Description"
          required
          value={form.description}
          onChange={(val) => handleChange("description", val)}
          placeholder="Input product description"
          type="text-area"
        />

        <ProductImageUpload images={images} onChange={setImages} thumbnail={thumbnail} onThumbnailChange={setThumbnail} />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-primary text-white py-2 rounded-md"
        >
          Upload Product
        </button>
      </div>

      {/* Success Modal */}
      {showTransitions && (
        <ProductModal
          screen={screen}
          onSubmit={handleProductUpload}
          onClose={() => setShowTransitions(false)}
          setOpenModal={setOpenModal}
          title="Do you confirm that the product information is accurate?"
          btn_text_green="Yes, Upload"
          btn_text_white="Check Again"
        />
      )}
    </div>
  );
};

export default UploadProduct;
