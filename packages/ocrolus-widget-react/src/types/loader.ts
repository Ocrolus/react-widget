import { Configurations } from "packages/ocrolus-widget-react/src/types/appTypes";

export interface loaderConfig {
  id: string;
  widgetUuid: string;
  host: string;
  widgetConfig: Configurations | null;
}
