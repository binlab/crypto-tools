const fs = require('fs')
const jade = require('jade');
const parseMD = require('parse-md');
const path = require('path');
const marked = require('marked');
const copydir = require('copy-dir');

copydir.sync('src/contents/js', 'dist/js', {
  utimes: true,
  mode: true,
  cover: true
});

copydir.sync('src/contents/css', 'dist/css', {
  utimes: true,
  mode: true,
  cover: true
});

function render(filename) {
  const fileContents = fs.readFileSync('src/contents/' + filename, 'utf8');
  const { metadata, content } = parseMD.default(fileContents);
  var renderFunction = jade.compileFile('src/templates/' + metadata.template, options.jade)
  var renderedMarkdown = marked(content);
  page = { metadata: metadata, title: metadata.title, html: renderedMarkdown };
  var html = renderFunction(options.locals);
  fs.writeFileSync('dist/' + path.basename(filename, '.md') + '.html', html);
}

// Read the Jade options
var optionsData = fs.readFileSync('src/config.json')
let options = JSON.parse(optionsData)
options.jade.globals = ["page"];

for (var metadataFilename of fs.readdirSync('src/contents')) {
  if (metadataFilename.endsWith('.md')) {
    render(metadataFilename);
  }
}