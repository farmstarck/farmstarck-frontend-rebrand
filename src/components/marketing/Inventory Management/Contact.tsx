import toast from "react-hot-toast";
import CustomButton from "../../common/CustomButton";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Message sent successfully!");
  };
  return (
    <div className="px-5 py-6 md:py-20">
      <div className="max-w-3xl m-auto flex flex-col space-y-10 justify-between items-center md:items-start">
        <div className="flex flex-col space-y-10">
          <h2 className="uppercase text-center text-xl sm:text-2xl md:text-4xl md:text-start w-full md:w-3/4">
            Have questions or need support? leave a message
          </h2>

          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            <div className="flex gap-1">
              <label className="">*</label>
              <input
                required
                type="text"
                placeholder="Full name"
                className="w-full h-12  p-3  border-0 border-b rounded-md  bg-secondary-light placeholder-black font-light text-sm focus:outline-none"
              />
            </div>
            <div className="flex gap-1">
              <label className="">*</label>
              <input
                required
                type="email"
                placeholder="Email address"
                className="w-full h-12  p-3  border-0 border-b rounded-md  bg-secondary-light placeholder-black font-light text-sm focus:outline-none"
              />
            </div>
            <div className="flex gap-1">
              <label className="">*</label>
              <textarea
                required
                placeholder="Write your message"
                className="w-full h-40  p-3  border-0 border-b rounded-md  bg-secondary-light placeholder-black font-light text-sm focus:outline-none"
              />
            </div>
            <div className="w-full md:ml-3 border border-solid border-secondary-dark rounded-full">
              <CustomButton color="green" text="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
