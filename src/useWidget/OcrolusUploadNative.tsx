import React from 'react';
import {useWidgetLibrary} from 'src/hooks/useWidgetLibrary';
import {OcrolusUploadProps as LibraryUploadProps} from 'src/types/OcrolusUpload';

interface OcrolusUploadProps extends LibraryUploadProps {
  notReady?: (() => JSX.Element | null | undefined) | React.ComponentType<any>;
}

export function OcrolusUploadNative(props: React.PropsWithChildren<OcrolusUploadProps>) {
  const {ready: libReady, OcrolusWidgetLibrary: OcrolusLib} = useWidgetLibrary();

  if (!libReady || !OcrolusLib.OcrolusUploadNative) {
    return <>{props.notReady}</> || <div> Loading...</div>;
  }

  return <OcrolusLib.OcrolusUploadNative widgetUuid={props.widgetUuid} token={props.token} />;
}
