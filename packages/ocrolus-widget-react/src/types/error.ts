import {EVENTS} from 'packages/ocrolus-widget-react/src/constants';

export interface WidgetError {
  cause: string;
  code: string;
}

export interface WidgetErrorDictionary {
  [key: string]: WidgetError;
}
