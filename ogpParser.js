/**
 * @fileOverview OpenGraph Protocol Parser
 * @author ukyoda
 */

// @str : encoded string
// @encoding ; encoding character code string
var convertCharset = function(str,encoding){
	var iconv = require("iconv-lite");
	return iconv.decode(str,encoding);
};
//@str : encoded string
var charsetConverter = function(str) {
	var jschardet = require("jschardet");
	var detected = jschardet.detect(str);
	if(detected.encoding != "utf8" && detected.encoding != "ascii"){
		return convertCharset(str, detected.encoding);
	} else {
		return str;
	}
};

var cheerio = require('cheerio')
 , $
 , http = require('http')
 , https = require('https')
 , followRedirects = require('follow-redirects');

exports.parser = function(url, callback, redirectFlg){
	var html = "";
	var httpRequest;
	if(redirectFlg) {
	    httpRequest = (url.indexOf('https://') !== -1)? followRedirects.https : followRedirects.http;
	} else {
	    httpRequest = (url.indexOf('https://') !== -1)? https : http;
	}
	httpRequest.get(url, function(res){
		var chunks = [];
		res.on('data', function(data){
			chunks.push(data);
		});
		res.on('end', function(){
			var html = charsetConverter(Buffer.concat(chunks));
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
		title: $('head title').text(),
		ogp: {},
		seo: {}
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
