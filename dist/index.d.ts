import { type TRouteSchema, type TRequestPayload } from './types/index.js';
/**
 * @Usage
 * ```
 * import someRouteSchema;
 * const response = await new ApiRequest(someRouteSchema).request<TypeForPayload>({
 *   body: (POST | PUT | DELETE) request payload data // or
 *   params: (GET) request params
 * });
*/
declare class ApiRequest {
    private _baseUrl?;
    private _routeSchema;
    private _authToken?;
    constructor(routeSchema: TRouteSchema, authToken?: string, baseUrl?: string);
    /**
     * @todo
     * Need proper typings and consider all the possible fetch Response types (typing issue with generic <T>),
     * see at https://developer.mozilla.org/en-US/docs/Web/API/Response/type -> instance methods
     */
    request<T>(requestPayload?: TRequestPayload): Promise<Response>;
    prepareRequestConfig(routeSchema: TRouteSchema, requestPayload?: TRequestPayload): {
        body: BodyInit | undefined;
        params: Record<string, string | number | boolean> | undefined;
        method: string;
        baseURL: string;
        url: string;
        headers: Record<string, string>;
    };
    private auth;
}
export default ApiRequest;
//# sourceMappingURL=index.d.ts.map