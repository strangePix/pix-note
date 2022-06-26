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

### 快捷键生成式注释模板

使用快捷键,在任意地方生成一段写好的注释

#### 创建

打开 `settings` –>`Editor`–>`Live Templates` 显示默认的配置

点击`+`号，选择`Live Template`，自动创建名为`user`的组

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201210114015291.png" alt="image-20201210114015291" style="zoom:50%;" />

设置Abbreviation为`cc`(快捷键设定),描述为`Class Comment`(名字可自定义),Applicable设置为`Java :declaration`

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201210114050314.png" alt="image-20201210114050314" style="zoom:50%;" />

编辑`Template Text`中的内容,内容自定义即可

```java
/**
 *
 * 
 * @author  Pix
 * @date    $date$ $time$
 * @version 1.0
 */
```

点击`Edit Variable`,设置变量

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201210114133815.png" alt="image-20201210114133815" style="zoom:50%;" />

#### 使用方法

注：这种快捷键创建模板可以在任何地方生成注释，无需在类和方法前

以上模板配置后，在类头部输入`cc`字母后,按`Tab`键，即可自动生成自定义注释代码

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201210114319595.png" alt="image-20201210114319595" style="zoom: 50%;" />

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20201210114337551.png" alt="image-20201210114337551" style="zoom:50%;" />



### 创建时生成式类注释模板

#### 类模板

打开 `settings` –>`Editor`–>`File and Code Templates`->`Files`->`Class` 显示默认的配置

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210118144724831.png" alt="image-20210118144724831" style="zoom: 50%;" />

修改右侧代码,添加如下代码块

```java
/**
* @program ${PROJECT_NAME}
*
* @description ${description}
*
* @author Pix
*
* @create ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}
**/
```

修改后`Apply`即可,如图

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210118145303991.png" alt="image-20210118145303991" style="zoom:50%;" />

#### 方法模板

沿用快捷键模板,更贴合方法/接口格式

按照快捷键模板,在user组中再添加一个快捷键,如`mc`,Applicable中可以先勾选Java所有

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210118202753347.png" alt="image-20210118202753347" style="zoom: 67%;" />

模板中输入以下代码

```java
**
 * @Description: $description$
 * @Param: $params$
 * @return: $returns$
 * @Author: Pix
 * @Date: $date$ $time$
 */
```

在Edit variables里面添加参数和返回值的自动取值

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210118161223135.png" alt="image-20210118161223135" style="zoom:50%;" />

#### 使用方法

可以看到,方法注释模板的注释前缀并不完全,

所以调用方法注释模板的方式是 输入`/`+`你设定的快捷键`+`tab`

好处是避免误触调出模板,与注释格式更贴合,并且光标会直接切换到description上

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210118161519287.png" alt="image-20210118161519287" style="zoom:67%;" />



> - 方法模板里注释开头没有/\**而是直接**,原因是生成的注释位于方法外,这样做才能获取方法的参数
> - 方法模板中的$time$不同于类模板的${DATE},这表示生成注释后光标会跳转到这里
> - 快捷键的设置会影响到常规快捷代码使用,如设定m,就会在调用带m方法的列表中出现,可以和\*结合,如设成`*m`,这样调用模板的方式就变成/\*m+`tab`
> - 快捷键的组合方式也可以修改,`tab`改成`enter`什么的,在这里
>
> <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210118163855381.png" alt="image-20210118163855381" style="zoom:50%;" />

#### 另一种方法模板(优化)

可以看到方法参数的注释自动生成的只是参数名数组,写在一起,不是很实用

参考[方法模板](https://segmentfault.com/a/1190000021575635)  [优化注释模板](https://blog.csdn.net/qq_46365857/article/details/110730442)

方法模板修改为

```java
**
 * @description $description$ $params$
 * @return $return$        
 * @author lizehao
 * @date $date$ $time$
 */
```

> $description$	$params$	$returns$之间均为\t

$params$的表达式从`methodParameters()`修改为

```groovy
groovyScript("
	def result = '';
    def params = \"${_1}\".replaceAll( '[\\\\[|\\\\]|\\\\s]', '').split(',').toList();
    if (params.size() > 1) {
        result +='\\n * @param ' + params[0] + ' \\n';
        for(i = 1; i < params.size(); i++) {
            result += ' * @param ' + params[i] +
                ((i < params.size() - 1) ? ' \\n' : '');
        };
    }else if (params.size()==1) {
        if (params[0] != '') {
            result+='\\n * @param ' +params[0] + ' ';
        }
    }else {
        result += params[0] + ' ';
    };
	return result"
,methodParameters())
```

![image-20210316172248726](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210316172248726.png)

最终效果为

快捷键/\**m+`enter`

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210118204528947.png" alt="image-20210118204528947" style="zoom:50%;" />

> - 对齐出现问题可勾选"根据样式重新格式化"
>
> <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210118183152330.png" alt="image-20210118183152330" style="zoom: 50%;" />
>
> - 以上代码优化了一点:参数列表及返回值为空时,不显示相关注释(@param和@return)
>
> - 但存在一点小瑕疵,就是如果参数列表或返回值为空时,虽然不显示相关注释,但会在稍远的地方出现一道红线,提示你输入内容,那便是被隐藏掉的原注释的输入地点
>
>   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210118212213451.png" alt="image-20210118212213451" style="zoom: 50%;" />
>
> - 处理'@param xxx' tag description is missing问题:
>
>   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210118212426729.png" alt="image-20210118212426729" style="zoom:50%;" />
>
>   `File`-`Settings`-`Editor`-`Inspections`
>
>   搜索框搜索javadoc,在Javadoc取消勾选`Declaration has Javadoc problems`
>
>   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20210110145621679.png" alt="在这里插入图片描述" style="zoom: 50%;" />

### 自定义注释模板不完全变量参考

|     预定义变量      |                           描述信息                           |
| :-----------------: | :----------------------------------------------------------: |
|       ${NAME}       |                 the name of the current file                 |
|   ${PACKAGE_NAME}   |     name of the package in which the new file is created     |
|       ${USER}       |                current user system login name                |
|       ${DATE}       |                     current system date                      |
|       ${TIME}       |                     current system time                      |
|       ${YEAR}       |                         current year                         |
|      ${MONTH}       |                        current month                         |
| ${MONTH_NAME_SHORT} | first 3 letters of the current month name. Example: Jan, Feb, etc. |
| ${MONTH_NAME_FULL}  | full name of the current month. Example: January, February, etc. |
|       ${DAY}        |                   current day of the month                   |
|  ${DAY_NAME_SHORT}  | first 3 letters of the current day name. Example: Mon, Tue, etc. |
|  ${DAY_NAME_FULL}   | full name of the current day. Example: Monday, Tuesday, etc. |
|       ${HOUR}       |                         current hour                         |
|      ${MINUTE}      |                        current minute                        |
|   ${PROJECT_NAME}   |               the name of the current project                |



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

##### 行断点

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

