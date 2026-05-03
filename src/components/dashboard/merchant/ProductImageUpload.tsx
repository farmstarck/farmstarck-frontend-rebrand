import { useRef } from "react";

export const ProductImageUpload = ({
  images,
  onChange,
}: {
  images: File[];
  onChange: (images: File[]) => void;
}) => {

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 10;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => {
      const isValidType = ["image/jpeg", "image/png"].includes(f.type);
      const isValidSize = f.size <= MAX_SIZE_MB * 1024 * 1024;
      return isValidType && isValidSize;
    });

    const merged = [...images, ...valid].slice(0, MAX_IMAGES);
    onChange(merged);

    // reset input so same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const canAddMore = images.length < MAX_IMAGES;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          Product Images <span className="text-red-500">*</span>
        </label>
        <span className="text-xs text-gray-400">
          {images.length}/{MAX_IMAGES} uploaded
        </span>
      </div>

      <p className="text-xs text-gray-400 -mt-2">
        Max {MAX_IMAGES} uploads, max size per file: {MAX_SIZE_MB}MB (jpeg, png)
      </p>

      {/* Upload trigger */}
      {canAddMore && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl py-6 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-colors duration-200 cursor-pointer"
        >
          {/* Upload icon */}
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
          <span className="text-sm font-medium">Select Image</span>
          <span className="text-xs text-gray-300">
            {MAX_IMAGES - images.length} slot{MAX_IMAGES - images.length !== 1 ? "s" : ""} remaining
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Image preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {images.map((file, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden h-40 bg-gray-100">
              <img
                src={URL.createObjectURL(file)}
                alt={`product-${i}`}
                className="w-full h-full object-cover"
              />
              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
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

              {/* Index badge */}
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                {i + 1}/{MAX_IMAGES}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};