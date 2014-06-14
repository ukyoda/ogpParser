# Open Graph Protocol Parser
このモジュールは，URLからOGP情報を抽出する為のライブラリです。
Node.js初心者が作成したため，予期しない動作などあるかもしれないです。

## 更新履歴
* 2014年 6月: seoタグ(name, contentのメタタグ)を追加
* 2014年 6月: データフォーマットを修正

## 依存ライブラリ
* cheerio

## 使い方
```
    var ogp = require('ogp-parser');
```

## サンプル
```javascript
    var ogp = require("ogp-parser");
    var url = "http://ogp.me";
    ogp.parser(url,function(error,data){
	console.log(data);
});
```

## 出力
```json
  { ogp:
     [
       'og:title': [ 'Open Graph protocol' ],
       'og:type': [ 'website' ],
       'og:url': [ 'http://ogp.me/' ],
       'og:image': [ 'http://ogp.me/logo.png' ],
       'og:image:type': [ 'image/png' ],
       'og:image:width': [ '300' ],
       'og:image:height': [ '300' ],
       'og:description': [ 'The Open Graph protocol enables any web page to become a rich object in a social graph.' ],
       'fb:app_id': [ '115190258555800' ]
    ],
    seo:
     [
       'description' : [ 'The Open Graph protocol enables any web page to become a rich object in a social graph.' ]
     ]
  }
```

## 免責事項など
* ライブラリの利用は特に制限を設けません
* このライブラリは作者の勉強用に作成したため，今後のサポートは基本的に考えておりません。
