import { useAjaxSearchContext } from "../ajaxSearch";

export const AjaxSearchRadioVal = ({
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
            type="radio"
            value={name}
            name={metaKey}
            onChange={(t) => {
              setFilter(
                metaKey,
                t.target.value,
                changeSubmit
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
