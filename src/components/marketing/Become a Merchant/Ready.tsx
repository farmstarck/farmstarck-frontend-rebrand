const Ready = () => {
  return (
    <div className="bg-secondary-light mt-10 md:mt-20 w-full px-5 py-10 md:py-20">
      <div className="relative w-full max-w-3xl m-auto mx-auto">
        <div className="flex flex-col  items-center space-y-5 md:space-y-12 md:items-start">
          <h2 className="uppercase text-center text-xl w-full md:w-3/4 sm:text-2xl md:text-4xl md:text-start">
            Help & Support
          </h2>
          <div className="flex flex-col gap-5 md:gap-12 w-full md:w-5/6">
            <p className="text-center text-xs md:text-sm text-gray-700 md:text-start">
              Our team is here to assist you with any questions or challenges
              you might encounter. Reach out anytime!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ready;
