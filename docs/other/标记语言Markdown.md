# 标记语言-Markdown



## 代码块格式选择及注释方式

- linux命令：shell  bash

  ```shell
  # 注释
  cat docker-compose.yml
  ```

- 命令行：powershell

  ```powershell
  # 注释
  mysql -u root -p
  ```

- ini配置文件：ini 

  ```ini
  # 注释
  [client]
  default-character-set=utf8mb4
  ```

- mysql命令：mysql

  ```mysql
  -- 注释
  insert into goods(id,name) values (default,"test商品");
  ```

- properties配置文件

- yml配置文件： yaml

  ```yaml
  spring:
  	ncaos:
  		application:
  ```

- xml文档

- 脚本



## 编写规范

[参考1](https://github.com/fex-team/styleguide) [参考2](https://github.com/baixing/FE-Blog/issues/6) [参考3](https://www.jianshu.com/p/3b638180e42c)

> 有些是对编辑器的要求,还有一些不直观的,我就省略了



### 标题



#### 层级

标题分为四级

- 一级标题:文章标题
- 二级标题:文章主要部分大标题
- 三级标题:二级标题下面一级的小标题
- 四级标题:三级标题下面某一方面的小标题

示例:

```
# 一级标题

## 二级标题

### 三级标题

#### 四级标题
```



#### 原则

- 标题和内容间必须「MUST」有一个空行
- 一级标题下,不能直接出现三级标题
- 标题要避免孤立编号(即统计标题只有一个)
- 下级标题不重复上一级标题的名字
- 谨慎使用四级标题,保持层级简单,避免出现过于复杂的章节
- 如果三级标题下有并列性内容,建议只使用项目列表



### 中英文混排

应该「SHOULD」采用如下规则：

- 英文,数字和空格使用半角字符,中文文字,标点使用全角字符,符号另行讨论

- 英文与数字,符号(无论全角或半角)之间**不加空格**

- 中文文字与英文、数字及 @ # $ % ^ & * . ( ) 等符号之间**加空格**

- 数字与英文单位之间**不加空格**,数字与符号单位之间**加空格**(除了半角的°和%)

  ```
  正确：一部容量为 16GB 的智能手机
  正确：我家的光纤入屋宽带有 10Gbps，SSD 一共有 20TB
  正确：今天是 233° 的高温，新 MacBook Pro 有 15% 的 CPU 性能提升。
  ```

- 如果括号内有中文，则使用中文括号

- 如果括号中的内容全部都是英文，则使用半角英文括号

- 当半角符号 / 表示「或者」之意时，与前后的字符之间均不加空格

> - 半角/全角：[全角和半角](https://zh.wikipedia.org/wiki/%E5%85%A8%E5%BD%A2%E5%92%8C%E5%8D%8A%E5%BD%A2)
>
>   半角指输入一个字符占用1个标准字符位置，一个字节，如,.?'!
>
>   全角指输入一个字符占用2个标准字符/半角字符位置，两个字节如 ，。？‘！
>
> - 其它具体例子推荐[阅读这里](https://github.com/sparanoid/chinese-copywriting-guidelines)



### 标点符号

#### 英文符号

- 如果整句为英文，则该句使用英文/半角标点。

#### 中文符号

- 中文语句采取全角符号

- 省略号使用`……`标准形式（占用2汉字空间，6个省略点，快捷键`shift`+`6`对应英文的`^`）

- 用直角引号（「」）代替双引号（“”），全角，不同输入法的具体设置方法请[参考这里](http://www.zhihu.com/question/19755746)

- 相应的，（『』）代替单引号（‘’）

  ```
  一般: “老师，‘有条不紊’的‘紊’是什么意思？”
  规范: 「老师，『有条不紊』的『紊』是什么意思？」
  ```

- 省略号使用「……」，而「。。。」仅用于表示停顿

- 其它可以参考[知乎规范](http://www.zhihu.com/question/20414919)

> - **直角引号（「」『』）的快捷输入方法**
>
> 使用win10自带微软拼音输入法可较快输出，方式是（开启U模式的前提下）输入uubd可在第二页找到
>
> （翻下一页快捷键是`=`）
>
> <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210121202827220.png" alt="image-20210121202827220" style="zoom:50%;" />
>
> - 半角的直角引号（｢｣）继承自日本字符集,经常不受中文字体支持,可考虑暂不使用



### 数值

- 数字一律使用半角格式
- 千位以上数字，应当添加千分号（半角逗号），4~6位选用，7位以上必须
- 货币单位写在数字前，或者在数字后写货币单位中文
- 数值范围用`~`连接，带有单位时，两个数字都要带单位



### 结构

软件手册参考结构：

**简介**（Introduction）： [必备] [文件] 提供对产品和文档本身的总体的、扼要的说明

**快速上手**（Getting Started）：[可选] [文件] 如何最快速地使用产品

**入门篇**（Basics）： [必备] [目录] 又称”使用篇“，提供初级的使用教程

- **环境准备**（Prerequisite）：[必备] [文件] 软件使用需要满足的前置条件
- **安装**（Installation）：[可选] [文件] 软件的安装方法
- **设置**（Configuration）：[必备] [文件] 软件的设置

**进阶篇**（Advanced)：[可选] [目录] 又称”开发篇“，提供中高级的开发教程

**API**（Reference）：[可选] [目录|文件] 软件 API 的逐一介绍

**FAQ**：[可选] [文件] 常见问题解答

**附录**（Appendix）：[可选] [目录] 不属于教程本身、但对阅读教程有帮助的内容

- **Glossary**：[可选] [文件] 名词解释
- **Recipes**：[可选] [文件] 最佳实践
- **Troubleshooting**：[可选] [文件] 故障处理
- **ChangeLog**：[可选] [文件] 版本说明
- **Feedback**：[可选] [文件] 反馈方式

---

参考范例：[Atom手册](https://flight-manual.atom.io/) [Redux手册](https://redux.js.org/introduction/getting-started)







## 部分语法

参考:[Github式语法](https://docs.github.com/cn/github/writing-on-github/getting-started-with-writing-and-formatting-on-github)





### 引用代码

```
行内代码就是不用代码块,在一行中显示代码的方式,如`System.out.println("Hello World!");`

​```Java
// 代码块则是这样:
System.out.println("Hello World!");
​```
```

#### 效果

行内代码就是不用代码块,在一行中显示代码的方式,如`System.out.println("Hello World!");`

```Java
// 代码块则是这样:
System.out.println("Hello World!");
```



### 链接/锚点

```
[百度网址](https://www.baidu.com)
[锚点](#链接/锚点)
```

#### 效果

[百度网址](https://www.baidu.com)
[锚点](#链接/锚点)



### 图片

```
![image-20210129174140288](补充内容.assets\image-20210129174140288.png)
```

#### 效果

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210129174140288.png" alt="image-20210129174140288" style="zoom:50%;" />

### 样式文本

```
**粗体文本**
*斜体文本*
~~错误文本~~
**粗体文本 _嵌入斜体_ 文本**
***全部粗体斜体***
==高亮==
```

#### 效果

**粗体文本**
*斜体文本*
~~错误文本~~
**粗体文本 _嵌入斜体_ 文本**
***全部粗体斜体***
==高亮==



### 引用文本

```
司马迁曾写到:
># 人固有一死，
> 或重于泰山，或轻于鸿毛，用之所趋异也。
```

#### 效果

司马迁曾写到:

># 人固有一死，
>
>或重于泰山，或轻于鸿毛，用之所趋异也。



### 自动生成大纲/目录

```
[TOC]
```

#### 效果

截图:

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210121112257546.png" alt="image-20210121112257546" style="zoom:25%;" />



### 列表

```
- 无序列表1
- 无序列表
   - 嵌套无序列表
1. 有序列表1
2. 有序列表2
```

#### 效果

- 无序列表1
- 无序列表
  - 嵌套无序列表

1. 有序列表1
2. 有序列表2



### 脚注/注释

```
这是第三个有注脚的文本。[^888]   
测试重复注脚。[^777] 
测试重复注脚.[^777]
[^777]:重复注脚会让注释产生多个跳转链接
---
[^888]:第三条注释
```

> - [^注脚内容] 不是必须要数字,中英皆可,看需求和个人选择

#### 效果

这是第三个有注脚的文本。[^888]   
测试重复注脚。[^777] 
测试重复注脚.[^777]

[^777]: 重复注脚会让注释产生多个跳转链接



### 表格

```
| 左对齐 | 居中 | 右对齐 |
| :--- |:---:| ---:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |
```

#### 效果

| 左对齐        |      居中       | 右对齐 |
| :------------ | :-------------: | -----: |
| col 3 is      | some wordy text |  $1600 |
| col 2 is      |    centered     |    $12 |
| zebra stripes |    are neat     |     $1 |



### 任务清单

```
- [x] 支持[链接]()、**格式化** 和 <del>HTML 标签</del> 等语法
- [x] 需要使用列表语法来激活（无序或有序列表均可）
- [x] 这是一个已完成项目
- [ ] 这是一个未完成项目
  - [ ] 第一项嵌套子任务 #1234
  - [ ] 接下来的嵌套子任务 #4321
```

#### 效果

- [x] 支持[链接]()、**格式化** 和 <del>HTML 标签</del> 等语法
- [x] 需要使用列表语法来激活（无序或有序列表均可）
- [x] 这是一个已完成项目
- [ ] 这是一个未完成项目
  - [ ] 第一项嵌套子任务 #1234
  - [ ] 接下来的嵌套子任务 #4321



### 分割线

```
---
```

#### 效果

---









---

[^888]: 第三条注释







## Markdown编辑器typora



### 快捷键

[参考](https://support.typora.io/Shortcut-Keys/#change-shortcut-keys)



#### 使用

|       用途       |       快捷键       |
| :--------------: | :----------------: |
|   调出大纲面板   | `ctrl`+`shift`+`1` |
| 调出文件内容面板 | `ctrl`+`shift`+`2` |
|  调出文件树面板  | `ctrl`+`shift`+`3` |
|    源代码模式    |     `ctrl`+`/`     |
|   专注模式[^4]   |        `f8`        |

#### 编辑

|             用途              |           快捷键           |
| :---------------------------: | :------------------------: |
| **代码去除缩进**[^1]/添加缩进 |    `shift`+`tab`/`tab`     |
|      选取一行/选取单元格      |         `ctrl`+`l`         |
|   选取同类型片段/选取单元行   |         `ctrl`+`e`         |
|          删除单元行           | `ctrl`+`shift`+`backspace` |



#### 格式

|       用途        |     快捷键     |     示例      |
| :---------------: | :------------: | :-----------: |
|     清理格式      |   `ctrl`+`\`   |               |
| 一级~六级标题[^2] | `ctrl`+`1`~`6` |               |
|       加粗        |   `ctrl`+`b`   |   **粗体**    |
|       斜体        |   `ctrl`+`i`   |    *斜体*     |
|     链接文本      |   `ctrl`+`k`   | [链接文本]()  |
|      下划线       |   `ctrl`+`u`   | <u>下划线</u> |
|                   |                |               |
|                   |                |               |



#### 创建

|       用途        |                快捷键                 |
| :---------------: | :-----------------------------------: |
|       表格        |              `ctrl`+`t`               |
|    代码块[^3]     |          `ctrl`+`shift`+`k`           |
|      公式块       |          `ctrl`+`shift`+`m`           |
| 有序列表/无序列表 | `ctrl`+`shift`+`[`/`ctrl`+`shift`+`]` |
|       引用        |          `ctrl`+`shift`+`q`           |
|       图片        |          `ctrl`+`shift`+`i`           |





[^1]: 用于复制代码块时,去除前面不合理的空白缩进部分
[^2]: 取消标题格式用`ctrl`+`0`
[^3]: 注意可能和输入法快捷键冲突（指搜狗）
[^4]: 开启专注模式的效果是：编辑器高亮显示正在编辑的段落，灰化其他段落





### 主题设置

#### 主题下载

- 官方主题提供:http://theme.typora.io/
- 网络搜索下载

#### 主题安装

1. 在Typora编辑器中打开"偏好设置",找到主题选项,打开主题文件夹(同自动编号)
2. 将下载的主题中主题名的文件夹拷贝到themes文件夹,同名的css文件也拷贝到该文件夹
3. 重新启动Typora,在主题中选择刚下载的主题名即可随时替换

#### 部分主体展示

- Vue风格

  [github](https://github.com/MamoruDS/typora-vue-dark-theme)

  <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210120230225423.png" alt="image-20210120230225423" style="zoom: 33%;" />

- 知乎一个用户提供的

  [github](https://github.com/Theigrams/My-Typora-Themes)

  <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210120230358076.png" alt="image-20210120230358076" style="zoom:33%;" />





### 自动编号

[参考](https://support.typora.io/Auto-Numbering/)

#### 标题自动编号

**效果**

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/1.png" alt="1个" style="zoom: 33%;" />

**使用**

1. 在Typora编辑器中打开"偏好设置",找到主题选项,打开主题文件夹

   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210120165520004.png" alt="image-20210120165520004" style="zoom: 33%;" />

2. 打开其中的themes文件夹,拷贝其中一个css文件,改名为base.user.css

3. 将base.user.css其中内容替换为如下代码

   ```css
   /** initialize css counter */
   #write {
       counter-reset: h1
   }
   
   h1 {
       counter-reset: h2
   }
   
   h2 {
       counter-reset: h3
   }
   
   h3 {
       counter-reset: h4
   }
   
   h4 {
       counter-reset: h5
   }
   
   h5 {
       counter-reset: h6
   }
   
   /** put counter result into headings */
   #write h1:before {
       counter-increment: h1;
       content: counter(h1) ". "
   }
   
   #write h2:before {
       counter-increment: h2;
       content: counter(h1) "." counter(h2) ". "
   }
   
   #write h3:before,h3.md-focus.md-heading:before /** override the default style for focused headings */ {
       counter-increment: h3;
       content: counter(h1) "." counter(h2) "." counter(h3) ". "
   }
   
   #write h4:before,h4.md-focus.md-heading:before {
       counter-increment: h4;
       content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) ". "
   }
   
   #write h5:before,h5.md-focus.md-heading:before {
       counter-increment: h5;
       content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "
   }
   
   #write h6:before,h6.md-focus.md-heading:before {
       counter-increment: h6;
       content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) ". "
   }
   
   /** override the default style for focused headings */
   #write>h3.md-focus:before,
   #write>h4.md-focus:before,
   #write>h5.md-focus:before,
   #write>h6.md-focus:before,h3.md-focus:before,h4.md-focus:before,h5.md-focus:before,h6.md-focus:before {
       color: inherit;
       border: inherit;
       border-radius: inherit;
       position: inherit;
       left:initial;
       float: none;
       top:initial;
       font-size: inherit;
       padding-left: inherit;
       padding-right: inherit;
       vertical-align: inherit;
       font-weight: inherit;
       line-height: inherit;
   }
   ```

4. 保存后重启Typora软件

> - 当前css配置会为1~6级标题都编号,如果不想这样可以自己修改



#### 目录/侧边栏自动编号

上述配置只能在主界面自动显示编号,但在侧边栏和自动生成的目录中,是没有编号的

所以需要在base.user.css中继续添加一些样式,参考提供的网址,下面给出我个性化的完整css:

> 我自己设置的规则是:
>
> - 正文里只给h3添加编号,格式是 三级编号. [标题]
> - 侧边栏和目录只给h2,h3编号
> - h2为 二级编号. [标题]
> - h3为 二级编号.三级编号 [标题]

```css
/**************************************
 * Header Counters in TOC
 **************************************/



