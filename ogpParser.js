/**
 * @fileOverview OpenGraph Protocol Parser
 * @author ukyoda
 */


var cheerio = require('cheerio')
 , $
 , http = require('http');


exports.parser = function(url,callback){
	var html = "";
	http.get(url, function(res){
		res.on('data', function(data){
			html += data.toString();
		});
		res.on('end', function(){
			var ogps = onDataCallBack.call(this,url, html);
			callback(null, ogps);
		});
	});
};

var onDataCallBack = function(url, html){
	$ = cheerio.load(html);
	//meta情報をパースする
	var $metas = $('head meta');
	var ogps = {
		ogp: [],
		seo: []
	};
	$metas.each(function(index, value){
		var ogp = ogpParser($(value));
		var seo = seoParser($(value));
		var data, result;
		var res = {}, property;
		if(ogp) {
			data = ogp;
			result = ogps.ogp;
		} else if(seo){
			data = seo;
			result = ogps.seo;
		} else {
			return;
		}
		if(!result[data.prop]) {
			result[data.prop] = [];
		}
		result[data.prop].push(data.content);
	});
	return ogps;
};

var seoParser = function($metaObject){
	var name = $metaObject.attr('name');
	var content = $metaObject.attr('content');
	if( !name || !content) {
		return null;
	}
	return {
		prop: name,
		content: content
	};
};

var ogpParser = function($metaObject){
	var property = $metaObject.attr("property");
	var content = $metaObject.attr("content");
	if( !property || !content ){
		return null;
	}
	return {
		prop: property,
		content: content
	};
};

