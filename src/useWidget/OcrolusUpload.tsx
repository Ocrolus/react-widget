import { useWidgetLibrary } from "src/hooks/useWidgetLibrary";
import { OcrolusUploadProps as LibraryUploadProps } from "src/types/OcrolusUpload";

interface OcrolusUploadProps extends LibraryUploadProps {
  loadingElement?: JSX.Element;
}

export function OcrolusUpload(
  props: React.PropsWithChildren<OcrolusUploadProps>
) {
  const { ready: libReady, OcrolusWidgetLibrary: OcrolusLib } =
    useWidgetLibrary();

  if (!libReady || !OcrolusLib.OcrolusUpload) {
    return <>{props.loadingElement}</> || <div> Loading...</div>;
  }

  return (
    <OcrolusLib.OcrolusUpload {...props}>
      {props.children}
    </OcrolusLib.OcrolusUpload>
  );
}
