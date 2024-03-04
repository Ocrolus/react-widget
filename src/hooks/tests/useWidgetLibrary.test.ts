import { renderHook, waitFor, act } from "@testing-library/react";
import { useWidgetLibrary } from "../useWidgetLibrary";
import { WIDGET_ERRORS } from "../../constants/errors";

const widgetLibrary = {
  OcrolusUpload: jest.fn(),
  OcrolusUploadNative: jest.fn(),
  loader: jest.fn(),
};

jest.mock("src/hooks/useScript", () => ({
  useBundle: (_url: string, onLoad: () => void) => {
    window.OcrolusWidgetLibrary = widgetLibrary;
    onLoad();
  },
}));

describe("useWidgetLibrary", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    window.OcrolusWidgetLibrary = undefined;
  });
  test("should set ready to true when the library is loaded", async () => {
    const { result } = renderHook(() => useWidgetLibrary());

    expect(result.current.ready).toBe(false);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(result.current.ready).toBe(true);
    });
  });

  test("should set error when the library fails to load", () => {
    const { result } = renderHook(() => useWidgetLibrary());

    expect(result.current.error).toBeUndefined();

    // Simulate the library not being loaded
    window.OcrolusWidgetLibrary = undefined;
    act(() => {
      jest.advanceTimersByTime(100000);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.error).toEqual(
      WIDGET_ERRORS.UNABLE_TO_INITIALIZE_LIBRARY
    );
  });

  test("should set OcrolusWidgetLibrary when the library is loaded and ready", async () => {
    expect(window.OcrolusWidgetLibrary).toEqual(undefined);

    const { result } = renderHook(() => useWidgetLibrary());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => {
      expect(result.current.OcrolusWidgetLibrary).toEqual(widgetLibrary);
      expect(result.current.ready).toBe(true);
    });
  });
});
