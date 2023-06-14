import * as cheerio from 'cheerio';

type Attributes = ['property', 'content'] | ['name', 'content'];

type ContentInfo = {
  prop: string;
  content: string;
};

// TODO: 有効なSEOタグのみとするか、これまで通りすべて取り出すか？
type SeoItem = {
  [key: string]: string[];
};
// TODO: 有効なOGPタグのみとするか、これまで通りすべて取り出すか？
type OgpItem = {
  [key: string]: string[];
};

type OEmbedItem = {
  type: 'json' | 'xml';
  url: string;
};

export type ParseResult = {
  title: string;
  ogp: OgpItem;
  seo: SeoItem;
  oembedInfo?: OEmbedItem;
};

const extractData = (
  $meta: cheerio.Cheerio<cheerio.Element>,
  [key, contentKey]: Attributes
): ContentInfo | undefined => {
  const prop = $meta.attr(key);
  const content = $meta.attr(contentKey);
  if (prop && content) {
    return {
      prop,
      content,
    };
  }
};

export const parseHtml = (html: string): ParseResult => {
  const $ = cheerio.load(html);
  const $metas = $('head meta');
  const $link = $('head link');
  const title = $('head title').text();
  const ogpSet: OgpItem = {};
  const seoSet: SeoItem = {};

  $metas.each((index, value) => {
    const ogp = extractData($(value), ['property', 'content']);
    const seo = extractData($(value), ['name', 'content']);
    if (ogp) {
      const { prop, content } = ogp;
      ogpSet[prop] = ogpSet[prop] ?? [];
      ogpSet[prop].push(content);
    } else if (seo) {
      const { prop, content } = seo;
      seoSet[prop] = seoSet[prop] ?? [];
      seoSet[prop].push(content);
    }
  });

  const oembedJsonTag = $link.filter(
    (_, val) => $(val).attr('type') === 'application/json+oembed'
  );
  const oembedXmlTag = $link.filter(
    (_, val) => $(val).attr('type') === 'text/xml+oembed'
  );
  let oembedInfo: OEmbedItem | undefined = undefined;
  if (oembedJsonTag.length > 0) {
    const url = oembedJsonTag.attr('href');
    if (url) {
      oembedInfo = {
        type: 'json',
        url,
      };
    }
  } else if (oembedXmlTag.length > 0 && oembedXmlTag.attr('href')) {
    oembedXmlTag.attr('href');
    const url = oembedXmlTag.attr('href');
    if (url) {
      oembedInfo = {
        type: 'xml',
        url,
      };
    }
  }
  return {
    title,
    ogp: ogpSet,
    seo: seoSet,
    oembedInfo,
  };
};
