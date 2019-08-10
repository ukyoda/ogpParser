const chai = require('chai');
const assert = chai.assert;
const charsetConverter = require('../utils/charsetConverter');
const fs = require('fs')

const euctext = fs.readFileSync('test/data/euc_jp.txt')

describe('charsetConverterテスト', function() {
  it('デコード結果が一致すること', () => {
    assert.strictEqual(charsetConverter(euctext), charsetConverter('エンコードテキストテスト'))
  })
})
