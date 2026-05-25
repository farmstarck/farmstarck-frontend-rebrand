import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryQueries } from "@/queries/category.queries";

// ── Category slugs ────────────────────────────────────────────────
const FOOD_SLUGS = [
  "food",
  "produce",
  "crop",
  "fruit",
  "vegetable",
  "grain",
  "spice",
];
const FEEDS_SLUGS = ["feed", "animal", "livestock", "poultry", "supplement"];
const AGROCHEM_SLUGS = [
  "chemical",
  "agrochemical",
  "pesticide",
  "fertilizer",
  "herbicide",
  "fungicide",
];
const MACHINERY_SLUGS = [
  "machine",
  "machinery",
  "equipment",
  "tractor",
  "implement",
  "tool",
];

type CategoryType = "food" | "feeds" | "agrochem" | "machinery" | "unknown";

const getCategoryType = (slug: string): CategoryType => {
  const s = slug.toLowerCase();
  if (FOOD_SLUGS.some((k) => s.includes(k))) return "food";
  if (FEEDS_SLUGS.some((k) => s.includes(k))) return "feeds";
  if (AGROCHEM_SLUGS.some((k) => s.includes(k))) return "agrochem";
  if (MACHINERY_SLUGS.some((k) => s.includes(k))) return "machinery";
  return "unknown";
};

export type ProductFormData = {
  name: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  location: string;
  pricePerUnit: string;
  discountPerUnit: string;
  stockQuantity: string;
  quantityType: string;
  countType: string;
  condition: string;
  produceType: string;
  quantityPerUnit: string;
  weightRange: string;
  volumeRange: string;
  brand: string;
  expiryDate: string;
  specifications: string[]; // array — each item is one spec line
};

export type FieldVisibility = {
  showProduceType: boolean;
  showWeightRange: boolean;
  showVolumeRange: boolean;
  showBrand: boolean;
  showCondition: boolean;
  showSpecifications: boolean;
  showExpiryDate: boolean;
  showQuantityPerUnit: boolean;
  categoryType: CategoryType;
};

const DEFAULT_FORM: ProductFormData = {
  name: "",
  description: "",
  categoryId: "",
  subcategoryId: "",
  location: "",
  pricePerUnit: "",
  discountPerUnit: "",
  stockQuantity: "",
  quantityType: "",
  countType: "",
  condition: "new",
  produceType: "",
  quantityPerUnit: "",
  weightRange: "",
  volumeRange: "",
  brand: "",
  expiryDate: "",
  specifications: [],
};

