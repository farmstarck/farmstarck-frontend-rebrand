import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  count?: number;
  className?: string;
}

const ProductCardSkeletonGrid = ({ count = 8, className }: Props) => (
  <div
    className={
      className ??
      "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
    }
  >
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export default ProductCardSkeletonGrid;
