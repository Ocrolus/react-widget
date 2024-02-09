/// <reference types="react" />
import { OcrolusUploadProps as LibraryUploadProps } from "src/types/OcrolusUpload";
interface OcrolusUploadProps extends LibraryUploadProps {
    loadingElement?: JSX.Element;
}
export declare function OcrolusUpload(props: React.PropsWithChildren<OcrolusUploadProps>): JSX.Element;
export {};
