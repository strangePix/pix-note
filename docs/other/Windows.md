# Windows

## Windows快捷键

Windows显示桌面快捷键: `win`+`d`

微软拼音翻页快捷键: `-`和`=`

切换中英文输入法: `ctrl`+`shift`

切换不同输入法: `Win`+`space`

全角半角切换快捷键(搜狗): `shift`+`space`

搜狗输入法切换全角半角: `shift`+`space`



## Win+R 运行指令集

- **cmd**

  命令行

- **services.msc**

  服务



## 服务管理

### 相关指令

```powershell
# 删除名为xxx的服务(管理员权限)
sc delete xxx
```







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

