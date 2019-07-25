
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


### 网站
- https://docs.nestjs.cn/6/firststeps
