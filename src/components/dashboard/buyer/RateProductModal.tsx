import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import Image from 'next/image';
import { OrderItem } from '@/types/products';
import { ErrorMessage } from '@/utils/PageUtils';

interface RateProductModalProps {
  product: OrderItem;
  onClose: () => void;
}

const RateProductModal: React.FC<RateProductModalProps> = ({ product, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    if (rating === 0) {
      ErrorMessage('Please select a rating');
      return;
    }
    // Submit rating logic here
    console.log('Rating submitted:', { productId: product.productId, rating });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Rate Product</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Product Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{product.title}</h3>
                <p className="text-sm text-gray-600">
                  ₦{product.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Size: {product.size}</p>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden relative">
                <Image
                  src="/assets/images/dashboard/buyer/buyer.png"
                  alt="User"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Rating Message */}
            <div className="text-center mb-6">
              <p className="text-gray-700 mb-2">
                Hello, Joshua how is the product? <br />
                Give us a rating
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={30}
                    className={
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }
                  />
                </button>
              ))}
            </div>

            <div className="w-full">
              <textarea
                className='w-full rounded-lg border bg-lite border-primary outline-none focus:outline-0 p-2 min-h-20 text-dark resize-none'
                name="message" id="message"
                placeholder='any comments...'>

              </textarea>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RateProductModal;