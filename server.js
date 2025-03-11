// built-in modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// npm modules

// custom modules
const WebFile = require("./functions/webfile.js");

function app(req, res) {
  // new WebFile instance with requested url
  const reqWebFile = new WebFile(req.url);

  // if  the requested file exists, serve it with appropriate mime type
  if (fs.existsSync(reqWebFile.reqResource)) {
    res.writeHead(200, { "Content-Type": reqWebFile.getMimeType() });
    res.write(fs.readFileSync(reqWebFile.reqResource));
  }
  // else, serve a 404 page
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write(fs.readFileSync(path.join(__dirname, "views", "404.html")));
  }

  // close the response
  res.end();
}

const server = http.createServer(app);

const port = process.env.PORT || 5445;

server.listen(port);
console.log(`Server listening on port ${port}`);
console.log(`http://localhost:${port}`);
