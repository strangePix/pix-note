# Windows

## Windows常用快捷键



| 操作                  | 按键                           |
| --------------------- | ------------------------------ |
| 微软拼音翻页快捷键    | `-` 向前翻页<br />`=` 向后翻页 |
| 切换中英文输入法      | `Ctrl + Shift`                 |
| Windows显示桌面快捷键 | `Win + D`                      |
| 切换不同输入法        | `Win + Space`                  |
| 快捷打开：我的电脑    | `Win + E`                      |
| 快捷打开：任务管理器  | `ctrl + shift + esc`           |
|                       |                                |



## Win+R 运行

### 常用指令

- **cmd**

  命令行

- **powershell**

  powershell

- **services.msc**

  服务

- **sysdm.cpl**

  系统属性，用于打开环境变量
  
- **control**

  控制面板

- **chrome**

  浏览器

### 开启管理员运行任务

**描述**

现有运行指令启动程序没有使用管理员权限，在部分操作下会有限制。

![image-20220809085654110](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208090856160.png)

**解决方式**

- 方式一：打开任务管理器，选择文件-运行新任务，可以勾选管理员权限

  ![image-20220809091224490](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208090912520.png)

  ![image-20220809091250461](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208090912486.png)

- 方式二：在运行窗口输入指令后，不是Enter，而是**通过Ctrl+Shift+Enter运行**，就会弹出用户权限控制，同意后即可以管理员权限启动



### 使运行记住过往指令

[参考](https://blog.csdn.net/qq_33999977/article/details/123376165)

**问题描述**

电脑win+R 键调出的运行窗口中是空白的，不显示历史记录，每次需要手动重新输入，很麻烦

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208081728904.png" alt="在这里插入图片描述" style="zoom:50%;" />

**解决方法**

进入设置，找到隐私设置-选择常规

![在这里插入图片描述](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208081729852.png)

打开”允许windows跟踪应用启动“，再操作运行窗口即可。

![image-20220809092322666](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208090923691.png)



## 控制台/命令行

### CMD

### POWERSHELL

#### 使用系统变量

在系统变量里配置的路径，在powershell中也可以使用特定格式调出：

```powershell
# 等价于cmd的%xxx%
$env:xxx
```

### Windows Terminal

安装：https://www.kwchang0831.dev/dev-env/windows-terminal

快捷打开：运行中输入wt https://docs.microsoft.com/zh-cn/windows/terminal/command-line-arguments?tabs=windows

> 2022.9.11 个人评价：好东西啊，比powershell还好用，还可以取代xshell

## 服务管理

### 相关指令

```powershell
# 启动服务
net start xxx
# 停止服务
net stop xxx
```

### SC命令操作服务

**创建服务**

```powershell
sc create XXX binpath= "xxx.exe" displayname= "XXXService" start= auto
```

- XXX：服务名
- binpath：exe文件的完整路径
- displayname：服务别名
- start：启动方式（auto自动）

但对exe文件的要求较高，必须符合系统服务规范，否则无法启动。

> 使用工具软件注册服务，不仅可以越过麻烦的规范，也可以简化步骤，
>
> 比如nssm等（待补充）

**删除服务**

```powershell
# 删除名为xxx的服务(需要管理员权限)
sc delete xxx
```

> - [SC] DeleteService 失败 1072
>
>   需要在删除服务前要做几个清理工作，确保：
>
>   - 服务已停止：net stop xxx
>   - 服务控制面板已关闭：
>     - 确保关闭服务services.msc窗口；
>     - mmc.exe 进程不存在（"服务"列表窗口） taskkill / F / IM mmc.exe
>   - 服务未打开任何文件句柄（？）
>   - ProcessExplorer没有运行（？）
>
> - [SC] OpenService FAILED 1060
>
>   服务已删除，需要在注册表删除对应服务，在`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services`中找到对应服务键值





## 工具软件

### Scoop-指令安装工具

提供Win通过指令安装应用程序的方式。

#### 安装

- 打开一个PowerShell窗口

- 运行如下指令，选Y。该指令要求以管理员权限运行。

  ```powershell
  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

  ![image-20220809092041877](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208090920909.png)

- 运行指令安装Scoop。该指令要求不能以管理员权限运行。

  ```powershell
  irm get.scoop.sh | iex
  ```

  ![image-20220809092228416](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208090922438.png)



#### 使用







## 不常见问题处理

问题解决仅针对个人情况，不能视为泛用处理。

### Win10系统，部分文件没有默认打开方式，且无法设置默认打开方式

**问题描述**

- 系统：Win10/Win11
- 表现形式：yml文件没有默认打开方式，右键打开方式选择Sublime打开，但无法设置默认打开方式，每次都要选择。从控制台想要设置，没有yml文件格式。

**解决方案**

[参考](https://blog.csdn.net/ZZQHELLO2018/article/details/106158165)

电脑安装了360软件管家，虽然没有启动。

打开360软件管家，取消打开未知文件的软件推荐。

![在这里插入图片描述](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20200516133749297.png)

![在这里插入图片描述](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20200516133837693.png)

从个人角度而言，再次打开yml文件可以将Sublime设为默认打开方式了。



### 快速打开环境变量

**方法1**

按键盘上的windows键，输入“环境变量”或者“huanjing”，打开“编辑系统环境变量“。

![image-20220831113112018](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208311131087.png)



**方法2**

win+r 打开运行  输入 **sysdm.cpl** 回车，会打开“系统属性”，点击高级即可。

![image-20220831113525808](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208311135833.png)



进一步的，输入 **sysdm.cpl ,3**  （逗号前有空格），会直接打开系统属性的高级选项，不用鼠标切换，再按ctrl+n也可以打开；

更进一步，输入 **%windir%\System32\rundll32.exe sysdm.cpl,EditEnvironmentVariables**   一步到位打开系统变量，爽到飞起就是不好记

> 或者**rundll32.exe sysdm.cpl,EditEnvironmentVariables**





## 在Windows上运行Linux程序——WSL

https://docs.microsoft.com/zh-cn/windows/wsl/tutorials/gui-apps

- 以管理员权限在命令行运行安装指令

  ```powershell
  wsl --install
  ```

  安装后重启电脑。

- 如果没有客户端的话，通过这个指令打开

  ```powershell
  # 默认root没密码
  wsl -u root 
  ```

  

可能遇到问题的解决方案：https://blog.csdn.net/shizheng_Li/article/details/120549190

安装CentOS  https://linuxhint.com/install-centos-using-wsl/

装错位置重新装的解决方式 https://blog.csdn.net/jarvan5/article/details/118144722

CentOS没有systemctl 指令也没有service指令的解决办法 https://www.jianshu.com/p/e670ae82e97a

配置SSH https://www.jianshu.com/p/df83a3b96f64   https://blog.csdn.net/jackghq/article/details/54974141

SSH密码链接配置：运行`ssh-keygen -A`



### WSL文件系统映射为本地磁盘

https://blog.csdn.net/x356982611/article/details/80077085



## 额外内容补充





### LTSC是什么？

[参考](https://www.zhihu.com/question/389770085)

LTSC = Long Term Servicing Channel

如Win10 LTSC ，指Win10的长期支持版本。

**是Windows企业版的特殊版本，更加专注于操作系统的长期稳定运行和兼容性。**

简单来说，是一个稳定，不提供更新，支持时间较长，有部分功能阉割的版本。
