# Open Graph Protocol Parser

[![npm][npm]][npm-url]

[日本語のREADMEはこちら](README-ja.md)

"ogp-parser" is a node.js library to extract some information such as OGP, SEO from website.

> **[IMPORTANT]**  
> From v0.5.0, we modified our library to use axios and we can extract oEmbed information. So v0.5.0 has some destructive changes.  

## Release Information

* 2023-06: v0.8.1 released
  * remove axios from package.json (I forgot...)
* 2023-06: v0.8.0 released
  * removed some dependent modules such as axios
  * modified the type definition of oEmbed structure
  * refactored some codes
* 2023-03: v0.7.1 released TypeScript Upgrade (to 4.8, because build failed v0.7.0)
* 2023-03: v0.7.0 released translate README to English and some security update
* 2021-08: v0.6.0 released support typescript
* 2021-04: v0.5.6 released security updates
* 2021-02: v0.5.5 released update axios
* 2020-08: v0.5.4 released fix bug
* 2020-07: v0.5.3 released fix bug that we cannot install ogp-parser from npm
* 2020-07: v0.5.2 released securities update (#27)
* 2020-04: v0.5.1 released same as v0.5.0 (because publishing v0.5.0 to npm is failed)
* 2020-04: v0.5.0 released support extracting oEmbed, and update interface to use axios
* 2020-03: v0.4.7 released add npm keyword
* 2020-03: v0.4.6 released security update
* 2020-02: v0.4.5 released bug fix (Thank you for @RyosukeCla)
* 2019-08: v0.4.4 released library update
* 2018-01: v0.4.1 released refactoring (to use ES2015 syntax)
* 2016-08: v0.4.0 released refactoring (support Promise)
* 2016-07: v0.3.1 released refactoring (support charset that is not UTF-8)
* 2015-05: v0.3.0 released
* 2015-04: support redirect option
* 2015-03: support https
* 2015-03: support page title
* 2014-06: fix data format
* 2014-06: add seo tag informations

## Dependencies

please check my package.json

## Install

```bash
npm install -S ogp-parser
```

## Test

```bash
npm test
```

If you want to see coverage:

```bash
npm run test-cov
```

## Usage

### JavaScript

```javascript
const ogp = require('ogp-parser');
```

### TypeScript

```typescript
import ogp from 'ogp-parser'
```

## Example

From v0.5, we have supported to extract oEmbed information.
To extract oEmbed, we will use any href attribute in the link tag that has either types:

* `application/json+oembed`
* `text/xml+oembed`

```javascript

const ogp = require("ogpParser");
console.log("URL:"+url);

ogp(url).then(function(data) {
    console.log(JSON.stringify(data, null, "    "));
}).catch(function(error) {
    console.error(error);
});

```

### Result

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

### If you aren't necessary oEmbed information

You need to request oEmbed information besides an normal http request.
If you won't need oEmbed information in your application, you can disable to extract it by using `skipOembed` option.

```javascript

const parser = require("ogp-parser");
const url = "https://twitter.com/ukyoda";
parser(url, { skipOembed: true }).then(function(data) {
    console.log(JSON.stringify(data, null, "    "));
}).catch(function(error) {
    console.error(error);
});

```

### Result (no oEmbed)

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

## Disclaimer Note

I publish this library as MIT License.  
I'm not going to place special regulations to use this library if the range of the license.  
And I make no guarantees even if you got some accidents to use this library.

[npm]: https://img.shields.io/npm/v/ogp-parser
[npm-url]: https://www.npmjs.com/package/ogp-parser
