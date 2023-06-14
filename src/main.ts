import { parseHtml } from './core/parseHtml';
import { fetchOembed, OembedData } from './core/fetchOembed';
import { getContents } from './core/getContents';

export type OgpParserOptions = {
  skipOembed: boolean;
};

export type OgpParserResult = {
  title: string;
  ogp: Record<string, string[]>;
  seo: Record<string, string[]>;
  oembed?: OembedData;
};

const parser = async (url: string, options?: OgpParserOptions) => {
  const skipOembed = !!options?.skipOembed;
  const headers = {
    'User-Agent': 'bot',
  };
  const html = (await getContents(url, { headers })).toString();
  const data = parseHtml(html);
  const result: OgpParserResult = {
    title: data.title,
    ogp: data.ogp,
    seo: data.seo,
  };

  if (!skipOembed && data.oembedInfo) {
    const oembed = await fetchOembed(data.oembedInfo);
    if (oembed) {
      result.oembed = oembed;
    }
  }
  return result;
};

export default parser;
module.exports = parser;
