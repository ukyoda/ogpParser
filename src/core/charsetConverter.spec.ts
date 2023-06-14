import { charsetConverter } from './charsetConverter';
import fs from 'fs';
import path from 'path';

const fixtureDirectory = path.resolve(__dirname, '../__fixture__');
const eucJP = fs.readFileSync(path.join(fixtureDirectory, 'euc_jp.txt'));
const shiftJIS = fs.readFileSync(path.join(fixtureDirectory, 'shiftjis.txt'));
const utf8 = fs.readFileSync(path.join(fixtureDirectory, 'utf8.txt'));
const ascii = fs.readFileSync(path.join(fixtureDirectory, 'ascii.txt'));

describe('charsetConverter test', () => {
  it('Check ascii', () => {
    const decodedText = charsetConverter(ascii);
    expect(decodedText).toBe('abcdefg');
  });
  it('Check utf8', () => {
    const decodedText = charsetConverter(utf8);
    expect(decodedText).toBe('あいうえお');
  });

  it('Check shift-jis', () => {
    const decodedText = charsetConverter(shiftJIS);
    expect(decodedText).toBe('あいうえお');
  });

  it('Check euc_jp', () => {
    const decodedText = charsetConverter(eucJP);
    expect(decodedText).toBe('あいうえお');
  });
});
