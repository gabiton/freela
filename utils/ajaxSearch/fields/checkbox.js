import { useState, useEffect } from "react";
import { AjaxSearchCheckboxTax } from "./checkboxTax";
import { AjaxSearchCheckboxVal } from "./checkboxVal";

export const AjaxSearchCheckbox = ({taxonomy = "", values = "", taxSlug = "", firstItem="", changeSubmit = false, metaKey=""}) => {
    
    if ( taxonomy != "" )
        return <AjaxSearchCheckboxTax taxonomy={taxonomy} taxSlug={taxSlug} firstItem={firstItem} changeSubmit={changeSubmit}></AjaxSearchCheckboxTax>;

    
    if ( values != "" )
        return <AjaxSearchCheckboxVal values={values} changeSubmit={changeSubmit} metaKey={metaKey} ></AjaxSearchCheckboxVal>;
    
};
