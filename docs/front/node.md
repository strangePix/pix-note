# Node.js



## 安装

### Win

- 卸载已安装Node
- 在https://github.com/coreybutler/nvm-windows/releases下载最新安装包进行安装

#### 多版本管理安装

##### fnm

这里没用nvm，而是[fnm](https://github.com/Schniz/fnm)

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

> 实际上并不是，经过实测，目前这种安装方式安装的node无法直接响应node指令
>
> 需要找到已经安装的node文件的位置（通过`fnm env` 查看）
>
> 将node.exe 文件拷贝到node_modules\npm目录下
>
> 所以笔者目前不再使用这种方式。







### Linux



