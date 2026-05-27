/**
 * Pricing utilities.
 *
 * Data model:
 *   pricePerUnit    = original / listed price (the number shown crossed out)
 *   discountPerUnit = actual selling price (lower) when a discount is active
 *
 * If discountPerUnit > 0 it IS the selling price, not a deduction from pricePerUnit.
 */

export const getEffectivePrice = (product: {
  pricePerUnit: number;
  discountPerUnit?: number | null;
}): number => {
  return product.discountPerUnit && product.discountPerUnit > 0
    ? product.discountPerUnit
    : product.pricePerUnit;
};

export const hasDiscount = (product: {
  pricePerUnit: number;
  discountPerUnit?: number | null;
}): boolean => {
  return !!(product.discountPerUnit && product.discountPerUnit > 0);
};

/**
 * Returns the discount percentage (e.g. 14 for 14% off).
 * Returns 0 if no discount.
 */
export const getDiscountPercentage = (product: {
  pricePerUnit: number;
  discountPerUnit?: number | null;
}): number => {
  if (!hasDiscount(product)) return 0;
  return Math.round(
    ((product.pricePerUnit - product.discountPerUnit!) / product.pricePerUnit) *
      100,
  );
};
