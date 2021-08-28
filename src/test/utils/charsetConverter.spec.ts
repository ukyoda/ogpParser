import { charsetConverter } from "../../utils/charsetConverter";
import fs from 'fs';
import path from 'path'

const eucJP = fs.readFileSync(path.join(__dirname, '../fixture/euc_jp.txt'))
const shiftJIS = fs.readFileSync(path.join(__dirname, '../fixture/shiftjis.txt'))
const utf8 = fs.readFileSync(path.join(__dirname, '../fixture/utf8.txt'))
const ascii = fs.readFileSync(path.join(__dirname, '../fixture/ascii.txt'))

describe('charsetConverter test', () => {
  it ('Check ascii', () => {
    const decodedText = charsetConverter(ascii)
    expect(decodedText).toBe('abcdefg')
  })
  it ('Check utf8', () => {
    const decodedText = charsetConverter(utf8)
    expect(decodedText).toBe('あいうえお')
  })

  it ('Check shift-jis', () => {
    const decodedText = charsetConverter(shiftJIS)
    expect(decodedText).toBe('あいうえお')
  })

  it ('Check euc_jp', () => {
    const decodedText = charsetConverter(eucJP)
    expect(decodedText).toBe('あいうえお')
  })
})
