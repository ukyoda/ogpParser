var http = require('http')
    , https = require('https')
    , followRedirects = require('follow-redirects')
    , charsetConverter = require('./charsetConverter');

module.exports = function (url, redirectFlg) {
    var httpRequest;
    if(redirectFlg) {
        httpRequest = (url.indexOf('https://') !== -1)? followRedirects.https : followRedirects.http;
    } else {
        httpRequest = (url.indexOf('https://') !== -1)? https : http;
    }
    return new Promise(function(resolve, reject) {
        httpRequest.get(url, function(res) {
            var chunks = [];
            res.on('data', function(data) {
                chunks.push(data);
            });
            res.on('end', function() {
                var html = charsetConverter(Buffer.concat(chunks));
                resolve(html);
            });
        }).on('error', function(error) {
            reject(error);
        });
    });

};
