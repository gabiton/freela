import { useState, useEffect } from "react";
import { useAjaxSearchContext } from "../ajaxSearch";

export const AjaxSearchCheckboxTax = ({
  taxonomy = "",
  taxSlug = "",
  changeSubmit,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setFilter } = useAjaxSearchContext();

  useEffect(() => {
    const fetchGraphQLData = async () => {
      const query = `
            query {
                ${taxonomy} {
                    nodes {
                    databaseId
                    name
                    description
                    count
                    slug
                    }
                }
            } 
        `;
      try {
        const response = await fetch(process.env.WP_GRAPHQL_URL + "/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching GraphQL data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphQLData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data[taxonomy].nodes.map((item) => (
        <label key={item.databaseId} htmlFor={`${taxSlug}${item.databaseId}`}>
          <input
            type="checkbox"
            value={item.slug}
            onChange={(t) => {
              setFilter(
                taxSlug,
                t.target.value,
                changeSubmit,
                true,
                t.target.checked
              );
            }}
            id={`${taxSlug}${item.databaseId}`}
          />
          {item.name}
        </label>
      ))}
    </>
  );
};
