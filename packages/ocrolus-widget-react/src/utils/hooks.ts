import { useCallback, useEffect } from "react";
import { EVENTS } from "packages/ocrolus-widget-react/src/constants";
import { Configurations } from "packages/ocrolus-widget-react/src/types/appTypes";
import { WidgetError } from "packages/ocrolus-widget-react/src/types/error";
import { WIDGET_ERRORS } from "packages/ocrolus-widget-react/src/constants/errors";
import {
  isCloseFileUploaderMessage,
  isConfigMessage,
  isPlaidMessageMessage,
  WidgetMessage,
} from "packages/ocrolus-widget-react/src/types/messages";

export const useSetBackgroundTransparent = () => {
  useEffect(() => {
    // make the body transparent
    const iframeBodyStyles = document.createElement("style");
    const styleText = document.createTextNode(`body {
          background-color : transparent !important;
        }`);
    iframeBodyStyles.appendChild(styleText);
    document.head.append(iframeBodyStyles);
    return () => {
      document.head.removeChild(iframeBodyStyles);
    };
  }, []);
};

export function useIframeCallbacks(callbacks: {
  handleInitializeToken?: (value: Configurations) => void;
  handleInitializeWidget?: (value: Configurations) => void;
  handleUploaderClose?: (value: number) => void;
  handleError?: (value: WidgetError) => void;
  handleBankConnected?: (value: boolean) => void;
}) {
  const {
    handleInitializeWidget = () => {},
    handleInitializeToken = () => {},
    handleError = () => {},
    handleUploaderClose = () => {},
    handleBankConnected = () => {},
  } = callbacks;
  const registerMessageSubscriptions = useCallback(
    (message: { data: WidgetMessage }) => {
      if (message && message.data) {
        const { data } = message;
        const { type } = data;
        if (type === EVENTS.EMBEDDED_WIDGET_DATA) {
          if (!isConfigMessage(data)) {
            throw new Error("Invalid message type. Missing config data.");
          }
          const { config } = data;
          handleInitializeWidget(config);
        } else if (type === EVENTS.INITIALIZE_JWT_TOKEN_SUCCESS) {
          if (!isConfigMessage(data)) {
            throw new Error("Invalid message type. Missing config data.");
          }
          const { config } = data;
          handleInitializeToken(config);
        } else if (type === EVENTS.INITIALIZE_JWT_TOKEN_FAILURE) {
          handleError(WIDGET_ERRORS.INITIALIZE_JWT_TOKEN_FAILURE);
        } else if (type === EVENTS.CLOSE_FILE_UPLOADER) {
          if (!isCloseFileUploaderMessage(data)) {
            throw new Error("Invalid message type. Missing uploaded medata.");
          }
          const { uploadedFileCount } = data.metadata;
          handleUploaderClose(uploadedFileCount);
        } else if (type === EVENTS.CLOSE_PLAID_CONNECT) {
          if (!isPlaidMessageMessage(data)) {
            throw new Error("Invalid message type. Missing bank connection medata.");
          }
          const { isBankConnected } = data.metadata;
          handleBankConnected(isBankConnected);
        }
      }
    },
    [
      handleInitializeToken,
      handleInitializeWidget,
      handleBankConnected,
      handleUploaderClose,
      handleError,
    ],
  );

  useEffect(() => {
    window.addEventListener("message", registerMessageSubscriptions);
    return () =>
      window.removeEventListener("message", registerMessageSubscriptions);
  }, [registerMessageSubscriptions]);
}
