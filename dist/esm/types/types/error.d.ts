export interface WidgetError {
    cause: string;
    code: string;
}
export interface WidgetErrorDictionary {
    [key: string]: WidgetError;
}
export declare const WIDGET_ERRORS: WidgetErrorDictionary;
