import { parseHtml, ParseResult } from './utils/parseHtml';
import { fetchOembed } from './utils/fetchOembed';
import { getContents } from './utils/getContents';

export type OgpParserOptions = {
  skipOembed: boolean;
};

export type OgpParserResult = Omit<ParseResult, 'oembedInfo'> & {
  oembed?: object;
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
