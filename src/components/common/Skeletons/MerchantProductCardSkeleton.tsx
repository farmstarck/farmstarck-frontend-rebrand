const MerchantProductCardSkeleton = () => (
  <div className="flex items-start gap-3 relative justify-between rounded-lg border border-gray-200 bg-white p-2.5 animate-pulse">
    {/* Thumbnail */}
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-200 shrink-0" />

    {/* Middle: name + badges */}
    <div className="flex-1 min-w-0 space-y-2 py-0.5">
      <div className="h-4 w-3/4 bg-gray-200 rounded-lg" />
      <div className="h-3 w-1/2 bg-gray-200 rounded" />
      <div className="flex items-center gap-2 mt-1">
        <div className="h-6 w-24 bg-gray-200 rounded-md" />
        <div className="h-6 w-20 bg-gray-200 rounded-md" />
      </div>
    </div>

    {/* Right: price + action */}
    <div className="flex flex-col items-end gap-2 shrink-0 py-0.5">
      <div className="h-5 w-20 bg-gray-200 rounded-lg" />
      <div className="h-4 w-14 bg-gray-200 rounded" />
      <div className="w-8 h-8 rounded-full bg-gray-200" />
    </div>
  </div>
);

export default MerchantProductCardSkeleton;
