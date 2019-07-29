
### 表结构
```mysql
<!-- 任务表 -->
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL COMMENT '用户id，记录是哪个用户的 task',
  `name` varchar(255) NOT NULL COMMENT '任务名称',
  `status` tinyint(1) NOT NULL COMMENT '0 未完成，1 完成, 2 已删除',
  `complateTime` datetime DEFAULT NULL COMMENT '完成时间',
  `createdTime` datetime NOT NULL COMMENT '创建时间',
  `updatedTime` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


<!-- user表 -->
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `verifyEmail` tinyint(1) DEFAULT NULL COMMENT '是否验证邮箱',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱',
  `createdAt` datetime NOT NULL COMMENT '创建时间',
  `updatedAt` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


### 门户网站
- https://docs.nestjs.cn/6/firststeps


### 笔记
#### controller 是路由


#### 提供者概念
service repository foctory helper 都被认为是提供者, 通过 constructor 注入依赖关系，提供者不过是 @Injectable 注解的类



```js
src
├── cats
│    ├──dto
│    │   └──create-cat.dto.ts
│    ├── interfaces
│    │       └──cat.interface.ts
│    ├──cats.service.ts
│    └──cats.controller.ts
├──app.module.ts
└──main.ts
```


```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root", // 输入你的mysql账号
  "password": "root", //  密码
  "database": "test", // 指定数据库名称
  "synchronize": true,
  "logging": false,
  "entities": [ // mapping class的放的位置，指定放在shared下
    "src/shared/entity/**/*.ts"
  ],
  "migrations": [ // 存放数据库版本管控migration的目录，指定放在shared下
    "src/shared/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ],
  "cli": { // 预设使用CLI产生档案的目录，指定放在shared文件夹下
    "entitiesDir": "src/shared/entity",
    "migrationsDir": "src/shared/migration",
    "subscribersDir": "src/shared/subscriber"
  }
}
```

npx typeorm entity:create -n User