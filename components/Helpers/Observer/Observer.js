import React, { useEffect, useState, useRef } from "react";

export const Observer = ({
    callback = () => {},
    children,
    threshold = 0.25,
    className = "",
    style = {},
}) => {
    const [scrolledIn, setScrolledIn] = useState(false);
    const ref = React.createRef();

    useEffect(() => {
        if (!ref.current) return;
        if (scrolledIn) return;

        const cachedRef = ref.current;
        const observer = new IntersectionObserver(
            (entries, observer) => {
                let element = entries[0].target;
                if (entries[0].isIntersecting) {
                    setScrolledIn(true);
                    callback();
                    observer.disconnect();
                }
            },
            { threshold: threshold }
        );

        observer.observe(cachedRef);
        return () => observer.unobserve(cachedRef);
    }, [ref]);

    return (
        <div
            ref={ref}
            className={`${className} ${scrolledIn == true ? "in" : ""} `}
            style={style}
        >
            {children}
        </div>
    );
};
