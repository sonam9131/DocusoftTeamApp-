// Plesk "Application Startup File" for this React app.
//
// The app builds to a static bundle in ./build (plain HTML/CSS/JS) and uses
// HashRouter for client-side routing (#/tab, #/login, ...), so the server
// never needs to know about app routes — it only has to serve files from
// build/ and fall back to build/index.html for anything it doesn't find
// (e.g. a hard refresh on a path Plesk's proxy passes straight through).
//
// Run `npm run build` before starting this (or after every deploy) so
// build/ reflects the latest source.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const BUILD_DIR = path.join(__dirname, "build");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  let filePath = path.join(BUILD_DIR, urlPath);

  // Guard against path traversal (e.g. "/../../etc/passwd") escaping build/.
  if (!filePath.startsWith(BUILD_DIR)) {
    filePath = path.join(BUILD_DIR, "index.html");
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(BUILD_DIR, "index.html");
    }

    const ext = path.extname(filePath).toLowerCase();
    res.setHeader("Content-Type", MIME_TYPES[ext] || "application/octet-stream");
    fs.createReadStream(filePath)
      .on("error", () => {
        res.statusCode = 500;
        res.end("Internal Server Error");
      })
      .pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Docusoft Teams app listening on port ${PORT}`);
});
