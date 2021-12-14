import { FC, useState } from "react";
import "./molecules.css";

interface PaginationProps {
  page: number;
  maxPage: number;
  changePageNumber: (num: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  page,
  maxPage,
  changePageNumber,
}) => {
  const initialPages =
    page < 9
      ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      : [
          page - 8,
          page - 7,
          page - 6,
          page - 5,
          page - 4,
          page - 3,
          page - 2,
          page - 1,
          page,
          page + 1,
        ];

  const [numberPaginator, setNumberPaginator] =
    useState<number[]>(initialPages);

  const changePage = (nmb: number) => {
    changePageNumber(nmb);
    if (nmb < maxPage && nmb === numberPaginator[numberPaginator.length - 1]) {
      numberPaginator.shift();
      setNumberPaginator([
        ...numberPaginator,
        numberPaginator[numberPaginator.length - 1] + 1,
      ]);
    }
    if (nmb > 1 && nmb === numberPaginator[0]) {
      numberPaginator.pop();
      setNumberPaginator([numberPaginator[0] - 1, ...numberPaginator]);
    }
    localStorage.pageNumber = JSON.stringify(nmb);
  };

  return (
    <>
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => changePage(page - 1)}
        >
          {"<"}
        </button>
        {numberPaginator
          ? numberPaginator.map((el, idx) => (
              <button
                key={idx}
                className={`pagination-button ${
                  page === el ? "pagination-button-active" : ""
                }`}
                onClick={() => changePage(el)}
              >
                {el}
              </button>
            ))
          : null}
        <button
          className="pagination-button"
          onClick={() => changePage(page + 1)}
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default Pagination;
