import toast from "react-hot-toast";
const RequestProductForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };
  return (
    <div>
      <div className="py-3 flex flex-col gap-2 items-center  md:items-start md:py-5">
        <h2 className="font-subHeading2 text-gray-600 text-center md:text-start">
          Looking for a product that is not listed here?
        </h2>
        <p className="text-xs text-gray-500 font-thin text-center md:text-start">
          Kindly fill the form and we would contact you via mail or call once we
          get it
        </p>
      </div>
      <form className="flex flex-col gap-8 w-full py-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
            Product Name
            <span className="font-light text-xs text-gray-400 pl-2">
              (Local names are helpful)
            </span>
          </label>
          <input
            required
            type="text"
            placeholder="Enter the product name"
            className="w-full h-12  p-3   border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
            Category
          </label>
          <select
            required
            className="w-full h-12  p-3   border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500 cursor-pointer"
          >
            <option disabled>Select category</option>
            <option value="grains">gains</option>
            <option value="nuts">nuts</option>
            <option value="livestocks">livestocks</option>
            <option value="units">units</option>
            <option value="bulk">bulk</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
            Message
            <span className="font-light text-xs text-gray-400 pl-2">
              (Optional)
            </span>
          </label>
          <textarea
            required
            placeholder="Write your message"
            className="w-full h-32  p-3   border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
          />
        </div>
        <button className="bg-secondary-dark py-2 rounded-md cursor-pointer border border-secondary-dark text-white hover:bg-white hover:text-secondary-dark">
          submit
        </button>
      </form>
    </div>
  );
};

export default RequestProductForm;
