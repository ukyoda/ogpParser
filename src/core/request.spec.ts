import { request } from './request';
import '../__mocks__/setupServer';

describe('request test', () => {
  test('request to the thing which can parse from json to object', async () => {
    const res = await request.get('https://oembed.example.com/jsondata');
    expect(res.status).toBe(200);
    expect(res.data?.title).toBeTruthy();
  });

  test('request to the thing which cannot parse from json to object', async () => {
    const res = await request.get('https://example.com');
    expect(res.status).toBe(200);
    expect(res.data).toBe(undefined);
  });

  test('post request test', async () => {
    const res = await request.post('https://example.com/post');
    expect(res.status).toBe(200);
    expect(res.data).toBe(undefined);
  });

  test('request http', async () => {
    const res = await request.get('http://example.com');
    expect(res.status).toBe(200);
    expect(res.text).toContain('<html>');
  });

  test('request to the redirect url', async () => {
    const res = await request.get('https://redirect.example.com');
    expect(res.status).toBe(200);
    expect(res.data).toBe(undefined);
    expect(res.text).toContain('<html>');
  });

  test('request is not available because of nettowk error', async () => {
    const promise = request.get('https://abc.example.com');
    expect(promise).rejects.toThrow();
  });

  test('the page is not found', async () => {
    const res = await request.get('https://notfound.example.com');
    expect(res.status).toBe(404);
    expect(res.data?.reason).toBe('Not Found');
  });

  test('check maximum redirect loop', async () => {
    const promise = request.get('https://redirect.example.com/loop');
    expect(promise).rejects.toThrow();
  });
});
