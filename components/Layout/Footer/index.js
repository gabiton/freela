import Logo from "/public/images/icons/sitelogo.svg";

import { PageContext } from "context/page";
import { useContext } from "react";
import { FooterMenuItem } from "./FooterMenuItem";

export const Footer = (props) => {
  const { menus } = useContext(PageContext);
  let menuItems = menus.footer.items ?? false;
  if ( !menuItems ) return;
  
  return (
    <footer>
    </footer>
  );
};
