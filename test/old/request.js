const chai = require('chai');
const assert = chai.assert;
const parser = require('../../ogpParser');
const nock = require('nock');
const fs = require('fs')

const html = fs.readFileSync(`${__dirname}/../html/demo.html`);
const htmlOembed = fs.readFileSync(`${__dirname}/../html/demo_oembed.html`);
const jsonOembed = JSON.parse(fs.readFileSync(`${__dirname}/../html/oembed.json`));

function resCheck(data) {
  assert.containsAllKeys(data, ['title', 'ogp', 'seo'], '指定したキーが全て存在する');
  assert.isString(data.title, 'プロパティ`title`は文字列');
  assert.isObject(data.ogp, 'プロパティ`ogp`はオブジェクト');
  assert.isObject(data.seo, 'プロパティ`seo`はオブジェクト');
}

describe('HTTPリクエストテスト(旧バージョン)', function () {
  
  before(() => {
    nock('http://example.com').get('/').reply(200, html);
    nock('https://example.com').get('/').reply(200, html);
    nock('https://example.com').get('/oembed').reply(200, htmlOembed);
    nock('https://example.com').get('/oembed2').reply(200, htmlOembed);
    nock('https://oembed.example.com').get('/jsondata').reply(200, jsonOembed);
    nock('https://notfound.example.com').get('/').reply(404);
  });
  after(() => {
    nock.cleanAll();
  });

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
    parser('https://example.com', true).then(data => {
      resCheck(data);
      done();
    }).catch(err => {
      assert.fail(err);
      done();
    });
  });
  it('異常系: 存在しないURLにアクセス', function (done) {
    parser('http://abc.example.com', true).then(data => {
      assert.fail(`resolveが返却されている(url=${url})`)
      done();
    }).catch(err => {
      assert.ok('OK', `Catch OK(err=${err})`);
      done();
    });
  });
  it('異常系: Not Found エラー', function (done) {
    parser('https://notfound.example.com', true).then(data => {
      assert.fail(`resolveが返却されている(url=${url})`)
      nock.cleanAll();
      done();
    }).catch(err => {
      assert.ok('OK', `Catch OK(err=${err})`);
      done();
    });
  })
});
