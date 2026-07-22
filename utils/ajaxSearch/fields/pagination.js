import { useAjaxSearchContext } from "../ajaxSearch";

export const AjaxSearchPagination = ({
  className = "",
  showPrevNext = true,
  nextText = "Next Page",
  prevText = "Previous Page",
  showNumbers = true,
  numbersAmonut = 3,
  showFirstLast = true,
  firstText = "First Page",
  lastText = "Last Page",
}) => {
  const { data, loading, setPage } = useAjaxSearchContext();

  if (!data) return;

  let totalPages = Math.ceil(data.found_posts / data.posts_per_page);
  let currentPage = data.currentpage;

  if (loading) {
    return;
  }

  const startPage = Math.max(currentPage - numbersAmonut, 1);
  const endPage = Math.min(currentPage + numbersAmonut, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`${className} ajax-search-pagination`}>
      {data.currentpage > 1 && showFirstLast && (
        <button
          className="ajax-search-pagination__btn ajax-search-pagination__btn-first"
          onClick={() => {
            setPage(1);
          }}
        >
          {firstText}
        </button>
      )}

      {data.currentpage > 1 && showPrevNext && (
        <button
          className="ajax-search-pagination__btn ajax-search-pagination__btn-prev"
          onClick={() => {
            setPage(data.currentpage - 1);
          }}
        >
          {prevText}
        </button>
      )}

      {showNumbers &&
        pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`ajax-search-pagination__btn ajax-search-pagination__btn-numbers  ${
              page === currentPage ? "active" : ""
            } `}
          >
            {page}
          </button>
        ))}

      {data.currentpage < totalPages && showPrevNext && (
        <button
          className="ajax-search-pagination__btn ajax-search-pagination__btn-next"
          onClick={() => {
            setPage(data.nextpage);
          }}
        >
          {nextText}
        </button>
      )}

      {data.currentpage != totalPages && showFirstLast && (
        <button
          className="ajax-search-pagination__btn ajax-search-pagination__btn-last"
          onClick={() => {
            setPage(totalPages);
          }}
        >
          {lastText}
        </button>
      )}
    </div>
  );
};
