import { InitializerProps } from "packages/ocrolus-widget-react/src/hooks/useInitializer";
import { OcrolusLibrary } from "packages/ocrolus-widget-react/src/types";
import {
  OcrolusUploadHookValues,
  OcrolusUploadOptions,
  OcrolusUploadProps,
} from "packages/ocrolus-widget-react/src/types/OcrolusUpload";
import { OcrolusUpload } from "packages/ocrolus-widget-react/src/useWidget";
import { OcrolusUploadTypes as widgetTypes } from "packages/ocrolus-widget-react/src/useWidget";

declare module "packages/ocrolus-widget-react" {
  export declare function useInitializer(
    params: InitializerProps
  ): void;
  export declare function useWidget(
    props: OcrolusUploadOptions
  ): OcrolusUploadHookValues;
  export declare function OcrolusUpload(
    props: React.PropsWithChildren<OcrolusUploadProps>
  ): JSX.Element;
  export declare interface OcrolusUploadTypes {
    OcrolusUploadHookValues: widgetTypes.OcrolusUploadHookValues;
    OcrolusUploadProps: widgetTypes.OcrolusUploadProps;
    OcrolusUploadOptions: widgetTypes.OcrolusUploadOptions;
    OnCloseData: widgetTypes.OnCloseData;
  }
}
