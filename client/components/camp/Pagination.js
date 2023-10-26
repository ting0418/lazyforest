import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <div className="mt-5">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        containerClassName="pagination"
        activeClassName="active"
        forcePage={currentPage} // 這裡設定當前頁碼
      />
    </div>
  );
};

export default Pagination;
