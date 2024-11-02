import { OcrolusLibrary } from "@ocrolus-widget-react/src/types";
import {
  OcrolusUploadHookValues,
  OcrolusUploadOptions,
  OcrolusUploadProps,
} from "@ocrolus-widget-react/src/types/OcrolusUpload";
import { OcrolusUpload } from "@ocrolus-widget-react/src/useWidget";
import { OcrolusUploadTypes as widgetTypes } from "@ocrolus-widget-react/src/useWidget";

declare module "ocrolus-widget-react" {
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
