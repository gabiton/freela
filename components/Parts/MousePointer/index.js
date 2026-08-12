import { useEffect, useRef, useState } from "react";

const POINTER_EASE = 0.16;
const POINTER_PRECISION = 100;

const roundPointerValue = (value) =>
  Math.round(value * POINTER_PRECISION) / POINTER_PRECISION;

export const MousePointer = () => {
  const pointerRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  useEffect(() => {
    const updatePointer = () => {
      const pointer = pointerRef.current;

      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * POINTER_EASE;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * POINTER_EASE;

      if (pointer) {
        pointer.style.setProperty(
          "--pointer-x",
          `${roundPointerValue(positionRef.current.x)}px`,
        );
        pointer.style.setProperty(
          "--pointer-y",
          `${roundPointerValue(positionRef.current.y)}px`,
        );
      }

      animationFrameRef.current = requestAnimationFrame(updatePointer);
    };

    const handleMouseMove = (event) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      setIsVisible(true);
      setIsLinkHovered(Boolean(event.target.closest?.("a")));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsLinkHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    animationFrameRef.current = requestAnimationFrame(updatePointer);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`MousePointer${isVisible ? " is-visible" : ""}${isLinkHovered ? " is-link-hovered" : ""}`}
      ref={pointerRef}
    >
      <span>view project</span>
    </div>
  );
};
