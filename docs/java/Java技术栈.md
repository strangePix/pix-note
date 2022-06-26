# Java

## 安装

### Windows

- 前提：  已通过运行jdk-8u201-windows-x64.exe程序安装Java；安装目录选择默认，一般为C:\Program Files\Java

- 环境变量配置：

  Path变量值添加 ;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

  添加变量JAVA_HOME，值为JDK安装位置，如C:\Program Files\Java\jdk1.8.0_201

  添加变量CLASSPATH，值为 .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar

- 检验安装

  控制台分别输入java，javac，java -version命令，显示JDK相关信息



### Linux



## Java基本数据类型

### 八种基本数据类型

- 六种数字类型：
  - 四种整数类型：`byte`，`short`，`int`，`long`
  - 两种浮点型：`float`，`double`
- 一种字符类型：`char`
- 一种布尔类型：`boolean`

### 默认值，占用空间，取值范围

| 基本类型  | 位数 | 字节 | 默认值  | 取值范围                                   |
| :-------- | :--- | :--- | :------ | ------------------------------------------ |
| `byte`    | 8    | 1    | 0       | -128 ~ 127                                 |
| `short`   | 16   | 2    | 0       | -32768 ~ 32767                             |
| `int`     | 32   | 4    | 0       | -2147483648 ~ 2147483647                   |
| `long`    | 64   | 8    | 0L      | -9223372036854775808 ~ 9223372036854775807 |
| `char`    | 16   | 2    | 'u0000' | 0 ~ 65535                                  |
| `float`   | 32   | 4    | 0f      | 1.4E-45 ~ 3.4028235E38                     |
| `double`  | 64   | 8    | 0d      | 4.9E-324 ~ 1.7976931348623157E308          |
| `boolean` | 1    |      | false   | true、false                                |

> - boolean的位数逻辑上是1位，实际依赖于JVM厂商实现，考虑计算机高效存储因素。

### 包装类型与基本类型的区别

- 包装类不赋值默认为null，基本类型有默认值且不为null
- 包装类型可用于泛型，基本类型不能
- 基本数据类型的局部变量存放在虚拟机栈的局部变量表中，基本数据类型的成员变量（非静态）存放在虚拟机堆中。包装类型属于对象类型，几乎所有对象实例均存在于堆中。
- 相对于包装类型，基本数据类型占用空间极小。

> **"几乎所有对象实例均存在于堆中"**
>
>  HotSpot 虚拟机引入了 JIT 优化之后，会对对象进行逃逸分析，如果发现某一个对象并没有逃逸到方法外部，那么就可能通过标量替换来实现栈上分配，而避免堆上分配内存。

> **基本数据类型存放在栈中是一个常见的误区！** 基本数据类型的成员变量如果没有被 `static` 修饰的话（不建议这么使用，应该要使用基本数据类型对应的包装类型），就存放在堆中。
>
> ```java
> class BasicTypeVar{
>   private int x;
> }
> ```

### 包装类型的缓存机制

Java 基本数据类型的包装类型的大部分都用到了缓存机制来提升性能。

- `Byte`,`Short`,`Integer`,`Long` 这 4 种包装类默认创建了数值 **[-128，127]** 的相应类型的缓存数据，`Character` 创建了数值在 **[0,127]** 范围的缓存数据，`Boolean` 直接返回 `True` or `False`。

- 如果超出对应范围仍然会去创建新的对象，缓存的范围区间的大小只是在性能和资源之间的权衡。
- 两种浮点数类型的包装类 `Float`,`Double` 并没有实现缓存机制。

#### Integer缓存源码

```java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static {
        // high value may be configured by property
        int h = 127;
    }
}
```

### 所有整形包装类对象之间的值比较，全部用equals方法

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20210422164544846.png)

### 自动装箱与拆箱

#### 概念

- **装箱**：将基本类型用它们对应的引用类型包装起来；
- **拆箱**：将包装类型转换为基本数据类型；

#### 本质

```java
Integer i = 10;  //装箱
int n = i;   //拆箱
```

通过字节码可以观察到：

- 装箱就是调用了对应包装类的`valueOf()`方法
- 拆箱就是调用对应包装类的`xxxValue()`方法

即等价于：

```java
Integer i = Integer.valueOf(10);
int n = i.intValue();
```

#### 性能问题

**如果频繁拆装箱的话，也会严重影响系统的性能。我们应该尽量避免不必要的拆装箱操作**



## String 字符串

### String为什么是不可变的

`String` 类中使用 `final` 关键字修饰字符数组来保存字符串。

```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
    private final char value[];
	//...
}
```

- 保存字符串的数组被 `final` 修饰且为私有的，并且`String` 类没有提供/暴露修改这个字符串的方法。
- `String` 类被 `final` 修饰导致其不能被继承，进而避免了子类破坏 `String` 不可变。

> 在 Java 9 之后，`String` 、`StringBuilder` 与 `StringBuffer` 的实现改用 `byte` 数组存储字符串。
>
> ```java
> public final class String implements java.io.Serializable,Comparable<String>, CharSequence {
>     // @Stable 注解表示变量最多被修改一次，称为“稳定的”。
>     @Stable
>     private final byte[] value;
> }
> 
> abstract class AbstractStringBuilder implements Appendable, CharSequence {
>     byte[] value;
> 
> }
> ```
>
> **为何要将 `String` 的底层实现由 `char[]` 改成了 `byte[]` ?**
>
> 新版的 String 其实支持两个编码方案： Latin-1 和 UTF-16。
>
> 如果字符串中包含的汉字没有超过 Latin-1 可表示范围内的字符，那就会使用 Latin-1 作为编码方案。Latin-1 编码方案下，`byte` 占一个字节(8 位)，`char` 占用 2 个字节（16），`byte` 相较 `char` 节省一半的内存空间。
>
> JDK 官方就说了绝大部分字符串对象只包含 Latin-1 可表示的字符。
>
> 如果字符串中包含的汉字超过 Latin-1 可表示范围内的字符，`byte` 和 `char` 所占用的空间是一样的。
>
> 参考：https://openjdk.java.net/jeps/254 



### 字符串拼接用“+” 还是 StringBuilder?

Java 语言本身并不支持运算符重载，“+”和“+=”是专门为 String 类重载过的运算符，也是 Java 中仅有的两个重载过的元素符。

执行代码：

```java
String str1 = "he";
String str2 = "llo";
String str3 = "world";
String str4 = str1 + str2 + str3;
```

观察字节码：

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220422161637929.png)

说明：字符串对象通过“+”的字符串拼接方式，实际上是**通过 `StringBuilder` 调用 `append()` 方法实现**的，拼接完成之后调用 `toString()` 得到一个 `String` 对象 。

所以导致一个问题：循环内频繁使用“+”进行字符串的拼接的话，**编译器不会创建单个 `StringBuilder` 以复用，会导致创建过多的 `StringBuilder` 对象**。

而手动在循环外先创建`StringBuilder`对象，就可以避免这个问题。



### 字符串常量池的了解（待补充）

**字符串常量池** 是 JVM 为了提升性能和减少内存消耗针对字符串（String 类）专门开辟的一块区域，主要目的是为了避免字符串的重复创建。

**待补充**



### intern方法用途

`String.intern()` 是一个 native（本地）方法，其作用是将指定的字符串对象的引用保存在字符串常量池中。

分为两种情况：

- 如果字符串常量池中保存了对应的字符串对象的引用，就直接返回该引用。
- 如果字符串常量池中没有保存了对应的字符串对象的引用，那就在常量池中创建一个指向该字符串对象的引用并返回。

```java
// 在堆中创建字符串对象”Java“
// 将字符串对象”Java“的引用保存在字符串常量池中
String s1 = "Java";
// 直接返回字符串常量池中字符串对象”Java“对应的引用
String s2 = s1.intern();
// 会在堆中在单独创建一个字符串对象
String s3 = new String("Java");
// 直接返回字符串常量池中字符串对象”Java“对应的引用
String s4 = s3.intern();
// s1 和 s2 指向的是堆中的同一个对象
System.out.println(s1 == s2); // true
// s3 和 s4 指向的是堆中不同的对象
System.out.println(s3 == s4); // false
// s1 和 s4 指向的是堆中的同一个对象
System.out.println(s1 == s4); //true
```

个人理解就是返回这个对象的字符串常量池的引用，有就直接返回，没有就加入常量池再返回。



## BigDecimal(待补充)

https://javaguide.cn/java/basis/bigdecimal.html#bigdecimal-%E4%BB%8B%E7%BB%8D



## I/O



### 何为IO？

I/O（**I**nput/**O**utpu） 即**输入／输出** 

#### 计算机结构角度

根据冯.诺依曼结构，计算机结构分为 5 大部分：运算器、控制器、存储器、输入设备、输出设备。

![冯诺依曼体系结构](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20190624122126398.jpeg)

输入设备（比如键盘）和输出设备（比如显示器）都属于外部设备。

网卡、硬盘这种既可以属于输入设备，也可以属于输出设备。

**从计算机结构的视角来看的话， I/O 描述了计算机系统与外部设备之间通信的过程。**

#### 应用程序角度

操作系统相关的知识：为了保证操作系统的稳定性和安全性，一个进程的地址空间划分为 **用户空间（User space）** 和 **内核空间（Kernel space ）** 。

像我们平常运行的应用程序都是运行在用户空间，只有内核空间才能进行系统态级别的资源有关的操作，比如文件管理、进程通信、内存管理等等。也就是说，我们想要进行 IO 操作，一定是要依赖内核空间的能力。

并且，用户空间的程序不能直接访问内核空间，当想要执行 IO 操作时，由于没有执行这些操作的权限，只能发起**系统调用**请求操作系统帮忙完成。

我们在平常开发过程中接触最多的就是 **磁盘 IO（读写文件）** 和 **网络 IO（网络请求和响应）**。

**从应用程序的视角来看的话，我们的应用程序对操作系统的内核发起 IO 调用（系统调用），操作系统负责的内核执行具体的 IO 操作。也就是说，我们的应用程序实际上只是发起了 IO 操作的调用而已，具体 IO 的执行是由操作系统的内核来完成的。**

当应用程序发起 I/O 调用后，会经历两个步骤：

1. 内核等待 I/O 设备准备好数据
2. 内核将数据从内核空间拷贝到用户空间。





### 序列化/反序列化

- **序列化**：将数据结构/对象转换为二进制字节流的过程
- **反序列化**：将二进制字节流转换为数据结构/对象的过程

对于 Java 这种面向对象编程语言来说，我们序列化的都是对象（Object）也就是实例化后的类(Class)，但是在 C++这种半面向对象的语言中，struct(结构体)定义的是数据结构类型，而 class 对应的是对象类型。

> **序列化**（serialization）在计算机科学的数据处理中，是指**将数据结构或对象状态转换成可取用格式（例如存成文件，存于缓冲，或经由网络中发送），以留待后续在相同或另一台计算机环境中，能恢复原先状态的过程**。依照序列化格式重新获取字节的结果时，可以利用它来产生与原始对象相同语义的副本。对于许多对象，像是使用大量引用的复杂对象，这种序列化重建的过程并不容易。面向对象中的对象序列化，并不概括之前原始对象所关系的函数。这种过程也称为对象编组（marshalling）。从一系列字节提取数据结构的反向操作，是反序列化（也称为解编组、deserialization、unmarshalling）。

**序列化的主要目的是通过网络传输对象或者说是将对象存储到文件系统、数据库、内存中。**



#### 序列化对象时，部分字段不想序列化

对于不想进行序列化的变量，使用 `transient` 关键字修饰。

`transient` 关键字的作用是：阻止实例中那些用此关键字修饰的的变量序列化；当对象被反序列化时，被 `transient` 修饰的变量值不会被持久化和恢复。

> - `transient` 只能修饰变量，不能修饰类和方法。
> - `transient` 修饰的变量，在反序列化后变量值将会被置成类型的默认值。例如，如果是修饰 `int` 类型，那么反序列后结果就是 `0`。
> - `static` 变量因为不属于任何对象(Object)，所以无论有没有 `transient` 关键字修饰，均不会被序列化。



#### 实际开发的序列化/反序列化场景

- 对象进行网络传输（如远程方法调用）之前，需要先进行序列化，接收序列化后需要在进行反序列化。
- 将对象存储到文件需要序列化，从文件读取出对象需要反序列化
- 将对象存储到缓存数据库（如Redis）需要序列化，从缓存数据库读取对象需要反序列化



#### 序列化协议对应 TCP/IP 4层模型的哪一层？

##### TCP/IP四层模型

1. 应用层
2. 传输层
3. 网络层
4. 网络接口层

![TCP/IP 4层模型](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/6ecb84cd-4227-4c7b-a2e8-b77054604400-20200802201216504.png)

OSI 七层协议模型中，表示层做的事情主要就是对应用层的用户数据进行处理转换为二进制流。反过来的话，就是将二进制流转换成应用层的用户数据。

因为OSI 七层协议模型中的应用层、表示层和会话层对应的都是 TCP/IP 四层模型中的应用层，所以**序列化协议属于 TCP/IP 协议应用层**的一部分。



#### 常见序列化协议（待补充）

待补充 https://javaguide.cn/java/basis/serialization.html#%E5%B8%B8%E8%A7%81%E5%BA%8F%E5%88%97%E5%8C%96%E5%8D%8F%E8%AE%AE%E5%AF%B9%E6%AF%94





### IO分类

- 按照流的流向分，可以分为输入流和输出流；
- 按照操作单元划分，可以划分为字节流和字符流；
- 按照流的角色划分为节点流和处理流。

Java IO 流共涉及 40 多个类，这些类看上去很杂乱，但实际上很有规则，而且彼此之间存在非常紧密的联系， Java IO 流的 40 多个类都是从如下 4 个抽象类基类中派生出来的。

- InputStream/Reader: 所有的输入流的基类，前者是字节输入流，后者是字符输入流。
- OutputStream/Writer: 所有输出流的基类，前者是字节输出流，后者是字符输出流。

#### 操作方式分类

![IO-操作方式分类](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dfdgdgdgfdfgdfggdf3343443.png)

#### 操作对象分类

![IO-操作对象分类](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dfdfsdfdsf343443553.png)

#### 既然有了字节流,为什么还要有字符流?

**不管是文件读写还是网络发送接收，信息的最小存储单元都是字节，那为什么 I/O 流操作要分为字节流操作和字符流操作呢？**

字符流是由 Java 虚拟机将字节转换得到的，问题就出在这个过程还算是非常耗时，

并且，如果我们不知道编码类型就很容易出现乱码问题。

所以， I/O 流就干脆提供了一个直接操作字符的接口，方便我们平时对字符进行流操作。如果音频文件、图片等媒体文件用字节流比较好，如果涉及到字符的话使用字符流比较好。



### IO模型

#### 常见的IO模型

UNIX 系统下， IO 模型一共有 5 种： **同步阻塞 I/O**、**同步非阻塞 I/O**、**I/O 多路复用**、**信号驱动 I/O** 和**异步 I/O**。

这也是我们经常提到的 5 种 IO 模型。



#### BIO（Blocking I/O）同步阻塞IO模型

应用程序发起 read 调用后，会一直阻塞，直到内核把数据拷贝到用户空间。

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/gdsgdfsgsgdark.jpg" alt="图源：《深入拆解Tomcat & Jetty》" style="zoom:50%;" />

在客户端连接数量不高的情况下，是没问题的。但是，当面对十万甚至百万级连接的时候，传统的 BIO 模型是无能为力的。因此，我们需要一种更高效的 I/O 处理模型来应对更高的并发量。

#### NIO(Non-blocking/New I/O)

Java 中的 NIO 于 Java 1.4 中引入，对应 `java.nio` 包，提供了 `Channel` , `Selector`，`Buffer` 等抽象。NIO 中的 N 可以理解为 Non-blocking，不单纯是 New。它是支持面向缓冲的，基于通道的 I/O 操作方法。 对于高负载、高并发的（网络）应用，应使用 NIO 。

可以看作是 **I/O 多路复用模型**。也有很多人认为，Java 中的 NIO 属于**同步非阻塞 IO 模型**。

##### 同步非阻塞模型

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/bb174e22dbe04bb79fe3fc126aed0c61~tplv-k3u1fbpfcp-watermark.jpg" alt="图源：《深入拆解Tomcat & Jetty》" style="zoom:50%;" />

同步非阻塞模型中，应用程序会一直发起read调用，**等待数据从内核空间拷贝到用户空间的这段时间**里，线程依然是阻塞的，直到内核把数据拷贝到用户空间。

相比于同步阻塞 IO 模型，同步非阻塞 IO 模型确实有了很大改进，通过轮询操作，避免了一直阻塞。

但是，这种 IO 模型同样存在问题：**应用程序不断进行 I/O 系统调用轮询数据是否已经准备好的过程是十分消耗 CPU 资源的。**

##### I/O 多路复用模型 

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/88ff862764024c3b8567367df11df6ab~tplv-k3u1fbpfcp-watermark.jpg" alt="img" style="zoom:50%;" />

IO 多路复用模型中，线程首先发起 select 调用，询问内核数据是否准备就绪，等内核把数据准备好了，用户线程再发起 read 调用。read 调用的过程（数据从内核空间 -> 用户空间）还是阻塞的。

> 目前支持 IO 多路复用的系统调用，有 select，epoll 等等。select 系统调用，目前几乎在所有的操作系统上都有支持。
>
> - **select 调用** ：内核提供的系统调用，它支持一次查询多个系统调用的可用状态。几乎所有的操作系统都支持。
> - **epoll 调用** ：linux 2.6 内核，属于 select 调用的增强版本，优化了 IO 的执行效率。

**IO 多路复用模型，通过减少无效的系统调用，减少了对 CPU 资源的消耗。**

Java 中的 NIO ，有一个非常重要的**选择器 ( Selector )** 的概念，也可以被称为 **多路复用器**。通过它，只需要一个线程便可以管理多个客户端连接。当客户端数据到了之后，才会为其服务。

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/0f483f2437ce4ecdb180134270a00144~tplv-k3u1fbpfcp-watermark.jpg" alt="img" style="zoom:67%;" />

#### AIO(Asynchronous I/O)

AIO 也就是 NIO 2。Java 7 中引入了 NIO 的改进版 NIO 2,它是异步 IO 模型。

异步 IO 是基于事件和回调机制实现的，也就是应用操作之后会直接返回，不会堵塞在那里，当后台处理完成，操作系统会通知相应的线程进行后续的操作。

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/3077e72a1af049559e81d18205b56fd7~tplv-k3u1fbpfcp-watermark.jpg" alt="img" style="zoom:67%;" />

目前来说 AIO 的应用还不是很广泛。Netty 之前也尝试使用过 AIO，不过又放弃了。这是因为，Netty 使用了 AIO 之后，在 Linux 系统上的性能并没有多少提升。



#### 总结BIO/NIO/AIO

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220511223032934.png" alt="image-20220511223032934" style="zoom:67%;" />









### 0.同步/异步/阻塞/非阻塞

[参考网址](https://blog.csdn.net/anxpp/article/details/51512200)

![在这里插入图片描述](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202204101905956.png)

#### 概念比喻

- 同步:发起一个调用后,被调用者未处理完请求前,调用不返回
- 异步:发起一个调用后,立刻得到被调用者的回应(表示已收到请求),但没有返回结果.返回结果后续才会获得
- 阻塞:发起一个请求,调用者一直等待请求结果返回,等待过程无法做其他事情
- 非阻塞:发起一个请求,调用者不用一直等着结果返回,而是去做其他事情,结果出来后获取再进行处理

> 同步异步区别在于:
>
> 异步时调用者不用主动等待获得处理结果,被调用者会通过事件/回调等机制通知调用者返回结果
>
> 阻塞非阻塞区别在于:
>
> 等待调用结果的时候能否处理其他事情

#### 同步与异步

同步与异步的区别在于,数据从内核空间拷贝到用户控件是否由用户线程完成.

- 同步阻塞:一个线程维护一个连接,该线程完成数据的读写与处理的全部过程,并且数据的读写是阻塞的.

- 同步非阻塞:读写的过程不会阻塞当前线程,立刻返回,但用户线程需要不断主动判断数据是否"就绪",当出现可操作的IO时,进行数据读写并处理,此时依然会阻塞,等待内核赋值数据到用户线程.
- 异步:用户进行读写后,立刻返回,由内核完成数据读取与拷贝,完成后通知用户,执行回调函数(用户提供的callback),此时数据已从内核拷贝到用户空间,用户线程只需要对数据进行处理即可,无需关注读写.不需要等待内核对数据的复制操作,得到通知时已经在用户空间取得复制的数据.

> 网上的另一种对同步异步的解释:同步异步关注的是消息通信机制
>
> - 同步:发出一个调用时,没有得到结果前,调用不返回,一旦调用返回,就得到返回值.为**调用者主动等待调用结果**.
>
> - 异步:调用发出后,调用就直接返回,没有返回结果,调用发出后,被调用者通过状态通知调用者/回调函数处理调用.

#### 阻塞与非阻塞

指的是IO读写过程中是否阻塞线程,即没有可读数据时,方法是否即刻返回.

如

- BIO中,使用流的方式进行读写操作是阻塞的,没有有效数据可读时,线程将阻塞在该语句.
- NIO中,使用channel和buffer的方式进行数据读写,只有在有可读可写的数据时,才会将数据从内核读写入用户空间缓存区,不会造成线程阻塞.

### BIO编程

#### 概念

阻塞式IO通信模式，示意图:

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20170325133206022.jpg" alt="img" style="zoom:67%;" />

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20190512215404415.png" alt="在这里插入图片描述" style="zoom: 67%;" />

> 采用BIO通信模型的客户端,通常由一个独立的Acceptor线程负责监听客户端的连接,
>
> 它接收到客户端连接请求之后为每个客户端创建一个新的线程进行链路处理,此时不能再接收其他客户端连接请求
>
> 处理完成后,通过输出流返回应答给客户端,线程销毁.

每建立一个Socket连接时,同时创建一个新线程对该Socket进行单独通信(阻塞的方式).

这种方式有很高的响应速度,控制很简单,在连接较少时很有效,在连接较多时会出现资源不足的情况

#### 特点

- 使用独立线程维护一个socket连接,随着连接数量增多,对虚拟机造成压力
- 使用流读取数据,流是阻塞的,当没有可读可写数据时,线程等待会造成资源浪费.

#### 基本网络通信

服务端监听线程,当收到连接请求后,开启新的线程进行处理

```java
public class ServerThread implements Runnable {
    @Override
    public void run() {
        try {
            //	绑定端口
            ServerSocket serverSocket = new ServerSocket(8080);
            while (true){
                //	阻塞，一直等待直到有连接才会返回Socket
                Socket socket = serverSocket.accept(); //
                new Thread(new ServerProcessThread(socket)).start();//开启新的线程进行连接请求的处理
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

服务端数据处理线程,收到连接请求后处理请求的线程

```java
public class ServerProcessThread implements Runnable{

    private Socket socket;
    public ServerProcessThread(Socket socket){
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String line;
            String requestStr = "";
            System.out.println("服务端读取到来自客户端的数据:");
            while((line = bufferedReader.readLine()) != null){
                requestStr += line;
                System.out.println(line);
            }
            System.out.println("读取完毕");
            Writer writer = new OutputStreamWriter(socket.getOutputStream());
            writer.write(requestStr+"'s response:ok");
            System.out.println("响应完毕");
            writer.flush();
            writer.close();
            bufferedReader.close();
            socket.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

客户端线程

```java
public class ClientProcessThread implements Runnable {

    private Socket socket;

    public ClientProcessThread(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        //写数据,等待响应,输出响应内容
        String requestStr = "test";
        try {
            Writer writer = new OutputStreamWriter(socket.getOutputStream());
            writer.write(requestStr);
            System.out.println("客户端发送请求:"+requestStr);
            writer.flush();
            socket.shutdownOutput();
            //等待响应
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String line;
            System.out.println("客户端读取到来自服务端的响应:");
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
            }
            System.out.println("读取完毕");
            writer.close();
            bufferedReader.close();
            socket.close();


        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

测试,一个启动服务端,一个启动客户端

```java
public class ServerMain {
    public static void main(String[] args) {
        //开启服务端
        System.out.println("开启服务,监听端口: 8080");
        new Thread(new ServerThread()).start();
    }
}
```

```java
public class ClientMain {
    public static void main(String[] args) {
        //建立一个socket客户端,发起请求
        try {
            Socket socket = new Socket("127.0.0.1",8080);
            new Thread(new ClientProcessThread(socket)).start();//开启新的线程处理socket连接
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

运行结果:

客户端:

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210113183406588.png" alt="image-20210113183406588" style="zoom: 67%;" />

服务端:

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210113183426198.png" alt="image-20210113183426198" style="zoom:67%;" />

#### 伪异步IO

后端通过一个线程池处理多个客户端请求接入,形成客户端个数M:线程池最大线程数N比例关系,M可以远大于N

通过线程池可以灵活调配现成资源,设置线程最大值,防止海量并发耗尽线程资源

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20190512220315315.png" alt="在这里插入图片描述" style="zoom:67%;" />

采用线程池+任务队列实现伪异步IO通信框架,

当有新客户端接入时,客户端Socket封装为一个Task(实现Runnable接口)投递到后端线程池处理,线程池可以设置消息队列大小和最大线程数.

JDK线程池维护一个消息队列和N个活跃线程,对消息队列中的任务进行处理.

### NIO编程

#### 概念

No Blocking IO 非阻塞IO，是从Java1.4版本开始引入的一个新的IO API，可以替代标准的Java IO API。

NIO与原来的IO有同样的作用和目的，但是使用的方式完全不同，NIO支持面向缓冲区的，基于通道的IO操作。NIO将以更加高效的方式进行文件读写操作。

#### IO与NIO区别

| IO                        | NIO                           |
| ------------------------- | ----------------------------- |
| 面向流（Stream Oriented） | 面向缓冲区（Buffer Oriented） |
| 阻塞IO（Blocking IO）     | 非阻塞IO（Non Blocking IO）   |
| 无                        | 选择器（Selectors）           |

- 传统IO是单向的

  需要建立输入流与输出流两个管道，数据流动只能单向

  ![image-20200327143758859](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327143758859.png)

- NIO是双向的

  里面的缓冲区可以双向传递

  ![image-20200327144423143](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327144423143.png)

- NIO引入通道概念

  - 通道可以理解为我们生活中的铁路，它是用于源地址和目的地址连接的
  - 如果需要实际传输的话，那么需要依赖里面的缓冲区
  - 通道负责连接，缓冲区负责传输



#### 多路复用器Selector

线程包含一个Selector对象,相当于通道管理器,可以实现在一个单独线程中处理多个通道的目的,减少线程的创建数量;

Selector允许单线程处理多个Channel,当你的应用打开了多个连接(通道),但每个连接流量很少,则使用Selector会很方便.

Selector提供选择已经就绪的任务的能力:通过不断轮序注册在其上的通道Channel,如果存在发生读写时间,这个Channel就会处于就绪状态,被Selector轮询出来,然后通过SelectionKey获取就绪Channel集合,进行后续IO操作.

一个Selector可以同时轮询多个Channel,只需要一个线程负责Selector的轮询,就可以接入成千上万的客户端.

#### 特点

- 一个线程可以处理多个通道,减少线程创建数量
- 读写非阻塞,节约资源;没有可读写数据时,不会发生阻塞导致线程资源浪费.



#### 缓冲区Buffer

在Java NIO中负责数据的存取。缓冲区就是数组。用于存储不同类型的数据，根据数据类型不同，提供不同类型的缓冲区（除了Boolean）

- ByteBuffer：字节缓冲区（最常用的）
- CharBuffer
- ShortBuffer
- IntBuffer
- LongBuffer
- FloatBuffer
- DoubleBuffer

##### 缓冲区方法

通过` ByteBuffer.allocate() `获取缓冲区

缓冲区存取数据的两个核心方法

- put()：存入数据到缓冲区中
- get()：获取缓冲区中的数据
- hasRemaining()：判断缓冲区是否还有剩余的数据
- remaining()：获取缓冲区还有多少剩余数据
- mark()：标记postion的位置
- reset()：恢复到刚标记的地方

##### 缓冲区核心属性

![image-20200327150236836](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327150236836.png)

- capacity：容量，表示缓冲区中最大存储数据的容量，一旦申明不可改变。
- limit：界限，表示缓冲区中的可以操作数据的大小。（limit 后数据不能进行读写）
- position：位置，表示缓冲区中正在操作的位置
- mark：标记，表示记录当前 position 的位置，可以通过reset() 恢复到 mark的位置

最后它们之间的关系是：0 <= mark <= position <= limit <= capacity

##### 相关操作

```java
//	分配一个指定大小的缓冲区
ByteBuffer buf = ByteBuffer.allocate(1024);
//	传入字符串到缓冲区
String str = "abcde";
buf.put(str.getBytes());
//	开始读取数据，在读取数据前，我们需要使用flip切换到读取数据模式
buf.flip();
//	进行读取操作，我们需要创建一个byte[] 数组，将需要读取出来的数据放进去
byte[] dst = new byte[buf.limit()];
buf.get(dst);
//	重复读
buf.rewind();
// clear() 清空缓冲区，但是缓冲区中的数据仍然存储，但是处于被遗忘状态
buf.clear();
```



##### 直接缓冲区与非直接缓冲区

- **非直接缓冲区**：通过 `allocate()` 方法分配缓冲区，将缓冲区建立在JVM的内存中

  ![image-20200327160611964](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327160611964.png)

  传统IO和非直接缓冲区都需要中间进行一步Copy的过程，是比较耗费时间的

- **直接缓冲区**：通过`allocateDirect()` 方法分配直接缓冲区，将缓冲区建立在操作系统的物理内存中，可以提高效率。

  ![image-20200327160908331](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327160908331.png)

写入物理内存中的数据，已经不归JVM来管辖了，因此JVM不会自动收集物理内存中的数据

- 字节缓冲区要么直接的，要么非直接。

  如果为直接缓冲区，则Java虚拟机会尽最大努力直接在此缓冲区上执行本机I/O操作。也就是说，在每次调用基础操作系统的一个本机I/O操作之前，虚拟机都会尽量避免将缓冲区的内容复制到中间缓冲区（或从中间缓冲区中复制内容）

- 直接缓冲区可以通过调用此类的 `allocateDirect()工厂方法` 来创建。

  此方法返回的缓冲区进行分配和取消分配所需成本通常高于非直接缓冲区。

  直接缓冲区的内容可以驻留在常规的垃圾回收堆之外，因此，他们对应用程序的内存需求量造成 的影响可能不明显。

  所以，建议将直接缓冲区主要分配给那些易受基础系统的本机I/O操作影响的大型、持久的缓冲区。一般情况下，最好仅在直接缓冲区能在程序性能方面带来明显好处时分配它们。

- 直接缓冲区还可以通过`FileChannel的map()方法` 将文件区域直接映射到内存中来创建，该方法返回`MappedByteBuffer` 。

  Java平台的实现有助于JNI从本机代码创建直接字节缓冲区。如果以上这些缓冲区中的某个缓冲区实例指的是不可访问的内存区域。则试图访问该区域不会更改该缓冲区的内容，并且将会在访问期间或稍后的某个时间导致抛出不确定的异常。

- 字节缓冲区是直接缓冲区还是非直接缓冲区可以通过调用其 `isDirect()` 方法来确定，提供此方法是为了能够在性能关键型代码中执行显示缓冲区管理。



#### 通道Channel

由`java.nio.channels`包定义的。Channel表示IO源与目标打开的连接。Channel类似于传统的流，只不过Channel本身不能直接访问数据，Channel只能与Buffer进行交互，通道是双向的，数据可以从Channel读到Buffer，也可以从Buffer写到Channel。

> 开始的时候，CPU是直接提供IO接口来进行处理应用程序的IO请求的，所以IO请求会占用CPU的时间。
>
> ![image-20200327161715544](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327161715544.png)
>
> 后来在内存中，又提供了一条DMA（直接内存存取）线路，直接和IO接口进行交互，DMA在进行操作时候，需要首先向CPU申请权限，获得权限后即可进行IO操作，CPU就可以进行其它的操作了。
>
> ![image-20200327162012058](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327162012058.png)
>
> 当应用程序发送大量的IO请求时候，内存会向CPU申请多条DMA总线，当DMA连线更多时候，又会出现其它的问题，因此后面提出了Channel 通道的方式.
>
> Channel是一个完全独立的处理器，用于IO操作，这样可以省略向CPU请求的时间。
>
> ![image-20200327162401536](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327162401536.png)

##### 实现类

- java.nio.channels.Channels
  - FileChannel：文件通道
  - SocketChannel：套接字通道
  - ServerSocketChannel：套接字通道
  - DatagramChannel：用于网络

##### 获取通道

- 针对支持通道的类，提供了一个`getChannel()` 方法
  - 本地IO
    - FileInputStream
    - FileOutputStream
    - RandomAccessFile
  - 网络IO
    - Socket
    - ServerSocket
    - DatagramSocket

- 在JDK 1.7 中NIO.2 针对各通道提供了静态方法：`open()`

- 在JDK 1.7 中NIO.2 的Files工具类提供了一个静态方法：`newByteChannel()`



#### 利用通道完成文件复制

1. 利用非直接缓冲区

   ```java
   public class FileCopyDemo {
   
       public static void main(String[] args) {
   
           FileInputStream fis = null;
           FileOutputStream fos = null;
           FileChannel inChannel = null;
           FileChannel outChannel = null;
           try {
               fis = new FileInputStream("1.jpg");
               fos = new FileOutputStream("2.jpg");
   
               // 获取通道
               inChannel = fis.getChannel();
               outChannel = fos.getChannel();
   
               //分配一个指定大小的非直接缓冲区
               ByteBuffer buf = ByteBuffer.allocate(1024);
   
               // 将通道中的数据，存入缓冲区
               while (inChannel.read(buf) != -1) {
                   // 切换成读取数据的模式
                   buf.flip();
   
                   // 将缓冲区中的数据写入通道
                   outChannel.write(buf);
   
                   // 清空缓冲区
                   buf.clear();
               }
   
           } catch (Exception e) {
               e.printStackTrace();
           } finally {
               try {
                   // 关闭流
                   if(fis != null) {
                       fis.close();
                   }
                   if(fos != null) {
                       fos.close();
                   }
   
                   // // 关闭通道
                   if(outChannel != null) {
                       outChannel.close();
                   }
                   if(inChannel != null) {
                       inChannel.close();
                   }
               } catch (Exception e) {
                   e.printStackTrace();
               } finally {
   
               }
           }
       }
   }
   ```

2. 利用直接缓冲区，完成文件复制（内存映射）

   ```java
   public class FileCopyByDirectDemo {
   
       public static void main(String[] args) throws IOException {
   
           // 获取通道
           FileChannel inChannel = FileChannel.open(Paths.get("1.jpg"), StandardOpenOption.READ);
           FileChannel outChannel = FileChannel.open(Paths.get("2.jpg"), StandardOpenOption.WRITE, StandardOpenOption.READ, StandardOpenOption.CREATE_NEW);
   
           // 得到的一个内存映射文件
           // 这个的好处是，直接将文件存储在内存中了
           MappedByteBuffer inMappedBuf = inChannel.map(FileChannel.MapMode.READ_ONLY, 0, inChannel.size());
           MappedByteBuffer outMappedBuf = outChannel.map(FileChannel.MapMode.READ_WRITE, 0, inChannel.size());
   
           // 直接对缓冲区进行数据的读写操作
           byte [] dst = new byte[inMappedBuf.limit()];
           inMappedBuf.get(dst);
           outMappedBuf.put(dst);
   
           inChannel.close();
           outChannel.close();
       }
   }
   ```

3. 通道之间直接进行传输

   ```java
   public class FileCopyByChannelDemo {
   
       public static void main(String[] args) throws IOException {
   
           // 获取通道
           // 获取通道
           FileChannel inChannel = FileChannel.open(Paths.get("1.jpg"), StandardOpenOption.READ);
           FileChannel outChannel = FileChannel.open(Paths.get("2.jpg"), StandardOpenOption.WRITE, StandardOpenOption.READ, StandardOpenOption.CREATE_NEW);
   
           // 从 inChannel通道 到 outChannel通道
           inChannel.transferTo(0, inChannel.size(), outChannel);
   
           inChannel.close();
           outChannel.close();
       }
   }
   ```



#### 分散读取与聚集写入

##### 分散读取Scatter

将通道中的数据分散到多个缓冲区

> 按照缓冲区的顺序，写入position和limit之间的数据到Channel

![image-20200327174630941](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327174630941.png)

**实现**

```java
// 定义两个缓冲区，然后通过通道将内容分别读取到两个缓冲区中，这就实现了分散读取
private static void Scatteer() throws IOException {
    RandomAccessFile raf1 = new RandomAccessFile("1.txt", "rw");

    // 获取通道
    FileChannel channel = raf1.getChannel();

    // 分配指定大小的缓冲区
    ByteBuffer buf1 = ByteBuffer.allocate(10);
    ByteBuffer buf2 = ByteBuffer.allocate(1024);

    // 分散读取
    ByteBuffer[] bufs = {buf1, buf2};
    channel.read(bufs);

    for (ByteBuffer byteBuffer: bufs) {
        // 切换成读模式
        byteBuffer.flip();
    }

    System.out.println(new String(bufs[0].array(), 0, bufs[0].limit()));
    System.out.println(new String(bufs[1].array(), 0, bufs[1].limit()));
}
```



##### 聚集写入Gather

将多个缓冲区中的数据都聚集到通道中

**实现**

```java
private static void Gather() throws IOException {
    RandomAccessFile raf2 = new RandomAccessFile("2.txt", "rw");
    FileChannel channel2 = raf2.getChannel();

    // 分配指定大小的缓冲区
    ByteBuffer buf1 = ByteBuffer.allocate(10);
    ByteBuffer buf2 = ByteBuffer.allocate(1024);
    ByteBuffer[] bufs = {buf1, buf2};

    // 聚集写入
    channel2.write(bufs);
}
```



#### 实现编码与解码

- **编码**：字符串转换成字节数组
- **解码**：字节数组转换成字符串

```java
public class ChannelCharsetDemo {
    public static void main(String[] args) throws CharacterCodingException {

        Charset cs1 = Charset.forName("GBK");

        // 获取编码器
        CharsetEncoder ce = cs1.newEncoder();

        // 获取解码器
        CharsetDecoder cd = cs1.newDecoder();
		//	写入字符串
        CharBuffer cBuf = CharBuffer.allocate(1024);
        cBuf.put("今天天气不错");
        //	转换为读模式
        cBuf.flip();

        //编码
        ByteBuffer bBuf = ce.encode(cBuf);

        for(int i=0; i< 12; i++) {
            System.out.println(bBuf.get());
        }

        // 解码
        bBuf.flip();
        CharBuffer cBuf2 = cd.decode(bBuf);
        System.out.println(cBuf2.toString());
    }
}
```









#### 实现网络通信

##### NIO服务端

1. 打开ServerSocketChannel,监听客户端连接
2. 绑定监听端口,设置连接为非阻塞模式
3. 创建Reactor线程,创建多路复用器并启动线程
4. 注册ServerSocketChannel注册到Reactor线程中的Selector上,监听ACCEPT事件
5. Selector轮询准备就绪的Key
6. Selector监听到新的客户端接入,处理新的请求,完成三次握手,建立物理链路
7. 设置客户端链路为非阻塞模式
8. 将新接入的客户端连接注册到Reactor线程的Selector上,监听读操作,读取客户端发送的网络消息
9. 异步读取客户端消息到缓冲区
10. 对Buffer编解码,处理半包消息,将解码后的消息封装成Task
11. 将应答消息编码为Buffer,调用SocketChannel的write将消息异步发送给客户端

> 因为应答消息的发送是异步非阻塞,所以不能保证一次把需要发送的数据发送完,出现写半包的问题.
>
> 需要注册写操作,不断轮询Selector将没有发送完的消息发送完,通过Buffer的hasRemain()方法判断消息是否发送完成.

```java
public class Server {

    private static int port = 8080;
    private static ServerHandleThread serverThread;

    public static void start(){
        start(port);
    }

    public static synchronized void start(int port){
        if(serverThread!=null){
            serverThread.stop();
        }
        serverThread = new ServerHandleThread(port);
        new Thread(serverThread,"Server").start();
    }

    public static void main(String[] args) {
        start();
    }
}
```

```java
public class ServerHandleThread implements Runnable {

    //通道管理器
    private Selector selector;
    private ServerSocketChannel serverChannel;
    private volatile boolean started;

    public ServerHandleThread(int port) {
        try {
            //初始化通道管理器
            selector = Selector.open();
            //打开监听通道
            serverChannel = ServerSocketChannel.open();
            //true指通道为阻塞模式,false为非阻塞模式
            serverChannel.configureBlocking(false);
            //绑定端口
            serverChannel.socket().bind(new InetSocketAddress(port),1024);
            //注册"服务端接收客户端连接"事件,当轮询到该事件发生,select会返回
            serverChannel.register(selector, SelectionKey.OP_ACCEPT);
            //标记服务器开启
            started = true;
            System.out.println("服务器启动,端口号为"+port);
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    public void stop(){
        started = false;
    }

    @Override
    public void run() {
        while(started){
            try {
                //非阻塞,无论是否有读写事件,selector每隔1秒唤醒一次,不设参数则阻塞直到事件返回
                selector.select(1000);
                SelectionKey key = null;
                //轮询处理注册事件
                /**
             	 * 一共有四种事件:
             	 * 1. 服务端接收客户端连接事件: SelectionKey.OP_ACCEPT
            	 * 2. 客户端连接服务端事件:    SelectionKey.OP_CONNECT
            	 * 3. 读事件:                SelectionKey.OP_READ
            	 * 4. 写事件:                SelectionKey.OP_WRITE
             	 */
                Set<SelectionKey> keys = selector.selectedKeys();
                Iterator<SelectionKey> iterator = keys.iterator();
                while(iterator.hasNext()){
                    key = iterator.next();
                    //手动删除已选key,防止重复处理
                    iterator.remove();
                    try {
                        this.handleInput(key);
                    } catch (Exception e) {
                        if(key!=null){
                            key.cancel();
                            if(key.channel()!=null){
                                key.channel().close();
                            }
                        }
                    }

                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        //selector关闭后释放管理资源
        if(selector!=null){
            try {
                selector.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    //处理注册事件
    private void handleInput(SelectionKey key) throws IOException {
        if (key.isValid()) {
            //处理新接入的请求消息,判断事件性质
            //服务端接收客户端连接事件
            if(key.isAcceptable()){
                ServerSocketChannel ssc = (ServerSocketChannel) key.channel();
                //通过ServerSocketChannel的accept创建SocketChannel实例
                //完成该操作完成TCP三次握手,TCP物理链路正式建立
                SocketChannel accept = ssc.accept();
                //设置非阻塞
                accept.configureBlocking(false);
                //注册读事件
                accept.register(selector,SelectionKey.OP_READ);
            }
            //读事件
            if(key.isReadable()){
                //获取事件发生的通道
                SocketChannel sc = (SocketChannel) key.channel();
                //开辟1m的byte缓冲区
                ByteBuffer buffer = ByteBuffer.allocate(1024);
                //读取请求码流,返回读取到的字节数
                int read = sc.read(buffer);
                //对于读取到的字节进行编解码
                if(read>0){
                    //缓冲区当前limit设置为position=0,用于后续对缓冲区读取操作
                    buffer.flip();
                    //根据缓冲区刻度字节数创建字节数组
                    byte[] bytes = new byte[buffer.remaining()];
                    //将缓冲区可读字节数组复制到新建数组中
                    buffer.get(bytes);
                    //转为字符串
                    String expression = new String(bytes, "UTF-8");
                    System.out.println("服务器接收消息:"+expression);
                    //处理数据(逆序)
                    String result = "";
                    if(expression!=null){
                        StringBuffer sb = new StringBuffer(expression);
                        result = sb.reverse().toString();
                    }
                    //发送应答消息
                    this.doWrite(sc,result);
                }else if(read<0){
                    //链路关闭,释放资源
                    key.cancel();
                    sc.close();
                }
            }
        }
    }

    //异步发送应答消息
    private void doWrite(SocketChannel channel, String response) throws IOException {

        //将消息编码为字节数组
        byte[] bytes = response.getBytes();

        //根据数组容量创建缓存区
        ByteBuffer writeBuffer = ByteBuffer.allocate(bytes.length);

        writeBuffer.put(bytes);
        writeBuffer.flip();

        channel.write(writeBuffer);
        //不含写半包代码

    }
}
```

##### NIO客户端

```java
public class Client {

    private static String host = "127.0.0.1";
    private static int port = 8080;
    private static ClientThread clientThread;
    public static void start(){
        start(host,port);
    }
    public static synchronized void start(String host,int port){
        if(clientThread!=null)clientThread.stop();
        clientThread = new ClientThread(host,port);
        new Thread(clientThread,"Client").start();
    }
    //向服务器发消息
    public static boolean send(String msg) throws Exception{
        if(msg.equals("q"))return false;
        clientThread.send(msg);
        return true;
    }

    public static void main(String[] args) {
        start();
    }
}
```

```java
/**
 * NIO客户端
 */
public class ClientThread implements Runnable{

    private String host;
    private int port;
    private Selector selector;
    private SocketChannel socketChannel;
    private volatile boolean started;

    public ClientThread(String host, int port) {
        this.host = host;
        this.port = port;

        try {
            //创建选择器
            selector = Selector.open();
            //打开监听通道
            socketChannel = SocketChannel.open();
            //非阻塞
            socketChannel.configureBlocking(false);
            started = true;
            System.out.println("客户端启动");
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    public void stop(){
        started = false;
    }


    @Override
    public void run() {

        try {
            this.doConnect();
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }

//        循环遍历Selector
        while(started){
            try {
                selector.select(1000);
                Set<SelectionKey> keys = selector.selectedKeys();
                Iterator<SelectionKey> it = keys.iterator();
                SelectionKey key = null;
                while(it.hasNext()){
                    key = it.next();
                    it.remove();
                    try {
                        this.handleInput(key);
                    } catch (Exception e) {
                        if(key!=null){
                            key.cancel();
                            if(key.channel()!=null){
                                key.channel().close();
                            }
                        }
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
                System.exit(1);
            }
        }

        //关闭后自动释放管理资源
        if(selector!=null){
            try {
                selector.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void doConnect() throws IOException {
        if(!socketChannel.connect(new InetSocketAddress(host,port)))socketChannel.register(selector,SelectionKey.OP_CONNECT);
    }
    public void send(String msg) throws IOException {
        socketChannel.register(selector,SelectionKey.OP_READ);
        this.doWrite(socketChannel,msg);
    }

    //异步发送消息
    private void doWrite(SocketChannel socketChannel, String msg) throws IOException {

        byte[] bytes = msg.getBytes();
        ByteBuffer buffer = ByteBuffer.allocate(bytes.length);
        buffer.put(bytes);
        buffer.flip();
        socketChannel.write(buffer);

    }

    private void handleInput(SelectionKey key) throws IOException {
        if(key.isValid()){
            SocketChannel sc = (SocketChannel) key.channel();
            //客户端连接事件
            if(key.isConnectable()){
                if(!sc.finishConnect()) System.exit(1);
            }
            //读事件
            if(key.isReadable()){
                ByteBuffer buffer = ByteBuffer.allocate(1024);
                //读取请求码流,返回读取到的字节数
                int readBytes = sc.read(buffer);
                if(readBytes>0){
                    buffer.flip();
                    byte[] bytes = new byte[buffer.remaining()];
                    buffer.get(bytes);
                    String result = new String(bytes,"UTF-8");
                    System.out.println("客户端收到消息:"+result);
                }else if(readBytes<0){
                    key.cancel();
                    sc.close();
                }
            }
        }
    }
}
```

##### 测试结果

先运行服务器,再运行客户端,也可以直接使用以下测试类

```java
public class Test {

    public static void main(String[] args) throws Exception {
        Server.start();
        Thread.sleep(100);
        Client.start();
        while(Client.send(new Scanner(System.in).nextLine()));
    }
}
```

演示效果如下:

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210115000852710.png" alt="image-20210115000852710" style="zoom:80%;" />







### AIO编程

异步非阻塞IO,也就是NIO2,基于事件和回调机制实现,操作后会直接返回不会堵塞.

#### 代码演示

##### 服务端

```java
public class Server {

    private static int port = 8080;
    private static AsyncServerHandler serverHandler;
    public volatile static long clientCount = 0;
    public static void start(){
        start(port);
    }
    public static synchronized void start(int port){
        if(serverHandler!=null)return;
        serverHandler = new AsyncServerHandler(port);
        new Thread(serverHandler,"Server").start();
    }

    public static void main(String[] args) {
        start();
    }
}
```

```java
public class  AsyncServerHandler implements Runnable{

    public CountDownLatch latch;
    public AsynchronousServerSocketChannel channel;

    public AsyncServerHandler(int port) {
        try {
            //创建服务器端通道
            channel = AsynchronousServerSocketChannel.open();
//        绑定端口
            channel.bind(new InetSocketAddress(port));
            System.out.println("服务器已启动,端口号为:"+port);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        //CountDownLatch初始化
        //它的作用：在完成一组正在执行的操作之前，允许当前的现场一直阻塞
        //此处，让现场在此阻塞，防止服务端执行完成后退出
        //也可以使用while(true)+sleep
        //生产环境就不需要担心这个问题，以为服务端是不会退出的
        latch = new CountDownLatch(1);
        //接收客户端的连接
        channel.accept(this,new AcceptHandler());
        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
}
```

```java
public class AcceptHandler implements CompletionHandler<AsynchronousSocketChannel,AsyncServerHandler> {
    @Override
    public void completed(AsynchronousSocketChannel channel, AsyncServerHandler serverHandler) {
        //继续接收其他客户端请求
        Server.clientCount++;
        System.out.println("连接的客户端数:"+Server.clientCount);
        serverHandler.channel.accept(serverHandler,this);
        //创建buffer
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        //异步读
        channel.read(buffer,buffer,new ServerReadHandler(channel));
    }

    @Override
    public void failed(Throwable exc, AsyncServerHandler serverHandler) {
        exc.printStackTrace();
        serverHandler.latch.countDown();
    }
}
```

```java
public class ServerReadHandler implements CompletionHandler<Integer, ByteBuffer> {

    //用于读取半包消息和发送应答
    private AsynchronousSocketChannel channel;

    public ServerReadHandler(AsynchronousSocketChannel channel) {
        this.channel = channel;
    }

    //读取到消息后的处理
    @Override
    public void completed(Integer result, ByteBuffer attachment) {
        attachment.flip();
        byte[] message = new byte[attachment.remaining()];
        attachment.get(message);

        try {
            String expression = new String(message,"UTF-8");
            System.out.println("服务器收到消息:"+expression);
            String serverResult = "";
            if(expression!=null){
                StringBuffer sb = new StringBuffer(expression);
                serverResult = sb.reverse().toString();
            }
            this.doWrite(serverResult);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

    }

    //发送消息
    private void doWrite(String serverResult) {
        byte[] bytes = serverResult.getBytes();
        ByteBuffer writeBuffer = ByteBuffer.allocate(bytes.length);
        writeBuffer.put(bytes);
        writeBuffer.flip();

        //异步写数据
        channel.write(writeBuffer,writeBuffer, new CompletionHandler<Integer,ByteBuffer>() {
            @Override
            public void completed(Integer result, ByteBuffer buffer) {
                if(buffer.hasRemaining())channel.write(buffer,buffer,this);
                else{
                    ByteBuffer readBuffer = ByteBuffer.allocate(1024);
                    channel.read(readBuffer,readBuffer,new ServerReadHandler(channel));
                }
            }

            @Override
            public void failed(Throwable exc, ByteBuffer buffer) {
                try {
                    channel.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });


    }

    @Override
    public void failed(Throwable exc, ByteBuffer attachment) {
        try {
            this.channel.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### 客户端

```java
public class Client {

    private static String host = "127.0.0.1";
    private static int port = 8080;
    private static AsyncClientHandler clientHandler;
    public static void start(){
        start(host,port);
    }

    private static void start(String host, int port) {
        if(clientHandler!=null)return;
        clientHandler = new AsyncClientHandler(host,port);
        new Thread(clientHandler,"Client").start();
    }
    //向服务器发送消息
    public static boolean send(String msg){
        if(msg.equals("q"))return false;
        clientHandler.send(msg);
        return true;
    }

    public static void main(String[] args) {
        Client.start();
        System.out.println("输入请求消息:");
        Scanner scanner = new Scanner(System.in);
        while(Client.send(scanner.nextLine()));
    }

}
```

```java
public class AsyncClientHandler implements CompletionHandler<Void,AsyncClientHandler>,Runnable {

    private AsynchronousSocketChannel clientChannel;
    private String host;
    private int port;
    private CountDownLatch latch;

    public AsyncClientHandler(String host, int port) {
        this.host = host;
        this.port = port;
        try {
            clientChannel = AsynchronousSocketChannel.open();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        latch = new CountDownLatch(1);

        //发起异步连接操作，回调参数就是这个类本身，如果连接成功会回调completed方法
        clientChannel.connect(new InetSocketAddress(host,port),this,this);
        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        try {
            clientChannel.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    //连接服务器成功
    //意味着TCP三次握手完成
    @Override
    public void completed(Void result, AsyncClientHandler attachment) {
        System.out.println("客户端成功连接到服务器...");
    }

    //连接失败
    @Override
    public void failed(Throwable exc, AsyncClientHandler attachment) {
        System.err.println("连接服务器失败...");
        exc.printStackTrace();
        try {
            clientChannel.close();
            latch.countDown();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void send(String msg){
        byte[] req = msg.getBytes();
        ByteBuffer writeBuffer = ByteBuffer.allocate(req.length);
        writeBuffer.put(req);
        writeBuffer.flip();

        //
        clientChannel.write(writeBuffer,writeBuffer,new ClientWriteHandler(clientChannel,latch));
    }
}
```

```java
public class ClientReadHandler implements CompletionHandler<Integer, ByteBuffer> {

    private AsynchronousSocketChannel clientChannel;
    private CountDownLatch latch;

    public ClientReadHandler(AsynchronousSocketChannel clientChannel, CountDownLatch latch) {
        this.clientChannel = clientChannel;
        this.latch = latch;
    }

    @Override
    public void completed(Integer result, ByteBuffer buffer) {
        buffer.flip();
        byte[] bytes = new byte[buffer.remaining()];
        buffer.get(bytes);
        String body = null;
        try {
            body = new String(bytes, "UTF-8");
            System.out.println("客户端接收响应:" + body);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void failed(Throwable exc, ByteBuffer buffer) {
        System.err.println("数据读取失败...");
        try {
            clientChannel.close();
            latch.countDown();
        } catch (IOException e) {
        }

    }
}
```

```java
public class ClientWriteHandler implements CompletionHandler<Integer, ByteBuffer> {
    private AsynchronousSocketChannel clientChannel;
    private CountDownLatch latch;

    public ClientWriteHandler(AsynchronousSocketChannel clientChannel, CountDownLatch latch) {
        this.clientChannel = clientChannel;
        this.latch = latch;
    }

    @Override
    public void completed(Integer result, ByteBuffer buffer) {
        //完成全部数据的写入
        if (buffer.hasRemaining()) {
            clientChannel.write(buffer, buffer, this);
        } else {
            //读取数据
            ByteBuffer readBuffer = ByteBuffer.allocate(1024);
            clientChannel.read(readBuffer, readBuffer, new ClientReadHandler(clientChannel, latch));
        }
    }

    @Override
    public void failed(Throwable exc, ByteBuffer attachment) {
        System.err.println("数据发送失败...");
        try {
            clientChannel.close();
            latch.countDown();
        } catch (IOException e) {
        }

    }
}
```

##### 测试结果

```java
public class Test {

    public static void main(String[] args) throws Exception {
        Server.start();
        Thread.sleep(100);
        Client.start();
        System.out.println("请输入请求消息：");
        Scanner scanner = new Scanner(System.in);
        while(Client.send(scanner.nextLine()));
    }
}
```

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210115211621929.png" alt="image-20210115211621929" style="zoom:67%;" />

### Netty(后续学习)

#### 原理

高性能,异步事件驱动的NIO框架,提供对TCP/UDP和文件传输的支持,所有IO操作是异步非阻塞.

[参考网址](https://blog.csdn.net/weixin_38073885/article/details/90145803)



### Files类常用方法

Files应该是NIO的一个文件相关操作类

#### Files.exists()

根据给定path路径判断文件是否存在,用于**确定文件是否创建成功**,**操作文件前判断文件是否存在**等等

```java
boolean exists(Path path, LinkOption… options)
```

第二个参数是LinkOption数组,影响如何确定路径是否存在的选项数组

常用参数值为LinkOption.NOFOLLOW_LINKS,在该方法中表示不追踪文件系统中的符号链接(Symbolic Links)

同时说明如果不穿这个参数,是会包含符号连接的

> 经查阅,了解到Symbolic Links(软连接/符号连接)是一类文件,作用是读取这个文件时,会转发到读取所连接的文件,删除该文件不会删除掉连接的文件(类似快捷方式)
>
> 也就是说如果使用该参数,判断文件时就不会去查询快捷方式这类文件

返回true表示目录或文件存在,如果目录或文件不存在/不知道存在性,则返回false

示例:

```java
Path path1 = Paths.get("D:/Desktop/test.txt");
Boolean fileboolean = Files.exists(path1,new LinkOption[]{ LinkOption.NOFOLLOW_LINKS});
System.out.println(fileboolean);   //true
```

> 文件不知道存在性的可能是有的,比如exists(path)和notExists(path)均为false

#### Files.createDirectory()

根据给定path创建目录

目录已存在则抛异常java.nio.file.FileAlreadyExistsException;其他情况抛异常IOException(如创建目录的父目录不存在)

```java
Path path2 = Paths.get("D:/Desktop/test");
try {
    Path newDir = Files.createDirectory(path2);
} catch(FileAlreadyExistsException e){
    e.printStackTrace();
} catch (IOException e) {
    e.printStackTrace();
}
```

#### Files.createFile()

创建文件

```java
Path path = Paths.get("E:/Demo.txt");
Files.createFile(path);
```

#### Files.delete()

删除文件/目录,目录只能删除空目录

```java
Path path = Paths.get("data/subdir/logging-moved.properties");
try {
    Files.delete(path);
} catch (IOException e) {
    e.printStackTrace();
}
```

#### Files.copy()

复制文件,也可以用作强制覆盖现有文件

目标文件已存在情况下抛java.nio.file.FileAlreadyExistsException，其他情况下会抛IOException(如复制的目录不存在)

```java
Path sourcePath      = Paths.get("data/logging.properties");
Path destinationPath = Paths.get("data/logging-copy.properties");
try {
    //设置第三个参数为StandardCopyOption.REPLACE_EXISTING即可强制覆盖现有文件
    Files.copy(sourcePath, destinationPath,StandardCopyOption.REPLACE_EXISTING);
} catch(FileAlreadyExistsException e) {
   	e.printStackTrace();
} catch (IOException e) {
    e.printStackTrace();
}
```

> 参数StandardCopyOption.REPLACE_EXISTING:如果目标文件已存在,则覆盖

#### Files.move()

移动文件,也可以用作重命名

```java
Path sourcePath      = Paths.get("data/logging-copy.properties");
Path destinationPath = Paths.get("data/subdir/logging-moved.properties");

try {
    Files.move(sourcePath, destinationPath,StandardCopyOption.REPLACE_EXISTING);
} catch (IOException e) {
    e.printStackTrace();
}
```

#### Files.size()

查看文件大小(字节byte为单位)

```java
Path path1 = Paths.get("D:/Desktop/test.txt");
System.out.println(Files.size(path1));   //12个字符,显示12
```



## Java基础-异常



### 异常概念

Java异常是Java提供的一种识别及响应错误的一致性机制。

Java异常机制可以使程序中异常处理代码和正常业务代码分离，保证程序代码更加优雅，并提高程序健壮性。

在有效使用异常的情况下，异常能清晰的回答what, where, why这3个问题：

- 异常类型回答了“什么”被抛出
- 异常堆栈跟踪回答了“在哪”抛出
- 异常信息回答了“为什么”会抛出



### 异常架构

![Java异常面试题（2020最新版）1](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/3de7331cdd9abd4c2b595d19152ea1a81603444952689.png)



#### Throwable

Throwable 是 Java 语言中所有错误与异常的超类。

Throwable 包含两个子类：Error（错误）和 Exception（异常），它们通常用于指示发生了异常情况。

Throwable 包含了其线程创建时线程执行堆栈的快照，它提供了 printStackTrace() 等接口用于获取堆栈跟踪数据等信息。



#### Error

**定义**：Error 类及其子类。程序中无法处理的错误，表示运行应用程序中出现了严重的错误。

**特点**：此类错误一般表示代码运行时 JVM 出现问题。通常有 VirtualMachineError（虚拟机运行错误）、NoClassDefFoundError（类定义错误）等。此类错误发生时，JVM 将终止线程。

比如 `OutOfMemoryError`：内存不足错误；`StackOverflowError`：栈溢出错误。

这些错误是不受检异常，非代码性错误。因此，当此类错误发生时，应用程序不应该去处理此类错误。按照Java惯例，不应该实现任何新的Error子类。



#### Exception

程序本身可以捕获并且可以处理的异常。Exception 这种异常又分为两类：运行时异常和编译时异常。



##### 运行时异常

**定义**：RuntimeException 类及其子类，表示 JVM 在运行期间可能出现的异常。

**特点**：Java 编译器不会检查它。也就是说，当程序中可能出现这类异常时，倘若既"没有通过throws声明抛出它"，也"没有用try-catch语句捕获它"，还是会编译通过。

比如`NullPointerException`空指针异常、`ArrayIndexOutBoundException`数组下标越界异常、`ClassCastException`类型转换异常、ArithmeticExecption算术异常。

此类异常属于不受检异常，一般是由程序逻辑错误引起的，在程序中可以选择捕获处理，也可以不处理。虽然 Java 编译器不会检查运行时异常，但是我们也可以通过 throws 进行声明抛出，也可以通过 try-catch 对它进行捕获处理。如果产生运行时异常，则需要通过修改代码来进行避免。例如，若会发生除数为零的情况，则需要通过代码避免该情况的发生。

RuntimeException 异常会由 Java 虚拟机自动抛出并自动捕获（**就算我们没写异常捕获语句运行时也会抛出错误**），此类异常的出现绝大数情况是代码本身有问题应该从逻辑上去解决并改进代码。



##### 编译时异常

**定义**：Exception 中除 RuntimeException 及其子类之外的异常。

**特点**：Java 编译器会检查它。

比如 `ClassNotFoundException`（没有找到指定的类异常），IOException（IO流异常），如果程序中出现此类异常，要么通过throws进行声明抛出，要么通过try-catch进行捕获处理，否则不能通过编译。

在程序中，通常不会自定义该类异常，而是直接使用系统提供的异常类。**该异常我们必须手动在代码里添加捕获语句来处理该异常**。



#### 受检异常与非受检异常



##### 受检异常

编译器要求必须处理的异常。正确的程序在运行过程中，经常容易出现的、符合预期的异常情况。一旦发生此类异常，就必须采用某种方式进行处理。

**除 RuntimeException 及其子类外，其他的 Exception 异常都属于受检异常**。

编译器会检查此类异常，也就是说当编译器检查到应用中的某处可能会此类异常时，将会提示你处理本异常——要么使用try-catch捕获，要么使用方法签名中用 throws 关键字抛出，否则编译不通过。



##### 非受检异常

编译器不会进行检查并且不要求必须处理的异常，也就说当程序中出现此类异常时，即使我们没有try-catch捕获它，也没有使用throws抛出该异常，编译也会正常通过。

**该类异常包括运行时异常（RuntimeException及其子类）和错误（Error）。**



#### 异常关键字

• `try` – 用于监听。将要被监听的代码(可能抛出异常的代码)放在try语句块之内，当try语句块内发生异常时，异常就被抛出。

• `catch`– 用于捕获异常。catch用来捕获try语句块中发生的异常。

• `throw `– 用于抛出异常。

• `throws `– 用在方法签名中，用于声明该方法可能抛出的异常。

• `finally`– finally语句块总是会被执行。它主要用于回收在try块里打开的物力资源(如数据库连接、网络连接和磁盘文件)。**只有finally块执行完成之后，才会回来执行try或者catch块中的return或者throw语句**，如果finally中使用了return或者throw等终止方法的语句，则就不会跳回执行，直接停止。





### 异常处理机制

![Java异常面试题（2020最新版）2](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/3c406717ab3ef4005cfdd9a32937c5731603444952689.jpg)

- Java 通过面向对象的方法进行异常处理，一旦方法抛出异常，系统自动根据该异常对象寻找合适异常处理器（Exception Handler）来处理该异常，把各种不同的异常进行分类，并提供了良好的接口。
- Java 中，每个异常都是一个对象，它是 Throwable 类或其子类的实例。
- 当一个方法出现异常后便抛出一个异常对象，该对象中包含有异常信息，调用这个对象的方法可以捕获到这个异常并可以对其进行处理。
- Java 的异常处理是通过 5 个关键词来实现的：try、catch、throw、throws 和 finally。

在Java应用中，异常的处理机制分为声明异常，抛出异常和捕获异常。

#### 声明异常

通常，应该捕获那些知道如何处理的异常，将不知道如何处理的异常继续传递下去。传递异常可以在方法签名处使用 **throws** 关键字声明可能会抛出的异常。

> - 非检查异常（Error、RuntimeException 或它们的子类）不可使用 throws 关键字来声明要抛出的异常。
> - 一个方法出现编译时异常，就需要 try-catch/ throws 处理，否则会导致编译错误。

#### 抛出异常

如果你觉得解决不了某些异常问题，且不需要调用者处理，那么你可以抛出异常。

throw关键字作用是在方法内部抛出一个`Throwable`类型的异常。任何Java代码都可以通过throw语句抛出异常。

#### 捕获异常

程序通常在运行之前不报错，但是运行后可能会出现某些未知的错误，但是还不想直接抛出到上一级，那么就需要通过try…catch…的形式进行异常捕获，之后根据不同的异常情况来进行相应的处理。



#### 异常类型选择

![Java异常面试题（2020最新版）3](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/99ab6d15cfc0b15fd98389d00f6bee441603444952690.png)



#### 异常处理方式示例

##### 直接抛出异常

通常，应该捕获那些知道如何处理的异常，将不知道如何处理的异常继续传递下去。传递异常可以在方法签名处使用 **throws** 关键字声明可能会抛出的异常。

```java
private static void readFile(String filePath) throws IOException {
    File file = new File(filePath);
    String result;
    BufferedReader reader = new BufferedReader(new FileReader(file));
    while((result = reader.readLine())!=null) {
        System.out.println(result);
    }
    reader.close();
}
```

##### 封装异常再抛出

有时我们会从 catch 中抛出一个异常，目的是为了改变异常的类型。多用于在多系统集成时，当某个子系统故障，异常类型可能有多种，可以用统一的异常类型向外暴露，不需暴露太多内部异常细节。

```java
private static void readFile(String filePath) throws MyException {    
    try {
        // code
    } catch (IOException e) {
        MyException ex = new MyException("read file failed.");
        ex.initCause(e);
        throw ex;
    }
}
```

##### 捕获异常

在一个 try-catch 语句块中可以捕获多个异常类型，并对不同类型的异常做出不同的处理

```java
private static void readFile(String filePath) {
    try {
        // code
    } catch (FileNotFoundException e) {
        // handle FileNotFoundException
    } catch (IOException e){
        // handle IOException
    }
}
```

同一个 catch 也可以捕获多种类型异常，用 | 隔开

```java
private static void readFile(String filePath) {
    try {
        // code
    } catch (FileNotFoundException | UnknownHostException e) {
        // handle FileNotFoundException or UnknownHostException
    } catch (IOException e){
        // handle IOException
    }
}
```

##### 自定义异常

习惯上，定义一个异常类应包含两个构造函数，一个无参构造函数和一个带有详细描述信息的构造函数（Throwable 的 toString 方法会打印这些详细信息，调试时很有用）

```java
public class MyException extends Exception {
    public MyException(){ }
    public MyException(String msg){
        super(msg);
    }
    // ...
}
```

##### try-catch-finally

当方法中发生异常，异常处之后的代码不会再执行，如果之前获取了一些本地资源需要释放，则需要在方法正常结束时和 catch 语句中都调用释放本地资源的代码，显得代码比较繁琐，finally 语句可以解决这个问题。

```java
private static void readFile(String filePath) throws MyException {
    File file = new File(filePath);
    String result;
    BufferedReader reader = null;
    try {
        reader = new BufferedReader(new FileReader(file));
        while((result = reader.readLine())!=null) {
            System.out.println(result);
        }
    } catch (IOException e) {
        System.out.println("readFile method catch block.");
        MyException ex = new MyException("read file failed.");
        ex.initCause(e);
        throw ex;
    } finally {
        System.out.println("readFile method finally block.");
        if (null != reader) {
            try {
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

> - 即使catch中包含return语句，finally依然会执行
> - 如果finally中包含return，finally中return会覆盖前语句块的return。

##### try-with-resource

上面例子中，finally 中的 close 方法也可能抛出 IOException, 从而覆盖了原始异常。JAVA 7 提供了更优雅的方式来实现资源的自动释放，**自动释放的资源需要是实现了 AutoCloseable 接口的类**。

```java
private  static void tryWithResourceTest(){
    try (Scanner scanner = new Scanner(new FileInputStream("c:/abc"),"UTF-8")){
        // code
    } catch (IOException e){
        // handle exception
    }
}
```

try 代码块退出时，会自动调用 scanner.close 方法，和把 scanner.close 方法放在 finally 代码块中不同的是，若 scanner.close 抛出异常，则会被抑制，抛出的仍然为原始异常。被抑制的异常会由 addSusppressed 方法添加到原来的异常，如果想要获取被抑制的异常列表，可以调用 getSuppressed 方法来获取。



### 异常处理实践？

https://thinkwon.blog.csdn.net/article/details/104390689



## 集合容器Collection



### 集合框架底层数据结构

#### Collection

- **List**
  - **Arraylist**： Object数组
  - **Vector**： Object数组
  - **LinkedList**： 双向循环链表
- **Set**
  - **HashSet**（无序，唯一）：基于 HashMap 实现的，底层采用 HashMap 来保存元素
  - **LinkedHashSet**： LinkedHashSet 继承于 HashSet，并且其内部是通过 LinkedHashMap 来实现。
  - **TreeSet**（有序，唯一）： 红黑树(自平衡的排序二叉树。) 

#### Map

- **HashMap**： 

  JDK1.8之前HashMap由数组+链表组成的，数组是HashMap的主体，链表则是主要为了解决哈希冲突而存在的（“拉链法”解决冲突）；
  JDK1.8以后在解决哈希冲突时有了较大的变化，当链表长度大于阈值（默认为8）时，将链表转化为红黑树，以减少搜索时间

- **LinkedHashMap**：
  继承自 HashMap，它的底层仍然是基于拉链式散列结构即由数组和链表或红黑树组成。
  另外，LinkedHashMap 在上面结构的基础上，增加了一条双向链表，使得上面的结构可以保持键值对的插入顺序。同时通过对链表进行相应的操作，实现了访问顺序相关逻辑。

- **Hashtable**： 数组+链表组成的，数组是 Hashtable 的主体，链表则是主要为了解决哈希冲突而存在的

- **TreeMap**： 红黑树（自平衡的排序二叉树）



### 迭代器Iterator

- **是什么？** 
  Iterator 接口提供遍历任何 Collection 的接口。我们可以从一个 Collection 中使用迭代器方法来获取迭代器实例。迭代器取代了 Java 集合框架中的 Enumeration，迭代器允许调用者在迭代过程中移除元素。

- **如何使用？**

  ```java
  List<String> list = new ArrayList<>();
  Iterator<String> it = list. iterator();
  while(it. hasNext()){
    String obj = it. next();
    System. out. println(obj);
  }
  ```

- **特点？**
  只能单向遍历，但是更加安全，因为可以确保遍历过程中在集合元素被更改的时候，就会抛出 ConcurrentModificationException 异常。

- **如何在遍历过程中移除元素？**
  在使用迭代器遍历的过程中调用 iterator.remove() 方法

  ```java
  Iterator<Integer> it = list.iterator();
  while(it.hasNext()){
     it.remove();
  }
  //不能在forech语句中使用remove，因为会自动生成iterator，与remove不在一个线程，不被允许。
  ```

- **Iterator 和 ListIterator 有什么区别？**

  - Iterator 可以遍历 Set 和 List 集合，而 ListIterator 只能遍历 List。
  - Iterator 只能单向遍历，而 ListIterator 可以双向遍历（向前/后遍历）。
  - ListIterator 实现 Iterator 接口，然后添加了一些额外的功能，比如添加一个元素、替换一个元素、获取前面或后面元素的索引位置。



### ArrayList

#### ArrayList概念

ArrayList就是动态数组，其实就是Array的复杂版本，它提供了动态的添加元素和删除元素的方法，同时实现了Collection 和 List接口，能够灵活的设置数组的大小。

通过源码的分析，我们可以看到ArrayList有三种构造方法

- 空的构造函数
- 根据传入的数值大小，创建指定长度的数组
- 通过传入Collection元素列表进行生成

```java
// 默认的容量大小 10
private static final int DEFAULT_CAPACITY = 10;
// 定义的空的数组
private static final Object[] EMPTY_ELEMENTDATA = {};
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
// 不可以被序列化的数组，相当于存储元素的缓冲区
transient Object[] elementData;
// 这个list集合的长度
private int size;
/**
  * 空的构造函数
  */
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}
/**
  * 根据用户传入的容量大小构造一个list集合，长度可以大于等于0，但是如果为负数会抛出异常
  */
public ArrayList(int initialCapacity) {
    // 如果初始容量大于0
    if (initialCapacity > 0) {
        // 创建一个大小为initialCapacity的数组
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        // 创建一个空数组
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        // 如果为负数，直接抛出异常
        throw new IllegalArgumentException("Illegal Capacity: "+ initialCapacity);
    }
}
/**
  * 构造包含指定collection元素的列表，这些元素利用该集合的迭代器按顺序返回
  * 如果指定的集合为null，throws NullPointerException。
  */
public ArrayList(Collection<? extends E> c) {
    elementData = c.toArray();
    if ((size = elementData.length) != 0) {
        // c.toArray might (incorrectly) not return Object[] (see 6260652)
        if (elementData.getClass() != Object[].class)
            elementData = Arrays.copyOf(elementData, size, Object[].class);
    } else {
        // replace with empty array.
        this.elementData = EMPTY_ELEMENTDATA;
    }
}
```



#### 优缺点

**优点**

- ArrayList底层是以数组实现，是一种随机访问模式，再加上它实现了RandomAccess接口，因此在执行get方法的时候很快。

- ArrayList在顺序添加元素的时候非常简单，只是往数组中添加了一个元素而已；根据下标遍历元素，效率高。

- 可以自动扩容，默认为每次扩容为原来的1.5倍

**缺点**

- 数组里面（除了末尾）插入和删除元素效率不高，因为需要移动大量的元素

> ArrayList在小于扩容容量的情况下，其实增加操作效率非常高，在涉及扩容的情况下，添加操作效率确实低，删除操作需要移位拷贝。
>
> 同时因为ArrayList中增加（扩容）或者删除元素要调用System.arrayCopy()这种效率很低的方法进行处理，所以遇到数据量略大 或者 需要频繁插入和删除操作的时候，效率就比较低了，如果遇到上述的场景，那么就需要使用LinkedList来代替
>
> 因为ArrayList的优点在于构造好数组后，频繁的访问元素的效率非常高。



#### 与Vector区别

首先List接口一共有三个实现类：ArrayList、Vector、LinkedList

- Vector 和 ArrayList一样，都是通过数组来实现的。
- 不同的是 Vector支持线程的同步，也就是说某一个时刻下，只有一个线程能够写Vector，避免了多线程同时写而引起的不一致的问题，但实现同步需要很高的代Synchronized 。因此，Vector的效率比ArrayList慢
- 同时Vector 和 ArrayList的扩容机制有差异的，Vector每次扩容为数组长度的一倍，而ArrayList则是原来数组长度的1.5倍。





#### 扩容机制

##### add方法

添加元素方法

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;
    return true;
}
```

##### ensureCapacityInternal方法

```java
//	维护容量，接受的参数是添加元素后的元素数量
private void ensureCapacityInternal(int minCapacity) {
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}
//	计算至少容量，如果是空数组则取元素数量和默认大小的最大值，否则就是元素数量
private static int calculateCapacity(Object[] elementData, int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    return minCapacity;
}

```

##### ensureExplicitCapacity方法

判断是否扩容

```java
//	 记录集合的修改次数
protected transient int modCount = 0;
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;

    // 如果这个至少的容量比当前的数组长度长，则需要进行扩容，依据至少的容量
    if (minCapacity - elementData.length > 0)
        //	扩容方法
        grow(minCapacity);
}
```

##### grow方法

扩容用

```java
private void grow(int minCapacity) {
    // 原容量
    int oldCapacity = elementData.length;
   	//	新容量= 原容量+原容量/2，即1.5倍
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    //	如果扩容后还不够装，则直接用新容量
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    //	 如果扩容后超过最大容量，则进行判断
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // 调用copyOf将原数组内容复制到新数组
    elementData = Arrays.copyOf(elementData, newCapacity);
}
//	当扩容后容器大小超过范围，则根据当前元素数量进行判断处理
private static int hugeCapacity(int minCapacity) {
    //	如果连元素数量都溢出了（所以从正数变为负数）则抛异常
    if (minCapacity < 0) // overflow
        throw new OutOfMemoryError();
    //	否则按照最大数组长度/最大数字长度来处理
    return (minCapacity > MAX_ARRAY_SIZE) ? Integer.MAX_VALUE : MAX_ARRAY_SIZE;
}
private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;
```

> **System.arrayCopy()和Arrays.copyOf()方法**
>
> 看两者源代码可以发现 copyOf() 内部实际调用了 System.arraycopy() 方法
>
> arraycopy() 需要目标数组，将原数组拷贝到你自己定义的数组里或者原数组，而且可以选择拷贝的起点和长度以及放入新数组中的位置 copyOf() 是系统自动在内部新建一个数组，并返回该数组



##### 总结

- 当我们add进第一个元素到ArrayList的时候，elementData.length为0，但是此时执行了ensureCapacityInternal() 方法，通过默认的比较，此时会得到minCapacity为10，此时minCapacity - elementData.length > 0满足，所以会进入grow(minCapacity)方法
- 当add第二个元素的时候，minCapacity为2，此时elementData.length()在添加第一个元素后，扩容变成了10，此时minCapacity - elementData.length > 0 不成立，所以不会进入（执行）grow(minCapacity)方法。
- 同时我们继续添加元素 3,4 .... 11，到第11个元素的时候，minCapacity(11) 比 10更大，那么会触发grow操作，也就是满了才会扩容，扩容因子是100%



### LinkedList





### RandomAccess接口

```java
public interface RandomAccess {}
```

接口本身没有定义方法，而是作为一个标识，表示实现接口的类具有**随机访问**功能。

> 快速随机访问：通过元素的序号快速获取元素对象(对应于 get(int index) 方法)。

如在Arrays类的方法binarySearch()中，接收一个List类，他会对传入了对象类进行一个判定：

```java
public static <T> int binarySearch(List<? extends Comparable<? super T>> list, T key) {
    if (list instanceof RandomAccess || list.size()<BINARYSEARCH_THRESHOLD)
    return Collections.indexedBinarySearch(list, key);
    else
    return Collections.iteratorBinarySearch(list, key);
}
```

实现了RandomAccess接口的List会调用indexedBinarySearch方法，否则调用iteratorBinarySearch方法。

其中ArrayList实现了该接口，LinkedList没有，这个是由于底层数据结构决定的。并不是因为实现了这个接口才具有快速随机访问能力。



### HashMap



#### HashMap(JDK1.7)

##### 头插法

JDK1.7的HashMap当出现Hash碰撞的时候，最后插入的元素会放在前面，这个称为 “头插法”

> JDK7用头插是考虑到了一个所谓的热点数据的点（新插入的数据可能会更早用到）；
>
> 但这其实是个伪命题，因为JDK7中rehash的时候，旧链表迁移新链表的时候，如果在新表的数组索引位置相同，则链表元素会倒置（就是因为头插）， 所以最后的结果 还是打乱了插入的顺序。
>
> 所以总的来看支撑JDK7使用头插的这点原因也不足以支撑下去了，干脆换成尾插，一举多得

![image-20200405101639700](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200405101639700.png)

##### 死链问题

头插法还存在一个死链的问题，这里从HashMap的扩容说起：

###### HashMap扩容时死循环问题

当执行put方法插入元素时，有一个根据负载因子判断是否超出容量，进行扩容的步骤。

> HashMap的负载因子是0.75，初始容量是16，扩容大小是2倍。达到扩容条件时，会把HashMap中的每个元素，重新进行运算Hash值，打入到扩容后的数组中。

在扩容时，会创建新的更大的Hash表，然后将老数据迁移过去

```java
void resize(int newCapacity)
{
    Entry[] oldTable = table;
    int oldCapacity = oldTable.length;
    ......
    //创建一个新的Hash Table
    Entry[] newTable = new Entry[newCapacity];

    //将Old Hash Table上的数据迁移到New Hash Table上
    transfer(newTable);
    table = newTable;
    threshold = (int)(newCapacity * loadFactor);
}
```

其中的transfer方法：

```java
void transfer(Entry[] newTable)
{
    Entry[] src = table;
    int newCapacity = newTable.length;
    //下面这段代码的意思是：
    //  从OldTable里摘一个元素出来，然后放到NewTable中
    for (int j = 0; j < src.length; j++) {
        Entry<K,V> e = src[j];
        if (e != null) {
            src[j] = null;
            do {
                Entry<K,V> next = e.next;
                int i = indexFor(e.hash, newCapacity);
                e.next = newTable[i];
                newTable[i] = e;
                e = next;
            } while (e != null);
        }
    }
}
```

其中的do循环，在只有一个线程时：

![image-20200405110723887](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200405110723887.png)

其中老的hash表长度为2，在放入第三个元素时触发扩容，扩容为4，然后将元素重新hash分配，那么key(3)、key(7)分配到table[3]，key(5)分配到table[1]。

因为HashMap是线程不安全的，所以存在一个线程执行到一半挂起的情况：

```java
do {
    Entry<K,V> next = e.next; // <--假设线程一执行到这里就被调度挂起了
    int i = indexFor(e.hash, newCapacity);
    e.next = newTable[i];
    newTable[i] = e;
    e = next;
} while (e != null);
```

第一个线程在这里挂起，而第二个线程执行完成：

![image-20200405111030936](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200405111030936.png)

![image-20200405111105573](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200405111105573.png)

此时：

- 线程一：指针e指向key(3)，指针next指向key(7)
- 线程二：完成rehash，key(7)的next指向key(3)

然后线程一调度继续执行，但此时e.next与next的对不上了：

```java
//	调度前e=key(3),e.next=key(7),next=key(7)
//	调度后e=key(3),e.next=null,next=key(7),key(7).next=key(3)
e.next = newTable[i];	//	原来的位置的数据往后移，目前没有值
newTable[i] = e;	//	key(3)插入新hash表，头插
e = next;	// e改为指向key(7)
```

![image-20200405111205298](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200405111205298.png)

下一个循环线程一将key(7)进行头插，再取next

```java
Entry<K,V> next = e.next; // e=key(7),next=key(3)
e.next = newTable[i];	//	头插，e.next = key(3) 
newTable[i] = e;	// key(7)插进去
e = next;	//	此时线程一是7->3 接下来要插key(3)
```

![image-20200405111254924](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200405111254924.png)

这个时候要把本来已经插入过的key(3)头插到key(7)前，也就是让key(3).next指向key(7)。

但因为上一次插入时，key(7).next是key(3)，所以就形成了死循环。

![image-20200405111319072](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200405111319072.png)

> 线程二对e和next的改变打乱了线程一的e与next的关联。可以看到这里的模拟就是再赋值next=e.next的时候，线程调度导致e.next变化，而next没有变，使得next与e.next并不指向一个元素，就会发生混乱。



##### 底层实现

1.8之前底层是数组和链表结合，即**链表散列**。

1. HashMap通过key的hashCode经过扰动函数处理后得到hash值
2. 通过`(n-1)&hash`确定元素存放位置
3. 如果当前位置存在元素，判断该元素的hash值与key值是否相同
4. 相同则直接覆盖；否则通过拉链法解决冲突。

> **扰动函数**
>
> HashMap的hash方法，目的是为了防止一些key类实现比较差的hashCode()方法，减少碰撞。
>
> **拉链法**
>
> 将链表和数组相结合。也就是说创建一个链表数组，数组中每一格就是一个链表。若遇到哈希冲突，则将冲突的值加到链表中即可。

#### 底层实现

相对于之前的版本，解决哈希冲突有了较大的变化

当链表长度大于阈值（默认为8）时，将链表转 化为红黑树，以减少搜索时间。

##### 为什么不是二叉查找树

红黑树就是为了解决二叉查找树的缺 陷，因为二叉查找树在某些情况下会退化成一个线性结构。

##### 扰动函数（hash方法）

JDK 1.8 的 hash方法 相比于 JDK 1.7 hash 方法更加简化，但是原理不变。

```java
static final int hash(Object key) {
    int h;
    // key.hashCode()：返回散列值也就是hashcode
    // ^ ：按位异或
    // >>>:无符号右移，忽略符号位，空位都以0补齐
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

对比JDK1.7

```java
static int hash(int h) {
    // This function ensures that hashCodes that differ only by
    // constant multiples at each bit position have a bounded
    // number of collisions (approximately 8 at default load factor).
    h ^= (h >>> 20) ^ (h >>> 12);
    return h ^ (h >>> 7) ^ (h >>> 4);
}
```

1.7的性能相对差一点，扰动了4次。



#### 为什么扩容是2倍

首先看源码中如何存放元素的：

- 添加键值对时，会使用`( n - 1 ) & hash`的方式计算，得到元素在集合中的位置，其中n是集合的容量，hash是添加的元素通过hash函数计算出来的hash值。

  ![image-20200405105335235](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200405105335235.png)

- 扩容时，会新建数组，将老数组的元素按照`e.hash & ( newCap - 1 )`的方式插入新数组中。

  ![image-20200405105401674](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200405105401674.png)



##### HashMap容量为什么是2的n次幂

- & 是按位与运算，对于计算机来说计算比较高效，计算方式是对应位置数据都是1时，结果是1，否则是0。

- 当容量n是2的整数次幂时，n - 1 的二进制表示全是1，此时与hash进行按位与运算时，既能保持不超出容量范围，也能充分散列，均匀添加在HashMap的每个位置上，减少Hash碰撞。

- 也就是说这种方式其实是现定于2的整数次幂的取余方法

  > 当HashMap的容量是16时，它的二进制是10000，(n-1)的二进制是01111，与hash值计算结果如下：
  >
  > ![image-20200405105533985](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200405105533985.png)
  >
  > 通过这种计算，不同的hash值计算结果也不相同。
  >
  > 如果容量不是2的整数次幂，如10，则计算结果如下：
  >
  > ![image-20200405105704798](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200405105704798.png)
  >
  > 就已经发生hash碰撞了。

终上所述，HashMap计算添加元素的位置时，使用的位运算，这是特别高效的运算；

另外，HashMap的初始容量是2的n次幂，扩容也是2倍的形式进行扩容，是因为容量是2的n次幂，可以使得添加的元素均匀分布在HashMap中的数组上，减少hash碰撞，避免形成链表的结构，使得查询效率降低。



#### 1.8 内部结构变化

- 1.7：数组+链表

- 1.8：数组+链表+红黑树

- 转红黑树触发条件：

  - 某个链表长度大于8
  - 总容量大于64

  时会将链表转为红黑树。

- 红黑树增删查时间复杂度：O(log2n)

- 链表查询删除时间复杂度O(n) ，增加时间复杂度O(1)



#### 为什么使用红黑树而不是AVL（平衡二叉查找树）？

Java对HashMap做了改进，在链表长度大于8的时候，将后面的数据由链表改成了红黑树，以加快检索的速度

但是为什么使用的红黑树，而不是AVL树或者其它树呢？

##### 最主要的原因

在CurrentHashMap中加锁了，实际上就是读写锁，如果写冲突就会等待，如果插入的时间过长，必然会导致等待的时间变长，而红黑树相比于AVL树，它的插入更快。

##### AVL树与红黑树关系

红黑树和AVL树都是常见的平衡二叉树，它们的查找，删除，修改的时间复杂度都是 O(log n)

区别：

- AVL树是更加严格的平衡，因此可以提供更快的查找速度，一般读取查找密集型任务，适用AVL树
- 红黑树更适合插入修改密集型任务
- 通常，AVL树的旋转比红黑树的旋转更加难以平衡和调试

##### 总结

- AVL以及红黑树都是高度平衡的树形结构，它们非常的相似，真正的区别在于任何添加、删除操作时完成的旋转操作次数
- 两种时间复杂度都是O(logN)，其中N是叶子的数量，但实际上AVL树在查找密集型任务上更快，利用更好的平衡，树遍历平均更短，另一方面，插入和删除上，AVL树较慢，因为需要更高的旋转次数才能在修改时正确地重新平衡数据结构
- 在AVL树中，从根到任何叶子节点的最短路径和最长路径之间的差异最多为1，在红黑树中，差异可以是2倍
- 两个都是O(logN)查找，但是平衡二叉树可能需要 O(logN)旋转，而红黑树需要最多两次旋转使其达到平衡（尽可能需要检查O(logN)节点以确定旋转的位置），旋转本身是O(1)操作，因为你只需要移动指针。



#### ConcurrentHashMap

##### 放弃分段锁的原因

由原来的分段锁，变成了CAS，也就是通过无锁化设计替代了阻塞同步的加锁操作，性能得到了提高。

>  **通过使用Synchronized + CAS的方式实现并发访问**
>
> 通过分段锁的方式提高了并发度。
>
> 分段是一开始就确定的了，后期不能再进行扩容的，其中的段Segment继承了重入锁ReentrantLock，有了锁的功能，同时含有类似HashMap中的数组加链表结构（这里没有使用红黑树），虽然Segment的个数是不能扩容的，但是单个Segment里面的数组是可以扩容的。

JDK1.8的ConcurrentHashMap摒弃了1.7的segment设计，而是JDK1.8版本的HashMap的基础上实现了线程安全的版本，即也是采用**数组+链表+红黑树**的形式，虽然ConcurrentHashMap的读不需要锁，但是需要保证能读到最新数据，所以必须加volatile。即数组的引用需要加volatile，同时一个Node节点中的val和next属性也必须要加volatile。

至于为什么抛弃Segment的设计，是因为分段锁的这个段不太好评定，如果我们的Segment设置的过大，那么隔离级别也就过高，那么就有很多空间被浪费了，也就是会让某些段里面没有元素，如果太小容易造成冲突。

> 个人评价：没看懂，需要补一下基础

- 加入多个分段锁 浪费了内存空间
- 生产环境中，map在放入时 竞争同一个锁的概率非常小，分段锁反而会造成更新等操作的长时间等待
- 为了提高GC的效率

##### 新的同步方案

待补充  http://note.moguit.cn/#/./%E6%A0%A1%E6%8B%9B%E9%9D%A2%E8%AF%95/Java8%E6%96%B0%E7%89%B9%E6%80%A7/1_HashMap%E5%8F%98%E5%8C%96/README?id=jdk18%e7%bb%93%e6%9e%84%e5%8f%98%e5%8c%96







## 代理模式

### 概念

代理模式是23种设计模式的一种，是指一个对象A通过持有另一个对象B，可以具有B同样的行为的模式。

为了对外开放协议，B往往实现了一个接口，A也会去实现接口。但是B是“真正”实现类，A则比较“虚”，他借用了B的方法去实现接口的方法。A虽然是“伪军”，但它可以增强B，在调用B的方法前后都做些其他的事情。Spring AOP就是使用了动态代理完成了代码的动态“织入”。

**我们使用代理对象来代替对真实对象(real object)的访问，这样就可以在不修改原目标对象的前提下，提供额外的功能操作，扩展目标对象的功能。**

使用代理好处还不止这些，一个工程如果依赖另一个工程给的接口，但是另一个工程的接口不稳定，经常变更协议，就可以使用一个代理，接口变更时，只需要修改代理，不需要一一修改业务代码。从这个意义上说，所有调外界的接口，我们都可以这么做，不让外界的代码对我们的代码有侵入，这叫防御式编程。代理其他的应用可能还有很多。

上述例子中，类A写死持有B，就是B的静态代理。如果A代理的对象是不确定的，就是动态代理。动态代理目前有两种常见的实现，jdk动态代理和cglib动态代理。



### 动态代理

相比于静态代理来说，动态代理更加灵活。我们不需要针对每个目标类都单独创建一个代理类，并且也不需要我们必须实现接口，我们可以直接代理实现类( *CGLIB 动态代理机制*)。

**从 JVM 角度来说，动态代理是在运行时动态生成类字节码，并加载到 JVM 中的。**



### JDK动态代理

#### 介绍

**在 Java 动态代理机制中 `InvocationHandler` 接口和 `Proxy` 类是核心。**

`Proxy` 类中使用频率最高的方法是：`newProxyInstance()` ，这个方法主要用来生成一个代理对象。

```java
public static Object newProxyInstance(ClassLoader loader,
                                      Class<?>[] interfaces,
                                      InvocationHandler h)
    throws IllegalArgumentException
{
    ......
}
```

三个参数：

1. **loader** :类加载器，用于加载代理对象。
2. **interfaces** : 被代理类实现的一些接口；
3. **h** : 实现了 `InvocationHandler` 接口的对象；

要实现动态代理的话，还必须需要实现`InvocationHandler` 来自定义处理逻辑。当我们的动态代理对象调用一个方法时，这个方法的调用就会被转发到实现`InvocationHandler` 接口类的 `invoke` 方法来调用。

```java
public interface InvocationHandler {

    /**
     * 当你使用代理对象调用方法的时候实际会调用到这个方法
     */
    public Object invoke(Object proxy, Method method, Object[] args)
        throws Throwable;
}
```

三个参数：

1. **proxy** :动态生成的代理类
2. **method** : 与代理类对象调用的方法相对应
3. **args** : 当前 method 方法的参数

**你通过`Proxy` 类的 `newProxyInstance()` 创建的代理对象在调用方法的时候，实际会调用到实现`InvocationHandler` 接口的类的 `invoke()`方法。** 你可以在 `invoke()` 方法中自定义处理逻辑，比如在方法执行前后做什么事情。



#### 使用步骤

- 定义一个接口及其实现类；
- 自定义 `InvocationHandler` 并重写`invoke`方法，在 `invoke` 方法中我们会调用原生方法（被代理类的方法）并自定义一些处理逻辑；
- 通过 `Proxy.newProxyInstance(ClassLoader loader,Class<?>[] interfaces,InvocationHandler h)` 方法创建代理对象；



#### 使用

- 首先有个“明星”接口类，有唱、跳两个功能：

  ```java
  public interface Star
  {
      String sing(String name);
  
      String dance(String name);
  }
  ```

- 然后有明星实现类，“刘德华”

  ```shell
  public class LiuDeHua implements Star
  {   
      @Override
      public String sing(String name)
      {
           System.out.println("给我一杯忘情水");
  
          return "唱完" ;
      }
  
      @Override
      public String dance(String name)
      {
          System.out.println("开心的马骝");
  
          return "跳完" ;
      }
  }
  ```

- 明星演出前需要有人收钱，由于要准备演出，自己不做这个工作，一般交给一个经纪人。便于理解，它的名字以Proxy结尾，但他不是代理类，原因是它没有实现我们的明星接口，无法对外服务，它仅仅是一个wrapper（包装函数）。

  ```java
  public class StarProxy implements InvocationHandler
  {
      // 目标类，也就是被代理对象
      private Object target;
  
      public void setTarget(Object target)
      {
          this.target = target;
      }
  
      @Override
      public Object invoke(Object proxy, Method method, Object[] args) throws Throwable
      {
           //调用方法之前，我们可以添加自己的操作
          System.out.println("before method " + method.getName());
          Object result = method.invoke(target, args);
          //调用方法之后，我们同样可以添加自己的操作
          System.out.println("after method " + method.getName());
          return result;
      }
  
  }
  ```

- 获取代理对象的工厂类

  ```java
  public class JdkProxyFactory {
      public static Object getProxy(Object target) {
          return Proxy.newProxyInstance(
                  target.getClass().getClassLoader(), // 目标类的类加载
                  target.getClass().getInterfaces(),  // 代理需要实现的接口，可指定多个
                  new DebugInvocationHandler(target)   // 代理对象对应的自定义 InvocationHandler
          );
      }
  }
  ```

- 实际使用

  ```java
  Star star = (Star) JdkProxyFactory.getProxy(new StarProxy());
  star.sing("java");
  ```

  



#### 动态代理类

Proxy（jdk类库提供）根据B的接口生成一个实现类，我们称为C，它就是动态代理类（该类型是 $Proxy+数字 的“新的类型”）

**生成过程**

由于拿到了接口，便可以获知接口的所有信息（主要是方法的定义），也就能声明一个新的类型去实现该接口的所有方法，这些方法显然都是“虚”的，它调用另一个对象的方法。当然这个被调用的对象不能是对象B，如果是对象B，我们就没法增强了，等于饶了一圈又回来了。

所以它调用的是B的包装类，这个包装类需要我们来实现，但是jdk给出了约束，它必须实现InvocationHandler，上述例子中就是StarProxy， 这个接口里面有个方法，它是所有Target的所有方法的调用入口（invoke），调用之前我们可以加自己的代码增强。

所以可以这么认为C代理了InvocationHandler，InvocationHandler代理了我们的类B，两级代理。



#### 动态代理类如何调用InvocationHandler

**InvocationHandler的invoke方法如何分发target的所有方法**

通过反编译查看生成的代理对象:

```java
public final class XXX extends Proxy implements XXX
```

动态代理类C是Proxy的子类，且实现了B的接口，生成的方法实现类似这样：

```java
public final String SayHello(String paramString)
  {
    try
    {
      return (String)this.h.invoke(this, m4, new Object[] { paramString });
    }
    catch (Error|RuntimeException localError)
    {
      throw localError;
    }
    catch (Throwable localThrowable)
    {
      throw new UndeclaredThrowableException(localThrowable);
    }
}    
```

C的方法通过调用this.h实现，而this.h就是InvocationHandler，是生成代理类C时传递的第三个参数。

其中的m4就是接口的方法，它和代理方法一一对应。

C在invoke时把自己this传递了过去，InvocationHandler的invoke的第一个参数也就是我们的动态代理实例类，业务上有需要就可以使用它。

然后代理的接口方法会在代理类以静态成员变量的方式存在，通过静态代码块初始化：

```java
private static Method m1;
private static Method m3;
private static Method m4;
```

```java
static
  {
    try
    {
      m1 = Class.forName("java.lang.Object").getMethod("equals", new Class[] { Class.forName("java.lang.Object") });
      m3 = Class.forName("jiankunking.Subject").getMethod("SayGoodBye", new Class[0]);
      m4 = Class.forName("jiankunking.Subject").getMethod("SayHello", new Class[] { Class.forName("java.lang.String") });
      m2 = Class.forName("java.lang.Object").getMethod("toString", new Class[0]);
      m0 = Class.forName("java.lang.Object").getMethod("hashCode", new Class[0]);
      return;
    }
    catch (NoSuchMethodException localNoSuchMethodException)
    {
      throw new NoSuchMethodError(localNoSuchMethodException.getMessage());
    }
    catch (ClassNotFoundException localClassNotFoundException)
    {
      throw new NoClassDefFoundError(localClassNotFoundException.getMessage());
    }
  }
```

结构关系如图

![image-20200429101023902](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200429101023902.png)



#### 总结

简单一句话，动态代理就是要生成一个包装类对象，由于代理的对象是动态的，所以叫动态代理。

由于我们需要增强，这个增强是需要留给开发人员开发代码的，因此代理类不能直接包含被代理对象，而是一个InvocationHandler，该InvocationHandler包含被代理对象，并负责分发请求给被代理对象，分发前后均可以做增强。从原理可以看出，JDK动态代理是“对象”的代理。



### CGLIB动态代理

#### 介绍

**JDK 动态代理有一个最致命的问题是其只能代理实现了接口的类。**

“代理”的目的是构造一个和被代理的对象有同样行为的对象，一个对象的行为是在类中定义的，对象只是类的实例。所以构造代理，不一定非得通过持有、包装对象这一种方式。

通过“继承”可以继承父类所有的公开方法，然后可以重写这些方法，在重写时对这些方法增强，这就是cglib的思想。

根据里氏代换原则（LSP），父类需要出现的地方，子类可以出现，所以cglib实现的代理也是可以被正常使用的。

[CGLIB](https://github.com/cglib/cglib)(*Code Generation Library*)是一个基于[ASM](http://www.baeldung.com/java-asm)的字节码生成库，它允许我们在运行时对字节码进行修改和动态生成。CGLIB 通过继承方式实现代理。很多知名的开源框架都使用到了CGLIB， 例如 Spring 中的 AOP 模块中：如果目标对象实现了接口，则默认采用 JDK 动态代理，否则采用 CGLIB 动态代理。

**在 CGLIB 动态代理机制中 `MethodInterceptor` 接口和 `Enhancer` 类是核心。**

需要自定义 `MethodInterceptor` 并重写 `intercept` 方法，`intercept` 用于拦截增强被代理类的方法。

```java
public interface MethodInterceptor
extends Callback{
    // 拦截被代理类中的方法
    public Object intercept(Object obj, java.lang.reflect.Method method, Object[] args,
                               MethodProxy proxy) throws Throwable;
}
```

四个参数：

1. **obj** :被代理的对象（需要增强的对象）
2. **method** :被拦截的方法（需要增强的方法）
3. **args** :方法入参
4. **proxy** :用于调用原始方法

通过 `Enhancer`类来动态获取被代理类，当代理类调用方法的时候，实际调用的是 `MethodInterceptor` 中的 `intercept` 方法。



#### 使用步骤

1. 定义一个类；
2. 自定义 `MethodInterceptor` 并重写 `intercept` 方法，`intercept` 用于拦截增强被代理类的方法，和 JDK 动态代理中的 `invoke` 方法类似；
3. 通过 `Enhancer` 类的 `create()`创建代理类；



#### 使用

- 引入依赖

  ```xml
  <dependency>
    <groupId>cglib</groupId>
    <artifactId>cglib</artifactId>
    <version>3.3.0</version>
  </dependency>
  ```

- 构建业务类

  ```java
  //	模拟一个发送短信类，有一个send方法
  public class AliSmsService {
      public String send(String message) {
          System.out.println("send message:" + message);
          return message;
      }
  }
  ```

- 自定义MethodInterceptor实现

  ```java
  public class CglibProxy implements MethodInterceptor{
      /**
       * @param o           代理对象（增强的对象）
       * @param method      被拦截的方法（需要增强的方法）
       * @param args        方法入参
       * @param methodProxy 用于调用原始方法
       */
      @Override
      public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
          //调用方法之前，我们可以添加自己的操作
          System.out.println("before method " + method.getName());
          Object object = methodProxy.invokeSuper(o, args);
          //调用方法之后，我们同样可以添加自己的操作
          System.out.println("after method " + method.getName());
          return object;
      }
  }
  ```

- 获取代理类

  ```java
  public class CglibProxyFactory {
  
      public static Object getProxy(Class<?> clazz) {
          // 创建动态代理增强类
          Enhancer enhancer = new Enhancer();
          // 设置类加载器
          enhancer.setClassLoader(clazz.getClassLoader());
          // 设置被代理类
          enhancer.setSuperclass(clazz);
          // 设置方法拦截器
          enhancer.setCallback(new DebugMethodInterceptor());
          // 创建代理类
          return enhancer.create();
      }
  }
  ```

- 实际调用

  ```java
  AliSmsService aliSmsService = (AliSmsService)CglibProxyFactory.getProxy(AliSmsService.class);
  aliSmsService.send("java");
  ```

从代码可以看出，它和jdk动态代理有所不同，它只需要一个类型clazz就可以产生一个代理对象， 所以说是“类的代理”。

且创造的对象通过打印类型发现也是一个新的类型。不同于jdk动态代理，jdk动态代理要求对象必须实现接口（三个参数的第二个参数），cglib对此没有要求。

#### 原理

cglib的原理是这样，它生成一个继承B的类型C（代理类），这个代理类持有一个MethodInterceptor，我们setCallback时传入的。 

C重写所有B中的方法（方法名一致），然后在C中，构建名叫`"CGLIB"+"$父类方法名$"`的方法（下面叫cglib方法，所有非private的方法都会被构建），方法体里只有一句话super.方法名()，可以简单的认为保持了对父类方法的一个引用，方便调用。

这样的话，C中就有了重写方法、cglib方法、父类方法（不可见），还有一个统一的拦截方法（增强方法intercept），其中重写方法和cglib方法肯定是有映射关系的。

C的重写方法是外界调用的入口（LSP原则），它调用MethodInterceptor的intercept方法，调用时会传递四个参数，第一个参数传递的是this，代表代理类本身，第二个参数标示拦截的方法，第三个参数是入参，第四个参数是cglib方法，intercept方法完成增强后，我们调用cglib方法间接调用父类方法完成整个方法链的调用。

> **为什么这里通过arg3调用方法而不是arg1？**
>
> 因为通过arg1.invoke(arg0,...)调用的是代理子类的方法，子类的方法经过重写是调用不到父类的原方法，反而会导致死循环，不停的自我代理。

同时arg3调用方法使用的不是invoke而是invokeSuper，是因为cglib采用了**fastclass机制**，不仅巧妙的避开了调不到父类方法的问题，还加速了方法的调用。

> fastclass基本原理是，给每个方法编号，通过编号找到方法执行避免了通过反射调用。

对比JDK动态代理，cglib依然需要一个第三者分发请求，只不过jdk动态代理分发给了目标对象，cglib最终分发给了自己，通过给method编号完成调用。cglib是继承的极致发挥，本身还是很简单的，只是fastclass需要另行理解。

#### 缺陷

经测试，jdk创建对象的速度远大于cglib，这是由于cglib创建对象时需要操作字节码。cglib执行速度略大于jdk，所以比较适合单例模式。另外由于CGLIB的大部分类是直接对Java字节码进行操作，这样生成的类会在Java的永久堆中。如果动态代理操作过多，容易造成永久堆满，触发OutOfMemory异常。



### JDK动态代理与CGLIB动态代理区别

- JDK动态代理只能对实现了接口的类生成代理，而不能针对类。
- CGLIB是针对类实现代理，主要是对指定的类生成一个子类，覆盖其中的方法，并覆盖其中方法实现增强，但是因为采用的是继承，所以该类或方法最好不要声明成final， 对于final类或方法，是无法继承的。
- 使用CGLib实现动态代理，CGLib底层采用ASM字节码生成框架，使用字节码技术生成代理类，在jdk6之前比使用Java反射效率要高。唯一需要注意的是，CGLib不能对声明为final的方法进行代理，因为CGLib原理是动态生成被代理类的子类。
- 在jdk6、jdk7、jdk8逐步对JDK动态代理优化之后，**在调用次数较少的情况下，JDK代理效率高于CGLIB代理效率**。只有当进行大量调用的时候，jdk6和jdk7比CGLIB代理效率低一点，但是**到jdk8的时候，jdk代理效率高于CGLIB代理**，总之，每一次jdk版本升级，jdk代理效率都得到提升，而CGLIB代理效率确有点跟不上步伐。

### Spring AOP的选择

- 如果目标对象实现了接口，默认情况下会采用JDK的动态代理实现AOP。
- 如果目标对象实现了接口，可以强制使用CGLIB实现AOP。
- 如果目标对象没有实现了接口，必须采用CGLIB库，Spring会自动在JDK动态代理和CGLIB之间转换

### 为什么当原始类继承一个类时，只能使用CGLIB动态代理

因为JDK代理生成的代理类，默认会继承一个类，由于java是单继承，所以当原始类继承一个类的时候，只能使用CGLib动态代理。



### 使用条件

JDK代理是不需要第三方库支持，只需要JDK环境就可以进行代理，使用条件:

- 实现InvocationHandler
- 使用Proxy.newProxyInstance产生代理对象
- 被代理的对象必须要实现接口

CGLib必须依赖于CGLib的类库，但是它不需要类来实现任何接口，代理的是指定的类生成一个子类。





## 注解与反射

### 注解概念

- Annotation是JDK5.0开始引入的新技术
- Annotation的作用
  - 不是程序本身，可以对程序做出解释（这一点和注释没有什么区别）
  - 可以被其它程序，比如编译器读取
- Annotation的格式
  - 注解以 `@注释名` 在代码中存在的，还可以添加一些参数值
  - 例如：`@SuppressWarnings(value = "unchecked")`
- Annotation在那里使用？
  - 可以附加在package、class、method、field等上面，相当于给他们添加了额外的辅助信息
  - 通过反射机制变成实现对这些元数据的控制



### 本质

注解本质是一个继承了`Annotation` 的特殊接口：

```java
// 这里是一个@Override注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {

}

public interface Override extends Annotation{

}
```

注解只有被解析之后才会生效，常见的解析方法有两种：

- **编译期直接扫描** ：编译器在编译 Java 代码的时候扫描对应的注解并处理，比如某个方法使用`@Override` 注解，编译器在编译的时候就会检测当前的方法是否重写了父类对应的方法。
- **运行期通过反射处理** ：像框架中自带的注解(比如 Spring 框架的 `@Value` 、`@Component`)都是通过反射来进行处理的。



### 内置注解

- @Override：定义在 `java.lang.Override`中，此注释只适用于修饰方法，表示一个方法声明打算重写超类中的另一个方法声明

- @Deprecated：定义在`java.lang.Deprecated`中，此注释可以用于修饰方法，属性，类，表示不鼓励程序员使用这样的元素，通常是因为它很危险，或者存在更好的选择

- @SuppressWarnings：定义在

  ```
  java.lang.SuppressWarnings
  ```

  中，用来抑制编译时的警告信息，与前面的两个注释不同，你需要额外添加一个参数才能正确使用，这些参数都是已经定义好了的，我们选择性的使用就好了。

  - @SuppressWarnings("all")
  - @SuppressWarnings("unchecked")
  - @SuppressWarnings(value={"unchecked", "deprecation"})
  - ...



### 元注解

元注解的作用就是负责注解其它注解，Java定义了4个标准的meta-annotation类型，他们被用来提供对其它annotation类型作说明。

这些类型和它们所支持的类在 `java.lang.annotation`包可以找到 `@Target` 、`@Retention`、`@Documented`、`@Inherited`

- @Target：用于描述注解的使用范围，即：被描述的注解可以在什么地方使用

  - ElementType.METHOD 表示可以加在方法上

  - ElementType.TYPE 表示可以加在类上

- @Retention：表示需要什么保存该注释信息，用于描述注解的生命周期

  - RetentionPolicy.RUNTIME 运行时有效
  - RetentionPolicy.SOURCE
  - RetentionPolicy.CLASS

  - 级别范围：Source < Class < Runtime

- @Document：说明该注解被包含在java doc中

- @Inherited：说明子类可以集成父类中的注解

如

```java
@MyAnnotation
public class MateAnnotationDemo {

}

/**
 * 定义一个注解
 */
@Target(value={ElementType.METHOD, ElementType.TYPE})  // target表示我们注解应用的范围，在方法上，和类上有效
@Retention(RetentionPolicy.RUNTIME)   // Retention：表示我们的注解在什么时候还有效，运行时候有效
@Documented   // 表示说我们的注解是否生成在java doc中
@Inherited   // 表示子类可以继承父类的注解
@interface MyAnnotation {

}
```



### 自定义注解

使用 `@interface`自定义注解时，自动继承了 `java.lang.annotation.Annotation`接口

- @interface 用来声明一个注解，格式：public @interface 注解名 {定义内容
- 其中的每个方法实际上是申明了一个配置参数
- 方法的名称就是参数的类型
- 返回值类型就是参数的类型（返回值只能是基本数据类型，Class，String，enum）
- 通过default来申明参数的默认值
- 如果只有一个参数成员，一般参数名为 value
- 注解元素必须要有值，我们定义元素时，经常使用空字符串或者0作为默认值

示例

```java
/**
 * 自定义注解
 *
 * @author: 陌溪
 * @create: 2020-03-28-22:57
 */
public class MateAnnotationDemo {

    // 注解可以显示赋值，如果没有默认值，我们就必须给注解赋值
    @MyAnnotation(schools = {"大学"})
    public void test(){

    }

}

/**
 * 定义一个注解
 */
@Target(value={ElementType.METHOD, ElementType.TYPE})  // target表示我们注解应用的范围，在方法上，和类上有效
@Retention(RetentionPolicy.RUNTIME)   // Retention：表示我们的注解在什么时候还有效，运行时候有效
@Documented   // 表示说我们的注解是否生成在java doc中
@Inherited   // 表示子类可以继承父类的注解
@interface MyAnnotation {

    // 注解的参数：参数类型 + 参数名()
    String name() default "";

    int age() default 0;

    // 如果默认值为-1，代表不存在
    int id() default -1;

    String[] schools();
}
```



### 反射机制

#### 动态语言与静态语言

##### 动态语言

是一类在运行时可以改变其结构的语言：例如新的函数，对象，甚至代码可以被引进，已有的函数可以被删除或是其它结构上的变化。通俗点说就是在运行时代码可以根据某些条件改变自身结构

主要的动态语言有：Object-c、C#、JavaScript、PHP、Python等

##### 静态语言

运行时结构不可变的语言就是静态语言。例如Java、C、C++

Java不是动态语言，但是Java可以称为“准动态语言”。即Java有一定的动态性，我们可以利用反射机制来获取类似于动态语言的 特性，Java的动态性让编程的时候更加灵活。

#### 什么是反射

Java Reflection：Java反射是Java被视为动态语言的关键，反射机制运行程序在执行期借助于Reflection API 去访问任何类内部的信息，并能直接操作任意对象的内部属性及方法。

```java
Class c = Class.forName("java.lang.String")
```

在加载完类后，在堆内存的方法区就产生了一个Class类型的对象（一个类只有一个Class对象），这个对象就包含了完整的类的结构信息，我们可以通过这个对象看到类的结构，这个对象就像一面镜子，透过这个镜子看到类的结构，所以我们形象的称之为：反射。

![image-20200328232620190](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200328232620190.png)

#### 反射的优缺点

- 优点：可以实现动态创建对象和编译，体现出很大的灵活性
- 缺点：对性能有影响。使用反射基本上是一种解释操作，我们可以告诉JVM，我们希望做什么并且它满足我们的要求，这类操作总是慢于直接执行相同的操作。也就是说new创建和对象，比反射性能更高



### 理解Class类

- 一个类在内存中只有一个Class对象
- 一个类被加载后，类的整体结构都会被封装在Class对象中

在Object类中定义了以下的方法，此方法将被所有子类继承

```java
public final Class getClass()
```

以上方法的返回值的类型是一个Class类，此类是Java反射的源头，实际上所谓反射从程序的运行结果来看也很好理解，即：可以通过对象反射求出类的名称。也就是说，我们通过对象来获取到它的Class，相当于逆过程。

- Class本身也是一个类
- Class对象只能由系统建立对象
- 一个加载的类在JVM中只会有一个Class实例
- 一个Class对象对应的是一个加载到JVM中的一个.class文件
- 每个类的实例都会记得自己是由哪个Class实例所生成
- 通过Class可以完整地得到一个类中所有被加载的结构
- Class类是Reflection的根源，针对任何你想动态加载、运行的类、唯有先获得相应的Class对象

#### Class类常用方法

- Class.forName(String name)：返回指定类name的Class对象
- newInstance()：调用缺省构造函数，返回Class对象的一个实例
- getName()：返回此Class对象所表示的实体（类，接口，数组或void）的名称
- getSuperClass()：返回当前Class对象的父类Class对象
- getinterfaces()：返回当前对象的接口
- getClassLoader()：返回该类的类加载器
- getConstructors()：返回一个包含某些Constructor对象的数组
- getMethod(String name, Class.. T)：返回一个Method对象，此对象的形参类型为paramsType
- getDeclaredFields()：返回Field对象的一个数组

#### 获取Class对象的方式

1. **已知具体的类**：通过类的class属性获取

   ```java
   Class alunbarClass = TargetObject.class;
   ```

   通过此方式获取 Class 对象不会进行初始化。

2. **通过 `Class.forName()`传入类的全路径获取：**

   ```java
   Class alunbarClass1 = Class.forName("cn.javaguide.TargetObject");
   ```

3. **通过对象实例`instance.getClass()`获取：**

   以及`getSuperclass`获取父类

   ```java
   TargetObject o = new TargetObject();
   Class alunbarClass2 = o.getClass();
   Class superClass = o.getSuperClass();
   ```

4. **通过类加载器`xxxClassLoader.loadClass()`传入类路径获取:**

   ```java
   Class clazz = ClassLoader.loadClass("cn.javaguide.TargetObject");
   ```

   通过类加载器获取 Class 对象不会进行初始化，意味着不进行包括初始化等一系列步骤，静态代码块和静态对象不会得到执行

5. **内置数据类型可以直接通过 `类名.Type`获取**

   ```java
   Class c4 = Integer.TYPE;
   ```



#### 那些类型有Class对象

- class：外部类，成员（成员内部类，静态内部类），局部内部类，匿名内部类

- interface：接口

- []：数组

- enum：枚举

- annotation：注解@interface

- primitive type：基本数据类型

- void：空数据类型

> 只要类型和维度一样，那就是同一个Class对象

```java
public class GetClassDemo {
    public static void main(String[] args) {
        Class c1 = Object.class; // 类
        Class c2 = Comparable.class; // 接口
        Class c3 = String[].class; // 数组
        Class c4 = int[][].class; // 二维数组
        Class c5 = Override.class; // 注解
        Class c6 = ElementType.class; // 枚举
        Class c7 = Integer.class; // 基本数据类型
        Class c8 = void.class; // void，空数据类型
        Class c9 = Class.class; // Class

        System.out.println(c1);
        System.out.println(c2);
        System.out.println(c3);
        System.out.println(c4);
        System.out.println(c5);
        System.out.println(c6);
        System.out.println(c7);
        System.out.println(c8);
        System.out.println(c9);
    }
}
/**
运行结果
class java.lang.Object
interface java.lang.Comparable
class [Ljava.lang.String;
class [[I
interface java.lang.Override
class java.lang.annotation.ElementType
class java.lang.Integer
void
class java.lang.Class
**/
```



#### 内存模型

java内存分为以下三部分

- 堆
  - 存放new的对象和数组
  - 可以被所有的线程共享，不会存放别的对象引用
- 栈
  - 存放基本变量（会包含这个基本类型的具体数值）
  - 引用对象的变量（会存放这个引用在对堆里面的具体地址）
- 方法区
  - 可以被所有线程共享
  - 包含了所有的class和static变量



### 类的加载与ClassLoader

#### 类加载过程

当程序主动使用某个类时，如果该类还未被加载到内存中，则系统会通过如下三个步骤对该类进行初始化：

![image-20200329105217945](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200329105217945.png)

- **加载**  将class文件字节码内容加载到内存，并将这些静态数据转换成方法区的运行时数据结构，然后生成一个代表这个类的 `java.lang.Class` 对象。
- **链接**  将Java类的二进制代码合并到JVM的运行状态之中的过程。
  - 验证：确保加载的类信息符合JVM规范，没有安全方面的问题
  - 准备：正式为类变量(static)分配内存并设置类变量默认初始值的阶段，这些内存都将在方法区中进行分配。
  - 解析：虚拟机常量池的符号引用(常量名)替换为直接引用(地址)的过程
- **初始化**
  - 执行类构造器方法的过程，类构造器 方法是由编译期自动收集类中所有类变量的赋值动作和静态代码块中的语句合并产生的。（类构造器是构造类信息的，不是构造该类对象的构造器）
  - 当初始化一个类的时候，如果发现其父类还没有初始化完成，则需要先触发其父类的初始化
  - 虚拟机会保证一个类的方法在多相差环境中被正确的加锁和同步





#### 什么时候发生类初始化

##### 类的主动引用（一定发生初始化）

- 当虚拟机启动，先初始化main方法所有在类
- new 一个类的对象
- 调用类的静态成员（除了 final常量）和静态方法
- 使用 java.lang.reflect包的方法对类进行反射调用
- 当初始化一个类，如果其父类没有被初始化，则会先初始化它的父类

##### 类的被动引用（不会发生初始化）

- 当访问一个静态域时，只有真正的申明这个域的类才会被初始化，如：当通过子类引用父类的静态变量，不会导致子类初始化
- 通过数组定义类引用，不会触发此类的初始化
- 引用常量不会触发此类的初始化（常量在链接阶段就存入调用类的常量池了）



#### 类加载器的作用

- **类加载的作用**：将class文件字节码内容加载到内存中，并将这些静态数据转换成方法区的运行时数据结构，然后在堆中生成了一个代表这个类的 `java.lang.Class`对象，作为方法区中类数据的访问入口。
- **类缓存**：标准的JavaSE类加载器可以按要求查找类，但是一旦某个类被加载到类加载器中，它将维持加载（缓存）一段时间。不过JVM垃圾回收机制可以回收这些Class对象

![image-20200329114720558](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200329114720558.png)

类加载器的作用是用来把类（Class）装载进内存的，JVM规范定义了如下类型的类的加载器

![image-20200329114953888](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200329114953888.png)

我们通过代码查询一下实际的类加载器的情况：

```java
/**
 * 获取类加载器的情况
 */
public class ClassLoaderTypeDemo {
    public static void main(String[] args) {

        //当前类是哪个加载器
        ClassLoader loader = ClassLoaderTypeDemo.class.getClassLoader();
        System.out.println(loader);

        // 获取系统类加载器
        ClassLoader classLoader = ClassLoader.getSystemClassLoader();
        System.out.println(classLoader);

        // 获取系统类加载器的父类加载器 -> 扩展类加载器
        ClassLoader parentClassLoader = classLoader.getParent();
        System.out.println(parentClassLoader);

        // 获取扩展类加载器的父类加载器 -> 根加载器（C、C++）
        ClassLoader superParentClassLoader = parentClassLoader.getParent();
        System.out.println(superParentClassLoader);

        // 测试JDK内置类是谁加载的
        ClassLoader loader2 = Object.class.getClassLoader();
        System.out.println(loader2);
    }
}
```

```bash
# 结果
sun.misc.Launcher$AppClassLoader@18b4aac2
sun.misc.Launcher$AppClassLoader@18b4aac2
sun.misc.Launcher$ExtClassLoader@45ee12a7
null
null
```

能够查看系统类加载器和扩展类加载器，而底层的类加载器无法获取（native）。



#### 查询类加载器能加载的路径

```java
// 如何获取类加载器可以加载的路径
System.out.println(System.getProperty("java.class.path"));
```

比如我个人在项目中查询的结果

```bash
E:\java\JDK8\jdk1.8.0_291\jre\lib\charsets.jar;
E:\java\JDK8\jdk1.8.0_291\jre\lib\deploy.jar;
E:\java\JDK8\jdk1.8.0_291\jre\lib\ext\access-bridge-64.jar;
E:\java\JDK8\jdk1.8.0_291\jre\lib\ext\cldrdata.jar;
E:\java\JDK8\jdk1.8.0_291\jre\lib\ext\dnsns.jar;
E:\java\JDK8\jdk1.8.0_291\jre\lib\ext\jaccess.jar;
E:\java\JDK8\jdk1.8.0_291\jre\lib\ext\jfxrt.jar;
E:\java\JDK8\jdk1.8.0_291\jre\lib\ext\localedata.jar;
E:\java\JDK8\jdk1.8.0_291\jre\lib\ext\nashorn.jar;
...
F:\idea-projects\mogu_blog_v2\mogu_admin\target\classes;
F:\idea-projects\mogu_blog_v2\mogu_xo\target\classes;
F:\idea-projects\mogu_blog_v2\mogu_commons\target\classes;
F:\idea-projects\mogu_blog_v2\mogu_base\target\classes;
...
E:\repository\cn\hutool\hutool-all\4.6.4\hutool-all-4.6.4.jar;
E:\repository\org\springframework\boot\spring-boot-starter-amqp\2.2.2.RELEASE\spring-boot-starter-amqp-2.2.2.RELEASE.jar;
E:\repository\org\springframework\spring-messaging\5.2.2.RELEASE\spring-messaging-5.2.2.RELEASE.jar;
...
```

大概包含了jdk内的jar包，项目class文件夹jar包，maven仓库jar包等。

能够发现，类在加载的时候，都是有自己的加载区域的，而不是任何地方的类都能够被加载



#### 获取运行时类的完整结构

通过反射能够获取运行时类的完整结构

- 实现的全部接口
- 所继承的父类
- 全部的构造器
- 全部的方法
- 全部的Field
- 注解

```java
public class GetClassInfo {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException, NoSuchMethodException {
        Class clazz = Class.forName("com.moxi.interview.study.annotation.User");

        // 获取类名字
        System.out.println(clazz.getName()); // 包名 + 类名
        System.out.println(clazz.getSimpleName()); // 类名

        // 获取类属性
        System.out.println("================");
        // 只能找到public属性
        Field [] fields = clazz.getFields();

        // 找到全部的属性
        Field [] fieldAll = clazz.getDeclaredFields();

        for (int i = 0; i < fieldAll.length; i++) {
            System.out.println(fieldAll[i]);
        }

        // 获取指定属性的值
        Field name = clazz.getDeclaredField("name");

        // 获取方法
        Method [] methods = clazz.getDeclaredMethods(); // 获取本类和父类的所有public方法
        Method [] methods2 = clazz.getMethods(); // 获取本类所有方法

        // 获得指定方法
        Method method = clazz.getDeclaredMethod("getName", null);

        // 获取方法的时候，可以把参数也丢进去，这样因为避免方法重载，而造成不知道加载那个方法
        Method method2 = clazz.getDeclaredMethod("setName", String.class);

    }
}
```



### 双亲委派机制

如果我们想定义一个：java.lang.string 包，我们会发现无法创建

因为类在加载的时候，会逐级往上，也就是说当前的系统加载器，不会马上的创建该类，而是将该类委派给 扩展类加载器，扩展类加载器再委派给根加载器，

然后引导类加载器去看这个类在不在能访问的路径下，发现 sring包已经存在了，所以就无法进行，也就是我们无法使用自己自定义的string类，而是使用初始化的string类。

————

当一个类收到了类加载请求，他首先不会尝试自己去加载这个类，而是把这个请求委派给父类去完成，每一个层次类加载器都是如此，因此所有的加载请求都应该传送到启动类加载其中，只有当父类加载器反馈自己无法完成这个请求的时候（在它的加载路径下没有找到所需加载的Class），子类加载器才会尝试自己去加载。

采用双亲委派的一个好处是比如加载位于rt.jar 包中的类java.lang.Object，不管是哪个加载器加载这个类，最终都是委托给顶层的启动类加载器进行加载，这样就保证了使用不同的类加载器最终得到的都是同样一个Object 对象。

![image-20200329122029227](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200329122029227.png)

### 能用Class对象做什么

#### 创建类的对象

通过调用Class对象的newInstance()方法

- 类必须有一个无参数的构造器
- 类的构造器的权限需要足够

> **如果没有无参构造器就不能创建对象？**
>
> 只要在操作的时候明确的调用类中的构造器，并将参数传递进去之后，也可以实例化操作。
>
> 步骤如下：
>
> - 通过Class类的getDeclaredConstructor(Class ... parameterTypes)取得本类的指定形参类型的构造器
> - 向构造器的形参中，传递一个对象数组进去，里面包含了构造器中所需的各个参数
> - 通过Constructor实例化对象

#### 调用指定方法

通过反射Method类完成，调用类中的方法。

- 通过Class类的getMethod方法取得一个Method对象，并设置此方法操作是所需要的参数类型
- 之后使用Object invoke进行调用，并向方法中传递要设置的obj对象的参数信息

##### Invoke方法

```java
Object invoke(Object obj， Object ... args)
```

- Object对应原方法的返回值，若原方法无返回值，此时返回null
- 若原方法为静态方法，此时形参Object 可以为null
- 若原方法形参列表为空，则Object[] args 为 null
- 若原方法声明private，则需要在调用此invoke() 方法前，显示调用方法对象的setAccessible(true)方法，将可访问private的方法

##### setAccessible方法

- Method、Field和Constructor对象都有setAccessible()方法
- setAccessible作用是启动和禁用访问安全检查的开关
- 参数值为true则指示反射对象再使用时应该取消Java语言访问检查
  - 提高反射效率，如果代码中必须使用反射，而这句代码需要频繁被嗲用，那么设置成true
  - 使得原本无法访问的私有成员也可以访问
- 参数值为false则指示反射的对象应该实行Java语言访问检查



### 反射操作泛型

Java采用泛型擦除机制来引入泛型，Java中的泛型仅仅是给编译器Java才使用的，确保数据的安全性和免去强制类型转换的问题，但是一旦编译完成后，所有的泛型有关的类型全部被擦除。

为了通过反射操作这些类型，Java新增了ParameterizedType，GenericArrayType，TypeVariable和WildcardType几种类型来代表不能被归一到Class类中的类型但是有何原始类型齐名的类型。

- **ParameterizedType**：代表被参数化的类型，也就是增加了泛型限制的类型。如List<?>
- **GenericArrayType**：表示一种元素类型是参数化类型或者类型变量的数组类型
- **TypeVariable**：是各种类型变量的公共父接口
- **WildcardType**：代表一种通配符类型的表达式

> 我没看懂

代码测试：

```java
/**
 * 反射获取泛型
 */
public class GenericityDemo {

    public void test01(Map<String, User> map, List<User> list) {
        System.out.println("test01");
    }

    public Map<String, User> test02() {
        System.out.println("test02");
        return null;
    }

    public static void main(String[] args) throws Exception{

        Method method = GenericityDemo.class.getMethod("test01", Map.class, List.class);

        // 获取所有的泛型，也就是参数泛型
        Type[] genericParameterTypes = method.getGenericParameterTypes();

        // 遍历打印全部泛型
        for (Type genericParameterType : genericParameterTypes) {
            System.out.println(" # " +genericParameterType);
            if(genericParameterType instanceof ParameterizedType) {
                //	获取这个类的所有泛型信息
                Type[] actualTypeArguments = ((ParameterizedType) genericParameterType).getActualTypeArguments();
                for (Type actualTypeArgument : actualTypeArguments) {
                    System.out.println(actualTypeArgument);
                }
            }
        }

        // 获取返回值泛型
        Method method2 = GenericityDemo.class.getMethod("test02", null);
        Type returnGenericParameterTypes = method2.getGenericReturnType();

        // 遍历打印全部泛型
        if(returnGenericParameterTypes instanceof ParameterizedType) {
            Type[] actualTypeArguments = ((ParameterizedType) returnGenericParameterTypes).getActualTypeArguments();
            for (Type actualTypeArgument : actualTypeArguments) {
                System.out.println(actualTypeArgument);
            }
        }

    }
}
```

打印结果

```bash
 # java.util.Map<java.lang.String, com.moxi.interview.study.annotation.User>
class java.lang.String
class com.moxi.interview.study.annotation.User
 # java.util.List<com.moxi.interview.study.annotation.User>
class com.moxi.interview.study.annotation.User
###################
class java.lang.String
class com.moxi.interview.study.annotation.User
```



### 反射操作注解

通过反射能够获取到 类、方法、字段...等上的注解

- getAnnotation
- getAnnotations

#### 应用：ORM对象关系映射

ORM即为：Object relationship Mapping，对象关系映射

- 类和表结构对应
- 属性和字段对应
- 对象和记录对应

![image-20200329153301047](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200329153301047.png)

通过代码模拟配合反射注解完成ORM对象关系映射：

表（类）/字段（属性）注解：

```java
/**
 * 自定义注解：类名的注解
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface TableKuang {
    String value();
}
/**
 * 自定义注解：属性的注解
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@interface FieldKuang {
    String columnName();
    String type();
    int length() default 0;
}
```

实体类，通过类注解配置表名，属性注解配置字段名：

```java
@Data
@TableKuang("db_student")
class Student2 {
    @FieldKuang(columnName = "db_id", type="int", length = 10)
    private int id;

    @FieldKuang(columnName = "db_age", type="int", length = 10)
    private int age;

    @FieldKuang(columnName = "db_name", type="varchar", length = 10)
    private String name;

    public Student2() {
    }

    public Student2(int id, int age, String name) {
        this.id = id;
        this.age = age;
        this.name = name;
    }

}
```

通过注解获取属性对应的字段

```java
public class ORMDemo {

    public static void main(String[] args) throws Exception{
        // 获取Student 的 Class对象
        Class c1 = Class.forName("com.moxi.interview.study.annotation.Student2");

        // 通过反射，获取到全部注解
        Annotation [] annotations = c1.getAnnotations();

        for (Annotation annotation : annotations) {
            System.out.println(annotation);
        }

        // 获取表名
        TableKuang tableKuang = (TableKuang)c1.getAnnotation(TableKuang.class);
        String value = tableKuang.value();
        System.out.println(value);

        // 获得name属性的字段配置属性
        Field f = c1.getDeclaredField("name");
        FieldKuang fieldKuang = f.getAnnotation(FieldKuang.class);
        System.out.println(fieldKuang.columnName());	//	字段名
        System.out.println(fieldKuang.type());	//	字段对应数据库类型
        System.out.println(fieldKuang.length());	//	限制长度
    }
}
```

可以用来自动生成数据表或者其他操作。



## 泛型与通配符

### 概念与作用

**Java 泛型（Generics）** 是 JDK 5 中引入的一个新特性。使用泛型参数，**可以增强代码的可读性以及稳定性**。

编译器可以对泛型参数进行检测，并且通过泛型参数可以指定传入的对象类型。





### 泛型擦除机制



#### 概念

编译器会在编译期间会动态地将泛型` T `擦除为 `Object `或将 `T extends xxx` 擦除为其限定类型 `xxx `。

**使用泛型的时候加上的类型参数，会被编译器在编译的时候去掉**。

泛型本质上其实还是编译器的行为，为了保证引入泛型机制但不创建新的类型，减少虚拟机的运行开销，编译器通过擦除将泛型类转化为一般类。



#### 特性

Java 泛型（Generic）的引入加强了参数类型的安全性，减少了类型的转换，但有一点需要注意：**Java 的泛型在编译器有效，在运行期被删除**。也就是说所有泛型参数类型在编译后都会被清除掉：

```java
public void print(List<String> list)  { }
public void print(List<Integer> list) { }
```

这样的方法重载在编译时会报错：

![image-20220513005902239](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220513005902239.png)

也就是通过编译后无法区别两个方法，系统无法判断两个方法的参数是不一样的。

> 很多泛型的奇怪特性都与这个类型擦除的存在有关，包括：
>
> - **泛型类并没有自己独有的Class类对象**。比如并不存在List.class或是List.class，而只有List.class。
> - **静态变量是被泛型类的所有实例所共享的**。对于声明为MyClass的类，访问其中的静态变量的方法仍然是 MyClass.myStaticVar。不管是通过new MyClass还是new MyClass<?>创建的对象，都是共享一个静态变量。
> - **泛型的类型参数不能用在Java异常处理的catch语句中**，因为异常处理是由JVM在运行时刻来进行的。由于类型信息被擦除，JVM是无法区分两个异常类型MyException和MyException<?>的。对于JVM来说，它们都是 MyException类型的。也就无法执行与异常对应的catch语句。

 Java 编译后的字节码中已经没有泛型的任何信息，在编译后所有的泛型类型都会做相应的转化，转化如下：

- `List<String> `，`List<T>`擦除后的类型为 `List`。
- `List<String>[]`，`List<T>[] `擦除后的类型为 `List[]`。
- `List<? extends E>`、`List<? super E>`擦除后的类型为 `List<E>`。
- `List<T extends Serialzable & Cloneable>`擦除后类型为 `List<Serialzable>`。

> **为什么这么做？**
>
> 避免 JVM 的大换血。如果 JVM 将泛型类型延续到运行期，那么到运行期时 JVM 就需要进行大量的重构工作了，提高了运行期的效率。
> 为了版本兼容。 在编译期擦除可以更好地支持原生类型（Raw Type）。



#### 基本过程

类型擦除的基本过程也比较简单：

- 首先是找到用来替换类型参数的具体类，这个具体类一般是Object。如果指定了类型参数的上界的话，则使用这个上界。

- 把代码中的类型参数都替换成具体的类，同时去掉出现的类型声明，即去掉<>的内容。比如T get()方法声明就变成了Object get()；List就变成了List。

- 接下来就可能需要生成一些桥接方法（bridge method）。这是由于擦除了类型之后的类可能缺少某些必须的方法。比如考虑下面的代码：

  ```java
  class MyString implements Comparable<String> {
      public int compareTo(String str) {        
          return 0;    
      }
  } 
  ```

  当类型信息被擦除之后，上述类的声明变成了class MyString implements Comparable。但是这样的话，类MyString就会有编译错误，因为没有实现接口Comparable声明的String compareTo(Object)方法。这个时候就由编译器来动态生成这个方法。
  
  

#### 既然编译器要把泛型擦除，那为什么还要用泛型呢？用 Object 代替不行吗？

- 使用泛型可在编译期间进行**类型检测**。 
- 使用 Object 类型需要手动添加**强制类型转换**，降低代码可读性，提高出错概率。 
- 泛型可以使用**自限定类型**如 `T extends Comparable `。 



#### 泛型的Class对象是相同的

每个类都有一个 class 属性，泛型化不会改变 class 属性的返回值，例如：

```java
public static void main(String[] args) {
    List<String> ls = new ArrayList<String>();
    List<Integer> li = new ArrayList<Integer>();
    System.out.println(ls.getClass() == li.getClass());
}
```

代码返回值为 true，原因很简单，List\<String>和 List\<Integer> 擦除后的类型都是 List。



### 泛型的限制

泛型的限制由泛型擦除机制导致，擦除为`Object`后无法进行类型判断

- **只能声明不能实例化`T`类型变量**

- **泛型参数不能是基本类型。**

  因为基本类型不是`Object`子类，需要用包装类代替。

- **不能实例化泛型数组，不能实例化泛型参数的数组**

  这样是不能通过编译的：

  ```java
  List<String>[] list = new List<String>[];
  ```

  **可以声明带有泛型的数组，但不能初始化**，因为执行类型擦除后，List\<String>[]与List\<Object>[]就一样了，编译器拒绝如此声明。

- **泛型无法使用`instance of`和`getClass()`判断类型**

  泛型被擦除了，不能通过编译

  ```java
  List<String> list = new ArrayList<String>();
  System.out.println(list instanceof List<String>);
  ```

  错误信息如下：

  ```bash
  Cannot perform instanceof check against parameterized type List. Use the form List<?> instead since further generic type information will be erased at runtime
  ```

- **不能实现同一泛型接口的两种变体**

  类型擦除后多个父类的[桥方法](桥方法)会发生冲突。

- **不能使用`static`修饰泛型变量**



### 桥方法

桥方法(Bridge Method) 用于继承泛型类时保证多态。

> 桥方法为编译器自动生成，非手写。

```java
class Node<T> {
    public T data;
    public Node(T data) { this.data = data; }
    public void setData(T data) {
        System.out.println("Node.setData");
        this.data = data;
    }
}

class MyNode extends Node<Integer> {
    public MyNode(Integer data) { super(data); }

  	// Node<T> 泛型擦除后为 setData(Object data)，而子类 MyNode 中并没有重写该方法，所以编译器会加入该桥方法保证多态
   	public void setData(Object data) {
        setData((Integer) data);
    }

    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }
}
```









### 通配符与上下界



#### 什么是通配符？作用？

泛型类型是固定的，某些场景不灵活，通配符允许类型参数变化，解决泛型无法协变的问题。



#### 常用通配符T、E、K、V、？

本质上这些个都是通配符，没啥区别，只不过是编码时的一种约定俗成的东西，换成任何字母都可以。

一般情况是这么约定的：

| 通配符 | 含义                                |
| ------ | ----------------------------------- |
| ？     | 不确定的java类型                    |
| T      | Type，表示具体的java类型            |
| K/V    | Key/Value，表示java键值对中的键与值 |
| E      | Element，表示元素                   |



#### 无界通配符 <?>

对于**不确定**或者**不关心实际要操作的类型**，可以使用无限制通配符（尖括号里一个问号，即 <?> ），表示可以持有任何类型。

无界通配符可以接收任何类型的泛型类型数据，用于实现不依赖于具体类型参数的简单方法，可以捕获参数类型，交由泛型方法进行处理。



##### `List<?>`与`List`的区别

- `List<?>`表示是持有某种特定类型的集合，但不知道是哪种具体类型。

  插入元素进去时会报错。

- `List`表示集合持有的元素就是`Object`类型，可以插入任何类型的对象。

```java
List<?> list = new ArrayList<>();
list.add("sss");//报错
List list2 = new ArrayList<>();
list2.add("sss");//警告信息
```



##### `Class<?>` 和 `Class` 的区别？

直接使用 Class 的话会有一个类型警告，使用 Class<?> 则没有，

因为 Class 是一个泛型类，接收原生类型会产生警告。



##### 通配符？与常用泛型T的区别

- `T`可以用来声明变量或常量，`?`不行
- `T`一般用来声明泛型类或方法，`?`一般用于泛型方法的调用代码和形式参数
- `T`编译期会被擦除为限定类型或`Object`，通配符用于捕获具体类型



#### 上下界通配符



##### 上界通配符 < ? extends E>

用 extends 关键字声明，表示参数化的类型可能是所指定的类型，或者是此类型的子类。

可以实现泛型的向上转型即传入的类型实参必须是指定类型的子类型。

在类型参数中使用 extends 表示这个泛型中的参数必须是 E 或者 E 的子类，这样有两个好处：

- 如果传入的类型不是 E 或者 E 的子类，编译不成功
- 泛型中可以使用 E 的方法，要不然还得强转成 E 才能使用

类型参数列表中如果有多个类型参数上限，用逗号分开：

```java
private <K extends A, E extends B> E test(K arg1, E arg2){
    E result = arg2;
    arg2.compareTo(arg1);
    //.....
    return result;
}
```



##### 下界通配符 < ? super E>

用 super 进行声明，表示参数化的类型可能是所指定的类型，或者是此类型的父类型，直至 Object。

可以实现泛型的向下转型即传入的类型实参必须是指定类型的父类型。

在类型参数中使用 super 表示这个泛型中的参数必须是 E 或者 E 的父类。

```java
private <T> void test(List<? super T> dst, List<T> src){
    for (T t : src) {
        dst.add(t);
    }
}

public static void main(String[] args) {
    List<Dog> dogs = new ArrayList<>();
    List<Animal> animals = new ArrayList<>();
    new Test3().test(animals,dogs);
}
// Dog 是 Animal 的子类
class Dog extends Animal {

} 
```

因为Animal是Dog的父类，所以List\<? super Dog>能够添加Dog对象。

> 可以使用\<T extends A> 但没有\<T super A>，只有\<? super A>



##### `? extends xxx` 和 `? super xxx` 区别

- 两者接收参数的范围不同。
- 使用 `? extends xxx `声明的泛型参数只能调用 get() 方法返回 xxx 类型，调用 set() 报错。
- 使用 `? super xxx` 声明的泛型参数只能调用 set() 方法接收 xxx 类型，调用 get() 报错。

##### `T extends xxx `和` ? extends xxx `又有什么区别？

- `T extends xxx` 用于定义泛型类和方法，擦除后为 xxx 类型
- `? extends xxx `用于声明**方法形参**，接收 xxx 和其子类型。



#### 多重限定& 泛型多继承

使用 & 符号设定多重边界（Multi Bounds)，让对应类型成为多个类型的共有子类型

```java
public <T extends ClassA & InterfaceB> void test(T t);
```

> 这里的继承并不是真正意义的多继承，Class顶多一个，接口可以有多个，否则还是会报错。
>
> ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20201230221859264.png)



### 类型系统

在Java中，大家比较熟悉的是通过继承机制而产生的类型体系结构。比如String继承自Object。根据Liskov替换原则，子类是可以替换父类的。

当需要Object类的引用的时候，如果传入一个String对象是没有任何问题的。但是反过来的话，即用父类的引用替换子类引用的时候，就需要进行强制类型转换。对于数组也适用，如String[]代替Object[]。

编译器并不能保证运行时这种转换一定是合法的，但是泛型的引入，一定程度上对这个系统产生了一定影响，比如List\<String>是不能替换掉List\<Object>的。

引入泛型后类型系统增加了两个维度：

- 类型参数自身的继承体系结构，如List\<String> 和 List\<Object> ，其中String继承Object
- 泛型类或接口自身的继承体系结构，如List继承Collection接口

存在如下规则：

1. 相同类型参数的泛型类的关系取决于泛型类自身的继承体系结构。

   即List\<String>继承自Collection\<String>，可以用来替换Collection\<String>。

2. 当泛型类的类型声明中使用了通配符的时候， 其子类型可以在两个维度上分别展开。

   如Collection<? extends Number>，它的子类

   既可以是List<? extends Number>和Set<? extends Number>等；

   也可以是Collection\<Double>和 Collection\<Integer>等；

   进而ArrayList\<Long>和 HashSet\<Double>等。

3. 如果泛型类中包含多个类型参数，则对于每个类型参数分别应用上面的规则。



### 自定义泛型类

泛型类与一般的Java类基本相同，只是在类和接口定义上多出来了用<>声明的类型参数。

- 一个类可以有多个类型参数，如 MyClass<X, Y, Z>。
- 每个类型参数在声明的时候可以指定上界。
- 所声明的类型参数在Java类中可以像一般的类型一样作为方法的参数和返回值，或是作为域和局部变量的类型。
- 但是由于类型擦除机制，类型参数并不能用来**创建对象**或是作为**静态变量**的类型。



### 泛型传递

即泛型可以当作参数在不同的实例化的类中传递，理论上来说可以无限制层次的传递下去。最终会约束每一层的方法或者类型的泛型。



### 最佳实践

在使用泛型的时候可以遵循一些基本的原则，从而避免一些常见的问题。

* 在代码中避免泛型类和原始类型的混用。

  比如List\<String>和List不应该共同使用。这样会产生一些编译器警告和潜在的运行时异常。当需要利用JDK 5之前开发的遗留代码，而不得不这么做时，也尽可能的隔离相关的代码。

* 在使用带通配符的泛型类的时候，需要明确通配符所代表的一组类型的概念。

  由于具体的类型是未知的，很多操作是不允许的。

* 泛型类最好不要同数组一块使用。

  你只能创建new List<?>\[10\]这样的数组，无法创建new List\<String>\[10\]这样的。这限制了数组的使用能力，而且会带来很多费解的问题。因此，当需要类似数组的功能时候，使用集合类即可。

* 不要忽视编译器给出的警告信息。



## JVM类加载机制

在反射里有所提及 [类的加载与ClassLoader](###类的加载与ClassLoader)

### 类加载器

![image-20200705094149223](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200705094149223.png)

虚拟机设计团队把加载动作放到JVM外部实现，以便于引用程序决定如何获取所需的类，JVM提供了三种类加载器：

#### 启动类加载器Bootstrap ClassLoader（引导类加载器）

负责加载$JAVA_HOME\lib目录中的，或通过-X bootclasspath 参数指定路径下的，且被虚拟机认可（按文件名识别，如tr.jar）的类

- 这个类加载使用C/C++语言实现的，嵌套在JVM内部。
- 它用来加载Java的核心库（JAVAHOME/jre/lib/rt.jar、resources.jar或sun.boot.class.path路径下的内容），用于提供JVM自身需要的类
- 并不继承自java.lang.ClassLoader，没有父加载器。
- 加载扩展类和应用程序类加载器时，被指定为他们的父类加载器。
- 出于安全考虑，Bootstrap启动类加载器只加载包名为java、javax、sun等开头的类

> **查看根加载器加载范围**
>
> ```java
> public class ClassLoaderTest1 {
>     public static void main(String[] args) {
>         System.out.println("*********启动类加载器************");
>         // 获取BootstrapClassLoader 能够加载的API的路径
>         URL[] urls = sun.misc.Launcher.getBootstrapClassPath().getURLs();
>         for (URL url : urls) {
>             System.out.println(url.toExternalForm());
>         }
> 
>         // 从上面路径中，随意选择一个类，来看看他的类加载器是什么：得到的是null，说明是  根加载器
>         ClassLoader classLoader = Provider.class.getClassLoader();
>     }
> }
> ```

#### 扩展类加载器Extension ClassLoader

负责加载$JAVA_HOME\lib\ext目录中的，或通过java.ext.dirs系统变量指定路径中的类库。

- Java语言编写，由sun.misc.Launcher$ExtClassLoader实现。
- 派生于ClassLoader类
- 父类加载器为启动类加载器
- 从java.ext.dirs系统属性所指定的目录中加载类库，或从JDK的安装目录的jre/1ib/ext子目录（扩展目录）下加载类库。如果用户创建的JAR放在此目录下，也会自动由扩展类加载器加载。



#### 应用程序类加载器Application ClassLoader（系统类加载器）

负责加载用户路径（classpath）上的类库。

- java语言编写，由sun.misc.Launcher$AppClassLoader实现
- 派生于ClassLoader类
- 父类加载器为扩展类加载器
- 它负责加载环境变量classpath或系统属性java.class.path指定路径下的类库
- 该类加载是程序中默认的类加载器，一般来说，Java应用的类都是由它来完成加载
- 通过ClassLoader.getSystemclassLoader()方法可以获取到该类加载器



#### 用户自定义类加载器User ClassLoader

##### 自定义类加载器的原因

- 隔离加载类
- 修改类加载的方式
- 扩展加载源
- 防止源码泄漏

##### 自定义类加载器方式

- 开发人员可以通过继承抽象类java.1ang.ClassLoader类的方式，实现自己的类加载器，以满足一些特殊的需求
- 在JDK1.2之前，在自定义类加载器时，总会去继承ClassLoader类并重写1oadClass()方法，从而实现自定义的类加载类，但是在JDK1.2之后已不再建议用户去覆盖1oadClass()方法，而是建议把自定义的类加载逻辑写在findclass()方法中
- 在编写自定义类加载器时，如果没有太过于复杂的需求，可以直接继承URIClassLoader类，这样就可以避免自己去编写findclass()方法及其获取字节码流的方式，使自定义类加载器编写更加简洁。



JVM通过双亲委派进行类的加载，当然我们也可以通过继承java.lang.ClassLoader实现自定义的类加载器。



#### 获取不同类加载器

```java
public class ClassLoaderTest {
    public static void main(String[] args) {
        // 获取系统类加载器
        ClassLoader systemClassLoader = ClassLoader.getSystemClassLoader();
        System.out.println(systemClassLoader);

        // 获取其上层的：扩展类加载器
        ClassLoader extClassLoader = systemClassLoader.getParent();
        System.out.println(extClassLoader);

        // 试图获取 根加载器
        ClassLoader bootstrapClassLoader = extClassLoader.getParent();
        System.out.println(bootstrapClassLoader);

        // 获取自定义加载器
        ClassLoader classLoader = ClassLoaderTest.class.getClassLoader();
        System.out.println(classLoader);
        
        // 获取String类型的加载器
        ClassLoader classLoader1 = String.class.getClassLoader();
        System.out.println(classLoader1);
    }
}
```

结果

```sh
sun.misc.Launcher$AppClassLoader@18b4aac2
sun.misc.Launcher$ExtClassLoader@1540e19d
null
sun.misc.Launcher$AppClassLoader@18b4aac2
null 
```

- 根加载器无法直接通过代码获取;
- 同时目前用户代码所使用的加载器为系统类加载器；
- 同时我们通过获取String类型的加载器，发现是null，那么说明String类型是通过根加载器进行加载的，也就是说Java的核心类库都是使用根加载器进行加载的。



#### ClassLoader类

ClassLoader类，它是一个抽象类，其后所有的类加载器都继承自ClassLoader（不包括启动类加载器）

![image-20200705103516138](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200705103516138.png)

![image-20200705103636003](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200705103636003.png)

##### 获取ClassLoader途径

- 获取当前ClassLoader：`clazz.getClassLoader()`
- 获取当前线程上下文的ClassLoader：`Thread.currentThread().getContextClassLoader()`
- 获取系统的ClassLoader：`ClassLoader.getSystemClassLoader()`
- 获取调用者的ClassLoader：`DriverManager.getCallerClassLoader()`



##### ClassLoader类方法

- loadClass()	类加载方法，双亲委派机制在其中
- findClass()    根据名称/位置加载class字节码
- defineClass()    根据字节码转化为class

> **如果你想定义一个自己的类加载器，并且要遵守双亲委派模型，那么可以继承ClassLoader，并且在findClass中实现你自己的加载逻辑即可。**





### 类的加载过程

JVM类加载机制主要分为以下五个部分：加载、验证、准备、解析、初始化

#### 加载

加载是类加载过程中的一个阶段，

这个阶段会在内存中生成一个代表这个类的java.lang.Class对象，作为方法区这个类的各种数据的入口。

注意这里不一定非得要从一个Class文件获取，这里既可以从ZIP包中读取（例如从jar包或者war包中读取），也可以在运行时计算生成（动态代理），也可以由其它文件生成（比如将JSP文件转换成对应的Class类）

#### 验证

这一阶段的主要目的就是为了确保Class文件的字节流中包含的信息是否符合当前虚拟机的要求，并且不会危害虚拟机自身的安全。

#### 准备

准备阶段是正式为类变量**分配内存**并**设置类变量的初始值**阶段，即在方法区中分配这些变量所使用的内存空间。

注意这里所说的初始值概念，比如一个类变量定义为： v = 8080，实际上变量v在准备阶段过后的初始值为0，而不是8080，将v赋值为8080的put static指令是在程序被编译后，存放在类构造器方法之中。

如果这个类变量是静态类变量初始值：

```java
public static final int v = 8080;
```

在编译阶段会给v生成ConstantValue属性，在准备阶段虚拟机会根据ConstantValue属性将v赋值为8080。

#### 解析

解析阶段是指虚拟机将常量池中的**符号引用**替换为**直接引用**的过程。符号引用就是class文件中的类型常量。

```java
CONSTANT_CLASS_info
CONSTANT_Field_info
CONSTANT_Method_info
```

> **符号引用**
>
> 符号引用与虚拟机实现的布局无关，引用的目标并不一定要已经加载到内存中。
>
> 各种虚拟机实现的内存布局可以各不相同，但是它们能接受的符号引用必须一致的，因为符号引用的字面量形式明确定义在Java虚拟机规范的Class的文件格式中。
>
> 编译时，java类并不知道所引用的类的实际地址，因此只能使用符号引用来代替。
>
> 比如org.simple.People类引用了org.simple.Language类，在编译时People类并不知道Language类的实际内存地址，因此只能使用符号org.simple.Language（假设是这个，当然实际中是由类似于CONSTANT_Class_info的常量来表示的）来表示Language类的地址。
>
> 各种虚拟机实现的内存布局可能有所不同，但是它们能接受的符号引用都是一致的，因为符号引用的字面量形式明确定义在Java虚拟机规范的Class文件格式中
>
> **直接引用**
>
> 直接引用可以是指向目标的指针，相对于偏移量或是一个能直接定位到目标的句柄，如果有了直接引用，那引用的目标必定已经在内存中存在了。

相当于类的内存地址已经确定，将其地址替换掉之前的符号引用。

#### 初始化

初始化阶段是类加载的最后一个阶段，

前面的类加载阶段之后，除了在加载阶段可以自定义类加载器以外，其它操作都是由JVM主导，

到了初始化阶段，才开始真正指定类中定义的Java程序代码。



### 触发类加载的时机

Java程序对类的使用方式分为：王动使用和被动使用。

只有主动使用会触发类加载。

主动使用的情况：

- 创建类的实例
- 访问某个类或接口的静态变量，或者对该静态变量赋值
- 调用类的静态方法I
- 反射（比如：`Class.forName("com.atguigu.Test")`）
- 初始化一个类的子类
- Java虚拟机启动时被标明为启动类的类
- JDK7开始提供的动态语言支持：
- java.lang.invoke.MethodHandle实例的解析结果REF getStatic、REF putStatic、REF invokeStatic句柄对应的类没有初始化，则初始化



## ThreadLocal

### 介绍

Java官方文档中的描述：

ThreadLocal类用来提供线程内部的局部变量。这种变量在多线程环境下访问（通过get和set方法访问）时能保证各个线程的变量相对独立于其他线程内的变量。

ThreadLocal实例通常来说都是private static类型的，用于关联线程和线程上下文。

所以ThreadLocal的作用是：

提供线程内的局部变量，不同的线程之间不会相互干扰，这种变量在线程的生命周期内起作用，减少同一个线程内多个函数或组件之间一些公共变量传递的复杂度。

- 线程并发：在多线程并发的场景下
- 传递数据：我们可以通过ThreadLocal在同一线程，不同组件之间传递公共变量（有点类似于Session？）
- 线程隔离：每个线程的变量都是独立的，不会互相影响

### 基本使用

常见方法

| 方法声明                 | 描述                       |
| ------------------------ | -------------------------- |
| ThreadLocal()            | 创建ThreadLocal对象        |
| public void set(T value) | 设置当前线程绑定的局部变量 |
| public T get()           | 获取当前线程绑定的局部变量 |
| public void remove()     | 移除当前线程绑定的局部变量 |

### 演示

线程不隔离的情况

```java
public class MyDemo01 {
    // 变量
    private String content;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public static void main(String[] args) {
        MyDemo01 myDemo01 = new MyDemo01();
        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
                myDemo01.setContent(Thread.currentThread().getName() + "的数据");
                System.out.println("-----------------------------------------");
                System.out.println(Thread.currentThread().getName() + "\t  " + myDemo01.getContent());
            }, String.valueOf(i)).start();
        }
    }
}
```

打印结果

```bash
-----------------------------------------
-----------------------------------------
-----------------------------------------
3      4的数据
-----------------------------------------
2      4的数据
-----------------------------------------
1      4的数据
4      4的数据
0      4的数据
```

可以看到出现了线程数据混乱的情况，第三个线程取到了第四个线程的数据。

这个时候使用ThreadLocal，让数据与线程进行绑定，特定线程只取属于这个线程的数据：

```java
public static void main(String[] args) {
    MyDemo01 myDemo01 = new MyDemo01();
    ThreadLocal<String> threadLocal = new ThreadLocal<>();
    for (int i = 0; i < 5; i++) {
        new Thread(() -> {
            threadLocal.set(Thread.currentThread().getName() + "的数据");
            System.out.println("-----------------------------------------");
            System.out.println(Thread.currentThread().getName() + "\t  " + threadLocal.get());
        }, String.valueOf(i)).start();
    }
}
```

打印结果

```java
-----------------------------------------
-----------------------------------------
4      4的数据
-----------------------------------------
3      3的数据
-----------------------------------------
2      2的数据
-----------------------------------------
1      1的数据
0      0的数据
```



### ThreadLocal与synchronized关键字区别

首先，线程隔离通过synchronized也可以实现：

```java
public static void main(String[] args) {
    MyDemo03 myDemo01 = new MyDemo03();
    for (int i = 0; i < 5; i++) {
        new Thread(() -> {
            synchronized (MyDemo03.class) {
                myDemo01.setContent(Thread.currentThread().getName() + "的数据");
                System.out.println("-----------------------------------------");
                System.out.println(Thread.currentThread().getName() + "\t  " + myDemo01.getContent());
            }
        }, String.valueOf(i)).start();
    }
}
```

但是并发性降低了。

#### 区别

- synchronized同步机制采用以时间换空间的方式，只提供了一份变量，让不同的线程排队访问。
- ThreadLocal采用以空间换时间的方式，为每个线程提供一个变量副本，实现同时访问互不干扰。
- synchronized侧重多个线程之间访问资源的同步。
- ThreadLocal侧重多线程数据互相隔离。



### 运用场景

常用于事务操作

#### 案例：转账

构建一个简单的转账场景：有一个数据表account，里面有两个用户 jack 和 Rose，用户Jack给用户Rose转账。

![image-20200710204941153](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200710204941153.png)

##### 引入事务

案例中转账涉及两个DML操作：一个转出，一个转入。这些操作是需要具备原子性的，不可分割。不然有可能出现数据修改异常情况。

引入事务使得转入和转出只能同时成功或失败。

> - **JDBC中关于事务操作的API**
>
>   | Connection接口的方法      | 作用                             |
>   | ------------------------- | -------------------------------- |
>   | void setAutoCommit(false) | 禁用事务自动提交（改为手动提交） |
>   | void commit()             | 提交事务                         |
>   | void rollbakc()           | 回滚事务                         |
>
> - **开启事务的注意点**
>
>   - 为了保证所有操作在一个事务中，案例中使用的连接必须是同一个；
>   - service层开启事务的connection，需要跟dao层访问数据库的connection保持一致；
>   - 线程并发情况下，每个线程只能操作各自的connection，也就是线程隔离

##### 常规解决方案

- 从service层将connection对象向dao层传递
- 加锁

**弊端**

- 提高了代码的耦合度（因为我们需要从service 层 传入 connection参数）
- 降低程序的性能（加了同步代码块，失去了并发性）

##### 解决方案

使用ThreadLocal将Connection与当前线程绑定，减降低代码耦合。

![image-20200710212423494](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200710212423494.png)

- 将原来从连接池中获取对象，改成直接获取当前线程绑定的连接对象
- 如果连接对象是空的
  - 再去连接池中获取连接
  - 将此连接对象跟当前线程进行绑定

##### 好处

从上述的案例中我们可以看到，在一些特定场景下，ThreadLocal方案有两个突出的优势：

- 传递数据：保存每个线程绑定的数据，在需要的地方可以直接获取，避免参数直接传递带来的代码耦合问题
- 线程隔离：各线程之间的数据相互隔离却又具备并发性，避免同步方式带来的性能损失



### 内部结构

#### 误解

不看源代码，可能会猜测 ThreadLocal 是这样子设计的：

每个ThreadLocal都创建一个Map，然后用线程作为Map的key，要存储的局部变量作为Map的value，这样就能达到各个线程的局部变量隔离的效果。

这是最简单的设计方法，JDK最早期的ThreadLocal确实是这样设计的，但现在早已不是了。

![image-20200710214857638](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200710214857638.png)

#### 设计结构（JDK8）

JDK后面优化了设计方案，在JDK8中 ThreadLocal的设计是：

每个Thread维护一个ThreadLocalMap，这个Map的key是ThreadLocal实例本身，value 才是真正要存储的值object。

##### 具体过程

- 每个Thread线程内部都有一个Map（ThreadLocalMap）
- Map里面存储ThreadLocal对象（key）和线程的变量副本（value）
- Thread内部的Map是由ThreadLocal维护的，由ThreadLocal负责向map获取和设置线程的变量值。
- 对于不同的线程，每次获取副本值时，别的线程并不能获取到当前线程的副本值，形成了副本的隔离，互不干扰。

![image-20200710215038748](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200710215038748.png)



##### 有什么好处？

- 每个Map存储的Entry数量变少，因为原来的Entry数量是由Thread决定，而现在是由ThreadLocal决定的

  >  真实开发中，Thread的数量远远大于ThreadLocal的数量（高并发）

- 当Thread销毁的时候，ThreadLocalMap也会随之销毁，因为ThreadLocal是存放在Thread中的，随着Thread销毁而消失，能降低开销。

  > 相当于数据库自动维护数据更新，在线程被销毁的时候，数据就一同清除。用存储线程键的方式，还会继续占用空间。



### 核心方法源码

 除了构造方法之外，ThreadLocal对外暴露的方法有以下4个

| 方法声明                   | 描述                         |
| -------------------------- | ---------------------------- |
| protected T initialValue() | 返回当前线程局部变量的初始值 |
| public void set(T value)   | 返回当前线程绑定的局部变量   |
| public T get()             | 获取当前线程绑定的局部变量   |
| public void remove()       | 移除当前线程绑定的局部变量   |

##### public void set(T value)

```java
//	设置当前线程的ThreadLocal存储的值
public void set(T value) {
    //	获取当前线程
    Thread t = Thread.currentThread();
    //	获取当前线程中维护的ThreadLocalMap
    ThreadLocalMap map = getMap(t);
    if (map != null)
        //	有的话将变量存进去，key是这个线程的ThreadLocal对象
        map.set(this, value);
    else
        //	否则创建一个ThreadLocalMap，然后将值赋进去
        createMap(t, value);
}
ThreadLocalMap getMap(Thread t) {
    return t.threadLocals;
}
void createMap(Thread t, T firstValue) {
    t.threadLocals = new ThreadLocalMap(this, firstValue);
}
```

##### public T get()

```java
public T get() {
    Thread t = Thread.currentThread();
    //	获取当前线程ThreadLocalMap
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        //	取出值
        ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T)e.value;
            return result;
        }
    }
    //	如果Map尚未维护或者没有对应值则设置初始化
    return setInitialValue();
}
private T setInitialValue() {
    T value = initialValue();
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null)
        map.set(this, value);
    else
        createMap(t, value);
    return value;
}
```

代码执行流程

1. 首先获取当前线程，根据当前线程获取一个Map

2. 如果获取的Map不为空，则在Map中以ThreadLocal的引用作为key来在Map中获取对应的Entry，否则转到第四步

3. 如果e不为null，则返回e.value，否则转到第四步

4. Map为空或者e为空，则通过initialValue函数获取初始值value，然后用ThreadLocal的引用和value作为firstKey和firstValue创建一个新的Map

总结：先获取当前线程的ThreadLocal变量，如果存在则返回值，不存在则创建并返回初始值

##### public void remove()

```java
public void remove() {
    ThreadLocalMap m = getMap(Thread.currentThread());
    if (m != null)
        //	存在维护的map则从中移除对应entry
        m.remove(this);
}
```

##### protected T initialValue()

```java
protected T initialValue() {
    return null;
}
```

此方法的作用是返回该线程局部变量的初始值。

- 这个方法是一个延迟调用方法，从上面的代码我们得知，在set方法还未调用而先调用了get方法时才执行，并且仅执行1次。
- 这个方法缺省实现直接返回一个null。
- 如果想要一个除null之外的初始值，可以重写此方法。（备注：该方法是一个protected的方法，显然是为了让子类覆盖而设计的）



### ThreadLocalMap源码分析

#### 基本结构

ThreadLocalMap是ThreadLocal的内部类，没有实现Map接口，用独立的方式实现了Map的功能，其内部的Entry也是独立实现。

![image-20200710220856315](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200710220856315.png)

#### 成员变量

```java
/**
* 初始容量 - 必须是2的整次幂
**/
private static final int INITIAL_CAPACITY = 16;

/**
*存放数据的table ，Entry类的定义在下面分析，同样，数组的长度必须是2的整次幂
**/
private Entry[] table;

/**
*数组里面entrys的个数，可以用于判断table当前使用量是否超过阈值
**/
private int size = 0;

/**
*进行扩容的阈值，表使用量大于它的时候进行扩容
**/
private int threshold; // Default to 0
```

- INITIAL_CAPACITY代表Map的初始容量
- table是一个Entry类数组
- size记录entry已经存储的量
- threshold记录扩容阈值，超过这个时进行扩容操作

#### 存储结构-Entry

位于ThreadLocalMap的静态内部类

```java
static class Entry extends WeakReference<ThreadLocal<?>> {
    /** The value associated with this ThreadLocal. */
    Object value;

    Entry(ThreadLocal<?> k, Object v) {
        super(k);
        value = v;
    }
}
```

- 也是用Entry保存K-V结构，但通过构造方法限定了键只能是ThreadLocal。
- Entry继承于WeakReference，表示**key是弱引用**，目的是将ThreadLocal对象的生命周期和线程生命周期解绑。



#### 解决Hash冲突

hash冲突的解决是Map中的一个重要内容，研究一下ThreadLocalMap如何解决这个问题。

从ThreadLocal的set方法入手，之前分析源码有两个地方涉及ThreadLocalMap：

- 如果有ThreadLocalMap则调用ThreadLocalMap的set方法将值绑定进去。

- 如果没有ThreadLocalMap则调用构造方法创建ThreadLocalMap。

##### 构造方法

```java
//	带有设置初始值的构造方法
ThreadLocalMap(ThreadLocal<?> firstKey, Object firstValue) {
    table = new Entry[INITIAL_CAPACITY];
    int i = firstKey.threadLocalHashCode & (INITIAL_CAPACITY - 1);
    table[i] = new Entry(firstKey, firstValue);
    size = 1;
    setThreshold(INITIAL_CAPACITY);
}
private void setThreshold(int len) {
    threshold = len * 2 / 3;
}
```

- 创建一个初始大小16的Entry数组赋值给table

- 计算firstValue的索引，存储在table的对应位置

  > **计算索引**
  >
  > ```java
  > int i = firstKey.threadLocalHashCode & (INITIAL_CAPACITY - 1);
  > ```
  >
  > 其中threadLocalHashCode的计算方式：
  >
  > ```java
  > private final int threadLocalHashCode = nextHashCode();
  > private static int nextHashCode() {
  >     return nextHashCode.getAndAdd(HASH_INCREMENT);
  > }
  > private static AtomicInteger nextHashCode = new AtomicInteger();
  > private static final int HASH_INCREMENT = 0x61c88647;
  > ```
  >
  > - AtomicInteger是一个提供原子操作的Integer类，线程安全的进行加减，适合高并发
  >
  > - 每次获取threadLocalHashCode都会让AtomicInteger类型的nextHashCode加一个固定值HASH_INCREMENT = 0x61c88647
  >
  > - 这个固定值 0x61c88647跟斐波那契数列（黄金分割数）有关，其主要目的就是为了让哈希码能均匀的分布在2的n次方的数组里，也就是Entry的table中，这样做可以尽量避免hash冲突。
  >
  > - **& (INITIAL_CAPACITY - 1)**的含义是 相当于取模运算hashCode%size的一个更高效的实现。
  >
  >   但要求size必须是2的整数次幂，可以在保证索引不越界的情况下，hash冲突次数减少。

- 设置size和threshold，可以看到扩容因子是2/3，size是1



##### Set方法

```java
private void set(ThreadLocal<?> key, Object value) {

    Entry[] tab = table;
    int len = tab.length;
    //	定索引
    int i = key.threadLocalHashCode & (len-1);
	//	线性探测法查找元素 直到遇到entry为空
    for (Entry e = tab[i]; e != null; e = tab[i = nextIndex(i, len)]) {
        ThreadLocal<?> k = e.get();
		//	找到对应ThreadLocal的值则替换
        if (k == key) {
            e.value = value;
            return;
        }
		//	探测到被回收的key则当作一个新位置，原来的value也进行回收，直接把新的键值放在这里
        if (k == null) {
            //	新元素替换旧元素，并进行了一些垃圾清理动作
            replaceStaleEntry(key, value, i);
            return;
        }
    }
    //	如果有值的键值对里没有则新建Entry存储元素
    tab[i] = new Entry(key, value);
    int sz = ++size;
    //	cleanSomeSlots用于清除键为null的元素
    //	如果返回false说明没有这样的元素被清除
    //	sz >= threshold说明已经达到了扩容的条件
    //	则进行rehash() 全表的扫描清理工作
    if (!cleanSomeSlots(i, sz) && sz >= threshold)
        rehash();
}
private static int nextIndex(int i, int len) {
    return ((i + 1 < len) ? i + 1 : 0);
}
```

- 首先根据key计算出索引i，然后查找位置上的Entry；
- 若是Entry已经存在并且key等于传入的key，那么这时候直接给这个Entry赋新的value值；
- 若是Entry存在，但是key为null，则调用replaceStaleEntry来更换这个key为空的Entry；
- 不断循环检测，直到遇到Entry为null的地方，这时候要是还没在循环过程中return，那么就在这个null的位置新建一个Entry，并且插入，同时size增加1。
  - 最后调用cleanSomeSlots，清理key为null的Entry，返回是否清理了Entry，接下来再判断sz是否>= threshold，达到了rehash的条件，达到的话就会调用rehash函数执行一次全表的扫描清理。



##### 线性探测法解决Hash冲突

该方法一次探测下一个地址，直到有空的地址后插入，若整个空间都找不到空余的地址，则产生溢出。

> 举个例子，假设当前table长度为16，也就是说如果计算出来key的hash值为14，如果table[14]上已经有值，并且其key与当前key不一致，那么就发生了hash冲突，
>
> 这个时候将14+1得到15，取table[15]进行判断，这个时候如果还是冲突会回到0，取table[0]，以此类推，直到可以插入。

按照上面的描述，可以把Entry table看成一个环形数组。



### 弱引用与内存泄漏

有些程序员在使用ThreadLocal的过程中会发现有内存泄漏的情况发生，就猜测这个内存泄漏跟Entry中使用了弱引用的key有关系。这个理解其实是不对的。



#### 内存泄漏相关概念

- Memory overflow：内存溢出，没有足够的内存提供申请者使用。
- Memory leak：内存泄漏，是指程序中己动态分配的堆内存由于某种原因程序未释放或无法释放，造成系统内存的浪费，导致程序运行速度减慢甚至系统溃等严重后果。内存泄漏的堆积终将导致内存溢出。



#### 弱引用相关概念

- **强引用**

  就是我们最常见的普通对象引用，只要还有强引用指向一个对象，就能表明对象还“活着”，垃圾回收器就不会回收这种对象。

- **弱引用**

  垃圾回收器一旦发现了只具有弱引用的对象，不管当前内存空间足够与否，都会回收它的内存。



#### 如果key使用强引用，是否会出现内存泄漏？

假设ThreadLocalMap中的key使用了强引用，那么会出现内存泄漏吗？

此时ThreadLocal的内存图（实线表示强引用）如下：

![image-20200710222559109](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200710222559109.png)

- 假设在业务代码中使用完ThreadLocal，threadLocal 的引用被回收了

- 但是因为threadLocalMap的Entry强引用了threadLocal，造成threadLocal无法被回收。

- 在没有手动删除这个Entry以及**CurrentThread依然运行**的前提下，始终有强引用链 

  **thread引用 -> currentThread -> threadLocalMap -> entry**

  Entry就不会被回收，而Entry中包括了ThreadLocal实例和value，导致Entry内存泄漏。

也就是说，ThreadLocalMap中的key使用了强引用，是无法完全避免内存泄漏的。



#### key使用弱引用，出现内存泄漏的原因

![image-20200710222847567](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200710222847567.png)

- 同样假设在业务代码中使用完ThreadLocal，threadLocal 引用被回收了。

- 由于ThreadLocalMap只持有ThreadLocal的弱引用，没有任何强引用指向threadlocal实例，所以threadlocal就可以顺利被gc回收，此时Entry中的key=null。

- 但是在没有手动删除这个Entry以及**CurrentThread依然运行**的前提下，也存在有强引用链 

  **thread引用 -> currentThread -> threadLocalMap -> entry -> value**

  value不会被回收，而这块value永远不会被访问到了，导致value内存泄漏。

也就是说，ThreadLocalMap中的key使用了弱引用，也有可能内存泄漏。



#### 出现内存泄漏的真正原因

我们会发现，内存泄漏的发生跟ThreadLocalMap中的key是否使用弱引用是没有关系的。那么内存泄漏的的真正原因是什么呢？

以上两种内存泄漏的情况中，都有两个前提：

- 没有手动删除这个Entry
- CurrentThread依然运行

第一点很好理解，只要在使用完ThreadLocal，调用其remove方法删除对应的Entry，就能避免内存泄漏。

第二点稍微复杂一点，由于ThreadLocalMap是Thread的一个属性，被当前线程所引用，所以它的生命周期跟Thread一样长。那么在使用完ThreadLocal的使用，如果当前Thread也随之执行结束，ThreadLocalMap自然也会被gc回收，从根源上避免了内存泄漏。

综上，ThreadLocal内存泄漏的根源是：

**由于ThreadLocalMap的生命周期跟Thread一样长，如果没有手动删除对应key就会导致内存泄漏。**



#### 如何避免内存泄漏

要避免内存泄漏有两种方式：

- 使用完ThreadLocal，调用其remove方法删除对应的Entry
- 使用完ThreadLocal，当前Thread也随之运行结束



#### 那么为什么还要用弱引用key

避免内存泄漏的两种方式，第一种是比较可控的，而第二种是不好控制的，尤其是当线程存储在线程池时，其并不会销毁而是入池。

事实上，在ThreadLocalMap中的 setEntry / getEntry方法中，会对key为null（也即是ThreadLocal为null）进行判断，如果为null的话，那么是会对value置为nul的。

```java
private Entry getEntry(ThreadLocal<?> key) {
    int i = key.threadLocalHashCode & (table.length - 1);
    Entry e = table[i];
    if (e != null && e.get() == key)
        return e;
    else
        //	如果entry为空或者entry的键为空
        return getEntryAfterMiss(key, i, e);
}
private Entry getEntryAfterMiss(ThreadLocal<?> key, int i, Entry e) {
    Entry[] tab = table;
    int len = tab.length;

    while (e != null) {
        ThreadLocal<?> k = e.get();
        if (k == key)
            return e;
        if (k == null)
            expungeStaleEntry(i);
        else
            i = nextIndex(i, len);
        e = tab[i];
    }
    return null;
}
```

这就意味着使用完ThreadLocal，CurrentThread依然运行的前提下，就算忘记调用remove方法，弱引用比强引用可以多一层保障：

弱引用的ThreadLocal会被回收，对应的value在下一次ThreadLocalMap调用set，get，remove中的任一方法的时候会被清除，从而避免内存泄漏。



### 使用场景

主要用于数据隔离，填充数据只属于当前线程，线程间互相隔离，防止自身变量被其他线程修改。

#### Spring实现事务隔离界别

Spring采用Threadlocal的方式，来保证单个线程中的数据库操作使用的是同一个数据库连接。

同时，采用这种方式可以使业务层使用事务时不需要感知并管理connection对象，通过传播级别，巧妙地管理多个事务配置之间的切换，挂起和恢复。

主要是在`TransactionSynchronizationManager`这个类里面，代码如下所示：

```java
private static final Log logger = LogFactory.getLog(TransactionSynchronizationManager.class);

private static final ThreadLocal<Map<Object, Object>> resources =
    new NamedThreadLocal<>("Transactional resources");

private static final ThreadLocal<Set<TransactionSynchronization>> synchronizations =
    new NamedThreadLocal<>("Transaction synchronizations");

private static final ThreadLocal<String> currentTransactionName =
    new NamedThreadLocal<>("Current transaction name");
```

Spring的事务主要是ThreadLocal和AOP去做实现的，知道每个线程自己的链接是靠ThreadLocal保存的就好了。



#### 用户使用场景：日期解析线程安全

**场景**

上线项目后发现部分用户的日期居然不对了，排查下来是SimpleDataFormat的锅，

当时使用SimpleDataFormat的parse()方法，内部有一个Calendar对象，调用SimpleDataFormat的parse()方法会先调用Calendar.clear()，然后调用Calendar.add()。

如果一个线程先调用了add()然后另一个线程又调用了clear()，这时候parse()方法解析的时间就不对了。

**解决方案**

让每个线程都new 一个自己的 SimpleDataFormat就好了，但是1000个线程难道new1000个SimpleDataFormat？

所以使用了线程池加上ThreadLocal包装SimpleDataFormat，再调用initialValue让每个线程有一个SimpleDataFormat的副本，从而解决了线程安全的问题，也提高了性能。



#### 用户使用场景：上下文传递

**场景**

在项目中存在一个线程经常遇到横跨若干方法调用，需要传递的对象，也就是上下文（Context）。

它是一种状态，经常就是是用户身份、任务信息等，就会存在过渡传参的问题。

使用到类似责任链模式，给每个方法增加一个context参数非常麻烦，而且有些时候，如果调用链有无法修改源码的第三方库，对象参数就传不进去了。

**解决方案**

使用ThreadLocal进行改造，这样只需要在调用前在ThreadLocal中设置参数，其他地方get一下就好了。

```java
//	before

void work(User user) {
    getInfo(user);
    checkInfo(user);
    setSomeThing(user);
    log(user);
}

//	after

void work(User user) {
try{
      threadLocalUser.set(user);
      // 他们内部  User u = threadLocalUser.get(); 就好了
    getInfo();
    checkInfo();
    setSomeThing();
    log();
    } finally {
     threadLocalUser.remove();
    }
}
```

**延申**

很多场景的cookie，session等数据隔离都是通过ThreadLocal去做实现的。

在Android中，Looper类就是利用了ThreadLocal的特性，保证每个线程只存在一个Looper对象。

```java
static final ThreadLocal<Looper> sThreadLocal = new ThreadLocal<Looper>();
private static void prepare(boolean quitAllowed) {
    if (sThreadLocal.get() != null) {
        throw new RuntimeException("Only one Looper may be created per thread");
    }
    sThreadLocal.set(new Looper(quitAllowed));
}
```





## Lambda表达式

Lambda是一种匿名函数，我们可以把Lambda表达式理解为是一段可以传递的代码，将代码像数据一样传递，这样可以写出更简洁、更灵活的代码，作为一个更紧凑的代码风格，使Java语言表达能力得到了提升。



### 基础语法

Java8中引入了一个新的操作符 `->` ，该操作符称为 箭头操作符 或 Lambda操作符。

箭头操作符将Lambda表达式拆分为两部分：

- 左侧：Lambda表达式的参数列表（可以想象成，是上面定义的接口中抽象方法参数的列表）
- 右侧：Lambda表达式中，所需要执行的功能，即Lambda体（需要对抽象方法实现的功能）



### 语法格式

#### 无参

**格式**

```java
()->System.out.print("");
```

**使用**

```java
public static void test() {
    Runnable r = new Runnable() {
        @Override
        public void run() {
            System.out.println("hello");
        }
    };

    System.out.println("=========");

    Runnable runnable = () -> {
        System.out.println("hello lambda");
    };
}
```

>  jdk1.8后，调用Lambda外的对象不需要增加final字段，系统默认增加
>
> ```java
> int n = 10;
> Runnable runnable = () -> {
>     System.out.println("hello lambda" + n);
> };
> ```

#### 一个参数，有返回值

**格式**

```java
(x) -> System.out.println(x);
// 或  (一个参数时，小括号可以省略不写)
x -> System.out.println(x);
```

**使用**

```java
public static void test2() {
    Consumer<String> consumer = (x) -> System.out.println(x);
    consumer.accept("我在bilibili");
}
```

#### 多个参数，有返回值

**格式**

```java
(x,y) -> System.out.println(x);
```

**使用**

```java
public static void test3() {
    Comparator<Integer> comparator = (x, y) -> {
        System.out.println("函数式接口");
        return Integer.compare(x, y);
    };
}
```

> 执行语句只有一句时（[函数式接口](###函数式接口)），可以省略大括号
>
> ```java
> public static void test4() {
>         Comparator<Integer> comparator = (x, y) -> Integer.compare(x, y);
>     }
> ```



### 类型推断

Lambda中，表达式的参数列表的数据类型可以省略不写，因为JVM编译器通过上下文推断出，数据类型，即“类型推断”。

```java
Comparator<Integer> comparator = (Integer x, Integer y) -> Integer.compare(x, y);
Comparator<Integer> comparator = (x, y) -> Integer.compare(x, y);
```



### 函数式接口

Lambda表达式需要“函数式接口”的支持

#### 概念

一个接口，然后就是在这个接口里面**只能有一个抽象方法**。

也称为SAM接口，即Single Abstract Method interfaces。

#### 样式

```java
/**
 * 函数式接口 
 */
public interface MyPredicte<T> {
    public boolean test(T t);
}
```

可以被`@FunctionalInterface`注解修饰的，便是函数式接口。

这个接口主要用于**编译级错误检查**，加上该注解，当你写的接口不符合函数式接口定义的时候，编译器会报错。

```java
@FunctionalInterface
interface GreetingService
{
    void sayMessage(String message);
}
```

> 加不加@FunctionalInterface对于接口是不是函数式接口没有影响，该注解只是提醒编译器去检查该接口是否仅包含一个抽象方法

##### 允许定义默认方法

可以包含默认方法，因为默认方法不是抽象方法，其有一个默认实现，所以是符合函数式接口的定义的

```java
@FunctionalInterface
interface GreetingService
{
    void sayMessage(String message);

    default void doSomeMoreWork1()
    {
        // Method body
    }

    default void doSomeMoreWork2()
    {
        // Method body
    }
}
```

##### 允许定义静态方法

可以包含静态方法，因为静态方法不能是抽象方法，是一个已经实现了的方法，所以是符合函数式接口的定义的；

```java
@FunctionalInterface
interface GreetingService 
{
    void sayMessage(String message);
    static void printHello(){
        System.out.println("Hello");
    }
}
```



### 场景

#### 调用Collections.sort()进行集合排序

对于多条件排序，配合lambda定义

```java
public static void test() {
    List<Employee> employees = Arrays.asList(
        new Employee("张三", 18, 3333),
        new Employee("李四", 38, 55555),
        new Employee("王五", 50, 6666.66),
        new Employee("赵六", 16, 77777.77),
        new Employee("田七", 8, 8888.88)
    );
    Collections.sort(employees, (e1, e2) -> {
        if(e1.getAge() == e2.getAge()) {
            return e1.getName().compareTo(e2.getName());
        } else {
            return Integer.compare(e1.getAge(), e2.getAge());
        }
    });

    employees.stream().map(Employee::getName).forEach(System.out::println);
}
```



### Java内置函数接口



#### Consumer消费型接口

**格式** `Comsumer<T>`

```java
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);
    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```

accept方法传入参数，然后对参数进行操作，没有返回值

```java
public static void test() {
    happy(1000, (m) -> System.out.println("消费成功：" + m + "元"));
}
public static void happy(double money, Consumer<Double> consumer) {
    consumer.accept(money);
}
```

#### Supplier供给型接口

**格式** `Supplier<T>`

```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}
```

get方法不接收参数，按照自定义规律提供返回值。

```java
public static void test2() {
    List<Integer> list = getNumList(10, () -> {
        Integer a =   (int)(Math.random() * 10);
        return a;
    });

    list.stream().forEach(System.out::println);
}
//	产生指定个数整数
public static List<Integer> getNumList(Integer n, Supplier<Integer> supplier) {
    List<Integer> list = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        list.add(supplier.get());
    }
    return list;
}
```



#### Function函数型接口

**格式** `Function<T,R>`

```java
@FunctionalInterface
public interface Function<T, R> {
    R apply(T t);
    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }
    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }
    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
```

apply方法接收一个指定类型参数，返回一个指定类型结果

```java
public static void test3() {
    String str = strHandler("abcdefg", (x) -> {
        //	取前五个字符大写返回
        return x.toUpperCase().substring(0, 5);
    });
    System.out.println(str);
}
//	处理字符串
public static String strHandler(String str, Function<String, String> function) {
    // 使用apply方法进行处理，怎么处理需要具体实现
    return function.apply(str);
}
```



#### Predicate断言型接口

**格式** `Predicate<T>`

```java
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);
    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }
    default Predicate<T> negate() {
        return (t) -> !test(t);
    }
    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }
    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
}
```

test()方法不接收参数，返回布尔值，用于做判断

```java
//	过滤长度大于3的字符串
public static void test4() {
    List<String> list = Arrays.asList("abc", "abcd", "df", "cgg", "aaab");
    List<String> result = strPredict(list, (x) -> x.length() > 3);
    result.forEach(item -> {
        System.out.println(item);
    });
}
// 将满足条件的字符串，放入到集合中
public static List<String> strPredict(List<String> list, Predicate<String> predicate) {
    List<String> result = new ArrayList<>();
    list.forEach(item -> {
        if(predicate.test(item)) {
            result.add(item);
        }
    });
    return result;
}
```



#### 扩展接口

上述核心接口包含了大部分情况，但因为参数限制不能适用于所有情况，所以还有一些子接口进行扩展。

![image-20200406093204147](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200406093204147.png)



## 方法引用与构造器引用

### 方法引用

若Lambda体中的内容有方法已经实现了，则可以使用“方法引用”调用，可以理解为方法引用是Lambda表达式的另外一种表现形式。

#### 格式

- 对象::实例方法名
- 类::静态方法名
- 类::实例方法名

> - Lambda体中，调用方法的参数列表与返回值类型，要与函数式接口中抽象方法的函数列表和返回值类型保持一致。
> - 若Lambda参数列表中，**第一个参数是实例方法的调用者，第二个参数是实例方法的参数时**，可以使用ClassName::method



#### 对象::方法名

```java
public static void test() {
    Consumer<String> consumer = (x) -> System.out.println(x);

    // 使用方法引用完成（也就是上述的方法体中，已经有Lambda实现了，那就可以用方法引用的方式实现）
    // 同时使用方法引用的时候，需要保证：参数列表和返回值类型相同
    PrintStream ps = System.out;
    Consumer<String> consumer2 = ps::println;
}
public static void test2() {
    Employee employee = new Employee("张三", 12, 5555);
    Supplier<String> supplier = () -> employee.getName();
    System.out.println(supplier.get());

    // 使用方法引用
    Supplier<String> supplier1 = employee::getName;
    System.out.println(supplier1.get());
}
```

#### 类::静态方法名

```java
public static void test3() {
    Comparator<Integer> comparator = (x, y) -> Integer.compare(x, y);

    // 使用方法引用
    Comparator<Integer> comparator2 = Integer::compare;
}
```

#### 类::实例方法名

```java
public static void test4() {
    // 比较
    BiPredicate<String, String> bp = (x, y) -> x.equals(y);
    System.out.println(bp.test("abc", "abc"));

    // 使用方法引用
    BiPredicate<String, String> bp2 = String::equals;
    System.out.println(bp2.test("abc", "abc"));

}
```



### 构造器引用

#### 格式

```java
ClassName::new
```

> 需要调用的构造器的参数列表要与函数式接口中抽象方法的参数列表保持一致

#### 使用

```java
public static void test() {
    Supplier<Employee> supplier = () -> new Employee("张三", 18, 13);

    // 构造器引用（调用的无参构造器）
    Supplier<Employee> supplier1 = Employee::new;
    Employee employee = supplier1.get();

    // 构造器引用（调用有参构造器，一个参数的）
    Function<Integer, Employee> function = Employee::new;
    Employee employee1 = function.apply(10);
    System.out.println(employee1.getAge());
}
```



### 数组引用

#### 格式

```java
ClassName[]::new
```

#### 使用

```java
public static void test() {
    Function<Integer, String[]> function = (x) -> new String[x];
    function.apply(20);

    // 数组引用
    Function<Integer, String[]> function1 = String[]::new;
    String[] strArray = function1.apply(20);
    System.out.println(strArray.length);
}
```



## Stream流

Stream是Java8中处理集合的关键抽象概念，它可以指定你希望对集合进行的操作，可以执行非常复杂的查找，过滤和映射数据等操作。使用Stream API对集合数据进行操作，就类似于使用SQL执行的数据库查询，也可以使用Stream API来并行操作，简而言之，Stream API提供了一种高效且易于使用的处理数据的方式。



### 与IO流的区别

这个`Stream`不同于`java.io`的`InputStream`和`OutputStream`，它代表的是任意Java对象的序列。

- 存储：IO流存储的是顺序读写的byte/char，而stream存储的是任意java对象序列
- 用途：IO流用于序列化至文件/网络，而stream用于内存计算/业务逻辑



### 概念

Stream（流）是一个来自数据源的元素队列，它可以支持聚合操作。

- **数据源**：流的数据来源，构造Stream对象的数据源，比如通过一个List来构造Stream对象，这个List就是数据源；
- **聚合操作**：对Stream对象进行处理后使得Stream对象返回指定规则数据的操作称之为聚合操作，比如filter、map、limit、sorted等都是聚合操作。

> - Stream 自己不会存储元素
> - Stream 不会改变源对象，相反，他们会返回一个持有结果的新Stream
> - Stream 操作是延迟的，这就意味着他们会等到需要结果的时候才执行的



### 操作

![image-20200406110230148](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200406110230148.png)

#### 创建流

- 集合的stream方法获取

  ```java
  List<String> list = new ArrayList<>();
  //	stream() - 为集合创建串行流
  Stream<String> stream =  list.stream();
  //	parallelStream() − 为集合创建并行流
  ```

- Arrays静态方法获取数组流

  ```java
  Employee[] employees = new Employee[10];
  Stream<Employee> stream1 = Arrays.stream(employees);
  ```

- Stream静态方法of()，获取流

  ```java
  Stream<String> stream3 = Stream.of("aa", "bb", "cc");
  ```

- Stream静态方法iterate()，创建无限流

  ```java
  //	递增数列，从0开始
  Stream.iterate(0, n -> n + 1) 
  ```

#### filter

对Stream中的元素进行**过滤**操作，当设置条件返回true时返回相应元素。

```java
List<String>strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
// 获取空字符串的数量
long count = strings.stream().filter(string -> string.isEmpty()).count();
```

#### distinct

筛选，通过流所生成的hashCode()和equals()去除重复元素，**去重**

#### limit

**截断**流，从Stream中获取指定数量的元素。

```java
//	打印出 10 条数据
Random random = new Random();
random.ints().limit(10).forEach(System.out::println);
```

#### skip

**跳过**元素，跳过指定个数的Stream中元素，获取后面的元素，若流中元素不足n个，则返回一个空流

```java
// 跳过前5个元素，返回后面的
List<UmsPermission> skipList = permissionList.stream()
    .skip(5)
    .collect(Collectors.toList());
```

#### count

获取Stream中元素的个数

```java
// count操作：获取所有目录权限的个数
long dirPermissionCount = permissionList.stream()
    .filter(permission -> permission.getType() == 0)
    .count();
```

#### map

接收Lambda，将元素**转换**成其它形式或提取信息，用于映射每个元素到对应的结果。

```java
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
// 获取对应的平方数
List<Integer> squaresList = numbers.stream().map( i -> i*i).distinct().collect(Collectors.toList());
```

#### flatMap

接收一个函数作为参数，将流中的每个值都转换成另一个流，然后把所有流**连接**成一个流。

#### sorted

对Stream中元素按指定规则进行排序。

```java
//	sorted()自然排序
Random random = new Random();
random.ints().limit(10).sorted().forEach(System.out::println);
//	sort(Comparator com)	条件排序
List<Employee> employees = Arrays.asList(
    new Employee("张三", 18, 3333),
    new Employee("李四", 38, 55555),
    new Employee("王五", 50, 6666.66),
    new Employee("赵六", 16, 77777.77),
    new Employee("田七", 8, 8888.88)
);
employees.stream().sorted((e1, e2) -> {
    if(e1.getAge() == e2.getAge()) {
        return e1.getName().compareTo(e2.getName());
    } else {
        return Integer.compare(e1.getAge(), e2.getAge());
    }
}).forEach(System.out::println);
```



#### 终止流

执行下列操作后，Stream流就会进行终止执行。

##### 查找与匹配

- allMatch：检查是否匹配所有元素
- anyMatch：检查是否至少匹配一个元素
- noneMatch：检查是否一个都没匹配
- findFirst：返回第一个元素
- findAny：返回当前流中任意一个元素
- count：返回流中元素的个数
- max：返回当前流中最大值
- min：返回当前流中最小值
- forEach：内部迭代



##### 合并（流元素）

reduce(T identity, BinaryOperator) / reduce(BinaryOperator)

可以将流元素进行结合，产生单个值

```java
int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// 1st argument, init value = 0
int sum = Arrays.stream(numbers).reduce(0, (a, b) -> a + b);	//	55
int sum = Arrays.stream(numbers).reduce(0, Integer::sum); // 55
```



##### 收集（流元素）

collect(Collector c)

将流转换成其它形式，接收一个Collector接口实现，用于给Stream中元素做汇总的方法。

```java
//	Collector接口实现方法的实现决定了如何对流执行收集操作（如收集到List，Set，Map）。但是Collectors实用类提供了很多静态方法，可以方便地创建常用收集器实例
public static void test6() {
    List<Employee> employees = Arrays.asList(
        new Employee("张三", 18, 3333),
        new Employee("李四", 38, 55555),
        new Employee("王五", 50, 6666.66),
        new Employee("赵六", 16, 77777.77),
        new Employee("田七", 8, 8888.88)
    );
    // 收集放入list中
    List<String> list = employees.stream().map(Employee::getName).collect(Collectors.toList());
    list.forEach(System.out::println);
}
```



### 并行流

并行流就是把内容分为多个数据块，用不同线程分别处理操作每个数据块的流。

可以声明性的通过parallel() 与 sequential() 在并行流与顺序流之间进行切换。



#### Fork/Join框架

**概念**

在必要的情况下，将一个大任务，进行拆分(fork)成若干个小任务(拆到不可再拆时)，再将一个个小的任务运算的结果进行join汇总

![image-20200406121617329](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200406121617329.png)

> 不懂 待补充



# JVM

## Java虚拟机

Java虚拟机是一台执行Java字节码的虚拟计算机，它拥有独立的运行机制，其运行的Java字节码也未必由Java语言编译而成。

JVM平台的各种语言可以共享Java虚拟机带来的跨平台性、优秀的垃圾回器，以及可靠的即时编译器。

Java技术的核心就是Java虚拟机（JVM，Java Virtual Machine），因为所有的Java程序都运行在Java虚拟机内部。

Java虚拟机就是二进制字节码的运行环境，负责装载字节码到其内部，解释/编译为对应平台上的机器指令执行。每一条Java指令，Java虚拟机规范中都有详细定义，如怎么取操作数，怎么处理操作数，处理结果放在哪里。

特点：

- 一次编译，到处运行
- 自动内存管理
- 自动垃圾回收功能



### 位置

JVM是运行在操作系统之上的，它与硬件没有直接的交互

![image-20200704183048061](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200704183048061.png)

java体系结构，位于底层基础位置

![image-20200704183236169](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200704183236169.png)



### 架构模型

Java编译器输入的指令流基本上是一种基于栈的指令集架构，另外一种指令集架构则是基于寄存器的指令集架构。

> 这两种架构之间的区别：
>
> **基于栈式架构的特点**
>
> - 设计和实现更简单，适用于资源受限的系统；
> - 避开了寄存器的分配难题：使用零地址指令方式分配。
> - 指令流中的指令大部分是零地址指令，其执行过程依赖于操作栈。指令集更小，编译器容易实现。
> - 不需要硬件支持，可移植性更好，更好实现跨平台
>
> **基于寄存器架构的特点**
>
> - 典型的应用是x86的二进制指令集：比如传统的PC以及Android的Davlik虚拟机。
> - 指令集架构则完全依赖硬件，可移植性差
> - 性能优秀和执行更高效
> - 花费更少的指令去完成一项操作。
> - 在大部分情况下，基于寄存器架构的指令集往往都以一地址指令、二地址指令和三地址指令为主，而基于栈式架构的指令集却是以零地址指令为主方水洋

由于跨平台性的设计，Java的指令都是根据栈来设计的。不同平台CPU架构不同，所以不能设计为基于寄存器的。

优点是跨平台，指令集小，编译器容易实现；

缺点是性能下降，实现同样的功能需要更多的指令。

![image-20200705111640511](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200705111640511.png)



## JVM生命周期

### 启动

Java虚拟机的启动是通过引导类加载器（bootstrap class loader）创建一个初始类（initial class）来完成的，这个类是由虚拟机的具体实现指定的。

### 执行

- 一个运行中的Java虚拟机有着一个清晰的任务：执行Java程序。
- 程序开始执行时他才运行，程序结束时他就停止。
- 执行一个所谓的Java程序的时候，真真正正在执行的是一个叫做Java虚拟机的进程。

### 退出

- 程序正常执行结束
- 程序在执行过程中遇到了异常或错误而异常终止
- 由于操作系统用现错误而导致Java虚拟机进程终止
- 某线程调用Runtime类或system类的exit方法，或Runtime类的halt方法，并且Java安全管理器也允许这次exit或halt操作。
- 除此之外，JNI（Java Native Interface）规范描述了用JNI Invocation API来加载或卸载 Java虚拟机时，Java虚拟机的退出情况。









## 类加载子系统



### 作用

负责从文件系统/网络中加载class文件，class文件在文件开头有特定标识。

ClassLoader只负责class文件加载，能否运行由执行引擎决定。

加载的类信息存放于一块称为**方法区**的内存空间。除了类的信息外，方法区中还会存放**运行时常量池**信息，可能还包括**字符串字面量**和**数字常量**（这部分常量信息是Class文件中常量池部分的内存映射）

![image-20200705081813409](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200705081813409.png)

- class 文件存在于本地硬盘上，可以理解为设计师画在纸上的模板，而最终这个模板在执行的时候是要加载到JVM当中来根据这个文件实例化出n个一模一样的实例。
- class 文件加载到JVM中，被称为**DNA元数据模板**，放在方法区。
- 在.class文件->JVM->最终成为元数据模板，此过程就要一个运输工具（类装载器Class Loader），扮演一个快递员的角色。

![image-20200705081913538](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200705081913538.png)

### 从JVM角度分析类加载过程

**流程图**

![image-20200705082601441](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200705082601441.png)

#### 加载阶段

通过一个类的全限定名获取定义此类的二进制字节流

将这个字节流所代表的静态存储结构转化为方法区的运行时数据结构

在内存中生成一个代表这个类的java.lang.Class对象，作为方法区这个类的各种数据的访问入口。

##### 加载class文件的方式

- 从本地系统中直接加载
- 通过网络获取，典型场景：Web Applet
- 从zip压缩包中读取，成为日后jar、war格式的基础
- 运行时计算生成，使用最多的是：动态代理技术
- 由其他文件生成，典型场景：JSP应用从专有数据库中提取.class文件，比较少见
- 从加密文件中获取，典型的防Class文件被反编译的保护措施



#### 链接阶段

##### 验证（Verify）

目的在于确保Class文件的字节流中包含信息符合当前虚拟机要求，保证被加载类的正确性，不会危害虚拟机自身安全。

> **验证方式**
>
> - 文件格式验证
> - 元数据验证
> - 字节码验证
> - 符号引用验证

##### 准备（Prepare）

为类变量分配内存并且设置该类变量的默认初始值，即零值。

如：

```java
private static int a = 1; 
```

在准备阶段会赋值为0，而不是1；

- 这里不包含final修饰的类变量，因为final在编译时已经显式赋值了。
- 这里不会为实例变量赋值，因为类变量分配在方法区，而实例变量随对象一起分配到java堆中。

##### 解析（Resolve）

将常量池符号引用转换为直接引用的过程。

解析动作主要针对类或接口、字段、类方法、接口方法、方法类型等。对应常量池中的CONSTANT Class info、CONSTANT Fieldref info、CONSTANT Methodref info等。

> - **符号引用**就是一组符号来描述所引用的目标。符号引用的字面量形式明确定义在《java虚拟机规范》的class文件格式中。
> - **直接引用**就是直接指向目标的指针、相对偏移量或一个间接定位到目标的句柄。

#### 初始化阶段

初始化阶段就是执行类构造器clinit()方法的过程。

此方法不需定义，是javac编译器自动收集类中的所有类变量的赋值动作和静态代码块（static{}）中的语句合并而来，构造器方法中指令按语句在源文件中出现的顺序执行，静态语句块只能访问到定义在静态语句块之前的变量，定义在它之后的变量，在前面的静态语句块可以赋值，但是不能访问。

> 也就是说，当我们代码中包含static变量的时候，就会有clinit方法

若类具有父类，JVM会保证子类的clinit()执行前，父类的clinit()已经执行完毕。

> 也就意味着父类中定义的静态语句块要优先于子类的变量赋值操作。

虚拟机必须保证一个类的clinit()方法多线程下同步加锁（**只能初始化一次**）。



##### clinit与init区别

- 执行时机：init是对象构造器方法，new对象时才会执行；clinit是类构造器方法，是在类加载的初始化阶段由jvm调用。

- 执行目的：init是实例构造器，对非静态变量解析初始化；clinit是class类构造器，对静态变量静态代码块进行初始化。

  ```java
  class X {
     static Log log = LogFactory.getLog(); // <clinit>
     private int x = 1;   // <init>
     X(){
        // <init>
     }
     static {
        // <clinit>
     }
  }
  ```



### 类加载器分类

见 [类加载器](###类加载器)



### 双亲委派机制

Java虚拟机对class文件采用的是按需加载的方式，也就是说当需要使用该类时才会将它的class文件加载到内存生成class对象。

**当一个类加载器收到了类加载的请求的时候，他不会直接去加载指定的类，而是把这个请求委托给自己的父加载器去加载。只有父加载器无法加载这个类的时候，才会由当前这个加载器来负责类的加载。**

#### 工作原理

1. 源ClassLoader先判断该Class是否已加载，如果已加载，则返回Class对象；如果没有则委托给父类加载器；
2. 父类加载器判断是否加载过该Class，如果已加载，则返回Class对象；如果没有则委托给祖父类加载器；
3. 依此类推，直到始祖类加载器（引用类加载器）；
4. 始祖类加载器判断是否加载过该Class，如果已加载，则返回Class对象；如果没有则尝试从其对应的类路径下寻找class字节码文件并载入。如果载入成功，则返回Class对象；如果载入失败，则委托给始祖类加载器的子类加载器。
   始祖类加载器的子类加载器尝试从其对应的类路径下寻找class字节码文件并载入。如果载入成功，则返回Class对象；如果载入失败，则委托给始祖类加载器的孙类加载器。
   依此类推，直到源ClassLoader。
   源ClassLoader尝试从其对应的类路径下寻找class字节码文件并载入。如果载入成功，则返回Class对象；如果载入失败，源ClassLoader不会再委托其子类加载器，而是抛出异常。

![image-20200705105151258](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200705105151258.png)



#### 源码分析

```java
protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException{
    synchronized (getClassLoadingLock(name)) {
        // 首先检查这个class是否已经加载过了
        Class<?> c = findLoadedClass(name);
        if (c == null) {
            long t0 = System.nanoTime();
            try {
                // c==null表示没有加载，如果有父类的加载器则让父类加载器加载
                if (parent != null) {
                    c = parent.loadClass(name, false);
                } else {
                    // 如果父类的加载器为空 则说明递归到bootStrapClassloader了
                    // bootStrapClassloader比较特殊无法通过get获取
                    c = findBootstrapClassOrNull(name);
                }
            } catch (ClassNotFoundException e) {}
            if (c == null) {
                //如果bootstrapClassLoader 仍然没有加载过，则递归回来，尝试自己去加载class
                long t1 = System.nanoTime();
                c = findClass(name);
                sun.misc.PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                sun.misc.PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                sun.misc.PerfCounter.getFindClasses().increment();
            }
        }
        if (resolve) {
            resolveClass(c);
        }
        return c;
    }
}
```



#### 为什么需要双亲委派/双亲委派的作用

因为类加载器有严格的层次之分，使得Java类也具备了层次关系，这种层次关系就是优先级。

- **通过委派的方式，避免类的重复加载。**当父加载器已经加载过时，子加载器不会加载。
- **通过双亲委派的方式，保证了class的安全性。**保证核心class文件不被篡改，通过委派的方式，即使修改了class文件也不会再次加载，即使加载用的不同的加载器也不会是同一个class对象。



#### 父子加载器的关系是继承吗

**双亲委派模型中，类加载器之间的父子关系一般不会以继承（Inheritance）的关系来实现，而是都使用组合（Composition）关系来复用父加载器的代码的。**

```java
public abstract class ClassLoader {
    // The parent class loader for delegation
    private final ClassLoader parent;
}
```



#### 主动破坏双亲委派

因为双亲委派的机制是在ClassLoader的loadClass()方法中实现的，所以**想要破坏这种机制，那么就自定义一个类加载器，重写其中的loadClass方法，使其不进行双亲委派即可。**

如：

- **JNDI，JDBC等需要加载SPI接口实现类的情况；**
- **实现热插拔热部署工具；**为了让代码动态生效，实现方式时，连同类加载器一起换掉。
- **tomcat等web容器；**
- **OSGI、Jigsaw等模块化技术的应用。**



#### 为什么JNDI，JDBC等需要破坏双亲委派

日常开发使用API方式调用Java基础类，基础类由Bootstrap加载。

除了API方式，还有SPI方式，如JDBC服务。

如建立数据库连接时：

```java
Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mysql", "root", "1234");
```

此时DriverManager会被类加载器加载，这个类是会被根加载器加载，加载时会执行静态方法：

```java
ServiceLoader<Driver> loadedDrivers = ServiceLoader.load(Driver.class);
```

这段代码会尝试加载classpath下实现Driver接口的实现类。

矛盾点在于：**DriverManager是被根加载器加载的，那么在加载时遇到以上代码，会尝试加载所有Driver的实现类，但是这些实现类基本都是第三方提供的，根据双亲委派原则，第三方的类不能被根加载器加载。**

##### 解决方式

**在JDBC中通过引入ThreadContextClassLoader（线程上下文加载器，默认情况下是AppClassLoader）的方式破坏了双亲委派原则。**

```java
public static <S> ServiceLoader<S> load(Class<S> service) {
    ClassLoader cl = Thread.currentThread().getContextClassLoader();
    return ServiceLoader.load(service, cl);
}
```

获取当前线程的线程上下⽂类加载器 AppClassLoader，⽤于加载 classpath 中的具体实现类。



#### 为什么tomcat要破坏双亲委派

tomcat是web容器，允许部署多个应用程序。

而不同应用程序会存在同名但不一样的类（不同版本/恰好重名等），**如果采用默认的双亲委派类加载机制，那么是无法加载多个相同的类。**

##### 解决方式

**Tomcat破坏双亲委派原则，提供隔离的机制，为每个web容器单独提供一个WebAppClassLoader加载器。**

优先加载 Web 应用自己定义的类，每一个应用自己的类加载器——WebAppClassLoader负责加载本身的目录下的class文件，加载不到时再交给CommonClassLoader加载，这和双亲委派刚好相反。



### 全盘负责机制

指当一个ClassLoader装载一个类时，除非显示地使用另一个ClassLoader，则该类所依赖及引用的类也由这个ClassLoader载入。

如：系统类加载器AppClassLoader加载入口类（main方法）时，会把main方法依赖的类及引用的类也载入。

也可称为当前类加载器负责机制，即入口类所依赖的类，引用的类的类加载器也是入口类的类加载器。



## 运行时数据区

Java 虚拟机在执行 Java 程序的过程中会把它管理的内存划分成若干个不同的数据区域。JDK 1.8 和之前的版本略有不同。

**JDK 1.8 之前** ：

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/JVMdffefwfwfwf3242334234.png)

**JDK 1.8** ：

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/JVMffsfsfsdf324234234.png)

**线程私有的：**

- 程序计数器
- 虚拟机栈
- 本地方法栈

**线程共享的：**

- 堆
- 方法区
- 直接内存 (非运行时数据区的一部分)





#### 线程

线程是程序里的运行单元，JVM允许一个应用有多个线程并行执行。

在Hotspot JVM里，每个线程与操作系统的本地线程直接映射。当一个Java线程准备好执行后，此时一个操作系统的本地线程同时创建；Java程序执行终止后，本地线程也会回收。

操作系统负责将所有线程安排调度刀任何一个可用的CPU上，一旦本地线程初始化成功，就会调用run()方法。

##### JVM系统线程

除了main线程与main线程创建的线程外，存在一些JVM系统线程，在Hotspot JVM中主要是下面这几个：

- 虚拟机线程
- 周期任务线程：时间周期事件的体现（比如中断），他们一般用于周期性操作的调度执行。
- GC线程：对在JVM里不同种类的垃圾收集行为提供了支持。
- 编译线程：在运行时会将字节码编译到本地代码。
- 信号调度线程：接收信号并发送给JVM，在它内部通过调用适当的方法进行处理。



### 程序计数器（PC寄存器）

程序计数寄存器（Program Counter Register）

Register的命名源于CPU的寄存器，寄存器存储指令相关的现场信息，CPU 只有把数据装载到寄存器才能够运行。

JVM中的程序计数器是对物理PC寄存器的一种抽象模拟。

程序计数器是一块较小的内存空间，可以看作是当前线程所执行的字节码的行号指示器。字节码解释器工作时通过改变这个计数器的值来选取下一条需要执行的字节码指令，分支、循环、跳转、异常处理、线程恢复等功能都需要依赖这个计数器来完成。

![image-20200705155551919](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200705155551919.png)

#### 作用

用来存储指向下一条指令的地址，即将要执行的指令代码。由执行引擎读取下一条指令。

- 字节码解释器通过改变程序计数器来依次读取指令，从而实现代码的流程控制，如：顺序执行、选择、循环、异常处理。
- 在多线程的情况下，程序计数器用于记录当前线程执行的位置，从而当线程被切换回来的时候能够知道该线程上次运行到哪儿了。

![JVM（三）- 程序计数器（PC 寄存器）_寄存器_02](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/28101603_61ca73630470d41884.png)

#### 特点

- 是一块很小的内存空间，几乎可以忽略不计，也是运行速度**最快**的存储区域。
- 在 JVM 规范中，**每个线程都有它自己的程序计数器**，是线程私有的，生命周期与线程的生命周期保持一致。
- 任何时间一个线程都**只有一个方法在执行**，就是所谓的当前方法。程序计数器会存储当前线程正在执行的Java方法的 JVM 指令地址，如果执行的是 native 方法，则是未指定值（undefined）。
- 是程序控制流的指示器，分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖这个计数器来完成。
- 字节码指示器工作时就是通过改变这个计数器的值来**选取下一条需要执行的字节码指令**。
- 程序计数器是唯一一个不会出现 `OutOfMemoryError` 的内存区域，它的生命周期随着线程的创建而创建，随着线程的结束而死亡。



#### 程序计数器有什么用？为什么用程序计数器记录当前线程地址？

因为CPU需要不断切换线程，切换到当前线程时，需要得知从哪里继续执行。

JVM的字节码指示器通过改变程序计数器的值，来明确下一条要执行的字节码。

#### 为什么被设定为线程私有？

多线程同一个时间段只会执行一个线程的方法，在CPU不断切换的过程中，会导致经常性的中断与恢复。

为了能准确记录每个线程正在执行的字节码的地址，方法就是为每个线程单独分配一个程序计数器，保证线程之间独立计算，不会互相干扰。

每个线程在创建后，都会产生自己的程序计数器和栈帧，程序计数器在各个线程之间互不影响。



### 虚拟机栈

#### 生命周期

与程序计数器一样，Java 虚拟机栈（后文简称栈）也是线程私有的，它的生命周期和线程相同，随着线程的创建而创建，随着线程的死亡而死亡。

#### 用途

栈绝对算的上是 JVM 运行时数据区域的一个核心，除了一些 Native 方法调用是通过本地方法栈实现的(后面会提到)，**其他所有的 Java 方法调用都是通过栈来实现的**（也需要和其他运行时数据区域比如程序计数器配合）。

#### 构成

方法调用的数据需要通过栈进行传递，每一次方法调用都会有一个对应的栈帧被压入栈中，每一个方法调用结束后，都会有一个栈帧被弹出。

栈由一个个**栈帧**组成，而每个栈帧中都拥有：局部变量表、操作数栈、动态链接、方法返回地址。

和数据结构上的栈类似，两者都是先进后出的数据结构，只支持出栈和入栈两种操作。

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/stack.357796df.png" alt="栈" style="zoom:50%;" />

**局部变量表** 

主要存放了：

- 编译期可知的各种数据类型（boolean、byte、char、short、int、float、long、double）
- 对象引用（reference 类型，它不同于对象本身，可能是一个指向对象起始地址的引用指针，也可能是指向一个代表对象的句柄或其他与此对象相关的位置）。

**操作数栈** 

主要作为方法调用的中转站使用，用于**存放方法执行过程中产生的中间计算结果**。

另外，计算过程中产生的**临时变量**也会放在操作数栈中。

**动态链接** 

主要服务**一个方法需要调用其他方法**的场景。

在 Java 源文件被编译成字节码文件时，所有的变量和方法引用都作为**符号引用（Symbilic Reference）**保存在 Class 文件的常量池里。当一个方法要调用其他方法，需要将常量池中指向方法的符号引用转化为其在内存地址中的直接引用。动态链接的作用就是为了**将符号引用转换为调用方法的直接引用**。

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/jvmimage-20220331175738692.png)

##### 栈溢出

栈空间虽然不是无限的，但一般正常调用的情况下是不会出现问题的。

如果函数调用陷入无限循环的话，就会导致栈中被压入太多栈帧而占用太多空间，导致栈空间过深。

那么当**栈的内存大小不允许动态扩展**，线程请求**栈的深度超过当前 Java 虚拟机栈的最大深度**的时候，就抛出 `StackOverFlowError` 错误。

##### 内存溢出

栈还可能会出现`OutOfMemoryError`错误。

这是因为**如果栈的内存大小可以动态扩展**， 如果虚拟机在动态扩展栈时**无法申请到足够的内存空间**，则抛出`OutOfMemoryError`异常。

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/ertertertet863a2.png)

##### 栈帧的弹出/销毁

Java 方法有两种返回方式，一种是 return 语句正常返回，一种是抛出异常。

不管哪种返回方式，都会导致栈帧被弹出。也就是说， **栈帧随着方法调用而创建，随着方法结束而销毁。无论方法正常完成还是异常完成都算作方法结束。**



### 本地方法栈

和虚拟机栈所发挥的作用非常相似，

区别是： 虚拟机栈为虚拟机执行 Java 方法 （也就是字节码）服务，而**本地方法栈则为虚拟机使用到的 Native 方法服务**。

 在 HotSpot 虚拟机中和 Java 虚拟机栈合二为一。

本地方法被执行的时候，在本地方法栈也会创建一个栈帧，用于存放该本地方法的局部变量表、操作数栈、动态链接、出口信息。

方法执行完毕后相应的栈帧也会出栈并释放内存空间，也会出现 `StackOverFlowError` 和 `OutOfMemoryError` 两种错误。



### 堆

Java 虚拟机所管理的内存中最大的一块，Java 堆是所有线程共享的一块内存区域，在虚拟机**启动时创建**。

**此内存区域的唯一目的就是存放对象实例，几乎所有的对象实例以及数组都在这里分配内存。**

> Java 世界中“几乎”所有的对象都在堆中分配，但是，随着 JIT 编译器的发展与逃逸分析技术逐渐成熟，栈上分配、标量替换优化技术将会导致一些微妙的变化，所有的对象都分配到堆上也渐渐变得不那么“绝对”了。
>
> 从 JDK 1.7 开始已经默认开启逃逸分析，如果某些方法中的对象引用没有被返回或者未被外面使用（也就是未逃逸出去），那么对象可以直接在栈上分配内存。

#### 垃圾回收/分区

Java 堆是垃圾收集器管理的主要区域，因此也被称作 **GC 堆（Garbage Collected Heap）**。

从垃圾回收的角度，由于现在收集器基本都采用分代垃圾收集算法，所以 Java 堆还可以细分为：新生代和老年代；再细致一点有：Eden、Survivor、Old 等空间。

进一步划分的目的是更好地回收内存，或者更快地分配内存。

在 JDK 7 版本及 JDK 7 版本之前，堆内存被通常分为下面三部分：

1. 新生代内存(Young Generation)
2. 老生代(Old Generation)
3. 永久代(Permanent Generation)

下图所示的 Eden 区、两个 Survivor 区 S0 和 S1 都属于新生代，中间一层属于老年代，最下面一层属于永久代。

![hotspot-heap-structure](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/hotspot-heap-structure.784465da.png)

**JDK 8 版本之后 PermGen(永久) 已被 Metaspace(元空间) 取代，元空间使用的是直接内存** 

- 大部分情况，对象都会首先在 Eden 区域分配
- 在一次新生代垃圾回收后，如果对象还存活，则会进入 S0 或者 S1，并且对象的年龄还会增加(Eden 区->Survivor 区后对象的初始年龄变为 1)
- 当它的年龄增加到一定程度（默认为 15 岁），就会被晋升到老年代中。

> - 对象晋升到老年代的年龄阈值，可以通过参数 `-XX:MaxTenuringThreshold` 来设置。
>
> - Hotspot 遍历所有对象时，按照年龄从小到大对其所占用的大小进行累积，当累积的某个年龄大小超过了 survivor 区的一半时，取这个年龄和 MaxTenuringThreshold 中更小的一个值，作为新的晋升年龄阈值。

#### 内存溢出

堆这里最容易出现的就是 `OutOfMemoryError` 错误，并且出现这种错误之后的表现形式还会有几种，比如：

1. **`java.lang.OutOfMemoryError: GC Overhead Limit Exceeded`** ： 当 JVM 花太多时间执行垃圾回收并且只能回收很少的堆空间时，就会发生此错误。

2. **`java.lang.OutOfMemoryError: Java heap space`** :假如在创建新的对象时, 堆内存中的空间不足以存放新创建的对象, 就会引发此错误。(和配置的最大堆内存有关，且受制于物理内存大小。

   最大堆内存可通过`-Xmx`参数配置，若没有特别配置，将会使用默认值，详见：[Default Java 8 max heap sizeopen in new window](https://stackoverflow.com/questions/28272923/default-xmxsize-in-java-8-max-heap-size))

3. ......



### 方法区

方法区属于是 JVM 运行时数据区域的一块逻辑区域，是各个线程共享的内存区域。

> 《Java 虚拟机规范》只是规定了有方法区这么个概念和它的作用，方法区到底要如何实现那就是虚拟机自己要考虑的事情了。也就是说，在不同的虚拟机实现上，方法区的实现是不同的。

#### 存储信息

当虚拟机要使用一个类时，它需要读取并解析 Class 文件获取相关信息，再将信息存入到方法区。

方法区会存储已被虚拟机加载的 **类信息、字段信息、方法信息、常量、静态变量、即时编译器编译后的代码缓存等数据**。

#### 方法区和永久代，元空间的关系

方法区和永久代以及元空间的关系很像 Java 中接口和类的关系，类实现了接口，这里的类就可以看作是永久代和元空间，接口可以看作是方法区。

也就是说**永久代以及元空间是 HotSpot 虚拟机对虚拟机规范中方法区的两种实现方式**。并且，永久代是 JDK 1.8 之前的方法区实现，JDK 1.8 及以后方法区的实现变成了元空间。

![HotSpot 虚拟机方法区的两种实现](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/method-area-implementation.68e9c9cd.png)

#### 为什么用元空间替代永久代呢？

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20210425134508117.png)

1. 整个永久代有一个 JVM 本身设置的固定大小上限，无法进行调整；

   而元空间使用的是直接内存，受本机可用内存的限制，虽然元空间仍旧可能溢出，但是比原来出现的几率会更小。

   > - 当元空间溢出时会得到如下错误： `java.lang.OutOfMemoryError: MetaSpace`
   >
   > - 可以使用 `-XX：MaxMetaspaceSize` 标志设置最大元空间大小，默认值为 unlimited，这意味着它只受系统内存的限制。
   >
   >   `-XX：MetaspaceSize` 调整标志定义元空间的初始大小，如果未指定此标志，则 Metaspace 将根据运行时的应用程序需求动态地重新调整大小。

2. 元空间里面存放的是类的元数据，这样加载多少类的元数据就不由 `MaxPermSize` 控制了,

    而由系统的实际可用空间来控制，这样能加载的类就更多了。

3. 在 JDK8，合并 HotSpot 和 JRockit 的代码时, JRockit 从来没有一个叫永久代的东西, 合并之后就没有必要额外的设置这么一个永久代的地方了。



#### 方法区常用参数

##### 1.8之前

JDK 1.8 之前永久代还没被彻底移除的时候通常通过下面这些参数来调节方法区大小：

```java
-XX:PermSize=N //方法区 (永久代) 初始大小
-XX:MaxPermSize=N //方法区 (永久代) 最大大小,超过这个值将会抛出 OutOfMemoryError 异常:java.lang.OutOfMemoryError: PermGen
```

垃圾收集行为在这个区域是比较少出现的，但并非数据进入方法区后就“永久存在”了。

##### 1.8

JDK 1.8 的时候，方法区（HotSpot 的永久代）被彻底移除了（JDK1.7 就已经开始了），取而代之是元空间，元空间使用的是直接内存。

```java
-XX:MetaspaceSize=N //设置 Metaspace 的初始（和最小大小）
-XX:MaxMetaspaceSize=N //设置 Metaspace 的最大大小
```

与永久代很大的不同就是，如果不指定大小的话，随着更多类的创建，虚拟机会耗尽所有可用的系统内存。



### 运行时常量池（属于方法区）

Class 文件中除了有类的版本、字段、方法、接口等描述信息外，

还有用于**存放编译期生成的各种字面量（Literal）和符号引用（Symbolic Reference）**的 **常量池表(Constant Pool Table)** 。

> - **字面量**
>
>   源代码中的固定值的表示法，即通过字面我们就能知道其值的含义。
>
>   字面量包括整数、浮点数和字符串字面量。
>
> - **符号引用**
>
>   包括类符号引用、字段符号引用、方法符号引用和接口方法符号引用。

常量池表会在类加载后存放到方法区的运行时常量池中。

功能类似于传统编程语言的符号表，尽管它包含了比典型符号表更广泛的数据。

运行时常量池**是方法区的一部分**，自然受到方法区内存的限制，当常量池无法再申请到内存时会抛出 `OutOfMemoryError` 错误。



### 字符串常量池

是 JVM 为了提升性能和减少内存消耗**针对字符串（String 类）专门开辟的一块区域**。

主要目的是为了避免字符串的重复创建。

> HotSpot 虚拟机中字符串常量池的实现是 `src/hotspot/share/classfile/stringTable.cpp` ,`StringTable` 本质上就是一个`HashSet<String>` ,容量为 `StringTableSize`（可以通过 `-XX:StringTableSize` 参数来设置）。

`StringTable` 中**保存的是字符串对象的引用**，字符串对象的引用指向堆中的字符串对象。

JDK1.7 之前，字符串常量池存放在永久代。

JDK1.7 字符串常量池和静态变量从永久代移动了 Java 堆中。

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/method-area-jdk1.6.02db832c.png" alt="img" style="zoom: 50%;" />



<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/method-area-jdk1.7.eaf4234f.png" alt="img" style="zoom: 50%;" />



<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/method-area-jdk1.8.b19d81f7.png" alt="img" style="zoom: 50%;" />

#### 为什么将字符串常量池移动到堆？

因为永久代（方法区实现）的 GC 回收效率太低，只有在整堆收集 (Full GC)的时候才会被执行 GC。

Java 程序中通常会有大量的被创建的字符串等待回收，将字符串常量池放到堆中，能够更高效及时地回收字符串内存。



### 直接内存

直接内存并不是虚拟机运行时数据区的一部分，也不是虚拟机规范中定义的内存区域，但是这部分内存也被频繁地使用。

> JDK1.4 中新加入的 **NIO(New Input/Output) 类**，引入了一种基于**通道（Channel）**与**缓存区（Buffer）**的 I/O 方式。
>
> 它可以直接使用 Native 函数库直接分配堆外内存，然后通过一个存储在 Java 堆中的 DirectByteBuffer 对象作为这块内存的引用进行操作。
>
> 这样就能在一些场景中显著提高性能，因为避免了**在 Java 堆和 Native 堆之间来回复制数据**。

本机直接内存的分配不会受到 Java 堆的限制，但是，既然是内存就会受到本机总内存大小以及处理器寻址空间的限制。





## 从HotStop虚拟机看对象的结构

了解HotSpot 虚拟机在 Java 堆中对象分配、布局和访问的全过程。

### 对象的创建过程

#### 1. 类加载检查

虚拟机遇到一条 new 指令时，

首先将去检查这个指令的参数是否能在常量池中定位到这个类的符号引用，

并且检查这个符号引用代表的类是否已被加载过、解析和初始化过。

如果没有，那必须先执行相应的类加载过程。

#### 2. 分配内存

类加载通过后，为新生对象**分配内存**。

对象所需的内存大小在类加载完成后便可确定，为对象分配空间的任务等同于把一块确定大小的内存从 Java 堆中划分出来。

分配方式有“指针碰撞”和“空闲列表”两种，由Java堆是否规整决定。

Java堆是否规整由采用的垃圾收集器是否有压缩整理功能决定。

##### 内存分配的两种方式

- **指针碰撞**
  - 适用场合 ：堆内存规整（即没有内存碎片）的情况下。
  - 原理 ：用过的内存全部整合到一边，没有用过的内存放在另一边，中间有一个分界指针，只需要向着没用过的内存方向将该指针移动对象内存大小位置即可。
  - 使用该分配方式的 GC 收集器：Serial, ParNew
- **空闲列表**
  - 适用场合 ： 堆内存不规整的情况下。
  - 原理 ：虚拟机会维护一个列表，该列表中会记录哪些内存块是可用的，在分配的时候，找一块儿足够大的内存块儿来划分给对象实例，最后更新列表记录。
  - 使用该分配方式的 GC 收集器：CMS

> Java 堆内存是否规整，取决于 GC 收集器的算法是**"标记-清除"**，还是**"标记-整理"（也称作"标记-压缩"）**，值得注意的是，**复制算法内存**也是规整的。



##### 内存分配并发问题——虚拟机保证线程安全的方式

在创建对象的时候有一个很重要的问题，就是线程安全，因为在实际开发过程中，创建对象是很频繁的事情，作为虚拟机来说，必须要保证线程是安全的。

通常来讲，虚拟机采用两种方式来保证线程安全：

- **CAS+失败重试：** 

  **虚拟机采用 CAS 配上失败重试的方式保证更新操作的原子性。**

  CAS 是乐观锁的一种实现方式。所谓乐观锁就是，每次不加锁而是假设没有冲突而去完成某项操作，如果因为冲突失败就重试，直到成功为止。

- **TLAB：** 

  为每一个线程预先在 Eden 区分配一块儿内存，JVM 在给线程中的对象分配内存时，首先在 TLAB 分配，当对象大于 TLAB 中的剩余内存或 TLAB 的内存已用尽时，再采用上述的 CAS 进行内存分配。



#### 初始化零值

内存分配完成后，虚拟机需要将分配到的内存空间都初始化为零值（不包括对象头）

这一步操作保证了**对象的实例字段在 Java 代码中可以不赋初始值就直接使用**，程序能访问到这些字段的数据类型所对应的零值。



#### 设置对象头

初始化零值完成之后，**虚拟机要对对象进行必要的设置**。

如这个对象是哪个类的实例、如何才能找到类的元数据信息、对象的哈希码、对象的 GC 分代年龄等信息，**这些信息存放在对象头中。**

另外，根据虚拟机当前运行状态的不同，如是否启用偏向锁等，对象头会有不同的设置方式。



#### 执行init方法

上面工作都完成之后，从虚拟机的视角来看，一个新的对象已经产生了。

但从 Java 程序的视角来看，对象创建才刚开始，`<init>` 方法还没有执行，所有的字段都还为零。

所以一般来说，执行 new 指令之后会接着执行 `<init>` 方法，把对象按照程序员的意愿进行初始化，这样一个真正可用的对象才算完全产生出来。



### 对象的内存布局

在 Hotspot 虚拟机中，对象在内存中的布局可以分为 3 块区域：**对象头**、**实例数据**和**对齐填充**。

#### 对象头

包括两部分信息：

- **第一部分用于存储对象自身的运行时数据**（哈希码、GC 分代年龄、锁状态标志等等）
- **另一部分是类型指针**，即对象指向它的类元数据的指针，虚拟机通过这个指针来确定这个对象是哪个类的实例。

#### 实例数据

**是对象真正存储的有效信息**，也是在程序中所定义的各种类型的**字段内容**。

#### 对齐填充

**不是必然存在的，也没有什么特别的含义，仅仅起占位作用。**

 因为 Hotspot 虚拟机的自动内存管理系统要求对象起始地址必须是 8 字节的整数倍，换句话说就是对象的大小必须是 8 字节的整数倍。而对象头部分正好是 8 字节的倍数（1 倍或 2 倍），因此，当对象实例数据部分没有对齐时，就需要通过对齐填充来补全。



### 对象的访问定位

建立对象就是为了使用对象，我们的 Java 程序通过栈上的 reference 数据来操作堆上的具体对象。

对象的访问方式有虚拟机实现决定，主流方式有：使用句柄，直接指针。



#### 句柄

Java 堆中会划分出一块内存来作为句柄池，

reference 中存储的就是对象的句柄地址，

句柄中包含了**对象实例数据与类型数据各自的具体地址信息**。

![对象的访问定位-使用句柄](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/rrtertert1cf25227.png)

#### 直接指针

使用直接指针访问，那么 Java 堆对象的布局中就必须考虑如何放置访问类型数据的相关信息，

而 reference 中存储的直接就是对象的地址。

![对象的访问定位-直接指针](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/gfhdfhdfh.png)



#### 区别

两种对象访问方式各有优势

- 使用句柄来访问的最大好处是 reference 中存储的是稳定的句柄地址，在对象被移动时只会改变句柄中的实例数据指针，而 reference 本身不需要修改。
- 使用直接指针访问方式最大的好处就是速度快，它节省了一次指针定位的时间开销。



## 垃圾回收

Java 堆是垃圾收集器管理的主要区域，因此也被称作**GC 堆（Garbage Collected Heap）**



### 堆的分区

从垃圾回收的角度，由于现在收集器基本都采用分代垃圾收集算法，

所以 Java 堆还可以细分为：新生代和老年代；

再细致一点有：Eden 空间、From Survivor、To Survivor 空间等。

进一步划分的目的是更好地**回收内存**，或者更快地**分配内存**。

#### 堆空间基本结构

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dgdfgdfgdgdggd.png)

- 新生代：Eden 区、From Survivor0("From") 区、To Survivor1("To") 区
- 老年代：Old Memory 区

大部分情况，对象都会首先在 Eden 区域分配，

在一次新生代垃圾回收后，如果对象还存活，则会进入 s0 或者 s1，并且对象的年龄还会加 1(Eden 区->Survivor 区后对象的初始年龄变为 1)

当它的年龄增加到一定程度（默认为大于 15 岁），就会被晋升到老年代中。

经过 GC 后，Eden 区和"From"区已经被清空。

这个时候，"From"和"To"会交换他们的角色，也就是新的"To"就是上次 GC 前的“From”，新的"From"就是上次 GC 前的"To"，**保证名为 To 的 Survivor 区域是空的**。

> **晋升老年代的阈值**
>
> Hotspot 遍历所有对象时，按照年龄从小到大对其所占用的大小进行累积，当累积的某个年龄大小超过了 survivor 区的一半时，取这个年龄和 MaxTenuringThreshold 中更小的一个值，作为新的晋升年龄阈值。
>
> 通过参数 `-XX:MaxTenuringThreshold`设置，
>
> 通过`-XX:+PrintTenuringDistribution`来打印出当次 GC 后的 Threshold。

Minor GC 会一直重复这样的过程，在这个过程中，有可能当次 Minor GC 后，Survivor 的"From"区域空间不够用，有一些还达不到进入老年代条件的实例放不下，则放不下的部分会提前进入老年代。



### 判断对象死亡的方式

堆中几乎放着所有的对象实例，对堆垃圾回收前的第一步就是要判断哪些对象已经死亡（即不能再被任何途径使用的对象）。

#### 引用计数法

#### 可达性分析算法



### 引用的分类

JDK1.2 以后，Java 对引用的概念进行了扩充，将引用分为强引用、软引用、弱引用、虚引用四种（引用强度逐渐减弱）

#### 强引用

使用最普遍的引用。

如果一个对象具有强引用，垃圾回收器绝不会回收它。

当内存空间不足，Java 虚拟机宁愿抛出 OutOfMemoryError 错误，使程序异常终止，也不会靠随意回收具有强引用的对象来解决内存不足问题。

#### 软引用

一个对象只具有软引用，

- 如果内存空间足够，垃圾回收器就不会回收它；

- 如果内存空间不足了，就会回收这些对象的内存。

软引用可用来实现内存敏感的高速缓存。

使用软引用的情况较多，这是因为**软引用可以加速 JVM 对垃圾内存的回收速度，可以维护系统的运行安全，防止内存溢出（OutOfMemory）等问题的产生**。

#### 弱引用

只具有弱引用的对象比软引用拥有更短暂的生命周期。

在垃圾回收器线程扫描它所管辖的内存区域的过程中，一旦发现了只具有弱引用的对象，不管当前内存空间足够与否，都会回收它的内存。

不过垃圾回收器是一个优先级很低的线程， 因此不一定会很快发现那些只具有弱引用的对象。

#### 虚引用

如果一个对象仅持有虚引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾回收。

**主要用来跟踪对象被垃圾回收的活动**。

>  **虚引用必须和引用队列（ReferenceQueue）联合使用**
>
> 当垃圾回收器准备回收一个对象时，如果发现它还有虚引用，就会在回收对象的内存之前，把这个虚引用加入到与之关联的引用队列中。
>
> 程序可以通过判断引用队列中是否已经加入了虚引用，来了解被引用的对象是否将要被垃圾回收。程序如果发现某个虚引用已经被加入到引用队列，那么就可以在所引用的对象的内存被回收之前采取必要的行动。



### 垃圾收集算法

#### 标记-清除算法



#### 标记-复制算法



#### 标记-整理算法



#### 分代收集算法



# JUC

指的是jdk的一个包`java.util.concurrent`

## volatile的理解与JMM模型的可见性

### volatile

是Java虚拟机提供的`轻量级`的同步机制

- 保证可见性
- 不保证原子性
- 禁止指令重排



### JMM模型

JMM是Java内存模型，也就是Java Memory Model，简称JMM.

本身是一种抽象的概念，实际上并不存在，它描述的是一组规则或规范，通过这组规范定义了程序中各个变量（包括实例字段，静态字段和构成数组对象的元素）的访问方式。

#### JMM关于同步的规定

- 线程解锁前，必须把共享变量的值刷新回主内存
- 线程加锁前，必须读取主内存的最新值，到自己的工作内存
- 加锁和解锁是同一把锁

JVM运行程序的实体是线程，而每个线程创建时JVM都会为其创建一个**工作内存（有些地方称为栈空间）**，工作内存是每个线程的私有数据区域。

而Java内存模型中规定所有变量都存储在主内存，主内存是共享内存区域，所有线程都可以访问。

但线程对变量的操作（读取赋值等）必须在工作内存中进行，首先要将变量从主内存拷贝到自己的工作内存空间，然后对变量进行操作，操作完成后再将变量写回主内存，不能直接操作主内存中的变量。

各个线程中的工作内存中存储着主内存中的变量副本拷贝，因此不同的线程间无法访问对方的工作内存，线程间的通信（传值）必须通过主内存来完成。

其访问过程如下：

![image-20200309153225758](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200309153225758.png)

#### 主内存与工作内存

- 主内存：就是计算机的内存，也就是经常提到的8G内存，16G内存

- 工作内存：实例化对象时，对象属性依然存储在主内存。当多线程访问对象变量时，线程会各自拷贝一份到各自的工作内存。

  ![image-20200309154435933](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200309154435933.png)

#### 可见性

JMM内存模型的可见性，指的是**当主内存区域中的值被某个线程写入更改后，其它线程会马上知晓更改后的值，并重新得到更改后的值。**

如何保证可见性？使用的是[总线嗅探技术](####总线嗅探)。



#### JMM特性

- 可见性
- 原子性
- 有序性



#### 可见性验证

对于成员变量没有添加任何修饰时，是无法感知其它线程修改后的值。

```java
//	代表主存
class MyData {

    int number = 0;

    public void addTo60() {
        this.number = 60;
    }
}
```

```java
/**
 * 验证volatile的可见性
 * 1. 假设int number = 0， number变量之前没有添加volatile关键字修饰
 */
public class VolatileDemo {

    public static void main(String args []) {
        // 资源类
        MyData myData = new MyData();

        // AAA线程 实现了Runnable接口的，lambda表达式
        new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + "\t come in");
            // 线程睡眠3秒，假设在进行运算
            try {
                TimeUnit.SECONDS.sleep(3);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            // 修改number的值
            myData.addTo60();
            // 输出修改后的值
            System.out.println(Thread.currentThread().getName() + "\t update number value:" + myData.number);
        }, "AAA").start();

        while(myData.number == 0) {
            // main线程就一直在这里等待循环，直到number的值不等于零
        }

        // 按道理这个值是不可能打印出来的，因为主线程运行的时候，number的值为0，所以一直在循环
        // 如果能输出这句话，说明AAA线程在睡眠3秒后，更新的number的值，重新写入到主内存，并被main线程感知到了
        System.out.println(Thread.currentThread().getName() + "\t mission is over");

    }
}
```

- 当number属性没有volatile修饰时，走到while(myData.number == 0) 后没有继续打印，说明主内存的number没有改变，没有可见性。
- 当number属性添加volatile修饰，主内存被修改为60，说明有可见性。



### 缓存一致性

当多个处理器运算任务都涉及到同一块主内存区域的时候，将可能导致各自的缓存数据不一，这就是缓存一致性问题。

为了解决缓存一致性的问题，需要各个处理器访问缓存时都遵循一些协议，在读写时要根据协议进行操作，这类协议主要有MSI、MESI等等。

#### MESI

当CPU写数据时，如果发现操作的变量是共享变量，即在其它CPU中也存在该变量的副本，会发出信号通知其它CPU将该内存变量的缓存行**设置为无效**，因此当其它CPU读取这个变量的时，发现自己缓存该变量的缓存行是无效的，那么它就会从内存中重新读取。

#### 总线嗅探

如何发现数据是否失效呢？

每个处理器通过嗅探在总线上传播的数据来检查自己缓存值是否过期，当处理器发现自己的缓存行对应的内存地址被修改，就会将当前处理器的缓存行设置为无效状态。

当处理器对这个数据进行修改操作的时候，会重新从内存中把数据读取到处理器缓存中。

##### 总线风暴

总线嗅探的缺点：

由于volatile关键字通过MESI缓存一致性协议，需要不断的从主内存嗅探和CAS循环，无效的交互会导致**总线带宽达到峰值**。

因此不要大量使用volatile关键字，至于什么时候使用volatile、什么时候用锁以及Syschonized都是需要根据实际场景的。



# Spring





## Spring Bean



### 生命周期

https://www.cnblogs.com/zrtqsk/p/3735273.html

#### 流程图

![Spring Bean 生命周期](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/5496407.jpg)

- 实例化`BeanFactoryPostProcessor`实现类，执行其`postProcessBeanFactory`方法。
- 实例化`BeanPostProcessor`实现类
- 实例化`InstantiationAwareBeanPostProcessorAdapter`实现类
- 执行`InstantiationAwareBeanPostProcessor`的`postProcessBeforeInstantiation`方法
- 执行Bean构造器
- 执行`InstantiationAwareBeanPostProcessor`的`postProcessPropertyValues`方法
- 为Bean注入属性
- 调用`BeanNameAware`的`setBeanName`方法
- 调用`BeanFactoryAware`的`setBeanFactory`方法
- 执行`BeanPostProcessor`的`postProcessBeforeInitialization`方法
- 调用`InitializingBean`的`afterPropertiesSet`方法
- 调用`<bean>`的`init-method`属性指定的初始化方法
- 执行`BeanPostProcessor`的`postProcessAfterInitialization`方法
- 执行`InstantiationAwareBeanPostProcessor`的`postProcessAfterInitialization`方法
- 容器初始化成功，执行正常调用后，销毁容器
- 调用`DiposibleBean`的destory方法
- 调用`<bean>`的`destory-method`属性指定的初始化方法

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/181453414212066.png)









## Spring IOC

### IOC概念

Inversion Of Control 译为 反转控制，其一是控制，其二是反转。

- **控制**

  对对象的控制

- **反转**

  依赖对象的获取反转



### Spring IOC原理

 IoC 容器是一个大的工厂来管理所有对象和它们的依赖关系：

- 使用反射技术获取对象的信息包括：类信息、成员、方法等等
- 再通过 xml 配置 或者 注解 的方式，说明依赖关系
- 在调用类需要使用其他类的时候，不再通过调用类自己实现，而是通过 IoC 容器进行注入











## SpringTask 定时任务



### Cron表达式

Cron表达式是一个字符串，包括6~7个时间元素，在SpringTask中可以用于指定任务的执行时间。

#### 语法格式

 Seconds Minutes Hours DayofMonth Month DayofWeek

#### 时间元素范围

| 时间元素   | 可出现的字符  | 有效数值范围 |
| ---------- | ------------- | ------------ |
| Seconds    | , - * /       | 0-59         |
| Minutes    | , - * /       | 0-59         |
| Hours      | , - * /       | 0-23         |
| DayofMonth | , - * / ? L W | 0-31         |
| Month      | , - * /       | 1-12         |
| DayofWeek  | , - * / ? L # | 1-7或SUN-SAT |

#### 特殊字符说明

| 字符 | 作用                                      | 举例                                                         |
| ---- | ----------------------------------------- | ------------------------------------------------------------ |
| ,    | 列出枚举值                                | 在Minutes域使用5,10，表示在5分和10分各触发一次               |
| -    | 表示触发范围                              | 在Minutes域使用5-10，表示从5分到10分钟每分钟触发一次         |
| *    | 匹配任意值                                | 在Minutes域使用*, 表示每分钟都会触发一次                     |
| /    | 起始时间开始触发，每隔固定时间触发一次    | 在Minutes域使用5/10,表示5分时触发一次，每10分钟再触发一次    |
| ?    | 在DayofMonth和DayofWeek中，用于匹配任意值 | 在DayofMonth域使用?,表示每天都触发一次                       |
| #    | 在DayofMonth中，确定第几个星期几          | 1#3表示第三个星期日                                          |
| L    | 表示最后                                  | 在DayofWeek中使用5L,表示在最后一个星期四触发                 |
| W    | 表示有效工作日(周一到周五)                | 在DayofMonth使用5W，如果5日是星期六，则将在最近的工作日4日触发一次 |

#### 添加SpringTask的配置

Spring内置SpringTask框架，无需额外引入

在配置类设置@EnableScheduling即可



## [Spring Data Elasticsearch](http://www.macrozheng.com/#/architect/mall_arch_07?id=spring-data-elasticsearch)

Spring Data Elasticsearch是Spring提供的一种以Spring Data风格来操作数据存储的方式，它可以避免编写大量的样板代码。

### 相关概念

- **Near Realtime（近实时）**：Elasticsearch是一个近乎实时的搜索平台，这意味着从索引文档到可搜索文档之间只有一个轻微的延迟(通常是一秒钟)。

- **Cluster（集群）**：集群是**一个或多个节点的集合**，它们一起保存整个数据，并提供跨所有节点的联合索引和搜索功能。每个群集都有自己的唯一群集名称，节点通过名称加入群集。

- **Node（节点）**：节点是指属于集群的单个Elasticsearch实例，存储数据并参与集群的索引和搜索功能。可以将节点配置为按集群名称加入特定集群，默认情况下，每个节点都设置为加入一个名为`elasticsearch`的集群。

- **Index（索引）**：索引是一些具有相似特征的文档集合，类似于MySql中数据库的概念。

- **Type（类型）**：类型是索引的逻辑类别分区，通常，为具有一组公共字段的文档类型，类似MySql中表的概念。

  > 在Elasticsearch 6.0.0及更高的版本中，一个索引只能包含一个类型。

- **Document（文档）**：文档是可被索引的基本信息单位，以JSON形式表示，类似于MySql中行记录的概念。

- **Shards（分片）**：当索引存储大量数据时，可能会超出单个节点的硬件限制，为了解决这个问题，Elasticsearch提供了将索引细分为分片的概念。分片机制赋予了索引水平扩容的能力、并允许跨分片分发和并行化操作，从而提高性能和吞吐量。

- **Replicas（副本）**：在可能出现故障的网络环境中，需要有一个故障切换机制，Elasticsearch提供了将索引的分片复制为一个或多个副本的功能，副本在某些节点失效的情况下提供高可用性。



### 添加依赖

```xml
<!--Elasticsearch相关依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch<artifactId>
</dependency>
```

目前适配的是springboot 2.3.0 RELEASE版本，对应es版本7.x

### 配置文件

修改application.yml文件，在spring节点下添加Elasticsearch相关配置。

```yaml
spring:
  elasticsearch:
    rest:
      uris: http://localhost:9200 # es的连接地址及端口号
```

### 常用注解

#### @Document

标示映射到Elasticsearch文档上的领域对象

```java
@Persistent
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.TYPE })
public @interface Document {
	//索引库名次，mysql中数据库的概念
	String indexName();
    //文档类型，mysql中表的概念
	@Deprecated
	String type() default "";
	/**
	 * Use server-side settings when creating the index.
	 */
	boolean useServerConfiguration() default false;
	//默认分片数
	short shards() default 1;
	//默认副本数量
	short replicas() default 1;
	/**
	 * Refresh interval for the index {@link #indexName()}. Used for index creation.
	 */
	String refreshInterval() default "1s";
	/**
	 * Index storage type for the index {@link #indexName()}. Used for index creation.
	 */
	String indexStoreType() default "fs";
	/**
	 * Configuration whether to create an index on repository bootstrapping.
	 */
	boolean createIndex() default true;
	/**
	 * Configuration of version management.
	 */
	VersionType versionType() default VersionType.EXTERNAL;
}
```

> 7.x版本后 type过时，不建议使用 https://blog.csdn.net/weixin_42260782/article/details/108304524
>
> 暂时没搞明白，先记录在这里，只是过时，8.x才废弃

#### @Id

表示是文档的id，文档可以认为是mysql中表行的概念

```java
public @interface Id {
}
```

#### @Field

```java
public @interface Field {
  //文档中字段的类型
	FieldType type() default FieldType.Auto;
  //是否建立倒排索引
	boolean index() default true;
  //是否进行存储
	boolean store() default false;
  //分词器名次
	String analyzer() default "";
}
```

> 其中的**FieldType枚举**，用于区分字段类型：
>
> ```java
> //为文档自动指定元数据类型
> public enum FieldType {
> 	Text,//会进行分词并建了索引的字符类型
> 	Integer,
> 	Long,
> 	Date,
> 	Float,
> 	Double,
> 	Boolean,
> 	Object,
> 	Auto,//自动判断字段类型
> 	Nested,//嵌套对象类型
> 	Ip,
> 	Attachment,
> 	Keyword//不会进行分词建立索引的类型
> }
> ```

### 数据操作方法

#### 继承ElasticsearchRepository接口使用常用的数据操作方法

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_31.17948c33.png)

#### 衍生查询

接口中直接指定查询方法名称便可查询，无需进行实现，如商品表中有商品名称、标题和关键字，直接定义以下查询，就可以对这三个字段进行全文搜索

```java
/**
     * 搜索查询
     *
     * @param name              商品名称
     * @param subTitle          商品标题
     * @param keywords          商品关键字
     * @param page              分页信息
     * @return
     */
    Page<EsProduct> findByNameOrSubTitleOrKeywords(String name, String subTitle, String keywords, Pageable page);
```

如对应字段为BrandName，IDEA会有如下提示

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_32.d55bbbce.png)

#### 利用@Query注解用Elasticsearch的DSL语句进行查询

> **DSL**
>
> 是 Domain Specific Language 的缩写，中文翻译为**领域特定语言**
>
> 与 DSL 相对的就是 GPL，是 General Purpose Language 的简称，即**通用编程语言**，也就是我们非常熟悉的 Objective-C、Java、Python 以及 C 语言等等。

```java
@Query("{"bool" : {"must" : {"field" : {"name" : "?0"}}}}")
Page<EsProduct> findByName(String name,Pageable pageable);
```

也就是用es的语法在注解上配置查询



## [Spring Data Mongodb](http://www.macrozheng.com/#/architect/mall_arch_08?id=spring-data-mongodb)

和Spring Data Elasticsearch类似，Spring Data Mongodb是Spring提供的一种以Spring Data风格来操作数据存储的方式，它可以避免编写大量的样板代码。



### 常用注解

- **@Document**：标示映射到Mongodb文档上的领域对象
- **@Id**：标示某个域为ID域
- **@Indexed**：标示某个字段为Mongodb的索引字段



### 操作数据

#### 继承MongoRepository接口可以获得常用的数据操作方法

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_42.0a75a3c4.png)

#### 衍生查询

在接口中直接指定查询方法名称便可查询，无需进行实现，以下为根据会员id按时间倒序获取浏览记录的例子。

```java
/**
 * 会员商品浏览历史Repository
 * Created by macro on 2018/8/3.
 */
public interface MemberReadHistoryRepository extends MongoRepository<MemberReadHistory,String> {
    /**
     * 根据会员id按时间倒序获取浏览记录
     * @param memberId 会员id
     */
    List<MemberReadHistory> findByMemberIdOrderByCreateTimeDesc(Long memberId);
}
```

#### 使用@Query注解可以用Mongodb的JSON查询语句进行查询

```java
@Query("{ 'memberId' : ?0 }")
List<MemberReadHistory> findByMemberId(Long memberId);
```



### 引入依赖

```xml
<!---mongodb相关依赖-->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

### 配置文件

application.yaml

```yaml
mongodb:
  host: localhost # mongodb的连接地址
  port: 27017 # mongodb的连接端口号
  database: xxx # mongodb的连接的数据库
```





## [Swagger-UI](http://www.macrozheng.com/#/architect/mall_arch_02?id=swagger-ui)

Swagger-UI是HTML, Javascript, CSS的一个集合，可以动态地根据注解生成在线API文档。

> Swagger是一组开源项目，其中主要要项目如下：
>
> 1. Swagger-tools:提供各种与Swagger进行集成和交互的工具。例如模式检验、Swagger 1.2文档转换成Swagger 2.0文档等功能。
>
> 2. Swagger-core: 用于Java/Scala的的Swagger实现。与JAX-RS(Jersey、Resteasy、CXF...)、Servlets和Play框架进行集成。
>
> 3. Swagger-js: 用于JavaScript的Swagger实现。
>
> 4. Swagger-node-express: Swagger模块，用于node.js的Express web应用框架。
>
> 5. Swagger-ui：一个无依赖的HTML、JS和CSS集合，可以为Swagger兼容API动态生成优雅文档。
>
> 6. Swagger-codegen：一个模板驱动引擎，通过分析用户Swagger资源声明以各种语言生成客户端代码。



### 与SpringBoot整合

#### Maven依赖

```xml
<!--Swagger-UI API文档生产工具-->
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger2</artifactId>
  <version>2.7.0</version>
</dependency>
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger-ui</artifactId>
  <version>2.7.0</version>
</dependency>
```

#### 常用注解

| 注解                | 用途                                                         |
| ------------------- | ------------------------------------------------------------ |
| `@Api`              | 修饰Controller类，生成Controller相关文档信息                 |
| `@ApiOperation`     | 修饰Controller类中的方法，生成接口方法相关文档信息           |
| `@ApiParam`         | 修饰接口中的参数，生成接口参数相关文档信息                   |
| `@ApiModelProperty` | 修饰实体类的属性，当实体类是请求参数或返回结果时，直接生成相关文档信息 |



### Java配置

```java
@Configuration
@EnableSwagger2
public class Swagger2Config {
    @Bean
    public Docket createRestApi(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                //为当前包下controller生成API文档
                .apis(RequestHandlerSelectors.basePackage("com.macro.mall.tiny.controller"))
                //为有@Api注解的Controller生成API文档
//                .apis(RequestHandlerSelectors.withClassAnnotation(Api.class))
                //为有@ApiOperation注解的方法生成API文档
//                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("SwaggerUI演示")
                .description("mall-tiny")
                .contact(new Contact("pix","",""))
                .version("1.0")
                .build();
    }
}
```



启动后访问地址：http://localhost:8080/swagger-ui.html

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_04.png" alt="img" style="zoom:50%;" />

> - 问题一：访问网址出现**Unable to infer base url**
>
>   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210222184155924.png" alt="image-20210222184155924" style="zoom:50%;" />
>
>   解决方式：
>
>   - SpringBoot的启动Application前面加上`@EnableSwagger2`注解



## Spring Security





### 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```



### 初步使用

不配置，创建自定义接口`/test/string`，进行调用

```java
@GetMapping("/string")
    public String testString(){
        return "Hello World";
    }
```

通过接口调用会直接提示权限不足，状态码401：

![image-20220502162232868](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220502162232868.png)

通过浏览器访问接口返回302状态码进行重定向到自动生成的/login页面

![image-20220502165128368](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220502165128368.png)

默认用户名为user，密码在启动时控制台可以查看，登陆后会返回调用之前的接口

![image-20220502165249020](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220502165249020.png)

同时，通过测试接口调用也可以用添加Authorization头的方式通过权限验证

![image-20220502165656427](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220502165656427.png)

> Spring Security 支持两种不同的认证方式：
>
> - 可以通过 form 表单来认证
> - 可以通过 HttpBasic 来认证



### 配置用户名

可以看到用户名是默认的，密码是自动生成的，这个可以进行配置

#### application.yml

```yaml
spring:
  security:
    user:
      name: root
      password: root
```

#### 通过代码配置在内存

配置security配置类，继承WebSecurityConfigurerAdapter 类，而修改账号密码则是通过重写configure(AuthenticationManagerBuilder auth)方法实现。

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("root").password("root")
                .roles("admin") //  分配角色
                .and()
                .withUser("test").password("test")
                .roles("user");
    }
}
```

但是这么配置密码并不能使用，现在版本的Security强制要求密码加密，所以需要配置一个密码编码工具，Security提供了一个BCryptPasswordEncoder

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("root").password(passwordEncoder().encode("root"))
                .roles("admin") //  分配角色
                .and()
                .withUser("test").password(passwordEncoder().encode("test"))
                .roles("user");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

> 实际开发过程中最好不要把明文密码写在代码里

#### 通过代码配置数据库加载

原理是基于UserDetailService接口，通过重写其loadUserByUsername方法，返回UserDetails对象供springSecurity登录，而重写的方式可以用数据库实现。

```java
@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //自定义逻辑实现，比如通过jdbc查数据库
        UserDetails userDetails = User.withUsername("zhangyu").password("{noop}123456").authorities("admin").build();
        return userDetails;
    }
}
```

```java
//	将这个实现类用在config来重写userDetailService()方法
@Autowired
private UserDetailService userDetailService;

public UserDetailsService userDetailsService() {
        //获取登录用户信息
        return userDetailService;
}
@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService())
        .passwordEncoder(passwordEncoder());
}
```



### 配置登录

包括登录成功后响应，失败后响应，通过配置类重写configure(HttpSecurity http)方法

```java
@Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()    //  开启登录配置
                .antMatchers("/test/string").hasRole("admin")   //  表示特定接口必须有特定角色admin
                .anyRequest().authenticated()   //  表示所有接口登陆后可以访问

                .and()
                .formLogin()    // 配置表单登录页面
//                .loginPage("/loginTest")    //  未登录时的页面路径   对应页面需要自行配置
                .loginProcessingUrl("/doLogin") // 登录调用的接口  是post方法
                .usernameParameter("name")  //  登录接口的用户名的属性名 默认username
                .passwordParameter("pass")  //  登录的密码的属性名 默认password
                //  登录成功处理器
                .successHandler((req, resp, authentication) -> {
                    resp.setContentType("application/json;charset=utf-8");
                    PrintWriter out = resp.getWriter();
                    out.write("success");
                    out.flush();
                })
                //  登录失败处理器
                .failureHandler((req, resp, exception) -> {
                    resp.setContentType("application/json;charset=utf-8");
                    PrintWriter out = resp.getWriter();
                    out.write("fail");
                    out.flush();
                })
                .permitAll()    //  和表单登录相关的接口统统都直接通过，如果应用拦截则使用.authenticated()

                .and()
                .logout()   //  配置登出
                .logoutUrl("/logout")   //  登出接口
                //  登出成功处理器
                .logoutSuccessHandler((req, resp, authentication) -> {
                    resp.setContentType("application/json;charset=utf-8");
                    PrintWriter out = resp.getWriter();
                    out.write("logout success");
                    out.flush();
                })
                .permitAll()    //  和登出相关的接口统统都直接通过

                .and()
                .httpBasic()    //  允许httpBasic登录
                .and()
                .csrf().disable();  //  禁止跨域

    }
```

> **部分方法配置含义**
>
> - anyRequest          |   匹配所有请求路径
> - access              |   SpringEl表达式结果为true时可以访问
> - anonymous           |   匿名可以访问
> - denyAll             |   用户不能访问
> - fullyAuthenticated  |   用户完全认证可以访问（非remember-me下自动登录）
> - hasAnyAuthority     |   如果有参数，参数表示权限，则其中任何一个权限可以访问
> -  hasAnyRole          |   如果有参数，参数表示角色，则其中任何一个角色可以访问
> -  hasAuthority        |   如果有参数，参数表示权限，则其权限可以访问
> - hasIpAddress        |   如果有参数，参数表示IP地址，如果用户IP和参数匹配，则可以访问
> - hasRole             |   如果有参数，参数表示角色，则其角色可以访问
> -  permitAll           |   用户可以任意访问
> -  rememberMe          |   允许通过remember-me登录的用户访问
> -  authenticated       |   用户登录后可访问

### 忽略拦截/白名单

目的是让部分地址不被拦截

- 设置地址匿名访问
- 过滤地址，不走security拦截

第二种方式通过重写配置的configure(WebSecurity web)方法

```java
@Override
public void configure(WebSecurity web) throws Exception {
    web.ignoring().antMatchers("/test/login");
}
```







# SpringCloud

## SpringCloud相关概念

### 微服务的理解

微服务架构下的一整套解决方案

- 服务注册与发现
- 服务调用
- 服务熔断
- 负载均衡
- 服务降级
- 服务消息队列
- 配置中心
- 服务网关
- 服务监控
- 全链路追踪
- 自动化构建部署
- 服务定时任务调度操作

![image-20200327091144073](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327091144073.png)



### SpringCloud理解

分布式微服务架构的一站式解决方案，是多种微服务架构落地技术的集合体，俗称微服务全家桶。

#### 京东的促销架构

![image-20200327091044516](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327091044516.png)

#### 阿里架构图

![image-20200327091209496](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327091209496.png)

#### 京东物流架构图

![image-20200327091226696](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327091226696.png)

#### 基础服务

![image-20200327091359549](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327091359549.png)



### 技术栈

![image-20200327091441550](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327091441550.png)



## 版本选型

### SpringBoot 2.X版 / SpringCloud H版

SpringBoot官方已经强烈推荐 2.X版

SpringCloud采用英国伦敦地铁站的名称来命名，并由地铁站名称字母A-Z一次类推的形式发布迭代版本

当SpringCloud的发布内容积累到临界点或者一个重大BUG被解决后，会发布一个Service releases版本，俗称SRX版本，比如 Greenwich.SR2就是SpringCloud发布的Greenwich版本的第二个SRX版本

![image-20200327093143960](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327093143960.png)



### SpringCloud与SpringBoot版本约束

SpringBoot和SpringCloud的版本选择也不是任意的，而是应该参考官网的约束配置

![image-20200327093337563](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200327093337563.png)

地址：https://spring.io/projects/spring-cloud

版本对应：https://start.spring.io/actuator/info



### 组件迭代（停更/升级/替换）

停更的版本处理方式：

- 被动修复Bugs
- 不再接受合并请求
- 不再发布新版本

#### 明细

- 服务调用
  - Eureka
  - Zookeeper
  - Consul
  - **Nacos** （推荐）
- 服务调用
  - Feign
  - **OpenFeign** （推荐）
  - Ribbon
  - LoadBalancer
- 服务降级
  - Hystrix
  - resilience4j
  - **sentienl** （推荐）
- 服务网关
  - Zuul
  - Zuul2
  - **Gateway**（推荐）
- 服务配置
  - Config
  - **Nacos**（推荐）
- 服务总线
  - Bus
  - **Nacos**（推荐）



## Spring Cloud Ribbon：负载均衡的服务调用

Spring Cloud Ribbon 是Spring Cloud Netflix 子项目的核心组件之一，主要给服务间调用及API网关转发提供负载均衡的功能。

Ribbon目前已经进入了维护模式，但是目前主流还是使用Ribbon，Spring Cloud想通过LoadBalancer用于替换Ribbon。

### 概念

Spring Cloud Ribbon是基于Netflix Ribbon实现的一套客户端，负载均衡的工具

简单的说，Ribbon是NetFlix发布的开源项目，主要功能是提供客户端的软件负载均衡算法和服务调用。

Ribbon客户端组件提供了一系列完善的配置项如连接超时，重试等。简单的说，就是在配置文件中列出Load Balancer（简称LB）后面所有的机器，Ribbon会自动的帮助你基于某种规则（如简单轮询，随机连接等）去连接这些机器。我们很容易使用Ribbon实现自定义的负载均衡算法。

### 负载均衡（LB）是什么

Load Balance，简单来说就是将用户的请求平摊的分配到多个服务上，从而达到系统的HA（高可用）。常见的负载均衡有软件Nginx，LVS，硬件F5等。

- 集中式LB：即在服务的消费方和提供方之间使用独立的LB设施（可以是硬件，如F5，也可以是软件，如Nginx），由该设施负责把访问请求通过某种策略转发至服务的提供方
- 进程内LB：将LB逻辑集成到消费方，消费方从服务注册中心获知有哪些地址可用，然后自己再从这些地址中选择出一个合适的服务器。Ribbon就属于进程内LB，它只是一个类库，集成于消费方进程，消费方通过它来获取到服务提供方的地址。



### Ribbon本地负载均衡客户端 VS Nginx服务端负载均衡

- Nginx是服务器负载均衡，客户端所有的请求都会交给nginx，然后由nginx实现转发请求，即负载均衡是由服务端实现的。
- Ribbon是本地负载均衡，在调用微服务接口的时候，会在注册中心上获取注册信息服务列表之后，缓存到JVM本地，从而在本地实现RPC远程调用。
- Ribbon = 负载均衡+远程调用



### 工作原理

其实就是一个软负载均衡的客户端组件，它可以和其它所需请求的客户端结合使用，和Eureka结合只是其中的一个实例。

![image-20200408104948953](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200408104948953.png)

Ribbon在工作时分成两步

- 首先先选择EurekaServer，它优先选择在同一个区域内负载较少的Server
- 再根据用户的指定的策略，从服务注册列表中选择一个地址，取到Server



Ribbon提供了多种策略：比如轮询，随机和根据响应时间加权



### 引入

新版的Eureka已经默认引入Ribbon了，不需要额外引入

```java
<!--Eureka客户端-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
</dependency>
```



### RestTemplate

RestTemplate是一个HTTP客户端，使用它我们可以方便的调用HTTP接口，支持GET、POST、PUT、DELETE等方法。

#### Get请求

```java
<T> T getForObject(String url, Class<T> responseType, Object... uriVariables);

<T> T getForObject(String url, Class<T> responseType, Map<String, ?> uriVariables);

<T> T getForObject(URI url, Class<T> responseType);

<T> ResponseEntity<T> getForEntity(String url, Class<T> responseType, Object... uriVariables);

<T> ResponseEntity<T> getForEntity(String url, Class<T> responseType, Map<String, ?> uriVariables);

<T> ResponseEntity<T> getForEntity(URI var1, Class<T> responseType);
```

**使用方式**

```java
//	getForObject 返回对象为响应体中数据转化成的对象
@GetMapping("/{id}")
public CommonResult getUser(@PathVariable Long id) {
    return restTemplate.getForObject(userServiceUrl + "/user/{1}", CommonResult.class, id);
}
//	getForEntity 返回对象为ResponseEntity对象，包含了响应中的一些重要信息，比如响应头、响应状态码、响应体等.
@GetMapping("/getEntityByUsername")
public CommonResult getEntityByUsername(@RequestParam String username) {
    ResponseEntity<CommonResult> entity = restTemplate.getForEntity(userServiceUrl + "/user/getByUsername?username={1}", CommonResult.class, username);
    if (entity.getStatusCode().is2xxSuccessful()) {
        return entity.getBody();
    } else {
        return new CommonResult("操作失败", 500);
    }
}
```

#### Post请求

```java
<T> T postForObject(String url, @Nullable Object request, Class<T> responseType, Object... uriVariables);

<T> T postForObject(String url, @Nullable Object request, Class<T> responseType, Map<String, ?> uriVariables);

<T> T postForObject(URI url, @Nullable Object request, Class<T> responseType);

<T> ResponseEntity<T> postForEntity(String url, @Nullable Object request, Class<T> responseType, Object... uriVariables);

<T> ResponseEntity<T> postForEntity(String url, @Nullable Object request, Class<T> responseType, Map<String, ?> uriVariables);

<T> ResponseEntity<T> postForEntity(URI url, @Nullable Object request, Class<T> responseType);
```

使用方式同get

#### Put请求

```java
void put(String url, @Nullable Object request, Object... uriVariables);

void put(String url, @Nullable Object request, Map<String, ?> uriVariables);

void put(URI url, @Nullable Object request);
```

**使用方式**

```java
@PutMapping("/update")
public CommonResult update(@RequestBody User user) {
    restTemplate.put(userServiceUrl + "/user/update", user);
    return new CommonResult("操作成功",200);
}
```

#### Delete请求

```java
void delete(String url, Object... uriVariables);

void delete(String url, Map<String, ?> uriVariables);

void delete(URI url);
```

**使用方式**

```java
@DeleteMapping("/delete/{id}")
public CommonResult delete(@PathVariable Long id) {
   restTemplate.delete(userServiceUrl + "/user/delete/{1}", id);
   return new CommonResult("操作成功",200);
}
```



### 使用@LoadBalanced注解赋予RestTemplate负载均衡能力

```java
@Configuration
public class RibbonConfig {

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```



### 常用配置

#### 全局配置

```yaml
ribbon:
  ConnectTimeout: 1000 #服务请求连接超时时间（毫秒）
  ReadTimeout: 3000 #服务请求处理超时时间（毫秒）
  OkToRetryOnAllOperations: true #对超时请求启用重试机制
  MaxAutoRetriesNextServer: 1 #切换重试实例的最大个数
  MaxAutoRetries: 1 # 切换实例后重试最大次数
  NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule #修改负载均衡算法
```

#### 指定服务配置

区别在于ribbon节点挂在服务名称下面，如配置ribbon调用user-service时的单独配置。

```yaml
user-service:
  ribbon:
    ConnectTimeout: 1000 #服务请求连接超时时间（毫秒）
    ReadTimeout: 3000 #服务请求处理超时时间（毫秒）
    OkToRetryOnAllOperations: true #对超时请求启用重试机制
    MaxAutoRetriesNextServer: 1 #切换重试实例的最大个数
    MaxAutoRetries: 1 # 切换实例后重试最大次数
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule #修改负载均衡算法
```



### 负载均衡策略/算法

> 所谓的负载均衡策略，就是当A服务调用B服务时，此时B服务有多个实例，这时A服务以何种方式来选择调用的B实例，ribbon可以选择以下几种负载均衡策略：

- com.netflix.loadbalancer.**RoundRobinRule**：以线性**轮询**的方式，就是维护一个计数器，从提供服务的实例中按顺序选取，第一次选第一个，第二次选第二个，以此类推，到最后一个以后再从头来过；
- com.netflix.loadbalancer.**RandomRule**：从提供服务的实例中以**随机**的方式；
- com.netflix.loadbalancer.**RetryRule**：在RoundRobinRule的基础上添加**重试**机制，即在指定的重试时间内，反复使用线性轮询策略来选择可用实例；
- om.netflix.loadbalancer.**WeightedResponseTimeRule**：对RoundRobinRule的扩展，响应速度越快的实例选择**权重**越大，越容易被选择；
- com.netflix.loadbalancer.**BestAvailableRule**：选择一个**并发量最小**的服务
- com.netflix.loadbalancer.**AvailabilityFilteringRule**：先**过滤**掉故障实例，在选择并发较小的实例
- com.netflix.loadbalancer.**ZoneAwareLoadBalancer**：默认规则，采用双重过滤，同时过滤不是同一区域的实例和故障实例，选择并发较小的实例。



### 核心组件IRule

Ribbon默认是使用轮询作为负载均衡算法

IRule根据特定算法从服务列表中选取一个要访问的服务，IRule是一个接口：

```java
public interface IRule {
    Server choose(Object var1);

    void setLoadBalancer(ILoadBalancer var1);

    ILoadBalancer getLoadBalancer();
}
```

其特定实现类，对应不同的负载均衡算法：

![image-20200408111538902](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200408111538902.png)



## Spring Cloud Gateway：API网关服务

Spring Cloud Gateway为 SpringBoot 应用提供了API网关支持，具有强大的智能路由与过滤器功能

### 简介

Gateway是在Spring生态系统之上构建的API网关服务，基于Spring 5，Spring Boot 2和 Project Reactor等技术。Gateway旨在提供一种简单而有效的方式来对API进行路由，以及提供一些强大的过滤器功能， 例如：熔断、限流、重试等。

Spring Cloud Gateway 具有如下特性：

- 基于Spring Framework 5, Project Reactor 和 Spring Boot 2.0 进行构建；
- 动态路由：能够匹配任何请求属性；
- 可以对路由指定 Predicate（断言）和 Filter（过滤器）；
- 集成Hystrix的断路器功能；
- 集成 Spring Cloud 服务发现功能；
- 易于编写的 Predicate（断言）和 Filter（过滤器）；
- 请求限流功能；
- 支持路径重写。



### 相关概念

#### 路由（Route）

路由是构建网关的基本模块，由ID，目标URI，一系列断言和过滤器组成。如果断言为true则匹配该路由。

#### 断言（Predicate）

指的是Java8的Function Predicate，输入类型是Spring框架中的ServerWebExchange。使得开发人员可以匹配Http请求中的所有内容，如请求头或请求参数。如果请求与断言匹配，则进行路由。

#### 过滤器（Filter）

指的是Spring框架的GatewayFilter实例，使用过滤器，可以在请求呗路由前后对请求进行修改。



### 依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```



### 配置路由

#### yml方式

- 在application.yml配置

  ```yaml
  server:
    port: 9201
  service-url:
    user-service: http://localhost:8201
  spring:
    cloud:
      gateway:
        routes:
          - id: path_route #路由的ID
            uri: ${service-url.user-service}/user/{id} #匹配后路由地址
            predicates: # 断言，路径相匹配的进行路由
              - Path=/user/{id}
  ```



### 断言Predicate使用

 Spring Cloud Gateway包括许多内置的Route Predicate工厂， 所有这些Predicate都与HTTP请求的不同属性匹配，多个Route Predicate工厂可以进行组合。



#### After：指定时间后

指定时间后的请求会匹配该路由。

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: after_route
          uri: ${service-url.user-service}
          predicates:
            - After=2019-09-24T16:30:00+08:00[Asia/Shanghai]
```

#### Before：指定时间前

指定时间前的请求会匹配该路由

```yaml
predicates:
- Before=2019-09-24T16:30:00+08:00[Asia/Shanghai]
```

#### Between：指定时间内

在指定时间区间内的请求会匹配该路由。

```yaml
predicates:
- Between=2019-09-24T16:30:00+08:00[Asia/Shanghai], 2019-09-25T16:30:00+08:00[Asia/Shanghai]
```

#### Cookie：指定cookie

带有指定cookie的请求会匹配路由

```yaml
predicates:
- Cookie=username,macro
```

含义是cookie带有`username=macro`的请求可以匹配路由。

```sh
curl http://localhost:9201/user/1 --cookie "username=macro"
```

#### Header：指定请求头

带有指定请求头的请求会匹配该路由。

```yaml
predicates:
- Header=X-Request-Id, \d+
```

含义是请求头包含`X-Request-Id`的可以匹配路由。

```sh
curl http://localhost:9201/user/1 -H "X-Request-Id:123" 
```

#### Host：指定请求头Host

Header带有指定Host的可以匹配该路由

```yaml
predicates:
- Host=**.macrozheng.com
```

请求头包含`Host:www.macrozheng.com`的可以匹配该路由。

```sh
curl http://localhost:9201/user/1 -H "Host:www.macrozheng.com" 
```

#### Method：指定请求方式

指定请求方式的请求可以匹配路由

```yaml
predicates:
- Method=GET
```

Get请求可以匹配该路由。

#### Path：指定路径

指定路径的请求可以匹配该路由

```yaml
predicates:
- Path=/user/{id}
```

含义就是路径为/user/**的可以匹配该路由

#### Query：指定请求参数

带指定查询参数的请求可以匹配该路由。

```yaml
predicates:
- Query=username
```

带有查询参数`username=xxx`的请求可以匹配路由

```sh
curl http://localhost:9201/user/getByUsername?username=macro
```

#### RemoteAddr：指定ip

```yaml
predicates:
- RemoteAddr=192.168.1.1/24
```

从特定ip`192.168.1.1`发出的请求可以匹配路由。

#### Weight：指定权重

使用权重来路由相应请求，以下表示有80%的请求会被路由到localhost:8201，20%会被路由到localhost:8202。

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: weight_high
        uri: http://localhost:8201
        predicates:
        - Weight=group1, 8
      - id: weight_low
        uri: http://localhost:8202
        predicates:
        - Weight=group1, 2
```



### 过滤器Filter使用

路由过滤器可用于修改进入的HTTP请求和返回的HTTP响应，路由过滤器只能指定路由进行使用。Spring Cloud Gateway 内置了多种路由过滤器，他们都由GatewayFilter的工厂类来产生。

#### AddRequestParameter：添加请求参数

给请求添加参数过滤器

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: add_request_parameter_route
          uri: http://localhost:8201
          filters:
            - AddRequestParameter=username, macro
          predicates:
            - Method=GET
```

含义就是，会给Get请求添加`username=macro`参数

#### StripPrefix：去除前缀

对指定数量的路径前缀进行去除的过滤器。

```yaml
predicates:
- Path=/user-service/**
filters:
- StripPrefix=2
```

比如上述配置就是，通过断言匹配到前缀为/user-service的请求，再通过Filter在去掉1层前缀。

如/user-service/user/get/1就会变为/user/get/1。

#### PrefixPath：增加前缀

与StripPrefix过滤器恰好相反，会对原有路径进行增加操作的过滤器。

```yaml
filters:
- PrefixPath=/user
```

含义就是对特定请求增加一个/user前缀，比如/get/1相当于/user/get/1

#### Hystrix：增加断路器

Hystrix 过滤器允许你将断路器功能添加到网关路由中，使你的服务免受级联故障的影响，并提供服务降级处理。

- 添加Hystrix的相关依赖

  ```xml
  <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
  </dependency>
  ```

- 添加相关服务降级的处理类

  ```java
  @RestController
  public class FallbackController {
  
      @GetMapping("/fallback")
      public Object fallback() {
          Map<String,Object> result = new HashMap<>();
          result.put("data",null);
          result.put("message","Get request fallback!");
          result.put("code",500);
          return result;
      }
  }
  ```

- 在application-filter.yml中添加相关配置，当路由出错时会转发到服务降级处理的控制器上

  ```yaml
  spring:
    cloud:
      gateway:
        routes:
          - id: hystrix_route
            uri: http://localhost:8201
            predicates:
              - Method=GET
            filters:
              - name: Hystrix
                args:
                  name: fallbackcmd
                  fallbackUri: forward:/fallback
  ```

- 这个时候在匹配到对应路由，而服务又不可用时，就会匹配到服务降级的处理接口。



#### RequestRateLimiter：增加服务限流

RequestRateLimiter 过滤器可以用于限流，使用RateLimiter实现来确定是否允许当前请求继续进行，如果请求太大默认会返回HTTP 429-太多请求状态。

- 使用Redis进行限流，添加依赖

  ```xml
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-redis-reactive</artifactId>
  </dependency>
  ```

- 添加限流策略的配置类，这里有两种策略:

  - 一种是根据请求参数中的username进行限流；
  - 另一种是根据访问IP进行限流；

  ```java
  @Configuration
  public class RedisRateLimiterConfig {
      //	请求参数限流
      @Bean
      KeyResolver userKeyResolver() {
          return exchange -> Mono.just(exchange.getRequest().getQueryParams().getFirst("username"));
      }
  	//	ip限流
      @Bean
      public KeyResolver ipKeyResolver() {
          return exchange -> Mono.just(exchange.getRequest().getRemoteAddress().getHostName());
      }
  }
  ```

- 这里对Get请求进行ip限流，配置application.yml

  ```yaml
  server:
    port: 9201
  spring:
    redis:
      host: localhost
      password: 123456
      port: 6379
    cloud:
      gateway:
        routes:
          - id: requestratelimiter_route
            uri: http://localhost:8201
            filters:
              - name: RequestRateLimiter
                args:
                  redis-rate-limiter.replenishRate: 1 #每秒允许处理的请求数量
                  redis-rate-limiter.burstCapacity: 2 #每秒最大处理的请求数量
                  key-resolver: "#{@ipKeyResolver}" #限流策略，对应策略的Bean
            predicates:
              - Method=GET
  logging:
    level:
      org.springframework.cloud.gateway: debug
  ```

- 达到限流条件，会返回状态码429

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/springcloud_gateway_04.7e7fa971.png)

#### Retry：路由重试

对路由请求进行重试的过滤器，可以根据路由请求返回的**HTTP状态码**来确定是否进行重试。

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: retry_route
        uri: http://localhost:8201
        predicates:
        - Method=GET
        filters:
        - name: Retry
          args:
            retries: 1 #需要进行重试的次数
            statuses: BAD_GATEWAY #返回哪个状态码需要进行重试，返回状态码为5XX进行重试
            backoff:
              firstBackoff: 10ms
              maxBackoff: 50ms
              factor: 2
              basedOnPreviousValue: false
```

此时调用返回5XX会进行重试。



### 结合注册中心

#### Eureka

- 引入依赖

  ```xml
  <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
  </dependency>
  ```

- gateway配置文件

  ```yaml
  server:
    port: 9201
  spring:
    application:
      name: api-gateway
    cloud:
      gateway:
        discovery:
          locator:
            enabled: true #开启从注册中心动态创建路由的功能
            lower-case-service-id: true #使用小写服务名，默认是大写
  eureka:
    client:
      service-url:
        defaultZone: http://localhost:8001/eureka/ # 注册到eureka注册中心
  logging:
    level:
      org.springframework.cloud.gateway: debug
  ```

- 结合注册中心使用过滤器时，uri的协议为lb://，这样才能启用gateway的负载均衡

  ```yaml
  routes:
      - id: mogu_admin
          # 采用 LoadBalanceClient 方式请求，以 lb:// 开头，后面的是注册在 Nacos 上的服务名
        uri: lb://mogu-admin
          # Predicate 翻译过来是“谓词”的意思，必须，主要作用是匹配用户的请求，有很多种用法
        predicates:
          # 路径匹配，以 api 开头，直接配置是不生效的，看 filters 配置
          - Path=/mogu-admin/**
  ```



#### Nacos

- 引入依赖

  ```xml
  <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
      <version>${latest.version}</version>
  </dependency>
  ```

- 配置服务提供者

  ```yaml
  server:
    port: 8607
  spring:
    application:
      name: mogu-gateway
    cloud:
      nacos:
        # 服务发现 网关注册到Nacos
        discovery:
          server-addr: localhost:8848
  ```

- 启动类开启注解`@EnableDiscoveryClient`提供服务注册发现功能

  ```java
  @SpringBootApplication
  @EnableDiscoveryClient
  public class NacosProviderApplication {
  
  	public static void main(String[] args) {
  		SpringApplication.run(NacosProviderApplication.class, args);
  	}
  
  	@RestController
  	class EchoController {
  		@RequestMapping(value = "/echo/{string}", method = RequestMethod.GET)
  		public String echo(@PathVariable String string) {
  			return "Hello Nacos Discovery " + string;
  		}
  	}
  }
  ```

- 其他配置同理



# Spring Cloud Alibaba



## Nacos：注册中心与配置中心



### 特性

Nacos 具有如下特性:

- 服务发现和服务健康监测：支持基于DNS和基于RPC的服务发现，支持对服务的实时的健康检查，阻止向不健康的主机或服务实例发送请求；
- 动态配置服务：动态配置服务可以让您以中心化、外部化和动态化的方式管理所有环境的应用配置和服务配置；
- 动态 DNS 服务：动态 DNS 服务支持权重路由，让您更容易地实现中间层负载均衡、更灵活的路由策略、流量控制以及数据中心内网的简单DNS解析服务；
- 服务及其元数据管理：支持从微服务平台建设的视角管理数据中心的所有服务及元数据。



### 安装

暂略，在个人博客搭建中已记录。



### 作为注册中心

#### 创建应用注册到Nacos

- 引入Spring Cloud Alibaba依赖

  ```xml
  <dependencyManagement>
      <dependencies>
          <dependency>
              <groupId>com.alibaba.cloud</groupId>
              <artifactId>spring-cloud-alibaba-dependencies</artifactId>
              <version>2.1.0.RELEASE</version>
              <type>pom</type>
              <scope>import</scope>
          </dependency>
      </dependencies>
  </dependencyManagement>
  ```

- 注册发现改用nacos

  ```xml
  <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
  </dependency>
  ```

- 修改配置文件，配置注册项

  ```yaml
  server:
    port: 8206
  spring:
    application:
      name: nacos-user-service
    cloud:
      nacos:
        discovery:
          server-addr: localhost:8848 #配置Nacos地址
  management:
    endpoints:
      web:
        exposure:
          include: '*'
  ```



#### 负载均衡功能



### 作为配置中心

#### 配置获取配置内容

- 添加依赖

  ```xml
  <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
  </dependency>
  <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
  </dependency>
  ```

- 修改配置文件

  ```yaml
  server:
    port: 9101
  spring:
    application:
      name: nacos-config-client
    cloud:
      nacos:
        discovery: # 服务注册配置
          server-addr: localhost:8848 #Nacos地址
        config: # 配置中心配置
          server-addr: localhost:8848 #Nacos地址
          file-extension: yaml #这里我们获取的yaml格式的配置
  ```

- 创建ConfigClientController，从Nacos配置中心中获取配置信息

  ```java
  @RestController
  @RefreshScope
  public class ConfigClientController {
  
      @Value("${config.info}")
      private String configInfo;
  
      @GetMapping("/configInfo")
      public String getConfigInfo() {
          return configInfo;
      }
  }
  ```



#### Nacos中dataid与SpringBoot配置文件属性对应关系

```sh
${spring.application.name}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}
```

如要获取

- 应用名 nacos-config-client
- 环境dev
- yaml配置文件

则dataid为：`nacos-config-client-dev.yaml`

然后在配置文件中配置：

```yaml
spring:
  profiles:
    active: dev
```

则此时可以获取Nacos中dataid为`nacos-config-client-dev.yaml`的配置内容

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/spingcloud_nacos_03.0a4dfd74.png)



### 动态刷新配置

Nacos和Consul一样都支持动态刷新配置，当我们在Nacos页面上修改配置并发布后，应用会刷新配置并打印信息。







# MyBatis



## PageHelper-分页查询





## 通用Mapper

使用MyBatis需要书写大量sql到xml文件，除开特殊的业务逻辑sql外，还有大量结构类似的增删改查，但随着数据库结构的改动，对应实体类和sql都要修改，工作量与效率的差距会体现出来。

[参考1](https://gitee.com/free/Mapper)  [wiki](https://github.com/abel533/Mapper/wiki)   [参考2](https://mapperhelper.github.io/docs/)



### 作用

基于MyBatis的插件，解决单表增删改查，开发人员不需要编写sql，不需要在DAO增加方法，写好实体类就能支持相应的增删改查方法。



### 使用

#### 实体类写法

- 实体类所有字段都会作为表中字段操作，实体类字段数>=数据库表字段数，额外字段添加`@Transient`注解
- 表名默认使用类名，驼峰转下划线，如`UserInfo`对应的表名为`user_info`
- 对于不符合上条规律的，表名可以使用`@Table(name = "tableName")`进行指定
- 字段默认均为表字段（除了简单类型），默认驼峰转下划线，可以使用`@Column(name = "fieldName")`进行指定
- `@Id`指定作为主键的字段，自增主键使用`@KeySql(useGeneratedKeys = true)`，每个实体类至少一个
- Mysql自增字段使用`@GeneratedValue(generator = "JDBC")`

```java
@Table(name = "test_table")
public class TestTableVO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "JDBC")
    private Long id;

    @Transient
    private String userId;

    private String name;

    private Timestamp createTime;

    private String createUserId;

    private Timestamp updateTime;

    private String updateUserId;

    private Integer isDelete;
    
    // 省略get、set...
    
}
```

> - 新增的`@KeySql` 注解用于替换 `@GeneratedValue` 注解，因此 `@KeySql` 能以更简单方式实现原来的功能：
>   - Mysql和SqlServer下自增主键策略`@KeySql(useGeneratedKeys = true)`与`@GeneratedValue(generator = "JDBC")`两者等价
>   - SqlServer 中使用时，需要设置 id 的 `insertable=false`

#### DAO写法

在传统的Mybatis写法中，DAO 接口需要与 Mapper 文件关联，即需要编写 SQL 来实现 DAO 接口中的方法。而在通用Mapper 中，DAO 只需要继承一个通用接口，即可拥有丰富的方法。

```java
//指定泛型为实体类
public interface TestTableDao extends Mapper<TestTableVO> {
}
```

继承的通用方法见 [通用方法](#通用方法)

**添加自定义方法**

注解方式：

```java
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

public interface CountryMapper extends Mapper<Country> {
    @Select("select * from country where countryname = #{countryname}")
    Country selectByCountryName(String countryname);
}
```

XML配置：

```xml
<!-- 在对应***Mapper.xml文件中 -->
<mapper namespace="tk.mybatis.sample.mapper.CountryMapper">
    <select id="selectByCountryName" resultType="tk.mybatis.model.Country">
        select * from country where countryname = #{countryname}
    </select>
</mapper>
```

> 自定义方法不能与通用方法同名。



#### SSM集成

[参考](https://github.com/abel533/Mapper/wiki/1.2-spring)

**Maven依赖**

```xml
<!--mybatis-->
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>版本号</version>
</dependency>
<!-- 通用Mapper -->
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper</artifactId>
    <version>版本号</version>
</dependency>
```

> - 版本号查询：http://mvnrepository.com/artifact/org.mybatis/mybatis
> - 通用 Mapper 版本号查询：http://mvnrepository.com/artifact/tk.mybatis/mapper



**XML配置**

使用`tk.mybatis.spring.mapper.MapperScannerConfigurer`替换原来Mybatis的`org.mybatis.spring.mapper.MapperScannerConfigurer`

```xml
<!-- 通用 Mapper -->
<bean class="tk.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="com.***.mapper"/>
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
    <property name="properties">
        <value>
            参数名=值
            参数名2=值2
            ...
        </value>
    </property>
</bean>
```





**注解配置**

使用`@MapperScan`注解，并确认所属包为`tk.mybatis.spring.annotation.MapperScan`而非官方包。

```java
//properties 一行一个配置
@Configuration
@MapperScan(value = "tk.mybatis.mapper.annotation",
    properties = {
            "mappers=tk.mybatis.mapper.common.Mapper",
            "notEmpty=true"
    }
)
public class MyBatisConfigProperties {}

//mapperHelperRef 直接配置一个bean，优先级更高，二选一即可
@Configuration
@MapperScan(value = "tk.mybatis.mapper.annotation", mapperHelperRef = "mapperHelper")
public static class MyBatisConfigRef {
    //其他
 
    @Bean
    public MapperHelper mapperHelper() {
        Config config = new Config();
        List<Class> mappers = new ArrayList<Class>();
        mappers.add(Mapper.class);
        config.setMappers(mappers);

        MapperHelper mapperHelper = new MapperHelper();
        mapperHelper.setConfig(config);
        return mapperHelper;
    }
}

//这种配官方/tk均可
@Configuration
@MapperScan(value = "tk.mybatis.mapper.annotation")
public static class MyBatisConfigRef {

    @Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());
        //tk.mybatis.mapper.session.Configuration
        Configuration configuration = new Configuration();
        //可以对 MapperHelper 进行配置后 set
        configuration.setMapperHelper(new MapperHelper());
        //设置为 tk 提供的 Configuration
        sessionFactory.setConfiguration(configuration);
        return sessionFactory.getObject();
    }
}
```



#### SpringBoot集成

**Maven依赖**

```xml
<!--mybatis-->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>1.3.1</version>
</dependency>
<!--mapper-->
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper-spring-boot-starter</artifactId>
    <version>版本号</version>
</dependency>
```

> - 版本号：http://mvnrepository.com/artifact/tk.mybatis/mapper-spring-boot-starter 

**application.yml配置**

```yaml
mapper:
	mappers: 
		- tk.mybatis.mapper.common.Mapper
		- tk.mybatis.mapper.common.Mapper2
	not-empty: false
	identity: MYSQL
```

##### `@MapperScan` 注解配置

如果没有使用 `@MapperScan` 注解，则需要为接口添加`@Mapper`注解。

而`@MapperScan`添加在`@Configuration`的类上，或者SpringBoot启动类上：

```java
//这里使用的 tk.mybatis.spring.annotation.MapperScan 
@tk.mybatis.spring.annotation.MapperScan(basePackages = "扫描包")
@SpringBootApplication
public class SampleMapperApplication implements CommandLineRunner {}
```



### 通用方法

##### Select

| 方法                                | 说明                               |
| :---------------------------------- | ---------------------------------- |
| `List<T> select(T record);`         | 根据实体属性值查询，等于条件       |
| `T selectByPrimaryKey(Object key);` | 根据主键字段查询                   |
| `List<T> selectAll();`              | 查询全部结果                       |
| `T selectOne(T record);`            | 根据实体属性值查询，只有一个返回值 |
| `int selectCount(T record);`        | 根据实体属性值查询总数             |

```java
TestTableVO vo = new TestTableVO();
vo.setId(123L);
TestTableVO result = testTableDao.selectOne(vo);
```



##### Insert

| 方法                             | 说明                                             |
| -------------------------------- | ------------------------------------------------ |
| `int insert(T record);`          | 保存一个实体，保存null属性（不使用数据库默认值） |
| `int insertSelective(T record);` | 保存一个实体，null属性使用数据库默认值           |

```java
TestTableVO vo = new TestTableVO();
// 省略为vo设置属性...
int row = testTableDao.insertSelective(vo);
```



##### Delete

| 方法                                  | 说明                           |
| ------------------------------------- | ------------------------------ |
| `int delete(T record);`               | 根据实体属性进行删除，等于条件 |
| `int deleteByPrimaryKey(Object key);` | 根据主键字段进行删除           |

```java
TestTableVO vo = new TestTableVO();
// 省略为vo设置属性...
int row = testTableDao.delete(vo);
```



##### Update

| 方法                                         | 说明                             |
| -------------------------------------------- | -------------------------------- |
| `int updateByPrimaryKey(T record);`          | 根据主键更新全部字段，包括null值 |
| `int updateByPrimaryKeySelective(T record);` | 根据主键更新不为null的字段       |

```java
TestTableVO vo = new TestTableVO();
// 省略为vo设置属性...
int row = testTableDao.updateByPrimaryKeySelective(vo);
```



##### Example

| 方法                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `List<T> selectByExample(Object example);`                   | 根据Example条件进行查询                                      |
| `int selectCountByExample(Object example);`                  | 根据Example条件进行查询总数                                  |
| `int updateByExample(@Param("record") T record, @Param("example") Object example);` | 根据Example条件更新实体`record`包含的全部属性，null值会被更新 |
| `int updateByExampleSelective(@Param("record") T record, @Param("example") Object example);` | 根据Example条件更新实体`record`包含的不是null的属性值        |
| `int deleteByExample(Object example);`                       | 根据Example条件删除数据                                      |

```java
//条件查询
// 创建Example
Example example = new Example(TestTableVO.class);
// 创建Criteria
Example.Criteria criteria = example.createCriteria();
// 添加条件
criteria.andEqualTo("isDelete", 0);
criteria.andLike("name", "%abc123%");
List<TestTableVO> list = testTableDao.selectByExample(example);
```



### Example用法

使用Example的方法有两大类，一个参数/两个参数，如：

```java
List<T> selectByExample(Object example);

int updateByExampleSelective(@Param("record") T record, @Param("example") Object example);
```



#### 通用Example

由Mapper提供，需要手动设置属性名，并提供额外方法。

##### 查询

```java
Example example = new Example(Country.class);
example.setForUpdate(true);
example.createCriteria().andGreaterThan("id", 100).andLessThan("id",151);
example.or().andLessThan("id", 41);
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT id,countryname,countrycode FROM country WHERE ( id > ? and id < ? ) or ( id < ? ) ORDER BY id desc FOR UPDATE 
```



##### 动态SQL

```java
Example example = new Example(Country.class);
Example.Criteria criteria = example.createCriteria();
if(query.getCountryname() != null){
    criteria.andLike("countryname", query.getCountryname() + "%");
}
if(query.getId() != null){
    criteria.andGreaterThan("id", query.getId());
}
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT id,countryname,countrycode FROM country WHERE ( countryname like ? ) ORDER BY id desc 
-- 参数?为China%
```



##### 排序

```java
Example example = new Example(Country.class);
example.orderBy("id").desc().orderBy("countryname").orderBy("countrycode").asc();
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT id,countryname,countrycode FROM country order by id DESC,countryname,countrycode ASC 
```



##### 去重

```java
CountryExample example = new CountryExample();
//设置 distinct
example.setDistinct(true);
example.createCriteria().andCountrynameLike("A%");
example.or().andIdGreaterThan(100);
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT distinct id,countryname,countrycode FROM country WHERE ( countryname like ? ) or ( Id > ? ) ORDER BY id desc 
-- 参数为A%和100
```



##### 查询

```java
Example example = new Example(Country.class);
example.selectProperties("id", "countryname");
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT id , countryname FROM country ORDER BY id desc 
```



#### Example.builder方式

```java
Example example = Example.builder(Country.class)
        .select("countryname")
        .where(Sqls.custom().andGreaterThan("id", 100))
        .orderByAsc("countrycode")
        .forUpdate()
        .build();
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT countryname FROM country WHERE ( id > ? ) order by countrycode Asc FOR UPDATE
```







## Mybatis Generator(MBG)

[参考](http://mybatis.org/generator/)   [中文文档](http://docs.flycloud.me/docs/MBG/index.html)

MyBatis官方提供的代码生成器



### MBG配置

- **Maven依赖** 

  ```xml
  <!-- https://mvnrepository.com/artifact/org.mybatis.generator/mybatis-generator-core -->
  <dependency>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-core</artifactId>
      <version></version>
  </dependency>
  
  <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
  <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version></version>
  </dependency>
  ```

- **resource目录下的generator.properties**

  ```properties
  jdbc.driver=com.mysql.jdbc.Driver
  jdbc.url=jdbc:mysql://8.136.120.34:3306/st-mall?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
  jdbc.username=root
  jdbc.password=123456
  ```

- **resource目录下的generatorConfig.xml**

  [配置参考](https://my.oschina.net/u/2474629/blog/840471)

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE generatorConfiguration
          PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
          "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
  <generatorConfiguration>
      <!-- 引入数据库连接配置 -->
      <properties resource="generator.properties"/>
      <!-- defaultModelType设为flat，即一张表只生成一个实体类 -->
      <context id="MySqlContext" targetRuntime="MyBatis3" defaultModelType="flat">
          <property name="beginningDelimiter" value="`"/>
          <property name="endingDelimiter" value="`"/>
          <!-- 生成的Java文件的编码-->
      	<property name="javaFileEncoding" value="UTF-8"/>
          <!-- 为生成的Java模型创建一个toString方法 -->
          <plugin type="org.mybatis.generator.plugins.ToStringPlugin" />
          <!-- 为模型生成序列化方法-->
          <plugin type="org.mybatis.generator.plugins.SerializablePlugin" />
          <!--生成mapper.xml时覆盖原文件 1.3.7后可用-->
  		<plugin type="org.mybatis.generator.plugins.UnmergeableXmlMappersPlugin" />
          <!-- 自定义的注释规则，继承 DefaultCommentGenerator 重写 一些方法 -->
          <commentGenerator type="com.st.tiny1.mbg.CommentGenerator">
              <!-- 是否去除自动生成日期的注释 true：是  避免重复提交 -->
              <property name="suppressDate" value="true"/>
              <!-- 是否去除所有自动生成的注释 true：是 ： false:否 -->
              <property name="suppressAllComments" value="true"/>
              <!-- 自定义插件 -->
              <property name="addRemarkComments" value="true"/>
          </commentGenerator>
          <jdbcConnection driverClass="${jdbc.driver}" connectionURL="${jdbc.url}"
                          userId="${jdbc.username}"
                          password="${jdbc.password}">
              <!--解决表注释无法获取的问题 -->
              <property name="useInformationSchema" value="true" /> 
              <!--解决mysql驱动升级到8.0后不生成指定数据库代码的问题-->
  			<property name="nullCatalogMeansCurrent" value="true" />
          </jdbcConnection>
          <!-- 默认false，把JDBC DECIMAL 和 NUMERIC 类型按长度解析为不同类型，为 true时把JDBC DECIMAL 和 
              NUMERIC 类型稳定解析为java.math.BigDecimal -->
          <!--
                  默认情况下的转换规则为：
                      如果精度>0或者长度>18，就会使用java.math.BigDecimal
                      如果精度=0并且10<=长度<=18，就会使用java.lang.Long
                      如果精度=0并且5<=长度<=9，就会使用java.lang.Integer
                      如果精度=0并且长度<5，就会使用java.lang.Short
          -->
          <javaTypeResolver>
  			<property name="forceBigDecimals" value="false" />
  		</javaTypeResolver>
          <!--生成entity类存放位置-->
          <javaModelGenerator targetPackage="包名（com.st.tiny1.mbg.model）" targetProject="项目地址到\java （tiny1\src\main\java）">
              <!-- 对数据库查询结果进行trim操作 -->
              <property name="trimStrings" value="true" />
              <!-- 针对 oracle 数据库的一个配置，是否把 schema 作为字包名 -->
              <property name="enableSubPackages" value="false" />
          </javaModelGenerator>
          <!--生成映射文件Mapper.xml存放位置-->
          <sqlMapGenerator targetPackage="包名（com.st.tiny1.mbg.mapper）" targetProject="项目地址到\resources （tiny1\src\main\resources）">
          </sqlMapGenerator>
          <!--生成Dao接口存放位置 type设为XML方便分离维护-->
          <javaClientGenerator type="XMLMAPPER" targetPackage="包名（om.st.tiny1.mbg.mapper）"
                               targetProject="项目地址到\java （tiny1\src\main\java）">
          </javaClientGenerator>
          <!--指定数据库表，%为生成全部表-->
  		<table tableName="%">
              <!-- 自动生成主键策略，这里设为mysql的方式方便插入后获取主键id -->
  			<generatedKey column="id" sqlStatement="MySql" identity="true"/>
  		</table>
      </context>
  </generatorConfiguration>
  ```

- **自定义的注释配置类CommentGenerator**

  ```java
  package com.st.tiny1.mbg;
  
  import org.mybatis.generator.api.IntrospectedColumn;
  import org.mybatis.generator.api.IntrospectedTable;
  import org.mybatis.generator.api.dom.java.CompilationUnit;
  import org.mybatis.generator.api.dom.java.Field;
  import org.mybatis.generator.api.dom.java.FullyQualifiedJavaType;
  import org.mybatis.generator.api.dom.java.TopLevelClass;
  import org.mybatis.generator.internal.DefaultCommentGenerator;
  import org.mybatis.generator.internal.util.StringUtility;
  
  import java.util.Properties;
  
  /**
   * @program: st-mall
   * @description: 自定义注释生成
   * @author: Pix
   * @create: 2021-02-18 16:21
   */
  public class CommentGenerator extends DefaultCommentGenerator {
  
  	private boolean addRemarkComments = false;
  	private static final String EXAMPLE_SUFFIX = "Example";
  	private static final String API_MODEL_PROPERTY_FULL_CLASS_NAME = "io.swagger.annotations.ApiModelProperty";
  	private static final String LINE_SEPARATOR = System.getProperty("line.separator");
  
  
  	/**
  	 * 设置用户配置的参数
  	 */
  	@Override
  	public void addConfigurationProperties(Properties properties) {
  		super.addConfigurationProperties(properties);
  		this.addRemarkComments = StringUtility.isTrue(properties.getProperty("addRemarkComments"));
  	}
  
  	/**
  	 * 实体类注释
  	 */
  	@Override
  	public void addModelClassComment(TopLevelClass topLevelClass, IntrospectedTable introspectedTable) {
  		if (addRemarkComments) {
  			topLevelClass.addJavaDocLine("/**");
  			topLevelClass.addJavaDocLine(" * 这是MyBatis Generator自动生成的Model Class.");
  
  			StringBuilder sb = new StringBuilder();
  			sb.append(" * @Title ");
  			sb.append(introspectedTable.getFullyQualifiedTable());
  			sb.append("表的实体类");
  			topLevelClass.addJavaDocLine(sb.toString().replace(LINE_SEPARATOR, " "));
  			String tableRemarks = introspectedTable.getRemarks();
  			if (StringUtility.stringHasValue(tableRemarks)) {
  				sb.setLength(0);
  				sb.append(" * @Description ");
  				sb.append(introspectedTable.getRemarks());
  				topLevelClass.addJavaDocLine(sb.toString());
  			}
  			//topLevelClass.addJavaDocLine(" * @Author "+System.getProperties().getProperty("user.name").toString());
  			//topLevelClass.addJavaDocLine(" * @Date "+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
  			topLevelClass.addJavaDocLine(" */");
  		}
  	}
  
  	/**
  	 * 实体类字段注释
  	 */
  	public void addFieldComment(Field field, IntrospectedTable introspectedTable,
  								IntrospectedColumn introspectedColumn) {
  		String remarks = introspectedColumn.getRemarks();
  		if (addRemarkComments && StringUtility.stringHasValue(remarks)) {
  
  			addFieldJavaDoc(field, remarks);
  			//数据库中特殊字符需要转义 防止添加注解时格式出错
  			if (remarks.contains("\"")) {
  				remarks = remarks.replace("\"", "'");
  			}
  			//给model的字段添加swagger注解
  			//field.addJavaDocLine("@ApiModelProperty(value = \"" + remarks + "\")");
  		}
  
  	}
  
  	/**
  	 * 给model的字段添加注释
  	 */
  	private void addFieldJavaDoc(Field field, String remarks) {
  		if (addRemarkComments) {
  			field.addJavaDocLine("/**");
  			StringBuilder sb = new StringBuilder();
  			sb.append(" * @Fields ");
  			sb.append(field.getName());
  			sb.append(" ");
  			//获取数据库字段的备注信息
  			sb.append(remarks);
  			field.addJavaDocLine(sb.toString().replace(LINE_SEPARATOR, " "));
  			//添加一个插件生成的标志 @mbg.generated
  			//addJavadocTag(field, false);
  			field.addJavaDocLine(" */");
  		}
  	}
  
  
  	/**
  	 *    java文件加注释
  	 */
  	@Override
  	public void addJavaFileComment(CompilationUnit compilationUnit) {
  		super.addJavaFileComment(compilationUnit);
  		//在实体类中添加swagger注解类的导入，不用swagger注解就不用
  		/*if (!compilationUnit.isJavaInterface() && !compilationUnit.getType().getFullyQualifiedName().contains(EXAMPLE_SUFFIX)) {
  			compilationUnit.addImportedType(new FullyQualifiedJavaType(API_MODEL_PROPERTY_FULL_CLASS_NAME));
  		}*/
  	}
  }
  ```

  > - 如果类注释里的表注释没有生成（`@Description`部分），可修改 `generatorConfig.xml`文件`<jdbcConnection>`属性
  >
  >   ```xml
  >   <jdbcConnection driverClass="com.mysql.jdbc.Driver" connectionURL="jdbc:mysql://127.0.0.1:3306/thirties" userId="thirties" password="password">
  >   <!-- 新增下面这个属性-->
  >           <property name="useInformationSchema" value="true" /> 
  >   </jdbcConnection>  
  >   ```
  >
  >   已经在之前的配置文件中写好。
  >
  >   或者直接在url地址加上`useInformationSchema=true`
  >
  > - 如果中文注释乱码，可以考虑数据库地址添加编码`useUnicode=true&characterEncoding=数据库编码`

### 生成

- **java程序生成**

  运行main方法

  ```java
  public class Generator {
  
      public static void main(String[] args) throws Exception{
          //MBG 执行过程中的警告信息
          List<String> warnings = new ArrayList<String>();
          //当生成的代码重复时，覆盖原代码
          boolean overwrite = true;
          //读取 MBG 配置文件
          InputStream configFile = Generator.class.getResourceAsStream("/generatorConfig.xml");
          ConfigurationParser cp = new ConfigurationParser(warnings);
          Configuration config = cp.parseConfiguration(configFile);
          DefaultShellCallback callback = new DefaultShellCallback(overwrite);
          //创建 MBG
          MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
          //执行生成代码
          myBatisGenerator.generate(null);
          //输出警告信息
          for (String warning : warnings) {
              System.out.println(warning);
          }
      }
  }
  ```

- **maven plugin插件生成**

  引入maven插件

  ```xml
  <build>
      ...
      <plugins>
          ...
          <plugin>
              <groupId>org.mybatis.generator</groupId>
              <artifactId>mybatis-generator-maven-plugin</artifactId>
              <version>1.3.0</version>
              <configuration>
                  <configurationFile>/src/.../generatorConfig.xml</configurationFile>
              </configuration>
          </plugin>
          ...
      </plugins>
      ...
  </build>
  ```

  在插件栏找到插件，运行generate

  <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210220215021172.png" alt="image-20210220215021172" style="zoom:50%;" />

  > - **问题一：generate failed: Exception getting JDBC Driver**
  >
  >   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210220223023228.png" alt="image-20210220223023228" style="zoom:50%;" />
  >
  >   原因：generatorConfig.xml没有配置`<classPathEntry location=""/>`即数据库包的位置
  >
  >   解决方式：
  >
  >   - generatorConfig.xml配置`<classPathEntry location=""/>`
  >
  >   - 或者在插件处为其添加专属依赖
  >
  >     ```xml
  >     <plugin>
  >         <groupId>org.mybatis.generator</groupId>
  >         <artifactId>mybatis-generator-maven-plugin</artifactId>
  >         <version>1.3.2</version>
  >         <configuration>
  >             <!--MyBaits-generator的配置文件generatorConfig.xml的位置-->
  >     		<configurationFile>${basedir}/src/main/resources/generatorConfig.xml
  >             </configurationFile>
  >             <!--是否覆盖同名文件（只是针对XML文件,java文件生成类似*.java.2形式的文件）-->
  >             <verbose>true</verbose>
  >             <!--是否将生成过程输出至控制台-->
  >             <overwrite>true</overwrite>
  >         </configuration>
  >         <dependencies>
  >             <dependency>
  >                 <groupId>mysql</groupId>
  >                 <artifactId>mysql-connector-java</artifactId>
  >                 <version>${mysql.version}</version>
  >             </dependency>
  >         </dependencies>
  >     </plugin>
  >     ```
  >
  > - **问题二：generate failed: Cannot instantiate object of type ...**
  >
  >   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210220231700808.png" alt="image-20210220231700808" style="zoom:50%;" />
  >
  >   原因：generatorConfig.xml中配置了自定义类（如注释配置类CommentGenerator），插件的classpath和项目的classpath不同，所以无法找到。
  >
  >   解决方式：
  >
  >   - 将自己写的配置类封装为jar包，保存在本地maven库，同上问题方法一样作为依赖引入
  >   - 或者采用手动生成，毕竟只要一有自定义配置类就要加入maven仓库，不值得。
  >
  > - **问题三：The specified target project directory ...\resources does not exist**
  >
  >   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210221003255319.png" alt="image-20210221003255319" style="zoom:50%;" />
  >
  >   原因：配置的文件生成路径插件无法找到，或者移动模块后无法找到
  >
  >   解决方式：
  >
  >   - 修改generatorConfig.xml中三个节点(`<javaModelGenerator><sqlMapGenerator><jacaClientGenerator>`)的`targetProject`属性为绝对路径。
  >   - 采用手动生成，`targetProject`均设为 `项目名\src\main\java或resources`



### 生成通用Mapper

[参考](https://mapperhelper.github.io/docs/3.usembg/)

想要生成的配置文件使用通用Mapper格式，需要额外配置。

- **引入Maven依赖**

  ```xml
  <!-- https://mvnrepository.com/artifact/org.mybatis.generator/mybatis-generator-core -->
  <dependency>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-core</artifactId>
      <version>1.3.6</version>
  </dependency>
  <!-- 通用 Mapper -->
  <!-- https://mvnrepository.com/artifact/tk.mybatis/mapper -->
  <dependency>
      <groupId>tk.mybatis</groupId>
      <artifactId>mapper</artifactId>
      <version>4.0.0</version>
  </dependency>
  <!-- 如果你只需要用到通用 Mapper 中的插件，可以只引入 mapper-generator -->
  <!-- 注意，这个包不需要和上面的 mapper 同时引入，mapper 中包含 generator -->
  <!-- https://mvnrepository.com/artifact/tk.mybatis/mapper-generator -->
  <dependency>
      <groupId>tk.mybatis</groupId>
      <artifactId>mapper-generator</artifactId>
      <version>1.0.0</version>
  </dependency>
  ```

- **Maven生成插件**

  也添加mapper的依赖

  ```xml
  <plugins>
    <plugin>
      <artifactId>maven-compiler-plugin</artifactId>
      <configuration>
        <source>${jdk.version}</source>
        <target>${jdk.version}</target>
      </configuration>
    </plugin>
    <plugin>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-maven-plugin</artifactId>
      <version>1.3.6</version>
      <configuration>
        <configurationFile>
          ${basedir}/src/main/resources/generator/generatorConfig.xml
        </configurationFile>
        <overwrite>true</overwrite>
        <verbose>true</verbose>
      </configuration>
      <dependencies>
        <dependency>
          <groupId>mysql</groupId>
          <artifactId>mysql-connector-java</artifactId>
          <version>5.1.29</version>
        </dependency>
        <dependency>
          <groupId>tk.mybatis</groupId>
          <artifactId>mapper</artifactId>
          <version>4.0.0</version>
        </dependency>
      </dependencies>
    </plugin>
  </plugins>
  ```

- **手动生成**

  ```java
  public static void main(String[] args) throws Exception {
      List<String> warnings = new ArrayList<String>();
      boolean overwrite = true;
      ConfigurationParser cp = new ConfigurationParser(warnings);
      Configuration config = 
          cp.parseConfiguration(getResourceAsStream("generatorConfig.xml"));
      DefaultShellCallback callback = new DefaultShellCallback(overwrite);
      MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
      myBatisGenerator.generate(null);
      for (String warning : warnings) {
          System.out.println(warning);
      }
  }
  ```

- **generatorConfig.xml配置**

  ```xml
  <!DOCTYPE generatorConfiguration
          PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
          "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
  
  <!--suppress MybatisGenerateCustomPluginInspection -->
  <generatorConfiguration>
      <context id="Mysql" targetRuntime="MyBatis3Simple" defaultModelType="flat">
          <property name="javaFileEncoding" value="UTF-8"/>
          <property name="useMapperCommentGenerator" value="false"/>
  
          <!-- 只是多了一个插件的配置 -->
          <plugin type="tk.mybatis.mapper.generator.MapperPlugin">
              <!-- 生成的接口都会继承配置的mappers接口,可以配自定义接口（继承Mapper） -->
              <property name="mappers" value="tk.mybatis.mapper.common.Mapper"/>
              <!-- 是否区分大小写，true是，会生成大写注解，默认false -->
              <property name="caseSensitive" value="true"/>
              <!-- 是否强制生成注解，包括 @Table @Column -->
              <property name="forceAnnotation" value="true"/>
              <property name="beginningDelimiter" value="`"/>
              <property name="endingDelimiter" value="`"/>
          </plugin>
  
          <jdbcConnection driverClass="org.hsqldb.jdbcDriver"
                          connectionURL="jdbc:hsqldb:mem:generator"
                          userId="sa"
                          password="">
          </jdbcConnection>
  
          <!--MyBatis 生成器只需要生成 Model-->
          <javaModelGenerator targetPackage="test.model" 
                              targetProject="generator/src/test/java"/>
  
          <table tableName="user_info">
              <generatedKey column="id" sqlStatement="JDBC"/>
          </table>
          <table tableName="country">
              <generatedKey column="id" sqlStatement="JDBC"/>
          </table>
      </context>
  </generatorConfiguration>
  ```

  > 参数补充：
  >
  > - **beginningDelimiter** 和 **endingDelimiter** 开始和结束分隔符，对于有关键字的情况下适用。
  > - **useMapperCommentGenerator** 是否使用通用 Mapper 提供的注释工具，默认 `true` 使用，这样在生成代码时会包含字段的注释（目前只有 mysql 和 oracle 支持），设置 `false` 后会用默认的，或者你可以配置自己的注释插件。
  > - **generateColumnConsts** 在生成的 model中，增加字段名的常量，便于使用 Example 拼接查询条件的时候使用。
  > - lombok 增加 model 代码生成时，可以直接生成 lombok 的 `@Getter@Setter@ToString@Accessors(chain = true)` 四类注解， 使用者在插件配置项中增加
  >   `<property name="lombok" value="Getter,Setter,ToString,Accessors"/>` 即可生成对应包含注解的 model 类。



# 消息队列



## RabbitMQ

RabbitMQ是一个被广泛使用的开源消息队列。它是轻量级且易于部署的，它能支持多种消息协议。RabbitMQ可以部署在分布式和联合配置中，以满足高规模、高可用性的需求。



### 安装

#### Win

- 安装环境Erlang，下载地址 http://erlang.org/download/otp_win64_21.3.exe

- 安装RabbitMQ，下载地址 https://dl.bintray.com/rabbitmq/all/rabbitmq-server/3.7.14/rabbitmq-server-3.7.14.exe

- 找到安装后的启动图标

  ![image-20220508185939599](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220508185939599.png)

  或者进入RabbitMQ安装目录下的sbin目录

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_55.cff0e57a.png)

  通过指令启动

  ```shell
  rabbitmq-plugins enable rabbitmq_management
  ```

- 访问地址：http://localhost:15672/

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_57.f0fc20b9.png)

### 配置操作

访问http://localhost:15672/ 进入rabbitMQ图形化界面

默认账号guest guest 进行登录

#### 创建用户

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_58.2d67e0fe.png)

> 通过tags设置角色

#### 创建虚拟host

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_59.6d1d4f9f.png)

#### 为用户分配host

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_61.f2470471.png)





### 与SpringBoot整合

#### 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

#### 配置文件

```yaml
spring:
    rabbitmq:
            host: localhost # rabbitmq的连接地址
            port: 5672 # rabbitmq的连接端口号
            virtual-host: /xxx # rabbitmq的虚拟host
            username: guest # rabbitmq的用户名
            password: guest # rabbitmq的密码 #如果对异步消息需要回调必须设置为true
            publisher-confirm-type: correlated  # 如果对异步消息需要回调必须设置
```

默认账号 guest guest

#### 





# 数据库



## 数据库设计范式

数据库设计对数据的存储性能，还有开发人员对数据的操作都有莫大的关系。所以建立科学的，规范的的数据库是需要满足一些规范的来优化数据数据存储方式。

在关系型数据库中这些规范就可以称为范式。



**三大范式**

- **第一范式**：当关系模式R的所有属性都不能再分解为更基本的数据单位时，称R是满足第一范式的，简记为1NF。

- **第二范式**：如果关系模式R满足第一范式，并且R得所有非主属性都完全依赖于R的每一个候选关键属性，称R满足第二范式，简记为2NF。

- **第三范式**：设R是一个满足第一范式条件的关系模式，X是R的任意属性集，如果X非传递依赖于R的任意一个候选关键字，称R满足第三范式，简记为3NF。



### 第一范式

- 每一列属性都是不可再分的属性值，确保每一列的原子性
- 两列的属性相近或相似或一样，尽量合并属性一样的列，确保不产生冗余数据。



### 第二范式

- 每一行的数据只能与其中一列相关，即一行数据只做一件事。只要数据列中出现数据重复，就要把表拆分开来。

  > 比如Order表（订单编号，房间号，联系人，电话）
  >
  > 一个人同时订几个房间，就会出现一个订单号多条数据（因为多个房间号）
  >
  > 这样的表结构，应该拆开来，如下。
  >
  > （订单编号，房间号，联系人编号）--（联系人编号，联系人，电话）



### 第三范式

- 数据不能存在传递关系，即每个属性都跟主键有直接关系而不是间接关系。像：a-->b-->c  属性之间含有这样的关系，是不符合第三范式的。

  > 比如Student表（学号，姓名，年龄，性别，所在院校，院校地址，院校电话）
  >
  > 这样一个表结构，就存在上述关系。 学号--> 所在院校 --> (院校地址，院校电话)
  >
  > 这样的表结构，应该拆开来，如下。
  >
  > （学号，姓名，年龄，性别，所在院校）--（所在院校，院校地址，院校电话）



### 补充

三大范式只是一般设计数据库的基本理念，可以建立冗余较小、结构合理的数据库。

如果有特殊情况，当然要特殊对待，数据库设计最重要的是看需求跟性能，需求>性能>表结构。

所以不能一味的去追求范式建立数据库。



## sql报错解决方案

#### （mysql）提示this is incompatible with sql_mode=only_full_group_by

**报错内容：**> 1055 - Expression #2 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'df_hibaby.cm.name' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by

![image-20210927150155397](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210927150155397.png)

**原因分析：**当前数据库版本默认sql_mode为only_full_group_by，要求select的列必须出现在group by 条件内

```mysql
# 查询当前数据库sql_mode
select @@sql_mode
```

**解决方案：**

- 修改数据库sql_mode

  ```mysql
  # 对已经创建的数据库执行，但只对当前连接有效，重启后失效
  set @@sql_mode 
  ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
  ```

  ```ini
  # 修改配置文件my.ini或my.cnf 后重启
  [mysqld]
  sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
  ```

- 或者 将查询列放在group by列中

**补充内容：sql_mode 配置解析**

- ONLY_FULL_GROUP_BY

  对于GROUP BY聚合操作，如果在SELECT中的列，没有在GROUP BY中出现，那么这个SQL是不合法的，因为列不在GROUP BY从句中。简而言之，就是SELECT后面接的列必须被GROUP BY后面接的列所包含。如：
  select a,b from table group by a,b,c; (正确)
  select a,b,c from table group by a,b; (错误)
  这个配置会使得GROUP BY语句环境变得十分狭窄，所以一般都不加这个配置

- NO_AUTO_VALUE_ON_ZERO

  该值影响自增长列的插入。默认设置下，插入0或NULL代表生成下一个自增长值。（不信的可以试试，默认的sql_mode你在自增主键列设置为0，该字段会自动变为最新的自增值，效果和null一样），如果用户希望插入的值为0（不改变），该列又是自增长的，那么这个选项就有用了。

- STRICT_TRANS_TABLES

  在该模式下，如果一个值不能插入到一个事务表中，则中断当前的操作，对非事务表不做限制。（InnoDB默认事务表，MyISAM默认非事务表；MySQL事务表支持将批处理当做一个完整的任务统一提交或回滚，即对包含在事务中的多条语句要么全执行，要么全部不执行。非事务表则不支持此种操作，批处理中的语句如果遇到错误，在错误前的语句执行成功，之后的则不执行；MySQL事务表有表锁与行锁非事务表则只有表锁）

- NO_ZERO_IN_DATE

  在严格模式下，不允许日期和月份为零

- NO_ZERO_DATE

  设置该值，mysql数据库不允许插入零日期，插入零日期会抛出错误而不是警告。

- ERROR_FOR_DIVISION_BY_ZERO

  在INSERT或UPDATE过程中，如果数据被零除，则产生错误而非警告。如 果未给出该模式，那么数据被零除时MySQL返回NULL

- NO_AUTO_CREATE_USER

  禁止GRANT创建密码为空的用户

- NO_ENGINE_SUBSTITUTION

  如果需要的存储引擎被禁用或未编译，那么抛出错误。不设置此值时，用默认的存储引擎替代，并抛出一个异常

- PIPES_AS_CONCAT

  将”||”视为字符串的连接操作符而非或运算符，这和Oracle数据库是一样的，也和字符串的拼接函数Concat相类似

- ANSI_QUOTES

  启用ANSI_QUOTES后，不能用双引号来引用字符串，因为它被解释为识别符







## 字符集

### 什么是字符集

字符是各种文字和符号的统称，包括各个国家文字、标点符号、表情、数字等等。 

**字符集** 就是一系列字符的集合。

每个字符集可以表示的字符范围通常不同，就比如说有些字符集是无法表示汉字的。

> **计算机只能存储二进制的数据，那英文、汉字、表情等字符应该如何存储呢？**
>
> 将这些字符和二进制的数据一一对应起来，比如说字符“a”对应“01100001”，反之，“01100001”对应 “a”。
>
> 我们将字符对应二进制数据的过程称为"**字符编码**"，
>
> 反之，二进制数据解析成字符的过程称为“**字符解码**”。



### 常见字符集

ASCII、GB2312、GBK、UTF-8......

不同的字符集的主要区别在于：

- 可以表示的字符范围
- 编码方式



#### ASCII

**ASCII** (**A**merican **S**tandard **C**ode for **I**nformation **I**nterchange，美国信息交换标准代码) 是一套主要用于现代美国英语的字符集（这也是 ASCII 字符集的局限性所在）。



#### GB2312

GB2312 字符集是一种对汉字比较友好的字符集，共收录 6700 多个汉字，基本涵盖了绝大部分常用汉字。不过，GB2312 字符集不支持绝大部分的生僻字和繁体字。

对于英语字符，GB2312 编码和 ASCII 码是相同的，1 字节编码即可。对于非英字符，需要 2 字节编码。



#### GBK

GBK 字符集可以看作是 GB2312 字符集的扩展，兼容 GB2312 字符集，共收录了 20000 多个汉字。

GBK 中 K 是汉语拼音 Kuo Zhan（扩展）中的“Kuo”的首字母。



#### GB18030

GB18030 完全兼容 GB2312 和 GBK 字符集，纳入中国国内少数民族的文字，且收录了日韩汉字，是目前为止最全面的汉字字符集，共收录汉字 70000 多个。



#### Unicode & UTF-8编码

Unicode 字符集中包含了世界上几乎所有已知的字符。

不过，Unicode 字符集并没有规定如何存储这些字符（也就是如何使用二进制数据表示这些字符）。

然后，就有了 **UTF-8**（**8**-bit **U**nicode **T**ransformation **F**ormat）。类似的还有 UTF-16、 UTF-32。

UTF-8 使用 1 到 4 个字节为每个字符编码， UTF-16 使用 2 或 4 个字节为每个字符编码，UTF-32 固定位 4 个字节为每个字符编码。

UTF-8 可以根据不同的符号自动选择编码的长短，像英文字符只需要 1 个字节就够了，这一点 ASCII 字符集一样 。因此，对于英语字符，UTF-8 编码和 ASCII 码是相同的。

UTF-32 的规则最简单，不过缺陷也比较明显，对于英文字母这类字符消耗的空间是 UTF-8 的 4 倍之多。

**UTF-8** 是目前使用最广的一种字符编码。



### MySql字符集

MySQL 支持很多种字符编码的方式，比如 UTF-8、GB2312、GBK、BIG5。

通过 `SHOW CHARSET` 命令来查看。

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220513230423018.png" alt="image-20220513230423018" style="zoom:50%;" />

通常情况下，我们建议使用 UTF-8 作为默认的字符编码方式。



#### utf8 与 utf8mb4

MySQL 字符编码集中有两套 UTF-8 编码实现：

- **`utf8`** ： `utf8`编码只支持`1-3`个字节 。 在 `utf8` 编码中，中文是占 3 个字节，其他数字、英文、符号占一个字节。但 emoji 符号占 4 个字节，一些较复杂的文字、繁体字也是 4 个字节。
- **`utf8mb4`** ： UTF-8 的完整实现，正版！最多支持使用 4 个字节表示字符，因此，可以用来存储 emoji 符号。

> **为什么有两套 UTF-8 编码实现呢？** 原因如下：
>
> ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20211008164542347.png)

因此，如果你需要存储`emoji`类型的数据或者一些比较复杂的文字、繁体字到 MySQL 数据库的话，数据库的编码一定要指定为`utf8mb4` 而不是`utf8` ，要不然存储的时候就会报错了。



## 关系型数据库

关系型数据库就是一种建立在关系模型的基础上的数据库。

关系模型表明了数据库中所存储的数据之间的联系（一对一、一对多、多对多）。

关系型数据库中，我们的数据都被存放在了各种表中（比如用户表），表中的每一行就存放着一条数据（比如一个用户的信息）。

大部分关系型数据库都使用 SQL 来操作数据库中的数据。并且，大部分关系型数据库都支持事务的四大特性(ACID)。

### 常见的关系型数据库

- MySQL
- PostgreSQL
- Oracle
- SQL Server
- SQLite（微信本地的聊天记录的存储就是用的 SQLite） 
- ......





## 事务

### 什么是事务

事务是逻辑上的一组操作，要么都执行，要么都不执行。



### 什么是数据库事务

数据库事务可以保证多个对数据库的操作（也就是 SQL 语句）构成一个**逻辑上的整体**。

构成这个逻辑上的整体的这些数据库操作遵循：**要么全部执行成功,要么全部不执行** 。

```mysql
# 开启一个事务
START TRANSACTION;
# 多条 SQL 语句
SQL1,SQL2...
## 提交事务
COMMIT;
```



### 事务特性：ACID

关系型数据库（例如：`MySQL`、`SQL Server`、`Oracle` 等）事务都有 **ACID** 特性：

![事务的特性](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dfsfsfsfinnodb.png)

1. **原子性（Atomicity）**

   事务是最小的执行单位，不允许分割。

   事务的原子性确保动作要么全部完成，要么完全不起作用；

2. **一致性（Consistency）**

   执行事务前后，数据保持一致。

   如转账业务中，无论事务是否成功，转账者和收款人的总额应该是不变的；

3. **隔离性（Isolation）**

   并发访问数据库时，一个用户的事务不被其他事务所干扰。

   各并发事务之间数据库是独立的；

4. **持久性（Durability）**

   一个事务被提交之后，它对数据库中数据的改变是持久的。

   即使数据库发生故障也不应该对其有任何影响。



### 事务隔离级别有哪几种

SQL 标准定义了四个隔离级别：

- **READ-UNCOMMITTED(读取未提交)**

  最低的隔离级别，允许读取尚未提交的数据变更。

  会导致 脏读，幻读，不可重复读。

- **READ-COMMITTED(读取已提交)**

  允许读取并发事务已经提交的数据。

  可以阻止脏读，

  不能阻止幻读，不可重复读。

- **REPEATABLE-READ(可重复读)**

  同一事务内对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改。

  可以阻止脏读和不可重复读，

  不能阻止幻读。

- **SERIALIZABLE(可串行化)**

  最高隔离级别，

  所有事务依次逐个执行，事务之间完全不可能互相干扰。

  可以阻止脏读，幻读，不可重复读。



### 脏读/幻读/不可重复读/丢失修改...

- **脏读（Dirty read）**

  当一个事务正在访问数据并且对数据进行了修改，而这种修改**还没有提交到数据库**中，

  同时另外一个事务也访问了这个数据，然后使用了这个数据。

  因为这个数据是**还没有提交的数据**，那么另外一个事务读到的这个数据是“脏数据”，

  依据“脏数据”所做的操作可能是不正确的。

- **丢失修改（Lost to modify）**

  在一个事务读取一个数据时，同时另外一个事务也访问了该数据，

  并且在**第一个事务中修改了这个数据后，第二个事务也修改了这个数据**。

  这样第一个事务内的修改结果就会丢失，因此称为丢失修改。

- **不可重复读（Unrepeatable read）**

  在一个事务内多次读同一数据，

  在这个事务还没有结束时，另一个事务也访问该数据，并修改数据，

  在第一个事务中的**两次读数据之间**，由于第二个事务的修改导致第一个事务**两次读取的数据可能不太一样**。

  在一个事务内两次读到的数据是不一样的情况，因此称为不可重复读。

- **幻读（Unrepeatable read）**

  与不可重复读类似，

  在一个事务（T1）读取了几行数据，接着另一个并发事务（T2）插入了一些数据时，

  在随后的查询中，第一个事务（T1）就会发现多了一些原本不存在的记录，

  就好像发生了幻觉一样，所以称为幻读。

### 不可重复读与幻读的区别

- 不可重复读的重点是修改。

  如多次读取一条记录发现其中某些列的值被修改。

- 幻读的重点是新增或者删除。

  如多次查询同一条查询语句（DQL）时，记录发现记录增多或减少了。









# MySQL

## 安装

#### Win

- 前提： 解压mysql-5.7.25-winx64.zip压缩包的文件夹到某一路径，如D:\mysql-5.7.25-winx64

  保证安装包中没有data文件夹

- 修改my.ini文件（没有就新建）

  ```ini
  [client]
  # 设置mysql客户端默认字符集
  default-character-set=utf8mb4
  [mysqld]
  # 设置3306端口
  port = 3306
  # 设置mysql的安装目录
  basedir=E:\\soft\\mysql-8.0.19-winx64
  # 允许最大连接数
  max_connections=500
  # 服务端使用的字符集默认为8比特编码的latin1字符集
  character-set-server=utf8mb4
  # 创建新表时将使用的默认存储引擎
  default-storage-engine=INNODB
  [mysql]
  default-character-set=utf8mb4
  ```

- 访问mysql的bin目录，输入指令

  ```powershell
  #安装
  mysqld --install
  .\mysqld.exe --install
  #初始化  --initialize-insecure  生成无密码用户
  mysqld --initialize-insecure --user=root
  #启动mysql服务
  net start mysql
  #查看版本
  mysql -V
  # 登录
  mysql -u root -p
  ```

- 配置环境变量，要不然无法直接使用mysql指令

  ```powershell
  MYSQL_HOME=E:\mysql-5.7.30-winx64
  Path=%MYSQL_HOME%\bin
  ```

- 修改密码

  ```mysql
  #修改密码
  set password = password('密码');
  ```

- 配置开机自启

  ![image-20210927103415585](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210927103415585.png)



#### Linux

##### 5.7

- 前提：依赖libaio

  ```shell
  yum list installed | grep libaio
  yum install libaio
  ```

- 下载  https://dev.mysql.com/downloads/mysql/

  ```shell
  wget https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.32-linux-glibc2.12-x86_64.tar.gz
  ```

- 创建mysql用户组与用户

  ```shell
  groupadd mysql
  useradd -r -g mysql mysql -s /sbin/nologin
  ```

- 解压并移动到特定路径

  ```shell
  mkdir -p /usr/local/mysql
  tar -zxvf mysql-5.7.32-linux-glibc2.12-x86_64.tar.gz
  mv mysql-5.7.32-linux-glibc2.12-x86_64 /usr/local
  cd /usr/local
  mv mysql-5.7.32-linux-glibc2.12-x86_64 mysql
  ```

- 创建data目录，修改目录权限和所有者

  ```shell
  chown -R mysql:mysql  /usr/local/mysql/
  chmod -R 755 /usr/local/mysql/
  #data可以不创建，由安装时自动生成，不然还要修改权限与所有者
  ```

- 创建/etc/my.cnf文件，内容如下

  ```ini
  # For advice on how to change settings please see
  # http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html
  
  [mysqld]
  sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES 
  explicit_defaults_for_timestamp = 1
  
  basedir = /usr/local/mysql
  datadir = /usr/local/mysql/data
  port = 3306
  socket = /tmp/mysql.sock
  #默认字符集i
  character-set-server=utf8
  #不区分大小写
  lower_case_table_names = 1
  #改为监听IPv4地址族
  bind-address = 0.0.0.0
  
  log-error = /usr/local/mysql/data/mysqld.log
  pid-file = /usr/local/mysql/data/mysqld.pid
  ```

- bin目录下初始化安装

  ```shell
  ./mysqld --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data --initialize
  ```

  在/usr/local/mysql/data/mysqld.log查看生成的临时密码，如 >)=qt2lS;(,e

- 将启动脚本放到开机初始化目录

  ```shell
  # 就是因为安装路径为默认的/usr/local/mysql  所以不用重新配置这个脚本
  cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
  # 或者添加软链接亦可
  ln -s /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
  ```

- 启动服务

  ```shell
  service mysql start
  ```

- 配置mysql到环境变量

  ```shell
  vim /etc/profile
  # PATH值后添加 :/usr/local/mysql/bin
  source /etc/profile
  
  #或者添加软链接
  ln -s /usr/local/mysql/bin/mysql /usr/bin/mysql
  ```

- 连接mysql修改初始密码

  ```shell
  mysql -u root -p  # 输入查询出的初始密码
  #修改初始密码 默认强度要求8位 大小写+数字
  mysql> set password for 'root'@'localhost' = password('123456');  
  #或者
  mysql> update mysql.user set authentication_string=password('123456') where user='root' and Host = 'localhost';   # 5.7版本没有password字段
  #或者
  mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
  # 刷新权限
  mysql> flush privileges;
  ```

- 添加远程访问权限

  ```shell
  mysql> use mysql;
  mysql> select host,User from user where user = 'root';  # 查询root没有%的host
  #授权法
  mysql> grant all privileges on *.* to root@'%' identified by 'root';  # 授权远程连接 密码root
  #刷新权限
  mysql> flush privileges;
  ```

- 用mysql用户重启mysql

  ```shell
  mysql> exit;
  sudo -u mysql service mysql start
  ```

> - **开机启动**
>
>   ```shell
>   cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
>   #赋予可执行权限
>   chmod +x /etc/init.d/mysql
>   #添加服务
>   chkconfig --add mysql
>   #显示服务列表 有mysql且345均为on
>   chkconfig --list
>   #没有则开启
>   chkconfig mysql on
>   ```
>
> - with grant option作用
>
>   在授权语句添加，表示该用户可以将自身权限授权给其他人。

##### 8.0

- 检查并卸载系统自带的mysql与mariadb

  ```shell
  rpm -qa|grep mariadb
  rpm -qa|grep mysql
  rpm -e --nodeps mysql
  ```

- 通过yum安装

  ```shell
  # 去官网下载 Yum 资源包 https://dev.mysql.com/downloads/repo/yum/
  wget http://repo.mysql.com/mysql80-community-release-el8-3.noarch.rpm
  rpm -ivh mysql80-community-release-el8-3.noarch.rpm
  yum update
  yum install mysql-server
  ```

- 权限设置 因为这种方式创建的mysql属于mysql用户

  ```java
  chown -R mysql:mysql /var/lib/mysql/
  chmod -R 777 /var/lib/mysql/
  ```

- 初始化

  ```shell
  mysqld --initialize
  # 查看初始密码 /var/log/mysqld.log
  ```

- 启动

  ```shell
  systemctl start mysqld
  # 查看运行状态
  systemctl status mysqld
  ```

- 开机自启

  ```shell
  systemctl enable mysqld
  systemctl daemon-reload
  ```



#### Docker安装mysql

- 拉取镜像

  ```powershell
  docker pull mysql:latest
  ```

- 运行mysql容器

  ```powershell
  docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
  ```

  > - **-p 3306:3306** ：映射容器服务的 3306 端口到宿主机的 3306 端口，外部主机可以直接通过 **宿主机ip:3306** 访问到 MySQL 的服务。
  > - **MYSQL_ROOT_PASSWORD=123456**：设置 MySQL 服务 root 用户的密码。



## 卸载

#### Linux

```shell
# 先保证mysql服务已关闭
yum remove mysql mysql-server mysql-libs mysql-server
# 查看已安装的mysql命令
yum list installed mysql*
rpm -qa|grep mysql
# 根据列表依次删除，并用上述指令反复确认
rpm -ev XXXX
# 搜索剩余mysql文件
find / -name mysql*
find / -name my.cnf*
#手动删除my.cnf
rm -rf /etc/my.cnf
rm -rf /etc/my.cnf.rpmsave
rm -rf /var/log/mysqld.log.rpmsave
```





## 常用命令

```powershell
#登录root账户
mysql -u root -p
```

```shell
-- 查看版本等信息
mysql> status;
-- 退出
mysql> exit;
```



## 配置文件

[参考官方文档](https://www.docs4dev.com/docs/zh/mysql/5.7/reference/preface.html)

Linux下为/etc/my.cnf

```ini
[client]
# MySQL客户端默认端口号
port = 3306 
# 用于本地连接的Unix套接字文件存放路径
socket = /tmp/mysql.sock
# MySQL客户端默认字符集
default-character-set = utf8mb4

max_allowed_packet=16M



[mysql]
# mysql命令行工具不使用自动补全功能，建议还是改为
# no-auto-rehash
#auto-rehash
socket = /tmp/mysql.sock


[mysqld]


port = 3306
#mysql启动时使用的用户  底下的目录都要有mysql用户的权限
user= mysql
##改为监听IPv4地址族，允许所有人连接
bind-address = 0.0.0.0
#安装根目录
basedir = /usr/local/mysql
#数据文件目录
datadir = /usr/local/mysql/data
# 進程ID文件存放路徑
pid-file = /usr/local/mysql/data/mysqld.pid
# 用于本地连接的Unix套接字文件存放路径
socket = /tmp/mysql.sock
#临时目录 比如load data infile会用到
tmpdir  = /tmp
#设置client连接mysql时的字符集,防止乱码
init_connect='SET NAMES utf8mb4'
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
#默认字符集  utf8mb4编码是utf8编码的超集，兼容utf8，并且能存储4字节的表情字符
character-set-server=utf8mb4
# MySQL服務端校對規則
collation_server = utf8mb4_general_ci
##不区分大小写
lower_case_table_names = 1
# 禁止MySQL对外部连接进行DNS解析
skip-name-resolve = 1
# mysql 5.1 之后，默认引擎就是InnoDB了
default_storage_engine = InnoDB

transaction_isolation = READ-COMMITTED
#防止外部锁定表
skip-external-locking=1

explicit_defaults_for_timestamp = 1





# MySQL支持的SQL语法模式，与其他异构数据库之间进行数据迁移时，SQL Mode组合模式会有帮助。
#NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
#ONLY_FULL_GROUP_BY 
#NO_ZERO_IN_DATE 不允许年月为0
#NO_ZERO_DATE 不允许插入年月为0的日期
#ERROR_FOR_DIVISION_BY_ZERO 在INSERT或UPDATE过程中，如果数据被零除，则产生错误而非警告。如果未给出该模式，那么数据被零除时MySQL返回NULL
#NO_ENGINE_SUBSTITUTION 不使用默认的存储引擎替代
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER


#语句长度限制 默认1m
max_allowed_packet=16M
#warning: [Server] CA certificate ca.pem is self signed
skip-ssl=1


#设置Mysql的最大连接数
max_connections = 1000
# 每个数据库用户的最大连接，（同一个账号能够同时连接到mysql服务的最大连接数），默认为0，表示不限制。
max_user_connections = 1000
# MySQL监听TCP端口时设置的积压请求栈大小，默认50+(max_connections/5)，最大不超过900
back_log = 250
#防止暴力破解超过100次后禁止连接 成功连接一次后会清零
max_connect_errors = 100
# MySQL默认的wait_timeout  值为8个小时(28800), interactive_timeout参数需要同时配置才能生效
# MySQL连接闲置超过一定时间后(单位：秒，此处为1800秒)将会被强行关闭
interactive_timeout = 1800 
wait_timeout = 1800 



# 日志文件相关设置，一般只开启三种日志，错误日志，慢查询日志，二进制日志。普通查询日志不开启。

# 關閉通用查詢日誌
general_log = 0
# 通用查詢日誌存放路徑
general_log_file = /data/mysql/log/mysql-general.log

# 數據庫服務器ID
server_id = 8

#开启binlog
log_bin = /usr/local/mysql/log/mysql-bin.log
# 同binlog，定義binlog的位置和名稱
#log_bin_index = /usr/local/mysql/log/mysql-bin.index
# binlog的格式也有三种：STATEMENT，ROW，MIXED。mysql 5.7.7后，默认值从 MIXED 改为 ROW
binlog_format = row
# mysql清除过期日志的时间，默认值0，不自动清理，而是使用滚动循环的方式。
expire_logs_days = 0
# 如果二进制日志写入的内容超出给定值，日志就会发生滚动。你不能将该变量设置为大于1GB或小于4096字节。 默认值是1GB。
max_binlog_size = 50M
# 每個session分配的binlog緩存大小
# 事務提交前產生的日誌，記錄到Cache中；事務提交後，則把日誌持久化到磁盤
binlog_cache_size = 2M
# sync_binlog=0（默認），事務提交後MySQL不刷新binlog_cache到磁盤，而讓Filesystem自行決定，或者cache滿了才同步。
# sync_binlog=n，每進行n次事務提交之後，MySQL將binlog_cache中的數據強制寫入磁盤。
sync_binlog = 1
# 將row模式下的sql語句，記錄到binlog日誌，默認是0(off)
binlog_rows_query_log_events = 1


#开启慢查询
slow_query_log = 1
#慢查询时间
long_query_time = 8
# 執行緩慢的管理語句，記錄到慢查詢日誌
log_slow_admin_statements = 1
#慢查询日志文件地址
slow_query_log_file = /usr/local/mysql/log/mysql-slow.log

# 全局动态变量，默认3，范围：1～3
# 表示错误日志记录的信息，1：只记录error信息；2：记录error和warnings信息；3：记录error、warnings和普通的notes信息。
log_error_verbosity = 2
log-error = /usr/local/mysql/log/mysql-error.log
```

> - 因为自定义目录的原因，用这个安装时需要提前创建目录
>
>   ```shell
>   mkdir /usr/local/mysql/log
>   #还要给修改这个文件夹的所有者为mysql  
>   chown -R mysql:mysql  /usr/local/mysql/log
>   ```
>
> - 相应地，查看初始密码在/usr/local/mysql/log/mysql-error.log



## 存储引擎

#### 存储引擎相关指令

- **查看 MySQL 提供的所有存储引擎**

  ```mysql
  show engines;
  ```

  ![查看MySQL提供的所有存储引擎](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/mysql-engines.png)

  Mysql5.5以后默认使用InnoDB为搜索引擎

  并且在 5.7 版本所有的存储引擎中只有 InnoDB 是事务性存储引擎，也就是说只有 InnoDB 支持事务。

- **查看 MySQL 当前默认的存储引擎**

  ```mysql
  show variables like '%storage_engine%';
  ```

- **查看表的存储引擎**

  ```mysql
  show table status like "table_name" ;
  ```

  ![查看表的存储引擎](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dsfsdfsfmysql.png)



#### 搜索引擎MyISAM与InnoDB区别

![image-20200404084731063](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404084731063.png)

1. **InnoDB支持事务，MyISAM不支持事务**

   MyISAM 不提供事务支持。

   对于InnoDB每一条SQL语言都默认封装成事务，具有提交(commit)和回滚(rollback)事务的能力。

2. **InnoDB支持外键，而MyISAM不支持**

   对一个包含外键的InnoDB表转成MyIsam表会失败

   > 一般不建议在数据库层面使用外键的，应用层面可以解决。
   >
   > 不过，这样会对数据的一致性造成威胁。
   >
   > 具体要不要使用外键还是要根据项目来决定。

3. **InnoDB支持行级锁，MyISAM不支持**

   MyISAM 只有表级锁(table-level locking)，

   而 InnoDB 支持行级锁(row-level locking)和表级锁，默认为行级锁。

   所以InnoDB 在并发写时效率更高，MyISAM 一锁就是锁住了整张表。

4. **InnoDB是聚集索引，而MyISAM是非聚集索引**

   InnoDB数据文件和索引绑定在一块，必须要有主键，通过主键索引效率很高，

   但是辅助索引需要两次查询，先查询到主键，然后在通过主键查询到数据，因此主键不能过大。

   主键过大的时候，其它索引也会很大。

   MyISAM数据和文件是分离的，索引保存的是数据文件的指针，主键索引和辅助索引是独立的。

5. **InnoDB不支持全文检索，而MyISAM支持全文检索**

   查询效率上MyIsam要高

6. **InnoDB支持数据库异常崩溃后的安全回复，MyISAM不支持**

   使用 InnoDB 的数据库在异常崩溃后，数据库重新启动的时候会保证数据库恢复到崩溃前的状态。这个恢复的过程依赖于 `redo log` 。

   > - MySQL InnoDB 引擎使用 **redo log(重做日志)** 保证事务的**持久性**，使用 **undo log(回滚日志)** 来保证事务的**原子性**。
   > - MySQL InnoDB 引擎通过 **锁机制**、**MVCC** 等手段来保证事务的隔离性（ 默认支持的隔离级别是 **`REPEATABLE-READ`** ）。
   > - 保证了事务的持久性、原子性、隔离性之后，一致性才能得到保障。

7. **InnoDB支持MVCC(多版本并发控制)，MyISAM不支持**

   MVCC 可以看作是行级锁的一个升级，可以有效减少加锁操作，提高性能。



#### MyISAM 和 InnoDB 的选择问题

- 大多数时候使用的都是 InnoDB 存储引擎；
- 在某些读密集的情况下，使用 MyISAM 也是合适的，前提是不介意MyISAM 不支持事务、崩溃恢复等缺点。
- 日常开发没什么理由再使用 MyISAM 作为自己的 MySQL 数据库的存储引擎









## 索引



### 什么是索引

索引是一种**用于快速查询和检索数据的数据结构**。

常见的索引结构有: B 树， B+树和 Hash。

### 索引的作用

索引的作用就相当于目录的作用。

比如查字典，我们只需要先去目录里查找字的位置，然后直接翻到那一页就行了。



### 索引的优缺点

**优点**

- 可以大大加快检索速度，减少检索的数据量。
- 通过创建唯一索引，保证数据库表中每一行数据的唯一性。

**缺点**

- 创建与维护索引需要耗费很长时间。

  对表数据进行增删改时，需要对索引进行动态修改，降低sql效率。

- 索引需要物理文件存储，耗费空间。

> **使用索引一定能提高查询性能吗?**
>
> 大多数情况，索引查询比全表扫描块，但是如果数据库的数据量不大，那么使用索引也不一定能够带来很大提升。



### （前置知识）读取数据：磁盘IO与预读

磁盘读取数据靠的是机械运动，每次读取数据花费的时间可以分为：

- **寻道时间**

  磁壁移动到指定磁道需要的时间，主流磁盘一般在5ms以下

- **旋转延迟**

  就是磁盘转速，

  如一个磁盘7200转，表示每分钟能转7200次，也就是1秒能转120次，旋转延迟就是1/120/2=4.17ms

  > **旋转延迟**
  >
  > 从磁盘寻道结束开始，直到磁头旋转到I/O请求所请求的起始数据块位置止，这之间的时间间隔。
  >
  > 将磁盘旋转周期的一半作为旋转延迟的近似值。

- **传输时间**

  从磁盘读出，或者将数据写入磁盘的时间，一般在零点几毫秒，相对于前两个时间可以忽略不计。

由上可知，访问一次磁盘的时间，即一次磁盘IO时间约为5+4.17 = 9ms左右。

但一台500-MIPS[^注1]机器每秒可以执行5亿条指令，约合一次IO的时间可以执行40万条指令，数据库动辄百万千万级的数据，每次9ms还是太久。

考虑到磁盘IO为高昂操作，计算机操作系统进行了优化，

**不光把当前磁盘地址的数据，还把相邻的数据也读取到内存缓冲区中**，

根据局部预读性[^注2]原理，当计算机访问一个地址的数据时，其相邻的数据也会很快被访问到。

于是每一次IO读取到的数据称之为**页（page）**。

具体每一页的大小与操作系统有关，一般为4k或者8k。

读取一页内的数据时，只会发生一次IO。

[^注1]: MIPS：Million Instructions Per Second的缩写，每秒处理的百万级的机器语言指令数，是衡量CPU速度的一个指标。
[^注2]: 局部预读性原理：指无论程序指令还是数据都趋于聚集在一个较小的连续区域中。



### 数据库底层数据结构演进

#### Hash表

哈希表是键值对的集合，通过键(key)即可快速取出对应的值(value)，

因此哈希表可以快速检索数据（接近 O(1)）。



**为何能够通过 key 快速取出 value**

原因在于 **哈希算法**（也叫散列算法）.

通过哈希算法，我们可以快速找到 key 对应的 index，找到了 index 也就找到了对应的 value。

```java
hash = hashfunc(key)
index = hash % array_size
```

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20210513092328171.png)

**哈希冲突**

但是哈希算法有个 **Hash 冲突** 问题，也就是说多个不同的 key 最后得到的 index 相同。

通常的解决方法是**链地址法**：将哈希冲突数据存放在链表中。

如 JDK1.8 之前 `HashMap` 就是通过链地址法来解决哈希冲突的。

不过，JDK1.8 以后`HashMap`为了减少链表过长的时候搜索时间过长引入了红黑树。



**为什么MySQL 没有使用Hash作为索引的数据结构**

- Hash冲突

- Hash 索引不支持顺序和范围查询

  

#### 二叉树

**特点**

- 一个节点只能有两个子节点，也就是一个节点的度不能超过2
- 左子节点小于本节点，右子节点大于等于本节点，比我大的向右，比我小的向左

![image-20200404093846645](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404093846645.png)

**缺点**

当存储数据递增时，时间复杂度会从O（logN）退化到O(N) 

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404094336765.png" alt="image-20200404094336765" style="zoom:50%;" />

#### 平衡二叉树（AVL）

含义见其他

![image-20200404094719626](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404094719626.png)

**缺点**

- 维护平衡过程的成本代价很高，因为每次删除一个节点或者增加一个节点的话，需要一次或多次的左旋和右旋去维护平衡状态

- 查询的效率不稳定，还要看运气的成分在里面

- 如果节点很多的话，那么这个AVL树的高度还是会很高的，查询效率会很低。

  

> **从算法的数学逻辑来讲，二叉树的查找速度和比较次数都是最小的，那为什么我们选择BTree?**
>
> 因为AVL还有一个问题，那就是 磁盘IO的问题
>
> - 磁盘IO的次数，就是由树高来决定的，也即磁盘的IO次数最坏的情况下就等于树的高度。
>
> 因为节点存储的数据太少，没有很好的利用操作系统和磁盘数据交换的特性，也没有利用好磁盘IO的预读能力。
>
> 因为操作系统和磁盘之间一次数据交换是以页为单位的，一页 = 4K，即每次IO操作系统会将4K数据加载镜像内存。
>
> 但是在二叉树每个节点的结构只保存一个关键字 和 数据区，两个子节点的引用，并不能填满4K的内容，辛辛苦苦的做了一次IO操作，却只加载了一个关键字，在树的高度很高，恰好要搜索的关键字位于叶子节点或支节点的时候，取一个关键字要做很多次的IO。因此平衡二叉树不太适合MySQL的查询结构。
>
> **解决方案**
>
> 树的高度问题，导致磁盘IO过多
>
> 那么就需要将树进行压缩，也就是将原来的瘦高 -> 矮胖，通过降低树的高度达到减少IO的次数



#### B树

又被称为 2-3树，也就是B树上的节点，可能是2，也可能是3

![image-20200404100139814](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404100139814.png)

##### 底层原理

数据库索引是存储在磁盘上的，如果数据很大，必然导致索引的大小也会很大，超过几个G（好比新华字典字数多必然导致目录厚）

当我们利用索引查询时，是不可能将全部几个G的索引都加载进内存的，我们能做的只能是：

逐一加载每一个磁盘页，因为磁盘页对应着索引树的节点。

```mysql
-- InnoDB的 page_size
SHOW GLOBAL STATUS LIKE 'Innodb_page_size';
```

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404151334993.png" alt="image-20200404151334993" style="zoom:67%;" />

系统从磁盘读取数据到内存时是以**磁盘块（block）**为单位的，位于同一磁盘块中的数据会被一次性读取出来，而不是需要什么取什么

InnoDB存储引擎中有**页(Page)**的概念，页是其磁盘管理的最小单位。

系统一个磁盘块的存储空间往往没有这么大，因此InnoDB每次申请磁盘空间时都会是**若干地址连续磁盘块**来达到页的大小16KB。InnoDB在把磁盘数据读入到磁盘时会以页为基本单位，在查询数据时如果一个页中每条数据都有助于定位数据记录的位置，这将会减少磁盘I/O次数，提高效率。

一句话说：就是多个块填充到一页大小



##### 检索原理

B树比平衡二叉树减少了一次IO操作

![image-20200404152149658](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404152149658.png)

每个节点占用一个盘块的磁盘空间，一个节点上有两个升序排序的关键字和三个指向子树根节点的指针，指针存储的是子节点所在磁盘块的地址。

模拟查找关键字29的过程：

- 根据根节点找到磁盘块1，读入内存【磁盘IO操作1次】
- 比较关键字29在区间(17, 35)，找到磁盘块1的指针P2。
- 根据P2指针找到磁盘块3，读入内存。【磁盘IO操作第2次】
- 比较关键字29在区间(26, 30)，找到磁盘块3的指针P2。
- 根据P2指针找到磁盘块8，读入内存。【磁盘IO操作3次】
- 在磁盘块8中的关键字列表，找到关键字29

分析上述过程，发现需要3次IO操作，和3次内存查找操作，由于内存中的关键字是一个有序表结构，可以利用二分法查找提高效率。而3次磁盘IO操作是影响整个BTree查找效率的决定性因素。BTree相对于AVLTree缩减了节点个数，使每次磁盘IO取到内存的数据都发挥了作用，从而提高了查找效率。



#### B+树

B+树把所有数据放在叶子节点，形成了链表，查找数据更方便

![image-20200404155456211](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404155456211.png)

![b+树](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/7af22798.jpg)

浅蓝色的块称之为一个磁盘块，每个磁盘块包含几个数据项（深蓝色所示）和指针（黄色所示），

如磁盘块1包含数据项17和35，包含指针P1、P2、P3，P1表示小于17的磁盘块，P2表示在17和35之间的磁盘块，P3表示大于35的磁盘块。真实的数据存在于叶子节点即3、5、9、10、13、15、28、29、36、60、75、79、90、99。

非叶子节点不存储真实的数据，只存储指引搜索方向的数据项，如17、35并不真实存在于数据表中。

图中可以看出所有的data信息都移动叶子节点中，而且子节点和子节点之间会有指针指向，这个也是B+树的核心点，这样可以大大提升范围查找效率，也方便遍历整个树。

- 非叶子节点不在存储数据，数据只存储在同一层的叶子节点上
- 叶子之间，增加链表，获取所有节点，不再需要中序遍历
- 这也说明了，B+树的检索性能比B树强



##### B+树的查找过程

如果要查找数据项29，

首先会把磁盘块1由磁盘加载到内存，此时发生一次IO，

在内存中用二分查找确定29在17和35之间，锁定磁盘块1的P2指针，内存时间因为非常短（相比磁盘的IO）可以忽略不计，

通过磁盘块1的P2指针的磁盘地址把磁盘块3由磁盘加载到内存，发生第二次IO，

29在26和30之间，锁定磁盘块3的P2指针，锁定磁盘块3的P2指针，

通过指针加载磁盘块8到内存，发生第三次IO，

同时内存中做二分查找找到29，结束查询，总计三次IO。

真实的情况是，3层的b+树可以表示上百万的数据，如果上百万的数据查找只需要三次IO，性能提高将是巨大的，如果没有索引，每个数据项都要发生一次IO，那么总共需要百万次的IO，显然成本非常非常高。



##### B+树的性质

这里的数据项即索引

1. IO次数取决于b+数的高度h

   假设当前数据表的数据为N，每个磁盘块的数据项的数量是m，则有h=㏒(m+1)N，当数据量N一定的情况下，m越大，h越小；

   m = 磁盘块的大小 / 数据项的大小，磁盘块的大小也就是一个数据页的大小，是固定的，**如果数据项占的空间越小，数据项的数量越多，树的高度越低**。

   这就是为什么每个数据项，即**索引字段要尽量的小**，比如int占4字节，要比bigint8字节少一半。

   这也是为什么b+树要求**把真实的数据放到叶子节点而不是内层节点**，一旦放到内层节点，磁盘块的数据项会大幅度下降，导致树增高。当数据项等于1时将会退化成线性表。

2. 当b+树的数据项是复合的数据结构，比如(name,age,sex)的时候，b+数是按照从左到右的顺序来建立搜索树的。

   如当(张三,20,F)这样的数据来检索的时候，b+树会优先比较name来确定下一步的所搜方向，

   如果name相同再依次比较age和sex，最后得到检索的数据。

   当(20,F)这样的没有name的数据来的时候，b+树就不知道下一步该查哪个节点，因为建立搜索树的时候name就是第一个比较因子，必须要先根据name来搜索才能知道下一步去哪里查询。

   如当(张三,F)这样的数据来检索时，b+树可以用name来指定搜索方向，但下一个字段age的缺失，所以只能把名字等于张三的数据都找到，然后再匹配性别是F的数据了， 这个是非常重要的性质，即**索引的最左匹配特性**。



##### 检索原理

由于B+树的非叶子只存储键值信息，假设每个磁盘块能存储4个键值及指针信息，那就变成如下结构

![image-20200404161422032](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404161422032.png)

B树结构图中可以看出每个节点不仅包含数据的key值，还有data值，而每一页的存储空间是有限的，如果data数据较大时将会导致每个节点（即一个页）能存储的key的数量很小，当存储数量很大时同样会导致B树的深度较大，增大查询时的磁盘IO次数进而影响查询效率。



#### B树与B+树的不同之处

- B 树的所有节点既存放键(key) 也存放 数据(data)，

  而 B+树只有叶子节点存放 key 和 data，其他内节点只存放 key。

- B 树的叶子节点都是独立的；

  B+树的叶子节点有一条引用链指向与它相邻的叶子节点，即双向链指针：

  - 可以基于叶子节点之间的范围查找
  - 或者基于根节点的查找

- B 树的检索的过程相当于对范围内的每个节点的关键字做二分查找，可能还没有到达叶子节点，检索就结束了；

  而 B+树的检索效率相对稳定，任何查找都是从根节点到叶子节点的过程，叶子节点的顺序检索很明显。





#### Mysql为什么是B+树

B+树中，所有数据记录节点都是按照键值大小顺序存放在同一层叶子节点上，而非叶子节点上只存储key值信息，这样可以大大加大每个节点存储的key值数量，降低B+树的高度。

- InnoDB存储引擎的最小存储单元是页，页可以用于存放数据，也可以用于存放键值+指针，在B+树中叶子节点存放数据，而非叶子节点存放键值+指针
- 索引组织表通过非叶子节点的二分查找法以及指针确定数据在哪个页中，首先找到根页进而去数据页查找到需要的数据

B+树算法：通过集成B树的特征，B+树相比B树，新增叶子节点与非叶子节点关系，叶子节点包含了键值和数据，非叶子节点只是包含键值和子节点引用，不包含数据。

通过非叶子节点查询叶子节点获取相应的数据，所有相邻的叶子节点包含非叶子节点使用链表进行结合，叶子节点是顺序并且相邻节点有顺序引用关系。

#### 结论

从B树到B+树，B+树在B树的基础上的一种优化使其更适合实现外存储索引结构，InnoDB存储引擎就是用B+树实现的索引结构

一般我们存储的数据在百万级别的话，B+树的高度都是三层左右



### 索引类型



#### 主键索引（Primary Key）

数据表的主键列使用的就是主键索引。

一张数据表有只能有一个主键，并且主键不能为 null，不能重复。

在 MySQL 的 InnoDB 的表中，当没有显示的指定表的主键时，InnoDB 会自动先检查表中是否有唯一索引且不允许存在null值的字段，如果有，则选择该字段为默认的主键，否则 InnoDB 将会自动创建一个 6Byte 的自增主键。



#### 二级索引（辅助索引）

**二级索引的叶子节点存储的数据是主键**。也就是说，通过二级索引，可以定位主键的位置。

唯一索引，普通索引，前缀索引等索引属于二级索引。

- **唯一索引(Unique Key)** ：

  唯一索引的属性列不能出现重复的数据，但是允许数据为 NULL，一张表允许创建多个唯一索引。 

  建立唯一索引的目的大部分时候都是为了该属性列的数据的唯一性，而不是为了查询效率。

- **普通索引(Index)** ：

  普通索引的唯一作用就是为了快速查询数据，一张表允许创建多个普通索引，并允许数据重复和 NULL。

- **前缀索引(Prefix)** ：

  前缀索引只适用于字符串类型的数据。

  前缀索引是对文本的前几个字符创建索引，相比普通索引建立的数据更小， 因为只取前几个字符。

- **全文索引(Full Text)** ：

  全文索引主要是为了检索大文本数据中的关键字的信息，是目前搜索引擎数据库使用的一种技术。

  Mysql5.6 之前只有 MYISAM 引擎支持全文索引，5.6 之后 InnoDB 也支持了全文索引。





### 检索原理

在数据之外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式引用（指向）数据，这样就可以在这些数据上实现高级查找算法，这种数据结构，就是索引。下图就是一种可能的索引方式示例：

![image-20200404090022629](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200404090022629.png)

为了加快Col2的查找，可以维护一个右边所示的二叉树，每个节点分别包含索引键值和一个指向对应数据记录的物理地址的指针，这样就可以运用二叉树在一定的复杂度内获取相应数据，从而快速的检索出符合条件的记录。



### MyISAM 引擎和 InnoDB 引擎对B+树的实现

**MyISAM 引擎**

B+Tree 叶节点的 data 域存放的是数据记录的地址。

在索引检索的时候，首先按照 B+Tree 搜索算法搜索索引，

如果指定的 Key 存在，则取出其 data 域的值，然后以 data 域的值为地址读取相应的数据记录。

这被称为“非聚簇索引”。

**InnoDB 引擎**

相比 MyISAM的索引文件和数据文件是分离的，其数据文件本身就是索引文件。

表数据文件本身就是按 B+Tree 组织的一个索引结构，树的叶节点 data 域保存了完整的数据记录。

这个索引的 key 是数据表的主键，因此 InnoDB 表数据文件本身就是主索引。

这被称为**聚簇索引**（或聚集索引），

而其余的索引都作为辅助索引，辅助索引的 data 域存储相应记录主键的值而不是地址。



### 聚簇索引

**索引结构和数据一起存放的索引**，索引结构的叶子节点保存了行数据

在 MySQL 中，InnoDB 引擎的表的 `.ibd`文件就包含了该表的索引和数据，对于 InnoDB 引擎表来说，该表的索引(B+树)的每个非叶子节点存储索引，叶子节点存储索引和索引对应的数据。

- **聚簇索引具有唯一性**。

  由于聚簇索引是将数据跟索引结构放到一块，因此一个表仅有一个聚簇索引。

- **表中行的物理顺序和索引中行的物理顺序是相同的**，**在创建任何非聚簇索引之前创建聚簇索引**。

  这是因为聚簇索引改变了表中行的物理顺序，数据行 按照一定的顺序排列，并且自动维护这个顺序。

- **聚簇索引默认是主键**

  如果表中没有定义主键，InnoDB 会选择一个**唯一且非空的索引**代替。

  如果没有这样的索引，InnoDB 会**隐式定义一个主键（类似oracle中的RowId）**来作为聚簇索引。

  如果已经设置了主键为聚簇索引又希望再单独设置聚簇索引，必须先删除主键，然后添加我们想要的聚簇索引，最后恢复设置主键即可。



#### 使用聚簇索引的优势

**每次使用辅助索引检索都要经过两次B+树查找，**看上去聚簇索引的效率明显要低于非聚簇索引，这不是多此一举吗？聚簇索引的优势在哪？

1. 由于行数据和聚簇索引的叶子节点存储在一起，同一页中会有多条行数据，访问同一数据页不同行记录时，已经把页加载到了Buffer中（缓存器），再次访问时，会在内存中完成访问，不必访问磁盘。

   这样主键和行数据是一起被载入内存的，找到叶子节点就可以立刻将行数据返回了，如果按照主键Id来组织数据，获得数据更快。

2. 辅助索引的叶子节点，存储主键值，而不是数据的存放地址。

   好处是当行数据发生变化时，索引树的节点不需要分裂变化；或者是我们需要查找的数据，在上一次IO读写的缓存中没有，需要发生一次新的IO操作时，可以避免对辅助索引的维护工作，只需要维护聚簇索引树就好了。

   另一个好处是，因为辅助索引存放的是主键值，减少了辅助索引占用的存储空间大小。

   > 注：
   >
   > 我们知道一次io读写，可以获取到16K大小的资源，我们称读取到的数据区域为Page。
   >
   > 而我们的B树，B+树的索引结构，叶子节点上存放好多个关键字（索引值）和对应的数据，都会在一次IO操作中被读取到缓存中，所以在访问同一个页中的不同记录时，会在内存里操作，而不用再次进行IO操作了。
   >
   > 除非发生了页的分裂，即要查询的行数据不在上次IO操作的换村里，才会触发新的IO操作。

3. 因为MyISAM的主索引并非聚簇索引，那么他的数据的物理地址必然是凌乱的，拿到这些物理地址，按照合适的算法进行I/O读取，于是开始不停的寻道不停的旋转。聚簇索引则只需一次I/O。（强烈的对比）

4. 不过，如果涉及到大数据量的排序、全表扫描、count之类的操作的话，还是MyISAM占优势些，因为索引所占空间小，这些操作是需要在内存中完成的。



#### 聚集索引的优点

查询速度非常的快，因为整个 B+树本身就是一颗多叉平衡树，叶子节点也都是有序的，定位到索引的节点，就相当于定位到了数据。

#### 缺点

1. **依赖于有序的数据** ：因为 B+树是多路平衡树，如果索引的数据不是有序的，那么就需要在插入时排序，如果数据是整型还好，否则类似于字符串或 UUID 这种又长又难比较的数据，插入或查找的速度肯定比较慢。
2. **更新代价大** ： 如果索引列的数据被修改时，那么对应的索引也将会被修改，而且聚集索引的叶子节点还存放着数据，修改代价肯定是较大的，所以对于主键索引来说，主键一般都是不可被修改的。



#### 聚簇索引需要注意的地方

当使用主键为聚簇索引时，主键最好不要使用uuid，因为uuid的值太过离散，不适合排序且可能出现新增加记录的uuid，会插入在索引树中间的位置，导致索引树调整复杂度变大，消耗更多的时间和资源。

建议使用int类型的自增，方便排序并且默认会在索引树的末尾增加主键值，对索引树的结构影响最小。而且，主键值占用的存储空间越大，辅助索引中保存的主键值也会跟着变大，占用存储空间，也会影响到IO操作读取到的数据量。

> **为什么主键通常建议使用自增id**?
>
> **聚簇索引的数据的物理存放顺序与索引顺序是一致的**，即：**只要索引是相邻的，那么对应的数据一定也是相邻地存放在磁盘上的**。如果主键不是自增id，那么可以想 象，它会干些什么，不断地调整数据的物理地址、分页，当然也有其他一些措施来减少这些操作，但却无法彻底避免。
>
> 但，如果是自增的，那就简单了，它只需要一 页一页地写，索引结构相对紧凑，磁盘碎片少，效率也高。



### 非聚簇索引

**将数据与索引分开，索引结构的叶子节点指向了数据对应的位置**

MyISAM使用的是非聚簇索引，**非聚簇索引的两棵B+树看上去没什么不同**，节点的结构完全一致只是存储的内容不同而已，主键索引B+树的节点存储了主键，辅助键索引B+树存储了辅助键。表数据存储在独立的地方，这两颗B+树的叶子节点都使用一个地址指向真正的表数据，对于表数据来说，这两个键没有任何差别。由于**索引树是独立的，通过辅助键检索无需访问主键的索引树**。

![image-20200723110258929](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200723110258929.png)

#### 辅助索引/回表操作

在InnoDB中，在聚簇索引之上创建的索引被称为辅助索引，非聚簇索引都是辅助索引，像复合索引，前缀索引，唯一索引。

辅助索引叶子节点存储不再是行的物理位置，而是主键值，辅助索引访问数据总是需要二次查找，这个就被称为 **回表操作**。

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200723105915972.png" alt="image-20200723105915972" style="zoom:50%;" />



#### 优点

**更新代价比聚集索引要小** 

非聚集索引的更新代价就没有聚集索引那么大了，非聚集索引的叶子节点是不存放数据的。

#### 缺点

1. 跟聚集索引一样，非聚集索引也**依赖于有序的数据**

2. **可能会二次查询(回表)** :

   这应该是非聚集索引最大的缺点了，当查到索引对应的指针或主键后，可能还需要根据指针或主键再到数据文件或表中查询。



#### 非聚集索引一定会回表查询吗？

不一定

1. 查询条件使用索引，查询结果就是索引列

   如下，索引的 key 本身就是 name，查到对应的 name 直接返回就可以，无需回表

   ```mysql
    SELECT name FROM table WHERE name='guang19';
   ```

2. 查询结果就是主键。

   ```mysql
   SELECT id FROM table WHERE id=1;
   ```

   主键索引本身的 key 就是主键，查到返回就行了。

   这种情况就称之为覆盖索引。



### 覆盖索引

**一个索引包含（或者说覆盖）所有需要查询的字段的值**，称之为“覆盖索引”。

如果不是主键索引，叶子节点存储的是主键+列值。最终还是要“回表”，也就是要通过主键再查找一次。

覆盖索引就是把要查询出的列和索引是对应的，不做回表操作。

**覆盖索引即需要查询的字段正好是索引的字段，那么直接根据该索引，就可以查到数据了， 而无需回表查询。**



### 联合索引

使用表中的多个字段创建索引，就是 **联合索引**，也叫 **组合索引** 或 **复合索引**。



### 建索引的几大原则



#### 最左前缀匹配原则

在使用联合索引时，**MySQL** 会根据联合索引中的字段顺序，

**从左到右依次到查询条件中去匹配**，

如果查询条件中存在与联合索引中最左侧字段相匹配的字段，则就会使用该字段过滤一批数据，

直至联合索引中全部字段匹配完成，

或者在执行过程中遇到范围查询，如 **`>`**、**`<`**、**`between`** 和 **`以%开头的like查询`** 等条件，才会停止匹配。

所以，我们在**使用联合索引时，可以将区分度高的字段放在最左边**，这也可以过滤更多数据。



#### =和in可以乱序

如a = 1 and b = 2 and c = 3 建立(a,b,c)索引可以任意顺序，

mysql的查询优化器会帮你优化成索引可以识别的形式。



#### 尽量选择区分度高的列作为索引

区分度的公式是count(distinct col)/count(*)，表示字段不重复的比例，比例越大我们扫描的记录数越少。

唯一键的区分度是1，而一些状态、性别字段可能在大数据面前区分度就是0。

那可能有人会问，这个比例有什么经验值吗？使用场景不同，这个值也很难确定，一般需要join的字段都要求是0.1以上，即平均1条扫描10条记录。



#### 索引列不能参与计算，保持列“干净”

如

```mysql
from_unixtime(create_time) = '2014-05-29'
```

就不能使用到索引，

原因很简单，b+树中存的都是数据表中的字段值，但进行检索时，需要把所有元素都应用函数才能比较，显然成本太大。所以语句应该写成create_time = unix_timestamp(’2014-05-29’)。



#### 尽量的扩展索引，不要新建索引

如表中已经有a的索引，现在要加(a,b)的索引，那么只需要修改原来的索引即可。





### 创建索引的注意事项

1. 合适的字段

   - **不为 NULL 的字段**

     对于数据为 NULL 的字段，数据库较难优化。

     如果字段频繁被查询，但又避免不了为 NULL，建议使用 0,1,true,false 这样语义较为清晰的短值或短字符作为替代。

   - **被频繁查询的字段** 

   - **作为条件查询的字段** 作为 WHERE 条件查询的字段，应该被考虑建立索引

   - **频繁需要排序的字段** 

     索引已经排序，这样查询可以利用索引的排序，加快排序查询时间

   - **频繁用于连接的字段** 

     频繁被连接查询的字段，可以考虑建立索引，提高多表连接查询的效率。

2. **频繁更新的字段应该慎重建立索引**

   维护索引的成本是不小的，如果一个字段不被经常查询，反而被经常修改，那么就更不应该在这种字段上建立索引了。

3. **尽可能的考虑建立联合索引而不是单列索引**

   索引是需要占用磁盘空间的，可以简单理解为每个索引都对应着一颗 B+树。

   如果一个表的字段过多，索引过多，那么当这个表的数据达到一个体量后，索引占用的空间也是很多的，且修改索引时，耗费的时间也是较多的。

   如果是联合索引，多个字段在一个索引上，那么将会节约很大磁盘空间，且修改数据的操作效率也会提升。

4. **避免冗余索引**

   冗余索引指的是索引的功能相同，能够命中索引(a, b)就肯定能命中索引(a) ，那么索引(a)就是冗余索引。

   大多数情况下，都应该尽量扩展已有的索引而不是创建新索引。

5. 考虑在**字符串类型的字段**上使用**前缀索引**代替普通索引

   前缀索引仅限于字符串类型，较普通索引会占用更小的空间，所以可以考虑使用前缀索引带替普通索引。



### 使用索引的建议

- 对于中到大型表索引都是非常有效的，但是特大型表的话维护开销会很大，不适合建索引

- 避免 where 子句中对字段施加函数，这会造成无法命中索引

- 使用与业务无关的自增主键作为主键，即使用逻辑主键，而不要使用业务主键

  > - **业务主键（自然主键）**：在数据库表中把具有业务逻辑含义的字段作为主键，称为“自然主键(Natural Key)”。
  > - **逻辑主键（代理主键）**：在数据库表中采用一个与当前表中逻辑信息无关的字段作为其主键，称为“代理主键”。
  > - **复合主键（联合主键）**：通过两个或者多个字段的组合作为主键。
  >
  > **使用逻辑主键的原因：**
  >
  > - 业务主键一旦改变则系统中关联该主键的部分的修改将会是不可避免的，并且引用越多改动越大。
  >
  >   而使用逻辑主键则只需要修改相应的业务主键相关的业务逻辑即可，减少了因为业务主键相关改变对系统的影响范围。
  >
  > - 使用 int 或者 bigint 作为外键进行联接查询，性能会比以字符串作为外键进行联接查询快。

- 删除长期未使用的索引。

  不用的索引的存在会造成不必要的性能损耗 ，MySQL 5.7 可以通过查询 sys 库的 schema_unused_indexes 视图来查询哪些索引从未被使用。

- 在使用 limit offset 查询缓慢时，可以借助索引来提高性能



## 锁机制与 InnoDB 锁算法

#### MyISAM 和 InnoDB 存储引擎使用的锁

- MyISAM 采用表级锁(table-level locking)。
- InnoDB 支持行级锁(row-level locking)和表级锁，默认为行级锁

#### 表级锁与行级锁对比

- **表级锁：** 

  MySQL 中锁定 **粒度最大** 的一种锁，对当前操作的整张表加锁。

  实现简单，资源消耗也比较少，加锁快，不会出现死锁。

  其锁定粒度最大，触发锁冲突的概率最高，并发度最低。

  MyISAM 和 InnoDB 引擎都支持表级锁。

- **行级锁：** 

  MySQL 中锁定 **粒度最小** 的一种锁，只针对当前操作的行进行加锁，行级锁能大大减少数据库操作的冲突。

  其加锁粒度最小，并发度高，但加锁的开销也最大，加锁慢，会出现死锁。

  

#### InnoDB 存储引擎的锁的算法

- **Record lock**：记录锁，单个行记录上的锁
- **Gap lock**：间隙锁，锁定一个范围，不包括记录本身
- **Next-key lock**：record+gap 临键锁，锁定一个范围，包含记录本身





## Mysql事务



#### Mysql数据事务的实现原理

以 MySQL 的 InnoDB 引擎为例，

MySQL InnoDB 引擎使用 **redo log(重做日志)** 保证事务的**持久性**，

使用 **undo log(回滚日志)** 来保证事务的**原子性**，

通过 **锁机制**、**MVCC** 等手段来保证事务的隔离性（ 默认支持的隔离级别是 **`REPEATABLE-READ`** ），

保证了事务的持久性、原子性、隔离性之后，一致性才能得到保障。





#### MySQL默认隔离级别

InnoDB 存储引擎的默认支持的隔离级别是 **REPEATABLE-READ(可重读)**

> **MySQL InnoDB 的 REPEATABLE-READ（可重读）并不保证避免幻读，需要使用加锁读来保证。而这个加锁读使用到的机制就是 Next-Key Locks。**

因为隔离级别越低，事务请求的锁越少，所以大部分数据库系统的隔离级别都是 **READ-COMMITTED(读已提交)** 。

但 InnoDB 存储引擎默认使用 **REPEATABLE-READ(可重复读)** 并不会有任何性能损失。

InnoDB 存储引擎在 **分布式事务** 的情况下一般会用到 **SERIALIZABLE(可串行化)** 隔离级别。



## 使用细节点



### 存储时间类型的抉择

#### 不要用字符串存储日期

1. 字符串占用的空间更大；
2. 字符串存储的日期效率比较低（逐个字符进行比对），无法用日期相关的 API 进行计算和比较。

#### Datetime 和 Timestamp 之间抉择

**通常都会首选 Timestamp。**

##### 1. DateTime 类型没有时区信息

- **DateTime 类型是没有时区信息的（时区无关）** ，DateTime 类型保存的时间都是**当前会话所设置的时区对应的时间**。

  当你的时区更换之后，比如你的服务器更换地址或者更换客户端连接时区设置的话，就会导致从数据库中读出的时间错误。

- **Timestamp 和时区有关**。

  Timestamp 类型字段的值会随着服务器时区的变化而变化，自动换算成相应的时间，说简单点就是在不同时区，查询到同一个条记录此字段的值会不一样。

> **一些关于 MySQL 时区设置的一个常用 sql 命令**
>
> ```mysql
> # 查看当前会话时区
> SELECT @@session.time_zone;
> # 设置当前会话时区
> SET time_zone = 'Europe/Helsinki';
> SET time_zone = "+00:00";
> # 数据库全局时区设置
> SELECT @@global.time_zone;
> # 设置全局时区
> SET GLOBAL time_zone = '+8:00';
> SET GLOBAL time_zone = 'Europe/Helsinki';
> ```

##### 2. DateTime 类型耗费空间更大

Timestamp 只需要使用 4 个字节的存储空间，但是 DateTime 需要耗费 8 个字节的存储空间。

> 同样造成了一个问题，Timestamp 表示的时间范围更小：
>
> - DateTime ：1000-01-01 00:00:00 ~ 9999-12-31 23:59:59
> - Timestamp： 1970-01-01 00:00:01 ~ 2037-12-31 23:59:59



#### 数值型时间戳不一定是更好的选择

很多时候，也会使用 int 或者 bigint 类型的数值也就是时间戳来表示时间。

##### 时间戳的定义

时间戳的定义是

从一个基准时间开始算起，这个基准时间是「1970-1-1 00:00:00 +0:00」，从这个时间开始，用整数表示，以秒计时，随着时间的流逝这个时间整数不断增加。

这样一来，我只需要一个数值，就可以完美地表示时间了，而且这个数值是一个绝对数值，即无论的身处地球的任何角落，这个表示时间的时间戳，都是一样的，生成的数值都是一样的，并且没有时区的概念，所以在系统的中时间的传输中，都不需要进行额外的转换了，只有在显示给用户的时候，才转换为字符串格式的本地时间。

##### 优势

这种存储方式的具有 Timestamp 类型的所具有一些优点，

并且使用它的进行日期排序以及对比等操作的效率会更高，

跨系统也很方便，毕竟只是存放的数值。

##### 缺点

缺点也很明显，就是数据的可读性太差了，无法直观的看到具体时间。

##### 数据库操作

时间戳与日期的转换

```mysql
mysql> select UNIX_TIMESTAMP('2020-01-11 09:53:32');
+---------------------------------------+
| UNIX_TIMESTAMP('2020-01-11 09:53:32') |
+---------------------------------------+
|                            1578707612 |
+---------------------------------------+
1 row in set (0.00 sec)

mysql> select FROM_UNIXTIME(1578707612);
+---------------------------+
| FROM_UNIXTIME(1578707612) |
+---------------------------+
| 2020-01-11 09:53:32       |
+---------------------------+
1 row in set (0.01 sec)
```



#### 总结

没有银弹，一般推荐Timestamp

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/timestampsdfsdgsgsg.jpg)

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dsdfsfsfdfsfssf.jpg)



### 查询缓存

执行查询语句的时候，会先查询缓存。

>  不过，MySQL 8.0 版本后移除，因为这个功能不太实用

#### 开启查询缓存

- `my.cnf` 加入以下配置，重启 MySQL 开启查询缓存

  ```ini
  query_cache_type=1
  query_cache_size=600000
  ```

- 或者执行mysql指令

  ```mysql
  set global  query_cache_type=1;
  set global  query_cache_size=600000;
  ```

#### 缓存效果

**开启查询缓存后在同样的查询条件以及数据情况下，会直接在缓存中返回结果**。

这里的查询条件包括查询本身、当前要查询的数据库、客户端协议版本号等一些可能影响结果的信息。

任何两个查询在任何字符上的不同都会导致缓存不命中。

此外，如果查询中包含任何用户自定义函数、存储函数、用户变量、临时表、MySQL 库中的系统表，其查询结果也不会被缓存。

**缓存建立之后**，MySQL 的查询缓存系统会跟踪查询中涉及的每张表，如果这些表（数据或结构）发生变化，那么和这张表相关的所有缓存数据都将失效。

#### 缓存不命中的情况

- **查询条件不一样**，包括查询本身、当前要查询的数据库、客户端协议版本号等一些可能影响结果的信息，缓存未命中；
- **查询中包含任何用户自定义函数、存储函数、用户变量、临时表、MySQL 库中的系统表**，查询结果不会被缓存。
- **表（数据或结构）发生变化**，和这张表相关的所有缓存数据都将失效。



#### 缺陷

虽然能够提升数据库的查询性能，但是缓存同时也**带来了额外的开销**，**每次查询后都要做一次缓存操作，失效后还要销毁。**

因此，开启查询缓存要谨慎，尤其对于写密集的应用来说更是如此。

> - 如果开启，要注意合理控制**缓存空间大小**，一般来说其大小设置为**几十 MB** 比较合适。
>
> - **可以通过 sql_cache 和 sql_no_cache 来控制某个查询语句是否需要缓存**
>
>   ```mysql
>   select sql_no_cache count(*) from usr;
>   ```





## Mysql高性能优化规范

https://www.cnblogs.com/huchong/p/10219318.html

### 数据库命令规范

- 数据库表名使用小写字母，用下划线分割

- 数据库表名禁用mysql保留关键字，如果包含，在查询时用单引号括起来

- 数据库表名做到见名识意，不超过32字符

- 临时库表以`tmp_`开头，日期作为后缀；备份表以`bak_`开头，以日期为后缀

- 所有存储相同数据的列名与列类型保持一致

  > 这种列一般作为关联列，如果类型不一致会自动进行数据类型隐式转换，导致列索引失效，查询效率降低。



## sql语句优化分析/慢查询优化（待调整）

[参考1](https://www.cnblogs.com/knowledgesea/p/3686105.html)

### 问题所在

sql语句性能达不到你的要求，执行效率让你忍无可忍，一般会时下面几种情况：

- 网速不给力，不稳定。
- 服务器内存不够，或者SQL 被分配的内存不够。
- sql语句设计不合理
- 没有相应的索引，索引不合理
- 没有有效的索引视图
- 表数据过大没有有效的分区设计
- 数据库设计太2，存在大量的数据冗余
- 索引列上缺少相应的统计信息，或者统计信息过期
- ....

如何给找出来导致性能慢的的原因呢？

- 知道是否跟sql语句有关，确保不是机器开不开机，服务器硬件配置太差
- 使用sql性能检测工具，分析出sql慢的相关语句，就是执行时间过长，占用系统资源，cpu过多的
- sql优化方法跟技巧，避免一些不合理的sql语句，取暂优sql
- 判断是否使用，合理地统计信息。
- 确认表中使用了合理的索引
- 数据太多的表，要分区，缩小查找范围





### 查询优化工具-explain命令

#### 具体用法和字段含义（待补充）

需要强调rows是核心指标，绝大部分rows小的语句执行一定很快（有例外）。所以优化语句基本上都是在优化rows。



### 慢查询优化步骤

0. 先运行看看是否真的很慢，注意设置SQL_NO_CACHE

1. where条件单表查，锁定最小返回记录表。

   这句话的意思是把查询语句的where都应用到表中返回的记录数最小的表开始查起，单表每个字段分别查询，看哪个字段的区分度最高

2. explain查看执行计划，是否与1预期一致（从锁定记录较少的表开始查询）

3. order by limit 形式的sql语句让排序的表优先查

4. 了解业务方使用场景

5. 加索引时参照建索引的几大原则

6. 观察结果，不符合预期继续从0分析



### 慢查询案例

很多情况下，我们写SQL只是为了实现功能，这只是第一步，不同的语句书写方式对于效率往往有本质的差别，这要求我们对mysql的执行计划和索引原则有非常清楚的认识。

#### 案例一

```mysql
select
   distinct cert.emp_id 
from
   cm_log cl 
inner join
   (
      select
         emp.id as emp_id,
         emp_cert.id as cert_id 
      from
         employee emp 
      left join
         emp_certificate emp_cert 
            on emp.id = emp_cert.emp_id 
      where
         emp.is_deleted=0
   ) cert 
      on (
         cl.ref_table='Employee' 
         and cl.ref_oid= cert.emp_id
      ) 
      or (
         cl.ref_table='EmpCertificate' 
         and cl.ref_oid= cert.cert_id
      ) 
where
   cl.last_upd_date >='2013-11-07 15:03:00' 
   and cl.last_upd_date<='2013-11-08 16:00:00';
```

0. 先运行一下，53条记录 1.87秒，又没有用聚合语句，比较慢

   ```mysql
   53 rows in set (1.87 sec)
   ```

1. explain分析查询

   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220522172434102.png" alt="image-20220522172434102"  />

   简述一下执行计划，

   - 首先mysql根据idx_last_upd_date索引扫描cm_log表获得379条记录；

   - 然后查表扫描了63727条记录，分为两部分，derived表示构造表，也就是不存在的表，可以简单理解成是一个语句形成的结果集，后面的数字表示语句的ID。

     derived2表示的是ID = 2的查询构造了虚拟表，并且返回了63727条记录。

   - 再来看看ID = 2的语句究竟做了写什么返回了这么大量的数据，首先全表扫描employee表13317条记录，然后根据索引emp_certificate_empid关联emp_certificate表。

     rows = 1表示，每个关联都只锁定了一条记录，效率比较高。

   - 获得后，再和cm_log的379条记录根据规则关联。从执行过程上可以看出返回了太多的数据，返回的数据绝大部分cm_log都用不到，因为cm_log只锁定了379条记录。

   **如何优化**

   目前的连表是在查询出六万多条数据后与cm_log内联，考虑先联表在查询数据。

   因为内联的判断条件是ref_table的两种类型，如果cm_log的ref_table是EmpCertificate就关联emp_certificate表，如果ref_table是Employee就关联employee表，完全可以拆成两部分，并用union连接起来。

   这里用union，而不用union all是因为原语句有“distinct”来得到唯一的记录，而union恰好具备了这种功能。

   如果原语句中没有distinct不需要去重，我们就可以直接使用union all了，因为使用union需要去重的动作，会影响SQL性能。

   **优化语句**

   ```mysql
   select
      emp.id 
   from
      cm_log cl 
   inner join
      employee emp 
         on cl.ref_table = 'Employee' 
         and cl.ref_oid = emp.id  
   where
      cl.last_upd_date >='2013-11-07 15:03:00' 
      and cl.last_upd_date<='2013-11-08 16:00:00' 
      and emp.is_deleted = 0 
   union
   select
      emp.id 
   from
      cm_log cl 
   inner join
      emp_certificate ec 
         on cl.ref_table = 'EmpCertificate' 
         and cl.ref_oid = ec.id  
   inner join
      employee emp 
         on emp.id = ec.emp_id  
   where
      cl.last_upd_date >='2013-11-07 15:03:00' 
      and cl.last_upd_date<='2013-11-08 16:00:00' 
      and emp.is_deleted = 0
   ```

2. 不需要了解业务场景，只需要改造的语句和改造之前的语句保持结果一致

3. 现有索引可以满足，不需要建索引

4. 用改造后的语句实验一下，只需要10ms 降低了近200倍！

   ![image-20220522175113069](C:\Users\alienware\AppData\Roaming\Typora\typora-user-images\image-20220522175113069.png)

   



# Redis

Redis是一个高性能的分布式内存数据库，在国内外个大互联网公司中都有着广泛的使用，即使是一些非互联网公司也有着非常重要的使用场景。



## 简单介绍

**Redis 是一个使用 C 语言开发的数据库**

与传统数据库不同的是 **Redis 的数据是存在内存中的** ，也就是它是内存数据库，所以读写速度非常快，因此 Redis 被广泛应用于缓存方向。

另外，**Redis 除了做缓存之外，也经常用来做分布式锁，甚至是消息队列。**

**Redis 提供了多种数据类型来支持不同的业务场景。Redis 还支持事务 、持久化、Lua 脚本、多种集群方案。**



## 安装

#### Win

**下载地址：**https://github.com/tporadowski/redis/releases

- 下载 **Redis-x64-xxx.zip**压缩包到 C 盘，解压后，将文件夹重新命名为 **redis**

  ![image-20210927104734903](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210927104734903.png)

- 配置环境变量

  ```powershell
  REDIS_HOME=E:\redis
  Path=%REDIS_HOME%
  ```

- 启动服务器指令

  ```powershell
  # 使用的默认的配置文件E:\redis.windows.conf
  redis-server
  redis-server E:\redis\redis.windows.conf
  ```

- 设为服务方便自启

  ```powershell
  redis-server --service-install redis.windows.conf --loglevel verbose
  ```

  

#### Linux

##### 基础安装

- 版本：CentOS 7.6 ，Redis6.0.10

- 下载redis，上传到服务器，或者直接下载。[官网](https://redis.io/)

  ```shell
  wget https://download.redis.io/releases/redis-6.0.10.tar.gz?_ga=2.133199438.1993444330.1614002910-1625138534.1614002910
  ```

- 解压并移动目录

  ```shell
  tar -zxvf redis-6.0.10.tar.gz
  mv redis-6.0.10.tar redis
  mv redis /usr/local
  ```

- 安装相关依赖，gcc版本要求5.3以上

  ```shell
  #检查gcc版本
  gcc -v
  #更新gcc
  yum -y install centos-release-scl
  yum -y install devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-binutils
  #临时切换gcc版本
  scl enable devtoolset-9 bash
  #注意：scl命令启用只是临时的，退出xshell或者重启就会恢复到原来的gcc版本。
  #如果要长期生效的话，执行如下：
  echo "source /opt/rh/devtoolset-9/enable" >>/etc/profile
  #测试用tcl版本8.5以上
  yum install tcl.x86_64
  ```

- 移动到安装目录，编译安装到特定目录

  ```shell
  cd /usr/local/redis
  make
  # make test
  make install PREFIX=/usr/local/redis 
  #如果报错，执行该指令再重新make
  make distclean
  ```

- 启动配置

  ```shell
  #启动
  cd /usr/local/redis/bin
  ./redis-server /usr/local/redis/redis.conf
  ```

  > - 简单配置（编辑redis.conf文件）：
  >
  >   - 守护模式启动（后台）：修改`daemonize`为yes   （223行左右）
  >   - 设置密码：放开`requirepass`注释并添加密码  （789行左右）
  >   - 允许远程访问：
  >     - 注释掉`bind 127.0.0.1`   (69行左右)
  >     - 关闭保护模式：`protected-mode`设为no
  >
  > - 因为[Crackit漏洞](https://www.aneasystone.com/archives/2015/11/redis-crackit.html)的存在，在云服务器请不要在保持redis可公网访问的情况下不设验证，会导致入侵并设下后门。



##### 安装为服务并由redis用户启动

- 创建redis用户

  ```shell
  groupadd redis
  useradd -r -g redis redis -s /sbin/nologin
  ```

- 配置系统变量

  ```shell
  #编辑
  vi /etc/profile
  #增加内容
  export REDIS_HOME=/user/local/redis
  export PATH=$PATH:$REDIS_HOME/bin
  #生效
  source /etc/profile
  ```

- 创建配置文件并放置在指定目录

  ```shell
  mkdir /etc/redis
  cp /usr/local/redis/redis.conf /etc/redis/redis_6379.conf
  #修改配置内容：
  daemonize yes
  requirepass XXXXX
  #bind 127.0.0.1
  protected-mode no
  pidfile /var/run/redis/6379.pid
  logfile /var/log/redis/6379.log
  dir /usr/local/redis/data/6379
  ```

- 创建相关目录并赋权

  ```shell
  mkdir /var/run/redis -pv   && chown redis.redis  /var/run/redis -R
  mkdir /usr/local/redis/data -pv && chown redis.redis  /usr/local/redis/data -R
  sudo -u redis mkdir /usr/local/redis/data/6379
  mkdir /var/log/redis/ -pv && chown redis.redis /var/log/redis/ -R
  #chown -R redis.redis /usr/local/redis 
  ```

- 修改redis服务启动方式

  ```shell
  #拷贝启动脚本到系统
  cp /usr/local/redis/utils/redis_init_script /etc/init.d/redis
  #修改参数
  vim /etc/init.d/redis
  REDISPORT=6379
  EXEC=/usr/local/redis/bin/redis-server
  CLIEXEC=/usr/local/redis/bin/redis-cli  
  PIDFILE=/var/run/redis/${REDISPORT}.pid
  CONF="/etc/redis/${REDISPORT}.conf"
  ```

- 通过系统指令用redis用户启动redis：

  ```shell
  sudo -u redis systemctl stop/status/start redis
  sudo -u redis service redis start
  ```

> - 开机启动（未测试问题）：
>
>   ```shell
>   chkconfig redis on
>   ```



### 配置及持久化

```shell
# 默认本地连接，如果想支持其他机器连接的话，那么把 127.0.0.1 改成 0.0.0.0
bind 127.0.0.1

# 保护模式，如果改成 no，那么任意机器都可以连接，并且不需要认证
# 因此我们都会设置成 yes，开启保护模式，通过 bind 和 requirepass 来实现认证登录
protected-mode yes

# 监听的端口
port 6379

# 设置 tcp 的 backlog，backlog 其实是一个连接队列，backlog 队列总和 = 未完成三次握手队列 + 已完成三次握手队列
# 在高并发环境下你需要一个高 backlog 值来避免慢客户端连接问题
# 注意 linux 内核会将这个值减小到 /proc/sys/net/core/somaxconn 的值
# 所以需要增大 somaxconn 和 tcp_max_syn_backlog 两个值来达到想要的结果
tcp-backlog 511

# 当客户端 N 秒没有活动，那么关闭连接，0 表示禁用该功能，一直保持连接
timeout 0

# 如果是 redis 集群，那么每隔 300 秒发送一个信息，告诉主节点自己还活着。
tcp-keepalive 300

# 是否是以守护进程方式启动，默认是 no，但是一般我们会改成 yes，也就是让 redis 后台启动
daemonize no

# redis 的 pid 管道文件
pidfile /var/run/redis_6379.pid

# 日志级别：debug、verbose、notice、warning，级别越高，打印的信息越少。
# 刚开发会选择 debug，会打印详细日志，上线之后选择 notice 或者 warning
loglevel notice

# 日志名字
logfile ""

# 是否把日志输出到系统日志里面，默认是不输出
# syslog-enabled no

# 指定日志文件标识，这里是 redis，所以就是 redis.log
# syslog-ident redis

# 指定 syslog 设备，值可以是 user 或者 local0 到 local7
# syslog-facility local0

# redis 数据库的数量，默认是 16 个，0-15
databases 16

# 总是显示 logo
always-show-logo yes

# 设置密码，一旦设置，再使用 redis-cli 连接的时候就需要指定密码了
# 否则进去之后无法执行命令，可以使用 redis-cli -a password，但是这样密码就暴露在终端中
# 尽管能连接，但是 redis 提示你不安全。当然我们还可以进去之后通过 auth password 来设置
# requirepass foobared
```

#### 持久化（待补充）

https://www.cnblogs.com/traditional/p/13296648.html



## 数据结构

#### String  字符串

Redis最基础的数据结构。

##### 内部编码/实现方式

字符串对象的内部编码有3种 ：**int**、**raw** 和 **embstr**，Redis会根据当前值的类型和长度来决定使用哪种编码来实现

- **int**

  如果一个字符串对象保存的是整数值，并且这个整数值可以用`long`类型来表示

- **raw**

  如果字符串对象保存的是一个字符串值,并且这个字符串值的长度大于32字节

- **embstr**

  如果字符串对象保存的是一个字符串值,并且这个字符申值的长度小于等于32字节

##### 使用场景

使用场景较为广泛

- 作为缓存层，缓存热点数据，将更新不频繁但查询频繁的数据进行缓存，减轻数据库压力。
- 利用自增自减的特性，制作计数器，限速器，自增id生成。
- 分布式系统的session共享
- 二进制数据存储

#### Hash  哈希

哈希对象用来存储一组数据对，每个数据对包含键值两个部分

![image-20200626101327742](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200626101327742.png)

##### 内部编码/实现方式

有两种实现方式：**ziplist** 与 **hashtable**

- **ziplist  压缩列表** 

  存储数据较小时实现，需要满足条件，否则通过hashtable实现：

  - 字典中保存的键与值都小于64字节
  - 键值对个数少于512个

- **hashtable  哈希表**

##### 使用场景

- 存储内容为对象时，字符串对象可以用哈希对象实现，如缓存用户信息。

  > java对象既可以用string存储（序列化为json）,也可以用hash存储。
  >
  > 但是如果这个对象更新频繁，用序列化的方式存储会需要每次都重新序列化，开销比较大。这个时候用hash存储，每次只需要更新对象属性即可。

- 缺点是要控制ziplist与hashtable两种内部编码的转换，hashtable消耗更多内存

- 实现购物车与计数器功能。

  如用户id为key，商品id为field的key，商品数量为field的value。



#### List  列表

支持存储一组有序的，不重复的数据。

因为存储内容有序，所以可以获取指定范围的元素列表，可以在O(1)的时间复杂度下获取指定索引的下标的元素。

![image-20200626105857594](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200626105857594.png)

##### 实现方式/内部编码

- 3.2版本前，有两种

  - **ziplist(压缩列表)**

    满足两个条件时使用ziplist实现：

    - 当列表的元素个数小于list-max-ziplist-entries配置（默认512个）
    - 当列表中每个元素的值都小于list-max-ziplist-value配置时（默认64字节）

  - **linkedlist**

- 3.2版本后，列表数据结构改造，用quickList代替了ziplist与linkedlist

##### 使用场景

- 因为列表的有序且不重复特性，用于文章，商品的列表存储
- 列表类型可以左推/右弹，即先进先出的队列特性，用于实现消息队列
- 可以左推/左弹，即先进后出的栈特性，用于栈的适用场景。
- lrange命令根据两个索引获取数据，可以用于实现分页。



#### Set  集合

是一个无序且唯一的键值集合，不按照插入顺序进行存储。

![image-20200626122033221](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200626122033221.png)

##### 内部编码/实现方式

- **intset(整数集合)**

  满足两个条件时，才会使用intset实现集合对象：

  - 集合中的元素都是整数
  - 集合中元素的个数小于 set-maxintset-entries配置（默认512个）

- **hashtable(哈希表)**

##### 使用场景

- 特性是无序，不重复，支持交并差，可用于**标签系统**。

  将博客网站的每个人的标签用set进行存储，还可以按标签将用户进行归并。

  利用交集可以获取共同好友类似的功能。

- SPOP（随机移除并返回集合中一个/多个元素）和SRANDMEMBER（随机返回集合中一个/多个元素）指令，支持了**抽奖系统**的实现。



#### ZSet  有序集合

相较于集合多了一个排序属性score(分值)，每个存储元素由两个值构成，一个是有序结合的元素值，一个是排序值。

有序集合保留了集合不重复元素的特性，同时支持元素排序。

![image-20200626123309037](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200626123309037.png)

##### 内部编码/实现方式

- **ziplist(压缩列表)**

  数据较少时使用ziplist存储，满足两个条件：

  - 有序集合保存的元素个数要小于 128 个；
  - 有序集合保存的所有元素成员的长度都必须小于 64 字节。

- **skiplist(跳跃表)**

##### 使用场景

- 排行榜系统，如学生排名，网站的点赞、播放排名，电商系统的销量排名等。

- 带权重的消息队列。

  重要的消息score较大，普通消息score较小，按照score进行顺序处理消息，优先处理优先级高的消息。



## 跳跃表

待补充

http://note.moguit.cn/#/./Redis/Redis%E4%B8%AD%E7%9A%84%E8%B7%B3%E8%B7%83%E8%A1%A8/README



## Redis单线程模型详解（待补充）

待补充 https://javaguide.cn/database/redis/redis-questions-01.html#redis-%E5%8D%95%E7%BA%BF%E7%A8%8B%E6%A8%A1%E5%9E%8B%E8%AF%A6%E8%A7%A3



## 基于Redis(Jedis)实现分布式锁

#### 分布式锁的要求

- **互斥性**：任意时刻只有一个客户端持有锁。
- **不会死锁**：即使一个客户端在持有锁期间发生崩溃而没有主动解锁，也能保证后续其他客户端加锁。
- **容错性**：只要大部分redis节点正常运行，客户端就可以加锁解锁
- **"解铃还须系铃人"**：加锁与解锁由同一个客户端完成，客户端不能接触其他客户端加的锁。

#### 加锁实现

```java
public class RedisTool {

    private static final String LOCK_SUCCESS = "OK";
    private static final String SET_IF_NOT_EXIST = "NX";
    private static final String SET_WITH_EXPIRE_TIME = "PX";

    /**
     * 尝试获取分布式锁
     * @param jedis Redis客户端
     * @param lockKey 锁
     * @param requestId 请求标识
     * @param expireTime 超期时间
     * @return 是否获取成功
     */
    public static boolean tryGetDistributedLock(Jedis jedis, String lockKey, String requestId, int expireTime) {

        String result = jedis.set(lockKey, requestId, SET_IF_NOT_EXIST, SET_WITH_EXPIRE_TIME, expireTime);

        if (LOCK_SUCCESS.equals(result)) {
            return true;
        }
        return false;
    }
}
```

其中的`jedis.set(String key, String value, String nxxx, String expx, int time)`方法是分布式锁的核心，共有五个参数：

- **key**：key是唯一键，且区分锁的标志。
- **value**：value是值，这里用requestId作为值，目的是区分加锁的客户端，让解锁有依据。其中requestId可以自定义生成方式，如`UUID.randomUUID().toString()`。
- **nxxx**：这里传值为NX，含义是SET IF NOT EXIST，即当key不存在时，我们进行set操作；若key已经存在，则不做任何操作；
- **exep**：这里传值为PX，含义是我们要给这个key加一个过期时间，时间是多少由第五个参数决定。
- **time**：key的过期时间。

上述实现的效果是：

- 当前没有锁（key不存在），则进行加锁，设置过期时间，用value记录上锁的客户端
- 当前有锁，则不进行任何操作，返回false。

而满足分布式条件通过三个地方实现：

- NX参数，设置保证key存在时函数不会调用成功，满足互斥性。
- 过期时间，保证锁持有者崩溃也可以自动删除锁，不会死锁。
- value赋值requestId，保证解锁时，可以校验是否同一个客户端。



#### 错误加锁

##### 通过setnx与expire组合加锁

```java
public static void wrongGetLock1(Jedis jedis, String lockKey, String requestId, int expireTime) {

    Long result = jedis.setnx(lockKey, requestId);
    if (result == 1) {
        // 若在这里程序突然崩溃，则无法设置过期时间，将发生死锁
        jedis.expire(lockKey, expireTime);
    }
}
```

setnx()方法作用就是SET IF NOT EXIST，expire()方法设置过期时间，但由于这是两个方法不具有原子性，存在连个方法执行过程中程序崩溃，导致加锁没有过期时间，出现死锁问题。

##### 将上锁时间作为值设置加锁

```java
public static boolean wrongGetLock2(Jedis jedis, String lockKey, int expireTime) {

    long expires = System.currentTimeMillis() + expireTime;
    String expiresStr = String.valueOf(expires);

    // 如果当前锁不存在，返回加锁成功
    if (jedis.setnx(lockKey, expiresStr) == 1) {
        return true;
    }

    // 如果锁存在，获取锁的过期时间
    String currentValueStr = jedis.get(lockKey);
    if (currentValueStr != null && Long.parseLong(currentValueStr) < System.currentTimeMillis()) {
        // 锁已过期，获取上一个锁的过期时间，并设置现在锁的过期时间
        String oldValueStr = jedis.getSet(lockKey, expiresStr);
        if (oldValueStr != null && oldValueStr.equals(currentValueStr)) {
            // 考虑多线程并发的情况，只有一个线程的设置值和当前值相同，它才有权利加锁
            return true;
        }
    }
    // 其他情况，一律返回加锁失败
    return false;
}
```

**思路**

使用`jedis.setnx()`命令实现加锁，其中key是锁，value是锁的过期时间。

- 通过setnx()方法尝试加锁，如果当前锁不存在，返回加锁成功。
- 如果锁已经存在则获取锁的过期时间，和当前时间比较，如果锁已经过期，则设置新的过期时间，返回加锁成功。

**问题**

- 客户端传递过期时间，需求分布式环境下客户端时间同步；
- 锁过期时，多个客户端争夺锁，虽然最后只有一个客户端上锁，但这个锁的过期时间可能被其他客户端覆盖而改变。
- 锁没有客户端标识，会被任何客户端解锁。



#### 解锁实现

```java
public class RedisTool {

    private static final Long RELEASE_SUCCESS = 1L;

    /**
     * 释放分布式锁
     * @param jedis Redis客户端
     * @param lockKey 锁
     * @param requestId 请求标识
     * @return 是否释放成功
     */
    public static boolean releaseDistributedLock(Jedis jedis, String lockKey, String requestId) {

        String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
        Object result = jedis.eval(script, Collections.singletonList(lockKey), Collections.singletonList(requestId));

        if (RELEASE_SUCCESS.equals(result)) {
            return true;
        }
        return false;

    }
}
```

- 简单的Lua脚本代码，功能是获取锁的value值，检查与requestId是否相等，相等则删除锁。
- Lua代码传到`jedis.eval()`方法，并将lockKey赋值给KEYS[1]，requestId赋值给ARGV[1]，让Lua脚本交给jedis执行。
- 使用Lua脚本的原因要保证获取值与删除值的操作是原子性的，否则就可能出现数据不同步的问题。



#### 错误解锁

- 第一种情况是直接根据lockKey解锁，问题是无法区分客户端。

- 第二种情况：

  ```java
  public static void wrongReleaseLock2(Jedis jedis, String lockKey, String requestId) {
  
      // 判断加锁与解锁是不是同一个客户端
      if (requestId.equals(jedis.get(lockKey))) {
          // 若在此时，这把锁突然不是这个客户端的，则会误解锁
          // 也就是突然锁过期了，然后把别人的锁给干掉了
          jedis.del(lockKey);
      }
  }
  ```

  问题就在于删除与判断不是原子的，会存在删除其他客户端的锁的情况。（如判断的过程中，锁过期删除并被其他客户端获取，这个时候再删除的就是其他客户端的锁）







# Mongodb

Mongodb是为快速开发互联网Web应用而构建的数据库系统，其数据模型和持久化策略就是为了构建高读/写吞吐量和高自动灾备伸缩性的系统。

## 安装

#### Win

- 下载安装包 https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.2.21-signed.msi

- 选择路径进行安装

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_37.91e60eec.png)

  服务端启动程序为 bin/mongod.exe

  ![image-20220507220224842](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220507220224842.png)

- 找到配置文件mongod.cfg，查看配置

  ```yaml
  # mongod.conf
  
  # for documentation of all options, see:
  #   http://docs.mongodb.org/manual/reference/configuration-options/
  
  # Where and how to store data.
  storage:
    dbPath: E:\soft\MongoDB\Server\data
    journal:
      enabled: true
  #  engine:
  #  mmapv1:
  #  wiredTiger:
  
  # where to write logging data.
  systemLog:
    destination: file
    logAppend: true
    path:  E:\soft\MongoDB\Server\log\mongod.log
  
  # network interfaces
  net:
    port: 27017
    bindIp: 127.0.0.1
  ```

  视情况可以修改storage.dbPath 以及systemLog.path配置路径，默认端口27017

> 通过安装包的安装mongodb已经安装为服务随开机启动，可视情况进行调整
>
> 相关命令：
>
> ```shell
> # 启动服务
> net start MongoDB
> # 关闭服务
> net stop MongoDB
> ```
>
> ![image-20220507220839679](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220507220839679.png)









# Dubbo

分布式服务框架，致力于提供高性能和透明化的 RPC 远程服务调用方案，是阿里巴巴 SOA（Service-Oriented Architecture,SOA，面向服务架构）服务化治理方案的核心框架。官网地址 http://dubbo.io



## 节点角色/调用关系

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210202185824294.png" alt="image-20210202185824294" style="zoom:67%;" />



#### 节点角色

- Provider 服务提供方
- Consumer 调用服务的服务消费方
- Registry 服务注册与发现的注册中心
- Monitor 统计服务调用的监控中心
- Container 服务运行容器



#### 调用关系

0. start 服务容器启动，加载，运行服务提供方
1. register 服务提供方启动时，向注册中心注册服务
2. subscribe 服务消费方启动时，向注册中心订阅服务
3. notify 注册中心返回服务地址列表给消费者，并推送变更
4. invoke 服务消费者从服务列表中，基于软负载均衡[^6]算法选择一台提供者进行调用，调用失败则再选一台
5. count 服务消费者与提供者，在内存中累计调用次数与实践，定时发送一次统计数据到监控中心

[^6]: 指通过软件完成负载均衡，对请求进行分配派发，如轮询、ip哈希、最小连接数等。



## 注册中心ZooKeeper

注册中心负责服务地址的注册与查找，相当于目录服务，

服务提供者和消费者只在启动时与注册中心交互，注册中心本身不转发请求，压力较小。

ZooKeeper是一个树型的目录服务，支持变更推送，可用于生产环境，作为dubbo的注册中心，保证让调用者了解ip地址与服务的对应关系。



### 安装

[下载地址](https://zookeeper.apache.org/releases.html)

选择稳定版本，这里选择3.6.2

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210202225500220.png" alt="image-20210202225500220" style="zoom:50%;" />

**下载安装**

```shell
wget https://mirrors.tuna.tsinghua.edu.cn/apache/zookeeper/zookeeper-3.6.2/apache-zookeeper-3.6.2-bin.tar.gz
tar -zxvf apache-zookeeper-3.6.2-bin.tar.gz
# 移动到特定位置，方便后续配置
cp -r  /ftpfile/apache-zookeeper-3.6.2-bin /usr/apache-zookeeper-3.6.2
```

**创建数据文件存贮目录**

```shell
cd /usr/apache-zookeeper-3.6.2
mkdir data
```

**添加主配置文件**

```shell
cd conf/
cp zoo_sample.cfg zoo.cfg
```

**修改配置**

修改zoo.cfg

```ini
# 修改配置 改为本地的数据文件存储目录
# dataDir=/tmp/zookeeper
dataDir=/usr/apache-zookeeper-3.6.2/data
# the port at which the clients will connect
clientPort=2181
```

**开放端口号**

**启动服务端**

```shell
#接上
cd ..
cd bin/
#start-foreground前台启动，会把错误日志显示
./zkServer.sh start
#查看服务端状态
./zkServer.sh status
#验证服务   **** QuorumPeerMain
jps -l
```

**启动客户端**

```shell
sh zkCli.sh
# 查看根目录下内容
[zk: localhost:2181(CONNECTED) 2] ls /
```



>- 启动报错：Could not find or Load main class org.apache.zookeeper.server.quorum.QuorumPeerMain
>
> <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210202225149862.png" alt="image-20210202225149862" style="zoom:50%;" />
>
> 原因是下载的安装包有误，apache-zookeeper-3.6.2.tar.gz是源码，没有经过编译，要么编译安装，要么选择下载后缀有-bin的，如apache-zookeeper-3.6.2-bin.tar.gz
>
>- **添加到系统环境变量**
>
> 效果是任何路径都可以通过`zkServer.sh 参数`调用zookeeper
>
> ```shell
> vim /etc/profile
> # 添加export ZKSERVER_HOME=/usr/apache-zookeeper-3.6.2
> # PATH值后添加 :$ZKSERVER_HOME/bin
> source /etc/profile # 使配置生效
> ```
>
> ![image-20210202233135205](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210202233135205.png)
>
>- 如果telnet命令找不到：
>
> ```shell
> yum install xinetd telnet telnet-server -y
> ```
>
> 



### 常用命令

```shell
zkServer.sh    start
zkServer.sh    status
zkServer.sh    stop
zkServer.sh    restart
# 客户端连接
zkCli.sh -server 127.0.0.1:2181 
```

#### zkCli启动后命令

[参考](https://blog.csdn.net/feixiang2039/article/details/79810102)

##### 创建节点create

```shell
create [-s] [-e] [-c] [-t ttl] path [data] [acl]
```

- `-s` 创建有序节点，同名节点会维护一个数字序号
- `-e` 创建临时节点，关闭客户端后删除

**案例**

```shell
# 普通节点
create /mynode hello   # Created /mynode
create /mynode/subnode world   # Created /mynode/subnode
# 有序节点
create -s /mynode hello # Created /mynode0000000004
create -s /mynode world # Created /mynode0000000005
# 临时节点
create -e /temp hello  # Created /temp
```



##### 列出节点ls

```shell
ls [-s] [-w] [-R] path
```

- `-w` 添加一个 watch（监视器），如果该节点发生变化，watch 可以使客户端得到通知，只触发一次。

**案例**

```shell
ls /
ls -s /
ls -w /mynode # 然后在这个节点下增删子节点会触发watch
```



##### 获取节点信息get

```shell
get [-s] [-w] path
```

- `-w` 添加一个 watch（监视器）,进行改变内容和删除节点会触发不同事件。

**案例**

```shell
get /mynode
get -w /mynode  # 内容变化产生 NodeDataChanged 事件，节点删除产生 NodeDeleted 事件
```

```shell
get -s /mynode
# 显示效果为
helloo
cZxid = 0x30000004c  #创建节点的zxid
ctime = Sun Apr 05 15:48:14 CST 2020  #创建时间
mZxid = 0x30000005d  #最后一次修改节点的zxid
mtime = Sun Apr 05 16:05:56 CST 2020  #最后一次修改时间
pZxid = 0x30000005c  #最后一次修改节点的子节点的zxid
cversion = 7  #子节点版本号
dataVersion = 1  #版本号，修改会增加
aclVersion = 0  #节点ACL版本
ephemeralOwner = 0x0  #如果是临时节点则列出所在客户端 session id，否则为0
dataLength = 6  #存储数据长度
numChildren = 1  #子节点个数
```



##### 检查状态stat

```shell
stat [-w] path
```

**案例**

```shell
stat /mynode
```



##### 修改节点set

```shell
set [-s] [-v version] path data
```

**案例**

```shell'
set /mynode hello
```

会导致mZxid，mtime和dataVersion变化



##### 删除节点delete

```shell
delete [-v version] path
deleteall path [-b batch size]
```

- deleteall删除不返回内容，并删除子节点；delete不能删除有子节点的节点
- `-v` 指定版本号，如果与当前版本号不匹配则操作失败，不指定则默认删除最新



##### 其他指令

```shell
# 列出最近10条历史记录
history
# 关闭连接
close
# 打开连接，连接远程zk服务，默认连接本地2181端口
connect host:port
# 退出连接，退出zkCli
quit
```









### 常用配置

zoo.cfg配置相关

**单机模式**

```ini
# 通信心跳数 单位毫秒 2000表示2s一次心跳检测，并设置最小session超时时间为2倍心跳时间
ticketTime=2000
#服务端与客户端通信端口号
clientPort=2181
#数据目录
dataDir=/usr/apache-zookeeper-3.6.2/data
#日志目录
dataLogDir=/usr/apache-zookeeper-3.6.2/logs
```

> - 现版本的zookeeper默认还会占用8080端口，想暂时关闭，可以在这里配置
>
>   ```ini
>   #避开要用的端口号
>   admin.serverPort=9000
>   #或者
>   admin.enableServer=false
>   ```
>
>   或者启动配置参数-Dzookeeper.admin.serverPort=9000或者-Dzookeeper.admin.enableServer=false

**集群模式**

```ini
ticketTime=2000
clientPort=2181
dataDir=/usr/apache-zookeeper-3.6.2/data
dataLogDir=/usr/apache-zookeeper-3.6.2/logs

#集群中follower与leader之间初始连接能容忍的最多心跳数，用于限定集群服务器连接主机的时限，超过则认为断开连接
initLimit=10
#集群启动后leader与follower之间最大响应心跳次数，超过则leader认为follower死掉，从服务列表删除
syncLimit=5
# 集群中的每台机器都需要感知其它机器，每一行代表一台服务器配置
# server.id=host:port:port
# id是服务器在集群中的序号，每台zk服务器还要在data目录下创建一个myid文件，内容为这个id
server.1=server1:2888:3888
server.2=server2:2888:3888
server.3=server3:2888:3888
```

集群中每个服务器配置内容一致，但myid内容不一样，id范围为1~255

>- 如果在一台计算机上配置多个zk服务器，则每个服务器需指定服务器名为localhost，端口号各自独立（如2888：3888、2889：3889、2890：3890）



### 内部机制



#### 半数机制

ZooKeeper适合安装在奇数台服务器，半数以上机器存活则集群可用。



#### 选举机制

[参考](http://dockone.io/article/696772)

配置文件中指出服务器存在一个leader其余follower，leader是通过选举机制产生的。并在leader节点挂掉时从follower中选出leader。

**选举阶段**

最大ZXID也就是节点本地的最新事务编号，包含epoch和计数两部分。epoch是纪元的意思，相当于Raft算法选主时候的term，标识当前leader周期，每次选举一个新的Leader服务器后，会生成一个新的epoch。（[术语参考](https://www.cnblogs.com/xybaby/p/10124083.html)）

- 所有节点处于Looking状态，依次发起投票，包含服务器id和最新事务id（ZXID）
- 如果别人的ZXID比自己大，说明数据比自己新，则重新发起投票，投票给目前已知最大ZXID所在服务器
- 每次投票，服务器统计投票数，判断是否有节点得到半数以上投票，存在则成为准Leader，状态为Leading，其他节点状态为Following

**发现阶段**

- 防止意外情况，如网络原因在上个阶段产生多个Leader
- Leader接收所有Follower发来的最新epoch值，从中选出最大的epoch值，+1生成新epoch值发给各个Follower
- Follower接收最新epoch值，返回ACK给Leader，带上各自最大ZXID和历史事务日志，Leader选出最大的ZXID，更新自身历史日志。

**同步阶段**

Leader收集最新历史事务日志，同步给集群所有Follower，半数同步成功，准Leader才能成为正式Leader。

> 假设有5台服务器组成的Zookeeper集群，它们的id是1-5，同时它们都是最新启动的，也就是没有历史数据。
>
> ![在这里插入图片描述](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20191006105256892.png)
>
> - 服务器1启动，此时只有一台服务器，发出去的报文没有响应，投自己1票，状态Looking。
> - 服务器2启动，与服务器1进行通信，交换选举结果（2投2一票，1投2一票），服务器2有2票最多，但没有达到服务器数半数（3票），状态Looking
> - 服务器3启动，与服务器12进行通信（3投31票，12投3一票），服务器3有3票最多，达到半数，晋升Leader，其余为Follower
> - 服务器4启动，此时已经有Leader，自动为Follower
> - 服务器5同4，为Follower



## 监控中心Monitor

也是一个web应用，部署在tomcat即可





# Maven

## 安装

- 前提：  解压apache-maven-3.3.9-bin.zip到指定路径。

- 环境变量配置：

  Path变量值添加 ;%MAVEN_HOME%\bin

  添加变量MAVEN_HOME，值为Maven安装位置，如E:\Maven\apache-maven-3.3.9

- 检验安装

  控制台输入mvn --version命令，显示相关信息

## IDEA配置

[参考阿里云Maven](https://maven.aliyun.com/mvn/guide)

- 安装目录下配置文件conf/settings.xml进行如下修改：

  - mirrors节点添加国内节点，加快依赖下载速度

    ```xml
    <mirror>
      <id>aliyunmaven</id>
      <mirrorOf>*</mirrorOf>
      <name>阿里云公共仓库</name>
      <url>https://maven.aliyun.com/repository/public</url>
    </mirror>
    ```

  - 修改本地仓库存储位置，settings节点添加localRepository

    ```xml
    <localRepository>E:\repository</localRepository>
    ```

- idea配置里修改maven配置文件的位置为修改后的setting.xml



## 使用

### 本地jar安装到本地仓库

```powershell
mvn install:install-file -Dfile=D:/taobao-sdk-java-auto-20160607.jar -DgroupId=com.ganshane.specs -DartifactId=taobao-sdk-java-auto-20160607 -Dversion=1.0.0 -Dpackaging=jar
mvn install:install-file -Dfile=C:/Users/Stranger/Downloads/dingtalk-sdk-java/taobao-sdk-java-auto_1479188381469-20211105.jar -DgroupId=com.org.dingding -DartifactId=dingtalk -Dversion=2021.11 -Dpackaging=jar
```







# 补充内容

## FastClass机制

[参考](https://www.daimajiaoliu.com/daima/485d9fc20900404)

FastClass顾名思义是一个能让被增强类更快调用的Class，主要针对调用方法是变量的场景，用于替代反射调用。

FastClass的实现逻辑，是生成增强类实现invoke方法，invoke方法中，用switch语义将被增强类的所有方法调用枚举出来。用户使用FastClass.invoke方法，传入方法index和被调用实例，从而达到不使用反射就能实现不确定方法的调用。

动态类为委托类方法调用语句建立索引，使用者根据方法签名（方法名+参数类型）得到索引值，再通过索引值进入相应的方法调用语句，得到调用结果。

省去了反射，提高了效率,实现了Java反射的“运行时动态调用指定类的方法”的功能，但是使用了不同的机制。

### 应用

CGLIB动态代理

### 代码

原方法，委托类

```java
public class DelegateClass {

    public DelegateClass() {
    }

    public DelegateClass(String string) {
    }

    public boolean add(String string, int i) {
        System.out.println("This is add method: " + string + ", " + i);
        return true;
    }

    public void update() {
        System.out.println("This is update method");
    }
}
```

FastClass

```java
public abstract class FastClass{

    // 委托类
    private Class type;
    
    // 子类访问构造方法
    protected FastClass() {}
    protected FastClass(Class type) {
        this.type = type;
    }
    
    // 创建动态FastClass子类
    public static FastClass create(Class type) {
        // Generator：子类生成器，继承AbstractClassGenerator
        Generator gen = new Generator();
        gen.setType(type);
        gen.setClassLoader(type.getClassLoader());
        return gen.create();
    }
    
    /**
     * 调用委托类方法
     *
     * @param name 方法名
     * @param parameterTypes 方法参数类型
     * @param obj 委托类实例
     * @param args 方法参数对象
     */
    public Object invoke(String name, Class[] parameterTypes, Object obj, Object[] args) {
        return invoke(getIndex(name, parameterTypes), obj, args);
    }
    
    /**
     * 根据方法描述符找到方法索引
     *
     * @param name 方法名
     * @param parameterTypes 方法参数类型
     */
    public abstract int getIndex(String name, Class[] parameterTypes);
    
    
    /**
     * 根据方法索引调用委托类方法
     *
     * @param index 方法索引
     * @param obj 委托类实例
     * @param args 方法参数对象
     */
    public abstract Object invoke(int index, Object obj, Object[] args);
    
    /**
     * 调用委托类构造方法
     * 
     * @param parameterTypes 构造方法参数类型
     * @param args 构造方法参数对象
     */
    public Object newInstance(Class[] parameterTypes, Object[] args) throws {
        return newInstance(getIndex(parameterTypes), args);
    }
    
    /**
     * 根据构造方法描述符（参数类型）找到构造方法索引
     *
     * @param parameterTypes 构造方法参数类型
     */
    public abstract int getIndex(Class[] parameterTypes);
    
    /**
     * 根据构造方法索引调用委托类构造方法
     *
     * @param index 构造方法索引
     * @param args 构造方法参数对象
     */
    public abstract Object newInstance(int index, Object[] args);
    
}
```

FastClass子类

```java
public class DelegateClass$$FastClassByCGLIB$$4af5b667 extends FastClass {
    
    /**
     * 动态子类构造方法
     */
    public DelegateClass$$FastClassByCGLIB$$4af5b667(Class delegateClass) {
        super(delegateClass);
    }

    /**
     * 根据方法签名得到方法索引
     *
     * @param name 方法名
     * @param parameterTypes 方法参数类型
     */
    public int getIndex(String methodName, Class[] parameterTypes) {
        switch(methodName.hashCode()) {
            
            // 委托类方法add索引：0
            case 96417:
                if (methodName.equals("add")) {
                    switch(parameterTypes.length) {
                        case 2:
                            if (parameterTypes[0].getName().equals("java.lang.String") && 
                                parameterTypes[1].getName().equals("int")) {
                                return 0;
                            }
                    }
                }
                break;
            
            // 委托类方法update索引：1
            case -838846263:
                if (methodName.equals("update")) {
                    switch(parameterTypes.length) {
                        case 0:
                            return 1;
                    }
                }
                break;
                
            // Object方法equals索引：2
            case -1295482945:
                if (methodName.equals("equals")) {
                    switch(parameterTypes.length) {
                        case 1:
                            if (parameterTypes[0].getName().equals("java.lang.Object")) {
                                return 2;
                            }
                    }
                }
                break;
            
            // Object方法toString索引：3
            case -1776922004:
                if (methodName.equals("toString")) {
                    switch(parameterTypes.length) {
                        case 0: return 3;
                    }
                }
                break;
            
            // Object方法hashCode索引：4
            case 147696667:
                if (methodName.equals("hashCode")) {
                    switch(parameterTypes.length) {
                        case 0:
                            return 4;
                    }
                }
        }

        return -1;
    }
    
    /**
     * 根据方法索引调用委托类方法
     *
     * @param methodIndex 方法索引
     * @param delegateInstance 委托类实例
     * @param parameterValues 方法参数对象
     */
    public Object invoke(int methodIndex, Object delegateInstance, Object[] parameterValues) {
        DelegateClass instance = (DelegateClass) delegateInstance;
        int index = methodIndex;
        try {
            switch(index) {
                case 0:
                    // 委托类实例直接调用方法语句
                    return new Boolean(instance.add((String)parameterValues[0], 
                            ((Number)parameterValues[1]).intValue()));
                case 1:
                    instance.update();
                    return null;
                case 2:
                    return new Boolean(instance.equals(parameterValues[0]));
                case 3:
                    return instance.toString();
                case 4:
                    return new Integer(instance.hashCode());
            }
        } catch (Throwable t) {
            throw new InvocationTargetException(t);
        }

        throw new IllegalArgumentException("Cannot find matching method/constructor");
    }

    /**
     * 根据构造方法描述符（参数类型）找到构造方法索引
     *
     * @param parameterTypes 构造方法参数类型
     */
    public int getIndex(Class[] parameterTypes) {
        switch(parameterTypes.length) {
            // 无参构造方法索引：0
            case 0:
                return 0;
            
            // 有参构造方法索引：1
            case 1:
                if (parameterTypes[0].getName().equals("java.lang.String")) {
                    return 1;
                }
            default:
                return -1;
        }
    }
    
    /**
     * 根据构造方法索引调用委托类构造方法
     *
     * @param methodIndex 构造方法索引
     * @param parameterValues 构造方法参数对象
     */
    public Object newInstance(int methodIndex, Object[] parameterValues) {
        // 创建委托类实例
        DelegateClass newInstance = new DelegateClass;
        DelegateClass newObject = newInstance;
        int index = methodIndex;
        try {
            switch(index) {
                // 调用构造方法（<init>）
                case 0:
                    newObject.<init>();
                    return newInstance;
                case 1:
                    newObject.<init>((String)parameterValues[0]);
                    return newInstance;
            }
        } catch (Throwable t) {
            throw new InvocationTargetException(t);
        }

        throw new IllegalArgumentException("Cannot find matching method/constructor");
    }

    public int getMaxIndex() {
        return 4;
    }
}
```

### 总结

FastClass机制算是一种技巧层面的东西，在java内存里边维护一个index值和对象的方法之间的逻辑映射，然后运行期可以根据index和实例来动态调用方法、且不用使用比较“重”的Java反射功能。



## equals 与 == 的关系

- `==` 对于基本类型和引用类型的作用效果是不同的：

  - 对于基本数据类型来说，`==` 比较的是值。

  - 对于引用数据类型来说，`==` 比较的是对象的内存地址。

- `equals()` 不能用于判断基本数据类型的变量，只能用来判断两个对象是否相等。

- `equals()`方法存在于`Object`类中，而`Object`类是所有类的直接或间接父类，因此所有的类都有`equals()`方法。

- 类没有重写`equals()`方法时，等价于通过“==”比较这两个对象，使用的默认是 `Object`类`equals()`方法。

- 类重写了 `equals()`方法时，一般重写来比较两个对象中的属性是否相等；

- `String` 中的 `equals` 方法是被重写过的，因为 `Object` 的 `equals` 方法是比较的对象的内存地址，而 `String` 的 `equals` 方法比较的是对象的值。

  > 当创建 `String` 类型的对象时，虚拟机会在常量池中查找有没有已经存在的值和要创建的值相同的对象，如果有就把它赋给当前引用。如果没有就在常量池中重新创建一个 `String` 对象。



### hashCode作用

- 获取哈希码（`int` 整数），也称为散列码。这个哈希码的作用是确定该对象在哈希表中的索引位置。

- `hashCode()`定义在 JDK 的 `Object` 类中，这就意味着 Java 中的任何类都包含有 `hashCode()` 函数。

- `Object` 的 `hashCode()` 方法是本地方法，也就是用 C 语言或 C++ 实现的，该方法通常用来将对象的内存地址转换为整数之后返回。

- 其实， `hashCode()` 和 `equals()`都是用于比较两个对象是否相等。

  > **为什么 JDK 还要同时提供这两个方法呢？**
  >
  > 这是因为在一些容器（比如 `HashMap`、`HashSet`）中，有了 `hashCode()` 之后，判断元素是否在对应容器中的效率会更高！
  >
  > 如添加元素进`HashSet`的过程，如果 `HashSet` 在对比的时候，同样的 `hashCode` 有多个对象，它会继续使用 `equals()` 来判断是否真的相同，也就是说 `hashCode` 帮助我们大大缩小了查找成本。

### 为什么两个对象有相同的 `hashCode` 值，它们也不一定是相等的？

因为 `hashCode()` 所使用的哈希算法也许刚好会让多个对象传回相同的哈希值。越糟糕的哈希算法越容易碰撞，但这也与数据值域分布的特性有关（所谓**哈希碰撞**也就是指的是不同的对象得到相同的 `hashCode` )。

总结下来就是 ：

- 如果两个对象的`hashCode` 值相等，那这两个对象不一定相等（哈希碰撞）。
- 如果两个对象的`hashCode` 值相等并且`equals()`方法也返回 `true`，我们才认为这两个对象相等。
- 如果两个对象的`hashCode` 值不相等，我们就可以直接认为这两个对象不相等。



### 为什么重写 equals() 时必须重写 hashCode() 方法？

因为两个相等的对象的 `hashCode` 值必须是相等。也就是说如果 `equals` 方法判断两个对象是相等的，那这两个对象的 `hashCode` 值也要相等。

如果重写 `equals()` 时没有重写 `hashCode()` 方法的话就可能会导致 `equals` 方法判断是相等的两个对象，`hashCode` 值却不相等。

总结：

- `equals` 方法判断两个对象是相等的，那这两个对象的 `hashCode` 值也要相等。
- 两个对象有相同的 `hashCode` 值，他们也不一定是相等的（哈希碰撞）。



## 代码块

- 普通代码块：在方法或语句中出现的{}，就被称为代码块
- 静态代码块：静态代码块有且仅加载一次，也就是在这个类被加载至内存的时候

- 普通代码块和一般语句执行顺序由他们在代码中出现的次序决定，先出现先执行。

- **构造代码块**比构造方法更高一级，会在每次创建对象时调用，并先于构造方法，随构造方法一起调用。

  ```java
  public class CodeBlock02 {
      {
          System.out.println("第二构造块33333");
      }
  
      public  CodeBlock02() {
          System.out.println("构造方法2222");
      }
  
      {
          System.out.println("第一构造块33333");
      }
  
      public static void main(String[] args) {
          new CodeBlock02();
          System.out.println("==========");
          new CodeBlock02();
      }
  }
  ```

  运行结果

  ```bash
  第二构造块33333
  第一构造块33333
  构造方法2222
  ==========
  第二构造块33333
  第一构造块33333
  构造方法2222
  ```

- **静态代码块**在类加载到内存时执行且只执行一次，并先于构造代码块。

- 静态代码块在类加载时必须执行。存在父子关系时，必须先加载父类，再加载子类。然后子类构造方法隐含super()优先调用父类构造方法。所以执行顺序是：

  父类静态代码块-子类静态代码块-父类构造代码块-父类构造方法-子类构造代码块-子类构造方法。

  ```java
  class Father {
      {
          System.out.println("我是父亲代码块");
      }
      public Father() {
          System.out.println("我是父亲构造");
      }
      static {
          System.out.println("我是父亲静态代码块");
      }
  }
  class Son extends Father{
      public Son() {
          System.out.println("我是儿子构造");
      }
      {
          System.out.println("我是儿子代码块");
      }
  
      static {
          System.out.println("我是儿子静态代码块");
      }
  }
  public class CodeBlock04 {
  
      public static void main(String[] args) {
  
          System.out.println("我是主类======");
          new Son();
          System.out.println("======");
          new Son();
          System.out.println("======");
          new Father();
      }
  }
  ```

  运行结果

  ```bash
  我是主类======
  我是父亲静态代码块
  我是儿子静态代码块
  我是父亲代码块
  我是父亲构造
  我是儿子代码块
  我是儿子构造
  ======
  我是父亲代码块
  我是父亲构造
  我是儿子代码块
  我是儿子构造
  ======
  我是父亲代码块
  我是父亲构造
  ```



## 深拷贝与浅拷贝

### 结论

- **浅拷贝**：在堆上创建一个新的对象，如果原对象内部属性有引用类型，则复制内部对象的引用地址。也就是说拷贝对象与原对象公用内部引用类型成员变量。
- **深拷贝**：完全复制一个对象，包含这个对象包含的内部对象。



### 浅拷贝

实现 `Cloneable` 接口，并重写 `clone()` 方法，直接调用的是父类 `Object` 的 `clone()` 方法。

```java
public class Address implements Cloneable{
    private String name;
    // 省略构造函数、Getter&Setter方法
    @Override
    public Address clone() {
        try {
            return (Address) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}

public class Person implements Cloneable {
    private Address address;
    // 省略构造函数、Getter&Setter方法
    @Override
    public Person clone() {
        try {
            Person person = (Person) super.clone();
            return person;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}
```

如上 Person类包含一个Address属性，这个时候调用Person的clone方法：

```java
Person person1 = new Person(new Address("武汉"));
Person person1Copy = person1.clone();
// true
System.out.println(person1.getAddress() == person1Copy.getAddress());
```

此时person1Copy与person1的address属性是同一个对象。



### 深拷贝

手动重写`Person` 类的 `clone()` 方法，让`Person` 对象内部的 `Address` 对象一起复制。

```java
@Override
public Person clone() {
    try {
        Person person = (Person) super.clone();
        person.setAddress(person.getAddress().clone());
        return person;
    } catch (CloneNotSupportedException e) {
        throw new AssertionError();
    }
}
```

这个时候调用Person的clone方法：

```java
Person person1 = new Person(new Address("武汉"));
Person person1Copy = person1.clone();
// false
System.out.println(person1.getAddress() == person1Copy.getAddress());
```

此时person1Copy与person1的address属性不是同一个对象。



### 引用拷贝

两个不同的引用指向同一个对象。





## 分布式锁



### 集群环境下保证ID不重复

原来的Synchronized + Lock只能锁单机，也就是只能在一个JVM环境下;

而在分布式+集群的环境下，变成了N对N的关系，在并发的环境下，如果使用UUID或者自增ID，就可能出现ID重复的问题，因此在集群下的环境下，对JVM进行加锁，这就是分布式锁。

在小厂的解决方案：也就是QPS（每秒查询数/吞吐量） < 2000的公司，有以下三种方案

- mysql数据库的乐观锁实现
- redis：redission
- zookeeper：（服务治理 和 服务注册）



### 单机环境下的锁

场景：订单服务OrderService的getOrderNumber生成订单号，在并发情况下可能生成重复的情况。

#### 原代码

```java
public class OrderNumberCreateUtil {
    private static int num = 0;

    public String getOrderNumber() {
        return "\t 生成订单号：" + (++num);
    }

}
public class OrderService {
    private OrderNumberCreateUtil orderNumberCreateUtil = new OrderNumberCreateUtil();

    public String getOrderNumber() {
        return orderNumberCreateUtil.getOrderNumber();
    }
}
```

客户端并发50个线程生成订单号

```java
public class Client {
    public static void main(String[] args) {
        OrderService orderService = new OrderService();

        for (int i = 0; i < 50; i++) {
            new Thread(() -> {
                String str = orderService.getOrderNumber();
                System.out.println(str);
            }, String.valueOf(i)).start();
        }
    }
}
```

结果

```shell
生成订单号：1
生成订单号：3
生成订单号：2
生成订单号：4
生成订单号：5
生成订单号：1
生成订单号：6
生成订单号：7
生成订单号：8
生成订单号：9
生成订单号：10
生成订单号：11
生成订单号：12
生成订单号：13
生成订单号：14
生成订单号：15
...
```



#### 单机加锁

解决方案是，在Service层调用生成订单号的时候，加锁保证同一时间只能有一个线程调用这个订单号生成，从而保证num正常递增。

```java
 //lock 应该申明为类的成员变量
private Lock lock = new ReentrantLock();
public String getOrderNumber() {
    lock.lock();
    try {
        return orderNumberCreateUtil.getOrderNumber();
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        lock.unlock();
    }
    return null;
}
```



### Zookeeper实现分布式锁

因为Zookeeper在创建节点的时候，需要保证节点的唯一性，也就是实现原理就是，每次一个线程获取到了锁，那就在Zookeeper上创建一个临时节点，但用完锁之后，再把这个节点删除掉

```
create /node v0410  # 创建一个持久节点
crate -e /node v0410 # 创建一个临时节点
```

对于单进程的并发场景，我们可以使用synchronized关键字和Reentrantlock等

对于 分布式场景，我们可以使用分布式锁。

#### 创建锁

多个JVM服务器之间，同时在zookeeper上创建相同一个临时节点，因为临时节点路径是保证唯一，只要谁能创建节点成功，谁就能获取到锁。

没有创建成功节点，只能注册个监听器监听这个锁并进行等待，当释放锁的时候，采用事件通知给其它客户端重新获取锁的资源。

这时候客户端使用事件监听，如果该临时节点被删除的话，重新进入获取锁的步骤。

#### 释放锁

Zookeeper使用直接关闭临时节点session会话连接，因为临时节点生命周期与session会话绑定在一块，如果session会话连接关闭，该临时节点也会被删除，这时候客户端使用事件监听，如果该临时节点被删除的话，重新进入到获取锁的步骤。



#### 模板模式

##### 概念

在模板模式（Template Pattern）设计模式中，用一个抽象类公开定义了执行它的方法的方式、模板。它的子类可以按需要重写方法实现，但调用将以抽象类中定义的方式进行

意图：定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构，即可重定义该算法的某些特定步骤：

主要解决：一些方法通用，却在每个子类都重新写了这一方法

何时使用：在一些通用的方法

如何解决：将这些通用算法抽象出来

关键代码：在抽象父类中实现通用方法，其它步骤下放到子类中实现

##### 应用

- spring中对Hibernate的支持，将一些定好的方法封装起来，比如开启事务，获取Session，关闭Session，程序要不需要重复写那些已经规范好的代码，直接丢一个实体就可以保存。

##### 优缺点

###### 优点

- 封装不变部分，扩展可变部分
- 提取公共代码，便于维护
- 行为由父类控制，子类实现

###### 缺点

- 每一个不同的实现，都需要一个子类来实现，导致类的个数增加，使得系统变庞大

##### 使用场景

- 有很多子类共有的方法，且逻辑相同
- 重要的、复杂的方法，可以考虑模板方法



#### 代码实现

利用模板模式创建一个分布式锁类

```java
//	定义一个zkLock的接口 定义两个方法，zkLock上锁/zkUnlock释放锁
public interface ZkLock {

    public void zkLock();

    public void zkUnlock();
}
//	抽象类中继承该接口，同时实现 zkLock 和 zkUnLock 的方法（模板方法模式）
//	同时我们在抽象类里，又定义了两个抽象方法，zkWaitLock等待锁 和 tryLock尝试获得锁
public abstract class ZkAbstractTemplateLock implements ZkLock{

    @Override
    public void zkLock() {
        // 尝试获取锁
        if(tryLock()) {
            System.out.println(Thread.currentThread().getName() + "\t 占用锁成功");
        } else {
            // 等待锁
            waitZkLock();
            // 重新调用获取锁的方法
            zkLock();
        }
    }

    /**
     * 定义两个抽象方法，一个是尝试锁，一个是等待锁
     * @return
     */
    public abstract boolean tryLock();

    public abstract void waitZkLock();

    @Override
    public void zkUnlock() {

    }
}
//	后续是定义实体类继承抽象类，实现 等待锁 和 尝试获得锁，这个类就是一个分布式锁
public class ZkDistributedLock extends ZkAbstractTemplateLock{
    @Override
    public boolean tryLock() {
        // 判断节点是否存在，如果存在则返回false，否者返回true
        return false;
    }

    @Override
    public void waitZkLock() throws InterruptedException {
        // 等待锁的时候，需要加监控，查询这个lock是否释放

        CountDownLatch countDownLatch = new CountDownLatch(1);

        countDownLatch.await();

        // 解除监听
    }
}
```

用这个分布式锁对获取订单号进行上锁

```java
public class OrderService {
    private OrderNumberCreateUtil orderNumberCreateUtil = new OrderNumberCreateUtil();

    public void getOrderNumber() {
        ZkLock zkLock = new ZkDistributedLock();
        zkLock.zkLock();
        try {

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            zkLock.zkUnlock();
        }
        System.out.println(orderNumberCreateUtil.getOrderNumber());
    }
}
```



## 前后端分离项目解决跨域问题

### 跨域

跨域资源共享([CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS)) 是一种机制，它使用额外的 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头来告诉浏览器，让一个 运行在origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。

当一个资源从与该资源本身所在的服务器**不同的域、协议或端口**请求一个资源时，资源会发起一个**跨域 HTTP 请求**。

出于安全原因，浏览器限制从脚本内发起的跨源HTTP请求。 例如，XMLHttpRequest和Fetch API遵循同源策略。 这意味着使用这些API的Web应用程序只能从加载应用程序的同一个域请求HTTP资源，除非响应报文包含了正确CORS响应头。

### CORS头

| 内容                                                         | 含义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`Access-Control-Allow-Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) | 指示请求的资源能共享给哪些域。                               |
| [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials) | 指示当请求的凭证标记为 true 时，是否响应该请求。             |
| [`Access-Control-Allow-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Headers) | 用在对预请求的响应中，指示实际的请求中可以使用哪些 HTTP 头。 |
| [`Access-Control-Allow-Methods`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Methods) | 指定对预请求的响应中，哪些 HTTP 方法允许访问请求的资源。     |
| [`Access-Control-Expose-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers) | 指示哪些 HTTP 头的名称能在响应中列出。                       |
| [`Access-Control-Max-Age`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Max-Age) | 指示预请求的结果能被缓存多久。                               |
| [`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers) | 用于发起一个预请求，告知服务器正式请求会使用那些 HTTP 头。   |
| [`Access-Control-Request-Method`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method) | 用于发起一个预请求，告知服务器正式请求会使用哪一种 [HTTP 请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)。 |
| [`Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin) | 指示获取资源的请求是从什么域发起的。                         |



### Spring跨域校验

Spring 中对 CORS 规则的校验，都是通过委托给 DefaultCorsProcessor实现的。

DefaultCorsProcessor 处理过程如下：

1. 判断依据是 Header中是否包含 Origin。如果包含则说明为 CORS请求，转到 2；否则，说明不是 CORS 请求，不作任何处理。

2. 判断 response 的 Header 是否已经包含 Access-Control-Allow-Origin，如果包含，证明已经被处理过了, 转到 3，否则不再处理。

3. 判断是否同源，

   - 如果是则转交给负责该请求的类处理；

   - 如果不是则检查是否配置了 CORS 规则

     - 如果没有配置，且是预检请求，则拒绝该请求；

     - 如果没有配置，且不是预检请求，则交给负责该请求的类处理；

     - 如果配置了，则对该请求进行校验。 校验就是根据 CorsConfiguration 这个类的配置进行判断：

       - 判断 origin 是否合法
       - 判断 method 是否合法
       - 判断 header是否合法

       如果全部合法，则在 response header中添加响应的字段，并交给负责该请求的类处理，如果不合法，则拒绝该请求。



### 解决方案

#### 实现WebMvcConfigurer接口

```java
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            //配置允许跨域访问的路径
            registry.addMapping("/**/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true)
                .exposedHeaders("")
                .maxAge(3600);
        }
    };
}
```

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * 跨域支持
     * @param registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowCredentials(true)
                .allowedMethods("GET", "POST", "DELETE", "PUT")
                .maxAge(3600 * 24);
    }

}
```

#### 覆盖默认的CorsFilter

```java
@Bean
public CorsFilter corsFilter() {
    CorsConfiguration config = new CorsConfiguration();
    //允许所有域名进行跨域调用
    config.addAllowedOrigin("*");
    //允许跨越发送cookie
    config.setAllowCredentials(true);
    //放行全部原始头信息
    config.addAllowedHeader("*");
    //允许所有请求方法跨域调用
    config.addAllowedMethod("*");
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
}
```





### 刷新token时将token通过cookie传递的跨域问题

存在这样的需求，就是token即将过期时需要进行刷新，后台通过cookie将新的token传给前端。

前端axios需要配置 withCredentials=true 才能接收到后端传递的结果：

```javascript
// 创建axios实例
const service = axios.create({
  baseURL: '', // api 的 base_url
  withCredentials: true, //允许后台的cookie传递到前端
  timeout: 100000 // 请求超时时间
})
```

> #### XMLHttpRequest 的 withCredentials 属性
>
> - 默认值为false。在获取同域资源时设置 withCredentials 没有影响。
> - true：在跨域请求时，会携带用户凭证
> - false：在跨域请求时，不会携带用户凭证；返回的 response 里也会忽略 cookie

存在后端用这种方式配置跨域：

```java
private CorsConfiguration buildConfig() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.addAllowedOrigin("*");
    corsConfiguration.addAllowedHeader("*");
    corsConfiguration.addAllowedMethod("*");
    return corsConfiguration;
}

/**
  * 跨域过滤器
  *
  * @return
  */
@Bean
public CorsFilter corsFilter() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", buildConfig());
    return new CorsFilter(source);
}
```

会产生跨域错误，使token无法通过cookie传递。

![image-20200612152510503](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200612152510503.png)

而用上面的解决方案是可以传递的。



### 图片跨域

静态资源的访问选择通过nginx代理直接访问，则此时跨域配置需要在nginx进行配置。

方式是在对应静态资源配置添加如下：

```nginx
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,lang,access-token';
if ($request_method = 'OPTIONS') {
    return 204;
}
```

含义就是添加了三个请求头，以及一个请求方式判定。



## AQS（抽象队列同步器）的理解

AQS：AbstractQueuedSynchronizer 抽象队列同步器

AQS是一个抽象类，是我们用到的锁的基础，例如我们经常用到的

- ReentrantLock
- Semaphore
- CountdownLatch
- ReentrantReadWriteLock
- .....

> 不熟悉 暂时搁置  http://note.moguit.cn/#/./Java/%E8%B0%88%E8%B0%88%E4%BD%A0%E5%AF%B9AQS%E7%9A%84%E7%90%86%E8%A7%A3/README



## JWT

JWT是JSON WEB TOKEN的缩写，它是基于 RFC 7519 标准定义的一种可以安全传输的的JSON对象，由于使用了数字签名，所以是可信任和安全的。

### 组成

- JWT token的格式：header.payload.signature

- header中用于存放签名的生成算法

  ```json
  {"alg": "HS512"}
  ```

- payload中用于存放用户名、token的生成时间和过期时间

  ```json
  {"sub":"admin","created":1489079981393,"exp":1489684781}
  ```

- signature为以header和payload生成的签名，一旦header和payload被篡改，验证将失败

  ```java
  //secret为加密算法的密钥
  String signature = HMACSHA512(base64UrlEncode(header) + "." +base64UrlEncode(payload),secret)
  ```



### 实例

在该网站上获得解析结果：https://jwt.io/

如：

```sh
eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1NTY3NzkxMjUzMDksImV4cCI6MTU1NzM4MzkyNX0.d-iki0193X0bBOETf2UN3r3PotNIEAV7mzIxxeI5IxFyzzkOZxS0PGfF_SK6wxCv2K8S0cZjMkv6b5bCqc0VBw
```

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/arch_screen_13.fc3ff0ff.png)



### 实现认证和授权的原理

- 用户调用登录接口，登录成功后获取到JWT的token；
- 之后用户每次调用接口都在http的header中添加一个叫Authorization的头，值为JWT的token；
- 后台程序通过对Authorization头中信息的解码及数字签名校验来获取其中的用户信息，从而实现认证和授权。



## Ant风格

就是一种**路径匹配表达式**。主要用来对`uri`的匹配。其实跟正则表达式作用是一样的，只不过正则表达式适用面更加宽泛，`Ant`仅仅用于路径匹配。

### Ant通配符

| 通配符 | 含义                                   |
| ------ | -------------------------------------- |
| ？     | 匹配单字符                             |
| \*     | 匹配零个或任意数量个字符               |
| \**    | 匹配零层或任意层目录路径，等价\*/*/... |

> 单个`*` 是在一个目录内进行匹配。 而`**` 是可以匹配多个目录。

### 应用

| 路径           |                                                    |
| -------------- | -------------------------------------------------- |
| /mapper/\*.xml | 匹配mapper目录下的所有xml文件                      |
| /page/size?    | 匹配/page/size1和/page/sizeM，不匹配/page/size     |
| /\**/a.xml     | 匹配任意目录下的a.xml文件                          |
| /src/file.\*   | 匹配src目录下所有file文件，如file.java，file.class |
| /\**/\*.java   | 匹配任意目录的java文件                             |

### 最长匹配原则

一旦一个`uri` 同时符合两个`Ant`匹配那么走匹配规则字符最多的。

为什么走最长？因为字符越长信息越多就越具体。

如/mapper/pms/product.xml，对应两个/\**/\*.xml和/mapper/pms/\*.xml两个路径匹配，最后会匹配到第二个。



# OSI 和 TCP/IP 网络分层模型

[参考](https://javaguide.cn/cs-basics/network/osi&tcp-ip-model.html#osi-%E4%B8%83%E5%B1%82%E6%A8%A1%E5%9E%8B)

## OSI 七层模型

是国际标准化组织提出一个网络分层模型，其大体结构以及每一层提供的功能如下图所示

![osi七层模型](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dsdgfsdfsgd.jpg)

![osi七层模型2](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/isodfsfsdfsfsfsfd.png)

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/osi-model-detail.1163138b.png)



##  TCP/IP 四层模型

**TCP/IP 四层模型** 是目前被广泛采用的一种模型，我们可以将 TCP / IP 模型看作是 OSI 七层模型的精简版本。

由以下 4 层组成：

1. 应用层
2. 传输层
3. 网络层
4. 网络接口层

### 与OSI模型的简单对应关系

![TCP-IP-4-model](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/TCP-IP-4-model.a534f46f.png)



### 应用层（Application layer）

位于传输层之上，

主要提供**两个终端设备上的应用程序之间信息交换的服务**，它定义了信息交换的格式，消息会交给下一层传输层来传输。

我们把应用层交互的数据单元称为报文。

#### 应用层协议

应用层协议定义了网络通信规则，对于不同的网络应用需要不同的应用层协议。在互联网中应用层协议很多，如：

- 支持 Web 应用的 HTTP 协议
- 支持电子邮件的 SMTP 协议
- ...

### 传输层（Transport layer）

主要任务就是负责**向两台终端设备进程之间的通信**提供**通用的数据传输服务**。 

应用进程利用该服务传送应用层报文。

“通用的”是指并不针对某一个特定的网络应用，而是多种应用可以使用同一个运输层服务。

#### 传输层协议

主要使用一下两种

1. **传输控制协议 TCP（Transmisson Control Protocol）**：提供**面向连接**的，**可靠的**数据传输服务。
2. **用户数据协议 UDP**（User Datagram Protocol）：提供**无连接**的，尽最大努力的数据传输服务（**不保证数据传输的可靠性**）。

### 网络层（Network layer）

负责为**分组交换网上的不同主机提供通信服务**。

在发送数据时，网络层把运输层产生的报文段或用户数据报封装成分组和包进行传送。

在 TCP/IP 体系结构中，由于网络层使用 IP 协议，因此分组也叫 IP 数据报，简称数据报。

**还有一个任务就是选择合适的路由，使源主机运输层所传下来的分组，能通过网络层中的路由器找到目的主机。**

网络层中的“网络”二字已经不是我们通常谈到的具体网络，而是指计算机网络体系结构模型中第三层的名称。

> 互联网是由大量的异构（heterogeneous）网络通过路由器（router）相互连接起来的。
>
> 互联网使用的网络层协议是无连接的网际协议（Intert Prococol）和许多路由选择协议，因此互联网的网络层也叫做**网际层**或**IP 层**。

### 网络接口层（Network interface layer）

是数据链路层和物理层的合体

1. **数据链路层(data link layer)**通常简称为链路层（ 两台主机之间的数据传输，总是在一段一段的链路上传送的）。

   数据链路层的作用是**将网络层交下来的 IP 数据报组装成帧，在两个相邻节点间的链路上传送帧。**每一帧包括数据和必要的控制信息（如同步信息，地址信息，差错控制等）。

2. **物理层**的作用是**实现相邻计算机节点之间比特流的透明传送**，尽可能屏蔽掉具体传输介质和物理设备的差异



## 为什么网络要分层？

1. **各层之间相互独立**：各层之间相互独立，各层之间不需要关心其他层是如何实现的，只需要知道自己如何调用下层提供好的功能就可以了（可以简单理解为接口调用）。

   **这个和我们对开发时系统进行分层是一个道理。**

2. **提高了整体灵活性** ：每一层都可以使用最适合的技术来实现，你只需要保证你提供的功能以及暴露的接口的规则没有改变就行了。

   **这个和我们平时开发系统的时候要求的高内聚、低耦合的原则也是可以对应上的。**

3. **大问题化小** ： 分层可以将复杂的网络间题分解为许多比较小的、界线比较清晰简单的小问题来处理和解决。这样使得复杂的计算机网络系统变得易于设计，实现和标准化。

    **这个和我们平时开发的时候，一般会将系统功能分解，然后将复杂的问题分解为容易理解的更小的问题是相对应的，这些较小的问题具有更好的边界（目标和接口）定义。**



# 领域驱动设计

DDD（Domain-Driven Design 领域驱动设计）

开发团队和领域专家一起通过 通用语言(Ubiquitous Language)去理解和消化领域知识，从领域知识中提取和划分为一个一个的子领域（核心子域，通用子域，支撑子域），并在子领域上建立模型，再重复以上步骤，这样周而复始，构建出一套符合当前领域的模型。

