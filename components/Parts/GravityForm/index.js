import GravityFormForm from "next-gravity-forms";
import React, { useState, useEffect } from "react";
import { gravityFormQuery } from "next-gravity-forms/server";

async function fetchAPI(query, { baseUrl, variables } = {}) {
  const res = await fetch(
    baseUrl || process?.env?.NEXT_PUBLIC_WORDPRESS_API_URL,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  const json = await res.json();

  if (json.errors) {
    console.log(JSON.stringify(json.errors, null, 2));
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export const GravityForm = ({ id }) => {
  const [form, setForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const form = await fetchAPI(gravityFormQuery, { variables: { id } });
        setForm(form);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      form
      {form && <GravityFormForm data={form} />}
    </div>
  );
};
