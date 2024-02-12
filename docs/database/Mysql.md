# MySQL

## 安装

#### Win

##### 5.7

- 前提： 解压mysql-5.7.25-winx64.zip压缩包的文件夹到某一路径，如D:\mysql-5.7.25-winx64

  保证安装包中没有data文件夹

- 修改my.ini文件（没有就新建）

  ```ini
  [client]
  # 设置mysql客户端默认字符集
  default-character-set=utf8mb4
  [mysqld]
  # 设置3306端口
  port = 3306
  # 设置mysql的安装目录
  basedir=E:\\soft\\mysql-8.0.19-winx64
  # 允许最大连接数
  max_connections=500
  # 服务端使用的字符集默认为8比特编码的latin1字符集
  character-set-server=utf8mb4
  # 创建新表时将使用的默认存储引擎
  default-storage-engine=INNODB
  [mysql]
  default-character-set=utf8mb4
  ```

- 访问mysql的bin目录，输入指令

  ```powershell
  #初始化  --initialize-insecure  生成无密码用户
  mysqld --initialize-insecure --user=root
  #安装服务 服务名为mysql5 不写默认MYSQL
  mysqld --install mysql5
  .\mysqld.exe --install
  #启动mysql服务
  net start mysql
  #查看版本
  mysql -V
  # 登录
  mysql -u root -p
  ```

- 配置环境变量，要不然无法直接使用mysql指令

  ```powershell
  MYSQL_HOME=E:\mysql-5.7.30-winx64
  Path=%MYSQL_HOME%\bin
  ```

- 修改密码

  ```mysql
  #修改密码
  set password = password('密码');
  ```

- 配置开机自启

  ![image-20210927103415585](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210927103415585.png)



##### 8.0

- 下载：这里选择压缩包解压，下载地址使用华为镜像：https://repo.huaweicloud.com/mysql/

- 解压后将文件夹放在自选的位置，然后在环境变量配置Path增加mysql文件夹的bin目录

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020120208380385.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzYwNTI2Ng==,size_16,color_FFFFFF,t_70)

- 在mysql文件夹内创建my.ini文件

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201124184338369.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzYwNTI2Ng==,size_16,color_FFFFFF,t_70#pic_center)

- 编辑my.ini文件

  ```ini
  [mysql]
  # 设置mysql客户端默认字符集
  default-character-set=utf8mb4
  [client]
  # 设置mysql客户端连接服务端时默认字符集
  default-character-set=utf8mb4
  [mysqld]
  # 设置3306端口
  port = 3306
  # 设置mysql的安装目录 这里目录的间隔符是双斜杠
  basedir=E:\\soft\\mysql-8.0.19-winx64
  # 设置mysql的数据目录
  datadir=E:\\soft\\mysql-8.0.19-winx64
  # 允许最大连接数
  max_connections=200
  # 允许连接失败的次数。这是为了防止从该主机试图攻击数据库系统
  max_connect_errors=10
  # 服务端使用的字符集默认为8比特编码的latin1字符集
  character-set-server=utf8mb4
  # 创建新表时将使用的默认存储引擎
  default-storage-engine=INNODB
  # 默认使用“mysql_native_password”插件认证
  default_authentication_plugin=mysql_native_password
  # 关闭ssl
  skip_ssl
  # 配置时区
  default-time_zone='+8:00'
  ```

- 进入命令行（`Win+R`输入cmd），进入mysql的bin目录

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201124184453416.png#pic_center)

- 执行如下指令安装并初始化

  ```sh
  #初始化  --initialize-insecure  生成无密码用户
  mysqld --initialize-insecure --user=root
  # 安装mysql 如果出现Install/Remove of the Service Denied!，则使用管理员启动命令行再执行指令
  mysqld --install
  #启动mysql服务
  net start mysql
  #查看版本
  mysql -V
  # 登录
  mysql -u root -p
  ```



##### 设置开机自启

- `Win+R`输入`services.msc`快速打开电脑”服务“

  ![在这里插入图片描述](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202210151814937.png)

- 找到mysql服务，自行选择开启/开机自启

  <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202210151814467.png" alt="在这里插入图片描述" style="zoom: 67%;" />

  <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202210151814987.png" alt="在这里插入图片描述" style="zoom:80%;" />



#### Linux

##### 5.7

- 前提：依赖libaio

  ```shell
  yum list installed | grep libaio
  yum install libaio
  ```

- 下载  https://dev.mysql.com/downloads/mysql/

  ```shell
  wget https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.32-linux-glibc2.12-x86_64.tar.gz
  ```

- 创建mysql用户组与用户

  ```shell
  groupadd mysql
  useradd -r -g mysql mysql -s /sbin/nologin
  ```

- 解压并移动到特定路径

  ```shell
  mkdir -p /usr/local/mysql
  tar -zxvf mysql-5.7.32-linux-glibc2.12-x86_64.tar.gz
  mv mysql-5.7.32-linux-glibc2.12-x86_64 /usr/local
  cd /usr/local
  mv mysql-5.7.32-linux-glibc2.12-x86_64 mysql
  ```

