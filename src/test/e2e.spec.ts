import parser, { OgpParserResult } from '../main';
import fs from 'fs';
import path from 'path';
import nock from 'nock';

const html = fs.readFileSync(path.join(__dirname, 'fixture/demo.html'));
const htmlOembed = fs.readFileSync(
  path.join(__dirname, 'fixture/demo_oembed.html')
);
const htmlOembedXml = fs.readFileSync(
  path.join(__dirname, 'fixture/demo_oembed_xml.html')
);
const oembedJson = fs.readFileSync(path.join(__dirname, 'fixture/oembed.json'));
const oembedXml = fs.readFileSync(path.join(__dirname, 'fixture/oembed.xml'));

describe('end 2 end test', () => {
  beforeEach(() => {
    nock('http://example.com').get('/').reply(200, html);
    nock('https://example.com').get('/').reply(200, html);
    nock('https://example.com').get('/oembed').reply(200, htmlOembed);
    nock('https://example.com').get('/oembed_xml').reply(200, htmlOembedXml);
    nock('https://oembed.example.com').get('/jsondata').reply(200, oembedJson);
    nock('https://oembed.example.com').get('/xmldata').reply(200, oembedXml);
    nock('https://notfound.example.com').get('/').reply(404);
    nock('https://abc.example.com').get('/').replyWithError('request error');
  });

  afterEach(() => {
    nock.cleanAll();
  });

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
