





# Redis

Redis是一个高性能的分布式内存数据库，在国内外个大互联网公司中都有着广泛的使用，即使是一些非互联网公司也有着非常重要的使用场景。



## 简单介绍

**Redis 是一个使用 C 语言开发的数据库**

与传统数据库不同的是 **Redis 的数据是存在内存中的** ，也就是它是内存数据库，所以读写速度非常快，因此 Redis 被广泛应用于缓存方向。

另外，**Redis 除了做缓存之外，也经常用来做分布式锁，甚至是消息队列。**

**Redis 提供了多种数据类型来支持不同的业务场景。Redis 还支持事务 、持久化、Lua 脚本、多种集群方案。**



## 安装

#### Win

**下载地址：**https://github.com/tporadowski/redis/releases

- 下载 **Redis-x64-xxx.zip**压缩包到 C 盘，解压后，将文件夹重新命名为 **redis**

  ![image-20210927104734903](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210927104734903.png)

- 配置环境变量

  ```powershell
  REDIS_HOME=E:\redis
  Path=%REDIS_HOME%
  ```

- 启动服务器指令

  ```powershell
  # 使用的默认的配置文件E:\redis.windows.conf
  redis-server
  redis-server E:\redis\redis.windows.conf
  ```

- 设为服务方便自启

  ```powershell
  redis-server --service-install redis.windows.conf --loglevel verbose
  ```

  

#### Linux

##### 基础安装

- 版本：CentOS 7.6 ，Redis6.0.10

