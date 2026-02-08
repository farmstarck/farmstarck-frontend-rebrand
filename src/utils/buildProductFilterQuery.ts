export function buildProductFilterQuery(filters: any) {
  const query: Record<string, any> = {};

  // subcategory
  if (filters.subcategoryId) {
    query.subcategoryId = filters.subcategoryId;
  }

  // price
  if (filters.priceRange) {
    query.minPrice = filters.priceRange.min;
    query.maxPrice = filters.priceRange.max;
  }

  // locations (array → backend)
  if (filters.locations?.length) {
    query.locations = filters.locations; // 👈 backend change coming
  }

  // size
  if (filters.size) {
    query.size = filters.size;
  }

  // page
  if (filters.page) {
    query.page = filters.page;
  }

  // attributes → explicit fields
  filters.attributes?.forEach((attr: string) => {
    switch (attr) {
      case "Bulk":
        query.quantityType = "bulk";
        break;

      case "Unit":
        query.quantityType = "unit";
        break;

      case "With Discount":
        query.discount = true;
        break;

      case "Without Discount":
        query.discount = false;
        break;

      case "Fresh/Raw Food":
        query.produceType = "fresh";
        break;

      case "Processed Food":
        query.produceType = "processed";
        break;

      case "Brand New":
        query.condition = "new";
        break;

      case "Fairly Used":
        query.condition = "fairly_used";
        break;

      // count types
      case "Pieces":
        query.countType = "pieces";
        break;
      case "Dozen":
        query.countType = "dozen";
        break;
      case "Bag":
        query.countType = "bag";
        break;

      default:
        break;
    }
  });

  // sort
  if (filters.sortBy) {
    query.sortBy =
      filters.sortBy === "a-z"
        ? "a_z"
        : filters.sortBy === "z-a"
          ? "z_a"
          : filters.sortBy;
  }

  return query;
}
