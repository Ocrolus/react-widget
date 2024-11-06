import { EVENTS, PAGES } from "packages/ocrolus-widget-react/src/constants";
import { DefaultConfig } from "packages/ocrolus-widget-react/src/constants/types";
import { Configurations } from "packages/ocrolus-widget-react/src/types/appTypes";

export const INLINE_IFRAME_ID = 'ocrolus-inline-iframe';
export const MODAL_IFRAME_ID = 'ocrolus-modal-iframe';
export const AUTH_TOKEN_TIMER = 30000;

export function getIframe(id: string, win: Window = window): HTMLIFrameElement | null {
  return win.document.getElementById(id) as HTMLIFrameElement;
}

export function updateWidgetConfig(win: Window, eventType: string, config: Configurations) {
  const modalIframe = getIframe(MODAL_IFRAME_ID, win);
  modalIframe?.contentWindow?.postMessage({ type: eventType, config }, '*');
}

export function createInlineIframe(
  win: Window,
  widgetHost: string,
  widgetUuid: string,
  page: string,
  previewMode: boolean = false
): HTMLIFrameElement {
  const iframe = win.document.createElement('iframe');
  iframe.id = INLINE_IFRAME_ID;
  iframe.src = `${widgetHost}/v1/widget/${widgetUuid}?page=${page}&preview=${previewMode}`;
  iframe.setAttribute('data-testid', INLINE_IFRAME_ID);
  iframe.style.width = '100%';
  iframe.style.border = 'none';
  iframe.style.height = '100%';
  iframe.style.position = 'relative';
  return iframe;
}

export function attachMessageListeners(
  win: Window,
  widgetHost: string,
  widgetUuid: string,
  mergedConfig: DefaultConfig
) {
  let intermediateStoreOfConfig: Configurations | null = null;
  const handler = async (message: MessageEvent) => {
    const { data } = message;
    if (data) {
      if (data.type === EVENTS.PREVIEW_MODE_MOUNTED) {
        const inlineIframe = getIframe(INLINE_IFRAME_ID, win);
        if (inlineIframe) {
          const config = {
            widgetUuid,
            jwtToken: 'test-jwt',
            ...mergedConfig,
          };
          inlineIframe.contentWindow?.postMessage(
            {
              type: EVENTS.PREVIEW_MODE_DATA,
              config,
            },
            '*',
          );
        }
      }
      if (data.type === EVENTS.EMBEDDED_WIDGET_MOUNTED) {
        const inlineIframe = getIframe(INLINE_IFRAME_ID, win);
        if (inlineIframe) {
          const config = {
            widgetUuid,
            ...mergedConfig,
          };
          inlineIframe.contentWindow?.postMessage(
            {
              type: EVENTS.EMBEDDED_WIDGET_DATA,
              config,
            },
            '*',
          );
          try {
            const jwtToken = await getJwtToken(win);
            inlineIframe.contentWindow?.postMessage(
              { type: EVENTS.INITIALIZE_JWT_TOKEN_SUCCESS, config: { jwtToken } },
              '*',
            );
          } catch (error) {
            console.error('Error fetching jwt token', error);
            inlineIframe.contentWindow?.postMessage(
              { type: EVENTS.INITIALIZE_JWT_TOKEN_FAILURE },
              '*',
            );
          }
        }
      } else if (data.type === EVENTS.OPEN_PLAID_CONNECT || data.type === EVENTS.OPEN_FILE_UPLOADER) {
        const getPageName = (eventType: string) => {
          switch (eventType) {
            case EVENTS.OPEN_PLAID_CONNECT:
              return PAGES.PLAID_CONNECT;
            case EVENTS.OPEN_FILE_UPLOADER:
              return PAGES.FILE_UPLOADER;
            default:
              return '';
          }
        };
        if (!getIframe(MODAL_IFRAME_ID, win)) {
          const modalIframe = addModalIframe(win, widgetHost, widgetUuid, getPageName(data.type));
          intermediateStoreOfConfig = data.config;
          modalIframe.onload = () => {
            stretchModalIframe(modalIframe);
          };
        }
      } else if (data.type === EVENTS.FILE_UPLOADER_MOUNTED || data.type === EVENTS.PLAID_CONNECTED_MOUNTED) {
        const mountDataMap = {
          [EVENTS.FILE_UPLOADER_MOUNTED]: EVENTS.FILE_UPLOADER_DATA,
          [EVENTS.PLAID_CONNECTED_MOUNTED]: EVENTS.PLAID_CONNECTED_DATA,
        };
        updateWidgetConfig(win, mountDataMap[data.type], intermediateStoreOfConfig as Configurations);
      } else if (data.type === EVENTS.CLOSE_FILE_UPLOADER || data.type === EVENTS.CLOSE_PLAID_CONNECT) {
        const inlineIframe = getIframe(INLINE_IFRAME_ID, win);
        if (inlineIframe && data?.metaData) {
          inlineIframe.contentWindow?.postMessage(data, '*');
        }
        removeModalIframe(win);
        intermediateStoreOfConfig = null;
      }
    }
  };
  win.addEventListener('message', handler);

  return handler;
}

export function addModalIframe(
  win: Window,
  widgetHost: string,
  widgetUuid: string,
  pageName: string
): HTMLIFrameElement {
  const modalIframe = createModalIframe(win, widgetHost, widgetUuid, pageName);
  win.document.body.appendChild(modalIframe);

  if (!modalIframe.contentWindow) {
    throw new Error('Modal iframe content window not found');
  }

  modalIframe.contentWindow.getAuthToken = win.getAuthToken;
  return modalIframe;
}

export function removeModalIframe(win: Window) {
  const modalIframe = getIframe(MODAL_IFRAME_ID, win);
  modalIframe?.remove();
}

export function stretchModalIframe(modalIframe: HTMLIFrameElement) {
  modalIframe.style.width = '100%';
  modalIframe.style.height = '100%';
}

export async function getJwtToken(win: Window): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const executeGetAuthToken = (cb?: () => void) => {
      if (typeof win.getAuthToken === 'function') {
        if (cb) {
          cb();
        }
        resolve(win.getAuthToken());
      }
    };
    executeGetAuthToken();
    const interval = setInterval(() => {
      let timer = 0;
      executeGetAuthToken(() => clearInterval(interval));
      if (timer <= AUTH_TOKEN_TIMER) {
        timer += 500;
      } else {
        reject(new Error("getAuthToken is either not implemented or doesn't exist in scope"));
      }
    }, 500);
  });
}

export function createModalIframe(
  win: Window,
  widgetHost: string,
  widgetUuid: string,
  page: string
): HTMLIFrameElement {
  const iframe = win.document.createElement('iframe');
  iframe.id = MODAL_IFRAME_ID;
  iframe.src = `${widgetHost}/v1/widget/${widgetUuid}?page=${page}`;
  iframe.style.position = 'fixed';
  iframe.style.zIndex = '100000';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  iframe.style.backgroundColor = 'rgba(0,0,0,0.25)';
  return iframe;
}