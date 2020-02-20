// 文字列をUTF-8に変換するユーティリティ関数

const iconv = require('iconv-lite'),
			jschardet = require('jschardet')
			;


/**
 * 文字コードをUTF-8に変換する
 * @param {string|Buffer} str 文字列
 * @return {string|Buffer} UTF-8に変換された文字列
 */
module.exports = function charsetConverter(str) {
	var detected = jschardet.detect(str); // 文字コードを取得
	if(detected.encoding != "utf8" && detected.encoding != "ascii" && detected.encoding != 'ISO-8859-2'){
		try {
			return iconv.decode(str, detected.encoding);
		} catch(e) {
			return str;
		}
	} else {
		return str;
	}
};
