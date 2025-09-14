import CustomButton from "../../common/CustomButton";

const Ready = () => {
  return (
    <div className=" w-full px-5 pt-10 md:pt-20">
      <div className="relative w-full max-w-4xl m-auto mx-auto">
        <div className="flex flex-col  items-center space-y-10 md:items-start">
          <h2 className="uppercase text-center text-xl w-full md:w-3/4 sm:text-2xl md:text-4xl md:text-start">
            Ready to grow your farm?
          </h2>
          <div className="flex flex-col gap-5 w-full md:w-2/3">
            <p className="text-center text-xs md:text-sm text-gray-700 md:text-start">
              Mary, a smallholder farmer in Ogun State, accessed funding to
              purchase new equipment and seeds.
            </p>

            <div className=" border border-solid border-secondary-dark rounded-full">
              <CustomButton color="green" text="apply for funding" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ready;