export const useProductForm = (
  initialData?: Partial<
    Omit<ProductFormData, "specifications"> & {
      specifications?: string | string[] | Record<string, any>;
    }
  >,
) => {
  const isFirstRender = useRef(true);
  const initialSubcategoryId = useRef(initialData?.subcategoryId ?? "");

  // Normalise specifications — backend may return JSON object or string
  const normaliseSpecs = (raw: any): string[] => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.map(String);
    if (typeof raw === "object") {
      return Object.entries(raw).map(([k, v]) => `${k}: ${v}`);
    }
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        if (typeof parsed === "object" && !Array.isArray(parsed)) {
          return Object.entries(parsed).map(([k, v]) => `${k}: ${v}`);
        }
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch {
        // plain string — split by newlines
        return raw
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
    return [];
  };

  const [form, setForm] = useState<ProductFormData>({
    ...DEFAULT_FORM,
    ...initialData,
    specifications: normaliseSpecs(initialData?.specifications),
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

  // ── Categories ───────────────────────────────────────────────────
  const { data: categories = [] } = useQuery({
    ...categoryQueries.allCategories(),
    select: (res: any) =>
      res.data.data.map((c: any) => ({
        value: c.id,
        label: c.name,
        slug: c.slug,
      })),
  });

  // ── Subcategories ────────────────────────────────────────────────
  const { data: subCategories = [], isSuccess: subCategoriesLoaded } = useQuery(
    {
      ...categoryQueries.subCategoriesByCategory(form.categoryId),
      enabled: !!form.categoryId,
      select: (res: any) =>
        res.data.data.map((s: any) => ({ value: s.id, label: s.name })),
    },
  );

  // Restore pre-filled subcategoryId once options load
  useEffect(() => {
    if (
      subCategoriesLoaded &&
      subCategories.length > 0 &&
      initialSubcategoryId.current &&
      isFirstRender.current
    ) {
      const exists = subCategories.some(
        (s: any) => s.value === initialSubcategoryId.current,
      );
      if (exists) {
        setForm((prev) => ({
          ...prev,
          subcategoryId: initialSubcategoryId.current,
        }));
      }
      isFirstRender.current = false;
    }
  }, [subCategoriesLoaded, subCategories]);

  // Reset subcategory on user-initiated category change
  useEffect(() => {
    if (isFirstRender.current) return;
    setForm((prev) => ({ ...prev, subcategoryId: "" }));
    initialSubcategoryId.current = "";
  }, [form.categoryId]);

  // ── Derived category type ────────────────────────────────────────
  const selectedCategory = categories.find(
    (c: any) => c.value === form.categoryId,
  );
  const categorySlug = selectedCategory?.slug?.toLowerCase() ?? "";
  const categoryType = getCategoryType(categorySlug);

  // ── Field visibility per category ───────────────────────────────
  const visibility: FieldVisibility = {
    categoryType,
    // quantityPerUnit only when bulk is selected
    showQuantityPerUnit: form.quantityType === "bulk",

    // Food & Feeds
    showProduceType: categoryType === "food" || categoryType === "feeds",
    showWeightRange:
      categoryType === "food" ||
      categoryType === "feeds" ||
      categoryType === "agrochem" ||
      categoryType === "machinery",

    // Agrochem only
    showVolumeRange: categoryType === "agrochem",

    // Agrochem + Machinery
    showBrand: categoryType === "agrochem" || categoryType === "machinery",

    // Machinery only
    showSpecifications: categoryType === "machinery",
    showCondition: categoryType === "machinery",

    // Food & Feeds (perishable)
    showExpiryDate: categoryType === "food" || categoryType === "feeds",
  };

  // ── Handlers ─────────────────────────────────────────────────────
  const handleChange = (
    field: keyof Omit<ProductFormData, "specifications">,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addSpecification = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    setForm((prev) => ({
      ...prev,
      specifications: [...prev.specifications, trimmed],
    }));
  };

  const removeSpecification = (index: number) => {
    setForm((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  // ── Build FormData for API ────────────────────────────────────────
  const buildFormData = (): FormData => {
    const fd = new FormData();
    if (thumbnail) fd.append("thumbnail", thumbnail);
    images.forEach((img) => fd.append("images", img));

    // Always-present fields
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("categoryId", form.categoryId);
    fd.append("subcategoryId", form.subcategoryId);
    fd.append("location", form.location);
    fd.append("pricePerUnit", form.pricePerUnit);
    fd.append("stockQuantity", form.stockQuantity);
    fd.append("quantityType", form.quantityType);

    if (form.discountPerUnit)
      fd.append("discountPerUnit", form.discountPerUnit);
    if (form.countType) fd.append("countType", form.countType);
    if (form.condition) fd.append("condition", form.condition);

    // Conditional fields
    if (visibility.showQuantityPerUnit && form.quantityPerUnit)
      fd.append("quantityPerUnit", form.quantityPerUnit);

    if (visibility.showProduceType && form.produceType)
      fd.append("produceType", form.produceType);

    if (visibility.showWeightRange && form.weightRange)
      fd.append("weightRange", form.weightRange);

    if (visibility.showVolumeRange && form.volumeRange)
      fd.append("volumeRange", form.volumeRange);

    if (visibility.showBrand && form.brand) fd.append("brand", form.brand);

    if (visibility.showExpiryDate && form.expiryDate)
      fd.append("expiryDate", form.expiryDate);

    if (visibility.showCondition && form.condition)
      fd.append("condition", form.condition);

    if (visibility.showSpecifications && form.specifications.length > 0) {
      // Convert array to JSON object: ["horsepower: 50HP"] → { "horsepower": "50HP" }
      const specsObj = form.specifications.reduce<Record<string, string>>(
        (acc, line) => {
          const colonIdx = line.indexOf(":");
          if (colonIdx !== -1) {
            const key = line.slice(0, colonIdx).trim();
            const val = line.slice(colonIdx + 1).trim();
            acc[key] = val;
          } else {
            acc[line] = "";
          }
          return acc;
        },
        {},
      );
      fd.append("specifications", JSON.stringify(specsObj));
    }

    return fd;
  };

  // ── Validation ────────────────────────────────────────────────────
  const validate = (): string | null => {
    if (!form.name) return "Product name is required";
    if (!form.description) return "Description is required";
    if (!form.categoryId) return "Category is required";
    if (!form.subcategoryId) return "Sub-category is required";
    if (!form.location) return "Location is required";
    if (!form.pricePerUnit) return "Price is required";
    if (!form.stockQuantity) return "Stock quantity is required";
    if (!form.quantityType) return "Quantity type is required";
    if (!thumbnail && !initialData) return "Product thumbnail is required";
    return null;
  };

  return {
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
    setForm,
  };
};
