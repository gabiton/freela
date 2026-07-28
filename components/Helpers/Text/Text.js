export const Text = ({
    children,
    className = ""
}) => {
    const html =
        typeof children === "string"
            ? children.replace(/(?:\r\n|\r|\n)/g, "<br>")
            : children;

    return (
        <div
            className={`wysiwyg-text ${className}`}
            dangerouslySetInnerHTML={{__html: html}}
        >
        </div>
    );
};
