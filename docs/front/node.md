# Node.js



## 安装

### Win

- 卸载已安装Node
- 在https://github.com/coreybutler/nvm-windows/releases下载最新安装包进行安装

### CentOS7

https://www.jianshu.com/p/959ca0e5495a



## 多版本管理安装

### fnm

项目地址：https://github.com/Schniz/fnm

- 官方提供了很多种安装方式，这里选用最朴实的，下载二进制安装包https://github.com/Schniz/fnm/releases

  ![image-20220808165631479](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208081656519.png)

- 解压后得到文件`fnm.exe`，将其放置到一个自定义位置，然后配置到环境变量的PATH中

  ```shell
  # 如我放在了D:\soft\fnm\fnm.exe
  Path=D:\soft\fnm
  ```

  查看fnm版本，有显示说明配置成了

  ```shell
  fnm --version
  ```

  ![image-20220808170505412](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208081706740.png)
  
- 查看可以安装的node版本

  ```shell
  fnm list-remote
  ```

  选择版本进行安装，这里选择长期支援的最新版本 v16.16.0

  ```shell
  fnm install v16.16.0
  ```

  查看已安装版本

  ```shell
  fnm list
  ```

- 在powershell运行指令

  ```shell
  $PROFILE
  ```

  获得一个文件路径，如果这个文件没有的话需要自行创建

  ![image-20220808171945004](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208081719026.png)

  然后在文件中添加如下内容：

  ```txt
  fnm env --use-on-cd | Out-String | Invoke-Expression
  ```

  重新启动powershell即可使用`node -v` 和`npm -v`指令

> 目前这种安装方式安装的node无法直接响应node指令
>
> 需要找到已经安装的node文件的位置（通过`fnm env` 查看）
>
> 将node.exe 文件拷贝到node_modules\npm目录下
>
> 所以目前暂时不使用这种方式。



### nvm-windows

网上评价性能可能稍差，但作为开发不影响

- 下载安装包 https://github.com/coreybutler/nvm-windows/releases
- 运行[nvm-setup.exe](https://github.com/coreybutler/nvm-windows/releases/download/1.1.9/nvm-setup.exe)，选择nvm安装路径和nodejs安装路径，软件会自动配置Path

**相关指令**

```powershell
# 查看nvm版本
nvm v  
# 查看可安装版本 去掉available看已安装版本
nvm list available
# 下载最新的 node 版本
nvm install latest 
# 查看当前版本
nvm current
# 选择版本
nvm use 6.2.0
# 卸载对应的版本
nvm uninstall 6.2.0 
```



#### nvm 1.1.0 版本问题

https://loveky.github.io/2018/04/18/time-to-upgrade-nvm-windows/

大概意思是：nvm-windows 需要维护一个 Node 的版本列表。由于早期 Node 官方并没有这种数据。于是 nvm-windows 的作者创建了这个仓库。后来 Node 官方开始维护 https://nodejs.org/download/release/index.json。于是作者也放弃自己维护这个仓库转而使用官方的列表了。nvm-windows 1.1.0 是最后一个使用非官方列表的版本。

所以1.1.0版本列表非官方列表，后续不维护，升级版本即可，同时升级版本只需运行新版本安装程序即可。



#### nodejs.org 访问失败问题

拉取node列表或者安装时提示无法访问到nodejs.org

![image-20231107152626858](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202311071526537.png)

https://stackoverflow.com/questions/57342497/use-nvm-behind-the-corporate-firewall

大概是需要翻墙，如果你本地已经配了代理，给nvm也配上即可

```shell
nvm proxy http://127.0.0.1:7890   -> 设置代理 如使用clash 默认7890端口
nvm proxy                         -> 查看当前代理
nvm proxy none                    -> 关闭代理
```



### 安装优化和问题处理

#### 配置npm全局安装路径

用于避免包路径不共享，导致切换node版本时已安装的包需要重新安装

- 执行指令

  ```shell
  npm config set prefix "E:\nodejs\npm-global"
  ```

- 该指令会在`C:\\Users\\你的用户名\\` 会生成个 `.npmrc` 文件，内容如下

  ```properties
  prefix=E:\nodejs\npm-global
  ```

  此时通过全局指令`npm install xxx -g`会将包安装到`E:\nodejs\npm-global\node_modules`

- 配置npm到环境变量Path

  ```properties
  Path=E:\nodejs\npm-global
  ```



#### 安装cnpm

```shell
npm install -g cnpm -registry=https://registry.npm.taobao.org
```



#### 换源提高nvm下载速度

找到nvm安装目录下的`settings.txt`文件

添加下两行配置

```txt
root: C:\Program Files\nvm
path: C:\Program Files\nodejs

node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```



#### nvm切换版本报错

![5.png](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208091033386.png)

使用管理员权限打开cmd，重新操作即可
