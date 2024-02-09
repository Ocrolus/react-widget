import React from 'react';
import { OcrolusUploadProps as LibraryUploadProps } from 'src/types/OcrolusUpload';
interface OcrolusUploadProps extends LibraryUploadProps {
    notReady?: (() => JSX.Element | null | undefined) | React.ComponentType<any>;
}
export declare function OcrolusUploadNative(props: React.PropsWithChildren<OcrolusUploadProps>): JSX.Element;
export {};
