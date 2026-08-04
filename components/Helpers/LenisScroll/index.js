import { useEffect } from "react";
import { useRouter } from "next/router";

const DEFAULT_LENIS_SETTINGS = {
  wheelMultiplier: 0.8,
  duration: 2,
};

const ROUTE_LENIS_SETTINGS = [
  {
    match: (path) => path.startsWith("/projects"),
    settings: {
      wheelMultiplier: 0.5,
      duration: 2,
    },
  },
];

const getLenisSettings = (path) => {
  const routeSettings = ROUTE_LENIS_SETTINGS.find(({ match }) => match(path));

  return {
    ...DEFAULT_LENIS_SETTINGS,
    ...(routeSettings?.settings || {}),
  };
};

export const LenisScroll = () => {
  const router = useRouter();

  useEffect(() => {
    let isActive = true;
    let lenis;
    let animationFrame;
    let resizeInterval;
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

      lenis = new Lenis(getLenisSettings(router.asPath));

      window.lenis = lenis;

      animationFrame = requestAnimationFrame(raf);
      resizeInterval = setInterval(() => {
        lenis?.resize();
      }, 1000);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      hasWindowListeners = true;
    });

    return () => {
      isActive = false;

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      if (resizeInterval) {
        clearInterval(resizeInterval);
      }

      if (hasWindowListeners) {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
      }

      lenis?.destroy();
      delete window.lenis;
    };
  }, [router.asPath]);

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
