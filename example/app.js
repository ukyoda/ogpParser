var url = process.argv[2] || null;

if(!url || url.match(/^(http|https)\:\/\//g) === null) {
    console.log("Usage: ");
    console.log("node app.js [url]");
    return;
}

var ogp = require("../ogpParser");
console.log("URL:"+url);
ogp.parser(url,function(error,data){
	console.log(data);
});
