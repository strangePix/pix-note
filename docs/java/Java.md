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





## 面向对象

### 三大特性



- **封装**

  利用抽象数据类型将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体。

  数据被保护在抽象数据类型的内部，尽可能地隐藏内部的细节，只保留一些对外接口使之与外部发生联系。

  用户无需知道对象内部的细节，但可以通过对象对外提供的接口来访问该对象。

  **优点**

  - **减少耦合**：可以独立地开发、测试、优化、使用、理解和修改
  - **减轻维护的负担**：可以更容易被程序员理解，并且在调试的时候可以不影响其他模块
  - **有效地调节性能**：可以通过剖析确定哪些模块影响了系统的性能
  - **提高软件的可重用性**
  - **降低了构建大型系统的风险**：即使整个系统不可用，但是这些独立的模块却有可能是可用的

  

- **继承**

  继承实现了 **IS-A** 关系，例如 Cat 和 Animal 就是一种 IS-A 关系，因此 Cat 可以继承自 Animal，从而获得 Animal 非 private 的属性和方法。

  继承应该遵循里氏替换原则，子类对象必须能够替换掉所有父类对象。

  父类引用指向子类对象称为 **向上转型** 。

  

- **多态**

  多态分为编译时多态和运行时多态：

  - **编译时多态**：主要指方法的重载

  - **运行时多态**：指程序中定义的对象引用所指向的具体类型在运行期间才确定

    > 运行时多态有三个条件：
    >
    > - 继承
    > - 覆盖/重写
    > - 向上转型









## 数据类型



### 基本数据类型

- 六种数字类型：
  - 四种整数类型：`byte`，`short`，`int`，`long`
  - 两种浮点型：`float`，`double`
- 一种字符类型：`char`
- 一种布尔类型：`boolean`

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



### 包装类

#### 包装类型与基本类型的区别

- **默认值**：包装类不赋值默认为null，基本类型有默认值且不为null

- **泛型类型**：包装类型可用于泛型，基本类型不能

- **存储位置**：

  - 基本数据类型的局部变量存放在虚拟机栈的局部变量表中，基本数据类型的成员变量（非静态）存放在虚拟机堆中。
  - 包装类型属于对象类型，几乎所有对象实例均存在于堆中。

  > - **"几乎所有对象实例均存在于堆中"**
  >
  >   HotSpot 虚拟机引入了 JIT 优化之后，会对对象进行逃逸分析，如果发现某一个对象并没有逃逸到方法外部，那么就可能通过标量替换来实现栈上分配，而避免堆上分配内存。
  >
  > - **基本数据类型存放在栈中是一个常见的误区！** 
  >
  >   基本数据类型的成员变量如果没有被 `static` 修饰的话（不建议这么使用，应该要使用基本数据类型对应的包装类型），就存放在堆中。

- **空间**：相对于包装类型，基本数据类型占用空间极小。



#### 包装类型的缓存机制/缓存池

Java 基本数据类型的包装类型的大部分都用到了缓存机制来提升性能。

- 通过new方式每次都会创建新的对象，而通过valueOf()会使用缓存池中的对象。

  > valueOf() 方法的实现比较简单，就是先判断值是否在缓存池中，如果在的话就直接返回缓存池的内容。
  >
  > ```java
  > public static Integer valueOf(int i) {
  >     if (i >= IntegerCache.low && i <= IntegerCache.high)
  >         return IntegerCache.cache[i + (-IntegerCache.low)];
  >     return new Integer(i);
  > }
  > ```

- 所有包装类都有对应的缓存池，其范围：
  - `Byte`,`Short`,`Integer`,`Long`： **[-128,127]**  （包含了全部byte值）
  - `Character` ： **[0,127]**，对应**[\u0000,\u007F]**
  - `Boolean`： **True**和**False**
- 如果超出对应范围仍然会去创建新的对象，缓存的范围区间的大小只是在性能和资源之间的权衡。
- 两种浮点数类型的包装类 `Float`,`Double` 并没有实现缓存机制。



##### Integer缓存源码

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



##### 整形包装类对象之间的值比较，建议用equals方法

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/20210422164544846.png)



#### 自动装箱与拆箱

**概念**

