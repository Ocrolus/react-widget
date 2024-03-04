import React, { useEffect, useMemo } from "react";

export const useScript = (
  url: string,
  scriptId: string,
  onLoad?: () => void,
  onError?: () => void
) => {
  useEffect(() => {
    let script: HTMLScriptElement | null = document.getElementById(
      scriptId
    ) as HTMLScriptElement | null;

    const handleLoad = () => {
      if (onLoad) {
        onLoad();
      }
    };
    const handleError = () => {
      if (onError) {
        onError();
      }
      if (script) {
        script.removeEventListener("load", handleLoad);
        script.removeEventListener("error", handleError);
        document.body.removeChild(script);
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
      script.addEventListener("load", handleLoad);
      script.addEventListener("error", handleError);
    }
    else {
      handleLoad();
    }

    return () => {
      const cleanupScript = document.getElementById(scriptId);
      if (cleanupScript) {
        cleanupScript.removeEventListener("load", handleLoad);
        cleanupScript.removeEventListener("error", handleError);
        document.body.removeChild(cleanupScript);
      }
    };
  }, [url, scriptId]);
};

export const useBundle = (
  url: string,
  onLoad: () => void,
  onError?: () => void
) => {
  const memoizedURL = useMemo(() => url, [url]);

  useEffect(() => {
    const Ocrolus = { React };
    window.Ocrolus = Ocrolus;
  }, []);

  useScript(memoizedURL, "ocrolus-bundle", onLoad, onError);
};
