import React, { useEffect } from "react";

function isScrolledIntoView(ele) {
    let offset = ele.getBoundingClientRect();

    var lBound = window.scrollY,
        uBound = lBound + window.innerHeight,
        top = offset.top,
        bottom = top + offset.height;

    return (
        (top > lBound && top < uBound) ||
        (bottom > lBound && bottom < uBound) ||
        (lBound >= top && lBound <= bottom) ||
        (uBound >= top && uBound <= bottom)
    );
}

export const ObserverScroll = ({
    children,
    className = "",
    max = null,
    min = null,
    fromtop = false,
    fromBottom = false,
    offset = 0,
    always = false,
    onMouseLeave = () => {},
    onMouseMove = () => {},
    onMouseEnter = () => {},
    onClick = () => {},
    style = {},
}) => {
    const ref = React.createRef();

    const handleScroll = (element) => {
        if (!element) return;
        if (isScrolledIntoView(element) && !always) {
            requestAnimationFrame(() => {
                handleScroll(element);
            });
            return;
        }

        let elementOffset = element.getBoundingClientRect();
        let elementMiddle;
        let elementDistance;

        if (fromtop) {
            elementDistance = elementOffset.top + offset;
        } else if (fromBottom) {
            elementMiddle = elementOffset.top + window.scrollY + offset;
            elementDistance =
                window.scrollY + window.innerHeight - elementMiddle;
        } else {
            elementMiddle =
                elementOffset.top + elementOffset.height / 2 + window.scrollY;
            elementDistance =
                window.scrollY +
                window.innerHeight / 2 -
                elementMiddle +
                offset;
        }

        if (min != null && elementDistance < min) {
            elementDistance = min;
        }
        if (max != null && elementDistance > max) {
            elementDistance = max;
        }

        element.style.setProperty("--elementDistance", elementDistance);

        requestAnimationFrame(() => {
            handleScroll(element);
        });
    };

    useEffect(() => {
        if (!ref.current) return;
        const element = ref.current;
        /*
    let observer = setInterval(() => {
      handleScroll(element);
    }, 10);
    */

        requestAnimationFrame(() => {
            handleScroll(element);
        });
    }, []);

    return (
        <div
            ref={ref}
            className={`${className}`}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            style={style}
        >
            {children}
        </div>
    );
};
