import ApiRequest from '~/.';
import testReqSchema from './schemas/1.schema.json' assert { type: 'json' };

(
  async () => {
    const response = await new ApiRequest(testReqSchema).request();
    const data = await response.json();
    console.log(data);
  }
)();
