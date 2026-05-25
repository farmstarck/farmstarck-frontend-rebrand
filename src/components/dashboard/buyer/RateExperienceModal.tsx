import React, { useState } from "react";
import { X, Star } from "lucide-react";
import { ErrorMessage } from "@/utils/PageUtils";

interface RateExperienceModalProps {
  orderId: string;
  isLoading?: boolean;
  onSubmit: (payload: {
    orderId: string;
    rating: number;
    comment?: string;
  }) => void;
  onClose: () => void;
}

const RateExperienceModal: React.FC<RateExperienceModalProps> = ({
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
    onSubmit({ orderId, rating, comment: comment || undefined });
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
          <h2 className="text-xl font-bold text-gray-900">Rate Experience</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-700">How was your shopping experience?</p>
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
                  size={40}
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
            className="w-full rounded-lg border bg-lite border-primary outline-none p-2 min-h-24 text-dark resize-none mb-4"
            placeholder="Write your experience here..."
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateExperienceModal;
