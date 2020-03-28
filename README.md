## Setup

### STEP. 1

#### env の設定( docker-compose.yml )

```
...
  environment:
    ...
    - GITHUB_USER_NAME=sample
    - GITHUB_USER_PASSWORD=sample
    - GITHUB_ORGANIZATION_NAME=tetsu-tech
    - GITHUB_REPOSITORY_NAME=hackathon-sandbox
    - BASIC_ID=sample
    - BASIC_PASSWORD=sample
```

### STEP. 2
```
docker-compose up
```

## NOTE

### curl でのベーシック認証確認方法

```
curl -u <BASIC ID>:<BASIC PASSWORD> https://node-hackathon-m2p4e3zurq-uc.a.run.app/hello
```