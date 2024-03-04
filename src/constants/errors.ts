import { EVENTS } from "src/constants";
import { WidgetErrorDictionary } from "src/types/error";

export const WIDGET_ERRORS: WidgetErrorDictionary = {
    UNABLE_TO_INITIALIZE_LIBRARY: {
      code: EVENTS.INITIALIZE_LIBRARY_FAILURE,
      cause: 'Unable to initialize widget library',
    },
    UNABLE_TO_FETCH_CONIFG: {
      code: EVENTS.INITIALIZE_CONFIG_FAILURE,
      cause: 'Unable to fetch widget Library'
    },
    INITIALIZE_JWT_TOKEN_FAILURE: {
      code: EVENTS.INITIALIZE_JWT_TOKEN_FAILURE,
      cause: 'Unable to initialize on jwt token',
    },
  };
  