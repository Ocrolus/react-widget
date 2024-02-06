import { useState, useEffect } from "react";
import { Configurations } from "src/types/appTypes";
import { snakeToCamel } from "src/utils/helper";
import { request } from "src/utils/request";
import { WIDGET_HOST } from "src/constants";

export function useWidgetConfig(widgetUuid: string, jwtToken?: string) {
  const [widgetConfig, setWidgetConfig] = useState<Configurations>({
    lenderUuid: widgetUuid,
    jwtToken,
  } as Configurations);
  useEffect(() => {
    (async () => {
      const response = await request(
        `${WIDGET_HOST}/v1/widget/${widgetUuid}/config`
      );
      if (!response) {
        throw new Error("no config present");
      }
      const lenderConfig = snakeToCamel(response);
      setWidgetConfig((currentConfig: Configurations) => ({ ...currentConfig, lenderConfig }));
    })();
  }, [widgetUuid]);

  useEffect(() => {
    setWidgetConfig((currentConfig: Configurations) => ({
      ...currentConfig,
      lenderUuid: widgetUuid,
      jwtToken,
    }));
  }, [jwtToken, widgetUuid]);

  return { config: widgetConfig };
}
