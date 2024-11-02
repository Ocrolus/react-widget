import { EVENTS } from "@ocrolus-widget-react/src/constants";
import { Configurations } from "@ocrolus-widget-react/src/types/appTypes";

export function initializeModal(config: Configurations) {
  if (!config?.jwtToken) {
    // eslint-disable-next-line no-console
    console.warn(
      "Token not initialized ignoring Ocrolus Upload initialization."
    );
    return;
  }

  window.parent.postMessage(
    {
      type: EVENTS.OPEN_FILE_UPLOADER,
      config,
    },
    "*"
  );
}
