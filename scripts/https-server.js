const { createServer: createHttpsServer } = require('https');
const { createServer: createHttpServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const app = next({ 
  dev: !process.argv.includes('--production'),
  dir: process.cwd()
});
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 3001;

// Path to SSL certificates
const keyPath = path.join(process.cwd(), 'certs', 'localhost+2-key.pem');
const certPath = path.join(process.cwd(), 'certs', 'localhost+2.pem');

app.prepare().then(() => {
  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {

    const httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };

    createHttpsServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(httpsPort, (err) => {
      if (err) throw err;
      console.log(`HTTPS Server ready on https://localhost:${httpsPort}`);
    });

    // HTTP Server (redirects to HTTPS)
    createHttpServer((req, res) => {
      const redirectUrl = `https://localhost:${httpsPort}${req.url}`;
      res.writeHead(301, { Location: redirectUrl });
      res.end();
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`HTTP Server on port ${port} redirecting to HTTPS`);
    });

  } else {
    console.error('SSL certificates not found!');
    process.exit(1);
  }
}).catch((err) => {
  console.error('Error starting server:', err);
  console.error(err.stack);
  process.exit(1);
}); 