/* No link underlines in TOC */
.md-toc-inner {
    text-decoration: none;
}

.md-toc-content {
    counter-reset: h1toc
}

.md-toc-h1 {
    margin-left: 0;
    font-size: 1.5rem;
    counter-reset: h2toc
}

.md-toc-h2 {
    font-size: 1.1rem;
    margin-left: 2rem;
    counter-reset: h3toc
}

.md-toc-h3 {
    margin-left: 3rem;
    font-size: .9rem;
    counter-reset: h4toc
}

.md-toc-h4 {
    margin-left: 4rem;
    font-size: .85rem;
    counter-reset: h5toc
}

.md-toc-h5 {
    margin-left: 5rem;
    font-size: .8rem;
    counter-reset: h6toc
}

.md-toc-h6 {
    margin-left: 6rem;
    font-size: .75rem;
}

.md-toc-h1:before {
    color: black;
    counter-increment: h1toc;
}

.md-toc-h1 .md-toc-inner {
    margin-left: 0;
}

.md-toc-h2:before {
    color: black;
    counter-increment: h2toc;
    content: counter(h2toc) ". "
}

.md-toc-h2 .md-toc-inner {
    margin-left: 0;
}

.md-toc-h3:before {
    color: black;
    counter-increment: h3toc;
    content: counter(h2toc) "." counter(h3toc) " "
}

