import Link from "next/link";

export const Button = ({
    button,
    style = "primary",
    icon=""
}) => {

    if ( !button ) return
    if ( !button.url ) return

    return (
        <Link
            className={`btn btn-${style}`}
            href={button.url}
            target={button.target ? button.target : ""}
        >
            {button.icon && button.icon}
            {button.title && button.title}
        </Link>
    );
};