- 创建data目录，修改目录权限和所有者

  ```shell
  chown -R mysql:mysql  /usr/local/mysql/
  chmod -R 755 /usr/local/mysql/
  #data可以不创建，由安装时自动生成，不然还要修改权限与所有者
  ```

- 创建/etc/my.cnf文件，内容如下

  ```ini
  # For advice on how to change settings please see
  # http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html
  
  [mysqld]
  sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES 
  explicit_defaults_for_timestamp = 1
  
  basedir = /usr/local/mysql
  datadir = /usr/local/mysql/data
  port = 3306
  socket = /tmp/mysql.sock
  #默认字符集i
  character-set-server=utf8
  #不区分大小写
  lower_case_table_names = 1
  #改为监听IPv4地址族
  bind-address = 0.0.0.0
  
  log-error = /usr/local/mysql/data/mysqld.log
  pid-file = /usr/local/mysql/data/mysqld.pid
  ```

- bin目录下初始化安装

  ```shell
  ./mysqld --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data --initialize
  ```

  在/usr/local/mysql/data/mysqld.log查看生成的临时密码，如 >)=qt2lS;(,e

- 将启动脚本放到开机初始化目录

  ```shell
  # 就是因为安装路径为默认的/usr/local/mysql  所以不用重新配置这个脚本
  cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
  # 或者添加软链接亦可
  ln -s /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
  ```

- 启动服务

  ```shell
  service mysql start
  ```

- 配置mysql到环境变量

  ```shell
  vim /etc/profile
  # PATH值后添加 :/usr/local/mysql/bin
  source /etc/profile
  
  #或者添加软链接
  ln -s /usr/local/mysql/bin/mysql /usr/bin/mysql
  ```

- 连接mysql修改初始密码

  ```shell
  mysql -u root -p  # 输入查询出的初始密码
  #修改初始密码 默认强度要求8位 大小写+数字
  mysql> set password for 'root'@'localhost' = password('123456');  
  #或者
  mysql> update mysql.user set authentication_string=password('123456') where user='root' and Host = 'localhost';   # 5.7版本没有password字段
  #或者
  mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
  # 刷新权限
  mysql> flush privileges;
  ```

- 添加远程访问权限

  ```shell
  mysql> use mysql;
  mysql> select host,User from user where user = 'root';  # 查询root没有%的host
  #授权法
  mysql> grant all privileges on *.* to root@'%' identified by 'root';  # 授权远程连接 密码root
  #刷新权限
  mysql> flush privileges;
  ```

- 用mysql用户重启mysql

  ```shell
  mysql> exit;
  sudo -u mysql service mysql start
  ```

> - **开机启动**
>
>   ```shell
>   cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
>   #赋予可执行权限
>   chmod +x /etc/init.d/mysql
>   #添加服务
>   chkconfig --add mysql
>   #显示服务列表 有mysql且345均为on
>   chkconfig --list
>   #没有则开启
>   chkconfig mysql on
>   ```
>
> - with grant option作用
>
>   在授权语句添加，表示该用户可以将自身权限授权给其他人。

##### 8.0

- 检查并卸载系统自带的mysql与mariadb

  ```shell
  rpm -qa|grep mariadb
  rpm -qa|grep mysql
  rpm -e --nodeps mysql
  ```

- 通过yum安装

  ```shell
  # 去官网下载 Yum 资源包 https://dev.mysql.com/downloads/repo/yum/
  wget http://repo.mysql.com/mysql80-community-release-el8-3.noarch.rpm
  rpm -ivh mysql80-community-release-el8-3.noarch.rpm
  yum update
  yum install mysql-server
  ```

- 权限设置 因为这种方式创建的mysql属于mysql用户

  ```java
  chown -R mysql:mysql /var/lib/mysql/
  chmod -R 777 /var/lib/mysql/
  ```

- 初始化

  ```shell
  mysqld --initialize
  # 查看初始密码 /var/log/mysqld.log
  ```

- 启动

  ```shell
  systemctl start mysqld
  # 查看运行状态
  systemctl status mysqld
  ```

- 开机自启

  ```shell
  systemctl enable mysqld
  systemctl daemon-reload
  ```



#### Docker

- 拉取镜像

  ```powershell
  docker pull mysql:latest
  ```

- 运行mysql容器

  ```powershell
  docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
  ```

  > - **-p 3306:3306** ：映射容器服务的 3306 端口到宿主机的 3306 端口，外部主机可以直接通过 **宿主机ip:3306** 访问到 MySQL 的服务。
  >
  > - **MYSQL_ROOT_PASSWORD=123456**：设置 MySQL 服务 root 用户的密码。
  >
  > - 为了保证容器删除重建后数据还在，可以配置映射目录
  >
  >   ```bash
  >   # 本地数据目录 /my/own/datadir
  >   docker run --name some-mysql -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
  >   ```



## 卸载

#### Linux

```shell
# 先保证mysql服务已关闭
yum remove mysql mysql-server mysql-libs mysql-server
# 查看已安装的mysql命令
yum list installed mysql*
rpm -qa|grep mysql
# 根据列表依次删除，并用上述指令反复确认
rpm -ev XXXX
# 搜索剩余mysql文件
find / -name mysql*
find / -name my.cnf*
#手动删除my.cnf
rm -rf /etc/my.cnf
rm -rf /etc/my.cnf.rpmsave
rm -rf /var/log/mysqld.log.rpmsave
```





## 常用命令

### 使用root账号连接mysql

```bash
mysql -u root -p
```

### 查看mysql版本

```mysql
select version();
```





## 配置文件

[参考官方文档](https://www.docs4dev.com/docs/zh/mysql/5.7/reference/preface.html)

Linux下为/etc/my.cnf

```ini
[client]
# MySQL客户端默认端口号
port = 3306 
# 用于本地连接的Unix套接字文件存放路径
socket = /tmp/mysql.sock
# MySQL客户端默认字符集
default-character-set = utf8mb4

max_allowed_packet=16M



[mysql]
# mysql命令行工具不使用自动补全功能，建议还是改为
# no-auto-rehash
#auto-rehash
socket = /tmp/mysql.sock


[mysqld]


port = 3306
#mysql启动时使用的用户  底下的目录都要有mysql用户的权限
user= mysql
##改为监听IPv4地址族，允许所有人连接
bind-address = 0.0.0.0
#安装根目录
basedir = /usr/local/mysql
#数据文件目录
datadir = /usr/local/mysql/data
# 進程ID文件存放路徑
pid-file = /usr/local/mysql/data/mysqld.pid
# 用于本地连接的Unix套接字文件存放路径
socket = /tmp/mysql.sock
#临时目录 比如load data infile会用到
tmpdir  = /tmp
#设置client连接mysql时的字符集,防止乱码
init_connect='SET NAMES utf8mb4'
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
#默认字符集  utf8mb4编码是utf8编码的超集，兼容utf8，并且能存储4字节的表情字符
character-set-server=utf8mb4
# MySQL服務端校對規則
collation_server = utf8mb4_general_ci
##不区分大小写
lower_case_table_names = 1
# 禁止MySQL对外部连接进行DNS解析
skip-name-resolve = 1
# mysql 5.1 之后，默认引擎就是InnoDB了
default_storage_engine = InnoDB

transaction_isolation = READ-COMMITTED
#防止外部锁定表
skip-external-locking=1

explicit_defaults_for_timestamp = 1





# MySQL支持的SQL语法模式，与其他异构数据库之间进行数据迁移时，SQL Mode组合模式会有帮助。
#NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
#ONLY_FULL_GROUP_BY 
#NO_ZERO_IN_DATE 不允许年月为0
#NO_ZERO_DATE 不允许插入年月为0的日期
#ERROR_FOR_DIVISION_BY_ZERO 在INSERT或UPDATE过程中，如果数据被零除，则产生错误而非警告。如果未给出该模式，那么数据被零除时MySQL返回NULL
#NO_ENGINE_SUBSTITUTION 不使用默认的存储引擎替代
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER


#语句长度限制 默认1m
max_allowed_packet=16M
#warning: [Server] CA certificate ca.pem is self signed
skip-ssl=1


#设置Mysql的最大连接数
max_connections = 1000
# 每个数据库用户的最大连接，（同一个账号能够同时连接到mysql服务的最大连接数），默认为0，表示不限制。
max_user_connections = 1000
# MySQL监听TCP端口时设置的积压请求栈大小，默认50+(max_connections/5)，最大不超过900
back_log = 250
#防止暴力破解超过100次后禁止连接 成功连接一次后会清零
max_connect_errors = 100
# MySQL默认的wait_timeout  值为8个小时(28800), interactive_timeout参数需要同时配置才能生效
# MySQL连接闲置超过一定时间后(单位：秒，此处为1800秒)将会被强行关闭
interactive_timeout = 1800 
wait_timeout = 1800 



# 日志文件相关设置，一般只开启三种日志，错误日志，慢查询日志，二进制日志。普通查询日志不开启。

# 關閉通用查詢日誌
general_log = 0
# 通用查詢日誌存放路徑
general_log_file = /data/mysql/log/mysql-general.log

# 數據庫服務器ID
server_id = 8

#开启binlog
log_bin = /usr/local/mysql/log/mysql-bin.log
# 同binlog，定義binlog的位置和名稱
#log_bin_index = /usr/local/mysql/log/mysql-bin.index
# binlog的格式也有三种：STATEMENT，ROW，MIXED。mysql 5.7.7后，默认值从 MIXED 改为 ROW
binlog_format = row
# mysql清除过期日志的时间，默认值0，不自动清理，而是使用滚动循环的方式。
expire_logs_days = 0
# 如果二进制日志写入的内容超出给定值，日志就会发生滚动。你不能将该变量设置为大于1GB或小于4096字节。 默认值是1GB。
max_binlog_size = 50M
# 每個session分配的binlog緩存大小
# 事務提交前產生的日誌，記錄到Cache中；事務提交後，則把日誌持久化到磁盤
binlog_cache_size = 2M
# sync_binlog=0（默認），事務提交後MySQL不刷新binlog_cache到磁盤，而讓Filesystem自行決定，或者cache滿了才同步。
# sync_binlog=n，每進行n次事務提交之後，MySQL將binlog_cache中的數據強制寫入磁盤。
sync_binlog = 1
# 將row模式下的sql語句，記錄到binlog日誌，默認是0(off)
binlog_rows_query_log_events = 1


#开启慢查询
slow_query_log = 1
#慢查询时间
long_query_time = 8
# 執行緩慢的管理語句，記錄到慢查詢日誌
log_slow_admin_statements = 1
#慢查询日志文件地址
slow_query_log_file = /usr/local/mysql/log/mysql-slow.log

# 全局动态变量，默认3，范围：1～3
# 表示错误日志记录的信息，1：只记录error信息；2：记录error和warnings信息；3：记录error、warnings和普通的notes信息。
log_error_verbosity = 2
log-error = /usr/local/mysql/log/mysql-error.log
```

> - 因为自定义目录的原因，用这个安装时需要提前创建目录
>
>   ```shell
>   mkdir /usr/local/mysql/log
>   #还要给修改这个文件夹的所有者为mysql  
>   chown -R mysql:mysql  /usr/local/mysql/log
>   ```
>
> - 相应地，查看初始密码在/usr/local/mysql/log/mysql-error.log



## 存储引擎

#### 存储引擎相关指令

- **查看 MySQL 提供的所有存储引擎**

  ```mysql
  show engines;
  ```

  ![查看MySQL提供的所有存储引擎](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/mysql-engines.png)

  Mysql5.5以后默认使用InnoDB为搜索引擎

  并且在 5.7 版本所有的存储引擎中只有 InnoDB 是事务性存储引擎，也就是说只有 InnoDB 支持事务。

- **查看 MySQL 当前默认的存储引擎**

  ```mysql
  show variables like '%storage_engine%';
  ```

- **查看表的存储引擎**

  ```mysql
  show table status like "table_name" ;
  ```

  ![查看表的存储引擎](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dsfsdfsfmysql.png)



#### 搜索引擎MyISAM与InnoDB区别

![image-20200404084731063](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404084731063.png)

1. **InnoDB支持事务，MyISAM不支持事务**

   MyISAM 不提供事务支持。

   对于InnoDB每一条SQL语言都默认封装成事务，具有提交(commit)和回滚(rollback)事务的能力。

2. **InnoDB支持外键，而MyISAM不支持**

   对一个包含外键的InnoDB表转成MyIsam表会失败

   > 一般不建议在数据库层面使用外键的，应用层面可以解决。
   >
   > 不过，这样会对数据的一致性造成威胁。
   >
   > 具体要不要使用外键还是要根据项目来决定。

3. **InnoDB支持行级锁，MyISAM不支持**

   MyISAM 只有表级锁(table-level locking)，

   而 InnoDB 支持行级锁(row-level locking)和表级锁，默认为行级锁。

   所以InnoDB 在并发写时效率更高，MyISAM 一锁就是锁住了整张表。

4. **InnoDB是聚集索引，而MyISAM是非聚集索引**

   InnoDB数据文件和索引绑定在一块，必须要有主键，通过主键索引效率很高，

   但是辅助索引需要两次查询，先查询到主键，然后在通过主键查询到数据，因此主键不能过大。

   主键过大的时候，其它索引也会很大。

   MyISAM数据和文件是分离的，索引保存的是数据文件的指针，主键索引和辅助索引是独立的。

5. **InnoDB不支持全文检索，而MyISAM支持全文检索**

   查询效率上MyIsam要高

6. **InnoDB支持数据库异常崩溃后的安全回复，MyISAM不支持**

   使用 InnoDB 的数据库在异常崩溃后，数据库重新启动的时候会保证数据库恢复到崩溃前的状态。这个恢复的过程依赖于 `redo log` 。

   > - MySQL InnoDB 引擎使用 **redo log(重做日志)** 保证事务的**持久性**，使用 **undo log(回滚日志)** 来保证事务的**原子性**。
   > - MySQL InnoDB 引擎通过 **锁机制**、**MVCC** 等手段来保证事务的隔离性（ 默认支持的隔离级别是 **`REPEATABLE-READ`** ）。
   > - 保证了事务的持久性、原子性、隔离性之后，一致性才能得到保障。

7. **InnoDB支持MVCC(多版本并发控制)，MyISAM不支持**

   MVCC 可以看作是行级锁的一个升级，可以有效减少加锁操作，提高性能。



#### MyISAM 和 InnoDB 的选择问题

- 大多数时候使用的都是 InnoDB 存储引擎；
- 在某些读密集的情况下，使用 MyISAM 也是合适的，前提是不介意MyISAM 不支持事务、崩溃恢复等缺点。
- 日常开发没什么理由再使用 MyISAM 作为自己的 MySQL 数据库的存储引擎









## 索引



### 什么是索引/作用

索引是一种**用于快速查询和检索数据的数据结构**。

索引的作用就相当于目录的作用。

比如查字典，我们只需要先去目录里查找字的位置，然后直接翻到那一页就行了。



### 索引的优缺点

**优点**

- 可以大大加快检索速度，减少检索的数据量。
- 通过创建唯一索引，保证数据库表中每一行数据的唯一性。

**缺点**

- 创建与维护索引需要耗费很长时间。

  对表数据进行增删改时，需要对索引进行动态修改，降低sql效率。

- 索引需要物理文件存储，耗费空间。

> **使用索引一定能提高查询性能吗?**
>
> 大多数情况，索引查询比全表扫描块，但是如果数据库的数据量不大，那么使用索引也不一定能够带来很大提升。







### 索引类型



#### 主键索引（Primary Key）

数据表的主键列使用的就是主键索引。

一张数据表有只能有一个主键，并且主键不能为 null，不能重复。

在 MySQL 的 InnoDB 的表中，当没有显示的指定表的主键时，InnoDB 会自动先检查表中是否有唯一索引且不允许存在null值的字段，如果有，则选择该字段为默认的主键，否则 InnoDB 将会自动创建一个 6Byte 的自增主键。



#### 二级索引（辅助索引）

**二级索引的叶子节点存储的数据是主键**。也就是说，通过二级索引，可以定位主键的位置。

唯一索引，普通索引，前缀索引等索引属于二级索引。

- **唯一索引(Unique Key)** ：

  唯一索引的属性列不能出现重复的数据，但是允许数据为 NULL，一张表允许创建多个唯一索引。 

  建立唯一索引的目的大部分时候都是为了该属性列的数据的唯一性，而不是为了查询效率。

- **普通索引(Index)** ：

  普通索引的唯一作用就是为了快速查询数据，一张表允许创建多个普通索引，并允许数据重复和 NULL。

- **前缀索引(Prefix)** ：

  前缀索引只适用于字符串类型的数据。

  前缀索引是对文本的前几个字符创建索引，相比普通索引建立的数据更小， 因为只取前几个字符。

- **全文索引(Full Text)** ：

  全文索引主要是为了检索大文本数据中的关键字的信息，是目前搜索引擎数据库使用的一种技术。

  Mysql5.6 之前只有 MYISAM 引擎支持全文索引，5.6 之后 InnoDB 也支持了全文索引。







### 使用索引的建议

- 对于中到大型表索引都是非常有效的，但是特大型表的话维护开销会很大，不适合建索引

- 避免 where 子句中对字段施加函数，这会造成无法命中索引

- 使用与业务无关的自增主键作为主键，即使用逻辑主键，而不要使用业务主键

  > - **业务主键（自然主键）**：在数据库表中把具有业务逻辑含义的字段作为主键，称为“自然主键(Natural Key)”。
  > - **逻辑主键（代理主键）**：在数据库表中采用一个与当前表中逻辑信息无关的字段作为其主键，称为“代理主键”。
  > - **复合主键（联合主键）**：通过两个或者多个字段的组合作为主键。
  >
  > **使用逻辑主键的原因：**
  >
  > - 业务主键一旦改变则系统中关联该主键的部分的修改将会是不可避免的，并且引用越多改动越大。
  >
  >   而使用逻辑主键则只需要修改相应的业务主键相关的业务逻辑即可，减少了因为业务主键相关改变对系统的影响范围。
  >
  > - 使用 int 或者 bigint 作为外键进行联接查询，性能会比以字符串作为外键进行联接查询快。

- 删除长期未使用的索引。

  不用的索引的存在会造成不必要的性能损耗 ，MySQL 5.7 可以通过查询 sys 库的 schema_unused_indexes 视图来查询哪些索引从未被使用。

- 在使用 limit offset 查询缓慢时，可以借助索引来提高性能



### 索引原理（待补充）

[参考](https://tech.meituan.com/2014/06/30/mysql-index.html)

#### 索引使用的目的/简述原理

索引的目的在于提高查询效率，就好像字典的目录。

原理是通过不断缩小想要获得数据的范围来筛选出最终想要的结果，并用同一种查找方式来锁定数据。



#### 前置知识：磁盘IO与预读



磁盘读取数据靠的是机械运动，每次读取数据花费的时间可以分为寻道时间、旋转延迟、传输时间三个部分。

- **寻道时间**

  磁臂移动到指定磁道所需要的时间。

  主流磁盘一般在5ms以下。

- **旋转延迟**

  就是磁盘转速，

  如一个磁盘7200转，表示每分钟能转7200次，也就是1秒能转120次，旋转延迟就是1/120/2 = 4.17ms

  > **旋转延迟**
  >
  > 从磁盘寻道结束开始，直到磁头旋转到I/O请求所请求的起始数据块位置止，这之间的时间间隔。
  >
  > 将**磁盘旋转周期的一半**作为旋转延迟的近似值。

- **传输时间**

  从磁盘读出，或将数据写入磁盘的时间。

  一般在零点几毫秒，相对于前两个时间可以忽略不计。

  

由上可知，访问一次磁盘的时间，即一次磁盘IO时间约为5+4.17 = 9ms左右。

但一台500-MIPS机器每秒可以执行5亿条指令，约合一次IO的时间可以执行40万条指令，数据库动辄百万千万级的数据，每次9ms还是太久。

> **MIPS**：Million Instructions Per Second的缩写，每秒处理的百万级的机器语言指令数，是衡量CPU速度的一个指标。

考虑到磁盘IO为高昂操作，计算机操作系统进行了优化，

根据局部预读性原理，**不光把当前磁盘地址的数据，还把相邻的数据也读取到内存缓冲区中**。

> **局部预读性原理**：指无论程序指令还是数据都趋于聚集在一个较小的连续区域中。
>
> 当计算机访问一个地址的数据时，其相邻的数据也会很快被访问到。

于是每一次IO读取到的数据称之为**页（page）**。

具体每一页的大小与操作系统有关，一般为4k或者8k，于是在读取一页内的数据时，实际只会发生一次IO。









## 锁机制与 InnoDB 锁算法

### MyISAM 和 InnoDB 存储引擎使用的锁

- MyISAM 采用表级锁(table-level locking)。
- InnoDB 支持行级锁(row-level locking)和表级锁，默认为行级锁



### 表级锁与行级锁对比

- **表级锁：** 

  MySQL 中锁定 **粒度最大** 的一种锁，对当前操作的整张表加锁。

  实现简单，资源消耗也比较少，加锁快，不会出现死锁。

  其锁定粒度最大，触发锁冲突的概率最高，并发度最低。

  MyISAM 和 InnoDB 引擎都支持表级锁。

- **行级锁：** 

  MySQL 中锁定 **粒度最小** 的一种锁，只针对当前操作的行进行加锁，行级锁能大大减少数据库操作的冲突。

  其加锁粒度最小，并发度高，但加锁的开销也最大，加锁慢，会出现死锁。

  

### InnoDB 存储引擎的锁的算法

- **Record lock**：记录锁，单个行记录上的锁
- **Gap lock**：间隙锁，锁定一个范围，不包括记录本身
- **Next-key lock**：record+gap 临键锁，锁定一个范围，包含记录本身





## Mysql事务



### Mysql数据事务的实现原理

以 MySQL 的 InnoDB 引擎为例，

MySQL InnoDB 引擎使用 **redo log(重做日志)** 保证事务的**持久性**，

使用 **undo log(回滚日志)** 来保证事务的**原子性**，

通过 **锁机制**、**MVCC** 等手段来保证事务的隔离性（ 默认支持的隔离级别是 **`REPEATABLE-READ`** ），

保证了事务的持久性、原子性、隔离性之后，一致性才能得到保障。





### MySQL默认隔离级别

InnoDB 存储引擎的默认支持的隔离级别是 **REPEATABLE-READ(可重读)**

> **MySQL InnoDB 的 REPEATABLE-READ（可重读）并不保证避免幻读，需要使用加锁读来保证。而这个加锁读使用到的机制就是 Next-Key Locks。**

因为隔离级别越低，事务请求的锁越少，所以大部分数据库系统的隔离级别都是 **READ-COMMITTED(读已提交)** 。

但 InnoDB 存储引擎默认使用 **REPEATABLE-READ(可重复读)** 并不会有任何性能损失。

InnoDB 存储引擎在 **分布式事务** 的情况下一般会用到 **SERIALIZABLE(可串行化)** 隔离级别。



## 使用细节点



### 时间字段类型的选择



#### 不要用字符串存储日期

1. 字符串占用的空间更大；
2. 字符串存储的日期效率比较低（逐个字符进行比对），无法用日期相关的 API 进行计算和比较。



#### Datetime 和 Timestamp 之间抉择

**通常都会首选 Timestamp**

##### 1. DateTime 类型没有时区信息

- **DateTime 类型是没有时区信息的（时区无关）** ，DateTime 类型保存的时间都是**当前会话所设置的时区对应的时间**。

  当你的时区更换之后，比如你的服务器更换地址或者更换客户端连接时区设置的话，就会导致从数据库中读出的时间错误。

- **Timestamp 和时区有关**。

  Timestamp 类型字段的值会随着服务器时区的变化而变化，自动换算成相应的时间，说简单点就是在不同时区，查询到同一个条记录此字段的值会不一样。

> **一些关于 MySQL 时区设置的一个常用 sql 命令**
>
> ```mysql
> # 查看当前会话时区
> SELECT @@session.time_zone;
> # 设置当前会话时区
> SET time_zone = 'Europe/Helsinki';
> SET time_zone = "+00:00";
> # 数据库全局时区设置
> SELECT @@global.time_zone;
> # 设置全局时区
> SET GLOBAL time_zone = '+8:00';
> SET GLOBAL time_zone = 'Europe/Helsinki';
> ```

##### 2. DateTime 类型耗费空间更大

Timestamp 只需要使用 4 个字节的存储空间，但是 DateTime 需要耗费 8 个字节的存储空间。

> 同样造成了一个问题，Timestamp 表示的时间范围更小：
>
> - DateTime ：1000-01-01 00:00:00 ~ 9999-12-31 23:59:59
> - Timestamp： 1970-01-01 00:00:01 ~ 2037-12-31 23:59:59



#### 数值型时间戳不一定是更好的选择

很多时候，也会使用 int 或者 bigint 类型的数值也就是时间戳来表示时间。

##### 时间戳的定义

> 从一个基准时间开始算起，这个基准时间是**「1970-1-1 00:00:00 +0:00」**，从这个时间开始，用整数表示，以秒计时，随着时间的流逝这个时间整数不断增加。

这样一来，我只需要一个数值，就可以完美地表示时间了，而且这个数值是一个绝对数值，即无论的身处地球的任何角落，这个表示时间的时间戳，都是一样的，生成的数值都是一样的，并且没有时区的概念，所以在系统的中时间的传输中，都不需要进行额外的转换了，只有在显示给用户的时候，才转换为字符串格式的本地时间。



##### 优势

这种存储方式的具有 Timestamp 类型的所具有一些优点，

并且使用它的进行日期排序以及对比等操作的效率会更高，

跨系统也很方便，毕竟只是存放的数值。

##### 缺点

缺点也很明显，就是数据的可读性太差了，无法直观的看到具体时间。

##### 数据库操作

时间戳与日期的转换

```mysql
mysql> select UNIX_TIMESTAMP('2020-01-11 09:53:32');
+---------------------------------------+
| UNIX_TIMESTAMP('2020-01-11 09:53:32') |
+---------------------------------------+
|                            1578707612 |
+---------------------------------------+
1 row in set (0.00 sec)

mysql> select FROM_UNIXTIME(1578707612);
+---------------------------+
| FROM_UNIXTIME(1578707612) |
+---------------------------+
| 2020-01-11 09:53:32       |
+---------------------------+
1 row in set (0.01 sec)
```



#### 总结

没有银弹，一般推荐Timestamp

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/timestampsdfsdgsgsg.jpg)

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dsdfsfsfdfsfssf.jpg)



### 查询缓存

执行查询语句的时候，会先查询缓存。

>  不过，MySQL 8.0 版本后移除，因为这个功能不太实用

#### 开启查询缓存

- `my.cnf` 加入以下配置，重启 MySQL 开启查询缓存

  ```ini
  query_cache_type=1
  query_cache_size=600000
  ```

- 或者执行mysql指令

  ```mysql
  set global  query_cache_type=1;
  set global  query_cache_size=600000;
  ```

#### 缓存效果

**开启查询缓存后在同样的查询条件以及数据情况下，会直接在缓存中返回结果**。

这里的查询条件包括查询本身、当前要查询的数据库、客户端协议版本号等一些可能影响结果的信息。

任何两个查询在任何字符上的不同都会导致缓存不命中。

此外，如果查询中包含任何用户自定义函数、存储函数、用户变量、临时表、MySQL 库中的系统表，其查询结果也不会被缓存。

**缓存建立之后**，MySQL 的查询缓存系统会跟踪查询中涉及的每张表，如果这些表（数据或结构）发生变化，那么和这张表相关的所有缓存数据都将失效。

#### 缓存不命中的情况

- **查询条件不一样**，包括查询本身、当前要查询的数据库、客户端协议版本号等一些可能影响结果的信息，缓存未命中；
- **查询中包含任何用户自定义函数、存储函数、用户变量、临时表、MySQL 库中的系统表**，查询结果不会被缓存。
- **表（数据或结构）发生变化**，和这张表相关的所有缓存数据都将失效。



#### 缺陷

虽然能够提升数据库的查询性能，但是缓存同时也**带来了额外的开销**，**每次查询后都要做一次缓存操作，失效后还要销毁。**

因此，开启查询缓存要谨慎，尤其对于写密集的应用来说更是如此。

> - 如果开启，要注意合理控制**缓存空间大小**，一般来说其大小设置为**几十 MB** 比较合适。
>
> - **可以通过 sql_cache 和 sql_no_cache 来控制某个查询语句是否需要缓存**
>
>   ```mysql
>   select sql_no_cache count(*) from usr;
>   ```





## Mysql高性能优化规范

https://www.cnblogs.com/huchong/p/10219318.html

### 数据库命令规范

- 数据库表名使用小写字母，用下划线分割

- 数据库表名禁用mysql保留关键字，如果包含，在查询时用单引号括起来

- 数据库表名做到见名识意，不超过32字符

- 临时库表以`tmp_`开头，日期作为后缀；备份表以`bak_`开头，以日期为后缀

- 所有存储相同数据的列名与列类型保持一致

  > 这种列一般作为关联列，如果类型不一致会自动进行数据类型隐式转换，导致列索引失效，查询效率降低。



## sql语句优化分析/慢查询优化（待调整）

[参考1](https://www.cnblogs.com/knowledgesea/p/3686105.html)

### 问题所在

sql语句性能达不到你的要求，执行效率让你忍无可忍，一般会时下面几种情况：

- 网速不给力，不稳定。
- 服务器内存不够，或者SQL 被分配的内存不够。
- sql语句设计不合理
- 没有相应的索引，索引不合理
- 没有有效的索引视图
- 表数据过大没有有效的分区设计
- 数据库设计太2，存在大量的数据冗余
- 索引列上缺少相应的统计信息，或者统计信息过期
- ....

如何给找出来导致性能慢的的原因呢？

- 知道是否跟sql语句有关，确保不是机器开不开机，服务器硬件配置太差
- 使用sql性能检测工具，分析出sql慢的相关语句，就是执行时间过长，占用系统资源，cpu过多的
- sql优化方法跟技巧，避免一些不合理的sql语句，取暂优sql
- 判断是否使用，合理地统计信息。
- 确认表中使用了合理的索引
- 数据太多的表，要分区，缩小查找范围





### 查询优化工具-explain命令

#### 具体用法和字段含义（待补充）

需要强调rows是核心指标，绝大部分rows小的语句执行一定很快（有例外）。所以优化语句基本上都是在优化rows。



### 慢查询优化步骤

0. 先运行看看是否真的很慢，注意设置SQL_NO_CACHE

1. where条件单表查，锁定最小返回记录表。

   这句话的意思是把查询语句的where都应用到表中返回的记录数最小的表开始查起，单表每个字段分别查询，看哪个字段的区分度最高

2. explain查看执行计划，是否与1预期一致（从锁定记录较少的表开始查询）

3. order by limit 形式的sql语句让排序的表优先查

4. 了解业务方使用场景

5. 加索引时参照建索引的几大原则

6. 观察结果，不符合预期继续从0分析



### 慢查询案例

很多情况下，我们写SQL只是为了实现功能，这只是第一步，不同的语句书写方式对于效率往往有本质的差别，这要求我们对mysql的执行计划和索引原则有非常清楚的认识。

#### 案例一

```mysql
select
   distinct cert.emp_id 
from
   cm_log cl 
inner join
   (
      select
         emp.id as emp_id,
         emp_cert.id as cert_id 
      from
         employee emp 
      left join
         emp_certificate emp_cert 
            on emp.id = emp_cert.emp_id 
      where
         emp.is_deleted=0
   ) cert 
      on (
         cl.ref_table='Employee' 
         and cl.ref_oid= cert.emp_id
      ) 
      or (
         cl.ref_table='EmpCertificate' 
         and cl.ref_oid= cert.cert_id
      ) 
where
   cl.last_upd_date >='2013-11-07 15:03:00' 
   and cl.last_upd_date<='2013-11-08 16:00:00';
```

0. 先运行一下，53条记录 1.87秒，又没有用聚合语句，比较慢

   ```mysql
   53 rows in set (1.87 sec)
   ```

1. explain分析查询

   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220522172434102.png" alt="image-20220522172434102"  />

   简述一下执行计划，

   - 首先mysql根据idx_last_upd_date索引扫描cm_log表获得379条记录；

   - 然后查表扫描了63727条记录，分为两部分，derived表示构造表，也就是不存在的表，可以简单理解成是一个语句形成的结果集，后面的数字表示语句的ID。

     derived2表示的是ID = 2的查询构造了虚拟表，并且返回了63727条记录。

   - 再来看看ID = 2的语句究竟做了写什么返回了这么大量的数据，首先全表扫描employee表13317条记录，然后根据索引emp_certificate_empid关联emp_certificate表。

     rows = 1表示，每个关联都只锁定了一条记录，效率比较高。

   - 获得后，再和cm_log的379条记录根据规则关联。从执行过程上可以看出返回了太多的数据，返回的数据绝大部分cm_log都用不到，因为cm_log只锁定了379条记录。

   **如何优化**

   目前的连表是在查询出六万多条数据后与cm_log内联，考虑先联表在查询数据。

   因为内联的判断条件是ref_table的两种类型，如果cm_log的ref_table是EmpCertificate就关联emp_certificate表，如果ref_table是Employee就关联employee表，完全可以拆成两部分，并用union连接起来。

   这里用union，而不用union all是因为原语句有“distinct”来得到唯一的记录，而union恰好具备了这种功能。

   如果原语句中没有distinct不需要去重，我们就可以直接使用union all了，因为使用union需要去重的动作，会影响SQL性能。

   **优化语句**

   ```mysql
   select
      emp.id 
   from
      cm_log cl 
   inner join
      employee emp 
         on cl.ref_table = 'Employee' 
         and cl.ref_oid = emp.id  
   where
      cl.last_upd_date >='2013-11-07 15:03:00' 
      and cl.last_upd_date<='2013-11-08 16:00:00' 
      and emp.is_deleted = 0 
   union
   select
      emp.id 
   from
      cm_log cl 
   inner join
      emp_certificate ec 
         on cl.ref_table = 'EmpCertificate' 
         and cl.ref_oid = ec.id  
   inner join
      employee emp 
         on emp.id = ec.emp_id  
   where
      cl.last_upd_date >='2013-11-07 15:03:00' 
      and cl.last_upd_date<='2013-11-08 16:00:00' 
      and emp.is_deleted = 0
   ```

2. 不需要了解业务场景，只需要改造的语句和改造之前的语句保持结果一致

3. 现有索引可以满足，不需要建索引

4. 用改造后的语句实验一下，只需要10ms 降低了近200倍！

   ![image-20220522175113069](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220522175113069.png)

   

