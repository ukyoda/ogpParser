var ogp = require("../ogpParser");
var url = "http://ogp.me";
console.log("URL:"+url);
ogp.parser(url,function(error,data){
	console.log(data);
});
