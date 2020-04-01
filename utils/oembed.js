const getContents = require('./getContents');
const parseXML = require('fast-xml-parser');
const he = require('he');

module.exports = async function parser (oembedInfo, skipOembed=false) {
  let result = null;
  if (oembedInfo === null || skipOembed) {
    return result;
  }
  const { url, type } = oembedInfo;
  console.debug(`oEmbed request(url=${url})`);
  try {
    if (type === 'json') {
      result = await getForJson(url);
    } else if (type === 'xml') {
      result = await getForXml(url);
    }
  } catch (err) {
    console.warn(`oEmbed request error: ${err}`);
  }
  return result;
}

async function getForJson (url) {
  const headers = {
    'Content-Type': 'application/json'
  };
  const oembed = await getContents(url, { headers });
  return oembed;
}

async function getForXml (url) {
  const headers = {
    "Content-Type": "text/xml"
  };
  const oembedXml = await getContents(url, { headers });
  const options = {
    tagValueProcessor: (val, tagName) => he.decode(val)
  };
  const oembed = parseXML.parse(oembedXml, options);
  if (oembed.oembed) {
    return oembed.oembed;
  } else {
    console.warn("Undefined variable `oembed.oembed`");
    return null;
  }
}