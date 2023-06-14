import '../__mocks__/setupServer';
import { fetchOembed } from './fetchOembed';

describe('fetchOembed test', () => {
  test('check fetchOembed when the format of oembed data is json', async () => {
    const res = await fetchOembed({
      type: 'json',
      url: 'https://oembed.example.com/jsondata',
    });
    expect(res?.title).toBe('ogpOembed');
    expect(res?.author_name).toBe('ukyoda');
  });

  test('check fetchOembed when the format of oembed data is xml', async () => {
    const res = await fetchOembed({
      type: 'xml',
      url: 'https://oembed.example.com/xmldata',
    });
    expect(res?.title).toBe('ogpOembed');
    expect(res?.author_name).toBe('ukyoda');
  });
});
