import React, { useCallback, useEffect, useMemo } from "react";

export const useScript = (
  url: string,
  onLoad: () => void,
  scriptId: string
) => {
  useEffect(() => {
    let isMounted = true;
    const script = document.createElement("script");
    const handleLoad = () => {
      if (onLoad && typeof onLoad === "function") {
        onLoad();
      }
    };
    if (document.getElementById(scriptId)) {
      handleLoad();
    } else {
      script.src = url;
      script.async = true;
      script.id = scriptId;

      script.addEventListener("load", handleLoad);

      document.body.appendChild(script);
    }

    return () => {
      isMounted = false;
      script.removeEventListener("load", handleLoad);
      if (isMounted) {
        document.body.removeChild(script);
      }
    };
  }, [url, onLoad, scriptId]);
};

export const useBundle = (url: string, onLoad: () => void) => {
  const memoizedURL = useMemo(() => url, [url]);
  const memoizedCallback = useCallback(onLoad, [onLoad]);

  useEffect(() => {
    const Ocrolus = { React };
    window.Ocrolus = Ocrolus;
  }, []);

  useScript(memoizedURL, memoizedCallback, "ocrolus-bundle");
};
