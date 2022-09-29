# Nacos

## 安装

### Docker

这里以使用外部数据源为例，单机为例，使用版本为2.0.4

- 外部数据源，如mysql，创建数据库nacos_config，导入sql文件[nacos-mysql.sql](https://github.com/alibaba/nacos/blob/master/distribution/conf/nacos-mysql.sql)

  导入效果大概是这样

  ![image-20220926151221473](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209261512582.png)

  > nacos更新后sql有所变化，改用这个：[nacos-mysql.sql](https://github.com/alibaba/nacos/blob/2.0.3/distribution/conf/nacos-mysql.sql) 

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



### DockerCompose

参考配置

- nacos.yml

  ```yaml
  version: '3.1'
  services:
    nacos:
      image: nacos/nacos-server:v2.0.4
      container_name: nacos
      environment:
        TZ: Asia/Shanghai
      # 环境变量配置改用env_file
      env_file:
        - /soft/nacos/env/nacos-standalone-mysql.env
      ports: # 指定宿主机和容器的端口映射
        - "8848:8848"
        - "9848:9848"
        - "9555:9555"
      volumes:
        - /soft/nacos/log:/home/nacos/logs
        - /soft/nacos/conf/custom.properties:/home/nacos/init.d/custom.properties
      restart: always
  ```

- 其中nacos-standalone-mysql.env，实际就是环境变量配置，等价于environment

  ```properties
  # 个人使用了外部mysql数据库作为nacos库 数据库初始化参考docker安装 https://github.com/alibaba/nacos/blob/2.0.3/distribution/conf/nacos-mysql.sql
  PREFER_HOST_MODE=hostname
  MODE=standalone
  SPRING_DATASOURCE_PLATFORM=mysql
  MYSQL_SERVICE_HOST=127.0.0.1
  MYSQL_SERVICE_DB_NAME=nacos_config
  MYSQL_SERVICE_DB_PARAM=characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
  MYSQL_SERVICE_PORT=3306
  MYSQL_SERVICE_USER=root
  MYSQL_SERVICE_PASSWORD=root
  JVM_XMS=256m
  JVM_XMX=256m
  JVM_XMN=256m
  ```

- 启动和关闭

  ```sh
  # -d 是后台运行，第一次启动可以不用这个参数
  docker-compose -p nacos -f /soft/nacos/nacos.yml up -d
  # 关闭
  docker-compose -f /soft/nacos/nacos.yml down
  ```

  





## 命名空间和分组

[参考](https://blog.csdn.net/chengqiuming/article/details/112910083)

### 命名空间（namespace）

#### 创建与浏览

- 管理菜单

  ![image-20220929144306053](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209291443607.png)

- 列表形态

  ![image-20220929144439453](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209291444482.png)

- 与配置文件的对应

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209291446187.png)

  

#### 配置命名空间

- 在SpringCloud中的配置

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209291446227.png)

  > 这里的命名空间需要用命名空间id标识，如果觉得不够直观，可以在创建命名空间时，手动输入，比如和名称一致。
  >
  > 但不能重复。
  >
  > ![image-20220929145619600](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209291456627.png)



### 分组（group）

#### 创建与浏览

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209291451465.png)

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209291451472.png)

> 同一个命名空间下的不同分组，可以有同样名称的配置文件。

#### 配置分组

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209291453388.png)

### 默认设置

- 默认命名空间为public，但是它没有id，所以配置的话不用填；
- 默认分组为DEFAULT_GROUP；
- 不同的分组中可以有相同的配置文件名称；



### 区分/实践

>  这部分内容本来就是个人困惑于命名控件到底应该按环境区分还是按服务区分，而查找资料进行记录的。

- 分组是在namespace基础上进行的，所以不同命名空间的同名group没有关系；

- 同组内不能有同名的配置文件，同namespce内可以有（不同分组）；

- 实践上来说，

  - 命名空间可以按环境隔离，如dev、test、prod等，然后通过不同分组隔离同环境下的不同微服务项目配置
  - 也可以按微服务隔离，如sms、cms、erp等，然后通过配置文件命名（如edu-dev.yml）区分环境，或者通过分组区分（如DEV、TEST）

  > 也就是说在目前我还没看到大佬分享的情况下，命名空间与分组使用的界限并没有明确规定，可以按自己方便来。

- 服务注册也有分组与命名空间，同理
