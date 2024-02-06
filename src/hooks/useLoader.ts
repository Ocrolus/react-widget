import {useState, useEffect} from 'react';
import {WIDGET_HOST} from 'src/constants';
import {useWidgetLibrary} from 'src/hooks/useWidgetLibrary';
import {Configurations} from 'src/types/appTypes';
import {WIDGET_ERRORS, WidgetError} from 'src/types/error';

export function useLoader(
  config: Configurations,
  widgetUuid: string,
  token?: string,
  handlers?: {onError?: (e: any) => void; onReady?: (isReady: boolean) => void},
) {
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<WidgetError | null>(null);
  const [loaderCalled, setLoaderCalled] = useState<boolean>(false);
  const {ready: libReady, OcrolusWidgetLibrary: OcrolusLib} = useWidgetLibrary();

  useEffect(() => {
    const iframeReady = window['loaded-react-widget'];
    setReady(!!(iframeReady && token && config));
  }, [token, config, libReady, loaderCalled]);

  useEffect(() => {
    try {
      //TODO: Loader should reload if props change?
      if (libReady && config.lenderConfig && OcrolusLib.loader && !loaderCalled) {
        OcrolusLib.loader(
          window,
          null,
          {
            id: 'react-widget',
            widgetUuid,
            host: WIDGET_HOST,
            widgetConfig: config,
          },
          true,
        );
        setLoaderCalled(true);
      }
      // TODO: cleanup
    } catch (e: any) {
      setError(WIDGET_ERRORS.UNABLE_TO_INITIALIZE_LIBRARY);
      if (handlers && handlers.onError) {
        handlers.onError(WIDGET_ERRORS.UNABLE_TO_INITIALIZE_LIBRARY);
      }
    }
  }, [libReady, OcrolusLib, config, handlers, widgetUuid, loaderCalled]);

  return {ready, error};
}
