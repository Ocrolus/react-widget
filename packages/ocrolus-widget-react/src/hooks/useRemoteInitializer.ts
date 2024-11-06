import { WIDGET_HOST } from "packages/ocrolus-widget-react/src/constants";
import { useState, useEffect, useRef } from "react";

export interface InitializerProps {
  containerId?: string;
  widgetUuid: string;
}

const INITIALIZER_SCRIPT_ID = "ocrolus-initializer-script";
const INITIALIZER_CONTAINER_ID = "ocrolus-widget-frame";

// This hook is responsible for creating the container element that the widget will be mounted to.
// If the container is not provided an invisible inline iframe will be created.
export function useInitializer({ containerId, widgetUuid }: InitializerProps) {
  const [existingContainer, setExistingContainer] =
    useState<HTMLElement | null>(null);
  const [existingWidgetUuid, setExistingWidgetUuid] = useState<string | null>(
    null
  );
  const inlineFrameContainerRef = useRef<HTMLElement | null>(
    document.getElementById(INITIALIZER_CONTAINER_ID)
  );

  const container = containerId ? document.getElementById(containerId) : null;
  const containerCreated = useRef(false);

  if (containerId && !container) {
    throw new Error(
      `Supplying container implies that a container exists, but no container with id ${containerId} was found`
    );
  }

  const appendScript = () => {
    const script = document.createElement("script");
    script.id = INITIALIZER_SCRIPT_ID;
    script.innerHTML = `(function (w, d, s, o, h, u, f, js, fjs) { w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments); }; (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]); js.id = o; js.dataset.host = h; js.dataset.uuid = u; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs); })( window, document, 'script', 'ocrolus_script', ${WIDGET_HOST}, widgetUuid, '${WIDGET_HOST}/static/initializer-sdk.bundle.js' ); ocrolus_script('init', );`;
    document.body.appendChild(script);
  };

  const removeFrameAndScript = (inlineFrameContainer: HTMLElement) => {
    const initializerScript = document.getElementById(INITIALIZER_SCRIPT_ID);

    document.body.removeChild(inlineFrameContainer);
    if (initializerScript) {
      document.body.removeChild(initializerScript);
    }
    containerCreated.current = false;
  };

  // Create and fill container with widget hosting div that the initializer script will search for.
  // If the container mutates over time unmount the previous iframe and mount a new one.
  useEffect(() => {
    const inlineFrameContainer = inlineFrameContainerRef.current;

    if (inlineFrameContainer) {
      if (container && !existingContainer) {
        console.warn(
          "Container was provided but there is already an inline frame in the dom. The inline iframe has been removed and the container will be used"
        );
        removeFrameAndScript(inlineFrameContainer);
        inlineFrameContainerRef.current = null;
      } else if (
        (existingWidgetUuid && widgetUuid !== existingWidgetUuid) ||
        (container && container !== existingContainer)
      ) {
        removeFrameAndScript(inlineFrameContainer);
        inlineFrameContainerRef.current = null;
      }
    }

    if (container && container !== existingContainer) {
      const inlineFrameElement = document.createElement("div");
      inlineFrameElement.id = INITIALIZER_CONTAINER_ID;
      inlineFrameElement.style.width = "100%";
      inlineFrameElement.style.height = "100%";
      container.appendChild(inlineFrameElement);
      setExistingContainer(container);
      containerCreated.current = true;
      appendScript();
    } else if (!containerCreated.current) {
      // add a div to the root of the dom that is not visible to the user but is not display none
      const containerElement = document.createElement("div");
      containerElement.style.width = "0";
      containerElement.style.height = "0";
      containerElement.style.border = "none";
      containerElement.style.position = "absolute";
      containerElement.style.left = "-9999px";
      containerElement.style.top = "-9999px";
      containerElement.id = INITIALIZER_CONTAINER_ID;
      document.body.appendChild(containerElement);
      setExistingContainer(containerElement);
      containerCreated.current = true;
      appendScript();
    }

    setExistingWidgetUuid(widgetUuid);
  }, [container, widgetUuid, existingContainer, existingWidgetUuid]);
}
