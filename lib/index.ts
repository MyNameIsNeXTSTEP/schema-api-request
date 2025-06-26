import {
  EApiRequestMethods,
  type TRouteSchema,
  type TRequestPayload,
  type THeaders, TAuthHeaders
} from './types';

const isProd = process.env.NODE_ENV === 'production';

/**
 * @Usage
 * ```
 * import someRouteSchema;
 * const response = await new ApiRequest(someRouteSchema).request<TypeForPayload>({
 *   body: (POST | PUT | DELETE) request payload data // or
 *   params: (GET) request params
 * });
*/
class ApiRequest {
  private _routeSchema: TRouteSchema;
  private _authToken?: string;

  constructor(
    routeSchema: TRouteSchema,
    authToken?: string
  ) {
    this._routeSchema = routeSchema;
    this._authToken = authToken;
  };

  /**
   * @todo
   * Need proper typings and consider all the possible fetch Response types (typing issue with generic <T>),
   * see at https://developer.mozilla.org/en-US/docs/Web/API/Response/type -> instance methods
   */
  async request<T>(requestPayload?: TRequestPayload): Promise<Response> {
    try {
      const requestConfig = this.prepareRequestConfig(this._routeSchema, requestPayload);
      const { baseURL, url, ...rest } = requestConfig;
      return await fetch(baseURL + url, rest);
    }
    catch (err) {
      throw new Error(
        'ApiRequest error',
        {
          cause: { err },
        }
      );
    };
  }

  prepareRequestConfig(routeSchema: TRouteSchema, requestPayload?: TRequestPayload){
    let body, params, queryString;
    if (requestPayload) {
      body = requestPayload.body;
      params = requestPayload.params;
      queryString = requestPayload.queryString;
    }
    const { method, url, schema: { requestConfig } } = routeSchema;
    const { headers, withAuth = false, authHeaders } = requestConfig;
    const config = {
      body,
      params,
      method,
      baseURL: requestConfig.baseURL,
      url: url + queryString,
      headers: headers ?? { 'Content-Type': 'application/json' },
    };
    if (withAuth && authHeaders) {
      const auth = this.auth(authHeaders);
      if (auth) {
        config.headers = {
          ...config.headers,
          ...auth,
        };
      }
    }
    const isModifyingRequest = (method === EApiRequestMethods.POST || method === EApiRequestMethods.PUT);
    if (isModifyingRequest && body) {
      config.body = body;
    }
    return config;
  };

  private auth(authHeaders: TAuthHeaders): THeaders | undefined {
    if (this._authToken) {
      const { type, header } = authHeaders;
      return {
        [header]: type + this._authToken,
      };
    }
  };
};

export default ApiRequest;
