

# Paraview



## 安装



### 直接安装

#### ubuntu

```bash
apt install paraview
```

### 下载安装

1. 下载：https://www.paraview.org/download/  最新版.tar.gz

2. 解压到存放的目录下, 如 /usr/local/

   ```bash
   tar -zxvf ParaView-5.11.2-MPI-Linux-Python3.9-x86_64.tar.gz
   ```

3. 配置环境变量

   ```bash
   export PATH=$PATH: /usr/local/paraview/bin
   ```

   并指令生效

   ```bash
   source /etc/profile
   ```



>1. 如果不需要gui，只用命令行，可以下载这里的：
>
>    其中egl版本使用显卡，没有的话用osmesa版本即可。
>
>   ![image-20231109033032889](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202311090330909.png)
>



## 启动

安装具有gui的版本时，运行bin目录下paraview文件即可



## 关于ParaviewWeb



### 和服务端相关通信API

https://kitware.github.io/paraviewweb/api/IO_WebSocket_ParaViewWebClient.html

对应调用Paraview的相关操作，在web端通过websocket实现



### Visualizer

https://github.com/Kitware/visualizer.git

使用node开发，目前已不更新

Paraview内置的visualizer位置在

```bash
# 以Paraview-5.11举例
~/Paraview-5.11/share/paraview-5.11/web/visualizer
```

#### 启动方式

由于启动时同时开了服务端的，所以是离不开paraivew的python启动服务端的，其中的关键就是
```bash
~/Paraview-5.11/bin/pvpython
```

启动指令

```bash
node /usr/bin/Visualizer --paraview /usr/local/lib/paraview-5.4/ --data /input --port 9777 --server-only
```

> - Visualizer实际是被软链接到visualizer项目的bin目录下pvw-visualizer-cli.js
> - --paraview需要指定paraivew安装位置，也是为了找到对应的pvpython

或者

```bash
~/Paraview-5.11/bin/pvpython -dr ~/Paraview-5.11/share/paraview-5.11/web/visualizer/server/pvw-visualizer.py --content ~/Paraview-5.11/share/paraview-5.11/web/visualizer/www --port 9777 --data /input
```

> - 相关配置参数可见pvw-visualizer.py文件
> - --content对应的是前端页面，也是通过开源项目打包出来的内容

如果是使用内置的visualizer则可以简化为：
```bash
~/Paraview-5.11/bin/pvpython -m paraview.apps.visualizer --port 9777 --data /input
```

> 查阅~/Paraview-5.11/share/paraview-5.11/web目录实际上-m参数 paraview.apps.可以至少指定四个值，对应四个项目文件夹，可以自行探索
>
> - divvy
> - glance
> - lite
> - visualizer

#### 镜像启动

看到由其他人通过镜像启动 暂时没有实践



### ParaviewWeb

https://github.com/kitware/paraviewweb

这个是web的本体，Visualizer也是基于ParaviewWeb实现，因为与Paraview通信依赖这个。



### Trame

新一代Paraview应用，官方推荐，因为Visualizer已经有一阵子没更新了

支持通过python启动，不过个人没仔细研究，更灵活

https://kitware.github.io/trame/