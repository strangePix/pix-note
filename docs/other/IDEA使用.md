# IDEA使用

## 配置

部分问题仅在2020出现，已标注

[参考](https://www.cnblogs.com/knowledgesea/p/11158412.html)  [参考教程](https://github.com/judasn/IntelliJ-IDEA-Tutorial) [破解](https://blog.yoodb.com/yoodb/article/detail/1825)

### 全局配置（2020）

正常的setting只能影响当前项目，如果相对新项目进行setting（如maven仓库等），位置是File-New Projects Setting再进行配置

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201206041204713.png" alt="image-20201206041204713" style="zoom: 50%;" />

### 自动编译

Build-Compiler-Build project automatically

![image-20210201230008645](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210201230008645.png)

#### 运行期自动编译

Ctrl + Shift + Alt + / 然后双击Shift搜索进入Registry 

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/398358-20190710171000834-537208481.png)

找到compiler.automake.allow.when.app.running ，然后勾选上

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/398358-20190710171457658-834071698.png)



### maven自动加载依赖（2020）

现在pom文件进行内容更新的时候，不会自动下载更新后的依赖，需要手动更新一下

- 默认方法：pom文件空白处会显示一个图标用于更新依赖

  ![image-20201206043721805](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201206043721805.png)

- 手动更新法一：

  Settings中Maven项展开，选择其中的Repositories，找到本地仓库进行更新

  <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201206042548915.png" alt="image-20201206042548915" style="zoom:40%;" />

- 手动更新法二：

  右侧栏Maven选择Reimport；右键项目中maven选择reimport

  <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201206042853705.png" alt="image-20201206042853705" style="zoom:50%;" />

### 开启序列化serialVersionUID检查

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201210101511340.png" alt="image-20201210101511340" style="zoom:50%;" />

### 修改资源属性文件（.properties）默认编码

如图所示，编码设为UTF-8（默认跟随系统）；勾选Transparent native-to-ascii conversion (字符转为ascii编码保存)

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201210101919554.png" alt="image-20201210101919554" style="zoom:50%;" />

### 隐藏用开发工具的配置目录（.iml;.idea）

Editor-File Types-Ignore files and folders 添加\*.iml;.idea;

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201210102912479.png" alt="image-20201210102912479" style="zoom: 33%;" />

### 取消大小写敏感

Editor-General-Code Completion，去掉Match case方框的勾

![image-20201210103409575](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201210103409575.png)



### 自动导包，智能移除

File -> Settings -> Editor -> General ->Auto Import

勾选

add unambiguous imports on the fly //自动导入依赖

optimize imports on the fly(for current project) //优化导入和智能删除无关依赖

![image-20201210110538162](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201210110538162.png)

> - 某些情况不要开启，因为某些逆向工程引入的依赖或没有引入的依赖被这个功能完成了导致漏掉了功能实现。



### 默认收起注释，方便源码阅读

File -> Settings -> Editor -> General -> Code Folding -> Documentation comments 勾选

效果是将注释收缩，需要手动点开

![image-20210201223256644](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210201223256644.png)

#### 配套：快速打开/关闭文档注释

右键->Folding->Expand All/Collapse All

快捷键`Ctrl`+`Shift`+`+`/`-`



### xml/java文件注释顶格问题

有时候注释文档的时候生成的注释符号往往会顶在最左，偶尔格式化也不好使

方式：

Editor-Code Style-Java/XML，选择Code Generation，取消Line comment at first column和Block comment at first column的选中

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20171016142201895.jpg" alt="img" style="zoom:50%;" />



### Ctrl+鼠标滚轴修改字体大小

File-->Settings-->Editor-->General-->change font size(Zoom) with Ctrl+Mouse Wheel 勾选

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/398358-20190710185642036-143206239.png)



### 文件标签显示为多行

文件标签增多的时候，默认一行显示并隐藏多出部分，需要手动左右拉

File-->Settings-->Editor-->General-->Editor tabs

