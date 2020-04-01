/**
 * @fileOverview OpenGraph Protocol Parser
 * @author ukyoda
 */

const oldParser = require('./old/ogpParser');
const getContents = require('./utils/getContents');
const parseHtml = require('./utils/parseHtml');
const parseXML = require('fast-xml-parser');
const he = require('he');

const parser = function(url, { skipOembed = false } = {}) {
  return getContents(url).then(function(html) {
    const data = parseHtml(html);
    return Promise.resolve(data);
  }).then(async data => {
    const oembedInfo = data.oembedInfo;
    delete data.oembedInfo;
    if (oembedInfo === null || skipOembed) {
      return data;
    }
    const oembedUrl = oembedInfo.url;
    const oembedType = oembedInfo.type;
    if (oembedType === 'json') { // JSON出力
      console.debug(`oEmbed request(url=${oembedUrl})`);
      try {
        const headers = {
          'Content-Type': 'application/json'
        };
        const oembed = await getContents(oembedUrl, { headers });
        data.oembed = oembed;
      } catch(err) {
        console.warn(`oembed request error: ${err}`);
      }
    } else if (oembedType === 'xml') {
      console.debug(`oEmbed request(url=${oembedUrl})`);
      try {
        const headers = {
          'Content-Type': 'text/xml'
        };
        const oembedXml = await getContents(oembedUrl, { headers });
        const oembed = parseXML.parse(oembedXml, { tagValueProcessor : (val, tagName) => he.decode(val) });
        
        if (oembed.oembed) {
          data.oembed = oembed.oembed;
        } else {
          console.warn('Undefined variable `oembed.oembed`');
        }
      } catch (err) {
        console.warn(`oembed request error: ${err}`);
      }
    }
    return data;
  });
};
oldParser.futureVersion = parser;
module.exports = oldParser;
