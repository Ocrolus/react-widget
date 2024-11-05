import {useBundle} from 'packages/ocrolus-widget-react/src/hooks/useScript';
import {OcrolusLibrary} from 'packages/ocrolus-widget-react/src/types';
import {useEffect, useState} from 'react';
import { WidgetError} from 'packages/ocrolus-widget-react/src/types/error';
import { WIDGET_HOST } from 'packages/ocrolus-widget-react/src/constants';
import { WIDGET_ERRORS } from 'packages/ocrolus-widget-react/src/constants/errors';

export function useWidgetLibrary() {
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<WidgetError>();
  const [OcrolusWidgetLibrary, setOcrolusWidgetLibrary] = useState<OcrolusLibrary>({});

  useBundle(`${WIDGET_HOST}/static/library_sdk.bundle.js`, () => {
    const checkForLibrary = setInterval(() => {
      if (window.OcrolusWidgetLibrary) {
        setReady(true);
        clearInterval(checkForLibrary);
      }
    }, 500);
    setTimeout(() => {
      if (!window.OcrolusWidgetLibrary) {
        clearInterval(checkForLibrary);
        setError(WIDGET_ERRORS.UNABLE_TO_INITIALIZE_LIBRARY);
      }
      else {
        setReady(true);
        clearInterval(checkForLibrary);
      }
    }, 10000);
  });

  useEffect(() => {
    if (ready && window.OcrolusWidgetLibrary) {
      setOcrolusWidgetLibrary(window.OcrolusWidgetLibrary);
    }
  }, [ready, window.OcrolusWidgetLibrary]);

  return {ready, OcrolusWidgetLibrary, error};
}
