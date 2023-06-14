import { IncomingHttpHeaders } from 'http';
import https, { RequestOptions as RequestOptionsBase } from 'https';

type Options = Pick<RequestOptionsBase, 'headers' | 'method'>;

type RequestConfig = Options & {
  url: string;
};
type ResponseData<T> = {
  status: number;
  headers?: IncomingHttpHeaders;
  text?: string;
  data?: T;
  config: RequestConfig;
};
const REDIRECT_LOOP_LIMIT = 20;

const httpRequest = <T = any>(
  url: string,
  options: Options = {},
  count = 0
): Promise<ResponseData<T>> => {
  return new Promise((resolve, reject) => {
    if (count > REDIRECT_LOOP_LIMIT) {
      return reject(new Error('Redirect Loop Error'));
    }
    const req = https.request(url, options, (res) => {
      const statusCode = res.statusCode ?? 0;
      // Redirect
      if (statusCode >= 300 && statusCode < 400 && res.headers.location) {
        const originalUrl = new URL(url);
        const newUrl = new URL(
          res.headers.location,
          originalUrl.origin
        ).toString();
        httpRequest(newUrl, options, count + 1)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
        return;
      }

      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const responseData: ResponseData<T> = {
          status: res.statusCode ?? 0,
          headers: res.headers,
          text: data || undefined,
          data: undefined,
          config: {
            ...options,
            url,
          },
        };
        try {
          responseData.data = JSON.parse(data);
        } catch (err) {}
        resolve(responseData);
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });
};

export type RequestOptions = Omit<Options, 'method'>;

export const request = {
  get: <T = any>(url: string, options: RequestOptions = {}) =>
    httpRequest<T>(url, { ...options, method: 'get' }),
  post: <T = any>(url: string, options: RequestOptions = {}) =>
    httpRequest<T>(url, { ...options, method: 'post' }),
};
