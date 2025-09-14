import slugify from "slugify";

export const convertProductNameToSlugs = (productName: string) => {
  return slugify(productName, { lower: true });
};
