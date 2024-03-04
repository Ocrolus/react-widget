import { useState, useEffect } from "react";
import { Configurations } from "src/types/appTypes";
import { snakeToCamel } from "src/utils/helper";
import { request } from "src/utils/request";
import { WIDGET_HOST } from "src/constants";
import { WIDGET_ERRORS } from "src/constants/errors";
import { WidgetError } from "src/types/error";

export function useWidgetConfig(widgetUuid: string, jwtToken?: string) {
  const [widgetConfig, setWidgetConfig] = useState<Configurations>({
    lenderUuid: widgetUuid,
    jwtToken,
  } as Configurations);
  const [error, setError] = useState<WidgetError>();
  useEffect(() => {
    if (!widgetUuid) {
      setError(WIDGET_ERRORS.INVALID_WIDGET_UUID);
      return;
    }
    (async () => {
      try {
        const response = await request(
          `${WIDGET_HOST}/v1/widget/${widgetUuid}/config`
        );
        if (!response) {
          setError(WIDGET_ERRORS.UNABLE_TO_FETCH_CONIFG);
        }
        const lenderConfig = snakeToCamel(response);
        setWidgetConfig((currentConfig: Configurations) => ({
          ...currentConfig,
          lenderConfig,
        }));
      } catch (error) {
        setError(WIDGET_ERRORS.UNABLE_TO_FETCH_CONIFG);
      }
    })();
  }, [widgetUuid]);

  useEffect(() => {
    setWidgetConfig((currentConfig: Configurations) => ({
      ...currentConfig,
      lenderUuid: widgetUuid,
      jwtToken,
    }));
  }, [jwtToken, widgetUuid]);

  return { config: widgetConfig, error };
}
