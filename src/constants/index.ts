export const EVENTS = {
  // EMBED WIDGET CASES
  EMBEDDED_WIDGET_MOUNTED: 'EMBEDDED_WIDGET_MOUNTED',
  EMBEDDED_WIDGET_DATA: 'EMBEDDED_WIDGET_DATA',
  // FILE UPLOADER CASES
  OPEN_FILE_UPLOADER: 'OPEN_FILE_UPLOADER',
  FILE_UPLOADER_MOUNTED: 'FILE_UPLOADER_MOUNTED',
  FILE_UPLOADER_DATA: 'FILE_UPLOADER_DATA',
  CLOSE_FILE_UPLOADER: 'CLOSE_FILE_UPLOADER',
  // PLAID CONNECT CASES
  OPEN_PLAID_CONNECT: 'OPEN_PLAID_CONNECT',
  PLAID_CONNECTED_MOUNTED: 'PLAID_CONNECTED_MOUNTED',
  PLAID_CONNECTED_DATA: 'PLAID_CONNECTED_DATA',
  CLOSE_PLAID_CONNECT: 'CLOSE_PLAID_CONNECT',
  // JWT CASES
  INITIALIZE_JWT_TOKEN_SUCCESS: 'INITIALIZE_JWT_TOKEN_SUCCESS',
  INITIALIZE_JWT_TOKEN_FAILURE: 'INITIALIZE_JWT_TOKEN_FAILURE',
  // PREVIEW MODE CASES
  PREVIEW_MODE_MOUNTED: 'PREVIEW_MODE_MOUNTED',
  PREVIEW_MODE_DATA: 'PREVIEW_MODE_DATA',
  UPDATE_PREVIEW_MODE: 'UPDATE_PREVIEW_MODE',
};

export const PAGES = {
  DEFAULT: '',
  HOME: 'home',
  FILE_UPLOADER: 'file-uploader',
  PLAID_CONNECT: 'plaid-connect',
};

export const WIDGET_HOST = 'https://widget-demo.ocrolus.com';