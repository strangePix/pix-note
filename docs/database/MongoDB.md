



# Mongodb

Mongodb是为快速开发互联网Web应用而构建的数据库系统，其数据模型和持久化策略就是为了构建高读/写吞吐量和高自动灾备伸缩性的系统。

## 安装

#### Win

- 下载安装包 https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.2.21-signed.msi

- 选择路径进行安装

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_37.91e60eec.png)

  服务端启动程序为 bin/mongod.exe

  ![image-20220507220224842](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220507220224842.png)

- 找到配置文件mongod.cfg，查看配置

  ```yaml
  # mongod.conf
  
  # for documentation of all options, see:
  #   http://docs.mongodb.org/manual/reference/configuration-options/
  
  # Where and how to store data.
  storage:
    dbPath: E:\soft\MongoDB\Server\data
    journal:
      enabled: true
  #  engine:
  #  mmapv1:
  #  wiredTiger:
  
  # where to write logging data.
  systemLog:
    destination: file
    logAppend: true
    path:  E:\soft\MongoDB\Server\log\mongod.log
  
  # network interfaces
  net:
    port: 27017
    bindIp: 127.0.0.1
  ```

  视情况可以修改storage.dbPath 以及systemLog.path配置路径，默认端口27017

> 通过安装包的安装mongodb已经安装为服务随开机启动，可视情况进行调整
>
> 相关命令：
>
> ```shell
> # 启动服务
> net start MongoDB
> # 关闭服务
> net stop MongoDB
> ```
>
> ![image-20220507220839679](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220507220839679.png)