- **装箱**：将基本类型用它们对应的引用类型包装起来；
- **拆箱**：将包装类型转换为基本数据类型；

**本质**

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

**性能问题**

如果频繁拆装箱的话，也会严重影响系统的性能。我们应该尽量避免不必要的拆装箱操作



## String 字符串



### String的不可变性

#### 不可变性的实现

`String` 类中使用 `final` 关键字修饰字符数组来保存字符串。

```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
    private final char value[];
	//...
}
```

- 保存字符串的数组被 `final` 修饰且为私有的，并且`String` 类没有提供/暴露修改这个字符串的方法。

  意味着value数组在初始化之后不能再修改为其他数组引用，也不能修改该数组的内容。

- `String` 类被 `final` 修饰导致其不能被继承，进而避免了子类破坏 `String` 的内容。

#### 不可变的好处

[参考](https://www.programcreek.com/2013/04/why-string-is-immutable-in-java/)

1. **可以缓存hash值**

   因为 String 的 hash 值经常被使用，例如 String 用做 HashMap 的 key值。

   不可变的特性可以使得 hash 值也不可变，因此只需要进行一次计算。

2. **字符串常量池的需要**

   如果一个 String 对象已经被创建过了，那么就会从 String Pool 中取得引用。

   只有 String 是不可变的，才可能使用 String Pool。

3. **安全性**

   String 经常作为参数，String 不可变性可以保证参数不可变。

   例如在作为网络连接参数的情况下如果 String 是可变的，那么在网络连接过程中，String 被改变，改变 String 对象的那一方以为现在连接的是其它主机，而实际情况却不一定是。

4. **线程安全**

   String 不可变性天生具备线程安全，可以在多个线程中安全地使用。



### 为何要将 String 的底层实现由 `char[]` 改成了 `byte[]` ?

在 Java 9 之后，`String` 、`StringBuilder` 与 `StringBuffer` 的实现改用 `byte` 数组存储字符串。

```java
public final class String implements java.io.Serializable,Comparable<String>, CharSequence {
// @Stable 注解表示变量最多被修改一次，称为“稳定的”。
@Stable
private final byte[] value;
}

abstract class AbstractStringBuilder implements Appendable, CharSequence {
byte[] value;

}
```



新版的 String 其实支持两个编码方案： Latin-1 和 UTF-16。

如果字符串中包含的汉字没有超过 Latin-1 可表示范围内的字符，那就会使用 Latin-1 作为编码方案。Latin-1 编码方案下，`byte` 占一个字节(8 位)，`char` 占用 2 个字节（16），`byte` 相较 `char` 节省一半的内存空间。

JDK 官方就说了绝大部分字符串对象只包含 Latin-1 可表示的字符。

如果字符串中包含的汉字超过 Latin-1 可表示范围内的字符，`byte` 和 `char` 所占用的空间是一样的。

参考：https://openjdk.java.net/jeps/254 

（节约空间）



### 字符串类型的选择：String/StringBuffer/StringBuilder

- **可变性**
  - String不可变
  - StringBuffer与StringBuilder可变
- **线程安全**
  - String不可变，所以线程安全
  - StringBuilder线程不安全
  - StringBuffer线程安全，内部使用synchronized进行同步



### 字符串拼接用 '+' 还是 StringBuilder?

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



### 字符串常量池

**字符串常量池** 是 JVM 为了提升性能和减少内存消耗针对字符串（String 类）专门开辟的一块区域，主要目的是为了避免字符串的重复创建。



#### String.intern()方法：返回常量池引用

##### 作用

`String.intern()` 是一个 native（本地）方法，其作用是将指定的字符串对象的引用保存在字符串常量池中，从而保证**相同内容的字符串变量引用同一的内存对象**。

##### 处理方式

分为两种情况：

- 如果字符串常量池中保存了对应的字符串对象的引用，就直接返回该引用。
- 如果字符串常量池中没有保存对应的字符串对象的引用，那就在常量池中创建一个指向该字符串对象的引用并返回。

示例：

```java
// 在堆中创建字符串对象”Java“
// 将字符串对象”Java“的引用保存在字符串常量池中
String s1 = "Java";
// 直接返回字符串常量池中字符串对象”Java“对应的引用
String s2 = s1.intern();
// 在堆中在单独创建一个字符串对象
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

> intern方法返回这个对象的字符串常量池的引用，有就直接返回，没有就加入常量池再返回。
>
> 与调用方法的对象本身没有必然关联，不一定是同一个对象。



#### （HotSpot中）字符串常量池的存放位置

##### 运行时常量池与字符串常量池的关系

- 运行时常量池 在虚拟机规范中是方法区的一部分，在加载类和结构到虚拟机后，就会创建对应的运行时常量池。
- 字符串常量池是这个过程中存放常量字符串的位置。

##### 方法区、永久代、元空间、堆区的区别

- 字符串常量池属于运行时常量池，属于方法区，是一种逻辑上的概念
- 堆区、永久代、元空间是实际的位置
- 不同虚拟机对规范实现不同，如对方法区的实现。只有HotSpot有永久代的概念。
- HotSpot也在发展，逐渐考虑去永久代，对于不同版本JDK，用到永久代的地方会不太一样。

##### 再看HotSpot中字符串常量池的存放

- **jdk1.6及之前**
  - 此时的方法区由永久代实现
  - 运行时常量池（含字符串常量池），静态变量存放在永久代上
- **jdk1.7**
  - 逐步“去永久代”，此时方法区由永久代和堆共同实现
  - 永久代存放 类型信息、字段、方法、常量；堆存放 字符串常量池、静态变量
- **jdk1.8及之后**
  - 取消永久代，方法区由元空间和堆共同实现
  - 本地内存的元空间存放 类型信息、字段、方法、常量；堆存放字符串常量池、静态变量



## BigDecimal

`BigDecimal` 可以实现对浮点数的运算，不会造成精度丢失。

通常情况下，大部分需要浮点数精确运算结果的业务场景（比如涉及到钱的场景）都是通过 `BigDecimal` 来做的。



### BigDecimal常见方法及注意事项

#### 创建

- 推荐使用构造方法或者valueOf静态方法来创建对象。

  ```java
  BigDecimal num1 = new BigDecimal(1);
  BigDecimal num2 = BigDecimal.valueOf(1);
  ```

- 防止精度丢失，创建时的传参不要使用浮点类型，如double；

  相应地，使用String类型。

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202207290039354.png)

#### 四则运算

- add加法；subtract减法；multiply乘法；divide除法

  ```java
  BigDecimal a = new BigDecimal("1.0");
  BigDecimal b = new BigDecimal("0.9");
  System.out.println(a.add(b));// 1.9
  System.out.println(a.subtract(b));// 0.1
  System.out.println(a.multiply(b));// 0.90
  System.out.println(a.divide(b));// 无法除尽，抛出 ArithmeticException 异常
  System.out.println(a.divide(b, 2, RoundingMode.HALF_UP));// 1.11
  ```

- 除法存在除不尽的情况，需要设置保留规则，尽量使用三个参数的版本

  - 如果不设置，无限循环小数会抛出`ArithmeticException`异常

  - `scale` 表示要保留几位小数，`roundingMode` 代表保留规则

    ```java
    public BigDecimal divide(BigDecimal divisor, int scale, RoundingMode roundingMode) {
        return divide(divisor, scale, roundingMode.oldMode);
    }
    ```

  - 保留规则`RoundingMode`尽量不要设置`UNNECESSARY`，即不控制。



#### 大小比较



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









### 同步/异步/阻塞/非阻塞

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
>  通过分段锁的方式提高了并发度。
>
>  分段是一开始就确定的了，后期不能再进行扩容的，其中的段Segment继承了重入锁ReentrantLock，有了锁的功能，同时含有类似HashMap中的数组加链表结构（这里没有使用红黑树），虽然Segment的个数是不能扩容的，但是单个Segment里面的数组是可以扩容的。

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
  >  return nextHashCode.getAndAdd(HASH_INCREMENT);
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
>  ```java
>  int n = 10;
>  Runnable runnable = () -> {
>   System.out.println("hello lambda" + n);
>  };
>  ```

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
>      Comparator<Integer> comparator = (x, y) -> Integer.compare(x, y);
>  }
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



## 方法引用与构造器引用::

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



