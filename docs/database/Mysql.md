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
  #安装服务
  mysqld --install
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

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201128174401981.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzYwNTI2Ng==,size_16,color_FFFFFF,t_70)

- 找到mysql服务，自行选择开启/开机自启

  <img src="https://img-blog.csdnimg.cn/20201124185352684.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzYwNTI2Ng==,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述" style="zoom: 67%;" />

  <img src="https://img-blog.csdnimg.cn/2020112321065774.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzYwNTI2Ng==,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述" style="zoom:80%;" />



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



#### Docker安装mysql

- 拉取镜像

  ```powershell
  docker pull mysql:latest
  ```

- 运行mysql容器

  ```powershell
  docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
  ```

  > - **-p 3306:3306** ：映射容器服务的 3306 端口到宿主机的 3306 端口，外部主机可以直接通过 **宿主机ip:3306** 访问到 MySQL 的服务。
  > - **MYSQL_ROOT_PASSWORD=123456**：设置 MySQL 服务 root 用户的密码。



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

```powershell
#登录root账户
mysql -u root -p
```

```shell
-- 查看版本等信息
mysql> status;
-- 退出
mysql> exit;
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



### 什么是索引

索引是一种**用于快速查询和检索数据的数据结构**。

常见的索引结构有: B 树， B+树和 Hash。

### 索引的作用

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



### （前置知识）读取数据：磁盘IO与预读

磁盘读取数据靠的是机械运动，每次读取数据花费的时间可以分为：

- **寻道时间**

  磁壁移动到指定磁道需要的时间，主流磁盘一般在5ms以下

- **旋转延迟**

  就是磁盘转速，

  如一个磁盘7200转，表示每分钟能转7200次，也就是1秒能转120次，旋转延迟就是1/120/2=4.17ms

  > **旋转延迟**
  >
  > 从磁盘寻道结束开始，直到磁头旋转到I/O请求所请求的起始数据块位置止，这之间的时间间隔。
  >
  > 将磁盘旋转周期的一半作为旋转延迟的近似值。

- **传输时间**

  从磁盘读出，或者将数据写入磁盘的时间，一般在零点几毫秒，相对于前两个时间可以忽略不计。

由上可知，访问一次磁盘的时间，即一次磁盘IO时间约为5+4.17 = 9ms左右。

但一台500-MIPS[^注1]机器每秒可以执行5亿条指令，约合一次IO的时间可以执行40万条指令，数据库动辄百万千万级的数据，每次9ms还是太久。

考虑到磁盘IO为高昂操作，计算机操作系统进行了优化，

**不光把当前磁盘地址的数据，还把相邻的数据也读取到内存缓冲区中**，

根据局部预读性[^注2]原理，当计算机访问一个地址的数据时，其相邻的数据也会很快被访问到。

于是每一次IO读取到的数据称之为**页（page）**。

具体每一页的大小与操作系统有关，一般为4k或者8k。

读取一页内的数据时，只会发生一次IO。

[^注1]: MIPS：Million Instructions Per Second的缩写，每秒处理的百万级的机器语言指令数，是衡量CPU速度的一个指标。
[^注2]: 局部预读性原理：指无论程序指令还是数据都趋于聚集在一个较小的连续区域中。



### 数据库底层数据结构演进

#### Hash表

哈希表是键值对的集合，通过键(key)即可快速取出对应的值(value)，

因此哈希表可以快速检索数据（接近 O(1)）。



**为何能够通过 key 快速取出 value**

原因在于 **哈希算法**（也叫散列算法）.

通过哈希算法，我们可以快速找到 key 对应的 index，找到了 index 也就找到了对应的 value。

```java
hash = hashfunc(key)
index = hash % array_size
```

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20210513092328171.png)

**哈希冲突**

但是哈希算法有个 **Hash 冲突** 问题，也就是说多个不同的 key 最后得到的 index 相同。

通常的解决方法是**链地址法**：将哈希冲突数据存放在链表中。

如 JDK1.8 之前 `HashMap` 就是通过链地址法来解决哈希冲突的。

不过，JDK1.8 以后`HashMap`为了减少链表过长的时候搜索时间过长引入了红黑树。



**为什么MySQL 没有使用Hash作为索引的数据结构**

- Hash冲突

- Hash 索引不支持顺序和范围查询

  

#### 二叉树

**特点**

- 一个节点只能有两个子节点，也就是一个节点的度不能超过2
- 左子节点小于本节点，右子节点大于等于本节点，比我大的向右，比我小的向左

![image-20200404093846645](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404093846645.png)

**缺点**

当存储数据递增时，时间复杂度会从O（logN）退化到O(N) 

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404094336765.png" alt="image-20200404094336765" style="zoom:50%;" />

#### 平衡二叉树（AVL）

含义见其他

![image-20200404094719626](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404094719626.png)

**缺点**

- 维护平衡过程的成本代价很高，因为每次删除一个节点或者增加一个节点的话，需要一次或多次的左旋和右旋去维护平衡状态

- 查询的效率不稳定，还要看运气的成分在里面

- 如果节点很多的话，那么这个AVL树的高度还是会很高的，查询效率会很低。

  

> **从算法的数学逻辑来讲，二叉树的查找速度和比较次数都是最小的，那为什么我们选择BTree?**
>
> 因为AVL还有一个问题，那就是 磁盘IO的问题
>
> - 磁盘IO的次数，就是由树高来决定的，也即磁盘的IO次数最坏的情况下就等于树的高度。
>
> 因为节点存储的数据太少，没有很好的利用操作系统和磁盘数据交换的特性，也没有利用好磁盘IO的预读能力。
>
> 因为操作系统和磁盘之间一次数据交换是以页为单位的，一页 = 4K，即每次IO操作系统会将4K数据加载镜像内存。
>
> 但是在二叉树每个节点的结构只保存一个关键字 和 数据区，两个子节点的引用，并不能填满4K的内容，辛辛苦苦的做了一次IO操作，却只加载了一个关键字，在树的高度很高，恰好要搜索的关键字位于叶子节点或支节点的时候，取一个关键字要做很多次的IO。因此平衡二叉树不太适合MySQL的查询结构。
>
> **解决方案**
>
> 树的高度问题，导致磁盘IO过多
>
> 那么就需要将树进行压缩，也就是将原来的瘦高 -> 矮胖，通过降低树的高度达到减少IO的次数



#### B树

又被称为 2-3树，也就是B树上的节点，可能是2，也可能是3

![image-20200404100139814](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404100139814.png)

##### 底层原理

数据库索引是存储在磁盘上的，如果数据很大，必然导致索引的大小也会很大，超过几个G（好比新华字典字数多必然导致目录厚）

当我们利用索引查询时，是不可能将全部几个G的索引都加载进内存的，我们能做的只能是：

逐一加载每一个磁盘页，因为磁盘页对应着索引树的节点。

```mysql
-- InnoDB的 page_size
SHOW GLOBAL STATUS LIKE 'Innodb_page_size';
```

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404151334993.png" alt="image-20200404151334993" style="zoom:67%;" />

系统从磁盘读取数据到内存时是以**磁盘块（block）**为单位的，位于同一磁盘块中的数据会被一次性读取出来，而不是需要什么取什么

InnoDB存储引擎中有**页(Page)**的概念，页是其磁盘管理的最小单位。

系统一个磁盘块的存储空间往往没有这么大，因此InnoDB每次申请磁盘空间时都会是**若干地址连续磁盘块**来达到页的大小16KB。InnoDB在把磁盘数据读入到磁盘时会以页为基本单位，在查询数据时如果一个页中每条数据都有助于定位数据记录的位置，这将会减少磁盘I/O次数，提高效率。

一句话说：就是多个块填充到一页大小



##### 检索原理

B树比平衡二叉树减少了一次IO操作

![image-20200404152149658](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404152149658.png)

每个节点占用一个盘块的磁盘空间，一个节点上有两个升序排序的关键字和三个指向子树根节点的指针，指针存储的是子节点所在磁盘块的地址。

模拟查找关键字29的过程：

- 根据根节点找到磁盘块1，读入内存【磁盘IO操作1次】
- 比较关键字29在区间(17, 35)，找到磁盘块1的指针P2。
- 根据P2指针找到磁盘块3，读入内存。【磁盘IO操作第2次】
- 比较关键字29在区间(26, 30)，找到磁盘块3的指针P2。
- 根据P2指针找到磁盘块8，读入内存。【磁盘IO操作3次】
- 在磁盘块8中的关键字列表，找到关键字29

分析上述过程，发现需要3次IO操作，和3次内存查找操作，由于内存中的关键字是一个有序表结构，可以利用二分法查找提高效率。而3次磁盘IO操作是影响整个BTree查找效率的决定性因素。BTree相对于AVLTree缩减了节点个数，使每次磁盘IO取到内存的数据都发挥了作用，从而提高了查找效率。



#### B+树

B+树把所有数据放在叶子节点，形成了链表，查找数据更方便

![image-20200404155456211](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404155456211.png)

![b+树](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/7af22798.jpg)

浅蓝色的块称之为一个磁盘块，每个磁盘块包含几个数据项（深蓝色所示）和指针（黄色所示），

如磁盘块1包含数据项17和35，包含指针P1、P2、P3，P1表示小于17的磁盘块，P2表示在17和35之间的磁盘块，P3表示大于35的磁盘块。真实的数据存在于叶子节点即3、5、9、10、13、15、28、29、36、60、75、79、90、99。

非叶子节点不存储真实的数据，只存储指引搜索方向的数据项，如17、35并不真实存在于数据表中。

图中可以看出所有的data信息都移动叶子节点中，而且子节点和子节点之间会有指针指向，这个也是B+树的核心点，这样可以大大提升范围查找效率，也方便遍历整个树。

- 非叶子节点不在存储数据，数据只存储在同一层的叶子节点上
- 叶子之间，增加链表，获取所有节点，不再需要中序遍历
- 这也说明了，B+树的检索性能比B树强



##### B+树的查找过程

如果要查找数据项29，

首先会把磁盘块1由磁盘加载到内存，此时发生一次IO，

在内存中用二分查找确定29在17和35之间，锁定磁盘块1的P2指针，内存时间因为非常短（相比磁盘的IO）可以忽略不计，

通过磁盘块1的P2指针的磁盘地址把磁盘块3由磁盘加载到内存，发生第二次IO，

29在26和30之间，锁定磁盘块3的P2指针，锁定磁盘块3的P2指针，

通过指针加载磁盘块8到内存，发生第三次IO，

同时内存中做二分查找找到29，结束查询，总计三次IO。

真实的情况是，3层的b+树可以表示上百万的数据，如果上百万的数据查找只需要三次IO，性能提高将是巨大的，如果没有索引，每个数据项都要发生一次IO，那么总共需要百万次的IO，显然成本非常非常高。



##### B+树的性质

这里的数据项即索引

1. IO次数取决于b+数的高度h

   假设当前数据表的数据为N，每个磁盘块的数据项的数量是m，则有h=㏒(m+1)N，当数据量N一定的情况下，m越大，h越小；

   m = 磁盘块的大小 / 数据项的大小，磁盘块的大小也就是一个数据页的大小，是固定的，**如果数据项占的空间越小，数据项的数量越多，树的高度越低**。

   这就是为什么每个数据项，即**索引字段要尽量的小**，比如int占4字节，要比bigint8字节少一半。

   这也是为什么b+树要求**把真实的数据放到叶子节点而不是内层节点**，一旦放到内层节点，磁盘块的数据项会大幅度下降，导致树增高。当数据项等于1时将会退化成线性表。

2. 当b+树的数据项是复合的数据结构，比如(name,age,sex)的时候，b+数是按照从左到右的顺序来建立搜索树的。

   如当(张三,20,F)这样的数据来检索的时候，b+树会优先比较name来确定下一步的所搜方向，

   如果name相同再依次比较age和sex，最后得到检索的数据。

   当(20,F)这样的没有name的数据来的时候，b+树就不知道下一步该查哪个节点，因为建立搜索树的时候name就是第一个比较因子，必须要先根据name来搜索才能知道下一步去哪里查询。

   如当(张三,F)这样的数据来检索时，b+树可以用name来指定搜索方向，但下一个字段age的缺失，所以只能把名字等于张三的数据都找到，然后再匹配性别是F的数据了， 这个是非常重要的性质，即**索引的最左匹配特性**。



##### 检索原理

由于B+树的非叶子只存储键值信息，假设每个磁盘块能存储4个键值及指针信息，那就变成如下结构

![image-20200404161422032](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404161422032.png)

B树结构图中可以看出每个节点不仅包含数据的key值，还有data值，而每一页的存储空间是有限的，如果data数据较大时将会导致每个节点（即一个页）能存储的key的数量很小，当存储数量很大时同样会导致B树的深度较大，增大查询时的磁盘IO次数进而影响查询效率。



#### B树与B+树的不同之处

- B 树的所有节点既存放键(key) 也存放 数据(data)，

  而 B+树只有叶子节点存放 key 和 data，其他内节点只存放 key。

- B 树的叶子节点都是独立的；

  B+树的叶子节点有一条引用链指向与它相邻的叶子节点，即双向链指针：

  - 可以基于叶子节点之间的范围查找
  - 或者基于根节点的查找

- B 树的检索的过程相当于对范围内的每个节点的关键字做二分查找，可能还没有到达叶子节点，检索就结束了；

  而 B+树的检索效率相对稳定，任何查找都是从根节点到叶子节点的过程，叶子节点的顺序检索很明显。





#### Mysql为什么是B+树

B+树中，所有数据记录节点都是按照键值大小顺序存放在同一层叶子节点上，而非叶子节点上只存储key值信息，这样可以大大加大每个节点存储的key值数量，降低B+树的高度。

- InnoDB存储引擎的最小存储单元是页，页可以用于存放数据，也可以用于存放键值+指针，在B+树中叶子节点存放数据，而非叶子节点存放键值+指针
- 索引组织表通过非叶子节点的二分查找法以及指针确定数据在哪个页中，首先找到根页进而去数据页查找到需要的数据

B+树算法：通过集成B树的特征，B+树相比B树，新增叶子节点与非叶子节点关系，叶子节点包含了键值和数据，非叶子节点只是包含键值和子节点引用，不包含数据。

通过非叶子节点查询叶子节点获取相应的数据，所有相邻的叶子节点包含非叶子节点使用链表进行结合，叶子节点是顺序并且相邻节点有顺序引用关系。

#### 结论

从B树到B+树，B+树在B树的基础上的一种优化使其更适合实现外存储索引结构，InnoDB存储引擎就是用B+树实现的索引结构

一般我们存储的数据在百万级别的话，B+树的高度都是三层左右



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





### 检索原理

在数据之外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式引用（指向）数据，这样就可以在这些数据上实现高级查找算法，这种数据结构，就是索引。下图就是一种可能的索引方式示例：

![image-20200404090022629](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404090022629.png)

为了加快Col2的查找，可以维护一个右边所示的二叉树，每个节点分别包含索引键值和一个指向对应数据记录的物理地址的指针，这样就可以运用二叉树在一定的复杂度内获取相应数据，从而快速的检索出符合条件的记录。



### MyISAM 引擎和 InnoDB 引擎对B+树的实现

**MyISAM 引擎**

B+Tree 叶节点的 data 域存放的是数据记录的地址。

在索引检索的时候，首先按照 B+Tree 搜索算法搜索索引，

如果指定的 Key 存在，则取出其 data 域的值，然后以 data 域的值为地址读取相应的数据记录。

这被称为“非聚簇索引”。

**InnoDB 引擎**

相比 MyISAM的索引文件和数据文件是分离的，其数据文件本身就是索引文件。

表数据文件本身就是按 B+Tree 组织的一个索引结构，树的叶节点 data 域保存了完整的数据记录。

这个索引的 key 是数据表的主键，因此 InnoDB 表数据文件本身就是主索引。

这被称为**聚簇索引**（或聚集索引），

而其余的索引都作为辅助索引，辅助索引的 data 域存储相应记录主键的值而不是地址。



### 聚簇索引

**索引结构和数据一起存放的索引**，索引结构的叶子节点保存了行数据

在 MySQL 中，InnoDB 引擎的表的 `.ibd`文件就包含了该表的索引和数据，对于 InnoDB 引擎表来说，该表的索引(B+树)的每个非叶子节点存储索引，叶子节点存储索引和索引对应的数据。

- **聚簇索引具有唯一性**。

  由于聚簇索引是将数据跟索引结构放到一块，因此一个表仅有一个聚簇索引。

- **表中行的物理顺序和索引中行的物理顺序是相同的**，**在创建任何非聚簇索引之前创建聚簇索引**。

  这是因为聚簇索引改变了表中行的物理顺序，数据行 按照一定的顺序排列，并且自动维护这个顺序。

- **聚簇索引默认是主键**

  如果表中没有定义主键，InnoDB 会选择一个**唯一且非空的索引**代替。

  如果没有这样的索引，InnoDB 会**隐式定义一个主键（类似oracle中的RowId）**来作为聚簇索引。

  如果已经设置了主键为聚簇索引又希望再单独设置聚簇索引，必须先删除主键，然后添加我们想要的聚簇索引，最后恢复设置主键即可。



#### 使用聚簇索引的优势

**每次使用辅助索引检索都要经过两次B+树查找，**看上去聚簇索引的效率明显要低于非聚簇索引，这不是多此一举吗？聚簇索引的优势在哪？

1. 由于行数据和聚簇索引的叶子节点存储在一起，同一页中会有多条行数据，访问同一数据页不同行记录时，已经把页加载到了Buffer中（缓存器），再次访问时，会在内存中完成访问，不必访问磁盘。

   这样主键和行数据是一起被载入内存的，找到叶子节点就可以立刻将行数据返回了，如果按照主键Id来组织数据，获得数据更快。

2. 辅助索引的叶子节点，存储主键值，而不是数据的存放地址。

   好处是当行数据发生变化时，索引树的节点不需要分裂变化；或者是我们需要查找的数据，在上一次IO读写的缓存中没有，需要发生一次新的IO操作时，可以避免对辅助索引的维护工作，只需要维护聚簇索引树就好了。

   另一个好处是，因为辅助索引存放的是主键值，减少了辅助索引占用的存储空间大小。

   > 注：
   >
   > 我们知道一次io读写，可以获取到16K大小的资源，我们称读取到的数据区域为Page。
   >
   > 而我们的B树，B+树的索引结构，叶子节点上存放好多个关键字（索引值）和对应的数据，都会在一次IO操作中被读取到缓存中，所以在访问同一个页中的不同记录时，会在内存里操作，而不用再次进行IO操作了。
   >
   > 除非发生了页的分裂，即要查询的行数据不在上次IO操作的换村里，才会触发新的IO操作。

3. 因为MyISAM的主索引并非聚簇索引，那么他的数据的物理地址必然是凌乱的，拿到这些物理地址，按照合适的算法进行I/O读取，于是开始不停的寻道不停的旋转。聚簇索引则只需一次I/O。（强烈的对比）

4. 不过，如果涉及到大数据量的排序、全表扫描、count之类的操作的话，还是MyISAM占优势些，因为索引所占空间小，这些操作是需要在内存中完成的。



#### 聚集索引的优点

查询速度非常的快，因为整个 B+树本身就是一颗多叉平衡树，叶子节点也都是有序的，定位到索引的节点，就相当于定位到了数据。

#### 缺点

1. **依赖于有序的数据** ：因为 B+树是多路平衡树，如果索引的数据不是有序的，那么就需要在插入时排序，如果数据是整型还好，否则类似于字符串或 UUID 这种又长又难比较的数据，插入或查找的速度肯定比较慢。
2. **更新代价大** ： 如果索引列的数据被修改时，那么对应的索引也将会被修改，而且聚集索引的叶子节点还存放着数据，修改代价肯定是较大的，所以对于主键索引来说，主键一般都是不可被修改的。



#### 聚簇索引需要注意的地方

当使用主键为聚簇索引时，主键最好不要使用uuid，因为uuid的值太过离散，不适合排序且可能出现新增加记录的uuid，会插入在索引树中间的位置，导致索引树调整复杂度变大，消耗更多的时间和资源。

建议使用int类型的自增，方便排序并且默认会在索引树的末尾增加主键值，对索引树的结构影响最小。而且，主键值占用的存储空间越大，辅助索引中保存的主键值也会跟着变大，占用存储空间，也会影响到IO操作读取到的数据量。

> **为什么主键通常建议使用自增id**?
>
> **聚簇索引的数据的物理存放顺序与索引顺序是一致的**，即：**只要索引是相邻的，那么对应的数据一定也是相邻地存放在磁盘上的**。如果主键不是自增id，那么可以想 象，它会干些什么，不断地调整数据的物理地址、分页，当然也有其他一些措施来减少这些操作，但却无法彻底避免。
>
> 但，如果是自增的，那就简单了，它只需要一 页一页地写，索引结构相对紧凑，磁盘碎片少，效率也高。



### 非聚簇索引

**将数据与索引分开，索引结构的叶子节点指向了数据对应的位置**

MyISAM使用的是非聚簇索引，**非聚簇索引的两棵B+树看上去没什么不同**，节点的结构完全一致只是存储的内容不同而已，主键索引B+树的节点存储了主键，辅助键索引B+树存储了辅助键。表数据存储在独立的地方，这两颗B+树的叶子节点都使用一个地址指向真正的表数据，对于表数据来说，这两个键没有任何差别。由于**索引树是独立的，通过辅助键检索无需访问主键的索引树**。

![image-20200723110258929](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200723110258929.png)

#### 辅助索引/回表操作

在InnoDB中，在聚簇索引之上创建的索引被称为辅助索引，非聚簇索引都是辅助索引，像复合索引，前缀索引，唯一索引。

辅助索引叶子节点存储不再是行的物理位置，而是主键值，辅助索引访问数据总是需要二次查找，这个就被称为 **回表操作**。

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200723105915972.png" alt="image-20200723105915972" style="zoom:50%;" />



#### 优点

**更新代价比聚集索引要小** 

非聚集索引的更新代价就没有聚集索引那么大了，非聚集索引的叶子节点是不存放数据的。

#### 缺点

1. 跟聚集索引一样，非聚集索引也**依赖于有序的数据**

2. **可能会二次查询(回表)** :

   这应该是非聚集索引最大的缺点了，当查到索引对应的指针或主键后，可能还需要根据指针或主键再到数据文件或表中查询。



#### 非聚集索引一定会回表查询吗？

不一定

1. 查询条件使用索引，查询结果就是索引列

   如下，索引的 key 本身就是 name，查到对应的 name 直接返回就可以，无需回表

   ```mysql
    SELECT name FROM table WHERE name='guang19';
   ```

2. 查询结果就是主键。

   ```mysql
   SELECT id FROM table WHERE id=1;
   ```

   主键索引本身的 key 就是主键，查到返回就行了。

   这种情况就称之为覆盖索引。



### 覆盖索引

**一个索引包含（或者说覆盖）所有需要查询的字段的值**，称之为“覆盖索引”。

如果不是主键索引，叶子节点存储的是主键+列值。最终还是要“回表”，也就是要通过主键再查找一次。

覆盖索引就是把要查询出的列和索引是对应的，不做回表操作。

**覆盖索引即需要查询的字段正好是索引的字段，那么直接根据该索引，就可以查到数据了， 而无需回表查询。**



### 联合索引

使用表中的多个字段创建索引，就是 **联合索引**，也叫 **组合索引** 或 **复合索引**。



### 建索引的几大原则



#### 最左前缀匹配原则

在使用联合索引时，**MySQL** 会根据联合索引中的字段顺序，

**从左到右依次到查询条件中去匹配**，

如果查询条件中存在与联合索引中最左侧字段相匹配的字段，则就会使用该字段过滤一批数据，

直至联合索引中全部字段匹配完成，

或者在执行过程中遇到范围查询，如 **`>`**、**`<`**、**`between`** 和 **`以%开头的like查询`** 等条件，才会停止匹配。

所以，我们在**使用联合索引时，可以将区分度高的字段放在最左边**，这也可以过滤更多数据。



#### =和in可以乱序

如a = 1 and b = 2 and c = 3 建立(a,b,c)索引可以任意顺序，

mysql的查询优化器会帮你优化成索引可以识别的形式。



#### 尽量选择区分度高的列作为索引

区分度的公式是count(distinct col)/count(*)，表示字段不重复的比例，比例越大我们扫描的记录数越少。

唯一键的区分度是1，而一些状态、性别字段可能在大数据面前区分度就是0。

那可能有人会问，这个比例有什么经验值吗？使用场景不同，这个值也很难确定，一般需要join的字段都要求是0.1以上，即平均1条扫描10条记录。



#### 索引列不能参与计算，保持列“干净”

如

```mysql
from_unixtime(create_time) = '2014-05-29'
```

就不能使用到索引，

原因很简单，b+树中存的都是数据表中的字段值，但进行检索时，需要把所有元素都应用函数才能比较，显然成本太大。所以语句应该写成create_time = unix_timestamp(’2014-05-29’)。



#### 尽量的扩展索引，不要新建索引

如表中已经有a的索引，现在要加(a,b)的索引，那么只需要修改原来的索引即可。





### 创建索引的注意事项

1. 合适的字段

   - **不为 NULL 的字段**

     对于数据为 NULL 的字段，数据库较难优化。

     如果字段频繁被查询，但又避免不了为 NULL，建议使用 0,1,true,false 这样语义较为清晰的短值或短字符作为替代。

   - **被频繁查询的字段** 

   - **作为条件查询的字段** 作为 WHERE 条件查询的字段，应该被考虑建立索引

   - **频繁需要排序的字段** 

     索引已经排序，这样查询可以利用索引的排序，加快排序查询时间

   - **频繁用于连接的字段** 

     频繁被连接查询的字段，可以考虑建立索引，提高多表连接查询的效率。

2. **频繁更新的字段应该慎重建立索引**

   维护索引的成本是不小的，如果一个字段不被经常查询，反而被经常修改，那么就更不应该在这种字段上建立索引了。

3. **尽可能的考虑建立联合索引而不是单列索引**

   索引是需要占用磁盘空间的，可以简单理解为每个索引都对应着一颗 B+树。

   如果一个表的字段过多，索引过多，那么当这个表的数据达到一个体量后，索引占用的空间也是很多的，且修改索引时，耗费的时间也是较多的。

   如果是联合索引，多个字段在一个索引上，那么将会节约很大磁盘空间，且修改数据的操作效率也会提升。

4. **避免冗余索引**

   冗余索引指的是索引的功能相同，能够命中索引(a, b)就肯定能命中索引(a) ，那么索引(a)就是冗余索引。

   大多数情况下，都应该尽量扩展已有的索引而不是创建新索引。

5. 考虑在**字符串类型的字段**上使用**前缀索引**代替普通索引

   前缀索引仅限于字符串类型，较普通索引会占用更小的空间，所以可以考虑使用前缀索引带替普通索引。



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



## 锁机制与 InnoDB 锁算法

#### MyISAM 和 InnoDB 存储引擎使用的锁

- MyISAM 采用表级锁(table-level locking)。
- InnoDB 支持行级锁(row-level locking)和表级锁，默认为行级锁

#### 表级锁与行级锁对比

- **表级锁：** 

  MySQL 中锁定 **粒度最大** 的一种锁，对当前操作的整张表加锁。

  实现简单，资源消耗也比较少，加锁快，不会出现死锁。

  其锁定粒度最大，触发锁冲突的概率最高，并发度最低。

  MyISAM 和 InnoDB 引擎都支持表级锁。

- **行级锁：** 

  MySQL 中锁定 **粒度最小** 的一种锁，只针对当前操作的行进行加锁，行级锁能大大减少数据库操作的冲突。

  其加锁粒度最小，并发度高，但加锁的开销也最大，加锁慢，会出现死锁。

  

#### InnoDB 存储引擎的锁的算法

- **Record lock**：记录锁，单个行记录上的锁
- **Gap lock**：间隙锁，锁定一个范围，不包括记录本身
- **Next-key lock**：record+gap 临键锁，锁定一个范围，包含记录本身





## Mysql事务



#### Mysql数据事务的实现原理

以 MySQL 的 InnoDB 引擎为例，

MySQL InnoDB 引擎使用 **redo log(重做日志)** 保证事务的**持久性**，

使用 **undo log(回滚日志)** 来保证事务的**原子性**，

通过 **锁机制**、**MVCC** 等手段来保证事务的隔离性（ 默认支持的隔离级别是 **`REPEATABLE-READ`** ），

保证了事务的持久性、原子性、隔离性之后，一致性才能得到保障。





#### MySQL默认隔离级别

InnoDB 存储引擎的默认支持的隔离级别是 **REPEATABLE-READ(可重读)**

> **MySQL InnoDB 的 REPEATABLE-READ（可重读）并不保证避免幻读，需要使用加锁读来保证。而这个加锁读使用到的机制就是 Next-Key Locks。**

因为隔离级别越低，事务请求的锁越少，所以大部分数据库系统的隔离级别都是 **READ-COMMITTED(读已提交)** 。

但 InnoDB 存储引擎默认使用 **REPEATABLE-READ(可重复读)** 并不会有任何性能损失。

InnoDB 存储引擎在 **分布式事务** 的情况下一般会用到 **SERIALIZABLE(可串行化)** 隔离级别。



## 使用细节点



### 存储时间类型的抉择

#### 不要用字符串存储日期

1. 字符串占用的空间更大；
2. 字符串存储的日期效率比较低（逐个字符进行比对），无法用日期相关的 API 进行计算和比较。

#### Datetime 和 Timestamp 之间抉择

**通常都会首选 Timestamp。**

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

时间戳的定义是

从一个基准时间开始算起，这个基准时间是「1970-1-1 00:00:00 +0:00」，从这个时间开始，用整数表示，以秒计时，随着时间的流逝这个时间整数不断增加。

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

   

