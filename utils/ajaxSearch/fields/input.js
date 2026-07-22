import { useAjaxSearchContext } from '../ajaxSearch';

export const AjaxSearchInput = ({className = "", placeholder = "", submitMinChars = false }) => {
  const { setFilter } = useAjaxSearchContext();

  return (
    <>
    <input className={`${className} ajax-search-search`} placeholder={placeholder} onChange={(t) => {
        if ( t.target.value.length >= submitMinChars && submitMinChars ) {
          console.log(submitMinChars)
          setFilter('search', t.target.value, true);
        } else {
          setFilter('search', t.target.value, false);
        }        
      }} />
    </>
  );
};
