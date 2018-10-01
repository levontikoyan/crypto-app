const express = require('express');
const proxy = require('express-http-proxy');
const path = require('path');
const app = express();

app.use(
  '/api',
  proxy('http://localhost:5000', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:8080';
      return opts;
    }
  })
);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT);