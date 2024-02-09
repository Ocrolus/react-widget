import { Configurations } from 'src/types/appTypes';
import { WidgetError } from 'src/types/error';
export declare function useLoader(config: Configurations, widgetUuid: string, token?: string, handlers?: {
    onError?: (e: any) => void;
    onReady?: (isReady: boolean) => void;
}): {
    ready: boolean;
    error: WidgetError | null;
};
