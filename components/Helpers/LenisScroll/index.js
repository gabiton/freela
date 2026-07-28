import { useEffect } from "react";
import { useRouter } from "next/router";

export const LenisScroll = () => {
  const router = useRouter();

  useEffect(() => {
    let isActive = true;
    let lenis;
    let animationFrame;
    let hasWindowListeners = false;

    const raf = (time) => {
      if (!lenis) {
        return;
      }

      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    const handleMouseDown = (event) => {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      const isScrollbarClick =
        event.clientX >= window.innerWidth - scrollbarWidth;

      if (isScrollbarClick) {
        lenis.stop();
      }
    };

    const handleMouseUp = () => {
      lenis?.start();
    };

    import("lenis").then(({ default: Lenis }) => {
      if (!isActive) {
        return;
      }

      lenis = new Lenis({
        wheelMultiplier: 0.8,
        duration: 2,
      });

      window.lenis = lenis;

      animationFrame = requestAnimationFrame(raf);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      hasWindowListeners = true;
    });

    return () => {
      isActive = false;

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      if (hasWindowListeners) {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
      }

      lenis?.destroy();
      delete window.lenis;
    };
  }, []);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      window.lenis?.scrollTo(0, { immediate: true });
    };

    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  return null;
};
