# RabbitMQ

RabbitMQ是一个被广泛使用的开源消息队列。它是轻量级且易于部署的，它能支持多种消息协议。RabbitMQ可以部署在分布式和联合配置中，以满足高规模、高可用性的需求。



## 安装

### Win

- 安装环境Erlang，下载地址 http://erlang.org/download/otp_win64_21.3.exe

- 安装RabbitMQ，下载地址 https://dl.bintray.com/rabbitmq/all/rabbitmq-server/3.7.14/rabbitmq-server-3.7.14.exe

- 找到安装后的启动图标

  ![image-20220508185939599](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220508185939599.png)

  或者进入RabbitMQ安装目录下的sbin目录

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_55.cff0e57a.png)

  通过指令启动

  ```shell
  rabbitmq-plugins enable rabbitmq_management
  ```

- 访问地址：http://localhost:15672/

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_57.f0fc20b9.png)

## 配置操作

访问http://localhost:15672/ 进入rabbitMQ图形化界面

默认账号guest guest 进行登录

#### 创建用户

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_58.2d67e0fe.png)

> 通过tags设置角色

#### 创建虚拟host

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_59.6d1d4f9f.png)

#### 为用户分配host

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_61.f2470471.png)





## 与SpringBoot整合

### 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

### 配置文件

```yaml
spring:
    rabbitmq:
            host: localhost # rabbitmq的连接地址
            port: 5672 # rabbitmq的连接端口号
            virtual-host: /xxx # rabbitmq的虚拟host
            username: guest # rabbitmq的用户名
            password: guest # rabbitmq的密码 #如果对异步消息需要回调必须设置为true
            publisher-confirm-type: correlated  # 如果对异步消息需要回调必须设置
```

默认账号 guest guest


