import React from "react";
import { useWidgetLibrary } from "@ocrolus-widget-react/src/hooks/useWidgetLibrary";
import { OcrolusUploadProps as LibraryUploadProps } from "@ocrolus-widget-react/src/types/OcrolusUpload";

interface OcrolusUploadProps extends LibraryUploadProps {
  loadingElement?: React.ComponentType;
}

export function OcrolusUpload(
  props: React.PropsWithChildren<OcrolusUploadProps>
) {
  const { ready: libReady, OcrolusWidgetLibrary: OcrolusLib } =
    useWidgetLibrary();

  if (!libReady || !OcrolusLib.OcrolusUpload) {
    return props.loadingElement ? (
      <props.loadingElement />
    ) : (
      <div> Loading...</div>
    );
  }

  return (
    <OcrolusLib.OcrolusUpload {...props}>
      {props.children}
    </OcrolusLib.OcrolusUpload>
  );
}
