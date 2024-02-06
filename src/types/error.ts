import {EVENTS} from 'src/constants';

export interface WidgetError {
  cause: string;
  code: string;
}

export interface WidgetErrorDictionary {
  [key: string]: WidgetError;
}

export const WIDGET_ERRORS: WidgetErrorDictionary = {
  UNABLE_TO_INITIALIZE_LIBRARY: {
    code: 'unable_to_initialize_library',
    cause: 'Unable to initialize widget library',
  },
  INITIALIZE_JWT_TOKEN_FAILURE: {
    code: EVENTS.INITIALIZE_JWT_TOKEN_FAILURE,
    cause: 'Unable to initialize on jwt token',
  },
};
