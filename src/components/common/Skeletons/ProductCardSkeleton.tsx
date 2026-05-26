const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
    {/* Image placeholder */}
    <div className="w-full aspect-square bg-gray-200" />

    {/* Content */}
    <div className="p-3 space-y-2.5">
      {/* Category tag */}
      <div className="h-4 w-16 bg-gray-200 rounded-full" />

      {/* Product name */}
      <div className="h-4 w-4/5 bg-gray-200 rounded-lg" />
      <div className="h-4 w-3/5 bg-gray-200 rounded-lg" />

      {/* Price */}
      <div className="h-5 w-24 bg-gray-200 rounded-lg" />

      {/* Location */}
      <div className="h-3 w-20 bg-gray-200 rounded" />

      {/* Rating */}
      <div className="flex items-center gap-1 mt-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-gray-200" />
        ))}
      </div>

      {/* Add to cart button */}
      <div className="h-10 w-full bg-gray-200 rounded-xl mt-2" />
    </div>
  </div>
);

export default ProductCardSkeleton;
