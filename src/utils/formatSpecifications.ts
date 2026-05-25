const formatSpecifications = (specs: any): string[] => {
  if (!specs) return [];
  if (Array.isArray(specs)) return specs.filter(Boolean);
  if (typeof specs === "object") {
    return Object.entries(specs).map(([k, v]) => `${k}: ${v}`);
  }
  return [];
};
