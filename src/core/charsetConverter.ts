import iconv from 'iconv-lite';
import jschardet from 'jschardet';

const codecTypes = ['UTF-8', 'ascii', 'ISO-8859-2'] as const;

const checkShiftJis = (codec: string): string => {
  if (codec.match(/^(windows|Shift_JIS).*/)) {
    return 'SJIS';
  } else {
    return codec;
  }
};

export const charsetConverter = (str: string | Buffer) => {
  const src = Buffer.from(str);
  const detected = jschardet.detect(src);
  if (codecTypes.some((codec) => detected.encoding === codec)) {
    return str.toString();
  }
  try {
    return iconv.decode(src, checkShiftJis(detected.encoding));
  } catch (e) {
    console.warn(e);
    return str.toString();
  }
};
