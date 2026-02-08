"use client";
import Image from "next/image";
interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  title?: string;
}
export const BackDrop: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  children,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999]"
      onClick={handleClose}
    >
      <div
        className="max-w-2xl w-full bg-white p-5 rounded-2xl shadow-md z-10 h-[450px] no-scrollbar overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-bold capitalize text-primary">{title}</p>
          <Image
            src={"/assets/svg/close.svg"}
            alt="close"
            width={100}
            height={100}
            onClick={handleClose}
            className="w-4 sm:w-5 cursor-pointer"
          />
        </div>
        {children}
      </div>
    </div>
  );
};
