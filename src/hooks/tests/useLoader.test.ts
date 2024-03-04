import { renderHook, waitFor } from "@testing-library/react";
import { useLoader } from "../useLoader";
import { parsedConfig } from "../tests/constants";

jest.mock("src/hooks/useWidgetLibrary", () => ({
  useWidgetLibrary: () => {
    window["loaded-react-widget"] = true;

    return {
      ready: true,
      OcrolusWidgetLibrary: { loader: jest.fn() } as any,
    };
  },
}));

describe("useLoader", () => {
  test("should return initial state and call onReady with true", () => {
    const onReadyMock = jest.fn();
    const widgetUuid = "mock-widget-uuid";
    const token = "mock-token";

    const { result } = renderHook(() =>
      useLoader(parsedConfig, widgetUuid, token, { onReady: onReadyMock })
    );
    expect(result.current).toEqual({
      ready: true,
      error: null,
    });
    expect(onReadyMock).toHaveBeenCalledWith(true);
  });

  test("should return error and call onError when widget loading fails", () => {
    const onErrorMock = jest.fn();
    const widgetUuid = "mock-widget-uuid";
    const token = "mock-token";

    // Mock the widget loading failure
    jest.doMock("src/hooks/useWidgetLibrary", () => ({
      useWidgetLibrary: () => ({
        loadWidget: () => {
          throw new Error("Widget loading failed");
        },
      }),
    }));

    const { result } = renderHook(() =>
      useLoader(parsedConfig, widgetUuid, token, { onError: onErrorMock })
    );

    waitFor(() => {
      expect(result.current).toEqual({
        isLoading: false,
        error: "Widget loading failed",
        widget: null,
      });
      expect(onErrorMock).toHaveBeenCalledWith("Widget loading failed");
    });
  });
});
