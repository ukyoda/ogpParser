# Open Graph Protocol Parser

このモジュールは，URLからOGPタグ情報、SEO関連のタグ情報などを抽出する為のライブラリです。

## 更新履歴

* 2019年 2月: v0.4.3リリース (依存パッケージアップデート)
* 2018年 1月: v0.4.1リリース (リファクタリング、ES2015対応、他)
* 2016年 8月: v0.4.0リリース (リファクタリング、Promise対応、他、多くを修正)
* 2016年 7月: v0.3.1リリース (UTF-8以外の文字コードに対応)
* 2015年 5月: v0.3.0リリース
* 2015年 4月: リダイレクトに対応しました。第３引数をtrueにすると、リダイレクトを追跡してページを取得します
* 2015年 3月: https対応
* 2015年 3月: ページタイトル情報を追加
* 2014年 6月: データフォーマットを修正
* 2014年 6月: seoタグ(name, contentのメタタグ)を追加


> v0.4.0より、Promise導入を始め、ライブラリの仕様を変更しています。
> v0.3.1以前のライブラリをおつかいの方はご注意ください。

## 依存ライブラリ

* cheerio
* follow-redirects (新規)
* jsChardet
* iconv-lite

## インストール

```bash
$ npm install ogp-parser
```

## 使い方

```javascript
var ogp = require('ogp-parser');
```

## サンプル (リダイレクトあり)

```javascript

var parser = require("ogp-parser");
var url = "http://ogp.me";
parser(url, true).then(function(data) {
	console.log(data);
}).catch(function(error) {
	console.error(error);
});

```

## サンプル (リダイレクトなし)

```javascript

var parser = require("ogp-parser");
var url = "http://ogp.me";
parser(url, false).then(function(data) {
	console.log(data);
}).catch(function(error) {
	console.error(error);
});

```

## 出力

```json
{
    "title": "The Open Graph protocol",
    "ogp": {
        "og:title": [
            "Open Graph protocol"
        ],
        "og:type": [
            "website"
        ],
        "og:url": [
            "http://ogp.me/"
        ],
        "og:image": [
            "http://ogp.me/logo.png"
        ],
        "og:image:type": [
            "image/png"
        ],
        "og:image:width": [
            "300"
        ],
        "og:image:height": [
            "300"
        ],
        "og:description": [
            "The Open Graph protocol enables any web page to become a rich object in a social graph."
        ],
        "fb:app_id": [
            "115190258555800"
        ]
    },
    "seo": {
        "description": [
            "The Open Graph protocol enables any web page to become a rich object in a social graph."
        ]
    }
}

```

## 免責事項など

* 本ライブラリはMITライセンスに設定しました
* 本ライブラリは商用での利用に特に制限を設けません
