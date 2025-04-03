import ApiRequest from '~/.';
import { TRouteSchema } from '~/types';

import { afterEach, beforeEach, describe, it } from 'node:test';
import assert from 'assert';
import sinon from 'sinon';

describe('Testing JSON schema #1 request.', function () {
  const originalFetch = global.fetch;
  let fetchStub: sinon.SinonStub;
  let mockSchema: TRouteSchema;
  
  beforeEach(() => {
    fetchStub = sinon.stub();
    global.fetch = fetchStub;
    mockSchema = {
      method: 'GET',
      url: '/data',
      schema: {
        requestConfig: {
          baseURL: 'https://api.example.com',
          headers: { 'Content-Type': 'application/json' }
        }
      }
    };
  });
  
  afterEach(() => {
    global.fetch = originalFetch;
    sinon.restore();
  });

 
  it('Should construct with schema', () => {
    const apiRequest = new ApiRequest(mockSchema);
    assert.ok(apiRequest instanceof ApiRequest === true);
  });

  it('Should call mock-fetch with correct parameters', async () => {
    const apiRequest = new ApiRequest(mockSchema);
    fetchStub.resolves(
      new Response(
        JSON.stringify({ data: 'test' }),
        { status: 200 }
      )
    );

    await apiRequest.request();

    const [ fullReqURL, reqInfo ] = fetchStub.firstCall.args;
    const { body, params, ...restReqConfig } = reqInfo;
    const mockSchemaReqInfo = {
      method: mockSchema.method,
      headers: mockSchema.schema.requestConfig.headers,
    };

    assert.ok(fetchStub.calledOnce === true)
    assert.ok(fullReqURL === mockSchema.schema.requestConfig.baseURL + mockSchema.url);
    assert.deepEqual(mockSchemaReqInfo, restReqConfig);
  });
});
