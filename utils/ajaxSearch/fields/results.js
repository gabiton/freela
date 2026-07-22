import { useAjaxSearchContext } from "../ajaxSearch";

export const AjaxSearchResults = ({ className = "", template, noResults }) => {
  const { data, loading } = useAjaxSearchContext();

  if (!data) return;

  let posts = data.content;
  let Template = template;
  let NoResults = noResults;

  if (loading) {
    return <div className="ajax-search-results__loading">Loading...</div>;
  }

  return (
    <div className={`${className} ajax-search-results`}>
      {posts.length == 0 && <NoResults />}

      {posts.length > 0 &&
        posts.map((post, key) => <Template key={key} post={post} />)}
    </div>
  );
};

