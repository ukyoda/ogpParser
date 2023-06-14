import parser from './main';
import './__mocks__/setupServer';

describe('end 2 end test', () => {
  it('standard http request', async () => {
    const data = await parser('http://example.com');
    expect(Object.keys(data)).toEqual(
      expect.arrayContaining(['title', 'seo', 'ogp'])
    );
    expect(Object.keys(data)).not.toContain('oembed');
  });

  it('standard https request', async () => {
    const data = await parser('https://example.com');
    expect(Object.keys(data)).toEqual(
      expect.arrayContaining(['title', 'seo', 'ogp'])
    );
    expect(Object.keys(data)).not.toContain('oembed');
  });

  it('standard https request (including json oembed)', async () => {
    const data = await parser('https://example.com/oembed');
    expect(Object.keys(data)).toEqual(
      expect.arrayContaining(['title', 'seo', 'ogp', 'oembed'])
    );
  });

  it('standard https request (including xml oembed)', async () => {
    const data = await parser('https://example.com/oembed_xml');
    expect(Object.keys(data)).toEqual(
      expect.arrayContaining(['title', 'seo', 'ogp', 'oembed'])
    );
  });

  it('should not contain oembed if call with skipOembed', async () => {
    const data = await parser('https://example.com/oembed', {
      skipOembed: true,
    });
    expect(Object.keys(data)).toEqual(
      expect.arrayContaining(['title', 'seo', 'ogp'])
    );
    expect(Object.keys(data)).not.toContain('oembed');
  });

  it('[irregular case] 404 not found', async () => {
    const promise = parser('https://notfound.example.com');
    expect(promise).rejects.toThrow();
  });

  it('[irregular case] request failed', async () => {
    const promise = parser('https://abc.example.com');
    expect(promise).rejects.toThrow();
  });
});
