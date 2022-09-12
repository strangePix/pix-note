# 操作系统-Linux

## 目录结构

| 目录  |                          功能                           |
| :---: | :-----------------------------------------------------: |
| /bin  |             binaries：存放二进制可执行文件              |
| /sbin | super user binaries：存放二进制可执行文件，仅root可访问 |
| /etc  |               etecetera：存放系统配置文件               |
| /usr  |        unix shared resources：存放共享的系统资源        |
| /home |                   存放用户文件根目录                    |
| /root |                      超级用户目录                       |
| /dev  |                  devices：存放设备文件                  |
| /lib  |      library：存放文件系统中需要的共享库和内核模块      |
| /mnt  |        mount：系统管理员安装临时文件系统的安装点        |
| /boot |               存放用于系统引导使用的文件                |
| /tmp  |                 temporary：存放临时文件                 |
| /var  |         variable：存放运行时需要改变数据的文件          |



## 命令

[参考](https://linuxtools-rst.readthedocs.io/zh_CN/latest/base/index.html)

### 常用命令

|      命令      | 功能                      | 补充                                                         |                             示例                             |
| :------------: | :------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------: |
|       cd       | 切换目录                  | /  根目录<br />.  当前目录<br />..  上一级目录<br />~  用户主目录<br />-  上一次操作的的目录 |                                                              |
|       su       | 切换用户                  | - 表示用户的环境变量一起切换<br />-c 表示仅用来执行一次命令，不会切换用户 |                     `su - root -c "pwd"`                     |
|      sudo      | 系统权限                  | 使用 `sudo`命令前缀执行系统管理命令。执行系统管理命令时无需知道超级用户的口令，使用普通用户自己的口令即可。 |                                                              |
|  pwd *[-LP]*   | 显示当前工作目录          | -L  显示链路路径，当前路径（默认）<br />-P  显示物理路径     |                                                              |
|   cat *[-n]*   | 显示文件内容              | -n  显示行号<br />-A  显示所有内容，包括隐藏字符<br />-b  显示行号，不显示空白行行号 |                                                              |
|      more      | 分页显示文件内容          | 分页显示，`space/f`下一页，`b`上一页，`enter`下一行，`v`编辑，`q`退出<br />-num  一次显示行数<br />-s  多行空白缩略为一行空白<br />+num  从第num开始显示 |                                                              |
|      head      | 查看文件前几行            | -n  指定行数（默认10行）                                     |                                                              |
|      tail      | 查看文件后几行            | -n  指定行数<br />-f  动态显示文件内容                       |                                                              |
|       ln       | 创建链接文件              | 为某一个文件在另一个位置建立同步的链接<br />**创建软链接**<br />ln -s [源文件] [目标文件]<br />**创建硬链接**<br /> ln [源文件] [目标文件] |             `ln -s /etc/service ./service.soft`              |
| ls *[-alrRd]*  | 显示文件列表              | -a  显示所有文件，隐藏文件以及特殊目录.与..<br />-l  显示详细信息，ll相当于ls -l<br />-R  递归显示当前目录下所有目录<br />-r  逆序排序<br />-t  按修改时间排序（降序） |                                                              |
|  mkdir *[-p]*  | 创建目录                  | -p  若父级目录不存在则先创建父目录<br />如果不使用该参数会报错 |                                                              |
|   rm *[-rf]*   | 删除文件                  | -i  删除前逐一确认<br />-f  强制删除，不经确认<br />-r  递归删除 |                                                              |
|   cp *[-rp]*   | 复制文件/目录             | -r/R  递归处理（复制目录用）<br />-p  保留文件属性（时间不变）<br />-d  复制保留链接（快捷方式）<br />-a  相当于-dpr <br />-f  覆盖文件不提示<br />-i  覆盖文件前询问<br />-l  不复制，只生成链接文件 |             `cp –R **/**ect/service /root/test`              |
|       mv       | 移动文件                  | 文件重命名<br />文件移动到指定目录<br />目录重命名<br />目录移动到指令目录 |                                                              |
|  tar *[-zvf]*  | 打包/解包                 | -c 创建新tar文件，保留源文件<br />-v 显示运行过程信息<br />-f 指定文件名<br />-z 调用gzip命令压缩、解压<br />-t 查看压缩文件内容<br />-x 解开tar文件<br />-r  追加文件<br />-u  更新文件 | 打包：`tar –cvf xxx.tar ./`<br />打包并压缩：`tar –czvf xxx.tar.gz ./ `<br />解压：<br />`tar –xvf xxx.tar`    <br />`tar -xzvf xxx.tar.gz -C /usr/aaa` |
|      gzip      | 压缩/解压                 | 压缩后缀为.gz，-r压缩目录，不保留原文件<br />-d  解压<br />-l  列出压缩文件信息<br />-N  压缩保存原文件名时间戳<br />-n  压缩不保存原文件名时间戳<br />-r  递归处理指定目录及子目录<br />-v  显示过程 |                                                              |
|      man       | 获取命令/配置文件帮助信息 |                                                              |                           `man ls`                           |
|      find      | 查找文件/目录             | **语法：find [搜索路径] [匹配条件]**<br />-name  按名称精确查找<br />-name  按名称查找忽略大小写<br />-type  按文件类型查找（f文件l软链接d目录）<br />-maxdepth  最大查找深度<br />-size  按文件大小（block为单位，1k=2block，+大于-小于）<br />字符匹配：*所有?单个字符<br />[参考](https://blog.csdn.net/yangxiaoyan12/article/details/86567648) | 在etc目录下找出大于100MB文件<br />`find /etc -size -204800`  |
| grep *[-cinv]* | 查找文件中字符串          | **语法：grep [-cinv] '搜寻字符串' filename**<br />-c  输出匹配行的次数<br />-i  忽略大小写<br />-n  显示匹配行，行号<br />-v  反选，显示不匹配的<br />-r  递归查找 | 查找指定目录/etc/acpi 及其子目录下所有文件中包含字符串"update"的文件，并打印出该字符串所在行的内容：<br />`grep -r update /etc/acpi` |
|    shutdown    |                           | -h  关机<br />-r  重启                                       | `shutdown -h  now`  立即关机<br />`shutdown  -h  20:30`  定时关机 |
|      ping      | 测试网络连通性            | -c  指定发送次数                                             |                    `ping -c 3 127.0.0.1`                     |
| ps *[-auxle]*  | 查看系统进程信息          | -a  显示所有用户进程<br />-u  显示用户名和启动时间<br />-x  显示没有控制终端的进程<br />-e  显示所有进程<br />-l   长格式显示 | `ps -le` 查看系统中所有进程(Linux标准命令格式)<br />`ps aux | grep sam`    查看用户sam执行的进程 |
|     pstree     | 查看进程树                | -p  显示进程pid<br />-u  显示进程所属用户                    |                                                              |
|      kill      | 关闭进程                  | 语法：kill [-选项] PID<br />-9  强制关闭<br />-1  重启进程   |                                                              |
|    useradd     | 添加用户                  | -g  指定用户组（默认同名组）<br />-r   创建系统用户[^7]（非root）<br />-d  指定用户home目录（默认home目录下同名目录）<br />-u  指定用户id<br />-s   指定用户登入后使用的shell<br />-M  不自动创建用户home目录 | `useradd -d /home/myd tt`<br />`useradd caojh -u 544`<br />`useradd nginx -g nginx -s /sbin/nologin -M` |
|     passwd     | 设置用户密码              |                                                              |                        `passwd user1`                        |
|    usermod     | 修改用户配置              | -d  修改用户home目录<br />-g  修改用户组                     |                `usermod –d /users/us1 user1`                 |
|    userdel     | 删除用户                  | -r  同时删除工作目录                                         |                                                              |
|    groupadd    | 添加用户组                |                                                              |                                                              |
|    netstat     | 查看端口和进程情况        | -t  显示tcp相关<br />-u  显示udp相关<br />-n  不显示别名，转化为数字<br />-l  列出监听（Listen）的服务<br />-p  显示相关程序名 |                       `netstat -tunl`                        |
|      kill      | 杀死程序                  | -9  彻底杀死进程<br />-KILL  强制杀死进程                    | `kill -9 26993` 杀死pid为26993的程序<br />`kill -9 $(ps -ef | grep hnlinux)` <br />`kill -u hnlinux`<br />杀死hnlinux用户所有进程 |



> - **cat指令的拓展用法：**配合 `> `将一个文件的内容写入另一个文件
>
>   cat -n file1 > file2：将file1的内容加上行号后输入到file2中（覆盖式）
>
>   cat -n file1 file2 > file3：把file1与file2中内容加上行号后输入file3中
>
>   cat /dev/null > /etc/test.txt：清空 /etc/test.txt 文档内容
>
> - **head/tail拓展用法：**获取一个大文件的部分文件
>
>   head -n 100 /etc/services >config.log
>
> - **软链接/硬链接：**硬链接相当于创建文件副本，软链接相当于快捷方式

[^7]: 系统用户：特定的低权限用户账号，这些用户一般不允许登录到系统，而仅用于维持系统或某个程序的正常运行。分配的uid和gid不大于1000，不会创建主目录。



### 管道

Linux命令重要概念，作用是将一个命令的输出作为另一个命令的输入。

如：

- `ls --help | more `分页查询帮助信息
- `ps –ef | grep java`查询名称中包含java的进程



### VIM编辑器

用于编辑/查看文件

- 切换命令行模式：`esc`
- 切换插入模式：`i`当前位置前插入 `o`当前位置下一行插入 `a`当前位置后插入
- 切换底行模式：`:`
- 编辑文件：`vim` file
- 搜索字符：`/`切换搜索模式 `n`下一个搜索结果 `N`上一个搜索结果
- 退出：`esc`然后输入`:q`



## 快捷常用命令

```powershell
# 查看端口占用情况
netstat -tunlp
# Linux 常用的查看当前系统版本的命令
cat /etc/os-release
# 解压文件
tar -zxvf jdk-8u251-linux-x64.tar.gz
```



## 快捷键



|     功能     |    键位    |
| :----------: | :--------: |
| 停止当前进程 | `ctrl`+`c` |
|     清屏     | `ctrl`+`l` |
|              |            |





## 权限管理



### 格式

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202204101903936.jpg)

- 第1位：文件类型

- 第2~4位：所有者权限（u）

- 第5~7位：所属组权限（g）

- 第8~10位：其他用户权限（o）

- 第2~10位：所有权限（a=ugo）

  

### 文件类型

- d  目录
- \-   普通文件
- l   链接文件



### 权限分类

| 字符 | 权限 | 文件操作     | 目录操作                      |
| :--: | ---- | ------------ | ----------------------------- |
|  r   | 读   | 查看文件内容 | 可查看目录的文件列表（ls）    |
|  w   | 写   | 修改文件内容 | 可在目录增删文件（mkdir，rm） |
|  x   | 执行 | 可以执行文件 | 可以进入目录（cd）            |

**八进制语法**

| #    | 权限       | rwx  |
| ---- | ---------- | ---- |
| 7    | 读 写 执行 | rwx  |
| 6    | 读 写      | rw-  |
| 5    | 读 执行    | r-x  |
| 4    | 只读       | r--  |
| 3    | 写 执行    | -wx  |
| 2    | 只写       | -w-  |
| 1    | 只执行     | --x  |
| 0    | 无         | ---  |



### 权限更改



#### 改变文件/目录权限

```shell
# chmod [ugoa...][[+-=][rwxX]...][,...] file...
# chmod [mode=421] [ 文件或目录]
chmod ugo+r file1.txt  # 将文件 file1.txt 设为所有人皆可读取 
chmod a+r file1.txt  # 同上
# 将文件 file1.txt 与 file2.txt 设为该文件拥有者，与其所属同一个群体者可写入，但其他以外的人则不可写入
chmod ug+w,o-w file1.txt file2.txt  
chmod -R a+r * # 将目前目录下的所有文件与子目录皆设为任何人可读取
chmod 777 file  # 相当于chmod a=rwx file
```

- 参数：-R  递归操作
- 数字表示权限：4=r，2=w，x=1
- +表示增加权限，-表示取消权限，=表示设定唯一权限
- 超级用户root无视权限，普通用户不能修改其他普通用户的权限



#### 更改文件/目录所有者

```shell
# chown user[:group] file...
chown lee file1   # 把file1文件的所有者改为用户lee
chown lee:test file1   # 把file1文件的所有者改为用户lee,所属组改为test
chown –R lee:test dir   # 修改dir及其子目录的所有者和所属组
```

- 参数：-R  递归操作
- 参数格式：
  - user  新所有者
  - group新群组名



#### 更改所属组

```shell
# chgrp [group] file...
chgrp root test.log # 把test.log的所属组修改为root
```



## 用户/用户组管理

### 相关指令

#### 添加账号

```powershell
useradd 
# -d 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录
# -s 指定shell登录目录 即登陆后默认位置
# -g 指定用户主组 -G 指定用户附加组
# 如创建了一个用户sam，主目录 /home/sam  如果目录不存在则创建
useradd -d  /home/sam -m sam
# 如创建一个用户gem 登录目录/bin/sh 主组group 附加组adm和root
useradd -s /bin/sh -g group –G adm,root gem
```

#### 删除账号

```powershell
userdel
# -r 连同用户主目录一起删除
# 如删除sam用户
userdel -r sam
```

#### 修改账号

```powershell
usermod
# 选项同useradd
# -l 修改用户名
# 如修改sam用户的主目录 登录目录 以及用户组
usermod -s /bin/ksh -d /home/z –g developer sam
```

#### 管理用户口令（密码）

```powershell
passwd
# -l 禁用账号,不能登录
# -d 解除密码
# -f 强迫下一次登录修改密码
# -u 口令解锁（密码登录）
# 如 修改sam用户口令
passwd sam
# 指定空密码
passwd -d sam
```

#### 添加用户组

```powershell
groupadd
# -g GID 指定新用户组的组标识号（GID）
# 如向系统中增加了一个新组group2，同时指定新组的组标识号是101。
groupadd -g 101 group2
```

#### 删除用户组

```powershell
groupdel
```

#### 修改用户组

```powershell
groupmod
# -g GID 为用户组指定新的组标识号。
# -o 与-g选项同时使用，用户组的新GID可以与系统已有用户组的GID相同。
# -n 新用户组 将用户组的名字改为新名字
# 如将组group2的标识号改为10000，组名修改为group3
groupmod –g 10000 -n group3 group2
```



### 相关文件

#### /etc/passwd

Linux系统中的每个用户都在/etc/passwd文件中有一个对应的记录行，它记录了这个用户的一些基本属性。

```powershell
#	对应含义:
#	用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell

root:x:0:0:Superuser:/:
daemon:x:1:1:System daemons:/etc:
bin:x:2:2:Owner of system commands:/bin:
sys:x:3:3:Owner of system files:/usr/sys:
adm:x:4:4:System accounting:/usr/adm:
uucp:x:5:5:UUCP administrator:/usr/lib/uucp:
auth:x:7:21:Authentication administrator:/tcb/files/auth:
cron:x:9:16:Cron daemon:/usr/spool/cron:
listen:x:37:4:Network daemon:/usr/net/nls:
lp:x:71:18:Printer administrator:/usr/spool/lp:
sam:x:200:50:Sam san:/home/sam:/bin/sh
```

#### /etc/group

存储用户组信息

```powershell
# 对应含义:
# 组名:口令:组标识号:组内用户列表

root::0:root
bin::2:root,bin
sys::3:root,uucp
adm::4:root,adm
daemon::5:root,daemon
lp::7:root,lp
users::20:root,sam
```



## 命令行解释器

大部分的Linux发行版的默认命令解释器是Bash，但除此之外，还有别的命令解释器。



### zsh & oh my zsh

https://zhuanlan.zhihu.com/p/58073103

https://www.cnblogs.com/Likfees/p/15364265.html

https://www.kwchang0831.dev/dev-env/macos/oh-my-zsh



### Fish-Shell

https://www.kwchang0831.dev/dev-env/ubuntu/fish



## 上传下载



## 补充



### 修改主机名hostname

```shell
#系统 centos7
hostnamectl   # 查看主机信息
hostnamectl set-name [主机名] #临时修改主机名  重新登录显示新hostname
hostnamectl set-hostname --static  [主机名]  #修改静态主机名 重启不影响
```



### linux 命令终端提示符显示-bash-4.2

**起因**：

登录linux用户终端提示符显示的是-bash-4.2# 而不是root@主机名 + 路径的显示方式

  <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202204101903701.png" alt="image-20210205231955093"  />

  **解决方法**：

查询该用户的用户目录 如果没有则创建

 ```shell
cat /etc/passwd
mkdir /home/mysql
#复制/etc/skel这个目录的文件到/home/mysql中
[root@localhost home]$ cp /etc/skel/.bash_logout /home/mysql
[root@localhost home]$ cp /etc/skel/.bash_profile /home/mysql
[root@localhost home]$ cp /etc/skel/.bashrc /home/mysql
 ```

为了防止出现这样的问题，即用户没有对应的用户目录，可以在创建时提供参数

```shell
useradd -d /home/test -m test;
# -m自动创建用户目录，并把框架目录(默认为/etc/skel)下的文件复制到用户主目录下。
# -d设置用户目录
```

当然，出现这个问题也可能是因为创建时设置了-M参数（不自动创建用户目录）



### 修改ssh端口

- 修改/etc/ssh/sshd_config文件

  ```sh
  vim /etc/ssh/sshd_config
  ```

- 找到Port字段，解开注释修改为自定义端口

  ![image-20220521192238179](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220521192238179.png)

- 修改后重启SSH服务

  ```shell
  service sshd restart 
  # 或者
  systemctl restart sshd
  # 或者
  /etc/init.d/sshd restart
  ```

- 别忘了防火墙/安全组放开对应端口



