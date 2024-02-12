# WSL

基于WSL2

## 概念



## 安装linux发行版

https://docs.microsoft.com/zh-cn/windows/wsl/tutorials/gui-apps

### 以前没装过

- 以管理员权限在命令行运行安装指令

  ```powershell
  wsl --install
  ```

  安装后重启电脑，安装将继续进行，并要求你输入用户名和密码。

  默认安装Ubuntu，可以更改。

  > - `wsl --list --online`查看可用发行版
  > - `--distribution` 参数指定安装的发行版，或者`-d`

### 装过其他版本

需要显示指定安装的版本，也就是`-d`参数

```sh
wsl --install-d <distribution name>
```

### 其他方式安装/安装包安装

个人有各种需求，所以安装方式还有其他的

- 离线安装：下载安装包运行：https://learn.microsoft.com/zh-cn/windows/wsl/install-manual
- 控制发行版的安装位置（因为默认C盘）
  - 安装的时候控制安装位置：https://zhuanlan.zhihu.com/p/263089007
  - 安装后导出再移动：https://juejin.cn/post/7134196737769472036
- windows商店里也有

### 安装Centos

笔者自行尝试安装Centos发行版，限制颇多，后面放弃，这里列出参考文章

- 安装CentOS  https://linuxhint.com/install-centos-using-wsl/
- CentOS没有systemctl 指令也没有service指令的解决办法 https://www.jianshu.com/p/e670ae82e97a

### 其他问题处理

- 错误代码0x80072f78：https://blog.csdn.net/shizheng_Li/article/details/120549190 



## 打开发行版

### 通过WSL打开

如果没有客户端的话，通过这个指令打开

```powershell
# 默认root没密码
wsl -u root 
```

如果安装了多个发行版，也用`-d`指名

### 通过SSH打开

首先需要有SSH

1. 判断是否安装ssh-server服务

   ```sh
   dpkg -l | grep ssh
   ```

2. 安装ssh-server服务

   ```sh
   apt-get install openssh-server
   ```

3. 启动ssh-server服务

   ```sh
   service ssh start
   ```

就可以通过ssh访问了。

> - 密码正确访问却失败：目测是因为默认禁止登录root用户
>
>   通过修改配置文件：`vim /etc/ssh/sshd_config`
>
>   - 启用密码认证：`PasswordAuthentication yes`
>   - 启用 root 用户登录：`PermitRootLogin yes`
>
> - 关于密钥登录：http://frantic1048.logdown.com/posts/291498-resolve-the-ssh-password-is-correct-but-was-refused-connection



## 卸载

根据你装的Linux版本指定卸载

```sh
wsl --unregister <DistributionName>
```

卸载后运行

```sh
wsl --list
```

指定发行版消失则说明卸载成功



## 问题处理



### WSL功能与手机模拟器冲突（与虚拟化技术的关系）

- 开启WSL后，再使用手机模拟器时会提示未开启VT，类似这个，不同模拟器提示不一样

![image-20220925171953164](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209251719218.png)

- 但实际上开启了VT也会提示这个，如果想要使用模拟器，需要关闭windows的虚拟机功能，方式是打开控制面板的`打开或关闭Windows功能`

  ![image-20220925172006711](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209251720821.png)

- 找到`虚拟机平台`，此时为打开状态，将其取消，然后按提示重启电脑，即可使用模拟器。

  ![image-20220925172116606](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209251721661.png)

  这个功能用指令实现就是：

  ```powershell
  # 需要管理员权限
  C:\WINDOWS\system32>dism.exe /Online /Disable-Feature:Microsoft-Hyper-V
  ```

- 但相应的，此时WSL就不能用了，要用的话需要把这个功能开启才行。也就是说模拟器与WSL是冲突的。

> 补充知识：[wsl 2 是否需要启用 Hyper-V？](https://www.zhihu.com/question/439585675)



### 配置免密登录其他账号

目的：我个人使用时创建的WSL默认非管理员账号，每次打开要操作root时，需要切换用户，现在想直接打开就登录非当前windows用户

**方式一：改为SSH登录**

改为SSH登录的方式，然后使用SSH的密钥配置登录即可，参考[配置免密登录](#####配置免密登录)

**方式二：启动指令添加参数**

- 查看配置文件，可以看到启动的命令行指令为

  ```sh
  C:\WINDOWS\system32\wsl.exe -d Ubuntu-22.04
  ```

- 添加指定用户参数

  ```sh
  C:\WINDOWS\system32\wsl.exe -d Ubuntu-22.04 -u root
  ```

  个人测试直接就免密了



### WSL文件系统映射为本地磁盘

https://blog.csdn.net/x356982611/article/details/80077085

- 首先是默认安装的ubuntu系统对应的目录为

  ```sh
  C:\Users\用户名\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu对应版本号和一些字符\LocalState\ext4.vhdx
  ```

  比如我安装的22.04LTS

  路径就是`C:\Users\alienware\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu22.04LTS_79rhkp1fndgsc\LocalState\ext4.vhdx`

  不过那个文件打不开，提示正在使用

  ![image-20220925193220498](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209251932552.png)

- WSL2会在安装后自动配一个映射硬盘比如这样

  对应路径为

  ```sh
  \\wsl.localhost\Ubuntu-22.04
  ```

  ![image-20220925193014524](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209251930613.png)

- 同时补充，windows文件系统在linux中同样也有映射，路径为`/mnt`

  ![image-20220925193448079](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209251934133.png)



### WSL启动后1099端口占用，tomcat等服务器无法启动

对应原因：[Hyper-V导致1024-1123范围内端口被占用问题](https://blog.h1msk.cc/2020/12/08/%E8%BD%AC-Hyper-V%E5%AF%BC%E8%87%B41024-1123%E8%8C%83%E5%9B%B4%E5%86%85%E7%AB%AF%E5%8F%A3%E8%A2%AB%E5%8D%A0%E7%94%A8%E9%97%AE%E9%A2%98/)

个人测试，处理之后似乎模拟器也能用了

