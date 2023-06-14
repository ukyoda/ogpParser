import { getContents } from './getContents';
import parseXML from 'fast-xml-parser';
import he from 'he';
import { request } from './request';

type OembedInfo = {
  type: 'json' | 'xml';
  url: string;
};

export type OembedData = {
  // The oEmbed version number. This must be 1.0.
  version: string;
  // A text title, describing the resource.
  title?: string;
  // The name of the author/owner of the resource.
  author_name?: string;
  // A URL for the author/owner of the resource.
  author_url?: string;
  // The name of the resource provider.
  provider_name?: string;
  // The url of the resource provider.
  provider_url?: string;
  // The suggested cache lifetime for this resource, in seconds. Consumers may choose to use this value or not.
  cache_age?: string;
  // A URL to a thumbnail image representing the resource. The thumbnail must respect any maxwidth and maxheight parameters. If this parameter is present, thumbnail_width and thumbnail_height must also be present.
  thumbnail_url?: string;
  // The width of the optional thumbnail. If this parameter is present, thumbnail_url and thumbnail_height must also be present.
  thumbnail_width?: number | string;
  // The height of the optional thumbnail. If this parameter is present, thumbnail_url and thumbnail_width must also be present.
  thumbnail_height?: number | string;
} & (
  | {
      type: 'photo';
      url: string;
      width: number | string;
      height: number | string;
    }
  | {
      type: 'video';
      html: string;
      width: number | string;
      height: number | string;
    }
  | {
      type: 'rich';
      html: string;
      width: number | string;
      height: number | string;
    }
  | {
      type: 'link';
    }
);

export const fetchOembed = async ({
  type,
  url,
}: OembedInfo): Promise<OembedData | undefined> => {
  try {
    if (type === 'json') {
      return await getForJson(url);
    } else if (type === 'xml') {
      return await getForXml(url);
    }
  } catch (err) {
    console.warn(`oEmbed request error: ${err}`);
  }
};

const getForJson = async (url: string): Promise<OembedData | undefined> => {
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'bot',
  };
  const oembed = await request.get<OembedData>(url, { headers });
  return oembed.data;
};

const getForXml = async (url: string): Promise<OembedData | undefined> => {
  const headers = {
    'Content-Type': 'text/xml',
    'User-Agent': 'bot',
  };
  const res = await getContents(url, { headers });
  const oembedXml = res.toString();
  const options = {
    tagValueProcessor: (val: string) => he.decode(val),
  };
  const oembed = parseXML.parse(oembedXml, options);
  if (oembed.oembed) {
    return oembed.oembed as unknown as OembedData;
  } else {
    console.warn('Undefined variable `oembed.oembed`');
    return undefined;
  }
};
