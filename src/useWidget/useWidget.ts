import {useState, useCallback} from 'react';
import {OcrolusUploadHookValues, OcrolusUploadOptions} from 'src/types/OcrolusUpload';
import {useWidgetConfig} from 'src/hooks/useWidgetConfig';
import {WidgetError} from 'src/types/error';
import {useIframeCallbacks} from 'src/utils/hooks';
import {EVENTS} from 'src/constants';
import {initializeModal} from 'src/utils/modal';
import {useLoader} from 'src/hooks/useLoader';

export function useWidget(options: OcrolusUploadOptions): OcrolusUploadHookValues {
  const [uploadedFileCount, setUploadedFileCount] = useState<number>(0);
  const {config} = useWidgetConfig(options.widgetUuid, options.token);

  const onClose = useCallback(
    (data: {uploadedFileCount: number}) => {
      if (options.onClose) {
        return options.onClose(data);
      }
    },
    [options],
  );
  const onError = useCallback(
    (error: WidgetError) => {
      if (options.onError) {
        return options.onError(error);
      }
    },
    [options],
  );
  const handleUploaderClose = (newUploadCount: number) => {
    const newCount = uploadedFileCount + newUploadCount;
    setUploadedFileCount(newCount);

    onClose({uploadedFileCount: newCount});
  };
  const handleError = (error: WidgetError) => {
    onError(error);
  };

  const {ready, error} = useLoader(config, options.widgetUuid, options.token, {
    onError: handleError,
  });

  useIframeCallbacks({handleError, handleUploaderClose});

  const open = useCallback(() => initializeModal(config), [config]);
  const exit = useCallback(() => {
    const data = {uploadedFileCount};
    window.parent.postMessage(
      {
        type: EVENTS.CLOSE_FILE_UPLOADER,
        metaData: data,
      },
      '*',
    );
    onClose(data);
  }, [onClose, uploadedFileCount]);

  return {
    ready,
    error,
    exit,
    open,
  };
}