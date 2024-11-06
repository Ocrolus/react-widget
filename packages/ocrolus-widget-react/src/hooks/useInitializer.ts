import { useEffect, useRef, useState } from "react";
import { EVENTS, PAGES } from "packages/ocrolus-widget-react/src/constants";
import { DefaultConfig } from "packages/ocrolus-widget-react/src/constants/types";
import { loaderConfig } from "packages/ocrolus-widget-react/src/types/loader";
import { Configurations } from "packages/ocrolus-widget-react/src/types/appTypes";
import {
  attachMessageListeners,
  createInlineIframe,
  updateWidgetConfig,
} from "packages/ocrolus-widget-react/src/utils/iframe";

const DEFAULT_NAME = "ocrolus_script";
const INITIALIZER_SCRIPT = "ocrolus-initializer-script";
const INLINE_IFRAME_ID = "ocrolus-inline-iframe";
const MODAL_IFRAME_ID = "ocrolus-modal-iframe";
const ANCHOR_NODE_ID = "ocrolus-widget-frame";

type MethodNames = "init" | "init-react" | "update-preview-mode";

interface LoaderObject {
  q: Array<[MethodNames, object]>;
}

function getIframe(id: string, win: Window = window): HTMLIFrameElement | null {
  return win.document.getElementById(id) as HTMLIFrameElement;
}

function useInitializer(
  configState?: loaderConfig,
  enableReinitialization: boolean = false
) {
  const [config, setConfig] = useState<DefaultConfig | null>(null);
  const loadedRef = useRef(false);
  const scriptElementRef = useRef<HTMLOrSVGScriptElement | null>(null);

  const initializeInlineIframe = (
    win: Window,
    anchorNode: HTMLElement,
    widgetHost: string,
    widgetUuid: string,
    config: DefaultConfig
  ) => {
    const isPreviewMode = Boolean(config?.devConfig?.previewMode);
    const inlineIframe = createInlineIframe(
      win,
      widgetHost,
      widgetUuid,
      PAGES.HOME,
      isPreviewMode
    );
    if (!anchorNode) {
      console.error("Anchor node is null or undefined.");
      return;
    }
    if (!inlineIframe) {
      console.error("Inline iframe is null or undefined.");
      return;
    }
    anchorNode.appendChild(document.createElement("div"));
    anchorNode.appendChild(inlineIframe);
    inlineIframe.onload = () => {
      console.log("load");
      if (isPreviewMode) {
        inlineIframe.style.height = "550px";
        inlineIframe.style.pointerEvents = "none";
      }
    };
  };

  const startObserving = (
    win: Window,
    instanceName: string,
    widgetHost: string,
    widgetUuid: string
  ) => {
    const handlerRef = attachMessageListeners(
      win,
      widgetHost,
      widgetUuid,
      config as DefaultConfig
    );

    const observer = new MutationObserver((mutationList, obs) => {
      mutationList.forEach((mutation) => {
        mutation.removedNodes.forEach((removedNode) => {
          if (
            removedNode instanceof HTMLElement &&
            (removedNode.id === INITIALIZER_SCRIPT ||
              removedNode.textContent?.includes(INITIALIZER_SCRIPT))
          ) {
            win[`loaded-${instanceName}`] = false;
            // @ts-ignore
            win[instanceName] = null;
            obs.disconnect();
            win.removeEventListener("message", handlerRef);
          }
        });
      });
    });
    observer.observe(win.document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    win[`loaded-${instanceName}`] = true;
  };

  const initializeWidget = () => {
    const win = window;
    const scriptElement = scriptElementRef.current;
    const widgetHost =
      configState?.host ?? scriptElement?.getAttribute("data-host");
    const widgetUuid =
      configState?.widgetUuid ?? scriptElement?.getAttribute("data-uuid");
    const instanceName =
      configState?.id ?? scriptElement?.getAttribute("id") ?? DEFAULT_NAME;

    if (!widgetHost || !widgetUuid) {
      throw new Error("Widget host or UUID not found.");
    }

    if (win[`loaded-${instanceName}`] && !enableReinitialization) {
      throw new Error(`Widget with name [${instanceName}] was already loaded.`);
    }

    const mergedConfig = { ...configState?.widgetConfig } as DefaultConfig;
    const anchorNode = win.document.getElementById(ANCHOR_NODE_ID);
    console.log(anchorNode);
    if (anchorNode) {
      initializeInlineIframe(
        win,
        anchorNode,
        widgetHost,
        widgetUuid,
        mergedConfig
      );
    }
    startObserving(win, instanceName, widgetHost, widgetUuid);
    setConfig(mergedConfig);
  };

  useEffect(() => {
    if (!loadedRef.current) {
      initializeWidget();
    }

    return () => {
      if (loadedRef.current) {
        const win = window;
        const instanceName =
          configState?.id ??
          scriptElementRef.current?.getAttribute("id") ??
          DEFAULT_NAME;
        win[`loaded-${instanceName}`] = false;
        win[instanceName] = null;

        const inlineIframe = getIframe(INLINE_IFRAME_ID, win);
        const modalIframe = getIframe(MODAL_IFRAME_ID, win);
        inlineIframe?.remove();
        modalIframe?.remove();
      }
      loadedRef.current = true;
    };
  }, []);

  return {
    updateWidget: (config: Configurations) =>
      updateWidgetConfig(window, EVENTS.FILE_UPLOADER_DATA, config),
  };
}

export default useInitializer;
