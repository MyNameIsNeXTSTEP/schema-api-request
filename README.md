![Tests](https://github.com/MyNameIsNeXTSTEP/VeilObjects/actions/workflows/test.yml/badge.svg?branch=master)

# Api-request
The lightweight and simple web api request library based on minimal configuration and json-schemas.

Available at [npm](https://www.npmjs.com/package/schema-api-request), current stable version - [1.0.6](https://www.npmjs.com/package/schema-api-request/v/1.0.6)

<img width="1280" height="980" alt="image" src="https://github.com/user-attachments/assets/9e9f2d0e-71aa-4131-bcf1-5707370be2c1" /> (11.11.25 screenshot)


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
import ApiRequest from 'schema-api-request';
import testReqSchema from './schemas/1.schema.json' assert { type: 'json' };

const response = await new ApiRequest(testReqSchema).request();
const data = await response.json();

// Outputs:
// { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
console.log(data);
```

Save and move the request object further:
```JavaScript
import ApiRequest from 'schema-api-request';
import testReqSchema from './schemas/1.schema.json' assert { type: 'json' };

const requestObj = new ApiRequest(testReqSchema);
// ...
const response = await requestObj.request();
const data = await response.json();
```
