const BlogCardSkeleton = () => (
  <div className="flex flex-col bg-white border-2 border-gray-100 rounded-xl overflow-hidden animate-pulse">
    <div className="w-full aspect-video bg-gray-200" />
    <div className="p-3 md:p-5 space-y-3">
      <div className="flex gap-2">
        <div className="h-4 w-14 bg-gray-200 rounded-full" />
        <div className="h-4 w-10 bg-gray-200 rounded-full" />
      </div>
      <div className="h-5 w-full bg-gray-200 rounded" />
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
      <div className="space-y-1.5">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
        <div className="h-3 w-4/6 bg-gray-200 rounded" />
      </div>
      <div className="flex justify-between pt-2 border-t border-gray-100">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

export default BlogCardSkeleton;
