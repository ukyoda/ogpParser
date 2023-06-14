import { request, RequestOptions } from './request';
import { charsetConverter } from './charsetConverter';

type Config = {
  headers: RequestOptions['headers'];
};

export const getContents = async (
  url: string,
  config?: Config
): Promise<string> => {
  const headers = config?.headers;
  const res = await request.get(url, { headers });
  return charsetConverter(res.data ?? res.text ?? '');
};
