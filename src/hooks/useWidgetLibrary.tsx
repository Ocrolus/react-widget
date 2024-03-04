import {useBundle} from 'src/hooks/useScript';
import {OcrolusLibrary} from 'src/types';
import {useEffect, useState} from 'react';
import { WidgetError} from 'src/types/error';
import { WIDGET_HOST } from 'src/constants';
import { WIDGET_ERRORS } from 'src/constants/errors';

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