1.去掉 show tabls in one row

2.tab limits 增加为20个。

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/398358-20190710190013082-102734055.png)



### 提示选中补全代码（Enter/空格，逗号等）

File->Settings->Editor->General-->Code Comepletion -> insert selected suggestion by pressing space,dot,or other context-dependent keys 勾选上。

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/398358-20190711105514281-1377377645.png)



### 加快Maven项目构建配置

File->Settings->Build->Builds Tools-->Maven -> Runner

在 VM OPtions 中填入 **-DarchetypeCatalog=internal**

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210218113011450.png" alt="image-20210218113011450" style="zoom: 33%;" />



### 设置鼠标悬停显示方法注释

（IDEA2020.3）

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210326103652588.png" alt="image-20210326103652588" style="zoom: 67%;" />



### 设置IDEA控制台使用PowerShell

默认terminal使用的是cmd（新版本IDEA2022.1似乎已经改了）。

setting - Tools - Terminal  修改Shell Path，选择powershell.exe即可。

![image-20220831112520994](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208311125717.png)





## Git使用

代码操作方式均为右键Git的选项。

1. 更新代码

   避免与其他人提交的代码产生冲突导致无法提交

   方式是pull

2. 确认更新完毕（有新代码/无新代码）

3. 提交文件

   添加文件选择add

   只更新代码选择commit file

4. 提交目录 commit Directory

5. 上传 commit and push

> - 提交失败说明本地项目于服务器冲突，需要解决冲突再提交
> - 拉取失败说明服务器代码与本地代码有冲突，需要备份本地冲突代码，还原，再拉取至成功。在将备份的代码添加到相应位置，之后再进行上传。
> - 还原操作：revert
> - 拉取冲突时，也可以fetch（待补充）

### 切换分支

![image-20210326113815007](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210326113815007.png)



## 类注释/方法注释模板

### 插件配置

之前的注释模板不太规范，配置也比较麻烦，目前使用插件配置

![image-20220829141610304](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291416335.png)

有几个好处：

1. 有自带中文翻译方法变量名，可能不太准确，但已经比较方便调整

