import { useState, useEffect } from "react";
import { AjaxSearchSelectTax } from "./selectTax";
import { AjaxSearchSelectVal } from "./selectVal";

export const AjaxSearchSelect = ({taxonomy = "", values = "", taxSlug = "", firstItem="", changeSubmit = false, metaKey=""}) => {
    
    if ( taxonomy != "" )
        return <AjaxSearchSelectTax taxonomy={taxonomy} taxSlug={taxSlug} firstItem={firstItem} changeSubmit={changeSubmit}></AjaxSearchSelectTax>;

    if ( values != "" )
        return <AjaxSearchSelectVal values={values} firstItem={firstItem} changeSubmit={changeSubmit} metaKey={metaKey} ></AjaxSearchSelectVal>;
};
