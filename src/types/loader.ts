import { Configurations } from "src/types/appTypes";

export interface loaderConfig {
  id: string;
  widgetUuid: string;
  host: string;
  widgetConfig: Configurations | null;
}
