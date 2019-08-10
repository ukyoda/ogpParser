var chai = require('chai');
var assert = chai.assert;
var parser = require('../ogpParser');

function resCheck(it, data) {
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
}

describe('正常リクエスト：HTTPリクエストが正常に処理される', function () {
  this.timeout(5000);
  parser('http://example.com', false).then(data => {
    resCheck(it, data);
  });
});

describe('正常リクエスト：SSLリクエストが正常に処理される', function() {
  this.timeout(5000);
  parser('https://www.example.com', true).then(data => {
    resCheck(it, data);
  });
});

function failCheck(url) {
  return new Promise((resolve, reject) => {
    parser(url).then(data => {
      reject(`resolveが返却されている(url=${url})`);
    }).catch((err) => {
      resolve('OK');
    });
  });
}

describe('異常系：処理確認', function() {
  //this.timeout(5000);
  it('存在しないURLにアクセス', function () {
    return failCheck('http://abc.example.com/')
  });
});
