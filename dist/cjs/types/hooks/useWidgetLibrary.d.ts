import { OcrolusLibrary } from 'src/types';
import { WidgetError } from 'src/types/error';
export declare function useWidgetLibrary(): {
    ready: boolean;
    OcrolusWidgetLibrary: OcrolusLibrary;
    error: WidgetError | undefined;
};
