import { useState, useEffect, createContext, useContext } from 'react';
const AjaxSearchContext = createContext();


export const AjaxSearch = ({ children, className = {}, posttype = "post", perpage = 6 }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setPageState] = useState(1);
    let page = currentPage;

    const [filters, setFilters] = useState([]);
    const setFilter = (key, value, changeSubmit= false, isMultiple = false, isChecked = false ) => {
      let currentFilter = filters;

      // for checkboxes
      if ( isMultiple ) {
        if (!currentFilter[key]) currentFilter[key] = []
        // for checkboxes, see if its checked or not
        if ( isChecked )
          currentFilter[key][value] = value;
        else
          delete currentFilter[key][value];        
      } else {
        if ( value )
          currentFilter[key] = value;
        else
          delete currentFilter[key];
      }      

      setFilters( currentFilter );

      setPageState(1);
      page = 1;

      if ( changeSubmit ) {
        submit();
      }
    }

    const submit = () => {
      setLoading(true);
      fetchGraphQLData();
    }

    const setPage = (cpage) => {
      page = cpage;
      setPageState(cpage);
      submit();
      
    } 

    const serialize = function(obj) {
      var str = [];
      for(var p in obj){
        if ( Array.isArray(obj[p]) ) {
          // for arrays (checkboxes) loop troguth the array and add [] to the key
          for(var pp in obj[p]){
            if (obj[p].hasOwnProperty(pp)) {
              str.push(encodeURIComponent(p) + "[]=" + encodeURIComponent(obj[p][pp]));
            }
          }
          
        } else {
          if (obj.hasOwnProperty(p)) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
        }
      }
      return str.join("&");
   }

    const fetchGraphQLData = async () => {
      let filterstring = serialize(filters)

      const query = `
            query {
                loadAjaxResults(post_types: "${posttype}", perpage: ${perpage}, filters: "${filterstring}", page: ${page})
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
  
    useEffect(() => {
      fetchGraphQLData();
    }, []);

    return (
        <AjaxSearchContext.Provider className={`${className} ajax-search`} value={{ data, setFilter, loading, submit, setPage }}>
            {children}
            
        </AjaxSearchContext.Provider>
    );
  };
  
  export const useAjaxSearchContext = () => useContext(AjaxSearchContext);
