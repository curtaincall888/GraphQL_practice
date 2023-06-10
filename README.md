# 環境構築した手順

## backend と連携させる場合

- [backend](https://github.com/curtaincall888/rails_posgre_docker) と開発環境で連携させる場合は、下記の network を作成する

```
docker network create external-network --subnet=192.168.192.0/20 --gateway=192.168.192.1
```

## 1. Dockerfile 作成

- 作成済、対応不要

## 2. docker-compose.yml 作成

- 作成済、対応不要

## 3. build

- build する

```
docker compose build
```

## 4. create next-app 実行

- yarn で create する

```
docker compose run --rm frontend yarn create next-app .
```

# copy する場合

- docker-compose.yml の service 名、container_name を任意のものに変更する。
- **3.**, **4.** を実施する。
