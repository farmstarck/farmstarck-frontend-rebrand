const ProductDetailSkeleton = () => (
  <div className="min-h-screen satoshi bg-lite py-3 lg:py-5 animate-pulse">
    <div className="lg:max-w-7xl mx-auto px-4">
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-2">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-3 bg-gray-200 rounded-full" />
        <div className="h-3 w-32 bg-gray-200 rounded" />
      </div>

      {/* Main Section */}
      <div className="rounded-lg p-1 lg:p-5 mb-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
          {/* Left - Images */}
          <div className="flex md:flex-row flex-col-reverse gap-4 md:gap-6 w-full">
            {/* Thumbnails */}
            <div className="flex md:flex-col flex-row gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gray-200 shrink-0" />
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 h-[300px] md:h-full rounded-2xl bg-gray-200" />
          </div>

          {/* Right - Info */}
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-10 w-40 bg-gray-200 rounded-lg" />
            <div className="h-12 w-48 bg-gray-200 rounded-lg" />
            <div className="h-12 w-full bg-gray-200 rounded-lg" />
            <div className="h-12 w-full bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Product Details Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="h-6 w-40 bg-gray-200 rounded-lg mb-5" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-4/6 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-xl px-4 py-3 space-y-1.5">
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Seller Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="h-6 w-40 bg-gray-200 rounded-lg mb-4" />
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-36 bg-gray-200 rounded" />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-gray-200" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mb-10">
        <div className="h-6 w-48 bg-gray-200 rounded-lg mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden">
              <div className="w-full aspect-square bg-gray-200" />
              <div className="p-3 space-y-2">
                <div className="h-4 w-4/5 bg-gray-200 rounded-lg" />
                <div className="h-5 w-24 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetailSkeleton;
