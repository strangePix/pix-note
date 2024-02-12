# RocketMQ



## 安装

### Win

- 访问 https://archive.apache.org/dist/rocketmq/ 选择合适版本的安装包下载，这里选择https://archive.apache.org/dist/rocketmq/4.9.3/rocketmq-all-4.9.3-bin-release.zip

- 解压安装包，将文件夹中的rocketmq-4.9.3文件夹放置在自行选择的安装位置，这里个人选择 D:\soft\rocketmq\rocketmq-4.9.3

- 配置环境变量

  ```properties
  # rocket安装目录
  ROCKETMQ_HOME="D:\soft\rocketmq\rocketmq-4.9.3"
  ```

- 启动**Namesrv**，进入bin目录，运行mqnamesrv.cmd文件，请勿关闭

  ```shell
  ./mqnamesrv.cmd
  # 或者 区别在于后者异步 可以并行执行
  start mqnamesrv.cmd
  ```

  > 系统提示Please set the JAVA_HOME variable in your environment, We need java(x64)!
  >
  > 则配置环境变量
  >
  > ```properties
  > # 注意是根目录 而非bin目录位置
  > JAVA_HOME="JDK根目录位置"
  > ```

![image-20220815112054426](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208151120590.png)

- 启动**Broker** ，请勿关闭

  ```shell
  mqbroker.cmd -n 127.0.0.1:9876 autoCreateTopicEnable=true
  # 或者 
  start mqbroker.cmd -n 127.0.0.1:9876 autoCreateTopicEnable=true
  ```

  > autoCreateTopicEnable表示Topic自动创建，生产环境不建议配置（待补充）

#### 配置服务

Win里想要实现开机自启，以及灵活控制后台启动与关闭，可以通过配置服务的方式实现，但服务只支持exe文件类型。

这里使用nssm将rocket启动注册为服务（参考https://www.cnblogs.com/rossoneri22/p/15830213.html）：

- 首先编写启动脚本，命名为rocketmq-start.bat（自定义）

  ```bash
  # 相对位置根据你的脚本与mqnamesrv指令的相对位置而定，也可以写绝对位置
  start .\bin\mqnamesrv.cmd
  start .\bin\mqbroker.cmd -n localhost:9876 autoCreateTopicEnable=true
  ```

- 下载nssm，下载地址：https://nssm.cc/download，并解压缩

- 选择操作系统对应的版本，如64位，则进入win64目录，运行指令

  ```shell
  # 服务名RocketMQ自定义
  .\nssm install RocketMQ
  ```

  弹出配置框，选择运行的指令文件，以及执行命令的目录，点击Install service

  ![image-20220815135020097](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208151350008.png)

- 然后查看服务列表，安装成功

  ![image-20220815135121486](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208151351510.png)

- 如果需要把控制台项目也一并启动可以将jar命令写到启动脚本即可。



### Docker

> 我比较懒，所以用的别人做的现成的，可以考虑自己生成。

- 拉取镜像

  ```bash
  docker pull leixuewen/rocketmq:4.9.3
  ```

- 外部创建一个配置文件broker.conf，用于映射

  ```properties
  brokerClusterName = DefaultCluster
  brokerName = broker-a
  brokerId = 0
  deleteWhen = 04
  fileReservedTime = 48
  brokerRole = ASYNC_MASTER
  flushDiskType = ASYNC_FLUSH
  brokerIP1 = localhost
  namesrvAddr = localhost:9876
  ```

- 创建容器

  ```bash
  docker run --name rocketmq -e "JAVA_OPT_EXT=-Xms512M -Xmx512M -Xmn128m" -p 9876:9876 -p 10909:10909 -p 10911:10911 -v /soft/rocketmq/broker.conf:/rocketmq/conf/broker.conf leixuewen/rocketmq:4.9.3
  ```

  > 这个镜像默认情况会吧broker一并创建了，其他可以看网站上的描述



### 可视化/Web控制台

rocketmq-dashboard是使用springboot设计的RocketMq的后台系统,有了它,我们可以很方便的在Web页面上管理RocketMq的消息，topic等。

- 拉取rocketmq-dashboard代码

  ```shell
  git clone https://github.com/apache/rocketmq-dashboard.git
  ```

- 配置文件在src/main/resources/application.yml，可以进行修改

  ```properties
  # RocketMQ Namesrv 的地址
  rocketmq.config.namesrvAddr=127.0.0.1:9876
  # 端口号
  server.port=8080
  ```

- 编译源码，要求有maven，jar包启动

  ```shell
  mvn clean package -Dmaven.test.skip=true
  java -jar target/rocketmq-dashboard-1.0.1-SNAPSHOT.jar
  # 或者用maven的Springboot启动
  mvn spring-boot:run
  ```

  > 因为是一个SpringBoot项目，实际也可以用IDEA打开手动启动

- 访问本地http://127.0.0.1:8080/ 即可。

  <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208151135609.jpeg" alt="RocketMQ Console" style="zoom:50%;" />

- 使用一次后可以固定jar包位置固定启动。