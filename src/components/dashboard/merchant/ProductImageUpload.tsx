import { useRef } from "react";
import Image from "next/image";

interface ProductImageUploadProps {
  images: File[];
  onChange: (images: File[]) => void;
  thumbnail: File | null;
  onThumbnailChange: (file: File | null) => void;
  existingThumbnail?: string; // for edit mode
  existingImages?: string[]; // for edit mode
}

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 10;

export const ProductImageUpload = ({
  images,
  onChange,
  thumbnail,
  onThumbnailChange,
  existingThumbnail,
  existingImages = [],
}: ProductImageUploadProps) => {
  const thumbnailRef = useRef<HTMLInputElement | null>(null);
  const imagesRef = useRef<HTMLInputElement | null>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) return;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) return;
    onThumbnailChange(file);
    if (thumbnailRef.current) thumbnailRef.current.value = "";
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter(
      (f) =>
        ["image/jpeg", "image/png"].includes(f.type) &&
        f.size <= MAX_SIZE_MB * 1024 * 1024,
    );
    const merged = [...images, ...valid].slice(0, MAX_IMAGES);
    onChange(merged);
    if (imagesRef.current) imagesRef.current.value = "";
  };

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const thumbnailSrc = thumbnail
    ? URL.createObjectURL(thumbnail)
    : (existingThumbnail ?? null);

  return (
    <div className="flex flex-col gap-5">
      {/* ── Thumbnail ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">
            Main Thumbnail <span className="text-red-500">*</span>
          </label>
          {existingThumbnail && !thumbnail && (
            <span className="text-xs text-gray-400">
              Current thumbnail shown
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400">
          This is the primary image shown in listings. Max {MAX_SIZE_MB}MB
          (jpeg, png)
        </p>

        {thumbnailSrc ? (
          <div className="relative rounded-xl overflow-hidden h-48 bg-gray-100">
            <img
              src={thumbnailSrc}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => thumbnailRef.current?.click()}
                className="bg-white text-dark text-xs font-semibold px-4 py-2 rounded-full mr-2"
              >
                Change
              </button>
              <button
                type="button"
                onClick={() => onThumbnailChange(null)}
                className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-full"
              >
                Remove
              </button>
            </div>
            <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Thumbnail
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => thumbnailRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl py-8 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 16V8M12 8l-3 3M12 8l3 3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 16v1a4 4 0 004 4h10a4 4 0 004-4v-1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm font-medium">Upload Thumbnail</span>
            <span className="text-xs text-gray-300">
              Required — shown as main image
            </span>
          </button>
        )}

        <input
          ref={thumbnailRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={handleThumbnailChange}
        />
      </div>

      {/* ── Gallery Images ────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Gallery Images</label>
          <span className="text-xs text-gray-400">
            {images.length}/{MAX_IMAGES} uploaded
          </span>
        </div>
        <p className="text-xs text-gray-400">
          Additional product images. Max {MAX_IMAGES}, max {MAX_SIZE_MB}MB each
          (jpeg, png)
        </p>

        {/* Existing images in edit mode */}
        {existingImages.length > 0 && images.length === 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-2">
              Current images — upload new ones to replace all:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {existingImages.map((src, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden h-24 bg-gray-100 opacity-60"
                >
                  <img
                    src={src}
                    alt={`existing-${i}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded">
                    Current
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {images.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => imagesRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl py-6 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 16V8M12 8l-3 3M12 8l3 3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 16v1a4 4 0 004 4h10a4 4 0 004-4v-1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm font-medium">Add Gallery Images</span>
            <span className="text-xs text-gray-300">
              {MAX_IMAGES - images.length} slot
              {MAX_IMAGES - images.length !== 1 ? "s" : ""} remaining
            </span>
          </button>
        )}

        <input
          ref={imagesRef}
          type="file"
          accept="image/jpeg,image/png"
          multiple
          className="hidden"
          onChange={handleImagesChange}
        />

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {images.map((file, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden h-36 bg-gray-100"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`gallery-${i}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow hover:bg-red-600 transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 2l6 6M8 2L2 8"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                  {i + 1}/{MAX_IMAGES}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
