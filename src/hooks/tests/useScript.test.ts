import { renderHook, waitFor } from "@testing-library/react";
import { useScript, useBundle } from "../useScript";

const appendRef = document.body.appendChild;
const getLoadSpy = () => {
  return jest
    .spyOn(document.body, "appendChild")
    .mockImplementation((element) => {
      setTimeout(() => element.dispatchEvent(new Event("load")), 0);
      appendRef.call(document.body, element);
      return element;
    });
};
const getFailureSpy = () => {
  return jest
    .spyOn(document.body, "appendChild")
    .mockImplementation((element) => {
      setTimeout(() => element.dispatchEvent(new Event("error")), 0);
      appendRef.call(document.body, element);
      return element;
    });
};

describe("useScript", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should load the script and call the onLoad callback", async () => {
    const appendChildSpy = getLoadSpy();
    const onLoad = jest.fn();
    const onError = jest.fn();
    const scriptId = "myScript";

    renderHook(() =>
      useScript("https://example.com/script.js", scriptId, onLoad, onError)
    );

    await waitFor(() => {
      expect(appendChildSpy).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onLoad).toHaveBeenCalled();
      expect(document.getElementById(scriptId)).toBeInTheDocument();
    });
  });

  it("should handle script loading error and call the onError callback", async () => {
    const appendChildSpy = getFailureSpy();
    const onLoad = jest.fn();
    const onError = jest.fn();
    const scriptId = "myScript";

    renderHook(() =>
      useScript("https://example.com/nonexistent.js", scriptId, onLoad, onError)
    );

    await waitFor(() => {
      expect(appendChildSpy).toHaveBeenCalled();
      expect(onError).toHaveBeenCalled();
      expect(document.getElementById(scriptId)).not.toBeInTheDocument();
    });

    appendChildSpy.mockRestore();
  });
});

describe("useBundle", () => {
  const appendRef = document.body.appendChild;
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should load the bundle and call the onSuccess callback", async () => {
    const appendChildSpy = getLoadSpy();
    const onSuccess = jest.fn();
    const onFailure = jest.fn();

    renderHook(() =>
      useBundle("https://example.com/bundle.js", onSuccess, onFailure)
    );
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("should handle bundle loading failure and call the onFailure callback", async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    const appendChildSpy = getFailureSpy()

    renderHook(() =>
      useBundle("https://example.com/nonexistent.js", onSuccess, onFailure)
    );
    await waitFor(() => {
      expect(onFailure).toHaveBeenCalled();
    });
  });
});
