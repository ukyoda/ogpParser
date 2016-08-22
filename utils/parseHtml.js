var cheerio = require('cheerio')
    , extractOgpData = require('./extractOgpData')
    , extractSeoData = require('./extractSeoData')
    ;

module.exports = function(html) {
    var $ = cheerio.load(html);
    var $metas = $('head meta');
    var title = $('head title').text();
    var ogpSet = {};
    var seoSet = {};

    $metas.each(function(index, value) {
        var ogp = extractOgpData($(value));
        var seo = extractSeoData($(value));
        if(ogp) {
            if(!ogpSet[ogp.prop]) {
                ogpSet[ogp.prop] = [];
            }
            ogpSet[ogp.prop].push(ogp.content);
        }
        if(seo) {
            if(!ogpSet[seo.prop]) {
                seoSet[seo.prop] = [];
            }
            seoSet[seo.prop].push(seo.content);
        }
    });
    return {
        title: title,
        ogp: ogpSet,
        seo: seoSet
    };
};
