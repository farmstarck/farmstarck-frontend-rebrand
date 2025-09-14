import { Dispatch, SetStateAction, useState } from "react";
import closeSvg from "../../../../assets/svg/close.svg";
import categories from "../../../../../data/categories.json";
import RangeSlider from "../../../common/RangeSlider";

type filterProps = {
  setIsFilterModalOpen: Dispatch<SetStateAction<boolean>>;
  setBySort?: Dispatch<SetStateAction<string>>;
  setByCategory?: Dispatch<SetStateAction<string>>;
  setByPrice: Dispatch<SetStateAction<string>>;
  setWillFilter: Dispatch<SetStateAction<any>>;
};

type SortByProps = {
  label: string;
  value: string;
};

type CategoryByProps = {
  id: number;
  name: string;
  description: string;
};

const sortByOptions: SortByProps[] = [
  { label: "A-Z", value: "a-z" },
  { label: "Z-A", value: "z-a" },
  { label: "Price Low to High", value: "price-low-high" },
  { label: "Price High to Low", value: "price-high-low" },
  { label: "Popularity", value: "popularity" },
  { label: "Newest", value: "newest" },
];

const ProductFilter: React.FC<filterProps> = ({
  setIsFilterModalOpen,
  setBySort,
  setByCategory,
  setByPrice,
  setWillFilter,
}) => {
  const [categoryByOption] = useState<CategoryByProps[]>(categories);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(true);
  const [isPriceOpen, setIsPriceOpen] = useState<boolean>(true);
  const [selectedSortBy, setSelectedSortBy] = useState<string>("");
  const [selectedCategoryBy, setSelectedCategoryBy] = useState<string>("");
  const [values, setValues] = useState([1000, 500000]);

  const toggles = (
    value: boolean,
    setter: Dispatch<SetStateAction<boolean>>
  ) => {
    setter(value);
  };

  const handleResetFilter = () => {
    if (setBySort) setBySort("");
    if (setByCategory) setByCategory("");
    if (setByPrice) setByPrice("");

    setSelectedSortBy("");
    setSelectedCategoryBy("");
    setValues([1000, 500000]);

    setWillFilter(Date.now());
  };

  const handleApplyFilter = () => {
    setWillFilter(Date.now());
    setIsFilterModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-backdrop flex justify-start items-center z-[80]">
      <div className="w-full h-screen py-10 px-5 shadow-md bg-white sm:w-1/2 md:w-1/3">
        <div className="w-full flex justify-end">
          <img
            src={closeSvg}
            alt=""
            onClick={() => setIsFilterModalOpen(false)}
            className="w-4 sm:w-5 cursor-pointer"
          />
        </div>
        <h4 className="text-sm py-4">Filter Options</h4>
        <div className="flex flex-col gap-5 max-h-[28rem] overflow-y-auto no-scrollbar">
          {/* Handle Sort Filter */}
          <div className="flex flex-col gap-4">
            <div className="bg-secondary-light rounded-md">
              {/* Accordion Header */}
              <button
                onClick={() => toggles(!isSortOpen, setIsSortOpen)}
                className="w-full flex justify-between items-center p-3 bg-transparent text-left focus:outline-none"
              >
                <span className="capitalize text-xs">Sort By</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="w-2"
                  >
                    <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
                  </svg>
                </span>
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-[max-height] duration-300 ${
                  isSortOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-4">
                  <ul className="flex gap-2 gap-y-3 justify-start flex-wrap">
                    {sortByOptions.map(({ label, value }, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          selectedSortBy !== value
                            ? setSelectedSortBy(value)
                            : setSelectedSortBy("");
                          selectedSortBy !== value
                            ? setBySort?.(value)
                            : setBySort?.("");
                        }}
                        className={`${
                          selectedSortBy === value
                            ? "bg-secondary-dark text-white"
                            : "bg-white"
                        } p-3 sm:p-0 sm:w-28 sm:h-8 rounded-md flex justify-center items-center text-btn-txt cursor-pointer transition delay-75 ease-in-out hover:bg-secondary-dark hover:text-white`}
                      >
                        {label}
                      </button>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Handle Category Filter */}
          <div className="flex flex-col gap-4">
            <div className="bg-secondary-light rounded-md">
              {/* Accordion Header */}
              <button
                onClick={() => toggles(!isCategoryOpen, setIsCategoryOpen)}
                className="w-full flex justify-between items-center p-3 bg-transparent text-left focus:outline-none"
              >
                <span className="capitalize text-xs">Categories</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="w-2"
                  >
                    <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
                  </svg>
                </span>
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-[max-height] duration-300 overflow-y-auto ${
                  isCategoryOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-4">
                  <ul className="flex gap-2 gap-y-3 justify-start flex-wrap">
                    {categoryByOption.map(({ name, id }) => (
                      <button
                        key={id}
                        onClick={() => {
                          selectedCategoryBy !== name
                            ? setSelectedCategoryBy(name)
                            : setSelectedCategoryBy("");
                          selectedCategoryBy !== name
                            ? setByCategory?.(name)
                            : setByCategory?.("");
                        }}
                        className={`${
                          selectedCategoryBy === name
                            ? "bg-secondary-dark text-white"
                            : "bg-white"
                        } p-3 sm:p-0 sm:w-28 sm:h-8 rounded-md flex justify-center capitalize items-center text-btn-txt cursor-pointer transition delay-75 ease-in-out hover:bg-secondary-dark hover:text-white`}
                      >
                        {name}
                      </button>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Handle Price Filter */}
          <div className="flex flex-col gap-4">
            <div className="bg-secondary-light rounded-md">
              {/* Accordion Header */}
              <button
                onClick={() => toggles(!isPriceOpen, setIsPriceOpen)}
                className="w-full flex justify-between items-center p-3 bg-transparent text-left focus:outline-none"
              >
                <span className="capitalize text-xs">Price Range</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    isPriceOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="w-2"
                  >
                    <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
                  </svg>
                </span>
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-[max-height] duration-300 ${
                  isPriceOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-4">
                  <RangeSlider
                    setByPrice={setByPrice}
                    values={values}
                    setValues={setValues}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center pt-4  gap-3 justify-between ">
          <button
            onClick={handleResetFilter}
            className="h-10 w-[45%] cursor-pointer  text-sm text-secondary-dark  rounded-md transition-all duration-300 ease-in-out border border-secondary-dark hover:bg-secondary-dark hover:text-white"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilter}
            className="h-10 w-[45%] cursor-pointer text-sm text-white  bg-secondary-dark rounded-md transition-all duration-300 ease-in-out hover:bg-secondary-dark hover:text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
