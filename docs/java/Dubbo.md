# Dubbo

分布式服务框架，致力于提供高性能和透明化的 RPC 远程服务调用方案，是阿里巴巴 SOA（Service-Oriented Architecture,SOA，面向服务架构）服务化治理方案的核心框架。官网地址 http://dubbo.io



## 节点角色/调用关系

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210202185824294.png" alt="image-20210202185824294" style="zoom:67%;" />



#### 节点角色

- Provider 服务提供方
- Consumer 调用服务的服务消费方
- Registry 服务注册与发现的注册中心
- Monitor 统计服务调用的监控中心
- Container 服务运行容器



#### 调用关系

0. start 服务容器启动，加载，运行服务提供方
1. register 服务提供方启动时，向注册中心注册服务
2. subscribe 服务消费方启动时，向注册中心订阅服务
3. notify 注册中心返回服务地址列表给消费者，并推送变更
4. invoke 服务消费者从服务列表中，基于软负载均衡[^6]算法选择一台提供者进行调用，调用失败则再选一台
5. count 服务消费者与提供者，在内存中累计调用次数与实践，定时发送一次统计数据到监控中心

[^6]: 指通过软件完成负载均衡，对请求进行分配派发，如轮询、ip哈希、最小连接数等。



## 注册中心ZooKeeper

注册中心负责服务地址的注册与查找，相当于目录服务，

服务提供者和消费者只在启动时与注册中心交互，注册中心本身不转发请求，压力较小。

ZooKeeper是一个树型的目录服务，支持变更推送，可用于生产环境，作为dubbo的注册中心，保证让调用者了解ip地址与服务的对应关系。



### 安装

