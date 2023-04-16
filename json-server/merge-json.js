const fs = require('fs');
const path = require('path');
const outputFile = 'merge.json';

// ルートパスを設定
const root = path.resolve('./', '.');
const apiPath = root + '/api';
const json = {};
// 古いファイルを一度削除
try {
    fs.unlinkSync(root + '/' + outputFile);
} catch (err) {
    console.log(err);
}

// json ファイルの生成
fs.readdirSync(apiPath).reduce((api, file) => {
    if (api === undefined) api = {};

    if (path.extname(file) == '.json') {
        const endpoint = path.basename(file, path.extname(file));
        if (api[endpoint] === undefined) api[endpoint] = {};
        json[endpoint] = JSON.parse(fs.readFileSync(apiPath + '/' + file, 'utf-8'));
    }
}, {});

// 書き込み
fs.writeFile(root + '/' + outputFile, JSON.stringify(json, null, 2), function (err) {
    if (err) throw err;
    console.log('=== Create ' + outputFile);
});

