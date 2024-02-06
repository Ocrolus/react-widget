import {useBundle} from 'src/hooks/useScript';
import {OcrolusLibrary} from 'src/types';
import {useEffect, useState} from 'react';
import {WIDGET_ERRORS, WidgetError} from 'src/types/error';
import { WIDGET_HOST } from 'src/constants';

export function useWidgetLibrary() {
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<WidgetError>();
  const [OcrolusWidgetLibrary, setOcrolusWidgetLibrary] = useState<OcrolusLibrary>({});

  useBundle(`${WIDGET_HOST}/static/library_sdk.bundle.js`, () => {
    const checkForLibrary = setInterval(() => {
      if (globalLibrary) {
        setReady(true);
      }
    }, 500);
    setTimeout(() => {
      if (!globalLibrary) {
        clearInterval(checkForLibrary);
        setError(WIDGET_ERRORS.UNABLE_TO_INITIALIZE_LIBRARY);
      }
    }, 10000);
  });
  const {OcrolusWidgetLibrary: globalLibrary} = window;

  useEffect(() => {
    if (ready && globalLibrary) {
      setOcrolusWidgetLibrary(globalLibrary);
    }
  }, [ready, globalLibrary]);

  return {ready, OcrolusWidgetLibrary, error};
}
