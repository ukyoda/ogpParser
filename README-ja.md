# Open Graph Protocol Parser

[![npm][npm]][npm-url]

このモジュールは，URLからOGPタグ情報、SEO関連のタグ情報などを抽出する為のライブラリです。
> **[IMPORTANT]**  
> v0.5.0からaxios対応、oEmbed追加対応を行なった影響で、API仕様を変更しました。

## 更新履歴

* 2023年 6月: v0.8.1 released
  * package.jsonからaxiosを削除 (忘れてました・・・)
* 2023年 6月: v0.8.0リリース axiosなど、いくつかの依存ライブラリを削除、oEmbedデータの型定義を変更、その他、コードのリファクタリング
* 2023年 3月: v0.7.1リリース TypeScript Upgrade (to 4.8, v0.7.0がビルドできなかったため)
* 2023年 3月: v0.7.0リリース README英語化、セキュリティアップデート
* 2021年 8月: v0.6.0リリース (TypeScript化)
* 2021年 4月: v0.5.6リリース (セキュリティアップデート)
* 2021年 2月: v0.5.5リリース axiosのバージョン更新
* 2020年 8月: v0.5.4リリース HTMLの文字コード対応が抜けていたので修正
* 2020年 7月: v0.5.3リリース npm installできない問題を修正
* 2020年 7月: v0.5.2リリース セキュリティアップデート(プルリク#27対応)
* 2020年 4月: v0.5.1リリース v0.5.0が`npm publish`できなかったので・・・
* 2020年 4月: v0.5.0リリース (oEmbed対応、HTTPリクエストをaxiosに変更、**API仕様修正**)
* 2020年 3月: v0.4.7リリース (npmの検索キーワードを追加のため)
* 2020年 3月: v0.4.6リリース (セキュリティアップデート)
* 2020年 2月: v0.4.5リリース (バグFix @RyosukeClaさんありがとうございます!!)
* 2019年 8月: v0.4.4リリース（パッケージのアップデート）
* 2018年 1月: v0.4.1リリース (リファクタリング、ES2015対応、他)
* 2016年 8月: v0.4.0リリース (リファクタリング、Promise対応、他、多くを修正)
* 2016年 7月: v0.3.1リリース (UTF-8以外の文字コードに対応)
* 2015年 5月: v0.3.0リリース
* 2015年 4月: リダイレクトに対応しました。第３引数をtrueにすると、リダイレクトを追跡してページを取得します
* 2015年 3月: https対応
* 2015年 3月: ページタイトル情報を追加
* 2014年 6月: データフォーマットを修正
* 2014年 6月: seoタグ(name, contentのメタタグ)を追加


## 依存ライブラリ

package.jsonを参照してください

## インストール

```bash
$ npm install ogp-parser
```

## テスト

```bash
$ npm test
```

or 

```bash
$ npm run test-cov
```

## 使い方

### JavaScript

```javascript
const ogp = require('ogp-parser');
```

### TypeScript

```typescript
import ogp from 'ogp-parser'
```

## サンプル (oEmbedあり)

v0.5より、oEmbedの情報を取得できるようにしました。
oEmbed情報は、`link`タグの`type`が下記のいずれかの時に、`href`のURLにアクセスしてoEmbedデータを取得します。

* `application/json+oembed`
* `text/xml+oembed`

```javascript

const ogp = require("../ogpParser");
console.log("URL:"+url);
ogp(url).then(function(data) {
    console.log(JSON.stringify(data, null, "    "));
}).catch(function(error) {
    console.error(error);
});

```

### 出力結果

```json

{
    "title": "うきょう(@ukyoda)さん | Twitter",
    "ogp": {
        "al:ios:url": [
            "twitter://user?screen_name=ukyoda"
        ],
        "al:ios:app_store_id": [
            "333903271"
        ],
        "al:ios:app_name": [
            "Twitter"
        ],
        "al:android:url": [
            "twitter://user?screen_name=ukyoda"
        ],
        "al:android:package": [
            "com.twitter.android"
        ],
        "al:android:app_name": [
            "Twitter"
        ]
    },
    "seo": {
        "robots": [
            "NOODP"
        ],
        "description": [
            "うきょう (@ukyoda)さんの最新ツイート 独立系SIer。ビッグデータや機械学習を使ったシステム開発によく携わっています。 最近はPythonが多いですが、JavascriptとかPHPとかJavaとかC/C++での開発もやってます。 https://t.co/y8iW4rQ7lD ザクソン村"
        ],
        "msapplication-TileImage": [
            "//abs.twimg.com/favicons/win8-tile-144.png"
        ],
        "msapplication-TileColor": [
            "#00aced"
        ],
        "swift-page-name": [
            "profile"
        ],
        "swift-page-section": [
            "profile"
        ]
    },
    "oembed": {
        "url": "https://twitter.com/ukyoda",
        "title": "",
        "html": "<a class=\"twitter-timeline\" href=\"https://twitter.com/ukyoda?ref_src=twsrc%5Etfw\">Tweets by ukyoda</a>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n",
        "width": null,
        "height": null,
        "type": "rich",
        "cache_age": "3153600000",
        "provider_name": "Twitter",
        "provider_url": "https://twitter.com",
        "version": "1.0"
    }
}

```

## oEmbedを取得しない

oEmbedは、通常のHTML取得とは別にoEmbedのリクエストが発生するため、
レスポンス速度が低下することがあります。oEmbedの情報が不要の方は下記の通りoEmbedのリクエストをOFFにすることでレスポンス速度を改善できます。

```javascript

const parser = require("ogp-parser");
const url = "https://twitter.com/ukyoda";
parser(url, { skipOembed: true }).then(function(data) {
    console.log(JSON.stringify(data, null, "    "));
}).catch(function(error) {
    console.error(error);
});

```

### 出力結果 (no oEmbed)

```json
{
    "title": "うきょう(@ukyoda)さん | Twitter",
    "ogp": {
        "al:ios:url": [
            "twitter://user?screen_name=ukyoda"
        ],
        "al:ios:app_store_id": [
            "333903271"
        ],
        "al:ios:app_name": [
            "Twitter"
        ],
        "al:android:url": [
            "twitter://user?screen_name=ukyoda"
        ],
        "al:android:package": [
            "com.twitter.android"
        ],
        "al:android:app_name": [
            "Twitter"
        ]
    },
    "seo": {
        "robots": [
            "NOODP"
        ],
        "description": [
            "うきょう (@ukyoda)さんの最新ツイート 独立系SIer。ビッグデータや機械学習を使ったシステム開発によく携わっています。 最近はPythonが多いですが、JavascriptとかPHPとかJavaとかC/C++での開発もやってます。 https://t.co/y8iW4rQ7lD ザクソン村"
        ],
        "msapplication-TileImage": [
            "//abs.twimg.com/favicons/win8-tile-144.png"
        ],
        "msapplication-TileColor": [
            "#00aced"
        ],
        "swift-page-name": [
            "profile"
        ],
        "swift-page-section": [
            "profile"
        ]
    }
}

```

## 免責事項など

このライブラリはMITライセンスで公開しています。ライブラリの利用に対して特に、制限をかけません。
また、このライブラリを利用により何らかのトラブルが発生したとしても、製作者は一切責任を追いません。

[npm]: https://img.shields.io/npm/v/ogp-parser
[npm-url]: https://www.npmjs.com/package/ogp-parser
