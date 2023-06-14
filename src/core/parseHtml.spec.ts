import { parseHtml } from './parseHtml';
import fs from 'fs';
import path from 'path';

const fixtureDirectory = path.resolve(__dirname, '../__fixture__');
const html = fs.readFileSync(path.join(fixtureDirectory, 'demo.html'), 'utf-8');
const htmlOembed = fs.readFileSync(
  path.join(fixtureDirectory, 'demo_oembed.html'),
  'utf-8'
);
const htmlOembedXml = fs.readFileSync(
  path.join(fixtureDirectory, 'demo_oembed_xml.html'),
  'utf-8'
);

describe('parseHtml test', () => {
  it('ogp values check', () => {
    const { ogp } = parseHtml(html);
    expect(ogp['og:title'][0]).toBe('このHTMLはテスト用です。');
    expect(ogp['og:type'][0]).toBe('website');
    expect(ogp['og:url'][0]).toBe('http://example.com');
    expect(ogp['og:image'].length).toBe(2);
    expect(ogp['og:image'][0]).toBe('http://hoge.example.com/test1.jpg');
    expect(ogp['og:image'][1]).toBe('http://hoge.example.com/test2.jpg');
    expect(ogp['fb:admins'][0]).toBe('XXXXXXXXXX');
    expect(ogp['fb:app_id'][0]).toBe('YYYYYYYYYY');
  });

  it('seo values check', () => {
    const { seo } = parseHtml(html);
    expect(seo['viewport'][0]).toBe('width=device-width,initial-scale=1');
    expect(seo['description'][0]).toBe('テストDescription');
  });

  it('oembed tag check', () => {
    const { oembedInfo: oembedMiss } = parseHtml(html);
    const { oembedInfo } = parseHtml(htmlOembed);
    const { oembedInfo: oembedInfoXML } = parseHtml(htmlOembedXml);
    expect(oembedMiss).toBeUndefined();
    expect(oembedInfo?.type).toBe('json');
    expect(oembedInfo?.url).toBe('https://oembed.example.com/jsondata');
    expect(oembedInfoXML?.type).toBe('xml');
    expect(oembedInfoXML?.url).toBe('https://oembed.example.com/xmldata');
  });

  it('not html', () => {
    const data = parseHtml('');
    expect(Object.keys(data.ogp).length).toBe(0);
    expect(Object.keys(data.seo).length).toBe(0);
    expect(data.title).toBe('');
    expect(data.oembedInfo).not.toBeTruthy();
  });
});
