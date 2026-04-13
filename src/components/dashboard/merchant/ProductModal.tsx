import Image from "next/image";
import ApiLoader from "@/components/common/ui/ApiLoader";
import SuccessModal from "@/components/common/status/SuccessModal";

interface productProps {
  onClose: () => void;
  title?: string;
  btn_text_green?: string;
  update?:boolean;
  btn_text_white?: string;
  screen: "confirm" | "success" | "loading" ;
  onSubmit: () => void;
  setOpenModal: (val:boolean) => void
}

const ProductModal = ({
  onClose,
  title,
  btn_text_green,
  btn_text_white,
  update=false,
  screen="confirm",
  onSubmit,
  setOpenModal
}: productProps) => {
    // const [open,setOpen] = useState(false);
  

  return (
    <>
      {screen === "confirm" ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-9999">
          <div className="bg-white w-11/12 mx-auto md:max-w-xl lg:max-w-md rounded-2xl p-14 text-center relative shadow-xl">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <Image
                src={"/assets/images/status/cancel.png"}
                alt="cancel img"
                width={24}
                height={24}
              />
            </button>

            {/* Success Icon */}
            {/* <div className="flex justify-center mb-4">
              <div className="">
                <Image
                  width={100}
                  height={100}
                  src="/assets/images/status/success.png"
                  alt="success img"
                />
              </div>
            </div> */}

            {/* Title */}
            <h2 className="text-lg font-bold">{title}</h2>

            <div className="flex items-center flex-col gap-4 pt-10">
                <div className="w-full">
                  <button
                    onClick={onSubmit}
                    className="bg-primary w-full text-white py-3 rounded-full font-semibold"
                  >
                    {btn_text_green || "Yes, confirm"}
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="border w-full  rounded-full border-primary text-primary py-3  font-semibold"
                >
                  {btn_text_white || "No, go back"}
                </button>
            </div>
          </div>
        </div>
      ):
      screen === "loading" ? (
        <ApiLoader loading/>
      ):
      (
        <SuccessModal
          isOpen={true}
          onClose={()=> { onClose(); setOpenModal(false)}}
          title= {update ? "You have successfully updated this product. " : "You have successfully upload a product. "}
          description= {!update ? "All product you upload will appear on your dashboard once it is approved." : ""}
          cta_title="Continue"
          cta={true}
          cta_url={"/dashboard/merchant/manage-products"}
        />
      )
      }
    </>
  );
};

export default ProductModal;
