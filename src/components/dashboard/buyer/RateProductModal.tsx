import React, { useState } from "react";
import { X, Star } from "lucide-react";
import Image from "next/image";
import { OrderItem } from "@/types/prisma-schema-types";
import { ErrorMessage } from "@/utils/PageUtils";

interface RateProductModalProps {
  product: OrderItem;
  orderId: string;
  isLoading?: boolean;
  onSubmit: (payload: {
    productId: string;
    orderId: string;
    rating: number;
    comment?: string;
  }) => void;
  onClose: () => void;
}

const RateProductModal: React.FC<RateProductModalProps> = ({
  product,
  orderId,
  isLoading,
  onSubmit,
  onClose,
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      ErrorMessage("Please select a rating");
      return;
    }
    if (!product.productId) {
      ErrorMessage("Product no longer exists");
    }
    onSubmit({
      productId: product.productId!,
      orderId,
      rating,
      comment: comment || undefined,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Rate Product</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
              <Image
                src={product.productImage ?? ""}
                alt={product.productTitle}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {product.productTitle}
              </h3>
              <p className="text-sm text-gray-600">
                ₦{product.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-700">How would you rate this product?</p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
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
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }
                />
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-lg border bg-lite border-primary outline-none p-2 min-h-20 text-dark resize-none mb-4"
            placeholder="Any comments..."
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateProductModal;
