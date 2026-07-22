import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const PageContext = createContext(null);

export const PageWrapper = ({ value, children }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [bodyIn, setBodyIn] = useState(false);
  const [isWindowScrolled, setIsWindowScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("");
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const options = value.props.options;
  const menus = value.props.menus;

  const router = useRouter();

  // Handle scroll. Add scroll direction classes
  let scrollYLimit = 100; // When to add the scrolled class
  const handleScroll = () => {
    window.scrollY > scrollYLimit
      ? setIsWindowScrolled(true)
      : setIsWindowScrolled(false);
    lastScrollTop > window.scrollY
      ? setScrollDirection("nav-down")
      : setScrollDirection("nav-up");
    setLastScrollTop(window.scrollY);
  };

  // Add scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    setTimeout(() => {
      setBodyIn(true);
    }, 500);

    router.events.on("routeChangeStart", () => {
      setBodyIn(false);
    });
    router.events.on("routeChangeComplete", () => {
      setBodyIn(true);
    });
  }, [router.events]);

  // Close menu on page change
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setMenuOpened(false);
    });
  }, [router.events]);
  

  return (
    <PageContext.Provider
      value={{
        setMenuOpened,
        menuOpened,
        options,
        menus
      }}
    >
      <div
        className={`
        pagecontainer
        ${menuOpened ? "menuopen" : ""}
        ${bodyIn ? " bodyin " : ""} 
        ${isWindowScrolled ? " scrolled " : ""} 
        ${scrollDirection}
        `}
      >
        {children}
      </div>
    </PageContext.Provider>
  );
};
