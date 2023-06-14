import { request } from '../../utils/request';
import './__utils__/setupServer';

describe('request test', () => {
  test('request to the thing which can parse from json to object', async () => {
    const res = await request.get('https://example.com/oembed/json');
    expect(res.status).toBe(200);
    expect(res.data?.title).toBeTruthy();
  });
  test('request to the thing which cannot parse from json to object', async () => {
    const res = await request.get('https://example.com/demo');
    expect(res.status).toBe(200);
    expect(res.data).toBe(undefined);
  });
  test('post request test', async () => {
    const res = await request.post('https://example.com/post');
    expect(res.status).toBe(200);
    expect(res.data).toBe(undefined);
  });

  test('request http', async () => {
    const res = await request.get('http://example.com/oembed/json');
    expect(res.status).toBe(200);
    expect(res.data?.title).toBeTruthy();
  });

  test('request to the redirect url', async () => {
    const res = await request.get('https://example.com/redirect');
    expect(res.status).toBe(200);
    expect(res.data?.title).toBeTruthy();
    console.log(res.headers);
  });
});
