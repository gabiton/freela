import Link from "next/link";

export const MainMenu = (props) => {
  
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li>
          <Link href="/work">Work</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};
