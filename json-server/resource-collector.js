const path = require('path');
const fs = require('fs-extra');


const resourceCollector = (basePath, cb) => {
  const json = {};
  // ディレクトリか？
  if (fs.statSync(basePath).isDirectory()) {

    // カレントディレクトリにあるファイルや子ディレクトリを順次読み込みする
    const routeJson = fs.readdirSync(basePath).reduce((buf, name) => {
      const currentPath = path.join(basePath, name);
      if (path.extname(name) === '.json') {
        const endpoint = path.basename(name, path.extname(name));
        if (buf[endpoint] === undefined) buf[endpoint] = {};
        json[endpoint] = JSON.parse(fs.readFileSync(basePath + '/' + name, 'utf-8'));
      } else {
        resourceCollector(currentPath, cb);
      }
      return Object.assign(buf, json);
    }, {});

    // 階層単位のパスと集約したJSONを返す
    const vPath = path.join('/', basePath);
    cb(vPath, routeJson);
    console.log(vPath);
  }
};
module.exports = resourceCollector;