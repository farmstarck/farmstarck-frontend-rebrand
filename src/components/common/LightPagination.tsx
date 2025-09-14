type PaginationPropsType = {
  page: number;
  pages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

const LightPagination: React.FC<PaginationPropsType> = ({
  page,
  pages,
  setPage,
  // setLimit,
}) => {
  let middlePagination;

  if (pages <= 3) {
    middlePagination = [...Array(pages)].map((_, i) => (
      <button
        key={i + 1}
        onClick={() => setPage(i + 1)}
        disabled={page === i + 1}
        className=" w-8 h-8 border border-[#022f1a] text-[#022f1a] rounded-md 
        text-sm font-subHeading flex items-center justify-center cursor-pointer 
        disabled:cursor-not-allowed disabled:bg-[#022f1a] disabled:text-white"
      >
        {i + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 3) * 3;

    if (pages - startValue <= 3) {
      middlePagination = (
        <>
          {[...Array(3)].map((_, i) => (
            <button
              key={startValue + i + 1}
              disabled={page === startValue + i + 1}
              onClick={() => setPage(startValue + i + 1)}
              className=" w-8 h-8 border border-[#022f1a] text-[#022f1a] rounded-md 
              text-sm font-subHeading flex items-center justify-center cursor-pointer 
              disabled:cursor-not-allowed disabled:bg-[#022f1a] disabled:text-white"
              style={
                startValue + i + 1 > pages ? { display: "none" } : undefined
              }
            >
              {startValue + i + 1}
            </button>
          ))}
        </>
      );
    } else {
      middlePagination = (
        <>
          {[...Array(3)].map((_, i) => (
            <button
              key={startValue + i + 1}
              disabled={page === startValue + i + 1}
              onClick={() => setPage(startValue + i + 1)}
              className=" w-8 h-8 border border-[#022f1a] text-[#022f1a] rounded-md 
              text-sm font-subHeading flex items-center justify-center cursor-pointer 
              disabled:cursor-not-allowed disabled:bg-[#022f1a] disabled:text-white"
            >
              {startValue + i + 1}
            </button>
          ))}
          <button
            className=" w-8 h-8 border border-[#022f1a] text-[#022f1a] rounded-md 
            text-sm font-subHeading flex items-center justify-center cursor-pointer 
            disabled:cursor-not-allowed disabled:bg-[#022f1a] disabled:text-white"
          >
            ...
          </button>
          <button
            className=" w-8 h-8 border border-[#022f1a] text-[#022f1a] rounded-md 
            text-sm font-subHeading flex items-center justify-center cursor-pointer 
            disabled:cursor-not-allowed disabled:bg-[#022f1a] disabled:text-white"
            onClick={() => setPage(pages)}
            disabled={page === pages}
          >
            {pages}
          </button>
        </>
      );
    }
  }

  //   const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setLimit(Number(e.target.value));
  //   };
  return (
    <div className="h-7 w-full flex justify-center items-center pb-16">
      <div className="flex justify-center flex-1">
        <div className="flex items-center gap-x-3">
          <button
            className=" w-8 h-8 border border-[#022f1a] text-[#022f1a] rounded-md 
            text-sm font-subHeading flex items-center justify-center cursor-pointer 
            disabled:cursor-not-allowed disabled:bg-[#022f1a] disabled:text-white"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          {middlePagination}
          <button
            className=" w-8 h-8 border border-[#022f1a] text-[#022f1a] rounded-md 
            text-sm font-subHeading flex items-center justify-center cursor-pointer 
            disabled:cursor-not-allowed disabled:bg-[#022f1a] disabled:text-white"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === pages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LightPagination;
