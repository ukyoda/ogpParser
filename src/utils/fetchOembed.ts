import { getContents } from './getContents'
import { ParseResult } from './parseHtml'
import parseXML from 'fast-xml-parser'
import he from 'he'
import axios from 'axios'

type OembedInfo = Required<ParseResult>['oembedInfo']

export const fetchOembed = async ({ type, url }: OembedInfo) => {
  try {
    if (type === 'json') {
      return await getForJson(url)
    } else if (type === 'xml') {
      return await getForXml(url)
    }
  } catch(err) {
    console.warn(`oEmbed request error: ${err}`);
  }
}

const getForJson = async (url: string) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const oembed = axios.get(url, { headers })
  return oembed as object
}

const getForXml = async (url: string) => {
  const headers = {
    'Content-Type': 'text/xml'
  }
  const oembedXml = await (await getContents(url, { headers })).toString()
  const options = {
    tagValueProcessor: (val: string) => he.decode(val)
  }
  const oembed = parseXML.parse(oembedXml, options);
  if (oembed.oembed) {
    return oembed.oembed as object
  } else {
    console.warn("Undefined variable `oembed.oembed`");
    return null
  }
}
