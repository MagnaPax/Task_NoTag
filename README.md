NoTag

### mysql 도커에 설치

./docker-compose.yml

```
version: '3'
services:
  local-db:
    image: library/mysql:5.7
    container_name: local-db
    restart: always
    ports:
      - 13306:3306
    environment:
      MYSQL_ROOT_PASSWORD: root
      TZ: Asia/Seoul
    volumes:
      - ./db/mysql/data:/var/lib/mysql
      - ./db/mysql/init:/docker-entrypoint-initdb.d
    platform: linux/x86_64
```

```
$ docker-compose up -d
```

### TypeORM 관련 패키지를 설치

```
$ npm install --save @nestjs/typeorm typeorm mysql2
```

### 관리자 DB 만들기

```sql
CREATE SCHEMA management DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
```

### 테이블 만들기

```sql
CREATE TABLE brand (
	brand_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '브랜드 식별자',
	brand_name VARCHAR(255) NOT NULL DEFAULT '기본값' COMMENT '브랜드 이름'
);
```

```sql
CREATE TABLE Category (
  category_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '카테고리 식별자',
  category_name VARCHAR(255) NOT NULL COMMENT '카테고리 이름'
);
```

```sql
CREATE TABLE Product (
  product_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '고유 식별자',
  product_name VARCHAR(255) NOT NULL COMMENT '상품 이름',
  brand_id INT COMMENT 'Brand 테이블의 brand_id와 연결',
  category_id INT COMMENT 'Category 테이블의 category_id와 연결',
  sex VARCHAR(10) COMMENT '남, 여, 공용 등을 나타내는 값',
  is_kids BOOLEAN COMMENT '키즈 상품 여부를 나타내는 값',
  sales_quantity INT COMMENT '판매 수량',
  FOREIGN KEY (brand_id) REFERENCES Brand (brand_id),
  FOREIGN KEY (category_id) REFERENCES Category (category_id)
);

```

### 환경설정 파일 만들기

```terminal
$ npm install dotenv
```

./.env

```
DB_HOST=localhost
DB_PORT=13306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=test
```

./src/orm.config.ts

```ts
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCHRONIZE: false,
    ENTITIES: ["dist/**/*.entity{.ts,.js}"],
    MIGRATIONS: [__dirname + "/migrations/**/*{.ts,.js}"],
    MIGRATIONS_RUN: false,
  };

  return {
    name: "default",
    type: "mysql",
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: commonConf.SYNCHRONIZE,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };
}
```
