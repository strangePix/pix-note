# Nacos

## 安装

### Docker

这里以使用外部数据源为例，单机为例，使用版本为2.0.4

- 外部数据源，如mysql，创建数据库nacos_config，导入sql文件[nacos-mysql.sql](https://github.com/alibaba/nacos/blob/master/distribution/conf/nacos-mysql.sql)

  导入效果大概是这样

  ![image-20220926151221473](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209261512582.png)

- 拉取nacos镜像

  ```sh
  docker pull nacos/nacos-server:v2.0.4
  ```

- 构建容器

  ```sh
  docker run -d \
  -e MODE=standalone \
  -e SPRING_DATASOURCE_PLATFORM=mysql \
  -e MYSQL_SERVICE_HOST=192.168.120.1 \
  -e MYSQL_SERVICE_PORT=3306 \
  -e MYSQL_SERVICE_USER=root \
  -e MYSQL_SERVICE_PASSWORD=root \
  -p 8848:8848 \
  --name nacos \
  --restart=always \
  nacos/nacos-server:v2.0.4
  ```

  > - MODE=standalone 单节点模式
  > - SPRING_DATASOURCE_PLATFORM=mysql 使用mysql数据库连接方式
  > - MYSQL_SERVICE_HOST=192.168.120.1 指定数据库地址
  > - MYSQL_SERVICE_PORT 数据库端口
  > - MYSQL_SERVICE_USER 数据库用户名
  > - MYSQL_SERVICE_PASSWORD 数据库密码
  > - MYSQL_SERVICE_DB_NAME 数据库名称
  > - -p 8848:8848 端口映射
  > - --name nacos 容器命名

- 启动成功后访问`ip:8848/nacos`，默认用户名密码为nacos





