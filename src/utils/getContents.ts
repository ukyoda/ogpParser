import { request, RequestOptions } from './request';
import { charsetConverter } from './charsetConverter';

export const getContents = async (url: string, config?: RequestOptions) => {
  const headers = config?.headers;
  const res = await request.get(url, { headers });
  return charsetConverter(res.data ?? res.text);
};
