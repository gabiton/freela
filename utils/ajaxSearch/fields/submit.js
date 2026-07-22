import { useAjaxSearchContext } from '../ajaxSearch';

export const AjaxSearchSubmit = ({className = "", children }) => {
  const { submit } = useAjaxSearchContext();

  return (
    <button className={`${className} ajax-search-submit`} onClick={() => submit()}>
      {children}
    </button>
  );
};
