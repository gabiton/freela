import { AjaxSearchRadioTax } from "./radioTax";
import { AjaxSearchRadioVal } from "./radioVal";

export const AjaxSearchRadio = ({taxonomy = "", values = "", taxSlug = "", firstItem="", changeSubmit = false, metaKey=""}) => {
    
    if ( taxonomy != "" )
        return <AjaxSearchRadioTax taxonomy={taxonomy} taxSlug={taxSlug} firstItem={firstItem} changeSubmit={changeSubmit}></AjaxSearchRadioTax>;

    
    if ( values != "" )
        return <AjaxSearchRadioVal values={values} changeSubmit={changeSubmit} metaKey={metaKey} />;
    
};