.md-toc-h3 .md-toc-inner {
    margin-left: 0;
}

.md-toc-h4:before {
    color: black;
    counter-increment: h4toc;
}

.md-toc-h4 .md-toc-inner {
    margin-left: 0;
}

.md-toc-h5:before {
    color: black;
    counter-increment: h5toc;
}

.md-toc-h5 .md-toc-inner {
    margin-left: 0;
}

.md-toc-h6:before {
    color: black;
    counter-increment: h6toc;
}

.md-toc-h6 .md-toc-inner {
    margin-left: 0;
}


/**************************************
 * Sidebar
 **************************************/

.sidebar-content {
    counter-reset: h1
}

.outline-h1 {
    counter-reset: h2
}

.outline-h2 {
    counter-reset: h3
}

.outline-h3 {
    counter-reset: h4
}

.outline-h4 {
    counter-reset: h5
}

.outline-h5 {
    counter-reset: h6
}

.outline-h1>.outline-item>.outline-label:before {
    counter-increment: h1;
}

.outline-h2>.outline-item>.outline-label:before {
    counter-increment: h2;
    content: counter(h2) ". "
}

.outline-h3>.outline-item>.outline-label:before {
    counter-increment: h3;
    content: counter(h2) "." counter(h3) " "
}

.outline-h4>.outline-item>.outline-label:before {
    counter-increment: h4;
}

.outline-h5>.outline-item>.outline-label:before {
    counter-increment: h5;
}

.outline-h6>.outline-item>.outline-label:before {
    counter-increment: h6;
}

/** initialize css counter */
#write {
    counter-reset: h1
}
 
h1 {
    counter-reset: h2
}
 
h2 {
    counter-reset: h3
}
 
h3 {
    counter-reset: h4
}
 
h4 {
    counter-reset: h5
}
 
h5 {
    counter-reset: h6
}

/** put counter result into headings */
#write h1:before {
    counter-increment: h1;
}

#write h2:before {
    counter-increment: h2;
}

#write h3:before,h3.md-focus.md-heading:before /** override the default style for focused headings */ {
    counter-increment: h3;
    content: counter(h3) ". "
}

#write h4:before,h4.md-focus.md-heading:before {
    counter-increment: h4;

}

#write h5:before,h5.md-focus.md-heading:before {
    counter-increment: h5;

}

#write h6:before,h6.md-focus.md-heading:before {
    counter-increment: h6;

}
```