2. 快捷键，直接在类名方法名使用`ctrl+\`即可自动注释

3. 格式规范，比较符合编辑器显示，如所有@字段 不带冒号，所有变量提供英文中文注释

   ![image-20220829141830042](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291418073.png)

   > 这样的注释在编辑器中移动到方法时会这么显示
   >
   > ![image-20220829141940812](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291419843.png)

4. 仍然可以继续定制化配置

   ![image-20220829142018298](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291420337.png)







## 快捷键

[参考](https://blog.csdn.net/qq_35246620/article/details/53648746)

|                     功能                      |                 快捷键                 |
| :-------------------------------------------: | :------------------------------------: |
|                  格式化代码                   |            `Ctrl`+`Alt`+`L`            |
| 用特定结构包围代码块（try-catch、if-else...） |            `Ctrl`+`Alt`+`T`            |
|                   生成代码                    |             `Alt`+`Insert`             |
|                 类名自动完成                  |          `Ctrl`+`Alt`+`Space`          |
|                查看实现类/方法                | `Ctrl`+`Alt`+ 鼠标左键<br />`Ctrl`+`H` |
|            展开/折叠代码块、注释块            |         `Ctrl`+`Shift`+`+`/`-`         |
|        弹出 `Search Everywhere` 弹出层        |               `Shift`*2                |
|             查看类的所有方法列表              |      `Ctrl`+`F12`<br />`Alt`+`7`       |
|            调用常规的实时代码模板             |         `Tab` 和 `Ctrl + J`。          |







## 推荐插件

https://cdk8s.gitbook.io/github/plugins-settings#cha-jian-tui-jian



## 其他问题

### IDEA点击启动无响应

**问题描述**

版本2021.3.2（其他版本也存在），点击idea图标启动后，显示图案后没反应，后续再次点击也没有反应。

**解决方案**

打开本地的C:\Users(用户名)\AppData文件夹，删除Local和Roaming文件夹里的JetBrainis文件夹。

![在这里插入图片描述](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20210428154143336.png)



### IDEA 2020.1 构建maven项目编译时找不到程序包

**问题描述**

IDEA版本2020.1.1，maven版本3.6.3，构建项目时出现maven依赖无误，编译时提示找不到包

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210218113845175.png" alt="image-20210218113845175" style="zoom:50%;" />

**解决方式**

- 法一：将IDEA版本升级（2020.1.2）

- 法二：去除maven配置文件里的`<localRepository>`配置，在File-->settings-->Build,Execution,Deployment-->maven里面把Local respository指向自己的maven库，File-->Invalidate Caches/Restart 清空缓存重启。

  <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210218115001514.png" alt="image-20210218115001514" style="zoom: 33%;" />



### IDEA 2020.1 无法自动调出 Run Dashboard

https://blog.csdn.net/qq_41740883/article/details/107391472



### IDEA全局搜索快捷键Ctrl+Shift+F失效

个人使用，原因时快捷键冲突。首先排除安装软件的快捷键，如QQ，音乐软件，搜狗输入法等。

另一个时系统快捷键，微软拼音输入法有一个默认切换繁体简体的快捷键，需要配置关闭。通过在点击系统设置-选择微软拼音输入法-按键进入配置。

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220221184959846.png" alt="image-20220221184959846" style="zoom:50%;" />



## 使用技巧

### 重构代码提高可读性/开发效率

#### 同步修改类名/方法名/属性名/包名：

shift+f6  回车确认

![image-20220208004109022](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220208004109022.png)

#### 同步修改方法签名（方法名+方法参数）

ctrl+f6

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220208004214025.png" alt="image-20220208004214025" style="zoom:80%;" />

#### 抽取方法，将部分代码提取为一个公共方法

选中代码，ctrl+alt+m

![image-20220208004505336](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220208004505336.png)

#### 方法内联，将方法还原为代码块

选中方法调用，ctrl+alt+n

![image-20220208004805900](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220208004805900.png)

> - 全部替换，删除这个方法
> - 全部替换，保留这个方法
> - 只替换这一处，保留方法

#### 抽取常量，处理魔法值

选中魔法值，ctrl+alt+c

![image-20220208005159393](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220208005159393.png)

可以进行批量替换重命名

#### 抽取变量，替换为一个公有变量，进行重复调用

选中被重复使用的变量  ctrl+alt+v  

![image-20220208005353353](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220208005353353.png)

#### 抽取为方法参数

选中方法内变量 ctrl+alt+p

![image-20220208012848846](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220208012848846.png)

#### 方法移动

如想要将父类方法移动到子类 选中方法右键refactor-push member down

移动到父类，选 pull member up

![image-20220208013034533](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220208013034533.png)

![image-20220208013121036](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220208013121036.png)



#### 接口抽取

将类中的方法放在一个接口中，同时让这个类实现这个接口

 refactor-extract interface

extract delegate 抽取到另一个类中，不继承

extract superclass 抽取到一个父类，继承它

![image-20220208013253384](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220208013253384.png)



### 断点调试

[参考](https://www.bilibili.com/video/BV1ur4y1P7SV?spm_id_from=333.999.0.0)

#### 行断点

左键点击要停住的行的行号

![image-20220405184859270](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220405184859270.png)



#### 详细断点/源断点

shift+左键点击要停住的行的行号

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220405185023142.png" alt="image-20220405185023142" style="zoom:50%;" />

Suspend选择暂停时机：All同行断点；Thread当前线程才会暂停，用于多线程调试



#### 方法断点

断点打在方法那一行

![image-20220405190755133](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220405190755133.png)

与行断点的区别：会在方法开始和结束时各暂停一次，用于观察方法中参数的变化

可以打在接口方法上，断点会暂停在方法的实现类上



#### 异常断点

用于全局调试监控特定一场，会暂停在发生异常的代码处。

![image-20220405192245677](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220405192245677.png)

配置断点

![image-20220405192313197](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220405192313197.png)



#### 字段断点/读写监控

断点打在属性字段上

![image-20220405192519563](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220405192519563.png)

会暂停在属性被写（设置）的代码片段。



### 源码阅读

#### 搜索

**文件/类搜索**

快捷键：shift + shift（连按两次）

可用于搜索一些非项目，而是依赖中的类

![图片](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291344809.webp)

**字段搜索**

快捷键：

- 全局：Ctrl + shift + F
- 当前文件：Ctrl + F



#### 跳转上次/下次光标位置

用途：查看源码时，会出现多个类来回跳转，这个快捷键方便回溯到特定位置

快捷键：

- 上次：Alt + ←
- 下次：Alt + → 



#### 查看实现类/实现方法

快捷键：Ctrl + Alt + B

会跳转光标所在类或者方法的实现，如果有多个可以进行选择

![image-20220829135102185](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291351284.png)



#### 查看方法调用树

用途：可以查看指定方法所有的调用者和被调用者

快捷键：Ctrl + Alt + H

![图片](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291353319.webp)



#### 查看类关系

用途：查看类的归属关系

快捷键：Ctrl + Alt + U

![image-20220829135455666](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291354702.png)

#### 查看类继承树

用途：查看类的父类、子类的继承关系

快捷键：Ctrl + H

![image-20220829140411757](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291404794.png)

#### 查看定义变量的生命位置/调用位置

如果光标在变量声明处，则查看使用该变量的代码；如果光标在使用变量处，则查看变量的声明位置。

快捷键：Ctrl + B 或者Ctrl按住点击变量

![image-20220829140546216](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291405252.png)

#### 查看代码的提交信息

用途：查看特定行代码的作者以及提交信息

快捷键：在Git管理的代码的行数上右键点击第一个Annotation with Git Blame

![image-20220829140815906](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291408939.png)

![image-20220829140846633](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208291408667.png)

此时可以看到作者，点击可以查看提交。





### Vim

用途：全键盘操作，提高后续开发效率（逼格）

- 既充分利用了 IntelliJ 提供的代码补全，重构，代码浏览等等功能，又可以充分利用 Vim 的多模式，以及 Vim 在编辑器中的高效
- 利用 `~/.ideavimrc` 来复用 Vim 的工作方式，以及充分利用 Idea 提供的 Action

#### 安装插件

- IdeaVim

![image-20220831145934696](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208311459848.png)



#### 进入Vim模式

如果你是用过linux的vim编辑，可能会有一点感觉。

- 启用Vim目前没有快捷键，可以通过setting->keymap中搜索VIM Emulator设置

  ![image-20220831161318724](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208311613761.png)

  设置后可以通过快捷键自由切换vim模式。

  ![image-20220831155351455](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208311553489.png)

  表示vim已启动，光标变为小方块。

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208311554718.png)

#### 进入编辑模式

Vim模式下：

- `i`进入编辑模式，输入变为文本内容；
- `esc`退出编辑模式，输入变为操作；

另外，常规情况下vim定位为文本编辑，vim操作在非编辑区不生效，所以`esc`同时也是由其他区域返回至编辑区的快捷键。

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208311609690.webp)



#### 光标移动

`hjkl` 对应 左下上右

> 个人感觉在不适应/非必须的情况下可以继续使用上下左右方向键。

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208311521485.jpeg)



#### 复制/粘贴

- `y`	复制当前字母
- `yy` 	复制当前行
- `p`	粘贴

> - 部分复制：`v`+上下左右 选择文本  再用`y`复制，后续粘贴

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208311556300.jpeg)







#### 额外：搜索操作

快捷键：ctrl+shift+a

用途：直接按用途搜索操作，enter执行操作

> 可以执行一些没有快捷键的操作

![image-20220831150434209](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208311504254.png)



