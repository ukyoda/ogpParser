var url = process.argv[2] || 'http://github.com/ukyoda';

if(!url || url.match(/^(http|https)\:\/\//g) === null) {
    console.log("Usage: ");
    console.log("node app.js [url]");
    return;
}

var ogp = require("../dist/main");
console.log("URL:"+url);
ogp(url, { skipOembed: false}).then(function(data) {
	console.log(JSON.stringify(data, null, "    "));
}).catch(function(error) {
    console.error(error);
});
