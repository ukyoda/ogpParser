var chai = require('chai');
var assert = chai.assert;
var parser = require('../ogpParser');

describe('HTTPリクエストが正常に処理される', function() {
  this.timeout(5000);
  it('アクセスチェック', () => {
    return parser('http://github.com/ukyoda', true).then(data => {
      return Promise.resolve(data);
    });
  });
});

describe('OGPパーサ出力確認', function() {
  this.timeout(5000);
  parser('http://github.com/ukyoda', true).then(data => {
    it('指定したキーが全て存在する', () => {
      assert.containsAllKeys(data, ['title', 'ogp', 'seo']);
    });

    it('プロパティ`title`は文字列', () => {
      assert.isString(data.title);
    });

    it('プロパティ`ogp`はオブジェクト', () => {
      assert.isObject(data.ogp);
    });

    it('プロパティ`seo`はオブジェクト', () => {
      assert.isObject(data.seo);
    });
  });
});
