var chai = require('chai');
var assert = chai.assert;
var parseHtml = require('../utils/parseHtml');

const html = `
<!doctype html>
<html>
  <head>
    <title>テストテキスト</title>
    <meta charset="utf-8" />
    <!-- 正常系：OGPタグテストデータ -->
    <meta property="og:title" content="このHTMLはテスト用です。" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://example.com" />
    <meta property="og:image" content="http://hoge.example.com/test1.jpg" />
    <!-- duplicate tag test -->
    <meta property="og:image" content="http://hoge.example.com/test2.jpg" />
    <!-- facebook page tag -->
    <meta property="fb:admins" content="XXXXXXXXXX">
    <meta property="fb:app_id" content="YYYYYYYYYY">

    <!-- 正常系：SEOタグテストデータ  -->
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="テストDescription" />

    <!-- 正常系：サポートしていないタグ -->
    <link rel="stylesheet" href="/demo.css"></link>
    <script type="script" src="/demo.js"></script>
    <script></script>

    <!-- 異常系：Attribute設定が間違っているMetaタグ -->
    <meta name_miss="miss" content_miss="miss" />
  </head>
  <body>
    <h1>見出し1</h1>
    <h2>見出し2</h2>
  </body>
</html>
`;

describe('parseHtmlが正常に動くかテスト', () => {
  const result = parseHtml(html);
  it('指定したキーが全て存在する', () => {
    assert.containsAllKeys(result, ['title', 'ogp', 'seo']);
    assert.containsAllKeys(result.ogp, ['og:title', 'og:type', 'og:url', 'og:image', 'fb:admins', 'fb:app_id']);
    assert.containsAllKeys(result.seo, ['viewport', 'description']);
  });
  it('各タグの抽出件数チェック', () => {
    assert.equal(result.title, 'テストテキスト');
    assert.lengthOf(result.ogp['og:title'], 1);
    assert.lengthOf(result.ogp['og:type'], 1);
    assert.lengthOf(result.ogp['og:url'], 1);
    assert.lengthOf(result.ogp['og:image'], 2);
    assert.lengthOf(result.ogp['fb:admins'], 1);
    assert.lengthOf(result.ogp['fb:app_id'], 1);
    assert.lengthOf(result.seo['viewport'], 1);
    assert.lengthOf(result.seo['description'], 1);
  });
});
