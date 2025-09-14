const Listing = () => {
  return (
    <div className="px-5 py-10 md:py-20">
      <div className="max-w-3xl m-auto flex flex-col space-y-10 justify-between items-center md:items-start">
        <div className="flex flex-col space-y-14">
          <h2 className="uppercase text-center text-xl w-full sm:text-2xl md:text-4xl md:text-start md:w-5/6">
            Product listing and order management
          </h2>
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <h3 className="text-center text-xs md:text-sm font-subHeading2 md:text-start">
              Product Listing
            </h3>
            <p className="text-center text-xs md:text-sm text-gray-700 md:text-start">
              Easily list your products by providing detailed descriptions,
              prices, and images. Utilize our categories to make your products
              discoverable.
            </p>
            <div className="bg-secondary-light w-full min-h-60 md:min-h-64"></div>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <h3 className="text-center text-xs md:text-sm font-subHeading2 md:text-start">
              Order Management
            </h3>
            <p className="text-center text-xs md:text-sm text-gray-700 md:text-start">
              Use our streamlined dashboard to manage orders, track inventory,
              and handle customer inquiries efficiently.
            </p>
            <div className="bg-secondary-light w-full min-h-60 md:min-h-64"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
