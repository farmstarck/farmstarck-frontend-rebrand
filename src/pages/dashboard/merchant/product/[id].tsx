import React, { useEffect, useState } from 'react';
import { ChevronLeft, Trash2, Edit } from 'lucide-react';
import { useRouter } from 'next/router';
import { MerchantProducts, merchantProductProps } from '@/data/ProductsData';
import ProductModal from "@/components/dashboard/merchant/ProductModal";

const SingleProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productData, setProductData] = useState<merchantProductProps | null>(null);
  const [loading, setLoading] = useState(true);

  // Gallery and Lightbox state
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Modal simulation state
  const [showTransitions, setShowTransitions] = useState(false);
  const [screen, setScreen] = useState<"confirm" | "success" | "loading">("confirm");

  useEffect(() => {
    if (id) {
      // Find product by id
      const product = MerchantProducts.find(p => p.id === id || p.sku === id);
      if (product) {
        setProductData(product);
        setDisplayImages([product.imageUrl, ...(product.images || [])].filter(Boolean));
      }
      setLoading(false);
    }
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      const newUrl = URL.createObjectURL(newFile);
      const newImages = [...displayImages];
      newImages[index] = newUrl;
      setDisplayImages(newImages);
    }
  };

  const handleUpdateClick = () => {
    setScreen("confirm");
    setShowTransitions(true);
  };

  const handleProductUpload = () => {
    setScreen("loading");
    setTimeout(() => {
      setScreen("success");
    }, 2000); // simulate 2s API upload
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
          <p className="text-gray-500 font-medium">Loading product details...</p>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="w-full flex-col flex items-center justify-center py-20 gap-4">
          <p className="text-gray-500 font-medium text-lg">Product not found.</p>
          <button onClick={handleBack} className="text-green-600 font-bold hover:underline">
            Go back to products
          </button>
      </div>
    );
  }

  return (
    <>
      <div className="w-full pb-10 mx-auto p-2 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleBack}
              className="w-8 h-8 flex items-center justify-center bg-transparent border border-gray-400 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={16} className="text-gray-900 font-bold" strokeWidth={3} />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Product Details</h1>
          </div>
          
          <button className="flex items-center justify-center gap-1.5 bg-[#ef4444] hover:bg-red-600 text-white text-xs sm:text-sm font-semibold px-4 py-2 sm:py-2.5 rounded-lg transition-colors">
            <Trash2 size={16} />
            Delete
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] overflow-hidden p-6 sm:p-8">
          <h2 className="text-sm font-extrabold text-gray-900 mb-6 uppercase tracking-widest">
            PRODUCT ID: {productData.sku}
          </h2>

          {/* Info Grid */}
          <div className="flex flex-col gap-4 text-xs sm:text-sm mb-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Product Name:</span>
              <span className="font-bold text-gray-800 capitalize">{productData.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Category:</span>
              <span className="font-bold text-gray-800 capitalize">
                {productData.categoryId?.replace('cat_', '') || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Sub Category:</span>
              <span className="font-bold text-gray-800 capitalize">
                {productData.subcategoryId?.replace('sub_', '') || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Location:</span>
              <span className="font-bold text-gray-800">{productData.location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Price:</span>
              <span className="font-bold text-gray-800">
                ₦{Number(productData.pricePerUnit).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Discount:</span>
              <span className="font-bold text-gray-800">
                ₦{Number(productData.discountPerUnit || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Type:</span>
              <span className="font-bold text-gray-800 capitalize">
                {productData.produceType || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Quantity:</span>
              <span className="font-bold text-gray-800 capitalize">
                {productData.quantityType || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Count:</span>
              <span className="font-bold text-gray-800 capitalize">
                {productData.countType || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Stock:</span>
              <span className="font-bold text-gray-800">
                {productData.stockQuantity > 0 
                  ? `In Stock (${productData.stockQuantity} units)` 
                  : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-6" />

          {/* Images Gallery */}
          <div className="mb-8">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-4">Product Images</h3>
            {displayImages.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {displayImages.map((img, idx) => (
                  <div key={idx} className="relative h-40 w-40 shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={img} 
                      alt={`Product Image ${idx + 1}`} 
                      className="h-full w-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
                      onClick={() => setLightboxImg(img)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/500x500/f3f4f6/9ca3af?text=Not+Found";
                      }}
                    />
                    
                    {/* Edit Overlay */}
                    <label className="absolute inset-x-0 bottom-0 bg-black/60 py-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white text-xs font-semibold tracking-wide">Change Image</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/png, image/jpeg, image/webp" 
                        onChange={(e) => handleImageChange(e, idx)} 
                      />
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No images available for this product.</p>
            )}
          </div>

          {/* Update Button */}
          <button 
            onClick={handleUpdateClick}
            className="w-full flex justify-center items-center gap-2 border border-[#22c55e] border-[1.5px] text-[#22c55e] font-bold py-3 sm:py-3.5 rounded-xl hover:bg-green-50 transition-colors text-sm"
          >
            <Edit size={16} />
            Update Product
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" 
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={lightboxImg} 
              alt="Full scale view" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
              onClick={(e) => e.stopPropagation()} 
            />
            <button 
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-white text-2xl font-bold bg-black/50 hover:bg-black/80 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Success Simulation Modal */}
      {showTransitions && (
        <ProductModal
          screen={screen}
          update={true}
          onSubmit={handleProductUpload}
          onClose={() => setShowTransitions(false)}
          setOpenModal={() => {}}
          title="Do you confirm that you want to update this product's details?"
          btn_text_green="Yes, Update"
          btn_text_white="Cancel"
        />
      )}
    </>
  );
};

export default SingleProduct;