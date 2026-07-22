export const Text = ({
    children,
    className = ""
}) => {
    return (
        <div
            className={`wysiwyg-text ${className}`}
            dangerouslySetInnerHTML={{__html: children}}
        >
        </div>
    );
};
