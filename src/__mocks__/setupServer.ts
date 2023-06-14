import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as fs from 'fs';
import path from 'path';
const fixtureDirectory = path.resolve(__dirname, '../__fixture__');
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
  rest.get('http://example.com', (req, res, ctx) => {
    return res(ctx.status(200), ctx.body(demoHtml));
  }),
  rest.get('https://example.com', (req, res, ctx) => {
    return res(ctx.status(200), ctx.body(demoHtml));
  }),
  rest.get('https://example.com/oembed', (req, res, ctx) => {
    return res(ctx.body(oembedJsonHtml));
  }),
  rest.get('https://example.com/oembed_xml', (req, res, ctx) => {
    return res(ctx.body(oembedXmlHtml));
  }),
  rest.get('https://oembed.example.com/jsondata', (req, res, ctx) => {
    return res(ctx.json(oembedJson));
  }),
  rest.get('https://oembed.example.com/xmldata', (req, res, ctx) => {
    return res(ctx.xml(oembedXml));
  }),
  rest.get('https://notfound.example.com', (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({ reason: 'Not Found' }));
  }),
  rest.post('https://example.com/post', (req, res, ctx) => {
    return res(ctx.body(''));
  }),
  rest.get('https://redirect.example.com', (req, res, ctx) => {
    return res(ctx.status(301), ctx.set('Location', 'https://example.com'));
  }),
  rest.get('https://redirect.example.com/loop', (req, res, ctx) => {
    return res(
      ctx.status(302),
      ctx.set('Location', 'https://redirect.example.com/loopA')
    );
  }),
  rest.get('https://redirect.example.com/loopA', (req, res, ctx) => {
    return res(
      ctx.status(302),
      ctx.set('Location', 'https://redirect.example.com/loop')
    );
  }),
  rest.get('https://abc.example.com', (req, res, ctx) => {
    return res.networkError('Failed to connect');
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
