

import { merchantOrderStatusMeta } from "@/data/MerchantOrdersData";
import { MerchantOrderItem, MerchantOrderStatus } from "@/types/products";
import { fmt } from "@/utils/merchantHelpers";
import { MoreVertical, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";



export const ITEM_STATUSES: { value: MerchantOrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancel" },
];


interface ItemCardProps {
  item: MerchantOrderItem;
  onUpdateItem: (item: MerchantOrderItem, next: MerchantOrderStatus) => void;
}




// ─────────────────────────────────────────────
// RadioOption  (green circle radio button)
// ─────────────────────────────────────────────
export const RadioOption: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, checked, onChange }) => (


  <label
    onClick={onChange}
    className="flex items-center gap-3 cursor-pointer py-2 px-1 group">
    <span

      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? "border-primary" : "border-gray-300 group-hover:border-primary"
        }`}
    >
      {checked && <span className="w-1.5 h-1.5 rounded-full bg-primary block" />}
    </span>
    <span className="text-[12px] text-gray-800">{label}</span>
  </label>

);


export const RadioGroup: React.FC<{
  statuses: { value: MerchantOrderStatus; label: string }[];
  title: string;
  selectedValue: MerchantOrderStatus;
  onChange: (value: MerchantOrderStatus) => void;
  onAction: () => void;
  onClose: () => void
  btnText?: string
}> = ({ title, statuses, selectedValue, onChange, onAction, onClose, btnText = "Update" }) => {


  return (
    <div className="w-full">
      <div className="flex px-4 pt-4 pb-2 items-center justify-between">
        <p className="text-base font-semibold text-gray-900">{title}</p>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <Image src={'/assets/images/status/cancel.png'} alt="cancel img" width={14} height={14} />
        </button>
      </div>

      <div className="px-4 pb-2">
        {statuses.map((s) => (
          <RadioOption
            key={s.value}
            label={s.label}
            checked={selectedValue === s.value}
            onChange={() => onChange(s.value)}
          />
        ))}
      </div>

      {/* Update button */}
      <div className="px-4 pb-4">
        <button
          onClick={onAction}
          className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
}



const OrderItemRow: React.FC<ItemCardProps> = ({ item, onUpdateItem }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<MerchantOrderStatus>(item.itemStatus);
  const ref = useRef<HTMLDivElement>(null);
  const meta = merchantOrderStatusMeta[item.itemStatus];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleUpdate = () => {
    onUpdateItem(item, selected);
    setOpen(false);
  };

  return (
    <div className="flex gap-3 items-start p-3 bg-gray-50 rounded-xl border border-gray-100">
      {/* Image */}
      <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
        <Image
          src={item.imageUrl}
          alt={item.productName}
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/64x64/f3f4f6/9ca3af?text=IMG";
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.productName}</p>
        <p className="text-sm font-bold text-gray-800 mt-0.5">{fmt(item.totalPrice)}</p>
        <p className="text-sm text-gray-500 mt-0.5">
          QTY - {item.quantity}
        </p>
        <p className="text-xs text-gray-500">SKU: {item.sku}</p>
        <div className="mt-1.5">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${meta.bg} ${meta.text}`}
          >
            {meta.label}
          </span>
        </div>
      </div>

      {/* 3-dot menu */}
      <div ref={ref} className="relative shrink-0">
        <button
          onClick={() => {
            setSelected(item.itemStatus);
            setOpen((p) => !p);
          }}
          className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <MoreVertical size={15} className="text-gray-500" />
        </button>

        {open && (
          <div className="absolute right-0 top-8 z-30 bg-white rounded-2xl shadow-2xl border border-gray-100 w-52 overflow-hidden">
            {/* Header */}
            <RadioGroup
              title="Change Status"
              statuses={ITEM_STATUSES}
              onClose={()=> setOpen(false)}
              selectedValue={selected}
              onChange={setSelected}
              onAction={handleUpdate}
            />

          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItemRow;