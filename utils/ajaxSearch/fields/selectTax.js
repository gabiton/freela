import { useState, useEffect } from "react";
import { useAjaxSearchContext } from "../ajaxSearch";

export const AjaxSearchSelectTax = ({
  taxonomy = "",
  taxSlug = "",
  firstItem = "",
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
        const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL , {
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
    <select
      onChange={(t) => {
        setFilter(taxSlug, t.target.value, changeSubmit);
      }}
    >
      {firstItem && <option value="">{firstItem}</option>}

      {data[taxonomy].nodes.map((item) => (
        <option value={item.slug} key={item.databaseId}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
