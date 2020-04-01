/**
 * @fileOverview OpenGraph Protocol Parser
 * @author ukyoda
 */

const oldParser = require('./old/ogpParser');
const getContents = require('./utils/getContents');
const parseHtml = require('./utils/parseHtml');
const parseXML = require('fast-xml-parser');
const he = require('he');
const oembedParser = require('./utils/oembed');

const parser = function(url, { skipOembed = false } = {}) {
  return getContents(url).then(function(html) {
    const data = parseHtml(html);
    return Promise.resolve(data);
  }).then(async data => {
    const oembedInfo = data.oembedInfo;
    delete data.oembedInfo;
    const oembed = await oembedParser(oembedInfo);
    if (oembed !== null) {
      data.oembed = oembed;
    }

    return data;
  });
};
parser.old = oldParser;
// oldParser.futureVersion = parser;
module.exports = parser;
