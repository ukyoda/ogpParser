import axios, { AxiosRequestConfig } from 'axios'
import { charsetConverter } from './charsetConverter'

export const getContents = async (url: string, config?: AxiosRequestConfig) => {
  const headers = config?.headers
  const res = await axios.get(url, { headers })
  return charsetConverter(res.data)
}
