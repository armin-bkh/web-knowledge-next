import { useCallback, useEffect, useState } from "react";

const landscapeAngles = [90, 270];

export const useOrientation = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  useEffect(() => {
    checkLandscapeScreen();
    window.addEventListener("orientationchange", checkLandscapeScreen);

    return () => {
      window.removeEventListener("orientationchange", checkLandscapeScreen);
    };
  }, []);

  const checkWindowSize = (event: UIEvent) => {
    setIsMobile(window.screen.width <= 768);
  };

  const checkLandscapeScreen = useCallback(() => {
    const angle =
      (window.screen.orientation || {}).angle ||
      window.orientation ||
      // @ts-ignore
      window.screen.mozOrientation ||
      // @ts-ignore
      window.screen.msOrientation;
    setIsLandscape(landscapeAngles.includes(Math.abs(angle)));
  }, []);

  return { isLandscape, isMobile };
};
