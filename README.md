# Open Graph Protocol Parser
このモジュールは，URLからOGPタグ情報、SEO関連のタグ情報などを抽出する為のライブラリです。

## 更新履歴
* 2014年 6月: seoタグ(name, contentのメタタグ)を追加
* 2014年 6月: データフォーマットを修正
* 2015年 3月: ページタイトル情報を追加
* 2015年 3月: https対応
* 2015年 4月: リダイレクトに対応しました。第３引数をtrueにすると、リダイレクトを追跡してページを取得します

## 依存ライブラリ
* cheerio
* follow-redirects (新規)

## 使い方
```
    var ogp = require('ogp-parser');
```

## サンプル (リダイレクトあり)
```javascript
    var ogp = require("ogp-parser");
    var url = "http://ogp.me";
    ogp.parser(url,function(error,data){
	console.log(data);
    }, true);
```

## サンプル (リダイレクトなし)
```javascript
    var ogp = require("ogp-parser");
    var url = "http://ogp.me";
    ogp.parser(url,function(error,data){
	console.log(data);
    }, false);
```

## 出力
```javascript

{ title: 'The Open Graph protocol',
  ogp: 
   [ 'og:title': [ 'Open Graph protocol' ],
     'og:type': [ 'website' ],
     'og:url': [ 'http://ogp.me/' ],
     'og:image': [ 'http://ogp.me/logo.png' ],
     'og:image:type': [ 'image/png' ],
     'og:image:width': [ '300' ],
     'og:image:height': [ '300' ],
     'og:description': [ 'The Open Graph protocol enables any web page to become a rich object in a social graph.' ],
     'fb:app_id': [ '115190258555800' ] ],
  seo: [ description: [ 'The Open Graph protocol enables any web page to become a rich object in a social graph.' ] ] }

```

## 免責事項など
* ライブラリの利用は特に制限を設けません
* このライブラリは作者の勉強用に作成したため，今後のサポートは基本的に考えておりません。
