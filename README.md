# Api-request
The lightweight and simple web api request library based on minimal configuration and json-schemas.

## Objectives

1. **Standartized approach** accross all API touching code by a [JSONSchema protocol](https://json-schema.org/)
2. Flexibly configure the request/response schemas using **metaprogramming**
3. Configured once, schemas might and **should** be used both for:
- **Swagger** creation _(like in fastify: [link-1](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/) and [link-2](https://github.com/fastify/fastify-swagger))_
- **Shared req/res interfaces** accross frontend and backend.

## Usage

```JavaScript
// A JSON schema for a request
{
  "method": "GET",
  "url": "/todos/1",
  "schema": {
    "tags": [
      "Rates"
    ],
    "description": "Get placeholder's API 1st todo",
    "summary": "Test shcema for api-request",
    "requestConfig": {
      "baseURL": "https://jsonplaceholder.typicode.com",
      "headers": {
        "Content-Type": "application/json"
      }
    },
    "response": {
      "200": { // Can be extracted to another schema with a $ref here
        "type": "object",
        "properties": {
          "userId": { "type": "number" },
          "id": { "type": "number" },
          "title": { "type": "string" },
          "completed": { "type": "boolean" }
        },
        "required": ["userId", "id", "title", "completed"]
      }
    }
  }
}
```

Calling directly the request:
```JavaScript
import ApiRequest from 'api-request';
import testReqSchema from './schemas/1.schema.json' assert { type: 'json' };

const response = await new ApiRequest(testReqSchema).request();
const data = await response.json();

// Outputs:
// { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
console.log(data);
```

Save and move the request object further:
```JavaScript
import ApiRequest from 'api-request';
import testReqSchema from './schemas/1.schema.json' assert { type: 'json' };

const requestObj = new ApiRequest(testReqSchema);
// ...
const response = await requestObj.request();
const data = await response.json();
```
