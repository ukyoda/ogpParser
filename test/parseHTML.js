const chai = require('chai');
const assert = chai.assert;
const parseHtml = require('../utils/parseHtml');
const fs = require('fs');

const html = fs.readFileSync(`${__dirname}/html/demo.html`);

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
