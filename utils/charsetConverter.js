// 文字列をUTF-8に変換するユーティリティ関数

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

module.exports = charsetConverter;
