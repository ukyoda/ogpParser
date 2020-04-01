/**
 * @fileOverview OpenGraph Protocol Parser
 * @author ukyoda
 */

const getContents = require('./utils/getContents');
const parseHtml = require('./utils/parseHtml');
const parseXML = require('fast-xml-parser');
const he = require('he');
const oembedParser = require('./utils/oembed');

/**
 * OpenGraphと、SEOと、oEmbedを取得／パースする関数
 * @param {String} url リクエストURL
 * @param {bool} options.skipOembed
 * @return {Promise} 解析結果
 */
const parser = function(url, { skipOembed = false } = {}) {

  return getContents(url).then(function(html) {
    const data = parseHtml(html);
    return Promise.resolve(data);
  }).then(async data => {
    const oembedInfo = data.oembedInfo;
    delete data.oembedInfo;
    const oembed = await oembedParser(oembedInfo, skipOembed);
    if (oembed !== null) {
      data.oembed = oembed;
    }

    return data;
  });
};

// 旧バージョン連携
Object.defineProperty(parser, 'old', {
  get: function () { return require('./old/ogpParser'); }
});

module.exports = parser;
