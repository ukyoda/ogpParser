import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as fs from 'fs';
import path from 'path';
const fixtureDirectory = path.resolve(__dirname, '../../fixture');
const oembedXmlHtml = fs.readFileSync(
  path.join(fixtureDirectory, 'demo_oembed_xml.html')
);
const oembedJsonHtml = fs.readFileSync(
  path.join(fixtureDirectory, 'demo_oembed.html')
);
const oembedJson = JSON.parse(
  fs.readFileSync(path.join(fixtureDirectory, 'oembed.json'), 'utf-8')
);
const oembedXml = fs.readFileSync(
  path.join(fixtureDirectory, 'oembed.xml'),
  'utf-8'
);
const demoHtml = fs.readFileSync(
  path.join(fixtureDirectory, 'demo.html'),
  'utf-8'
);

const server = setupServer(
  rest.get('https://example.com/oembed/json', (req, res, ctx) => {
    return res(ctx.json(oembedJson));
  }),
  rest.get('https://example.com/oembed/json.html', (req, res, ctx) => {
    return res(ctx.body(oembedJsonHtml));
  }),
  rest.get('https://example.com/oembed/xml.html', (req, res, ctx) => {
    return res(ctx.body(oembedXmlHtml));
  }),
  rest.get('https://example.com/oembed/xml', (req, res, ctx) => {
    return res(ctx.xml(oembedXml));
  }),
  rest.get('https://example.com/demo', (req, res, ctx) => {
    return res(ctx.body(demoHtml));
  }),
  rest.post('https://example.com/post', (req, res, ctx) => {
    return res(ctx.body(''));
  }),
  rest.get('http://example.com/oembed/json', (req, res, ctx) => {
    return res(ctx.json(oembedJson));
  }),
  rest.get('https://example.com/redirect', (req, res, ctx) => {
    return res(ctx.status(301), ctx.set('Location', '/oembed/json'));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
