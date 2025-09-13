export declare enum EApiRequestMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export type THeaders = Record<string, string>;
export type TAuthHeaders = {
    type: string;
    header: string;
};
export type TBasicSchema = {
    type: string;
    properties: Record<string, object>;
    required: string[];
    additionalProperties?: boolean;
};
export type TDataSchema = TBasicSchema & {
    $id?: string;
} | TBasicSchema;
export type TSchemaRequestConfig = {
    withAuth?: boolean;
    headers?: Record<string, string>;
    baseURL: string;
    authHeaders?: TAuthHeaders;
};
export type TRequestPayload = {
    body?: BodyInit;
    params?: Record<string, string | number | boolean>;
    queryString?: string;
};
export type TRouteSchema = {
    method: string;
    url: string;
    schema: {
        tags?: string[];
        description?: string;
        summary?: string;
        requestConfig: TSchemaRequestConfig;
        querystring?: TBasicSchema;
        response?: Record<string, TDataSchema>;
        body?: Record<string, TDataSchema>;
    };
};
export interface IFetchRequestConfig {
    method: EApiRequestMethods;
    body?: object;
    params?: Record<string, string | number | boolean>;
    baseURL: string;
    url: string;
    headers: THeaders;
}
//# sourceMappingURL=index.d.ts.map