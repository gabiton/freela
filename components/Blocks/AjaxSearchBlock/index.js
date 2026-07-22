import { CardNews } from "@/components/Parts/CardNews";
import { NoResults } from "@/components/Parts/NoResults";
import { AjaxSearch } from "utils/ajaxSearch/ajaxSearch";
import { AjaxSearchCheckbox } from "utils/ajaxSearch/fields/checkbox";
import { AjaxSearchRadio } from "utils/ajaxSearch/fields/radio";
import { AjaxSearchPagination } from "utils/ajaxSearch/fields/pagination";
import { AjaxSearchResults } from "utils/ajaxSearch/fields/results";
import { AjaxSearchSelect } from "utils/ajaxSearch/fields/select";
import { AjaxSearchSubmit } from "utils/ajaxSearch/fields/submit";
import { AjaxSearchInput } from "utils/ajaxSearch/fields/input";

export const AjaxSearchBlock = ({ data }) => {
  let selectValues = {
    1: "Active",
    0: "Not Active",
  };

  return (
    <div className="ajax-search-block">
      <div className="container">
        <AjaxSearch posttype="post" perpage={2} className="ajax-search-block">
          <div className="ajax-search-block__filters">
            <AjaxSearchInput placeholder="Search" submitMinChars={3} />

            <AjaxSearchSelect
              taxonomy="categories"
              taxSlug="category"
              firstItem="Select Category"
              changeSubmit={true}
            />
            <AjaxSearchSelect
              values={selectValues}
              firstItem="All"
              metaKey="active"
              changeSubmit={true}
            />

            {/*            
             
            <AjaxSearchCheckbox taxonomy="categories" taxSlug="category" changeSubmit={true}  />
            <AjaxSearchCheckbox values={selectValues} metaKey="active" changeSubmit={true} />

            <AjaxSearchRadio taxonomy="categories" taxSlug="category" changeSubmit={true}  />
            <AjaxSearchRadio values={selectValues} metaKey="active" changeSubmit={true} />
            */}

            <AjaxSearchSubmit className="button">Submit</AjaxSearchSubmit>
          </div>

          <AjaxSearchResults template={CardNews} noResults={NoResults} />

          <AjaxSearchPagination
            showPrevNext={true}
            nextText="Next"
            prevText="Prev"
            showNumbers={true}
            numbersAmonut={2}
          />
        </AjaxSearch>
      </div>
    </div>
  );
};
