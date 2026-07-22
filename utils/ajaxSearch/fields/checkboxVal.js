import { useAjaxSearchContext } from "../ajaxSearch";

export const AjaxSearchCheckboxVal = ({
  values = {},
  changeSubmit,
  metaKey = "",
}) => {
  const { setFilter } = useAjaxSearchContext();

  return (
    <>
      {Object.keys(values).map((key, name) => (
        <label key={key} htmlFor={`${metaKey}${key}`}>
          <input
            name={metaKey}
            type="checkbox"
            value={name}
            onChange={(t) => {
              setFilter(
                metaKey,
                t.target.value,
                changeSubmit,
                true,
                t.target.checked
              );
            }}
            id={`${metaKey}${key}`}
          />
          {values[key]}
        </label>
      ))}
    </>
  );
};
