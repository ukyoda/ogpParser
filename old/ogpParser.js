var getContents = require('../utils/getContents');
var parseHtml = require('../utils/parseHtml');
console.warn('[Deprication Warning]: This API is remove at future version.');
console.warn(`                       Please Use future version \`const parser = require('ogp-parser');\`\n\n`);

var parser = function (url, redirectFlg) {
  return getContents(url).then(function (html) {
    let data = parseHtml(html);
    delete data.oembedInfo;
    return Promise.resolve(data);
  });
};

module.exports = parser;