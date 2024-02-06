/**
 * Parses the JSON returned by a network request
 *
 * @param  {Response} response A response from a network request
 *
 * @return {Promise<any>}     The parsed JSON from the request
 */
function parseJSON(response: Response): Promise<any> {
  if (response.status === 204 || response.status === 205) {
    return Promise.resolve(null);
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {Response} response   A response from a network request
 *
 * @return {Response}            Returns either the response, or throws an error
 */
function checkStatus(response: Response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(response.statusText);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {RequestInit} [options] The options we want to pass to "fetch"
 *
 * @return {Promise<any>}     The response data
 */
export function request(url: string, options: RequestInit = {}): Promise<any> {
  return fetch(url, options).then(checkStatus).then(parseJSON);
}
