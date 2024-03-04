import { renderHook, waitFor } from "@testing-library/react";
import { WIDGET_HOST } from "../../constants";
import { useWidgetConfig } from "../useWidgetConfig";
import { apiConfig, parsedConfig } from "./constants";

// Mock the global fetch function
global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue(apiConfig),
  headers: new Headers(),
  ok: true,
  redirected: false,
  status: 200,
  statusText: "OK",
  type: "basic",
  url: "http://example.com",
});

describe("useWidgetConfig", () => {
  it("should fetch widget configuration", async () => {
    const widgetUuid = "6a21a64f-f1ce-4b92-b0ef-c3acf8dbf354";
    const jwtToken = "your-jwt-token";

    const { result } = renderHook(() => useWidgetConfig(widgetUuid, jwtToken));

    await waitFor(() => {
      expect(result.current.config).toEqual(parsedConfig);
      expect(global.fetch).toHaveBeenCalledWith(
        `${WIDGET_HOST}/v1/widget/${widgetUuid}/config`,
        {}
      );
    });
  });

  it("should handle errors during fetch", async () => {
    const widgetUuid = "widget-123";
    const jwtToken = "your-jwt-token";

    global.fetch = jest.fn().mockRejectedValue(new Error("Failed to fetch"));

    const { result } = renderHook(() => useWidgetConfig(widgetUuid, jwtToken));

    await waitFor(() => {
      expect(result.current.error).toEqual({
        cause: "Unable to fetch widget Library",
        code: "INITIALIZE_CONFIG_FAILURE",
      });
    });
  });
});
