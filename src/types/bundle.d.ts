import { OcrolusLibrary } from "src/types";
import {
  OcrolusUploadHookValues,
  OcrolusUploadOptions,
  OcrolusUploadProps,
} from "src/types/OcrolusUpload";
import { OcrolusUpload } from "src/useWidget";
import { OcrolusUploadTypes as widgetTypes } from "src/useWidget";

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
