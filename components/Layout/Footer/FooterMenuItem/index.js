import Link from "next/link";
import { useRouter } from "next/router";

export const FooterMenuItem = ( {item, includeSubitem= true } ) => {
  let router = useRouter();

  if ( !item.url ) return

  return (
    <li
      className={`${
        router.asPath === "/" + item.url ||
        process.env.NEXT_PUBLIC_WP_URL + router.asPath + "/" === item.url
          ? "current-menu-item"
          : ""
      } `}
    >
      <Link href={item.url} target={item.target}>{item.title}</Link>

      {item.children && item.children.length > 0 && (
        <ul>
          {item.children.map((subItem, key) => (
            <FooterMenuItem item={subItem} key={key} />
          ))}
        </ul>
      )}
    </li>
  );
};
