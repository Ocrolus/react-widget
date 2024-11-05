import { EVENTS } from "packages/ocrolus-widget-react/src/constants";
import { Configurations } from "packages/ocrolus-widget-react/src/types/appTypes";

type EventType = (typeof EVENTS)[keyof typeof EVENTS];

interface ClosePlaidMetadata {
  isBankConnected: boolean;
}

interface CloseFileUploaderMetadata {
  uploadedFileCount: number;
}

type MessageMetadata = ClosePlaidMetadata | CloseFileUploaderMetadata;

export type Message = {
  type: EventType;
  config?: Configurations;
  metadata?: MessageMetadata;
};

export interface WidgetConfigMessage extends Message {
  type: string;
  config: Configurations;
}

export interface CloseFileUploaderMessage extends Message {
  type: string;
  metadata: CloseFileUploaderMetadata;
}

export interface ClosePlaidMessage extends Message {
  type: string;
  metadata: ClosePlaidMetadata;
}

export type WidgetMessage =
  | WidgetConfigMessage
  | CloseFileUploaderMessage
  | ClosePlaidMessage;

export function isPlaidMessageMessage(
  message: WidgetMessage,
): message is ClosePlaidMessage {
  return (message as ClosePlaidMessage).metadata.isBankConnected !== undefined;
}

export function isCloseFileUploaderMessage(
  message: WidgetMessage,
): message is CloseFileUploaderMessage {
  return (
    (message as CloseFileUploaderMessage).metadata.uploadedFileCount !==
    undefined
  );
}

export function isConfigMessage(
  message: WidgetMessage,
): message is WidgetConfigMessage {
  return (message as WidgetConfigMessage).config !== undefined;
}
