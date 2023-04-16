# 起動方法

$ docker-compose build

$ docker-compose up -d

localhost:3000にて画面が描画


# 環境
## 3000ポート
reactによるフロント画面
## 8080ポート
jsonサーバ

/api以下にjsonを配置するとmerge.jsonとなって自動に出力されます。

コンテナ内で以下のコマンドを実行

$ npm run watch

## mysqlポート(未実装)
## golangによるproxy(未実装)
