import {WidgetError} from 'src/types/error';

export interface OnCloseData {
  uploadedFileCount: number;
}

export interface OcrolusUploadOptions {
  widgetUuid: string;
  token?: string;
  onClose?: (data: OnCloseData) => void;
  onError?: (error: WidgetError) => void;
}

export interface OcrolusUploadProps extends OcrolusUploadOptions {
  className?: string;
  style?: React.CSSProperties;
  readyObserver?: (isReady: boolean) => void;
  onOpen?: () => Promise<string | undefined>;
}

export interface OcrolusUploadHookValues {
  ready: boolean;
  error: WidgetError | null;
  exit: () => void;
  open: () => void;
}
