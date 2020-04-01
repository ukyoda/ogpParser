# 旧バージョン互換API利用方法

旧バージョンのAPIと互換がある関数はこちらを利用してください。

* 旧バージョンLatest Version: v0.4.7
* HTTPリクエストをaxiosに置き換えたため、リダイレクトフラグは不要となりました。

## 使い方

旧バージョンのAPI互換のあるAPIを使う場合は、`require`を下記の通り修正してください。

```javascript
var ogp = require('ogp-parser').old;
```

## サンプル

```javascript

var parser = require("ogp-parser").old;
var url = "http://ogp.me";
parser(url).then(function(data) {
	console.log(data);
}).catch(function(error) {
	console.error(error);
});

```