- 下载redis，上传到服务器，或者直接下载。[官网](https://redis.io/)

  ```shell
  wget https://download.redis.io/releases/redis-6.0.10.tar.gz?_ga=2.133199438.1993444330.1614002910-1625138534.1614002910
  ```

- 解压并移动目录

  ```shell
  tar -zxvf redis-6.0.10.tar.gz
  mv redis-6.0.10.tar redis
  mv redis /usr/local
  ```

- 安装相关依赖，gcc版本要求5.3以上

  ```shell
  #检查gcc版本
  gcc -v
  #更新gcc
  yum -y install centos-release-scl
  yum -y install devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-binutils
  #临时切换gcc版本
  scl enable devtoolset-9 bash
  #注意：scl命令启用只是临时的，退出xshell或者重启就会恢复到原来的gcc版本。
  #如果要长期生效的话，执行如下：
  echo "source /opt/rh/devtoolset-9/enable" >>/etc/profile
  #测试用tcl版本8.5以上
  yum install tcl.x86_64
  ```

- 移动到安装目录，编译安装到特定目录

  ```shell
  cd /usr/local/redis
  make
  # make test
  make install PREFIX=/usr/local/redis 
  #如果报错，执行该指令再重新make
  make distclean
  ```

- 启动配置

  ```shell
  #启动
  cd /usr/local/redis/bin
  ./redis-server /usr/local/redis/redis.conf
  ```

  > - 简单配置（编辑redis.conf文件）：
  >
  >   - 守护模式启动（后台）：修改`daemonize`为yes   （223行左右）
  >   - 设置密码：放开`requirepass`注释并添加密码  （789行左右）
  >   - 允许远程访问：
  >     - 注释掉`bind 127.0.0.1`   (69行左右)
  >     - 关闭保护模式：`protected-mode`设为no
  >
  > - 因为[Crackit漏洞](https://www.aneasystone.com/archives/2015/11/redis-crackit.html)的存在，在云服务器请不要在保持redis可公网访问的情况下不设验证，会导致入侵并设下后门。



##### 安装为服务并由redis用户启动

- 创建redis用户

  ```shell
  groupadd redis
  useradd -r -g redis redis -s /sbin/nologin
  ```

- 配置系统变量

  ```shell
  #编辑
  vi /etc/profile
  #增加内容
  export REDIS_HOME=/user/local/redis
  export PATH=$PATH:$REDIS_HOME/bin
  #生效
  source /etc/profile
  ```

- 创建配置文件并放置在指定目录

  ```shell
  mkdir /etc/redis
  cp /usr/local/redis/redis.conf /etc/redis/redis_6379.conf
  #修改配置内容：
  daemonize yes
  requirepass XXXXX
  #bind 127.0.0.1
  protected-mode no
  pidfile /var/run/redis/6379.pid
  logfile /var/log/redis/6379.log
  dir /usr/local/redis/data/6379
  ```

- 创建相关目录并赋权

  ```shell
  mkdir /var/run/redis -pv   && chown redis.redis  /var/run/redis -R
  mkdir /usr/local/redis/data -pv && chown redis.redis  /usr/local/redis/data -R
  sudo -u redis mkdir /usr/local/redis/data/6379
  mkdir /var/log/redis/ -pv && chown redis.redis /var/log/redis/ -R
  #chown -R redis.redis /usr/local/redis 
  ```

- 修改redis服务启动方式

  ```shell
  #拷贝启动脚本到系统
  cp /usr/local/redis/utils/redis_init_script /etc/init.d/redis
  #修改参数
  vim /etc/init.d/redis
  REDISPORT=6379
  EXEC=/usr/local/redis/bin/redis-server
  CLIEXEC=/usr/local/redis/bin/redis-cli  
  PIDFILE=/var/run/redis/${REDISPORT}.pid
  CONF="/etc/redis/${REDISPORT}.conf"
  ```

- 通过系统指令用redis用户启动redis：

  ```shell
  sudo -u redis systemctl stop/status/start redis
  sudo -u redis service redis start
  ```

> - 开机启动（未测试问题）：
>
>   ```shell
>   chkconfig redis on
>   ```



### 配置及持久化

```shell
# 默认本地连接，如果想支持其他机器连接的话，那么把 127.0.0.1 改成 0.0.0.0
bind 127.0.0.1

# 保护模式，如果改成 no，那么任意机器都可以连接，并且不需要认证
# 因此我们都会设置成 yes，开启保护模式，通过 bind 和 requirepass 来实现认证登录
protected-mode yes

# 监听的端口
port 6379

# 设置 tcp 的 backlog，backlog 其实是一个连接队列，backlog 队列总和 = 未完成三次握手队列 + 已完成三次握手队列
# 在高并发环境下你需要一个高 backlog 值来避免慢客户端连接问题
# 注意 linux 内核会将这个值减小到 /proc/sys/net/core/somaxconn 的值
# 所以需要增大 somaxconn 和 tcp_max_syn_backlog 两个值来达到想要的结果
tcp-backlog 511

# 当客户端 N 秒没有活动，那么关闭连接，0 表示禁用该功能，一直保持连接
timeout 0

# 如果是 redis 集群，那么每隔 300 秒发送一个信息，告诉主节点自己还活着。
tcp-keepalive 300

# 是否是以守护进程方式启动，默认是 no，但是一般我们会改成 yes，也就是让 redis 后台启动
daemonize no

# redis 的 pid 管道文件
pidfile /var/run/redis_6379.pid

# 日志级别：debug、verbose、notice、warning，级别越高，打印的信息越少。
# 刚开发会选择 debug，会打印详细日志，上线之后选择 notice 或者 warning
loglevel notice

# 日志名字
logfile ""

# 是否把日志输出到系统日志里面，默认是不输出
# syslog-enabled no

# 指定日志文件标识，这里是 redis，所以就是 redis.log
# syslog-ident redis

# 指定 syslog 设备，值可以是 user 或者 local0 到 local7
# syslog-facility local0

# redis 数据库的数量，默认是 16 个，0-15
databases 16

# 总是显示 logo
always-show-logo yes

# 设置密码，一旦设置，再使用 redis-cli 连接的时候就需要指定密码了
# 否则进去之后无法执行命令，可以使用 redis-cli -a password，但是这样密码就暴露在终端中
# 尽管能连接，但是 redis 提示你不安全。当然我们还可以进去之后通过 auth password 来设置
# requirepass foobared
```

#### 持久化（待补充）

https://www.cnblogs.com/traditional/p/13296648.html



## 数据结构

#### String  字符串

Redis最基础的数据结构。

##### 内部编码/实现方式

字符串对象的内部编码有3种 ：**int**、**raw** 和 **embstr**，Redis会根据当前值的类型和长度来决定使用哪种编码来实现

- **int**

  如果一个字符串对象保存的是整数值，并且这个整数值可以用`long`类型来表示

- **raw**

  如果字符串对象保存的是一个字符串值,并且这个字符串值的长度大于32字节

- **embstr**

  如果字符串对象保存的是一个字符串值,并且这个字符申值的长度小于等于32字节

##### 使用场景

使用场景较为广泛

- 作为缓存层，缓存热点数据，将更新不频繁但查询频繁的数据进行缓存，减轻数据库压力。
- 利用自增自减的特性，制作计数器，限速器，自增id生成。
- 分布式系统的session共享
- 二进制数据存储

#### Hash  哈希

哈希对象用来存储一组数据对，每个数据对包含键值两个部分

![image-20200626101327742](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200626101327742.png)

##### 内部编码/实现方式

有两种实现方式：**ziplist** 与 **hashtable**

- **ziplist  压缩列表** 

  存储数据较小时实现，需要满足条件，否则通过hashtable实现：

  - 字典中保存的键与值都小于64字节
  - 键值对个数少于512个

- **hashtable  哈希表**

##### 使用场景

- 存储内容为对象时，字符串对象可以用哈希对象实现，如缓存用户信息。

  > java对象既可以用string存储（序列化为json）,也可以用hash存储。
  >
  > 但是如果这个对象更新频繁，用序列化的方式存储会需要每次都重新序列化，开销比较大。这个时候用hash存储，每次只需要更新对象属性即可。

- 缺点是要控制ziplist与hashtable两种内部编码的转换，hashtable消耗更多内存

- 实现购物车与计数器功能。

  如用户id为key，商品id为field的key，商品数量为field的value。



#### List  列表

支持存储一组有序的，不重复的数据。

因为存储内容有序，所以可以获取指定范围的元素列表，可以在O(1)的时间复杂度下获取指定索引的下标的元素。

![image-20200626105857594](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200626105857594.png)

##### 实现方式/内部编码

- 3.2版本前，有两种

  - **ziplist(压缩列表)**

    满足两个条件时使用ziplist实现：

    - 当列表的元素个数小于list-max-ziplist-entries配置（默认512个）
    - 当列表中每个元素的值都小于list-max-ziplist-value配置时（默认64字节）

  - **linkedlist**

- 3.2版本后，列表数据结构改造，用quickList代替了ziplist与linkedlist

##### 使用场景

- 因为列表的有序且不重复特性，用于文章，商品的列表存储
- 列表类型可以左推/右弹，即先进先出的队列特性，用于实现消息队列
- 可以左推/左弹，即先进后出的栈特性，用于栈的适用场景。
- lrange命令根据两个索引获取数据，可以用于实现分页。



#### Set  集合

是一个无序且唯一的键值集合，不按照插入顺序进行存储。

![image-20200626122033221](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200626122033221.png)

##### 内部编码/实现方式

- **intset(整数集合)**

  满足两个条件时，才会使用intset实现集合对象：

  - 集合中的元素都是整数
  - 集合中元素的个数小于 set-maxintset-entries配置（默认512个）

- **hashtable(哈希表)**

##### 使用场景

- 特性是无序，不重复，支持交并差，可用于**标签系统**。

  将博客网站的每个人的标签用set进行存储，还可以按标签将用户进行归并。

  利用交集可以获取共同好友类似的功能。

- SPOP（随机移除并返回集合中一个/多个元素）和SRANDMEMBER（随机返回集合中一个/多个元素）指令，支持了**抽奖系统**的实现。



#### ZSet  有序集合

相较于集合多了一个排序属性score(分值)，每个存储元素由两个值构成，一个是有序结合的元素值，一个是排序值。

有序集合保留了集合不重复元素的特性，同时支持元素排序。

![image-20200626123309037](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200626123309037.png)

##### 内部编码/实现方式

- **ziplist(压缩列表)**

  数据较少时使用ziplist存储，满足两个条件：

  - 有序集合保存的元素个数要小于 128 个；
  - 有序集合保存的所有元素成员的长度都必须小于 64 字节。

- **skiplist(跳跃表)**

##### 使用场景

- 排行榜系统，如学生排名，网站的点赞、播放排名，电商系统的销量排名等。

- 带权重的消息队列。

  重要的消息score较大，普通消息score较小，按照score进行顺序处理消息，优先处理优先级高的消息。



## 跳跃表（待补充）

待补充

http://note.moguit.cn/#/./Redis/Redis%E4%B8%AD%E7%9A%84%E8%B7%B3%E8%B7%83%E8%A1%A8/README



## Redis单线程模型详解（待补充）

待补充 https://javaguide.cn/database/redis/redis-questions-01.html#redis-%E5%8D%95%E7%BA%BF%E7%A8%8B%E6%A8%A1%E5%9E%8B%E8%AF%A6%E8%A7%A3



## 基于Redis(Jedis)实现分布式锁

#### 分布式锁的要求

- **互斥性**：任意时刻只有一个客户端持有锁。
- **不会死锁**：即使一个客户端在持有锁期间发生崩溃而没有主动解锁，也能保证后续其他客户端加锁。
- **容错性**：只要大部分redis节点正常运行，客户端就可以加锁解锁
- **"解铃还须系铃人"**：加锁与解锁由同一个客户端完成，客户端不能接触其他客户端加的锁。

#### 加锁实现

```java
public class RedisTool {

    private static final String LOCK_SUCCESS = "OK";
    private static final String SET_IF_NOT_EXIST = "NX";
    private static final String SET_WITH_EXPIRE_TIME = "PX";

    /**
     * 尝试获取分布式锁
     * @param jedis Redis客户端
     * @param lockKey 锁
     * @param requestId 请求标识
     * @param expireTime 超期时间
     * @return 是否获取成功
     */
    public static boolean tryGetDistributedLock(Jedis jedis, String lockKey, String requestId, int expireTime) {

        String result = jedis.set(lockKey, requestId, SET_IF_NOT_EXIST, SET_WITH_EXPIRE_TIME, expireTime);

        if (LOCK_SUCCESS.equals(result)) {
            return true;
        }
        return false;
    }
}
```

其中的`jedis.set(String key, String value, String nxxx, String expx, int time)`方法是分布式锁的核心，共有五个参数：

- **key**：key是唯一键，且区分锁的标志。
- **value**：value是值，这里用requestId作为值，目的是区分加锁的客户端，让解锁有依据。其中requestId可以自定义生成方式，如`UUID.randomUUID().toString()`。
- **nxxx**：这里传值为NX，含义是SET IF NOT EXIST，即当key不存在时，我们进行set操作；若key已经存在，则不做任何操作；
- **exep**：这里传值为PX，含义是我们要给这个key加一个过期时间，时间是多少由第五个参数决定。
- **time**：key的过期时间。

上述实现的效果是：

- 当前没有锁（key不存在），则进行加锁，设置过期时间，用value记录上锁的客户端
- 当前有锁，则不进行任何操作，返回false。

而满足分布式条件通过三个地方实现：

- NX参数，设置保证key存在时函数不会调用成功，满足互斥性。
- 过期时间，保证锁持有者崩溃也可以自动删除锁，不会死锁。
- value赋值requestId，保证解锁时，可以校验是否同一个客户端。



#### 错误加锁

##### 通过setnx与expire组合加锁

```java
public static void wrongGetLock1(Jedis jedis, String lockKey, String requestId, int expireTime) {

    Long result = jedis.setnx(lockKey, requestId);
    if (result == 1) {
        // 若在这里程序突然崩溃，则无法设置过期时间，将发生死锁
        jedis.expire(lockKey, expireTime);
    }
}
```

setnx()方法作用就是SET IF NOT EXIST，expire()方法设置过期时间，但由于这是两个方法不具有原子性，存在连个方法执行过程中程序崩溃，导致加锁没有过期时间，出现死锁问题。

##### 将上锁时间作为值设置加锁

```java
public static boolean wrongGetLock2(Jedis jedis, String lockKey, int expireTime) {

    long expires = System.currentTimeMillis() + expireTime;
    String expiresStr = String.valueOf(expires);

    // 如果当前锁不存在，返回加锁成功
    if (jedis.setnx(lockKey, expiresStr) == 1) {
        return true;
    }

    // 如果锁存在，获取锁的过期时间
    String currentValueStr = jedis.get(lockKey);
    if (currentValueStr != null && Long.parseLong(currentValueStr) < System.currentTimeMillis()) {
        // 锁已过期，获取上一个锁的过期时间，并设置现在锁的过期时间
        String oldValueStr = jedis.getSet(lockKey, expiresStr);
        if (oldValueStr != null && oldValueStr.equals(currentValueStr)) {
            // 考虑多线程并发的情况，只有一个线程的设置值和当前值相同，它才有权利加锁
            return true;
        }
    }
    // 其他情况，一律返回加锁失败
    return false;
}
```

**思路**

使用`jedis.setnx()`命令实现加锁，其中key是锁，value是锁的过期时间。

- 通过setnx()方法尝试加锁，如果当前锁不存在，返回加锁成功。
- 如果锁已经存在则获取锁的过期时间，和当前时间比较，如果锁已经过期，则设置新的过期时间，返回加锁成功。

**问题**

- 客户端传递过期时间，需求分布式环境下客户端时间同步；
- 锁过期时，多个客户端争夺锁，虽然最后只有一个客户端上锁，但这个锁的过期时间可能被其他客户端覆盖而改变。
- 锁没有客户端标识，会被任何客户端解锁。



#### 解锁实现

```java
public class RedisTool {

    private static final Long RELEASE_SUCCESS = 1L;

    /**
     * 释放分布式锁
     * @param jedis Redis客户端
     * @param lockKey 锁
     * @param requestId 请求标识
     * @return 是否释放成功
     */
    public static boolean releaseDistributedLock(Jedis jedis, String lockKey, String requestId) {

        String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
        Object result = jedis.eval(script, Collections.singletonList(lockKey), Collections.singletonList(requestId));

        if (RELEASE_SUCCESS.equals(result)) {
            return true;
        }
        return false;

    }
}
```

- 简单的Lua脚本代码，功能是获取锁的value值，检查与requestId是否相等，相等则删除锁。
- Lua代码传到`jedis.eval()`方法，并将lockKey赋值给KEYS[1]，requestId赋值给ARGV[1]，让Lua脚本交给jedis执行。
- 使用Lua脚本的原因要保证获取值与删除值的操作是原子性的，否则就可能出现数据不同步的问题。



#### 错误解锁

- 第一种情况是直接根据lockKey解锁，问题是无法区分客户端。

- 第二种情况：

  ```java
  public static void wrongReleaseLock2(Jedis jedis, String lockKey, String requestId) {
  
      // 判断加锁与解锁是不是同一个客户端
      if (requestId.equals(jedis.get(lockKey))) {
          // 若在此时，这把锁突然不是这个客户端的，则会误解锁
          // 也就是突然锁过期了，然后把别人的锁给干掉了
          jedis.del(lockKey);
      }
  }
  ```

  问题就在于删除与判断不是原子的，会存在删除其他客户端的锁的情况。（如判断的过程中，锁过期删除并被其他客户端获取，这个时候再删除的就是其他客户端的锁）



