import React from "react";
import { OcrolusUploadProps } from "src/types/OcrolusUpload";
import { loaderConfig } from "src/types/loader";

export interface OcrolusLibrary {
  OcrolusUpload?: (
    props: React.PropsWithChildren<OcrolusUploadProps>
  ) => JSX.Element;
  OcrolusUploadNative?: (props: OcrolusUploadProps) => JSX.Element;
  loader?: (
    win: Window,
    scriptElement: HTMLOrSVGScriptElement | null,
    config?: loaderConfig | undefined,
    enableReinitialization?: boolean | undefined
  ) => void;
}

declare global {
  interface Window {
    "loaded-react-widget": boolean;
    Ocrolus?: { React };
    OcrolusWidgetLibrary?: OcrolusLibrary;
  }
}
