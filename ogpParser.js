/**
 * @fileOverview OpenGraph Protocol Parser
 * @author ukyoda
 */

var getContents = require('./utils/getContents');
var parseHtml = require('./utils/parseHtml');

var parser = function(url, redirectFlg) {
	return getContents(url, redirectFlg).then(function(html) {
        return new Promise(function(resolve) {
            var data = parseHtml(html);
            resolve(data);
        });
    });
};

module.exports = parser;
