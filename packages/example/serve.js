const { createServer } = require('http');
const { parse } = require('url');
const { readFile } = require('fs').promises;
const path = require('path');

const port = 8000;
const distDir = path.resolve('dist');

const server = createServer(async (req, res) => {
  try {
    const parsedUrl = parse(req.url);
    let pathname = `${distDir}${parsedUrl.pathname}`;
    if (pathname.endsWith('/')) {
      pathname += 'index.html';
    }
    const data = await readFile(pathname);
    res.statusCode = 200;
    res.end(data);
  } catch (err) {
    res.statusCode = 404;
    res.end('File not found');
  }
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});