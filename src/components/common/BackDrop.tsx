import closeSvg from "../../assets/svg/close.svg";

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
      className="fixed top-0 left-0 w-full h-full bg-backdrop flex justify-center items-center z-[80] p-5"
      onClick={handleClose}
    >
      <div
        className="max-w-2xl w-full bg-white p-5 rounded-2xl shadow-md z-10 h-[450px] no-scrollbar overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-subHeading2 capitalize">{title}</p>
          <img
            src={closeSvg}
            alt=""
            onClick={handleClose}
            className="w-4 sm:w-5 cursor-pointer"
          />
        </div>
        {children}
      </div>
    </div>
  );
};
