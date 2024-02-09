import { Configurations } from 'src/types/appTypes';
import { WidgetError } from 'src/types/error';
export declare const useSetBackgroundTransparent: () => void;
export declare function useIframeCallbacks(callbacks: {
    handleInitializeToken?: (value: Configurations) => void;
    handleInitializeWidget?: (value: Configurations) => void;
    handleUploaderClose?: (value: number) => void;
    handleError?: (value: WidgetError) => void;
    handleBankConnected?: (value: boolean) => void;
}): void;
