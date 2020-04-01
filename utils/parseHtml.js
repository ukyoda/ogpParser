const cheerio = require('cheerio');

function extractData($meta, propKey, contentKey) {
  const prop = $meta.attr(propKey);
  const content = $meta.attr(contentKey);
  if(!prop || !content) {
    return null;
  } else {
    return {
      prop,
      content
    };
  }
}

module.exports = function parseHtml(html) {
  const $ = cheerio.load(html);
  const $metas = $('head meta');
  const $link = $('head link');
  const title = $('head title').text();
  const ogpSet = {};
  const seoSet = {};
  // メタタグ
  $metas.each((index, value) => {
    const ogp = extractData($(value), 'property', 'content');
    const seo = extractData($(value), 'name', 'content');
    let target = null;
    let prop, content;
    if(ogp !== null) {
      target = ogpSet;
      prop = ogp.prop;
      content = ogp.content;
    } else if(seo !== null) {
      target = seoSet;
      prop = seo.prop;
      content = seo.content;
    } else {
      return;
    }

    if(!target[prop]) {
      target[prop] = [];
    }
    target[prop].push(content);

  });

  // oEmbedのURLを取得
  const oembedJsonTag = $link.filter((_, val) => $(val).attr('type') === 'application/json+oembed');
  const oembedXmlTag = $link.filter((_, val) => $(val).attr('type') === 'text/xml+oembed');
  let oembedInfo = null;
  if (oembedJsonTag.length > 0) {
    oembedInfo = {type: 'json', url: oembedJsonTag.attr('href')};
  } else if (oembedXmlTag.length > 0) {
    oembedInfo = {type: 'xml', url: oembedXmlTag.attr('href')};
  }
  return {
    title: title,
      ogp: ogpSet,
      seo: seoSet,
      oembedInfo: oembedInfo
  };
};
