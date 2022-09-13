# Docker

[参考](https://yeasy.gitbook.io/docker_practice/)

## 什么是Docker

**Docker** 使用 `Google` 公司推出的 [Go 语言](https://golang.google.cn) 进行开发实现，基于 `Linux` 内核的 [cgroup](https://zh.wikipedia.org/wiki/Cgroups)，[namespace](https://en.wikipedia.org/wiki/Linux_namespaces)，以及 [OverlayFS](https://docs.docker.com/storage/storagedriver/overlayfs-driver/) 类的 [Union FS](https://en.wikipedia.org/wiki/Union_mount) 等技术，对进程进行封装隔离，属于 [操作系统层面的虚拟化技术](https://en.wikipedia.org/wiki/Operating-system-level_virtualization)。由于隔离的进程独立于宿主和其它的隔离的进程，因此也称其为容器。

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202204101903479.png" alt="img" style="zoom:50%;" />

**Docker** 在容器的基础上，进行了进一步的封装，从文件系统、网络互联到进程隔离等等，极大的简化了容器的创建和维护。使得 `Docker` 技术比虚拟机技术更为轻便、快捷。



**Docker的优势**

- 更高效的利用系统资源
- 更快速的启动时间
- 一致的运行环境
- 持续交付和部署
- 更轻松的迁移
- 更轻松的维护和扩展



## 基本概念（镜像/容器/仓库）

### 镜像

操作系统分为 **内核** 和 **用户空间**。对于 `Linux` 而言，内核启动后，会挂载 `root` 文件系统为其提供用户空间支持。而 **Docker 镜像**（`Image`），就相当于是一个 `root` 文件系统。比如官方镜像 `ubuntu:18.04` 就包含了完整的一套 Ubuntu 18.04 最小系统的 `root` 文件系统。

**Docker 镜像** 是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像 **不包含** 任何动态数据，其内容在构建之后也不会被改变。

### 容器

镜像（`Image`）和容器（`Container`）的关系，就像是面向对象程序设计中的 `类` 和 `实例` 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 [命名空间](https://en.wikipedia.org/wiki/Linux_namespaces)。因此容器可以拥有自己的 `root` 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全。也因为这种隔离的特性，很多人初学 Docker 时常常会混淆容器和虚拟机。

按照 Docker 最佳实践的要求，容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用 [数据卷（Volume）]()、或者 [绑定宿主目录]()，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡。因此，使用数据卷后，容器删除或者重新运行之后，数据却不会丢失。

### 仓库

镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，[Docker Registry]() 就是这样的服务。

一个 **Docker Registry** 中可以包含多个 **仓库**（`Repository`）；每个仓库可以包含多个 **标签**（`Tag`）；每个标签对应一个镜像。

通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 `<仓库名>:<标签>` 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 `latest` 作为默认标签。

以 [Ubuntu 镜像](https://hub.docker.com/_/ubuntu) 为例，`ubuntu` 是仓库的名字，其内包含有不同的版本标签，如，`16.04`, `18.04`。我们可以通过 `ubuntu:16.04`，或者 `ubuntu:18.04` 来具体指定所需哪个版本的镜像。如果忽略了标签，比如 `ubuntu`，那将视为 `ubuntu:latest`。

仓库名经常以 *两段式路径* 形式出现，比如 `jwilder/nginx-proxy`，前者往往意味着 Docker Registry 多用户环境下的用户名，后者则往往是对应的软件名。但这并非绝对，取决于所使用的具体 Docker Registry 的软件或服务。



## 安装

### CentOS

#### 卸载旧版本

Docker 支持 64 位版本 CentOS 7/8，并且要求内核版本不低于 3.10。 CentOS 7 满足最低内核的要求，但由于内核版本比较低，部分功能（如 `overlay2` 存储层驱动）无法使用，并且部分功能可能不太稳定。

```shell
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```

#### 脚本自动安装

在测试或开发环境中 Docker 官方为了简化安装流程，提供了一套便捷的安装脚本，CentOS 系统上可以使用这套脚本安装，另外可以通过 `--mirror` 选项使用国内源进行安装：

```shell
# 下载脚本
curl -fsSL get.docker.com -o get-docker.sh
# 运行脚本 --mirror 选项使用国内源进行安装
sudo sh get-docker.sh --mirror Aliyun
```

#### yum安装

```shell
# 安装依赖包
sudo yum install -y yum-utils
# 添加 yum 国内软件源 效果就是下载一个aliyun的docker-ce.repo 配置在本地的/etc/yum.respos.d
sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
sudo sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo
# 安装
sudo yum install docker-ce docker-ce-cli containerd.io
### 查看docker版本
docker --version 
```

#### CentOS额外设置

由于 CentOS8 防火墙使用了 `nftables`，但 Docker 尚未支持 `nftables`， 我们可以使用如下设置使用 `iptables`

```shell
vim /etc/firewalld/firewalld.conf
# 改为 FirewallBackend=iptables
# 或者
firewall-cmd --permanent --zone=trusted --add-interface=docker0
firewall-cmd --reload
```

#### 启动

```shell
# 设置开机启动
systemctl enable docker
# 启动
systemctl start docker
```

#### 创建docker用户组

默认情况下，`docker` 命令会使用 [Unix socket](https://en.wikipedia.org/wiki/Unix_domain_socket) 与 Docker 引擎通讯。而只有 `root` 用户和 `docker` 组的用户才可以访问 Docker 引擎的 Unix socket。出于安全考虑，一般 Linux 系统上不会直接使用 `root` 用户。因此，更好地做法是将需要使用 `docker` 的用户加入 `docker` 用户组。

```shell
groupadd docker
# 将当前用户加入docker 组
sudo usermod -aG docker $USER
```

#### 测试是否安装正确

```shell
docker run --rm hello-world
```

![image-20211220152924484](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202204101903499.png)



#### 问题处理

##### 服务启动失败，日志显示 `failed to load listeners: no sockets found via socket activation: make sure the service was started by systemd`

![image-20220912135802948](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209121358052.png)

**解决方案**

根据网络上的讨论  https://forums.docker.com/t/failed-to-load-listeners-no-sockets-found-via-socket-activation-make-sure-the-service-was-started-by-systemd/62505

```bash
# 编辑docker.service文件 将其中的fd://改为unix://
vim /lib/systemd/system/docker.service
```

![image-20220912140952705](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209121409658.png)



### Ubuntu

https://www.bilibili.com/read/cv17488009/

https://mirror.tuna.tsinghua.edu.cn/help/docker-ce/



### Windows10

待补充



### 华为云服务器

因为源不一样，所以流程不太一样

- 安装

  ```sh
  yum install docker-engine -y
  ```

- 启动

  ```sh
  systemctl start docker
  systemctl enable docker
  ```

  

## 基础使用

### 镜像

#### 拉取镜像

```powershell
docker pull
# Docker 镜像仓库地址：地址的格式一般是 <域名/IP>[:端口号]。默认地址是 Docker Hub(docker.io)。
# 仓库名：仓库名是两段式名称，即 <用户名>/<软件名>。对于 Docker Hub，如果不给出用户名，则默认为 library，也就是官方镜像。
# 如从 Docker Hub （docker.io）获取镜像,获取官方镜像 library/ubuntu 仓库中标签为 18.04 的镜像,镜像名称是 ubuntu:18.04,
docker pull ubuntu:18.04
```

#### 运行镜像

```powershell
docker run
# -it：这是两个参数，一个是 -i：交互式操作，一个是 -t 终端。打算进入 bash 执行一些命令并查看返回结果，因此需要交互式终端。
# --rm：这个参数是说容器退出后随之将其删除。默认情况下，为了排障需求，退出的容器并不会立即删除，除非手动 docker rm。如果只是随便执行个命令，看看结果，不需要排障和保留结果，因此使用 --rm 可以避免浪费空间。
# 如 用 ubuntu:18.04 镜像为基础来启动容器,执行命令bash
docker run -it --rm ubuntu:18.04 bash
# 进入后，可以执行shell指令
```

#### 查看镜像

```powershell
docker image ls
# 列出已下载镜像
# 包含了 仓库名REPOSITORY、标签TAG、镜像 IDIMAGE ID、创建时间CREATED 以及 所占用的空间SIZE。
docker image ls ubuntu:18.04 # 列出ubuntu仓库名18.04标签的镜像
# -filter 简写-f 过滤参数
docker image ls -f since=mongo:3.2 # 看到在 mongo:3.2 之后建立的镜像
docker system df # 查看镜像、容器、数据卷所占用的空间
```

**镜像 ID** 则是镜像的唯一标识，一个镜像可以对应多个 **标签**。不同标签相同id的镜像意味着是同一个镜像。

> - ##### 虚悬镜像
>
>   拉取新镜像与原镜像同名，原镜像名称被取消，一般可以删除，仓库名、标签均为 `<none>`
>
>   ```powershell
>   docker image ls -f dangling=true # 查看虚悬镜像
>   docker image prune # 删除虚悬镜像
>   ```
>
> - ##### 中间层镜像
>
>   被重复利用的资源，使用一段时间后，会产生依赖的中间层镜像，表现为无标签，不应该删除，否则影响被依赖的镜像。删除依赖它的镜像，自然会被删除。
>
>   ```powershell
>   docker image ls -a #列出镜像包含中间层的
>   ```

#### 删除本地镜像

```powershell
# docker image rm [选项] <镜像1> [<镜像2> ...]
docker image rm 501ad78535f0  # 删除镜像id的镜像，可以缩写为501 在保证足够区分镜像的前提下
docker image rm centos # 按镜像名删除

# 停止相关的镜像
docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker stop
docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker rm
# 刪除鏡像
docker images|grep none|awk '{print $3 }'|xargs docker rmi
```



### 容器

#### 启动

```powershell
docker run #新建并启动
docker run ubuntu:18.04 /bin/echo 'Hello world' # 启动容器 打印并终止
# -t 让Docker分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上
# -i 让容器的标准输入保持打开
docker run -t -i ubuntu:18.04 /bin/bash # 启动一个bash终端,允许用户进行交互。

docker container start #启动已终止容器
```

> 当利用 `docker run` 来创建容器时，Docker 在后台运行的标准操作包括：
>
> - 检查本地是否存在指定的镜像，不存在就从 [仓库]() 下载
> - 利用镜像创建并启动一个容器
> - 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
> - 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
> - 从地址池配置一个 ip 地址给容器
> - 执行用户指定的应用程序
> - 执行完毕后容器被终止

#### 守护态运行

```powershell
# -d 启动时添加 让 Docker 在后台运行而不是直接把执行命令的结果输出在当前宿主机下
# 使用 -d 参数启动后会返回一个唯一的 id，也可以通过命令来查看容器信息。
docker container ls
# 查看守护态容器返回信息
docker container logs 
```

#### 终止

```powershell
docker container stop # 终止一个运行中的容器
# 当 Docker 容器中指定的应用终结时，容器也自动终止
docker container ls -a # 查看终止状态容器
docker container restart # 终止容器再进行启动
```

#### 进入容器

```powershell
docker attach # 进入容器后 使用exit指令会导致容器终止
docker exec # -i 没有分配伪终端，没有熟悉的 Linux 命令提示符;-it 一起使用可以看到linux命令提示符 
# 推荐使用exec，exit不会导致终止。
```

#### 导入导出

```powershell
docker export # 导出
docker export 7691a814370e > ubuntu.tar  # 导出容器快照到本地文件

docker import # 导入 容器快照为镜像
cat ubuntu.tar | docker import - test/ubuntu:v1.0 
# 也可以通过指定 URL 或者某个目录来导入
docker import http://example.com/exampleimage.tgz example/imagerepo 
```

#### 删除

```powershell
docker container rm # 删除一个处于终止状态的容器
# -f 删除一个运行中的容器
docker container prune # 清理所有处于终止状态的容器
```

#### 查看容器

```powershell
docker ps
docker ps -a # 查看所有的容器,包括未运行的容器
```



### 仓库

#### 公共仓库

```powershell
# 在 https://hub.docker.com 免费注册一个 Docker 账号
docker login # 输入用户名及密码来完成在命令行界面登录 Docker Hub
docker logout # 退出登录
```

#### 拉取镜像

```powershell
docker search  # 查找官方仓库中的镜像
# --filter=stars=N 参数可以指定仅显示收藏数量为 N 以上的镜像
docker pull # 下载到本地
```

> - 基础镜像：类似 `centos` 这样的镜像，被称为基础镜像或根镜像。这些基础镜像由 Docker 公司创建、验证、支持、提供。这样的镜像往往使用单个单词作为名字
> - 用户镜像：比如 `ansible/centos7-ansible` 镜像，它是由 Docker Hub 的注册用户创建并维护的，往往带有用户名称前缀。可以通过前缀 `username/` 来指定使用某个用户提供的镜像，比如 ansible 用户。

#### 推送镜像

```powershell
docker push # 命令来将自己的镜像推送到 Docker Hub
docker push username/ubuntu:18.04 # username 为Docker账号用户名
```



#### 私有仓库

[`docker-registry`](https://docs.docker.com/registry/) 是官方提供的工具，可以用于构建私有的镜像仓库。

- ##### 安装运行

  ```powershell
  docker run -d -p 5000:5000 --restart=always --name registry registry
  # 将使用官方的 registry 镜像来启动私有仓库
  # 默认情况下，仓库会被创建在容器的 /var/lib/registry 目录下,可以通过 -v 参数来将镜像文件存放在本地的指定路径
  # 如将上传的镜像放到本地的 /opt/data/registry 目录
  docker run -d \
      -p 5000:5000 \
      -v /opt/data/registry:/var/lib/registry \
      registry
  ```

- ##### 私有仓库上传、搜索、下载镜像

  ```powershell
  docker tag # 标记一个镜像
  #  如将 ubuntu:latest 这个镜像标记为 127.0.0.1:5000/ubuntu:latest
  docker tag ubuntu:latest 127.0.0.1:5000/ubuntu:latest 
  
  docker push # 上传标记的镜像
  docker push 127.0.0.1:5000/ubuntu:latest 
  
  # curl 查看仓库中的镜像
  curl 127.0.0.1:5000/v2/_catalog
  
  # 删除本地镜像
  docker image rm 127.0.0.1:5000/ubuntu:latest
  # 拉取本地镜像
  docker pull 127.0.0.1:5000/ubuntu:latest
  ```

- ##### 配置非 https 仓库地址

  ```powershell
  # Docker 默认不允许非 HTTPS 方式推送镜像。我们可以通过 Docker 的配置选项来取消这个限制
  # 在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）
  # 必须符合 json 规范，否则 Docker 将不能启动
  {
    "registry-mirror": [
      "https://hub-mirror.c.163.com",
      "https://mirror.baidubce.com"
    ],
    "insecure-registries": [
      "192.168.199.100:5000"
    ]
  }
  ```


## 常用指令

### 容器操作

- 查看所有容器

  ```sh
  docker ps -a
  ```

- 启动/关闭容器

  ```sh
  #启动容器
  docker start 容器名
  #关闭容器
  docker stop 容器名 
  # 杀死运行的容器：
  docker kill $(docker ps -a -q)
  ```

- 进入容器

  ```sh
  docker exec -it 容器名 bash
  docker exec -it 容器名 /bin/sh  # alpine制作
  ```

- 删除容器

  ```sh
  # 必须先关闭容器后才能删除
  docker rm 容器名
  ```

### 镜像操作

- 查看镜像

  ```sh
  #查看本地所有镜像
  docker images
  ```

- 删除镜像

  ```sh
  #删除镜像
  docker rmi 镜像ID 
  #删除所有容器：
  docker rm $(docker ps -a -q)
  #强制删除所有镜像
  docker rmi -f  $(docker images -q)
  ```

- 搜索镜像

  ```sh
  docker search 镜像名
  ```

- 下载镜像

  ```sh
  docker pull 镜像名
  ```

- 启动镜像

  ```sh
  docker run 镜像名
  ```

  

### 其他指令

- 查看容器配置

  ```sh
  docker inspect 容器名
  ```

- 查看Docker信息

  ```sh
  docker info
  # 查看版本号
  docker version
  ```




## 网络

### 相关操作

#### 创建网络

```sh
# 创建一个名为 web_net 的网络，子网 172.32.0.0/24 可自定义
docker network create --subnet=172.32.0.0/24 web_net
```

#### 查看网络

```sh
docker network ls
```

#### 删除网络

```sh
docker network rm < NAME >
```





## 补充

### 配置阿里云镜像加速器

- 登陆阿里云

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20210122164353.png)

- 找到镜像加速器

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/220210122164635.png)

- 修改docker配置文件

  ```shell
  vim /etc/docker/daemon.json
  # 有就修改 没有就添加
  {"registry-mirrors": ["https://hub-mirror.c.163.com", "https://mirror.baidubce.com","刚申请的加速器地址"]}
  ```

  

## Docker Compose

Docker Compose是一个用于定义和运行多个docker容器应用的工具。使用Compose你可以用YAML文件来配置你的应用服务，然后使用一个命令，你就可以部署你配置的所有服务了。



### 安装

- 下载

  ```shell
  curl -L https://get.daocloud.io/docker/compose/releases/download/1.24.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
  ```

- 修改该文件为可执行

  ```shell
  chmod +x /usr/local/bin/docker-compose
  ```

- 查看是否安装成功

  ```shell
  docker-compose --version
  ```

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/refer_screen_96.png)





### 常用命令

#### 构建、创建、启动相关容器

```bash
# -d表示在后台运行
docker-compose up -dCopy to clipboardErrorCopied
```

#### 指定文件启动

```bash
docker-compose -f docker-compose.yml up -dCopy to clipboardErrorCopied
```

#### 停止所有相关容器

```bash
docker-compose stopCopy to clipboardErrorCopied
```

#### 列出所有容器信息

```bash
docker-compose ps
```







### docker-compose.yml常用命令

#### image

指定运行的镜像名称

```yaml
# 运行的是mysql5.7的镜像
image: mysql:5.7Copy to clipboardErrorCopied
```

#### container_name

```yaml
# 容器名称为mysql
container_name: mysqlCopy to clipboardErrorCopied
```

#### ports

指定宿主机和容器的端口映射（HOST:CONTAINER）

```yaml
# 将宿主机的3306端口映射到容器的3306端口
ports:
  - 3306:3306Copy to clipboardErrorCopied
```

#### volumes

将宿主机的文件或目录挂载到容器中（HOST:CONTAINER）

```yaml
# 将外部文件挂载到myql容器中
volumes:
  - /mydata/mysql/log:/var/log/mysql
  - /mydata/mysql/data:/var/lib/mysql
  - /mydata/mysql/conf:/etc/mysqlCopy to clipboardErrorCopied
```

#### environment

```yaml
# 设置mysqlroot帐号密码的环境变量
environment:
  - MYSQL_ROOT_PASSWORD=rootCopy to clipboardErrorCopied
```

#### links

连接其他容器的服务（SERVICE:ALIAS）

```yaml
# 可以以database为域名访问服务名称为db的容器
links:
  - db:databaseCopy to clipboardErrorCopied
```

#### restart

指定容器重启策略

```yaml
restart: always
```

| 策略                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| no                       | 不自动重启（默认模式）                                       |
| on-failure[:max-retries] | 重启因出错停止的容器（非0退出码）。可以通过指定max-retries来限定docker daemon的最大尝试重启次数 |
| always                   | docker daemon会无限尝试重启退出的容器（无论以什么退出码退出）。手动停止容器后，容器策略不再生效。除非重启docker daemon |
| unless-stopped           | 与`always`类似，区别在于手动停止容器后，就算重启docker daemon，容器策略也不再生效。 |



### 关于Network的设定

[参考](https://titangene.github.io/article/networking-in-docker-compose.html)

这篇的目的是如何控制构造的network，以及如何使用现有network，以及理解配置中network项的含义

#### 默认网络default

- 默认情况下docker-compose会建立一个默认的网络，名字是项目名称小写，加上`_default`。

  > - 这个项目名称默认是**docker-compose.yml所在目录名称**，如我经常将`docker-compose.yml`放置在`/soft`目录下用于启动，启动后会提示创建默认网络`soft_default`
  > - 可以通过`-p`或者`--project-name`在启动时指定项目名称，从而影响这个目录名称

- 预设的网络在配置中没有网络配置时，会将容器加入这个默认网络。

- 配置文件包含多个容器时，都会加入这个网络。

- 同一个网络中，可以用容器名互相访问/通讯。

  对应的端口号使用的是容器内部端口号。

  >  如名为`mysql`的容器，同一个网络的其他容器可以以`mysql:3306`访问它。



##### 修改默认网络的配置

不为容器指定网络时，可以修改默认网络的配置：

```yaml
networks:
  # default项下的键值对修改配置项
  default:
    driver: custom-driver-1
```

#### 自定义网络

自定义网络通过一级networks下的二级键名定义，然后存在一些配置项。

```yaml
networks:
  # 自定义网络名my-network
  my-network:
    driver: bridge
    external: true
```

在这里列出一些配置项：

- **external**

  external的配置，可以让你控制加入网络是否通过自己创建。

  如果external设为true，则这个网络不由docker-compose创建，而是已存在的网络。如果你没有创建/这个网络不存在，则会报错，就像这样：

  ```sh
  $ docker-compose up
  ERROR: Network my_network declared as external, but could be found. Please create the network manually using `docker network create my-network` and try again.
  ```



#### 指定容器加入特定网络

在容器配置项下的networks配置，可以加入现有的，不由docker-compose控制的网络。

- 该配置要求网络已经存在，而不是先创建再加入（不过这个创建可以在下面配置）。
- 配置了这个网络之后，不会再创建默认网络并加入。

```yml
version: '3'

services:
  mysql:
    image: mysql
    # 加入两个网络frontend和backend
    networks:
      - frontend
      - backend
```

或者通过external选项

```yaml
networks:
	default:
		external:
			name:	existing-network
```

#### networks配置项

```yaml
networks:
  # 网络名
  nginx_net:
    external:
      name: web_net
      
...

services:
  # 容器名
  xxx:
    networks:
      # 网络名
      nginx_net:
        ipv4_address: 172.32.0.4
```

- **driver**

  默认是bridge

- **driver_opts**

- **ipam**

- **internal**

- **ipv4_address**：指定容器IP
- **name**：指定已存在的网络名称



## 可视化管理工具Portainer 

Portainer 是一款轻量级的应用，它提供了图形化界面，用于方便的管理Docker环境，包括单机环境和集群环境。

### 安装

#### Docker安装

- 官网地址：https://github.com/portainer/portainer

- 拉取镜像

  ```sh
  docker pull portainer/portainer
  ```

- 使用docker容器运行Portainer：

  ```sh
  docker run -p 9000:9000 -p 8000:8000 --name portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /soft/portainer/data:/data \
  -d portainer/portainer
  ```

访问端口号为9000



#### Docker-compose配置

仅供参考

```yaml
# 指定 compose 文件的版本
version: '3.1'
services:
  # 数据库
  portainer:
    # 指定镜像版本
    image: portainer/portainer:latest
    # 重启策略：启动失败时重启
    restart: always
    # 自定义容器名
    container_name: portainer
    ports:
      - '9000:9000'
      - '8000:8000'
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /soft/portainer/data:/data
```

启动指令：

```sh
docker-compose -p portainer -f /soft/portainer.yml up -d
```

