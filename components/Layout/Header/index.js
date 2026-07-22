import Link from "next/link";
import Logo from "/public/icons/sitelogo.svg";
import { MainMenu } from "components/Layout/MainMenu";
import { MobileMenu } from "@/components/Parts/MobileMenu";

export const Header = (props) => {
  return (
    <header className="header">
      <Link className="navbar-brand" href="/">
        <Logo />
      </Link>      

      <MainMenu/>

      <div className="header__right">
        <Link href="#">Contact</Link>
      </div>
      <MobileMenu />
    </header>
  );
};
