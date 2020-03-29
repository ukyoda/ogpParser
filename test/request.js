const chai = require('chai');
const assert = chai.assert;
const parser = require('../ogpParser');
const nock = require('nock');

function resCheck(data) {
  assert.containsAllKeys(data, ['title', 'ogp', 'seo'], '指定したキーが全て存在する');
  assert.isString(data.title, 'プロパティ`title`は文字列');
  assert.isObject(data.ogp, 'プロパティ`ogp`はオブジェクト');
  assert.isObject(data.seo, 'プロパティ`seo`はオブジェクト');
}

describe('HTTPリクエストテスト', function () {
  it ('正常リクエスト: HTTPリクエストが正常に処理される', function (done) {
    parser('http://example.com', false).then(data => {
      resCheck(data);
      done();
    }).catch(err => {
      assert.fail(err);
      done();
    });
  });
  it('正常リクエスト：SSLリクエストが正常に処理される', function (done) {
    parser('https://www.example.com', true).then(data => {
      resCheck(data);
      done();
    }).catch(err => {
      assert.fail(err);
      done();
    });
  });
  it('異常系: 存在しないURLにアクセス', function (done) {
    parser('http://abc.example.com').then(data => {
      assert.fail(`resolveが返却されている(url=${url})`)
      done();
    }).catch(err => {
      assert.ok('OK', `Catch OK(err=${err})`);
      done();
    });
  });
  it('異常系: Not Found エラー', function (done) {
    const url = 'http://google.co.jp';
    nock(url).get('/').reply(404);
    parser(url).then(data => {
      assert.fail(`resolveが返却されている(url=${url})`)
      nock.cleanAll();
      done();
    }).catch(err => {
      assert.ok('OK', `Catch OK(err=${err})`);
      nock.cleanAll();
      done();
    });
  })
});
