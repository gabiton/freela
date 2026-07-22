import { useAjaxSearchContext } from "../ajaxSearch";

export const AjaxSearchSelectVal = ({
  values = {},
  firstItem = "",
  changeSubmit,
  metaKey = "",
}) => {
  const { setFilter } = useAjaxSearchContext();

  return (
    <select
      onChange={(t) => {
        setFilter(metaKey, t.target.value, changeSubmit);
      }}
    >
      {firstItem && <option value="">{firstItem}</option>}

      {Object.keys(values).map((key, name) => (
        <option value={key} key={key}>
          {values[key]}
        </option>
      ))}
    </select>
  );
};
