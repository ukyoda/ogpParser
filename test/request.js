const chai = require('chai');
const assert = chai.assert;
const parser = require('../ogpParser');
const nock = require('nock');
const fs = require('fs')

const html = fs.readFileSync(`${__dirname}/html/demo.html`);
const htmlOembed = fs.readFileSync(`${__dirname}/html/demo_oembed.html`);
const htmlOembedXML = fs.readFileSync(`${__dirname}/html/demo_oembed_xml.html`);
const jsonOembed = JSON.parse(fs.readFileSync(`${__dirname}/html/oembed.json`));
const xmlOembed = fs.readFileSync(`${__dirname}/html/oembed.xml`);

function resCheck(data) {
  assert.containsAllKeys(data, ['title', 'ogp', 'seo'], '指定したキーが全て存在する');
  assert.isString(data.title, 'プロパティ`title`は文字列');
  assert.isObject(data.ogp, 'プロパティ`ogp`はオブジェクト');
  assert.isObject(data.seo, 'プロパティ`seo`はオブジェクト');
}

describe('HTTPリクエストテスト', function () {

  before(() => {
    nock('http://example.com').get('/').reply(200, html);
    nock('https://example.com').get('/').reply(200, html);
    nock('https://example.com').get('/oembed').reply(200, htmlOembed);
    nock('https://example.com').get('/oembed2').reply(200, htmlOembed);
    nock('https://example.com').get('/oembed_xml').reply(200, htmlOembedXML);
    nock('https://oembed.example.com').get('/jsondata').reply(200, jsonOembed);
    nock('https://oembed.example.com').get('/xmldata').reply(200, xmlOembed);
    nock('https://notfound.example.com').get('/').reply(404);
  });
  after(() => {
    nock.cleanAll();
  });

  it ('正常リクエスト: HTTPリクエストが正常に処理される', function (done) {
    parser('http://example.com').then(data => {
      resCheck(data);
      done();
    }).catch(err => {
      assert.fail(err);
      done();
    });
  });

  it('正常リクエスト：SSLリクエストが正常に処理される', function (done) {
    parser('https://example.com').then(data => {
      resCheck(data);
      done();
    }).catch(err => {
      assert.fail(err);
      done();
    });
  });

  it('正常リクエスト: oEmbed付きデータ', function (done) {
    parser('https://example.com/oembed').then(data => {
      assert.containsAllKeys(data, ['oembed'], 'oembedが取得できている');
      assert.containsAllKeys(data.oembed, Object.keys(jsonOembed));
      const oembed = data.oembed;
      Object.keys(jsonOembed).forEach(key => {
        assert.equal(oembed[key], jsonOembed[key], `Check Value[key=${key}]`);
      });
      done();
    }).catch(err => {
      assert.fail(err);
      done();
    });
  });

  it('正常リクエスト: oEmbedをスキップ', function (done) {
    parser('https://example.com/oembed2', {skipOembed: true}).then(data => {
      assert.doesNotHaveAnyKeys(data, ['oembed'])
      done();
    });
  });

  it('正常リクエスト: oEmbed付きデータ(XML)', function (done) {
    parser('https://example.com/oembed_xml').then(data => {
      assert.containsAllKeys(data, ['oembed'], 'oembedが取得できている');
      assert.containsAllKeys(data.oembed, Object.keys(jsonOembed));
      const oembed = data.oembed;
      Object.keys(jsonOembed).forEach(key => {
        assert.equal(oembed[key], jsonOembed[key], `Check Value[key=${key}]`);
      });
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
    parser('https://notfound.example.com').then(data => {
      assert.fail(`resolveが返却されている(url=${url})`)
      nock.cleanAll();
      done();
    }).catch(err => {
      assert.ok('OK', `Catch OK(err=${err})`);
      done();
    });
  })
});
