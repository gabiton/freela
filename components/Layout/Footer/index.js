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
      <a className="footer-brand" href="https://bracketmedia.com/" rel="home">
        <Logo />
      </a>
      <ul id="bracketfooternav" className="foonav">
        {menuItems != null &&
          menuItems.map((item, key) => (
            <FooterMenuItem item={item}  key={key} />  
          ))}
      </ul>
    </footer>
  );
};
