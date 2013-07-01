/**
 * @fileOverview OpenGraph Protocol Parser
 * @author ukyoda
 */


var jsdom = require('jsdom'),
    jquery = require("jquery");


exports.parser = function(url,callback){

	jsdom.env({ html: url, done: function(error, page) {
		if(error){
			callback(error,null);
			return false;
		}
		var ogpObject = {};
		var $ = jquery.create(page);
		$("head").find("meta").each(function(){
			var object = ogpParser($(this));
			if(object !== null){
				var key = Object.keys(object)[0];
				if(typeof ogpObject[key] === "undefined"){
					ogpObject[key] = [];
				}
				ogpObject[key].push(object[key]);
			}
		});
		callback(null,ogpObject);
	}});
};



var ogpParser = function(metaObject){
	var property = metaObject.attr("property");
	var content = metaObject.attr("content");
	if(typeof property === "undefined" || typeof content === "undefined"){
		return null;
	}
	var result = {};
	try{
		result[property] = content;
	} catch(e){
		result = null;
	}
	return result;
};

