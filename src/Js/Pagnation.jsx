import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({ itemsPerPage, pageCount, handlePageClick }) {
  return (
    <div className="flex justify-center my-4">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        // containerClassName="flex flex-wrap space-x-2"
        pageClassName="flex items-center"
        // pageLinkClassName="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-blue-500 hover:text-white transition"
        previousClassName="flex items-center"
        nextClassName="flex items-center"
        // previousLinkClassName="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-blue-500 hover:text-white transition"
        // nextLinkClassName="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-blue-500 hover:text-white transition"
        // breakClassName="flex items-center px-3 py-1 border border-gray-300 text-gray-700 rounded"
        activeLinkClassName="bg-blue-500 text-white border-blue-500"
        // Additional class for mobile responsiveness
        containerClassName="flex flex-wrap gap-2 md:gap-4 text-white"
        pageLinkClassName="border border-gray-300 text-sm md:text-base px-2 py-1 md:px-3 md:py-2"
        previousLinkClassName="border border-gray-300 text-sm md:text-base px-2 py-1 md:px-3 md:py-2"
        nextLinkClassName="border border-gray-300 text-sm md:text-base px-2 py-1 md:px-3 md:py-2"
        breakClassName="border border-gray-300 text-sm md:text-base px-2 py-1 md:px-3 md:py-2"
      />
    </div>
  );
}

export default Pagination;
