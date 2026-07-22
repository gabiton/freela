import { PageContext } from "context/page";
import { useContext } from "react";

export const MobileMenu = (props) => {
  const context = useContext(PageContext);

  return (
    <button className="mobileMenu" onClick={() => { context.setMenuOpened(!context.menuOpened); }}>
      <span></span><span></span><span></span>
      <em className="reader-only">Open menu</em>
    </button>
  );
};
