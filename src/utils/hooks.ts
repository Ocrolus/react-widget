import {EVENTS} from 'src/constants';
import {Configurations} from 'src/types/appTypes';
import {WIDGET_ERRORS, WidgetError} from 'src/types/error';
import {useCallback, useEffect} from 'react';

export const useSetBackgroundTransparent = () => {
  useEffect(() => {
    // make the body transparent
    const iframeBodyStyles = document.createElement('style');
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
    message => {
      if (message && message.data) {
        const {type, config, metaData} = message.data;
        if (type === EVENTS.EMBEDDED_WIDGET_DATA) {
          handleInitializeWidget(config);
        } else if (type === EVENTS.INITIALIZE_JWT_TOKEN_SUCCESS) {
          handleInitializeToken(config);
        } else if (type === EVENTS.INITIALIZE_JWT_TOKEN_FAILURE) {
          handleError(WIDGET_ERRORS.INITIALIZE_JWT_TOKEN_FAILURE);
        } else if (type === EVENTS.CLOSE_FILE_UPLOADER) {
          handleUploaderClose(metaData.uploadedFileCount);
        } else if (type === EVENTS.CLOSE_PLAID_CONNECT) {
          handleBankConnected(metaData?.isBankConnected);
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
    window.addEventListener('message', registerMessageSubscriptions);
    return () => window.removeEventListener('message', registerMessageSubscriptions);
  }, [registerMessageSubscriptions]);
}
