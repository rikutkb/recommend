# 起動方法

$ docker-compose build

$ docker-compose up -d

localhost:3000にて画面が描画


# 環境
## 3000ポート
reactによるフロント画面
## 8080ポート
jsonサーバ
jsonサーバの反映を動的に行いたい場合は

$ docker exec -it test-json-server /bin/sh

コンテナ内で以下のコマンドを実行

$ npm run watch

## mysqlポート(未実装)
## golangによるproxy(未実装)
