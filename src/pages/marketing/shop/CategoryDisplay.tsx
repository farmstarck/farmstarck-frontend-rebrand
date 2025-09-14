import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Request from "../../../components/marketing/Shop/landing/Request";
import { BackDrop } from "../../../components/common/BackDrop";
import RequestProductForm from "../../../components/marketing/Shop/landing/RequestProductForm";
import ProductListing from "../../../components/marketing/Shop/categoryDisplay/ProductListing";
import LightPagination from "../../../components/common/LightPagination";
import ProductFilter from "../../../components/marketing/Shop/categoryDisplay/ProductFilter";

const CategoryDisplay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [bySort, setBySort] = useState("");
  const [byCategory, setByCategory] = useState("");
  const [byPrice, setByPrice] = useState("");
  const [willFilter, setWillFilter] = useState("");
  const [pageParams, setPageParams] = useSearchParams();
  const [page, setPage] = useState(() => {
    let p = Number(pageParams.get("page"));
    return p > 0 ? p : 1;
  });
  //   const [pages, setPages] = useState<number>(0);
  //   const [limit, setLimit] = useState(10);
  const [_, setLimit] = useState(10);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setPageParams({ page: page.toString() });
  }, [page]);

  useEffect(() => {
    console.log(bySort, byCategory, byPrice, willFilter);
  });

  return (
    <div>
      <ProductListing setIsFilterModalOpen={setIsFilterModalOpen} />
      <LightPagination
        // page={1}
        pages={10}
        // setPage={(page) => console.log(page)}
        // setLimit={(limit) => console.log(limit)}

        page={page}
        // pages={pages}
        setPage={setPage}
        setLimit={setLimit}
      />
      {isFilterModalOpen && (
        <ProductFilter
          setIsFilterModalOpen={setIsFilterModalOpen}
          setBySort={setBySort}
          setByCategory={setByCategory}
          setByPrice={setByPrice}
          setWillFilter={setWillFilter}
        />
      )}

      <Request setIsModalOpen={setIsModalOpen} />
      <BackDrop isOpen={isModalOpen} handleClose={handleModalClose}>
        <RequestProductForm />
      </BackDrop>
    </div>
  );
};

export default CategoryDisplay;
