# Ocrolus React Widget

## Installation

Install the package using npm:

```bash
npm install ocrolus-react-widget
```

## Usage

There's two entry points for the widget for react developers the component `OcrolusUpload` and the hook `useWidget`.

### OcrolusUpload Component

The Ocrolus Upload component does not wrap any JSX around the component you pass as a child. It simply makes the component inside onClick open the widget.

#### Props

- `widgetUuid` (required): A unique identifier for the widget.
- `token` (optional): An authentication token.
- `onClose` (optional): Callback function called when the upload is closed. This will return how many files were uploaded.
- `onOpen` (optional): Callback function that must return a promise. The purpose of this method is to execute just in time token fetching prior to opening the widget. In order to get just in time initialization return the access token in this method.
- `onError` (optional): Callback function called in case of an error. This will return errors defined in `WIDGET_ERROR` if the library or the jwt token initialization fails.
- `loadingElement`: (optional): React.ComponentType What to render while the library is initializing. 
- `readyObserver` (optional): Callback to observe the readiness state. This will be called when ready is true.
#### Example

```jsx
import { OcrolusUpload } from "ocrolus-upload-package";

const MyComponent = () => {
  const [error, setError] = useState<boolean>(false);
  const [token, setToken] = useState<string>();
  const handleUploadClose = (data) => {
    console.log("Upload closed. Uploaded file count:", data.uploadedFileCount);
  };
  const handleError = (error) => {
    // Do something with error data
    setError(true)
  }
  const handleFetch = async () => {
    const response = await fetch("https://www.myTokenServer.com")
    const accessToken = await response.json()
    setToken(accessToken)
    return accessToken
  }

  return (
    error ? 
        {/* Your error content here */}
    : <OcrolusUpload
      widgetUuid="your-unique-uuid"
      token={token}
      onOpen={handleFetch}
      onClose={handleUploadClose}
      onError={handleError}
      readyObserver={(isReady) => console.log("Widget is ready:", isReady)}
    >
      {/* Your component content goes here */}
    </OcrolusUpload>
  );
};

export default MyComponent;
```

### useWidget Hook

The `useWidget` hook provides a set of utility functions for managing the Ocrolus upload widget.

#### Example

```jsx
import { useWidget } from 'ocrolus-upload-package';

const MyComponent = () => {
  const { ready, error, exit, open } = useWidget({
    widgetUuid: 'your-unique-uuid',
    token: 'your-auth-token',
    onClose: (data) => console.log('Upload closed. Uploaded file count:', data.uploadedFileCount),
    onError: (error) => console.error('Error during upload:', error),
  });

  // Use the hook values as needed

  return (
    <div>
      { ready ? /* Your component content goes here */ : /* Your Loading placeholder */ }
      <button onClick={open}>Open Upload</button>
      <button onClick={exit}>Exit Upload</button>
    </div>
  );
};

export default MyComponent;
```

## Interfaces

### OcrolusUploadOptions

An interface specifying the options that can be passed to the `OcrolusUpload` component.

```typescript
interface OcrolusUploadOptions {
  widgetUuid: string;
  token?: string;
  onClose?: (data: OnCloseData) => void; // Callback function called when the upload is closed. This will return how many files were uploaded.
  onError?: (error: WidgetError) => void; // Callback function called in case of an initialization error. This will return errors defined in `WIDGET_ERROR` if the library or the jwt token initialization fails.
}
```

### OnCloseData

An interface specifying the data structure passed to the `onClose` callback.

```typescript
interface OnCloseData {
  uploadedFileCount: number;
}
```

### OcrolusUploadHookValues

An interface specifying the values returned by the `useWidget` hook.

```typescript
interface OcrolusUploadHookValues {
  ready: boolean; // Will return true if the widget bundle downloads, the library initializes after the token is passed to the hook.
  error: WidgetError | null; // Will contain a widget error if anything in initialization fails.
  exit: () => void; // Callback to manually close the widget modal
  open: () => void; // Callback to manually open the widget modal
}
```

### WidgetError

An interface specifying the structure of widget errors.

```typescript
interface WidgetError {
  cause: string;
  code: string;
}
```

## Constants

### WIDGET_ERRORS

A dictionary of predefined widget errors.

```typescript
const WIDGET_ERRORS: WidgetErrorDictionary = {
  UNABLE_TO_INITIALIZE_LIBRARY: {
    code: WIDGET_EVENTS.INITIALIZE_LIBRARY_FAILURE,
    cause: "Unable to initialize widget library",
  },
  INITIALIZE_JWT_TOKEN_FAILURE: {
    code: WIDGET_EVENTS.INITIALIZE_JWT_TOKEN_FAILURE,
    cause: "Unable to initialize on jwt token",
  },
};
```

### WIDGET_EVENTS

The `WIDGET_EVENTS` constant provides a set of predefined events used by the Ocrolus upload widget.

```typescript
export const WIDGET_EVENTS = {
  // EMBED WIDGET CASES
  EMBEDDED_WIDGET_MOUNTED: "EMBEDDED_WIDGET_MOUNTED",
  EMBEDDED_WIDGET_DATA: "EMBEDDED_WIDGET_DATA",
  // FILE UPLOADER CASES
  OPEN_FILE_UPLOADER: "OPEN_FILE_UPLOADER",
  FILE_UPLOADER_MOUNTED: "FILE_UPLOADER_MOUNTED",
  FILE_UPLOADER_DATA: "FILE_UPLOADER_DATA",
  CLOSE_FILE_UPLOADER: "CLOSE_FILE_UPLOADER",
  // PLAID CONNECT CASES
  OPEN_PLAID_CONNECT: "OPEN_PLAID_CONNECT",
  PLAID_CONNECTED_MOUNTED: "PLAID_CONNECTED_MOUNTED",
  PLAID_CONNECTED_DATA: "PLAID_CONNECTED_DATA",
  CLOSE_PLAID_CONNECT: "CLOSE_PLAID_CONNECT",
  // JWT CASES
  INITIALIZE_JWT_TOKEN_SUCCESS: "INITIALIZE_JWT_TOKEN_SUCCESS",
  INITIALIZE_JWT_TOKEN_FAILURE: "INITIALIZE_JWT_TOKEN_FAILURE",
  // PREVIEW MODE CASES
  PREVIEW_MODE_MOUNTED: "PREVIEW_MODE_MOUNTED",
  PREVIEW_MODE_DATA: "PREVIEW_MODE_DATA",
  UPDATE_PREVIEW_MODE: "UPDATE_PREVIEW_MODE",
};
```
