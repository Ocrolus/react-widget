/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {RequestInit} [options] The options we want to pass to "fetch"
 *
 * @return {Promise<any>}     The response data
 */
export declare function request(url: string, options?: RequestInit): Promise<any>;