[下载地址](https://zookeeper.apache.org/releases.html)

选择稳定版本，这里选择3.6.2

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210202225500220.png" alt="image-20210202225500220" style="zoom:50%;" />

**下载安装**

```shell
wget https://mirrors.tuna.tsinghua.edu.cn/apache/zookeeper/zookeeper-3.6.2/apache-zookeeper-3.6.2-bin.tar.gz
tar -zxvf apache-zookeeper-3.6.2-bin.tar.gz
# 移动到特定位置，方便后续配置
cp -r  /ftpfile/apache-zookeeper-3.6.2-bin /usr/apache-zookeeper-3.6.2
```

**创建数据文件存贮目录**

```shell
cd /usr/apache-zookeeper-3.6.2
mkdir data
```

**添加主配置文件**

```shell
cd conf/
cp zoo_sample.cfg zoo.cfg
```

**修改配置**

修改zoo.cfg

```ini
# 修改配置 改为本地的数据文件存储目录
# dataDir=/tmp/zookeeper
dataDir=/usr/apache-zookeeper-3.6.2/data
# the port at which the clients will connect
clientPort=2181
```

**开放端口号**

**启动服务端**

```shell
#接上
cd ..
cd bin/
#start-foreground前台启动，会把错误日志显示
./zkServer.sh start
#查看服务端状态
./zkServer.sh status
#验证服务   **** QuorumPeerMain
jps -l
```

**启动客户端**

```shell
sh zkCli.sh
# 查看根目录下内容
[zk: localhost:2181(CONNECTED) 2] ls /
```



>- 启动报错：Could not find or Load main class org.apache.zookeeper.server.quorum.QuorumPeerMain
>
><img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210202225149862.png" alt="image-20210202225149862" style="zoom:50%;" />
>
>原因是下载的安装包有误，apache-zookeeper-3.6.2.tar.gz是源码，没有经过编译，要么编译安装，要么选择下载后缀有-bin的，如apache-zookeeper-3.6.2-bin.tar.gz
>
>- **添加到系统环境变量**
>
>效果是任何路径都可以通过`zkServer.sh 参数`调用zookeeper
>
>```shell
>vim /etc/profile
># 添加export ZKSERVER_HOME=/usr/apache-zookeeper-3.6.2
># PATH值后添加 :$ZKSERVER_HOME/bin
>source /etc/profile # 使配置生效
>```
>
>![image-20210202233135205](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210202233135205.png)
>
>- 如果telnet命令找不到：
>
>```shell
>yum install xinetd telnet telnet-server -y
>```
>
>



### 常用命令

```shell
zkServer.sh    start
zkServer.sh    status
zkServer.sh    stop
zkServer.sh    restart
# 客户端连接
zkCli.sh -server 127.0.0.1:2181 
```

#### zkCli启动后命令

[参考](https://blog.csdn.net/feixiang2039/article/details/79810102)

##### 创建节点create

```shell
create [-s] [-e] [-c] [-t ttl] path [data] [acl]
```

- `-s` 创建有序节点，同名节点会维护一个数字序号
- `-e` 创建临时节点，关闭客户端后删除

**案例**

```shell
# 普通节点
create /mynode hello   # Created /mynode
create /mynode/subnode world   # Created /mynode/subnode
# 有序节点
create -s /mynode hello # Created /mynode0000000004
create -s /mynode world # Created /mynode0000000005
# 临时节点
create -e /temp hello  # Created /temp
```



##### 列出节点ls

```shell
ls [-s] [-w] [-R] path
```

- `-w` 添加一个 watch（监视器），如果该节点发生变化，watch 可以使客户端得到通知，只触发一次。

**案例**

```shell
ls /
ls -s /
ls -w /mynode # 然后在这个节点下增删子节点会触发watch
```



##### 获取节点信息get

```shell
get [-s] [-w] path
```

- `-w` 添加一个 watch（监视器）,进行改变内容和删除节点会触发不同事件。

**案例**

```shell
get /mynode
get -w /mynode  # 内容变化产生 NodeDataChanged 事件，节点删除产生 NodeDeleted 事件
```

```shell
get -s /mynode
# 显示效果为
helloo
cZxid = 0x30000004c  #创建节点的zxid
ctime = Sun Apr 05 15:48:14 CST 2020  #创建时间
mZxid = 0x30000005d  #最后一次修改节点的zxid
mtime = Sun Apr 05 16:05:56 CST 2020  #最后一次修改时间
pZxid = 0x30000005c  #最后一次修改节点的子节点的zxid
cversion = 7  #子节点版本号
dataVersion = 1  #版本号，修改会增加
aclVersion = 0  #节点ACL版本
ephemeralOwner = 0x0  #如果是临时节点则列出所在客户端 session id，否则为0
dataLength = 6  #存储数据长度
numChildren = 1  #子节点个数
```



##### 检查状态stat

```shell
stat [-w] path
```

**案例**

```shell
stat /mynode
```



##### 修改节点set

```shell
set [-s] [-v version] path data
```

**案例**

```shell'
set /mynode hello
```

会导致mZxid，mtime和dataVersion变化



##### 删除节点delete

```shell
delete [-v version] path
deleteall path [-b batch size]
```

- deleteall删除不返回内容，并删除子节点；delete不能删除有子节点的节点
- `-v` 指定版本号，如果与当前版本号不匹配则操作失败，不指定则默认删除最新



##### 其他指令

```shell
# 列出最近10条历史记录
history
# 关闭连接
close
# 打开连接，连接远程zk服务，默认连接本地2181端口
connect host:port
# 退出连接，退出zkCli
quit
```









### 常用配置

zoo.cfg配置相关

**单机模式**

```ini
# 通信心跳数 单位毫秒 2000表示2s一次心跳检测，并设置最小session超时时间为2倍心跳时间
ticketTime=2000
#服务端与客户端通信端口号
clientPort=2181
#数据目录
dataDir=/usr/apache-zookeeper-3.6.2/data
#日志目录
dataLogDir=/usr/apache-zookeeper-3.6.2/logs
```

> - 现版本的zookeeper默认还会占用8080端口，想暂时关闭，可以在这里配置
>
>   ```ini
>   #避开要用的端口号
>   admin.serverPort=9000
>   #或者
>   admin.enableServer=false
>   ```
>
>   或者启动配置参数-Dzookeeper.admin.serverPort=9000或者-Dzookeeper.admin.enableServer=false

**集群模式**

```ini
ticketTime=2000
clientPort=2181
dataDir=/usr/apache-zookeeper-3.6.2/data
dataLogDir=/usr/apache-zookeeper-3.6.2/logs

#集群中follower与leader之间初始连接能容忍的最多心跳数，用于限定集群服务器连接主机的时限，超过则认为断开连接
initLimit=10
#集群启动后leader与follower之间最大响应心跳次数，超过则leader认为follower死掉，从服务列表删除
syncLimit=5
# 集群中的每台机器都需要感知其它机器，每一行代表一台服务器配置
# server.id=host:port:port
# id是服务器在集群中的序号，每台zk服务器还要在data目录下创建一个myid文件，内容为这个id
server.1=server1:2888:3888
server.2=server2:2888:3888
server.3=server3:2888:3888
```

集群中每个服务器配置内容一致，但myid内容不一样，id范围为1~255

>- 如果在一台计算机上配置多个zk服务器，则每个服务器需指定服务器名为localhost，端口号各自独立（如2888：3888、2889：3889、2890：3890）



### 内部机制



#### 半数机制

ZooKeeper适合安装在奇数台服务器，半数以上机器存活则集群可用。



#### 选举机制

[参考](http://dockone.io/article/696772)

配置文件中指出服务器存在一个leader其余follower，leader是通过选举机制产生的。并在leader节点挂掉时从follower中选出leader。

**选举阶段**

最大ZXID也就是节点本地的最新事务编号，包含epoch和计数两部分。epoch是纪元的意思，相当于Raft算法选主时候的term，标识当前leader周期，每次选举一个新的Leader服务器后，会生成一个新的epoch。（[术语参考](https://www.cnblogs.com/xybaby/p/10124083.html)）

- 所有节点处于Looking状态，依次发起投票，包含服务器id和最新事务id（ZXID）
- 如果别人的ZXID比自己大，说明数据比自己新，则重新发起投票，投票给目前已知最大ZXID所在服务器
- 每次投票，服务器统计投票数，判断是否有节点得到半数以上投票，存在则成为准Leader，状态为Leading，其他节点状态为Following

**发现阶段**

- 防止意外情况，如网络原因在上个阶段产生多个Leader
- Leader接收所有Follower发来的最新epoch值，从中选出最大的epoch值，+1生成新epoch值发给各个Follower
- Follower接收最新epoch值，返回ACK给Leader，带上各自最大ZXID和历史事务日志，Leader选出最大的ZXID，更新自身历史日志。

**同步阶段**

Leader收集最新历史事务日志，同步给集群所有Follower，半数同步成功，准Leader才能成为正式Leader。

> 假设有5台服务器组成的Zookeeper集群，它们的id是1-5，同时它们都是最新启动的，也就是没有历史数据。
>
> ![在这里插入图片描述](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20191006105256892.png)
>
> - 服务器1启动，此时只有一台服务器，发出去的报文没有响应，投自己1票，状态Looking。
> - 服务器2启动，与服务器1进行通信，交换选举结果（2投2一票，1投2一票），服务器2有2票最多，但没有达到服务器数半数（3票），状态Looking
> - 服务器3启动，与服务器12进行通信（3投31票，12投3一票），服务器3有3票最多，达到半数，晋升Leader，其余为Follower
> - 服务器4启动，此时已经有Leader，自动为Follower
> - 服务器5同4，为Follower



## 监控中心Monitor

也是一个web应用，部署在tomcat即可



