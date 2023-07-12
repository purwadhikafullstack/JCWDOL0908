function Pagination({ metadata, setPage }) {
  const prevPage = () => {
    setPage(metadata?.page - 1);
  };
  const nextPage = () => {
    setPage(metadata?.page + 1);
  };
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-3 items-center">
        <p className="text-gray-500 font-body">
          Showing {metadata?.page} of {metadata?.total_page} pages
        </p>
        <button
          className="bg-primaryLight text-white font-bold font-title px-3 py-1 rounded-md disabled:cursor-not-allowed"
          onClick={prevPage}
          disabled={metadata?.page === 1}
        >
          Prev
        </button>
        <button
          className="bg-primaryLight text-white font-bold font-title px-3 py-1 rounded-md disabled:cursor-not-allowed"
          onClick={nextPage}
          disabled={metadata?.page === metadata?.total_page}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;