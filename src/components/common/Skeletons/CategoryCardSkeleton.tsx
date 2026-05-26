const CategoryCardSkeleton = () => (
  <div className="flex items-center bg-gray-50 gap-3 p-4 rounded-lg border-2 border-gray-200 animate-pulse">
    {/* Icon placeholder */}
    <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
    {/* Label */}
    <div className="h-3 w-20 bg-gray-200 rounded" />
  </div>
);

export default CategoryCardSkeleton;
