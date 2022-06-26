



# 面试突击版

https://snailclimb.gitee.io/javaguide-interview/#/

# Java

## Java基础

### 概念

#### JDK与JRE区别

- JDK：Java开发工具包，提供java开发环境与运行环境
- JRE：Java运行时环境，提供java运行所需环境,包含java虚拟机,基础类库等

具体：

- JDK包含了JRE，还包含java源码编译器javac和监控工具,分析工具等
- 运行java程序只需要JRE，开发编写java程序需要JDK





#### JVM是什么?

- Java虚拟机的缩写(Java Virtual Machine)
- 实现跨平台性核心部分
- class文件在JVM执行,解释给操作系统执行
- 有自己的指令集,解释自身指令集用于CPU指令集和调用系统资源
- 只关注被编译的class文件,不关心java源文件





#### 为什么说Java语言解释与编译并存

**高级语言的执行方式**

- **编译型**：通过编译器，将源代码一次性编译为平台可执行的机器码，执行效率较快，开发效率较低。
- **解释型**：通过解释器，一句一句将代码解释为机器代码后执行。开发啊效率较高，执行速度较慢。

![编译型语言和解释型语言](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/9908e5e6.png)

**Java的解释与编译并行**

- Java编写的程序通过编译，生成字节码文件。这个是编译过程
- 字节码文件由Java解释器解释执行。这个是解释过程



#### 面向过程、面向对象、面向切面的理解

都是编程范式：编程时秉承的思想与风格



##### 面向过程OPP

**理解**

采用自顶向下、分而治之的方法，将整个程序按功能划分为几个可独立编程的子过程模块，

每一子模块完成指定的子任务，主过程通过调用各子过程完来成全部处理工作。

**优点**：性能较好,单片机\嵌入式开发\Linux等一般采用面向过程开发

**缺点**：相对没那么 易维护/易复用/易扩展



##### 面向对象oop

**理解:**

强调直接以现实世界中的物体为中心来思考和认识问题，

并按照这些事物的本质特征把它们抽象为类。

采用数据抽象和数据隐藏，类之间互相交互，共同构成大型的面向对象基础。

**优点**：因为封装/继承/多态特性,可以设计出低耦合系统,易维护易复用易扩展,系统更加灵活

**缺点**：性能较差



##### 面向切面aop

基于OOP延伸出来的编程思想。

指导我们通过找到平整切面的形式，插入新的代码，使新插入的代码对切面上下原有流程的伤害降到最低。

目的是针对业务处理过程中的切面进行提取，所面对的是处理过程中的某个步骤或阶段，以获得逻辑过程中各部分之间低耦合性的隔离效果。





#### 面向对象三大特性：封装/继承/多态

##### 封装

利用抽象数据类型将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体，

数据被保护在抽象数据类型的内部，尽可能地隐藏内部的细节，只保留一些对外接口使之与外部发生联系。

**目的**：增强安全性，简化编程，使用者不必了解具体实现细节,只需要通过外部接口使用类的成员

**基本要求**：

- 私有化类的成员属性
- 为成员属性提供公开的getter/setter方法
- 如果有带参的构造方法,那也要提供一个无参的构造方法
- 必要时可重写toString方法

**好处**：

- 减少耦合度
- 可自由修改类的内部结构
- 隐藏实现细节
- 对成员进行更精度的控制



##### 继承

使用已存在的类的定义作为基础建立新类的技术，新类的定义可以增加新的数据或新的功能，也可以用父类的功能，但不能选择性地继承父类。

**目的**：实现代码复用

**特点**：

- 子类可以访问父类的非私有属性方法(不同包的子类还不能访问default的父类属性方法)
- 子类可对父类进行扩展，拥有自己的属性和方法
- 子类可以用自己的方式实现父类方法(重写)

**缺点**：

- 父类变，子类必须变
- 继承破坏了封装，因为父类的实现细节对于子类是透明的
- 继承是强耦合关系



##### 多态

一个引用变量指向哪个类的实例对象，该引用变量发出的方法调用到底是哪个类中实现的方法，编程时不确定，在由程序运行期间才能决定。

**实现条件**：

- 继承：多态中存在有继承关系的父子类
- 重写：子类对父类方法进行重新定义，使得调用方法时改为调用子类重写的方法
- 向上转型：多态中将父类引用指向子类对象,保证该对象能同时调用父类子类的共同方法

**实现方式**：

- 基于继承:子类对继承自父类的方法进行重写
- 基于接口:实现类对于接口的方法进行不同的实现

**表现**：

- 方法重载：同一个类中，相同方法名，参数不同，对应的实现不同
- 成员覆盖：父子类中，允许有相同变量名的不同类成员属性；也允许有相同方法名但方法实现不同的成员方法

**好处**：提高程序的可扩展性与可维护性



#### 什么是向上转型/向下转型

**向上转型**

父类引用指向子类对象，不需要强制转换

**向下转型**

将指向子类的父类引用，赋给子类引用。需要强制转换



### 待分类

#### i++与++i作用与区别

相当于i = i+1;

区别：表达式参与运算时，i的实时值不一样

- i++中由i先参与运算，得出结果后，i的值再+1
- ++i中i的值先+1，再参与运算



#### 2*8的快捷算法

2<<3 = 16

- 位运算符<<,表示左移3位
- 二进制左移三位,相当于乘以2的3次方,即为8
- CPU位运算效率较高
- 左移运算在数值较大时可能出现溢出变为负值



#### &与&&作用与区别(以及|与||的区别)

**&**

- 逻辑与运算，全真则真，有假则假，两侧均为boolean时，返回boolean
- 按位与运算符，两侧均为int时，返回int
- &两边表达式都会参与运算

**&&**

- 短路与运算，全真则真，有假则假，返回boolean
- 无法运算int类型
- 连接的左侧表达式如果为false，则跳过右边表达式的运算

**|**

- 逻辑或运算，有真则真，全假则假，两侧均为boolean时，返回boolean
- 按位或运算符，两侧均为int时，返回int
- |两边表达式都会参与运算

**||**

- 短路或运算，全真则真，有假则假，返回boolean
- 无法运算int类型
- 连接的左侧表达式如果为true，则跳过右边表达式的运算



#### Math.round(-1.5)的值是多少

-1

原理是参数+0.5作向下取整

> ```java
> System.out.println(Math.round(1.4));   //1
> System.out.println(Math.round(1.5));   //2
> System.out.println(Math.round(1.6));   //2
> 
> System.out.println(Math.round(-1.4));  //-1
> System.out.println(Math.round(-1.5));  //-1
> System.out.println(Math.round(-1.6));  //-2
> ```
>
> - Math.
>
>   - ceil() 向上取整,取小数所在两整数间较大值
>   - floor() 向下取整,取小数所在量整数间较小值
>   - round() 参数+0.5向下取整,返回int/long



#### ==与equals区别

**==作用**

- 基本数据类型：比较值是否相等
- 引用类型：比较内存地址值是否相等,是否指向同一个对象

**equals作用**

- JDK类一般重写了equals()，比较内容

- 没有重写的自定义类，默认调用Object的equals()方法，相当于==

- 按照需求，可以重写equals()方法




#### hashCode与equals异同

- equals用于对比两个对象是否相等，默认调用Object的equlas方法，等价于==。
- hashCode作用是获取哈希码（散列码），哈希码的作用是确定该对象在哈希表的索引位置。
- hashCode()是定义在JDK的Object中的native方法，任何类都有hashCode方法。



#### 为什么要有hashCode/为什么重写equals方法需要也重写hashCode方法

以HashSet检验重复为例：

- 当对象加入HashSet时，先计算对象的hashCode判断加入的位置，该位置是否有值。
- 如果无值，则直接加入；如果有值，则进一步用equals判断两个对象是否相等，如果相等则不能插入，如果不等则重新散列到其他位置。

也就是hashCode可以提高插入位置判断重复的效率，减少了equals方法的判断次数：

- 对象相同，则hashCode一定相同
- 对象相同，equals方法返回为true
- hashCode相同，对象不一定相同（equals不一定为true）
- hashCode不同，对象一定不同

所以重写了equals方法后，需要重写hashCode方法：

- 默认equals方法是==，重写后会使内存地址不同的对象返回true，而默认hashCode在内存地址不同时值肯定不相等。
- 重写hashCode，保证equals返回true时，hashCode相等即可。
- 如果不重写hashCode，如插入HashSet时，值相同引用不同的对象就会插入失败。



#### 为什么重写equals方法必须重写hashcode方法（简略版）

- hashCode()的作用是获取哈希码，也称散列码

  实际是一个int整数，作用是确定该对象在哈希表的索引位置。

- 使用hashCode()可以快速比较元素，减少equals()方法的使用次数，如hashSet

- 如果两个对象相等，那么hashCode一定也相同，而不重写的话两个引用不同但相等的对象hashCode不同，需要重写



#### 静态方法为什么不能调用非静态成员

- 静态方法属于类，在类加载过程就分配内存，通过类名直接访问。非静态成员属于实例对象，对象实例化之后才会存在，通过实例对象访问。
- 调用静态方法时，内存中还不存在非静态成员，调用属于非法操作。





#### JDK动态代理与CGLIB动态代理对比

1. **JDK 动态代理只能代理实现了接口的类或者直接代理接口，而 CGLIB 可以代理未实现任何接口的类。**

   > CGLIB 动态代理是通过生成一个被代理类的子类来拦截被代理类的方法调用，因此不能代理声明为 final 类型的类和方法。

2. 就二者的效率来说，大部分情况都是 JDK 动态代理更优秀，随着 JDK 版本的升级，这个优势更加明显。



#### 静态代理与动态代理对比

1. **灵活性** ：动态代理更加灵活，不需要必须实现接口，可以直接代理实现类，并且可以不需要针对每个目标类都创建一个代理类。另外，静态代理中，接口一旦新增加方法，目标对象和代理对象都要进行修改，这是非常麻烦的！
2. **JVM 层面** ：静态代理在编译时就将接口、实现类、代理类这些都变成了一个个实际的 class 文件。而动态代理是在运行时动态生成类字节码，并加载到 JVM 中的。



#### Java序列化是什么，何时需要序列化

**序列化**：

Java对象转为字节流的过程

Java对象需要网络传输/持久化存储到文件时，需要对Java对象进行序列化处理

序列化的方式：实现Serializable接口，没有需要实现的方法

**反序列化**：字节流转为Java对象的过程

> - 某个类可被序列化,其子类也可以被序列化
> - 对象中某属性为对象类型,需要序列化时也要实现Serializable接口
> - static和transient修饰的成员变量不能被序列化.(static表示静态全局,transient表示临时数据)



### 数据类型相关

#### 基本数据类型有哪些,占用空间

- byte 1字节 8位
- short 2字节 16位
- int 4字节 32位
- long 8字节 64位
- float 4字节 32位
- double 8字节 64位
- char 2字节 16位
- boolean

> - boolean值编译后在虚拟机用int类型代替,占用4字节空间
> - boolean数组访问修改与byte数组共用baload与bastore指令,此时boolean占用1字节
> - 结论是 boolean在数组情况占用1字节,作为单独对象占用4字节
> - 但实际根据虚拟机实现判定,以上为虚拟机规范规定.
> - [参考论据](https://aijishu.com/a/1060000000079341)



#### 基本数据类型的转换规则:自动转换/强制转换

- 从低到高:byte,short,int,long,float,double
- 从低到高:char,int,long,float,double

**自动转换**

- 运算过程中,低级类型会自动转成参与运算的高级类型,运算结果也会是高级类型
- 低于等于int的数据类型参与运算会自动转成int类型,结果也是int类型

**强制转换**

- 高级转换成低级需要专门表达式
- 可能丢失精度
- char与short之间,char与byte之间相互转换都需要强转,因为char为无符号类型



#### 什么是装箱拆箱

- 装箱：基本类型转为包装类的过程
- 拆箱：包装类转为基本类型的过程

#### 装箱拆箱如何实现

- 装箱通过调用包装类的valueOf方法实现
- 拆箱通过调用包装类的XXXValue方法实现









### 类/对象/接口相关

#### 抽象类与接口的共同点与区别

**共同点**

- 不能被实例化
- 可以包含抽象方法
- 可以有默认的实现方法（Java8允许接口默认方法）

**区别**

- 接口主要用于对类的行为进行约束，你实现了某个接口就具有了对应的行为。

  抽象类主要用于代码复用，强调的是所属关系。

- 一个类只能继承一个类，但是可以实现多个接口。

- 成员变量：

  - 接口中成员变量只能是`public static final`，不能被修改且必须有初始值。
  - 抽象类成员变量默认`default`，在子类可以重新定义，重新赋值。



#### Java内部类的特点/作用

#### 作用

- 提供了某种进入其子类/实现类的方式
- 与外部类无关,独立继承其他类/实现接口
- Java多重继承的解决方案,弥补单继承的不足

#### 特点

- 内部类是独立的类,编译后生成独立的class文件
- 不能像外部类一样直接访问,根据类型访问方式不太一样
- 共同点是可以较为自由地访问外部类的方法/变量,即使是private
- 静态内部类除外,只能访问外部类静态成员变量



#### java内部类分类（待补充）

##### 成员内部类

##### 方法内部类

- 只能在定义该内部类的方法内实例化

- 不能到调用内部类所在方法的非final局部变量

##### 匿名内部类

##### 静态内部类

- 代码位于外部类内部,与外部类没有实例共享关系,即不能直接访问外部类成员变量
- 没有外部类对象时,也可以访问内部类
- 静态内部类只能访问外部类的静态成员变量和静态方法
- 静态方法中定义的内部类也是静态内部类,但不用加static修饰



#### 深复制与浅复制的区别

**浅复制**

- 复制基本类型的属性
- 复制引用类型的基本类型属性值，引用类型属性的引用
- 不复制引用类型的引用类型属性的值(对象)

> 浅复制引用类型的引用类型属性，指向同一个对象

**深复制**

- 复制基本类型的属性
- 复制引用类型的基本类型属性值
- 复制引用类型的应用类型属性引用，以及引用类型属性的值（对象）



#### 如何实现深复制/浅复制

**浅复制**

1. 要克隆的对象的类实现Cloneable接口，重写`clone()`方法，在其中调用Object的`clone()`方法
2. 调用克隆对象的`clone()`方法（不实现Cloneable接口会抛出CloneNotSupportException异常）

**深复制**

1. 引用类型属性所属类 也实现Cloneable接口,并重写`clone()`方法
2. 要克隆的对象重写的`clone()`方法除了调用Object的clone()方法，还要依次调用引用类型成员变量的`clone()`方法进行属性更新



### 异常相关

#### Exception与Error区别

所有的异常都有一个共同的祖先 `java.lang` 包中的 `Throwable` 类。

- **Exception**

  程序本身可以处理的异常，通过`catch`捕获，分为受检异常与非受检异常。

- **Error**

  属于程序无法处理的错误，如Java 虚拟机运行错误（`Virtual MachineError`）、虚拟机内存不够错误(`OutOfMemoryError`)、类定义错误（`NoClassDefFoundError`）等 。



#### 受检异常与非受检异常区别

- Java代码编译过程中，受检异常没有通过`catch`或`throws`处理时，无法通过编译；非受检异常在编译过程中 ，即使不处理也可以正常通过编译。
- 受检异常范围：除了`RuntimeException`及其子类以外，其他的`Exception`类及其子类都属于受检查异常 。常见的受检查异常有： IO 相关的异常、`ClassNotFoundException` 、`SQLException`...。
- 非受检异常范围：`RuntimeException` 及其子类都统称为非受检查异常，常见的有：
  - `NullPointerException`(空指针错误)
  - `IllegalArgumentException`(参数错误比如方法入参类型错误)
  - `NumberFormatException`（字符串转换为数字格式错误，`IllegalArgumentException`的子类）
  - `ArrayIndexOutOfBoundsException`（数组越界错误）
  - `ClassCastException`（类型转换错误）
  - `ArithmeticException`（算术错误）
  - `SecurityException` （安全错误比如权限不够）
  - `UnsupportedOperationException`(不支持的操作错误比如重复创建同一用户)



#### throw 和 throws 的区别是什么

Java 中的异常处理除了包括捕获异常和处理异常之外，还包括声明异常和拋出异常，可以通过 throws 关键字在方法上声明该方法要拋出的异常，或者在方法内部通过 throw 拋出异常对象。

**throws 关键字和 throw 关键字在使用上的几点区别如下**：

- throw 关键字用在方法内部，只能用于抛出一种异常，用来抛出方法或代码块中的异常，受查异常和非受查异常都可以被抛出。
- throws 关键字用在方法声明上，可以抛出多个异常，用来标识该方法可能抛出的异常列表。一个方法用 throws 标识了可能抛出的异常列表，调用该方法的方法中必须包含可处理异常的代码，否则也要在方法签名中用 throws 关键字声明相应的异常。





#### NoClassDefFoundError 和 ClassNotFoundException 区别？

- `NoClassDefFoundError` 是一个 Error 类型的异常，是由 JVM 引起的，不应该尝试捕获这个异常。

  **起因**：引起该异常的原因是 JVM 或 ClassLoader 尝试加载某类时在内存中找不到该类的定义，该动作发生在运行期间，即编译时该类存在，但是在运行时却找不到了，可能是编译后被删除了等原因导致。

- `ClassNotFoundException `是一个受检异常，需要显式地使用 try-catch 对其进行捕获和处理，或在方法签名中用 throws 关键字进行声明。

  **起因**：当使用 Class.forName, ClassLoader.loadClass 或 ClassLoader.findSystemClass 动态加载类到内存的时候，通过传入的类路径参数没有找到该类，就会抛出该异常；
  另一种抛出该异常的可能原因是某个类已经由一个类加载器加载至内存中，另一个加载器又尝试去加载它。



#### 如何使用 `try-with-resources` 代替`try-catch-finally`？

1. **适用范围（资源的定义）：** 任何实现 `java.lang.AutoCloseable`或者 `java.io.Closeable` 的对象
2. **关闭资源和 finally 块的执行顺序：** 在 `try-with-resources` 语句中，任何 catch 或 finally 块在声明的资源关闭后运行



#### try-catch-finally 中，如果 catch 中 return 了，finally 还会执行吗？

答：会执行，在 return 前执行。

> - try与catch的return值已经确定，如果finally只是试图改变而不是直接return，则对返回值无影响。
>
> - 在 finally 中改变返回值的做法是不好的，因为如果存在 finally 代码块，try中的 return 语句不会立马返回调用者，而是记录下返回值待 finally 代码块执行完毕之后，再向调用者返回其值，然后如果在 finally 中修改了返回值，就会返回修改后的值。
> - 显然，在 finally 中返回或者修改返回值会对程序造成很大的困扰，C#中直接用编译错误的方式来阻止程序员干这种龌龊的事情，Java 中也可以通过提升编译器的语法检查级别来产生警告或错误。



####  JVM 是如何处理异常的？

在一个方法中如果发生异常，这个方法会创建一个异常对象，并转交给 JVM，该异常对象包含异常名称，异常描述以及异常发生时应用程序的状态。创建异常对象并转交给 JVM 的过程称为抛出异常。可能有一系列的方法调用，最终才进入抛出异常的方法，这一系列方法调用的有序列表叫做调用栈。

JVM 会顺着调用栈去查找看是否有可以处理异常的代码，如果有，则调用异常处理代码。当 JVM 发现可以处理异常的代码时，会把发生的异常传递给它。如果 JVM 没有找到可以处理该异常的代码块，JVM 就会将该异常转交给默认的异常处理器（默认处理器为 JVM 的一部分），默认异常处理器打印出异常信息并终止应用程序。





### 字符串相关





#### String，StringBuilder，StringBuffer区别是什么？String为什么不可变？如何选择

**可变性**

- String类使用final关键字修饰内部字符数组保存字符串，所以是不可变的。

  ```java
  private final char value[]
  private final byte value[]
  ```

- StringBuilder与StringBuffer均继承自AbstractStringBuilder，内部字符数组没有final修饰，所以是可变的。

**线程安全性**

- String中对象不可变，线程安全；
- StringBuffer对方法加了同步锁，线程安全；
- StringBuilder线程非安全。

**性能**

- 每次修改String类型，都会生成新的对象；
- 每次修改StringBuffer类型都是对对象本身操作，不会产生新的引用；
- StringBuilder同StringBuffer，仅能获得 10%~15% 左右的性能提升，但却要冒多线程不安全的风险。

**使用情景：**

- 操作少量数据使用String
- 单线程操作大量字符串数据使用StringBuilder
- 多线程操作大量字符串数据使用StringBuffer



#### String str = "a"与String str = new String("a")的区别是?

内存分配方式不一样，

"a"的方式会将String对象分配在常量池；

new String("a")会分配在堆内存。



#### 字符串反转的方式

- 调用StringBuffer/StringBuilder的reverse()方法,本质都是调用父类AbstractStringBuilder的reverse方法实现

  ```java
  StringBuffer stringBuffer = new StringBuffer();
  stringBuffer.append("abcdefg");
  System.out.println(stringBuffer.reverse()); // gfedcba
  ```

- 不考虑编码问题,自己实现

  ```java
  //使用String的charAt方法
  public String reverse(String str){
      if(str!=null&&str.length()>=0){
          int length = str.length();
          char[] buffer = new char[length];
          for (int i = 0; i < buffer.length; i++) {
              buffer[i] = str.charAt(length-1-i);
          }
          return new String(buffer);
      }
      return str;
  }
  ```

- 递归实现

  ```java
  public String reverse(String str){
      if(str!=null&&str.length()<=1){
          return str;
      }
      return reverse(str.substring(1))+str.charAt(0);
  }
  ```



### 关键字相关

#### instanceof关键字作用

instanceof 运算符是用来在运行时判断对象是否是指定类及其父类的一个实例

比较的是对象，不能比较基本类型。



#### final在java作用

- 修饰类：称为**最终类**，不能被继承

- 修饰方法：不能被重写

- 修饰成员变量：为**常量**，必须初始化，初始化后值不可修改（但可以修改成员属性值）

  > 指内存地址不可改变：
  >
  > - 对基本类型相当于值不可变；
  >
  > - 对引用类型指引用不可变，不能指向其他对象。



#### final finally finalize 区别?

- **final**：作为访问修饰符，表示最终不可变，修饰的类不能被继承；修饰的方法不能重写；修饰的成员变量初始化后不能修改值。

- **finally**：为异常处理的关键词，用于try/catch语句，包含的代码块最后一定会被执行（特殊情况除外，如虚拟机关闭）

- **finalize()**：为Object类内定义的方法，对象被回收时调用，用于垃圾收集器删除对象前做必要清理工作，一般由JVM调用。

  特殊情况可重写该方法，在对象被回收时释放一些资源，调用super.finalize()。



#### finally语句块一定执行吗

不一定,存在特殊情况导致finally语句块不执行：

- 直接返回未执行到所在的try-finally块
- 抛异常未执行到try-finally块(指异常出现在try之前)
- 系统退出未执行到try-finally块



#### return与finally的执行顺序，对返回值的影响

try与finally中语句块至少包含一个return语句时：

- finally总会执行

- finally没有return，finally对return值的**赋值修改无效**（语句执行了，但无法影响返回值，还是以finally执行前的值为准）
- try与finally都有return，return值以finally中的return值为准

> catch语句块没有return时，finally无法同时没有return语句块，产生编译错误,缺少返回语句



#### transient关键字作用/java序列化中部分字段不想序列化怎么处理

- 对于不想序列化的字段，进行transient关键字修饰

- transient作用：

  - 阻止实例中修饰变量的序列化
  - 反序列化时，修饰变量不会被持久化和恢复

  transient 只能修饰变量，不能修饰类和方法



#### if-else与switch区别

**if-else**

- if-else适用判断分支较少，多了会比较繁杂
- if-else判断条件可多样，只要表达式结果是ture/false,很多类型都可参与判断
- 满足if条件后不再执行后续else判断

**switch**

- switch可适用判断分支多的判断
- 判断条件较单一，用于判断的数据类型(1.7)为byte,short,int,char,enum,String
- 如果不使用break关键字，从符合条件的分支开始会执行后续所有分支



#### 访问修饰符(public/private/..)，权限的区别

- **public**
  - public修饰的成员变量与方法可以被任何类访问
  - 一个java源文件中只能有一个类声明为public,且文件名同类名
- **protected**
  - protected修饰成员可被同一包中所有类访问到
  - protected修饰成员可被该类的所有子类继承访问(无需同一包)
- **default**
  - 默认,无需特定关键字修饰
  - 同一包中所有类可访问
  - 修饰的成员可被同一包的之类继承访问(不同包子类不行)
- **private**
  - private修饰只能被当前类访问

![image-20220626012854219](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220626012854219.png)



#### volatile关键字的作用，原理（待补充）

保证内存可见性和禁止指令重排。

https://www.cnblogs.com/dolphin0520/p/3920373.html



#### synchronized关键字的用法，优缺点（待补充）

java关键字，当它用来修饰一个方法或者代码块的时候，能够保证在同一时刻最多只有一个线程执行该代码段的代码；

- synchronized修饰的方法或者对象，只能以同步的方式执行，会引起性能问题；

- 无法中断一个正在等候获得锁的线程，也无法通过投票获得锁；

- 一个优先级高的线程等待一个优先级低的线程释放锁会导致优先级倒置，引起性能风险；





### IO相关





#### IO流分为几种

- 功能划分：输入流,输出流

- 类型划分：字节流,字符流



#### BIO，NIO，AIO有什么区别

一次IO的读操作分为等待就绪和IO操作两个阶段：

- **等待就绪**：等待TCP Receive Buffer(接收缓冲区)里面的数据就绪好，也就是发送方的数据全部发送到网卡里面来
- **IO操作**：CPU将数据从网卡拷贝到用户空间

**BIO(同步阻塞)**

BIO就是同步阻塞型的IO。

当一个Socket连接发送数据过来以后，需要为这个Socket连接创建一个线程，由线程调用Socket的read()方法读取数据。

先把数据从网卡拷贝到内核空间，再拷贝到用户态的内存空间，在数据读取完成前，线程都是阻塞的。

> 这种IO方式就是比较消耗资源，假设有1000个活跃的Socket连接，需要创建出1000个线程来读取数据，读取时都是阻塞的，每个线程有自己独有的线程栈，默认大小是1M。

**NIO(同步非阻塞)**

nio就是多路io复用，就是一个线程来处理多个Socket连接，节省线程资源。

以select为例，就是有一个长度为1024的数组，每个元素对应一个Socket连接，线程轮询这个数据，判断哪个Socket连接的数据是出于就绪状态，此时就将数据拷贝到用户空间然后进行处理。

- 由于IO操作阶段是需要等待数据拷贝到用户空间完成才能返回，所以是同步的。

- 由于每次判断内核中Socket缓冲区的数据是否就绪的函数是直接返回的，如果就绪就返回有数据，不是就绪就返回0，线程不需要阻塞等待，所以是非阻塞的。

**AIO(异步非阻塞)**

AIO就是NIO的升级版

在数据处于就绪状态时，也是异步将Socket缓冲区中的数据拷贝到用户空间，然后执行异步回调函数，所以在IO操作阶段也是异步的。



#### BIO，NIO，AIO的区别（简略版）

- **BIO**

  同步阻塞IO，数据的读取写入阻塞在一个线程内完成。

  连接数不高的情况下（单机小于1000），每个连接专注于自己的IO且编程简单。

- **NIO**

  同步非阻塞IO，它支持面向缓冲的，基于通道的 I/O 操作方法。

  对应 java.nio 包，提供了 Channel , Selector，Buffer 等抽象。

  NIO 在网络操作中，提供了非阻塞的方法，但是 NIO 的 IO 行为还是同步的。

  对于 NIO 来说，我们的业务线程是在 IO 操作准备好时，得到通知，接着就由这个线程自行进行 IO 操作，IO 操作本身是同步的。

- **AIO**

  异步非阻塞IO，

  基于事件和回调机制实现，应用操作后会直接返回，不会堵塞在那里，当后台处理完成，操作系统会通知相应的线程进行后续的操作。





### 集合相关

#### HashMap的底层实现

**1.8之前**

数组和链表结合起来使用，成为链表散列；

HashMap通过key的hashCode经过扰动函数处理得到hash值，

通过(n-a)&hash判断元素存放的位置（n为数组长度），

如果当前位置有元素，则比较hash值于key值是否相等，相等则覆盖；

否则通过拉链法解决冲突。

> **拉链法**
>
> 将冲突的对象以链表的形式串联起来
>
> 1.8之前使用头插法，新加入的冲突元素将会插到原有链表的头部

**1.8**

链表长度大于阈值（默认为 8且当前数组长度大于64）时，链表会转化为红黑树。

> 将链表转换成红黑树前会判断，如果当前数组的长度小于 64，那么会选择**先进行数组扩容**，而不是转换为红黑树

TreeMap、TreeSet 以及 JDK1.8 之后的 HashMap 底层都用到了红黑树。红黑树就是为了解决二叉查找树的缺陷，因为二叉查找树在某些情况下会退化成一个线性结构。



#### HashMap在JDK1.7和JDK1.8中有哪些不同？

| 区别                 | 1.7                                                          | 1.8                                                          |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 存储结构             | 数组+链表                                                    | 数组 + 链表 + 红黑树                                         |
| 初始化函数           | `inflateTable()`                                             | 集成到了扩容函数`resize()`中                                 |
| hash值计算           | 扰动处理：<br />9次扰动 = 4次位运算 + 5次异或运算            | 扰动处理 ：<br />2次扰动 = 1次位运算 + 1次异或运算           |
| 存放数据的规则       | 无冲突时，存放数组；冲突时，存放链表                         | 无冲突时，存放数组；<br />冲突， 链表长度 < 8，存放单链表；<br />冲突 & 链表长度 > 8，树化并存放红黑树 |
| 插入数据方式         | 头插法（原数据后移1位，插入数据到原位）                      | 尾插发（数据插入到链表/红黑树尾部）                          |
| 扩容后存储位置计算法 | 全部按照原来方法进行计算<br />（即hashCode ->> 扰动函数 ->> (h&length-1)） | 按照扩容后的规律计算<br />（扩容后的位置=原位置 or 原位置 + 旧容量） |





#### HashMap的长度为什么是2的幂次方

减少hash碰撞，将数据分布均匀。

通过散列值计算存放位置时，需要于数组长度进行取模运算，得到余数。

这里使用的是(n-1)&hash的快捷方式，条件是n需要为2的幂次方。

> 当容量n是2的整数次幂时，n - 1 的二进制表示全是1，
>
> 此时与hash进行按位与运算时，既能保持不超出容量范围，也能充分散列，均匀添加在HashMap的每个位置上，减少Hash碰撞。



#### ConcurrentHashMap与Hashtable区别

体现为实现线程安全的方式不同

- **底层数据结构**

  JDK1.7 的 `ConcurrentHashMap` 底层采用 **分段的数组+链表** 实现，JDK1.8 采用的数据结构跟 `HashMap1.8` 的结构一样，数组+链表/红黑二叉树。

  `Hashtable` 和 JDK1.8 之前的 `HashMap` 的底层数据结构类似都是采用 **数组+链表** 的形式，数组是 HashMap 的主体，链表则是主要为了解决哈希冲突而存在的；

- **实现线程安全的方式**

  - **在 JDK1.7 的时候，`ConcurrentHashMap`（分段锁）** 对整个桶数组进行了分割分段(`Segment`)，每一把锁只锁容器其中一部分数据，多线程访问容器里不同数据段的数据，就不会存在锁竞争，提高并发访问率。 
  - **到了 JDK1.8 的时候已经摒弃了 `Segment` 的概念，而是直接用 `Node` 数组+链表+红黑树的数据结构来实现，并发控制使用 `synchronized` 和 CAS 来操作。（JDK1.6 以后 对 `synchronized` 锁做了很多优化）** 整个看起来就像是优化过且线程安全的 `HashMap`，虽然在 JDK1.8 中还能看到 `Segment` 的数据结构，但是已经简化了属性，只是为了兼容旧版本；
  - **`Hashtable`(同一把锁)**使用 `synchronized` 来保证线程安全，效率非常低下。当一个线程访问同步方法时，其他线程也访问同步方法，可能会进入阻塞或轮询状态，如使用 put 添加元素，另一个线程不能使用 put 添加元素，也不能使用 get，竞争会越来越激烈效率越低。



#### HashMap与Hashtable区别

- **线程安全**：HashMap线程不安全；Hashtable内部方法经过`synchronized`修饰，线程安全。
- **效率**：HashMap效率较高。
- **null键与null值支持**：HashMap支持一个null键，及多个null值；Hashtable不支持空键空值，会抛出空指针异常。
- **初始容量与扩容大小**：
  - Hashtable默认初始11，扩容2n+1
  - HashMap默认初始16，扩容2n
  - 因为HashMap要求容量为2的整数次幂，所以自定义初始容量时，HashMap会扩充到2的整数次幂（通过`tableSizeFor()`方法）
- **底层数据结构**：HashMap解决hash冲突扩展了红黑树的方式，Hashtable没有。



#### 为什么HashMap长度为2的整数次方

key的hash值需要减少hash碰撞，均匀分配，同时不能超出数组长度，所以采用了`(n-1)&hash`的方式计算，n代表数组长度。

不能超出数组长度实际上也可以用取余运算，即%，不过

取余(%)操作中如果除数是2的幂次则等价于与其 **除数减一的与(&)操作**。

也就是说当数组长度为2的幂次时，则hash%length取余操作等价于(length-1)&hash。

另外，二级制位运算&效率明显高于%，提高了效率。



#### HashSet与HashMap区别

HashSet底层基于HashMap实现。

- **实现接口**：HashMap实现了Map接口，HashSet实现了Set接口
- **存储内容**：HashMap存储键值对，HashSet存储对象
- **添加元素**：HashMap通过put方法添加元素，HashSet通过set方法添加元素
- **区分元素**：HashMap通过key的hashCode，HashSet通过对象的equals方法判断
- **效率**：HashMap较快，因为通过键获取对象，不需要遍历。



#### ConcurrentHashMap与Hashtable区别

主要在于线程安全的实现方式不同。

- **底层数据结构**：1.8后ConcurrentHashMap实现方式也是数组+链表+红黑树；而Hashtable底层还是数组+链表形式。
- **实现线程安全的方式**：
  - 1.7时，ConcurrentHashMap对整个桶数组进行了分段分割（Segment），每把锁只锁容器中的一部分，多线程访问容器不同段的数据，减少锁竞争，提高效率。（分段锁）
  - 1.8时，ConcurrentHashMap摒弃了Segment的概念，直接使用数组+链表+红黑树的数据结构实现，并发控制使用synchronized和CAS操作。
  - Hashtable使用synchronized保证线程安全，效率较为低下。





#### 怎么确保一个集合不能被修改

使用 `Collections. unmodifiableCollection(Collection c) `方法来创建一个只读集合，这样改变集合的任何操作都会抛出 Java. lang. UnsupportedOperationException 异常。

```java
List<String> list = new ArrayList<>();
list. add("x");
Collection<String> clist = Collections. unmodifiableCollection(list);
clist. add("y"); // 运行时此行报错
System. out. println(list. size());
```



#### 遍历List的不同方式与原理？如何选择？

**不同方式**

1. for循环遍历：在集合外部维护一个计数器，依次读取每个位置的元素。
2. Iterator迭代器遍历：支持Collections接口遍历。
3. foreach循环遍历：内部也是Iterator实现，不需要显示声明Iterator/计数器，优点是代码简洁，缺点是只能做简单遍历，不能在遍历过程中操作集合，如删除替换。

**如何选择**

Java Collections 框架中提供了一个 RandomAccess 接口，用来标记 List 实现是否支持 Random Access。

- 实现了 RandomAccess 接口的集合按位置读取元素的时间复杂度平均为O(1)，方便使用for循环遍历
- 没有实现的建议使用迭代器/foreach，如 LinkedList



#### ArrayList中elementData为什么被transient修饰（待补充）

[详细分析](https://www.jianshu.com/p/14876ef38721)



#### ConcurrentHashMap线程安全的具体实现

##### 1.7

首先将数据分为一段一段的存储，然后给每一段数据配一把锁，

当一个线程占用锁访问其中一个段数据时，其他段的数据也能被其他线程访问。

**`ConcurrentHashMap` 是由 `Segment` 数组结构和 `HashEntry` 数组结构组成**。

Segment 实现了 `ReentrantLock`，所以 `Segment` 是一种可重入锁，扮演锁的角色。`HashEntry` 用于存储键值对数据。

一个 `ConcurrentHashMap` 里包含一个 `Segment` 数组。`Segment` 的结构和 `HashMap` 类似，是一种数组和链表结构，一个 `Segment` 包含一个 `HashEntry` 数组，每个 `HashEntry` 是一个链表结构的元素，每个 `Segment` 守护着一个 `HashEntry` 数组里的元素，当对 `HashEntry` 数组的数据进行修改时，必须首先获得对应的 `Segment` 的锁。

##### 1.8

`ConcurrentHashMap` 取消了 `Segment` 分段锁，采用 CAS 和 `synchronized` 来保证并发安全。数据结构跟 HashMap1.8 的结构类似，数组+链表/红黑二叉树。Java 8 在链表长度超过一定阈值（8）时将链表（寻址时间复杂度为 O(N)）转换为红黑树（寻址时间复杂度为 O(log(N))）

`synchronized` 只锁定当前链表或红黑二叉树的首节点，这样只要 hash 不冲突，就不会产生并发，效率又提升 N 倍。



## JUC

#### 介绍Atomic原子类

原子类就是具有原子操作特征的类，原子指不可中断的操作，这个操作一旦开始，就不会被其他线程干扰。

并发包`java.util.concurrent`的原子类都存放在`java.util.concurrent.atomic`下。

<img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220427173313720.png" alt="image-20220427173313720" style="zoom:50%;" />

## 多线程



### 同步与异步的区别

区别在于调用结果的通知方式上：

- **同步**  

  执行一个方法后，需要等待结果返回，才能继续执行。

- **异步**

  执行一个方法后，不会等待结果的返回，被调用方在执行完成后通过回调来通知调用方继续执行。



### 阻塞与非阻塞的区别

在于进程/线程在等待消息时，进程/线程是否是挂起状态：

- **阻塞调用**

  在消息发出去后，

  消息返回之前，当前进程/线程会被挂起，

  直到有消息返回，当前进/线程才会被激活。

- **非阻塞调用**

  在消息发出去后，不会阻塞当前进/线程，

  而会立即返回，可以去执行其他任务。





### 并发与并行的区别

- 并行指同一时间段，多个任务同时执行；
  并发指同一时间段，多个任务都在执行（单位时间不一定同时进行）
- 并行执行不抢占CPU资源；并发执行的线程对CPU资源存在抢占
- 并行执行的线程不存在切换；
  并发操作系统会根据任务调度给线程分配CPU执行时间，线程执行进行切换



### 进程/线程的概念

**进程**

- 程序执行的一个实例，有独立的内存空间分配
- 系统进行资源分配和调度的基本单位
- 堆，是进程中最大的一块内存，被进程中所有线程共享，进程创建时分配，用于存放创建的对象实例
- 方法区，用于存放进程中代码片段，线程共享

**线程**

- 进程中的一个实例，一个执行路径
- CPU调度和分派的基本单位
- 当前线程的CPU时间片用完后，会让出CPU，等待下一轮
- 只拥有运行中不可缺少的资源（如程序计数器，栈）
- 程序计数器用于记录线程让出CPU时的执行地址，下一轮分配时可以继续执行
- 栈用于存储该线程的局部变量和调用栈帧，其他线程无权访问
- main函数所在线程为主线程



### 线程与进程的关系/区别

- 一个进程里可以有多个线程，多个线程共享进程的堆与方法区；
- 每个线程有自己的程序计数器，虚拟机栈和本地方法栈；
- 线程 是 进程 划分成的更小的运行单位。
- 线程和进程最大的不同在于基本上各进程是独立的，而各线程则不一定，因为同一进程中的线程极有可能会相互影响。
- 线程执行开销小，但不利于资源的管理和保护；而进程正相反







### 线程有哪些状态

![Java线程状态变迁](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/javadfsgsggsgsg.jpg)

- **NEW（初始/新建状态）**

  线程被构建，但没有调用start()方法

- **RUNNABLE（运行状态）**

  java线程将操作系统中就绪与运行两种状态统称运行中

  - **READY（就绪/可运行）**

    新建状态调用start()方法后进入就绪状态

  - **RUNNING（运行）**

    可运行状态线程获得CPU时间片后进入运行状态

- **BLOCKED（阻塞状态）**

  表示线程阻塞于锁

  线程调用同步方法，在没有获取到锁的情况下进入阻塞状态

- **WAITING（等待状态）**

  表示线程进入等待状态，需要等待其他线程执行特定动作（通知/中断）

  线程执行wait()方法后进入等待状态

- **TIME_WAITING（超时等待状态）**

  超时等待状态，不同于WAITING，可以在指定时间内自行返回

  通过sleep(long millis)方法或者wait(long millis)方法进入

  超时时间到达后进入RUNNABLE状态

- **TERMINATED（终止状态）**

  表示线程已经执行完毕

  线程执行run()方法后进入TERMINATED状态



### 线程的生命周期和状态

- NEW初始状态
- RUNNABLE运行状态
- BLOCKED阻塞状态
- WAITING等待状态
- TIME_WAITING超时等待状态
- TERMINATED终止状态

![Java 线程状态变迁 ](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dfsfsdfsfsdf.png)



### 创建线程的方式

1. 继承Thread类实现

2. 实现Runnable接口

3. 使用ExecutorService、Callable、Future实现有返回结果的多线程



### 线程死锁是什么？

多个线程同时被阻塞，它们中的一个或者全部都在等待某个资源被释放。由于线程被无限期地阻塞，因此程序不可能正常终止。

产生死锁必须具备以下四个条件：

1. **互斥条件**：该资源任意一个时刻只由一个线程占用。
2. **请求与保持条件**：一个进程因请求资源而阻塞时，对已获得的资源保持不放。
3. **不剥夺条件**：线程已获得的资源在末使用完之前不能被其他线程强行剥夺，只有自己使用完毕后才释放资源。
4. **循环等待条件**：若干进程之间形成一种头尾相接的循环等待资源关系。



### 如何避免线程死锁

破坏死锁产生的四个条件的任意一个。

- 破坏互斥条件：不可行，上锁本身就是为了保证互斥
- **破坏请求与保持条件**：一次性申请所有资源
- **破坏不剥夺条件**：占用资源的线程在请求资源时如果申请不到，可以先主动释放其占有的资源
- **破坏循环等待条件**：按序申请资源，反序释放资源。



### sleep与wait方法的区别与共同点

**区别**

sleep()没有释放锁，wait()释放锁。

**共同点**

- 都可以暂停线程执行
- wait()通常用于线程间交互/通信，sleep()通常被用于暂停执行。
- wait()方法被调用后，线程不会自动苏醒，需要别的线程调用同一对象上的notify()或者notifyAll()方法；sleep()方法执行完成后，线程自动苏醒；wait(long timeout)超时后线程自动苏醒。



### 为什么调用start()方法时会执行run()方法，不能直接调用run()方法

- 调用start()方法，会启动一个线程并使线程进入了就绪状态，当分配到时间片后就可以开始运行，start()会执行线程的准备工作，自动执行run()方法内容。
- 直接执行run()方法，会当作main线程普通方法执行，不属于多线程。



### synchronized关键字理解

`synchronized`关键字可以保证修饰的方法或代码块在任意时刻只有一个线程在执行。



### volatile与synchronized区别

- volatile是线程同步的轻量实现，只能用于变量；synchronized修饰方法与代码块。
- volatile保证数据的可见性，不保证原子性；synchronized都能保证。
- volatile用于解决变量在多个线程之间的可见性；synchronzed解决多个线程访问资源的同步性。



### synchronized底层原理（待补充）

**结论**

`synchronized` 同步语句块的实现使用的是 `monitorenter` 和 `monitorexit` 指令，其中 `monitorenter` 指令指向同步代码块的开始位置，`monitorexit` 指令则指明同步代码块的结束位置。

`synchronized` 修饰的方法并没有 `monitorenter` 指令和 `monitorexit` 指令，取得代之的确实是 `ACC_SYNCHRONIZED` 标识，该标识指明了该方法是一个同步方法。

**不过两者的本质都是对对象监视器 monitor 的获取。**



### ThreadLocal原理

- Thread类内部维护了两个ThreadLocalMap类对象，理解为ThreadLocal类实现定制的HashMap
- 这两个对象默认为null，只有当前线程调用了ThreadLocal的get/set方法后才会创建，而ThreadLocal调用的get/set方法就是ThreadLocalMap的get/set方法
- 最终的变量实质是存储在Thread类的ThreadLocalMap中。
- 每个Thread都维护一个ThreadLocalMap，key为ThreadLocal对象，value为ThreadLocal存储的value。
- ThreadLocalMap为ThreadLocal的静态内部类。



### ThreadLocal内存泄漏了解

- ThreadLocalMap中使用的key为ThreadLocal的弱引用，value为强引用。

- 所以在Thread没有结束，ThreadLocal没有被外部强引用时，垃圾回收只会清理key，这样就会出现key为null的Entry。

- 如果保持如此，value不会被GC回收，可能产生内存泄漏。

- ThreadLocal在调用set/get/remove时，会清理掉key为null的记录，所以使用ThreadLocal后最好手动调用触发清理。

> **弱引用**
>
> 如果一个对象只具有弱引用，那就类似于**可有可无的生活用品**。
>
> **弱引用与软引用的区别**
>
> 只具有弱引用的对象拥有更短暂的生命周期。
>
> 在垃圾回收器线程扫描它 所管辖的内存区域的过程中，一旦发现了只具有弱引用的对象，不管当前内存空间足够与否，都会回收它的内存。
>
> 不过，由于垃圾回收器是一个优先级很低的线程， 因此不一定会很快发现那些只具有弱引用的对象。
>
> 弱引用可以和一个**引用队列**（ReferenceQueue）联合使用，如果弱引用所引用的对象被垃圾回收，Java 虚拟机就会把这个弱引用加入到与之关联的引用队列中。



### 线程池

#### 实现Runnable与Callable接口的区别

`Runnable` 接口**不会返回结果或抛出检查异常**，但是`Callable` 接口**可以**。



#### 执行execute与submit方法的区别

- `execute()`用于提交不需要返回值的任务，无法判断是否成功执行。

- `submit()`用于提交需要返回值的任务，线程会返回一个`Future`类型对象，通过这个对象判断任务是否成功执行。

  > 可以通过 `Future` 的 `get()`方法来获取返回值，
  >
  > `get()`方法会阻塞当前线程直到任务完成，
  >
  > 而使用 `get（long timeout，TimeUnit unit）`方法则会阻塞当前线程一段时间后立即返回，这时候有可能任务没有执行完。



#### 如何创建线程池

1. 通过构造方法实现

   `ThreadPoolExecutor()`

   ![ThreadPoolExecutor构造方法](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/ThreadPoolExecutordfsfsf95.png)

2. 通过Executor框架工具类`Executors`实现

   可以用来创建三种类型的线程池：

   - **FixedThreadPool** 

     返回一个**固定线程数量的线程池**。

     该线程池中的线程数量始终不变。当有一个新的任务提交时，线程池中若有空闲线程，则立即执行。若没有，则新的任务会被暂存在一个任务队列中，待有线程空闲时，便处理在任务队列中的任务。

   - **SingleThreadExecutor**

     返回一个**只有一个线程的线程池**。

     若多余一个任务被提交到该线程池，任务会被保存在一个任务队列中，待线程空闲，按先入先出的顺序执行队列中的任务。

   - **CachedThreadPool** 

     该方法返回一个**可根据实际情况调整线程数量的线程池**。

     线程池的线程数量不确定，但若有空闲线程可以复用，则会优先使用可复用的线程。

     若所有线程均在工作，又有新的任务提交，则会创建新的线程处理任务。所有线程在当前任务执行完毕后，将返回线程池进行复用。



### AQS是什么

AQS 的全称为（`AbstractQueuedSynchronizer`），这个类在`java.util.concurrent.locks`包下面。

AQS 是一个用来构建锁和同步器的框架，使用 AQS 能简单且高效地构造出应用广泛的大量的同步器，

比如我们提到的 `ReentrantLock`，`Semaphore`，其他的诸如 `ReentrantReadWriteLock`，`SynchronousQueue`，`FutureTask` 等等皆是基于 AQS 的。

当然，我们自己也能利用 AQS 非常轻松容易地构造出符合我们自己需求的同步器。





### Java中创建线程的方式

1. **继承Thread，重写run方法**

   自定义CustomThread类继承Thread类，重写run()方法，然后创建CustomThread的对象，然后调用start()方法。

   JVM会创建出一个新线程，并且为线程创建方法调用栈和程序计数器，此时线程处于就绪状态，当线程获取CPU时间片后，线程会进入到运行状态，会去调用run()方法。

2. **实现Runnable接口**

   创建一个类（如下面代码中的ThreadTarget类），实现Runnable接口的Run方法，然后将Target类的实例对象作为Thread的构造器入参target，实际的线程对象还是Thread实例，只不过线程Thread与线程执行体（Target类的run方法）分离了，耦合度更低一些。

   ```java
   class ThreadTarget implements Runnable {
       void run() {
           System.out.println(Thread.currentThread().getName()+"线程执行了run方法");
       }
       public static void main(String[] args) {
           System.out.println(Thread.currentThread().getName()+"线程执行了main方法");
           ThreadTarget target = new ThreadTarget();
           Thread thread = new Thread(target);
           thread.start();
       }
   }
   ```

   > Runnable接口中的run()方法是**没有返回值**，如果我们需要执行的任务带返回值就不能使用Runnable接口。

3. **实现Callable接口**

   创建一个类CallableTarget，实现Callable接口，实现带有**返回值的call()方法**，

   然后根据CallableTarget创建一个任务FutureTask，然后根据FutureTask来创建一个线程Thread，调用Thread的start方法可以执行任务。

   ```java
   public class CallableTarget implements Callable<Integer> {
       public Integer call() throws InterruptedException {
           System.out.println(Thread.currentThread().getName()+"线程执行了call方法");
           Thread.sleep(5000);
           return 1;
       }
       public static void main(String[] args) throws ExecutionException, InterruptedException {
           System.out.println(Thread.currentThread().getName()+"线程执行了main方法");
           CallableTarget callableTarget = new CallableTarget();
           FutureTask<Integer> task = new FutureTask<Integer>(callableTarget);
           Thread thread = new Thread(task);
           thread.start();
           Integer result = task.get();//当前线程会阻塞，一直等到结果返回。
           System.out.println("执行完毕，打印result="+result);
           System.out.println("执行完毕");
       }
   }
   ```

   

### Java中的Runnable、Callable、Future、FutureTask的区别和联系？

#### Runnable

Runnable是一个接口，只需要新建一个类实现这个接口，然后重写run方法，将该类的实例作为创建Thread的入参，线程运行时就会调用该实例的run方法。

#### Callable

Callable跟Runnable类似，也是一个接口。只不过它的call方法有返回值，可以供程序接收任务执行的结果。

#### Future

Future也是一个接口，Future就像是一个管理的容器一样，进一步对Runable和Callable的实例进行封装，定义了一些方法：

- 取消任务的cancel()方法
- 查询任务是否完成的isDone()方法
- 获取执行结果的get()方法
- 带有超时时间来获取执行结果的get()方法

#### FutureTask

Future只是一个接口，并不能实例化，可以认为FutureTask就是Future接口的实现类，FutureTask实现了RunnableFuture接口，而RunnableFuture接口继承Runnable接口和Future接口。







### synchronized关键字理解

- 解决的是多个线程之间访问资源的同步性，可以保证被修饰的方法/代码块在任意时刻只有一个线程执行。
- 早期版本属于重量级锁，因为依赖于底层的操作系统完成，而操作系统切换线程时间成本较高。
- java6之后从JVM层面进行了优化，包括自旋锁，适应性自旋锁，锁消除，锁粗化，偏向锁，轻量级锁等技术，减少了锁的开销。



### 自己是如何使用synchronized关键字（项目）

三种使用方式：

- 修饰实例方法，作用于当前实例，进入同步代码前要获得当前对象的锁。

- 修饰静态方法，作用域当前类，进入同步代码前要获得当前类的锁。

  > 静态方法不属于对象，静态方法锁于实例方法锁不会互斥

- 修饰代码块，指定加锁对象，进入同步代码块之前要获得给定对象的锁。

应用：

**双重校验锁实现对象单例**

```java
public class Single{
    private volatile static Single instance;
    private Single(){
    }
    public static Single getInstance(){
        if(instance == null){
            synchronized(Single.class){
                if(instance == null){
                    instance = new Single();
                }
            }
        }
        return instance;
    }
}
```

> **为什么用volatile修饰instance?**
>
> 由于instance = new Single();实际是分三步执行：
>
> 1. 为instance分配内存空间
> 2. 初始化instance
> 3. 将instance指向内存空间
>
> 而JVM具有指令重排的特性，执行顺序可能变为1-3-2。这种重排对单线程没有影响，但是在多线程的环境下，会导致一个线程获得一个没有初始化的实例。
>
> 如：线程1执行了1，3步骤，导致线程二获取到不为空但没有初始化的instance。
>
> 通过volatile**禁止指令重排**，保证多线程下获取到已初始化的对象。



### synchronized关键字底层原理

属于JVM层面。

#### 同步语句块

```java
public class SynchronizedDemo {
    public void method() {
        synchronized (this) {
        	System.out.println("synchronized 代码块");
        }
    }
}
```

通过JDK自带javap命令查看：

```sh
# 切换到类目录执行编译生成class文件
javac SynchronizedDemo.java
# 查看指令
javap -c -s -v -l SynchronizedDemo.class
```

![image-20220427152446848](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220427152446848.png)

通过指令可以看到：

**synchronized同步语句块使用monitorenter和monitorexit指令，分别指向同步代码块的开始与结束位置。**

执行monitorenter指令时，线程试图获取锁，即monitor的持有权。当计数器为0时，可成功获取，将计数器记为1。

> monitor对象存在于每个java对象的对象头，synchronized锁通过这种方式获取锁，所以java任意对象都可以用来加锁。

执行monitorexit指令后，锁计数器记为0，表示锁释放。

如果获取对象锁失败，则当前线程阻塞，直到锁被另一个线程释放。

#### 同步方法

```java
public class SynchronizedDemo2 {
    public synchronized void method() {
    	System.out.println("synchronized 方法");
    }
}
```

同理查看指令执行：

![image-20220427153025108](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220427153025108.png)

**synchronized修饰的方法并没有monitorenter与monitorexit指令，取而代之的是ACC_SYNCHRONIZED标识。**

这个标识指明该方法是同步方法，JVM通过这个标识辨别方法，进而执行同步调用。



### 1.6之后synchronzed关键字底层做了哪些优化

JDK1.6 对锁的实现引入了大量的优化，如偏向锁、轻量级锁、自旋锁、适应性自旋锁、锁消除、锁粗化等技术来减少锁操作的开销。

锁主要存在四种状态，依次是：

- 无锁状态
- 偏向锁状态
- 轻量级锁状态
- 重量级锁状态

他们会随着竞争的激烈而逐渐升级。注意锁可以升级不可降级，这种策略是为了提高获得锁和释放锁的效率。



### 偏向锁

**目的**：与轻量级锁一样，为了在没有多线程竞争的前提下，减少传统重量级锁使用操作系统互斥量产生的性能消耗。

**与轻量级锁的不同**：轻量级锁在无竞争的情况下，使用CAS操作代替互斥量；而偏向锁在无竞争情况下，会消除整个同步。

偏向锁的“偏”就是偏心的偏，它的意思是**会偏向于第一个获得它的线程，如果在接下来的执行中，该锁没有被其他线程获取，那么持有偏向锁的线程就不需要进行同步**。

但是对于锁竞争比较激烈的场合，偏向锁就失效了，因为这样场合极有可能每次申请锁的线程都是不相同的，因此这种场合下不应该使用偏向锁，否则会得不偿失，需要注意的是，偏向锁失败后，并不会立即膨胀为重量级锁，而是先升级为轻量级锁。

### 轻量级锁

偏向锁失败时，虚拟机会升级为轻量级锁。

**提升性能的依据**：对于绝大部分锁，在整个同步周期内是不存在竞争的。这是一个经验数据。

如果没有竞争，轻量级锁使用CAS操作避免互斥操作的开销；但如果存在锁竞争，会导致互斥操作的情况下，反而增加了CAS操作的开销，会比重量级锁更慢，所以竞争激烈时，会快速膨胀为重量级锁。



### 自旋锁和自适应自旋

轻量级锁失败后，虚拟机为了避免线程真实地在操作系统层面挂起，还会进行一项称为自旋锁的优化手段。

互斥同步对性能最大的影响就是阻塞的实现，因为挂起线程/恢复线程的操作都需要转入内核态中完成（用户态转换到内核态会耗费时间）。而一般线程持有锁的时间并不长，为了这一点时间去挂起/恢复线程是得不偿失的。

所以考虑 **让后来的请求锁的线程等待一会，而不是挂起**，所以**为了让一个线程等待，去让这个线程执行一个忙循环（自旋）**，这种技术成为自旋锁。

自旋锁在1.6之前就有，不过默认关闭，1.6之后默认开启。

自旋锁不能完全代替阻塞，因为其占用处理器时间，在锁占用时间较短时，效果较好。

故自旋的时间有限制，超过自旋限定次数也没获取到锁，则挂起线程。

自旋的默认次数时10次，可以通过`--XX:PreBlockSpin`修改。

**自适应的自旋锁**：自旋时间不固定，而是和前一次同一个锁上的自旋时间以及锁的拥有者的状态来决定。



### 锁消除

虚拟机即使编译器在运行时，如果检测到那些共享数据不可能存在竞争，那么就执行锁消除。锁消除可以节省毫无意义的请求锁的时间。



### 锁粗化

在编写代码的时候，一般推荐将同步快的作用范围限制得尽量小。

只在共享数据的实际作用域才进行同步，这样是为了使得需要同步的操作数量尽可能变小，如果存在锁竞争，那等待线程也能尽快拿到锁。

但是如果一系列的连续操作都对同一个对象反复加锁和解锁，那么会带来很多不必要的性能消耗。



### synchronized 和 ReenTrantLock 对比

- **都是可重入锁**：都是可重入锁

  > **可重入锁**
  >
  > 自己可以再次获取自己的内部锁。
  >
  > 比如一个线程获取了一个对象的锁，此时锁还没有释放，当其还要再次获取对象的锁时可以进行获取。
  >
  > 如果锁不可重入，就会造成死锁。
  >
  > 同一个线程每次获取锁，都会增加锁的次数+1，等到锁的计数器降为零才是释放锁。

- **synchronized依赖于JVM，而ReenTrantLock依赖于API**

  synchronized依赖于JVM实现，即使进行了优化，也是在虚拟机内部实现，没有开放。而ReenTrantLock是JDK层面实现的（也就 是 API 层面，需要 lock() 和 unlock 方法配合 try/finally 语句块来完成），可以查看源码。

- **ReenTrantLock比synchronized多出一些高级功能**

  - **等待可中断**

    ReenTrantLock提供了能够终端等待线程的机制，通过lock.lockInterruptibly()来实现。可以让正在等待的线程放弃等待，去处理其他事情。

  - **可实现公平锁**

    **ReenTrantLock可以指定公平锁/非公平锁，而synchronized只能是非公平锁。**

    > **公平锁**：先等待的线程先获得锁

    ReenTrantLock默认非公平，可以通过 ReenTrantLock类的 ReentrantLock(boolean fair) 构造方法来制定是否是公平的。

  - **可实现选择性通知（锁绑定多个条件）**

    synchronized关键字与wait()和notify/notifyAll()方法相结合可以实现等待/通知机制。

    而ReenTrantLock借助于Condition接口与newCondition() 方法，更灵活，比如可以实现多路通知功能也就是在一个Lock对象中可以创建多个Condition实例（即对象监视器）。

    线程对象可以注册在指定的Condition中，从而可以**有选择性的进行线程通知**，在调度线程上更加灵活。 在使用notify/notifyAll()方法进行通知时，被通知的线程是由 JVM 选择的，用ReentrantLock类结合 Condition实例可以实现“选择性通知” 。

    而 synchronized关键字就相当于整个Lock对象中只有一个Condition实例，所有的线程都注册在它一个身上。如果 执行notifyAll()方法的话就会通知所有处于等待状态的线程，这样会造成很大的效率问题，而Condition实例的 signalAll()方法 只会唤醒注册在该Condition实例中的所有等待线程。



### volatile保证变量可见性

- JDK1.2之前，内存模型是从主存（共享内存）读取变量

- 现在的内存模型，线程可以把变量存在本地内存（如机器的寄存器），而不是直接从主存中进行读写。

  ![image-20220427170122920](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220427170122920.png)

- 这样可能导致数据不一致问题：如一个线程在主存中修改了变量的值，而另一个线程还在使用寄存器中变量值的拷贝，造成数据不一致。

- 解决方案是变量声明volatile，告知JVM该变量不稳定，每次使用都要直接从主存中读取，即保证变量的可见性。

  ![image-20220427170100563](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220427170100563.png)

- volatile的另一个作用是防止指令重排。



### synchronized与volatile的区别

- **volatile是线程同步的轻量级实现，性能相对较好。**
- **volatile只能用于变量，synchronized可以修饰方法/代码块。**synchronized使用场景更多。
- **多线程访问volatile不会阻塞，而synchronized会。**
- **volatile还能保证数据的可见性，但不能保证原子性。synchronized都能保证**
- **用途**：volatile主要用于解决变量在多个线程之间的可见性，synchronized主要解决多个线程访问资源的同步性。



### 为什么要用线程池？

- 线程池提供了一种限制和管理资源的方式，每个线程池还维护基本的统计数据，如完成数量。
- **降低资源消耗**：通过重复利用已创建的线程，降低线程创建销毁的资源消耗。
- **提高响应速度**：任务到达时，不需要等待线程创建就可以立即执行
- **提高线程的可管理性**：线程是稀缺资源，不能无限创建，会消耗系统资源，降低系统稳定性。通过线程池可以进行统一调配，调优和监控。



### 线程池执行任务，实现Runnable接口与Callable接口的区别

- 都可以被ThreadPoolExecutor或ScheduledThreadPoolExecutor执行。
- Runnable不会返回执行结果，而Callable可以返回结果。

> 工具类 Executors 可以实现 Runnable 对象和 Callable 对象之间的相互转换。 
>
> Executors.callable(Runnable task) 或 Executors.callable(Runnable task，Object resule)



### 线程池执行任务，执行execute()方法和submit()方法的区别是什么呢？

- **execute用于提交不需要返回值的任务，无法判断线程池执行成功与否**

- **submit用于提交需要返回值的任务。**

  线程池会返回一个future类型的对象，通过这个future对象可以判断 任务是否执行成功，并且可以通过future的get()方法来获取返回值。

  get()方法会阻塞当前线程直到任务完成，而使用 get（long timeout，TimeUnit unit） 方法则会阻塞当前线程一段时间后立即返回，这时候有可能任务没有执行完。



### 如何创建线程池

#### 通过Executors类提供的方法

- **newCachedThreadPool** 

  可缓存的线程池，若线程数超过处理所需，缓存一段时间后会回收，若线程数不够，则新建线程。

  线程池的线程数量不确定，但 若有空闲线程可以复用，则会优先使用可复用的线程。若所有线程均在工作，又有新的任务提交，则会创建新的线程处理任务。所有线程在当前任务执行完毕后，将返回线程池进行复用。

  ```java
  ExecutorService executorService = Executors.newCachedThreadPool();
  ```

- **newFixedThreadPool** 

  固定大小线程池，可控制并发的线程数，超出的线程会在队列中等待。

  该线程池中的线程数量始终不变。当有一个新的 任务提交时，线程池中若有空闲线程，则立即执行。若没有，则新的任务会被暂存在一个任务队列中，待有线程空闲时，便处理在任务队列中的任务。

  ```java
  ExecutorService executorService = Executors.newFixedThreadPool(3);
  ```

- **newScheduledThreadPool**

  周期性的线程池，支持定时及周期性执行任务。

  ```java
  private static void createScheduledThreadPool() {
      ScheduledExecutorService executorService = Executors.newScheduledThreadPool(3);
      System.out.println(DateUtil.now() + " 提交任务");
      for (int i = 0; i < 10; i++) {
          final int index = i;
          executorService.schedule(() -> {
              // 获取线程名称,默认格式:pool-1-thread-1
              System.out.println(DateUtil.now() + " " + Thread.currentThread().getName() + " " + index);
              // 等待2秒
              sleep(2000);
              // 延迟3秒执行任务
          }, 3, TimeUnit.SECONDS);
      }
  }
  ```

  ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/711223-20200821180640775-1180993122.png)

  效果是提交后3秒才开始执行任务，日志是间隔2秒输出，核心线程数限制3个。

- **newSingleThreadExecutor**

  单线程的线程池，可保证所有任务按照指定顺序(FIFO, LIFO, 优先级)执行。

  若多余一个任务被提交到该线程池，任务会 被保存在一个任务队列中，待线程空闲，按先入先出的顺序执行队列中的任务。

  ```java
  ExecutorService executorService = Executors.newSingleThreadExecutor();
  ```



#### 通过ThreadPoolExecutor自定义

![image-20220427173047208](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220427173047208.png)

```java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler) {
    // 省略...
}
```

- corePoolSize：核心线程数，线程池中始终存活的线程数。

- maximumPoolSize: 最大线程数，线程池中允许的最大线程数。

- keepAliveTime: 存活时间，线程没有任务执行时最多保持多久时间会终止。

- unit: 单位，参数keepAliveTime的时间单位，7种可选。

  | 参数                  | 描述 |
  | --------------------- | ---- |
  | TimeUnit.DAYS         | 天   |
  | TimeUnit.HOURS        | 小时 |
  | TimeUnit.MINUTES      | 分   |
  | TimeUnit.SECONDS      | 秒   |
  | TimeUnit.MILLISECONDS | 毫秒 |
  | TimeUnit.MICROSECONDS | 微妙 |
  | TimeUnit.NANOSECONDS  | 纳秒 |

- workQueue: 一个阻塞队列，用来存储等待执行的任务，均为线程安全，7种可选。

  | 参数                  | 描述                                                         |
  | --------------------- | ------------------------------------------------------------ |
  | ArrayBlockingQueue    | 一个由数组结构组成的有界阻塞队列。                           |
  | LinkedBlockingQueue   | 一个由链表结构组成的有界阻塞队列。                           |
  | SynchronousQueue      | 一个不存储元素的阻塞队列，即直接提交给线程不保持它们。       |
  | PriorityBlockingQueue | 一个支持优先级排序的无界阻塞队列。                           |
  | DelayQueue            | 一个使用优先级队列实现的无界阻塞队列，只有在延迟期满时才能从中提取元素。 |
  | LinkedTransferQueue   | 一个由链表结构组成的无界阻塞队列。与SynchronousQueue类似，还含有非阻塞方法。 |
  | LinkedBlockingDeque   | 一个由链表结构组成的双向阻塞队列。                           |

- threadFactory: 线程工厂，主要用来创建线程，默及正常优先级、非守护线程。

- handler：拒绝策略，拒绝处理任务时的策略，4种可选，默认为AbortPolicy。

  | 参数                | 描述                                                      |
  | ------------------- | --------------------------------------------------------- |
  | AbortPolicy         | 拒绝并抛出异常。                                          |
  | CallerRunsPolicy    | 重试提交当前的任务，即再次调用运行该任务的execute()方法。 |
  | DiscardOldestPolicy | 抛弃队列头部（最旧）的一个任务，并执行当前任务。          |
  | DiscardPolicy       | 抛弃当前任务。                                            |



### 悲观锁、乐观锁的优缺点，CAS有什么缺陷，该如何解决

- 悲观锁：总是假设最坏的情况，每次去拿数据的时候都认为别人会修改，所以每次拿数据的时候都会上锁，这样别人拿数据的时候就会阻塞知道它拿到锁；比如关系型数据库的行锁、表锁、读锁、写锁；比如java里面的同步原语synchronized关键字的实现也是悲观锁；

- 乐观锁：每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有更新这个数据。乐观锁适用于多读的应用类型，可以提高吞吐量。java中java.util.conncurrent.atomic包下面的原子变量类就是使用了乐观锁的一种实现方式CAS实现的；

- CAS：CAS是乐观锁技术，当多个线程尝试使用CAS同时更新同一个变量时，只有其中一个线程能更新变量的值，而其他线程都失败，失败的线程不会被挂起，而是被告知这次竞争失败，并可以再次尝试；

- CAS的缺陷：ABA问题、循环时间长开销大，只能保证一个共享变量的原子操作；

> ABA问题：
>
> ABA问题是指在CAS操作时，其他线程将变量值A改为了B，但是又被改回了A，等到本线程使用期望值A与当前变量进行比较时，发现变量A没有变，于是CAS就将A值进行了交换操作，但是实际上该值已经被其他线程改变过。



### ABC三个线程如何保证顺序执行

用Thread.join() 方法，或者线程池newSingleThreadExecutor（原理是会将所有线程放入一个队列，而队列则保证了FIFO）,也可以通过ReentrantLock，state整数用阿里判断轮到谁来执行

> join()使用场景：
>
> 主线程的代码块中，如果碰到了t.join()方法，此时主线程需要等待（阻塞），等待子线程结束了(Waits for this thread to die.),才能继续执行t.join()之后的代码块。



### sleep和wait的区别

首先，sleep()方法属于Thread类的，而wait()方法是属于Object类的；

sleep()方法导致了程序暂停执行指定的时间，让出cpu给其他线程，但是他的监控状态依然保持，当指定的时间到了又自动回恢复运行状态，调用了sleep()方法的过程中，线程不会释放对象锁；

而当调用了wait()方法的时候，线程回放弃对象锁，进入等待此对象的等待锁定池，只有针对此对象调用notify()方法后本线程才进入对象锁定池准备。





### notify和notifyAll的区别

notify()方法表示，当前线程已经放弃对资源的占有，通知等待的线程来获取对资源的占有权，但是只有一个线程能够从wait状态中恢复；

notifyAll()方法表示，当前的线程已经放弃对资源的占有，通知所有的等待线程从wait()方法后的语句开始执行，但最终只有一个线程能竞争获得锁并执行；notify()是对notifyAll()的一个优化，



### ThreadLocal的了解，实现原理（待补充）

ThreadLocal，线程本地变量。定义了一个ThreadLocal，每个线程往这个ThreadLocal中读写都是线程隔离的，互相之间不会影响，他提供了一种将可变数据通过每个线程有自己的独立副本从而实现线程封闭的机制；

实现的思路，Thread类有一个类型为ThreadLocal.ThreadLocalMap的实例变量threadLocals，也就是说每个线程都有一个自己的ThreadLocalMap。ThreadLocalMap有自己的独立实现，可以简单的将它的key视作ThreadLocal，value为代码中放入的值（实际上key并不是ThreadLocal本省，而是它的一个弱引用）。

每个线程在往ThreadLocal里set值的时候，都会往自己的ThreadLocalMap里存，读也是已某个ThreadLocal作为引用，在自己的map里找对应的key，从而实现了线程的隔离。如果想详细了解，可以参考：[ThreadLocal源码解读](



## JVM

#### 什么是字节码？字节码的好处是？

Java中，JVM可以理解的代码叫做字节码，是扩展名为`.class`的文件。

不面向任何处理器，只面向虚拟机。

Java通过字节码的方式，一定程度上解决了传统解释型语言执行效率低的问题，保留了解释型语言可移植的特点。

字节码不针对特定机器，所以无需重新编译，便可以在多种不同操作系统上运行。

##### Java程序从源代码到运行的过程

![Java程序转变为机器代码的过程](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/3af43aee.png)



### java内存区域

- 程序计数器
- 虚拟机栈
- 本地方法栈
- 堆
  - 字符串常量池
- 方法区
  - 运行时常量池
- 直接内存



### 讲一下JMM（Java内存模型）

- 1.2之前，java内存模型实现总是从主存（共享内存）读取变量。
- 当前内存模型下：
  - 线程可以把变量保存在**本地内存**（如机器寄存器）中，而不是主存中进行读写
  - 缺点是线程在主存中修改变量的值，而另一个线程在使用寄存器中变量的拷贝，造成**数据不一致**

- **一致性问题的解决方案**：变量声明关键字`volatile`，告知JVM这个变量每次数据从主存中读取





### 程序计数器为什么是私有的

程序计数器的作用：

- 字节码解释器通过**改变程序计数器来依次读取指令**，从而实现代码的流程控制，如：顺序执行、选择、循环、异常处理。
- 在多线程的情况下，程序计数器用于**记录当前线程执行的位置**，从而当线程被切换回来的时候能够知道该线程上次运行到哪儿了。

所以，程序计数器私有主要是为了**线程切换后能恢复到正确的执行位置**。



### 虚拟机栈和本地方法栈为什么是私有的

- **虚拟机栈**

  每个 Java 方法在执行的同时会创建一个栈帧用于存储局部变量表、操作数栈、常量池引用等信息。从方法调用直至执行完成的过程，就对应着一个栈帧在 Java 虚拟机栈中入栈和出栈的过程。

- **本地方法栈**

  和虚拟机栈所发挥的作用非常相似，区别是： **虚拟机栈为虚拟机执行 Java 方法 （也就是字节码）服务，而本地方法栈则为虚拟机使用到的 Native 方法服务。** 在 HotSpot 虚拟机中和 Java 虚拟机栈合二为一。

为了**保证线程中的局部变量不被别的线程访问到**，虚拟机栈和本地方法栈是线程私有的。



### 了解堆和方法区

堆和方法区是所有线程共享的资源，

堆是进程中最大的一块内存，主要用于存放新创建的对象 (所有对象都在这里分配内存)；

方法区主要用于存放已被加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。





### 对象创建过程

1. **类加载检查**

   如果没有，那必须先执行相应的类加载过程。

2. **分配内存**

   分配方式有指针碰撞和空闲列表，取决于java堆是否规整

   java堆是否规整取决于垃圾收集器是否有压缩整列功能

   - 指针碰撞
     - 场景：适用于内存规整
     - 原理：使用过与没使用过的内存划分两边，中间有分界指针，向没用过的内存方向移动对象内存大小
   - 空闲列表
     - 场景：内存不规整
     - 原理：虚拟机维护列表，记录可用内存，分配时选择足够大的内存款分给对象实例，然后更新列表

3. **初始化零值**

   将分配到的内存空间都初始化为零值（不包括对象头）

   保证了对象的实例字段在 Java 代码中可以不赋初始值就直接使用。

4. **设置对象头**

   对对象进行必要的设置，

   这个对象是哪个类的实例、如何才能找到类的元数据信息、对象的哈希码、对象的 GC 分代年龄等信息。

   包括是否启用偏向锁等。

5. **执行init方法**

   执行 new 指令之后会接着执行 `<init>` 方法，把对象按照程序员的意愿进行初始化，这样一个真正可用的对象才算完全产生出来。









### 创建对象时分配内存的线程安全问题

创建对象的内存分配过程如何保证线程安全？

- **CAS+失败重试**

  CAS是乐观锁实现方式的一种，有冲突时会进行重试，保证操作的原子性。

- **TLAB**

  为每一个线程预先在 Eden 区分配一块儿内存，JVM 在给线程中的对象分配内存时，

  首先在 TLAB 分配，当对象大于 TLAB 中的剩余内存或 TLAB 的内存已用尽时，再采用上述的 CAS 进行内存分配



### 对象在内存中的布局有哪些

分为三个区域：

- **对象头**

  - 存储对象自身的运行时数据：包括哈希码，GC分代年龄，锁状态标志等
  - 类型指针：即对象指向它的类元数据指针，虚拟机通过这个指针确定这个对象是哪个类的实例

- **实例数据**

  对象真正存储的有效信息，包括程序中定义的各种类型字段内容

- **对齐填充**

  起占位作用，

  因为虚拟机要求对象起始地址为8字节的整数倍，即对象大小为8字节的整数倍，对象头是8字节的整数倍，但实例数据不一定，通过这个来补全。



### 对象的访问方式

建立对象就是为了使用对象， Java 程序通过栈上的 reference 数据来操作堆上的具体对象。

对象的访问方式由虚拟机实现而定，目前主流的访问方式有：**句柄**、**直接指针**。

- **句柄**

  Java堆中划分出一块内存作为**句柄池**，reference 存储对象的句柄地址，

  句柄中包含了对象实例数据与类型数据各自的具体地址信息。

  **优势**

  reference 中存储的是稳定的句柄地址，在对象被移动时只会改变句柄中的实例数据指针，而 reference 本身不需要修改。

  ![对象的访问定位-使用句柄](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/sdfsdfsdfsdfsdf.png)

- **直接指针**

  reference 中存储的直接就是对象的地址。

  **优势**

  速度快，它节省了一次指针定位的时间开销。

  ![对象的访问定位-直接指针](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dfhdfhndjkgnerigrengi.png)



### 垃圾收集有哪些算法，特点是

#### 标记-清除算法

该算法分为“标记”和“清除”阶段：

- 首先标记出所有不需要回收的对象
- 在标记完成后统一回收掉所有没有被标记的对象

它是最基础的收集算法，后续的算法都是对其不足进行改进得到。

**缺陷**

- 效率问题
- 空间问题：标记清除后产生大量不连续的碎片



#### 复制算法

- 将内存分为大小相同的两块，每次使用其中的一块。
- 当这一块的内存使用完后，就将还存活的对象复制到另一块去，然后再把使用的空间一次清理掉。

- 使每次的内存回收都是对内存区间的一半进行回收。



#### 标记-整理算法

根据老年代的特点提出的一种标记算法，标记过程仍然与“标记-清除”算法一样，但后续步骤不是直接对可回收对象回收。

- 首先标记出所有不需要回收的对象
- 让所有存活的对象向一端移动，然后直接清理掉端边界以外的内存。



#### 分代收集算法

当前虚拟机的垃圾收集都采用分代收集算法。

- 根据对象存活周期的不同将内存分为几块，一般将 java 堆分为新生代和老年代
- 根据各个年代的特点选择合适的垃圾收集算法
- **如在新生代中，每次收集都会有大量对象死去，所以可以选择复制算法，只需要付出少量对象的复制成本就可以完成每次垃圾收集。**
- **老年代的对象存活几率是比较高的，而且没有额外的空间对它进行分配担保，所以选择“标记-清除”或“标记-整理”算法进行垃圾收集。**



### HotSpot为什么要分新生代和老年代

主要是为了提升 GC 效率，参考[分代收集算法](####分代收集算法)



### 常见的垃圾回收器有哪些（待补充）

**收集算法是内存回收的方法论，垃圾收集器是内存回收的具体实现。**

#### Serial 收集器

#### ParNew 收集器

#### Parallel Scavenge 收集器

#### Serial Old 收集器

#### CMS 收集器

#### G1 收集器

#### ZGC 收集器



# 框架

## Spring

### 列举一些重要的 Spring 模块？

- **Spring Core**

  核心模块， 主要提供 IoC 依赖注入功能的支持。

- **Spring Aspects**  与 AspectJ 的集成提供支持。

- **Spring AOP**  提供了面向切面的编程实现。

- **Spring Data Access/Integration** 

  由 5 个模块组成

  - **spring-web** ：对 Web 功能的实现提供一些最基础的支持。
  - **spring-webmvc** ： 提供对 Spring MVC 的实现。
  - **spring-websocket** ： 提供了对 WebSocket 的支持，WebSocket 可以让客户端和服务端进行双向通信。
  - **spring-webflux** ：提供对 WebFlux 的支持。WebFlux 是 Spring Framework 5.0 中引入的新的响应式框架。与 Spring MVC 不同，它不需要 Servlet API，是完全异步。

- **Spring Test**  单元测试和集成测试





### Spring用到的设计模式

- **工厂设计模式**：Spring 使用工厂模式通过 `BeanFactory`、`ApplicationContext` 创建 bean 对象。

- **代理设计模式**：Spring AOP 功能的实现，使用JDK动态代理，CGLIB字节码生成技术。

- **单例设计模式**：Spring 中的 Bean 默认都是单例的。

- **模板方法模式**：Spring 中 `jdbcTemplate`、`hibernateTemplate`、`RestTemplate`、`JpaTemplate` 等以 Template 结尾的类，它们就使用到了模板模式，用来解决代码重复问题。

- **包装器设计模式**：我们的项目需要连接多个数据库，而且不同的客户在每次访问中根据需要会去访问不同的数据库。这种模式让我们可以根据客户的需求能够动态切换不同的数据源。

- **观察者模式**： 定义的对象间存在一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知被制动更新，如 ApplicationContext 事件机制是观察者设计模式的实现，通过 ApplicationEvent 类和 ApplicationListener接口，可以实现ApplicationContext事件处理。

  Spring 事件驱动模型就是观察者模式很经典的一个应用。

- **适配器模式**：Spring AOP 的增强或通知(Advice)使用到了适配器模式、spring MVC 中也是用到了适配器模式适配`Controller`。

- ......





### @RestController与@Controller

- **`Controller` 返回一个页面**
- **`@RestController` 返回JSON 或 XML 形式数据**
- **`@Controller +@ResponseBody` 返回JSON 或 XML 形式数据**



### IOC

#### 理解

控制反转，一种设计思想。

**将原本在程序中手动创建对象的控制权，交由Spring框架来管理。** 

 **IoC 容器是 Spring 用来实现 IoC 的载体， IoC 容器实际上就是个Map(key,value),Map 中存放的是各种对象。**

将对象之间的相互依赖关系交给 IoC 容器来管理，并由 IoC 容器完成对象的注入。

**当我们需要创建一个对象的时候，只需要配置好配置文件/注解即可，完全不用考虑对象是如何被创建出来的。**



#### 控制反转与依赖注入一样吗？

是对同一件事情的不同描述，描述的角度不同。

- **依赖注入**  从应用程序角度

  完整描述：应用程序依赖于容器创建并注入它所需的外部资源

- **控制反转**  从容器角度

  完整描述：容器控制应用程序，由容器反向向应用程序注入应用程序所需的外部资源。



#### 依赖注入有哪些方式

1. 构造器注入：将被依赖对象通过构造函数的参数提供，在初始化时注入
2. setter方法注入：通过调用成员变量提供的setter方法将被依赖对象注入
3. 接口注入：依赖类实现一个接口的方法，这个方法用于依赖注入对象



#### IOC初始化过程（待补充）

https://javadoop.com/post/spring-ioc







#### @Autowired 和 @Resource 的区别是什么？

- `Autowired` 属于 Spring 内置的注解，默认的注入方式为`byType`（根据类型进行匹配），优先根据接口类型去匹配并注入 Bean （接口的实现类）。

  > **按类型注入的问题所在**
  >
  > 当一个接口存在多个实现类的话，`byType`这种方式就无法正确注入对象。
  >
  > 这种情况下，注入方式会变为 `byName`（根据名称进行匹配），这个名称通常就是类名（首字母小写）
  >
  > 可以通过 `@Qualifier` 注解来显示指定名称而不是依赖变量的名称
  >
  > ```java
  > @Autowired
  > @Qualifier(value = "smsServiceImpl1")
  > private SmsService smsService;
  > ```

- `@Resource`属于 JDK 提供的注解，默认注入方式为 `byName`。

  如果无法通过名称匹配到对应的 Bean 的话，注入方式会变为`byType`。

- 当一个接口存在多个实现类的情况下，`@Autowired` 和`@Resource`都需要通过名称才能正确匹配到对应的 Bean。`Autowired` 可以通过 `@Qualifier` 注解来显示指定名称，`@Resource`可以通过 `name` 属性来显示指定名称。

**共同点**

- 都可以写在字段和setter方法上



#### BeanFactory与ApplicationContext的区别

BeanFactory和ApplicationContext是Spring的两大核心接口，都可以当做Spring的容器。

其中ApplicationContext是BeanFactory的子接口,，包含 BeanFactory 的所有特性，它的主要功能是支持大型的业务应用的创建。

- BeanFactory是Spring里面最底层的接口，包含了各种Bean的定义，读取bean配置文档，管理bean的加载、实例化，控制bean的生命周期，维护bean之间的依赖关系。

  ApplicationContext接口作为BeanFactory的派生，除了提供BeanFactory所具有的功能外，还提供了更完整的框架功能：支持国际化/统一的资源文件访问方式/提供在监听器中注册bean的事件/同时加载多个配置文件/载入多个（有继承关系）上下文 ，使得每一个上下文都专注于一个特定的层次，比如应用的web层。

- BeanFactory通常是使用编程方式被创建的；

  而ApplicationContext可以用声明（就是用配置的方式）的方式创建，也可以使用ApplicationContext的实现类之一用编码方式来创建ApplicationContext的实例。

- BeanFactroy采用的是**延迟加载**形式来注入Bean的，只有在使用到某个Bean时（getBean调用），才对该Bean进行加载实例化。（Bean的配置问题会在调用后才会报错）

  ApplicationContext在容器启动时，一次性创建了所有的Bean。（占用内存，启动慢）

- BeanFactory和ApplicationContext都支持BeanPostProcessor、BeanFactoryPostProcessor的使用，但两者之间的区别是：BeanFactory需要手动注册，而ApplicationContext则是自动注册。



#### FactoryBean是什么？

是一种特殊的工厂Bean接口，可以自己创建Bean实例。

如果一个类实现了FactoryBean接口，这个类就可以通过重写`getObject`方法自定义创建实例的方法。



### AOP

#### AOP的理解

面向切面编程，将那些与业务无关，**却为业务模块所共同调用的逻辑或责任（例如事务处理、日志管理、权限控制等）封装起来**，便于**减少系统的重复代码**，**降低模块间的耦合度**，并**有利于未来的可拓展性和可维护性**。

**Spring AOP就是基于动态代理的**，如果要代理的对象，实现了某个接口，那么Spring AOP会使用**JDK Proxy**，去创建代理对象，而对于没有实现接口的对象，就无法使用 JDK Proxy 去进行代理了，这时候Spring AOP会使用**Cglib** ，这时候Spring AOP会使用 **Cglib** 生成一个被代理对象的子类来作为代理。



#### 谈谈对于AOP的理解

**AOP（Aspect-Oriented Programming）面向切面编程**

能够将那些与业务无关，却为业务模块所共同调用的逻辑或责任（例如事务处理、日志管理、权限控制等）封装起来，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可拓展性和可维护性。

Spring AOP 就是基于动态代理的：

- 如果要代理的对象，实现了某个接口，那么 Spring AOP 会使用 **JDK Proxy**，去创建代理对象；
- 而对于没有实现接口的对象，pring AOP 会使用 **Cglib** 生成一个被代理对象的子类来作为代理。







### Spring Bean



#### Bean和Java对象区别

1. Bean是经历完整bean生命周期生成的，放在单例池（singletonObjects）中（大部分）的对象，是由Spring创建的对象。
2. bean创建好后属性是经过初始化和注入的，new出来的java对象属性是默认值。



#### bean的作用域

- **singleton** : **唯一** bean 实例，Spring 中的 bean 默认都是单例的。

- **prototype** : **每次请求**都会创建一个新的 bean 实例。

- **request** : **每一次HTTP请求**都会产生一个新的bean，该bean仅在**当前HTTP request内**有效。

- **session** : **每一次HTTP请求**都会产生一个新的 bean，该bean仅在**当前 HTTP session 内**有效。

- **global-session**： **全局session作用域**，仅仅在基于portlet的web应用中才有意义，Spring5已经没有了。

  > Portlet是能够生成语义代码(例如：HTML)片段的小型Java Web插件。
  >
  > 它们基于portlet容器，可以像servlet一样处理HTTP请求。
  >
  > 但是，与 servlet 不同，每个 portlet 都有不同的会话.



#### 单例bean的线程安全问题

单例 bean 存在线程问题，主要是因为当多个线程操作同一个对象的时候，对这个对象的**非静态成员变量的写操作**会存在线程安全问题。

**解决方法**

- 在Bean对象中尽量避免定义可变的成员变量（不太现实）。
- 在类中定义一个ThreadLocal成员变量，将需要的可变成员变量保存在 ThreadLocal 中（推荐的一种方式）。



#### Bean的生成步骤

**简略版**

1. Spring扫描class得到BeanDefinition
2. 根据得到的BeanDefinition生成Bean
3. 根据class推断构造方法，通过反射创建对象（原始对象）
4. 填充原始对象的属性（依赖注入）
5. 如果原始对象的某个方法被AOP，则根据原始对象生成一个代理对象
6. 将生成的代理对象放入单例池（SingletonObjects），下一次getBean时从这里拿



#### Bean的生命周期

分为：实例化、初始化、接收请求、销毁。

1. **推断构造方法**：选择最佳的构造方法，以此进行实例化。

2. **实例化对象**：

   - 对于BeanFactory，当用户请求未初始化的Bean时，容器调用createBean进行实例化。
   - 对于ApplicationContext，容器启动结束后，通过获取BeanDefinition对象中的信息，通过Java反射实例化对象。

3. **初始化对象**：

   - 检查是否需要Definition的合并；

   - 验证这个spring容器是否支持循环依赖（单例池都支持循环依赖），如果支持会把ObjectFactory进行提前暴露（供循环依赖使用）；

     > **为什么不直接暴露Bean？**
     >
     > 提前暴露Bean不利于做扩展，所以先暴露一个工厂对象。

4. **设置对象属性**：（依赖注入）

   实例化后的对象被封装在BeanWrapper对象中，

   Spring根据BeanDefinition中的信息，通过BeanWrapper提供的设置属性的接口完成依赖注入。

5. **处理Aware接口**：

   Spring会检测该对象是否实现了xxxAware接口，并将相关的xxxAware实例注入给 bean，还有进行回调。

   - 如果Bean实现了BeanNameAware接口，会调用它实现的setBeanName(String beanId)方法，此处传递的就是Spring配置文件中Bean的 id 值；
   - 如果Bean实现了BeanFactoryAware接口，会调用它实现的setBeanFactory() 方法，传递的是Spring工厂自身；
   - 如果Bean实现了ApplicationContextAware接口，会调用setApplicationContext(ApplicationContext) 方法，传入Spring上下文，就是IOC容器；
   - 如果Bean实现了ClassLoaderAware接口，会调用setClassLoader() 方法。

6. **BeanPostProcessor前置处理**：

   如果这个Bean实现了BeanPostProcessor接口，此时会调用`postProcessBeforeInitialization(Object obj, String s)`方法，对Bean进行自定义的处理。

7. **InitializingBean 与 init-method处理**：

   如果Bean在Spring配置文件中配置了 `init-method`属性或者Bean实现了`InitializingBean`接口，并重写了里面的`afterPropertiesSet`方法，则会自动调用，进行对应的初始化方法。

8. **BeanPostProcessor后置处理**：

   如果这个Bean实现了BeanPostProcessor接口，此时会调用`postProcessAfterInitialization(Object obj, String s)`方法；

   由于这个方法是在Bean初始化结束时调用的，所以可以被应用于内存或缓存技术；

> 以上几个步骤完成后，Bean就已经被正确创建了，之后就会把这个 bean 放到容器中就可以使用这个 Bean 了，调用方法 `getBean()`。

9. **DisposableBean销毁**：

   当Bean不再需要时，会经过清理阶段，如果Bean实现了`DisposableBean`这个接口，会调用其实现的destroy()方法；

10. **destroy-method处理**

    如果这个Bean的Spring配置中配置了destroy-method属性，会自动调用其配置的销毁方法。

![Spring Bean 生命周期](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/5496407.jpg)



#### 接口方法分类

- **Bean自身方法**

  - Bean自身调用的方法
  - 配置文件中`<bean>`的init-method和destroy-method指定的方法

- **Bean级生命周期接口方法**

  包括

  - `BeanNameAware`
  - `BeanFactoryAware`
  - `InitializingBean`
  - `DiposableBean`

  这些接口包含的方法

- **容器级生命周期接口方法**

  包括`InstantiationAwareBeanPostProcessor`和`BeanPostProcessor `两个接口的实现

  其实现类被称为"后处理器"

- **工厂后处理器接口方法**

  包括

  - `AspectJWeavingEnabler`
  - `ConfigurationClassPostProcessor`
  - `CustomAutowireConfigurer`

  等工厂后处理器接口的方法，也是容器级的，在应用上下文装配配置文件后立即调用









### Spring事务

#### Spring事务隔离级别有几种

**TransactionDefinition 接口中定义了五个表示隔离级别的常量：**

1. **TransactionDefinition.ISOLATION_DEFAULT**

   使用后端数据库默认的隔离级别，Mysql 默认采用的 REPEATABLE_READ（可重复读）隔离级别

2. **TransactionDefinition.ISOLATION_READ_UNCOMMITTED**

   读未提交，允许读取尚未提交的数据变更；导致脏读幻读不可重复读

3. **TransactionDefinition.ISOLATION_READ_COMMITTED**

   读已提交，允许读取并发事务已经提交的数据；导致幻读不可重复读

4. **TransactionDefinition.ISOLATION_REPEATABLE_READ**

   可重复读，同一事务多次读取结果是一致的，除非被本事务修改；导致幻读

5. **TransactionDefinition.ISOLATION_SERIALIZABLE**

   串行化，所以事务依次执行；影响性能



#### Spring事务的传播行为

**支持当前事务**

- **TransactionDefinition.PROPAGATION_REQUIRED**

  如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。

- **TransactionDefinition.PROPAGATION_SUPPORTS**

  如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。

- **TransactionDefinition.PROPAGATION_MANDATORY**

  如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。（mandatory：强制性）

**不支持当前事务**

- **TransactionDefinition.PROPAGATION_REQUIRES_NEW**

  创建一个新的事务，如果当前存在事务，则把当前事务挂起。

- **TransactionDefinition.PROPAGATION_NOT_SUPPORTED**

   以非事务方式运行，如果当前存在事务，则把当前事务挂起。

- **TransactionDefinition.PROPAGATION_NEVER**

  以非事务方式运行，如果当前存在事务，则抛出异常。

**其他**

- **TransactionDefinition.PROPAGATION_NESTED**

  如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于TransactionDefinition.PROPAGATION_REQUIRED。



#### Spring 事务中哪几种事务传播行为?

**事务传播行为是为了解决业务层方法之间互相调用的事务问题**。

当事务方法被另一个事务方法调用时，必须指定事务应该如何传播。例如：方法可能继续在现有事务中运行，也可能开启一个新事务，并在自己的事务中运行。

**1.`TransactionDefinition.PROPAGATION_REQUIRED`**

使用的最多的一个事务传播行为，我们平时经常使用的`@Transactional`注解默认使用就是这个事务传播行为。

**如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。**

**`2.TransactionDefinition.PROPAGATION_REQUIRES_NEW`**

创建一个新的事务，如果当前存在事务，则把当前事务挂起。也就是说不管外部方法是否开启事务，`Propagation.REQUIRES_NEW`修饰的内部方法会新**开启自己的事务，且开启的事务相互独立，互不干扰。**

**3.`TransactionDefinition.PROPAGATION_NESTED`**

如果当前存在事务，则创建一个事务作为当前事务的**嵌套事务**来运行；如果当前没有事务，则该取值等价于`TransactionDefinition.PROPAGATION_REQUIRED`。

**4.`TransactionDefinition.PROPAGATION_MANDATORY`**

如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。（mandatory：强制性）

**不会回滚的事务配置**

- **`TransactionDefinition.PROPAGATION_SUPPORTS`**: 如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。
- **`TransactionDefinition.PROPAGATION_NOT_SUPPORTED`**: 以非事务方式运行，如果当前存在事务，则把当前事务挂起。
- **`TransactionDefinition.PROPAGATION_NEVER`**: 以非事务方式运行，如果当前存在事务，则抛出异常。



#### Spring 管理事务的方式有几种？

- **编程式事务** ： 在代码中硬编码(不推荐使用) : 通过 `TransactionTemplate`或者 `TransactionManager` 手动管理事务，实际应用中很少使用，但是对于你理解 Spring 事务管理原理有帮助。

- #### **声明式事务** ： 在 XML 配置文件中配置或者直接基于注解（推荐使用） : 实际是通过 AOP 实现（基于`@Transactional` 的全注解方式使用最多）



#### @Transactional(rollbackFor = Exception.class)注解

当 `@Transactional` 注解作用于类上时，该类的所有 public 方法将都具有该类型的事务属性，同时，我们也可以在方法级别使用该标注来覆盖类级别的定义。

如果类或者方法加了这个注解，那么这个类里面的方法抛出异常，就会回滚，数据库里面的数据也会回滚。

如果不配置`rollbackFor`属性，那么事务只会在遇到`RuntimeException`的时候才会回滚，加上 `rollbackFor=Exception.class`，可以让事务在遇到非运行时异常时也回滚。



#### @transactional注解失效的场景及原因（待补充）

一个目标对象的方法调用该目标对象的另外一个方法时，即使被调用的方法已使用了@Transactional注解标记，事务也不会有效执行；

Spring的官方说明在代理下（默认或者配置为proxy-targer-class="true"），只有当前代理类的外部方法调用注解方法时代理才会被拦截。



### 循环依赖与三级缓存



#### 什么是循环依赖/循环依赖的场景

多个对象存在互相组合的环状依赖关系，即A的属性有B，B的属性有A，导致Spring无法直接注入依赖。





#### 三级缓存机制是什么

**三级缓存及其功能**

1. 一级缓存：单例池**singletonObjects**

   存放已经实例化、初始化完成的bean。

   已经经历了完整声明周期的Bean。

2. 二级缓存：提前曝光早产bean池**earlySingletonObjects**

   存放已经实例化、未初始化的bean，保证一个类多次循环依赖时，只构建一次。

   缓存的是早期Bean对象，生命周期没有走完就被放入。

3. 三级缓存：早期单例bean工厂池**singletonFactories**

   存放Bean的BeanFactory，当加载一个Bean会将该Bean包装为BeanFactory放入三级缓存。

   缓存的是ObjectFactory，对象工厂，用来创建对象。

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/egfgefgefgegegegeg.png)

#### 有循环依赖时创建Bean的流程

创建Bean会先将该Bean的BeanFactory放到三级缓存中，以用来防止循环依赖问题。

当AB存在循环依赖时，流程如下：

1. 先创建BeanA，先实例化BeanA并包装为BeanFactory，放入三级缓存中；
2. 给BeanA进行属性填充，检查依赖，发现beanB未加载，先去加载BeanB；
3. BeanB创建过程也会包装为BeanFactory放入三级缓存，填充属性时，从三级缓存中将BeanA填充进去；
4. 缓存获取BeanA的方式是ObjectFactory.getObject方法，该方法调用getEarlyBeanReference方法，会创建Bean/Bean的代理并删除BeanA的三级缓存，加入二级缓存；
5. BeanB初始化完毕加入一级缓存，BeanA继续初始化，初始化完毕比较BeanA的二级缓存与一级缓存是否一致，一致则删除二级缓存加入一级缓存。



#### 缓存解决循环依赖的思路

对于循环依赖的AB对象，

- A在Bean创建过程中，进行依赖注入前，讲A的原始Bean放入缓存，其他Bean需要时从缓存中获取。
- A放入缓存后进行依赖注入，需要注入B的Bean，此时创建B，同样根据流程，将B的原始Bean放入缓存。
- B放入缓存后进行依赖注入，需要注入A的Bean，此时从缓存中拿到A的原始Bean，注入完成后B声明周期结束。
- 此时A完成B的依赖注入，A的声明周期结束。



#### 第三级缓存的必要性

**场景**

A的原始对象注入B的属性后，A进行了AOP增强产生一个A的代理对象。

此时A对应的Bean实际应该是A的代理对象，但按照原始的二级缓存，B中注入的A是A的原始Bean，产生了冲突。

**AOP带来的循环依赖问题**

一个Bean的生命周期最后，Spring提供一个BeanPostProcessor对Bean进行加工，不仅能修改属性值，还可以替换Bean，即BeanPostProcessor可以让beanName对应的Bean替换。

但BeanPostProcessor执行是在Bean的属性注入之后，而循环依赖发生在属性注入过程中，所以如此操作会使得注入的对象和完成生命周期的对象不一样。

同时，Spring不知道一个Bean会经历哪些BeanPostProcessor，对A进行处理，所以无法保证对象的一致。

AOP就是通过一个BeanPostProcessor来实现的，这个BeanPostProcessor就是AnnotationAwareAspectJAutoProxyCreator，它的父类是AbstractAutoProxyCreator，而在Spring中AOP利用的要么是JDK动态代理，要么CGLib的动态代理，所以如果给一个类中的某个方法设置了切面，那么这个类最终就需要生成一个代理对象。

流程就是：A类--->生成一个普通对象-->属性注入-->基于切面生成一个代理对象-->把代理对象放入singletonObjects单例池中。

**解决方案**

利用三级缓存**singletonFactories**

1. singletonFactories中存的是某个beanName对应的ObjectFactory，

   在bean的生命周期中，生成完原始对象之后，就会构造一个ObjectFactory存入singletonFactories中。

2. 这个ObjectFactory是一个函数式接口，提供一个方法**getEarlyBeanReference**

   这个接口有两个实现类实现了该方法，其中AOP的实现类AbstractAutoProxyCreator的动作
   获取beanName，将beanName和原始Bean存入earlyProxyReferences中，进行AOP得到代理对象。

   而其他实现只返回了原始bean。

3. 调用getEarlyBeanReference方法的时机是从三级缓存获取Bean的方法执行。

   从singletonFactories根据beanName得到一个ObjectFactory，然后执行ObjectFactory，也就是执行getEarlyBeanReference方法，此时会得到一个A原始对象经过AOP之后的代理对象，然后把该代理对象放入earlySingletonObjects中。

**earlySingletonObjects的作用**

通过三级缓存获得的是BeanA原始对象的代理对象，而上述流程中A原始对象尚未完成属性注入，所以不能直接将A的代理对象放入一级缓存，而是放入earlySingletonObjects二级缓存。

如果现在有其他对象依赖了A，那么则可以从earlySingletonObjects中得到A原始对象的代理对象，并且是A的同一个代理对象。

当B创建完了之后，A继续进行生命周期，而A在完成属性注入后，会按照它本身的逻辑去进行AOP。但因为三级缓存的原因，A原始对象已经经历过了AOP，就不会在进行AOP。

判断AOP已经经历的方法：利用earlyProxyReferences，如果已经存在，则说明已经进行过AOP了，无需再次进行。

对于对象A，AOP的判断与BeanPostProcessor执行之后，需要将A放入一级缓存，有AOP则放入A的代理对象，此时从二级缓存中取出，放入一级缓存。



#### 不要三级缓存能否解决循环依赖/设计三级缓存的目的

假设去掉三级缓存，无代理的情况下将原始Bean放入二级缓存，有代理的情况下将代理Bean放入二级缓存。

但问题是没有循环依赖时，AOP默认时在属性注入后进行的，也就是放入二级缓存的时候并不知道要不要AOP代理，需要提前进行代理。

三级缓存的作用就是提供一个ObjectFactories，获取它时会判断是否需要代理，以及避免重复代理。

如果使用二级缓存，为了保证有代理时存入代理Bean，需要在对象实例化后就马上创建代理对象，存入二级缓存，与Spring设计原则违背：**Bean 初始化完成之后才为其创建代理**

所以设计的目的是：

**在没有循环依赖的情况下，延迟代理对象的创建。**







#### 总结

- 三级缓存singletonFactories缓存的是一个ObjectFactory，用于生成原始Bean经过AOP后的代理Bean。

- 每个Bean生成时都会暴露一个对象工厂，在没有循环依赖时用不到，bean按照生命周期生成，放入一级缓存singletonObjects。

- 如果出现循环依赖，则从三级缓存获取一个经过了AOP的代理Bean。

- 判断是否经过AOP，通过earlyProxyReferences判断，经过AOP的bean会在这个缓存中找到。



## SpringMVC

### SpringMVC工作原理

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/de6d2b213f112297298f3e223bf08f28.png)

**流程说明（重要）：**

1. 客户端（浏览器）发送请求，直接请求到 `DispatcherServlet`。
2. `DispatcherServlet` 根据请求信息调用 `HandlerMapping`，解析请求对应的 `Handler`。
3. 解析到对应的 `Handler`（也就是我们平常说的 `Controller` 控制器）后，开始由 `HandlerAdapter` 适配器处理。
4. `HandlerAdapter` 会根据 `Handler`来调用真正的处理器开处理请求，并处理相应的业务逻辑。
5. 处理器处理完业务后，会返回一个 `ModelAndView` 对象，`Model` 是返回的数据对象，`View` 是个逻辑上的 `View`。
6. `ViewResolver` 会根据逻辑 `View` 查找实际的 `View`。
7. `DispaterServlet` 把返回的 `Model` 传给 `View`（视图渲染）。
8. 把 `View` 返回给请求者（浏览器）



#### 工作原理

1. 客户端发送请求到DispatcherServlet
2. DispatcherServlet根据请求调用HandlerMapping，解析请求对应的Handler
3. 解析到对应的Handler（即Controller控制器）后，由HandlerAdapter适配器处理
4. HandlerAdapter根据Handler调用真正的处理器处理请求及相关业务逻辑
5. 处理器处理请求后，返回一个ModelAndView对象，Model对应数据对象，View是逻辑上的View
6. ViewResolver根据逻辑View查找实际View
7. DispatcherServlet把返回的Model传给View视图渲染
8. View返回给请求者（浏览器）

![SpringMVC运行原理](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/49790288.jpg)





## SpringBoot

### 介绍一下@SpringBootApplication注解

大概可以看作三个注解的集合：

- **@Configuration**

  允许在上下文注册额外的bean或者导入配置类

- **@EnableAutoConfiguration**

  启动SpringBoot的自动配置

- **@ComponentScan**

  扫描被注解的Bean，默认扫描该类所在包下的所有类



### 自动配置如何实现

@EnableAutoConfiguration注解通过Spring提供的@Import注解，导入了AutoConfigurationImportSelector类。

AutoConfigurationImportSelector中的方法会将所有自动配置类的信息以List形式返回，这些配置信息会被Spring容器当作bean管理。

内部实际上就去加载`META-INF/spring.factories`文件的信息，然后筛选出以`EnableAutoConfiguration`为key的数据，加载到IOC容器中，实现自动配置功能



### 如何实现全局异常处理

使用@ControllerAdvice和@ExceptionHandler处理。



### 简单介绍Spring？有什么缺点

Spring是重量级企业开发框架 **Enterprise JavaBean（EJB）** 的替代品。

为企业级 Java 开发提供了一种相对简单的方法，通过 **依赖注入** 和 **面向切面编程** ，

用简单的 **Java 对象（Plain Old Java Object，POJO）** 实现了 EJB 的功能。

**问题是：Spring的组件代码是轻量级的，但它的配置却是重量级的（需要大量 XML 配置） 。**

- Spring 2.5 引入了基于注解的组件扫描，这消除了大量针对应用程序自身组件的显式 XML 配置。
- Spring 3.0 引入了基于 Java 的配置，这是一种类型安全的可重构配置方式，可以代替 XML。
- 开启某些 Spring 特性时，比如事务管理和 Spring MVC，还是需要用 XML 或 Java 进行显式配置。
- 启用第三方库时也需要显式配置，比如基于 Thymeleaf 的 Web 视图。
- 配置 Servlet 和过滤器（比如 Spring 的DispatcherServlet）同样需要在 web.xml 或 Servlet 初始化代码里进行显式配置。

组件扫描减少了配置量，Java 配置让它看上去简洁不少，但 Spring 还是需要不少配置。



### SpringBoot主要优点

1. 开发基于 Spring 的应用程序很容易；
2. 所需的开发或工程时间明显减少，通常会提高整体生产力；
3. 不需要编写大量样板代码、XML 配置和注释；
4. 可以很容易地与 Spring 生态系统集成，如 Spring JDBC、Spring ORM、Spring Data、Spring Security 等；
5. 遵循“**固执己见的默认配置**”，以减少开发工作（默认配置可以修改）；
6. 提供嵌入式 HTTP 服务器，如 Tomcat 和 Jetty，可以轻松地开发和测试 web 应用程序；
7. 提供命令行接口(CLI)工具，用于开发和测试 Spring Boot 应用程序，如 Java 或 Groovy。
8. 提供了多种插件，可以使用内置工具(如 Maven 和 Gradle)开发和测试 Spring Boot 应用程序。



### 什么是 Spring Boot Starters?

**是一系列依赖关系的集合**，因为它的存在，项目的依赖之间的关系对我们来说变的更加简单了。

如：

在没有 Spring Boot Starters 之前，我们开发 REST 服务或 Web 应用程序时，使用像 Spring MVC，Tomcat 和 Jackson 这样的库，要手动一个一个添加。

但是，有了 Spring Boot Starters 我们只需要一个只需添加一个spring-boot-starter-web一个依赖就可以了，这个依赖中包含了我们开发 REST 服务需要的所有依赖。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```







## MyBatis

### 简述MyBatis插件运行原理，如何编写一个插件

Mybatis 仅可以编写针对 `ParameterHandler`、`ResultSetHandler`、`StatementHandler`、`Executor` 这 4 种接口的插件。

Mybatis 使用 JDK 的动态代理，为需要拦截的接口生成代理对象以实现接口方法拦截功能。

每当执行这 4 种接口对象的方法时，就会进入拦截方法，具体就是 `InvocationHandler` 的 `invoke()`方法，当然，只会拦截那些你指定需要拦截的方法。

**如何编写**

实现 Mybatis 的 Interceptor 接口并复写` intercept()`方法，然后在给插件编写注解，指定要拦截哪一个接口的哪些方法即可，记住，别忘了在配置文件中配置你编写的插件。



### MyBatis缓存

有一级缓存与二级缓存，一级默认开启且不能关闭。

- 一级缓存指sqlsession级别缓存，同一个sqlsession进行的相同查询，第二次会从缓存获取

  一级缓存最多1024条sql。

- 二级缓存是mapper级别的缓存，mapper级别的不同sqlsession可以共享。



#### 一级缓存

在操作数据库时需要构造sqlSession对象，在对象中有一个数据结构用于存储缓存数据。

不同的sqlSession之间的缓存数据区域是互相不影响的。



#### 二级缓存

多个SqlSession去操作同一个Mapper的sql语句，多个SqlSession可以共用二级缓存，二级缓存是跨SqlSession的。

二级缓存区域按Mapper的namespace划分，每个mapper有自己的二级缓存区域。

每一个namespace的mapper都有一个二级缓存区域，两个mapper的namespace如果相同，这两个mapper执行sql查询到数据将存在相同的二级缓存区域中。



Spring和MyBatis整合时， 每次查询之后都要进行关闭sqlSession，关闭之后数据被清空，所以整合之后，如果没有事务，一级缓存是没有意义的。

如果开启二级缓存，关闭sqlsession后，会把该sqlsession一级缓存中的数据添加到namespace的二级缓存中。这样，缓存在sqlsession关闭之后依然存在。



#### 二级缓存的弊端

二级缓存是建立在同一个namespace下的，如果对表的操作查询可能有多个namespace，那么得到的数据就是错误的。



#### 一级缓存原理

第一次查询sql结果写入sqlsession的一级缓存，使用数据结构为map：

- **key**：MapperID+offset+limit+Sql+所有的入参
- **value**：用户信息

如果同一个sqlsession两次相同sql之间出现commit操作，则清空缓存。



#### 二级缓存原理

以命名空间为单位创建缓存数据结构，为map。

通过CacheExecutor实现，是Executor的代理对象，所有查询操作，在CacheExecutor会先匹配缓存中是否存在，不存在则查数据库。

- **key**：MapperID+offset+limit+Sql+所有的入参

需要配置：

1. 配置mybatis全局启用二级缓存
2. 对应mapper配置cache节点
3. 对应select查询节点配置useCache=true



### #{}和${}的区别

- `${}`是 Properties 文件中的变量占位符，它可以用于标签属性值和 sql 内部，属于静态文本替换，比如`${driver}`会被静态替换为`com.mysql.jdbc. Driver`。

- `#{}`是 sql 的参数占位符，MyBatis 会将 sql 中的`#{}`替换为? 号，在 sql 执行前会使用 PreparedStatement 的参数设置方法，按序给 sql 的? 号占位符设置参数值。

  比如 ps.setInt(0, parameterValue)，`#{item.name}` 的取值方式为使用反射从参数对象中获取 item 对象的 name 属性值，相当于 `param.getItem().getName()`。

  

### Xml 映射文件中，除了常见的 select|insert|update|delete 标签之外，还有哪些标签

`<resultMap>` 、 `<parameterMap>` 、 `<sql>` 、 `<include>` 、 `<selectKey>` ，加上动态 sql 的 9 个标签， `trim|where|set|foreach|if|choose|when|otherwise|bind` 等。

其中 `<sql>` 为 sql 片段标签，通过 `<include>` 标签引入 sql 片段， `<selectKey>` 为不支持自增的主键生成策略标签。



### 通常一个 Xml 映射文件，都会写一个 Dao 接口与之对应，请问，这个 Dao 接口的工作原理是什么？Dao 接口里的方法，参数不同时，方法能重载吗？

- Dao 接口，就是人们常说的 `Mapper` 接口，接口的全限名，就是映射文件中的 namespace 的值，接口的方法名，就是映射文件中 `MappedStatement` 的 id 值，接口方法内的参数，就是传递给 sql 的参数。

- `Mapper` 接口是没有实现类的，当调用接口方法时，接口全限名+方法名拼接字符串作为 key 值，可唯一定位一个 `MappedStatement` 。

- 在 MyBatis 中，每一个 `<select>` 、 `<insert>` 、 `<update>` 、 `<delete>` 标签，都会被解析为一个 `MappedStatement` 对象。

- **Dao 接口里的方法可以重载**，但是 Mybatis 的 XML 里面的 ID 不允许重复。

  **多个接口对应的映射必须只有一个，否则启动会报错。**

- Dao 接口的工作原理是 JDK 动态代理。

  MyBatis 运行时会使用 JDK 动态代理为 Dao 接口生成代理 proxy 对象，代理对象 proxy 会拦截接口方法，转而执行 `MappedStatement` 所代表的 sql，然后将 sql 执行结果返回。



### MyBatis 是如何进行分页的？分页插件的原理是什么？

1. MyBatis 使用 RowBounds 对象进行分页，它是针对 ResultSet 结果集执行的内存分页，而非物理分页；
2. 可以在 sql 内直接书写带有物理分页的参数来完成物理分页功能；
3. 也可以使用分页插件来完成物理分页。

##### 分页插件的基本原理

使用 MyBatis 提供的插件接口，实现自定义插件

在插件的拦截方法内拦截待执行的 sql，然后重写 sql

根据 dialect 方言，添加对应的物理分页语句和物理分页参数。

> 如
>
> ```mysql
> select _ from student;
> # 拦截后重写
> select t._ from （select \* from student）t limit 0，10
> ```



### 简述 MyBatis 的插件运行原理，以及如何编写一个插件

- MyBatis 仅可以编写针对 `ParameterHandler` 、 `ResultSetHandler` 、 `StatementHandler` 、 `Executor` 这 4 种接口的插件。
- MyBatis 使用 JDK 的动态代理，为需要拦截的接口生成代理对象，以实现接口方法拦截功能。
- 每当执行这 4 种接口对象的方法时，就会进入拦截方法，具体就是 `InvocationHandler` 的 `invoke()` 方法，当然，只会拦截那些你指定需要拦截的方法。

##### 如何编写插件

- 实现 MyBatis 的 Interceptor 接口并复写 `intercept()` 方法

- 给插件编写注解，指定要拦截哪一个接口的哪些方法即可
- 在配置文件中配置你编写的插件



### MyBatis 执行批量插入，能返回数据库主键列表吗？

能，JDBC 都能，MyBatis 当然也能。



### 动态 sql 是做什么的？都有哪些动态 sql？能简述一下动态 sql 的执行原理不？

**做什么的？**

让我们在 Xml 映射文件内，以标签的形式编写动态 sql，完成逻辑判断和动态拼接 sql 的功能。

**有哪些？**

提供了 9 种动态 sql 标签 `trim|where|set|foreach|if|choose|when|otherwise|bind`

**执行原理**

使用 OGNL 从 sql 参数对象中计算表达式的值，根据表达式的值动态拼接 sql，以此来完成动态 sql 的功能。

> OGNL：一种表达式语法



### MyBatis 是如何将 sql 执行结果封装为目标对象并返回的？都有哪些映射形式？

- 使用 `<resultMap>` 标签，逐一定义列名和对象属性名之间的映射关系；

- 使用 sql 列的别名功能，将列别名书写为对象属性名

  如 T_NAME AS NAME，对象属性名一般是 name，小写，但是列名不区分大小写，MyBatis 会忽略列名大小写，智能找到与之对应对象属性名。

有了列名与属性名的映射关系后，MyBatis 通过反射创建对象，同时使用反射给对象的属性逐一赋值并返回，那些找不到映射关系的属性，是无法完成赋值的。



### MyBatis 能执行一对一、一对多的关联查询吗？都有哪些实现方式，以及它们之间的区别。

能，关联对象查询有两种方式：

1. **独立的sql去查询关联对象，赋值给主对象，返回主对象**

2. **使用嵌套查询**

   使用join查询，一部分是主对象属性，一部分列是关联对象属性。

   好处是只需要一次查询。

   > **join查询的100条记录，如何确定主对象的个数是5条而不是100条？**
   >
   > 去重的原理是：
   >
   > `<resultMap>` 标签内的 `<id>` 子标签，指定了唯一确定一条记录的 id 列，
   >
   > MyBatis 根据 `<id>` 列值来完成 100 条记录的去重复功能。
   >
   > `<id>` 可以有多个，代表了联合主键的语意。
   >
   > 同样主对象的关联对象，也是根据这个原理去重的，一般情况下，只有主对象会有重复记录。



### MyBatis 是否支持延迟加载？如果支持，它的实现原理是什么？

MyBatis 仅支持 association 关联对象和 collection 关联集合对象的延迟加载。

在 MyBatis 配置文件中，可以配置是否启用延迟加载 `lazyLoadingEnabled=true|false。`

> association 指的就是一对一，collection 指的就是一对多查询。

**原理**

使用 `CGLIB` 创建目标对象的代理对象，当调用目标方法时，进入拦截器方法。

如调用 `a.getB().getName()` ，拦截器 `invoke()` 方法发现 `a.getB()` 是 null 值，

就会单独发送事先保存好的查询关联 B 对象的 sql，把 B 查询出来，然后调用 a.setB(b)，使a 的对象 b 属性有值，再完成 `a.getB().getName()` 方法的调用。



### MyBatis 都有哪些 Executor 执行器？它们之间的区别是什么？

- **SimpleExecutor**

  每执行一次 update 或 select，就开启一个 Statement 对象，用完立刻关闭 Statement 对象。

- **ReuseExecutor**

  执行 update 或 select，以 sql 作为 key 查找 Statement 对象，存在就使用，不存在就创建。

  用完后，不关闭 Statement 对象，而是放置于 Map<String, Statement>内，供下一次使用。

  简言之，就是重复使用 Statement 对象。

- **BatchExecutor**

  执行 update（没有 select，JDBC 批处理不支持 select），将所有 sql 都添加到批处理中（addBatch()），等待统一执行（executeBatch()）。

  它缓存了多个 Statement 对象，每个 Statement 对象都是 addBatch()完毕后，等待逐一执行 executeBatch()批处理，与 JDBC 批处理相同。



### 如何指定使用哪一种 Executor 执行器

在 MyBatis 配置文件中，可以指定默认的 ExecutorType 执行器类型，也可以手动给 `DefaultSqlSessionFactory` 的创建 SqlSession 的方法传递 ExecutorType 类型参数。



### MyBatis 是否可以映射 Enum 枚举类

可以。

映射方式为自定义一个 `TypeHandler` ，实现 `TypeHandler` 的 `setParameter()` 和 `getResult()` 接口方法。

> `TypeHandler` 有两个作用：
>
> - 完成从 javaType 至 jdbcType 的转换，体现为 `setParameter()`，代表设置 sql 问号占位符参数
> - 完成 jdbcType 至 javaType 的转换，体现为 `getResult()`，代表获取列查询结果



### MyBatis 映射文件中，如果 A 标签通过 include 引用了 B 标签的内容，请问，B 标签能否定义在 A 标签的后面，还是说必须定义在 A 标签的前面？

没有顺序要求，MyBatis 都可以正确识别。

**原理**

MyBatis 解析 Xml 映射文件是按照顺序解析的，

但是解析 A 标签，发现 A 标签引用了 B 标签，但是 B 标签尚未解析到，

此时，MyBatis 会将 A 标签标记为未解析状态，然后继续解析余下的标签，包含 B 标签。

待所有标签解析完毕，MyBatis 会重新解析那些被标记为未解析的标签，

此时再解析 A 标签时，B 标签已经存在，A 标签也就可以正常解析完成了。



### 简述 MyBatis 的 Xml 映射文件和 MyBatis 内部数据结构之间的映射关系

MyBatis 将所有 Xml 配置信息都封装到 All-In-One 重量级对象 Configuration 内部。

在 Xml 映射文件中，

- `<parameterMap>` 标签会被解析为 `ParameterMap` 对象，其每个子元素会被解析为 ParameterMapping 对象；
- `<resultMap>` 标签会被解析为 `ResultMap` 对象，其每个子元素会被解析为 `ResultMapping` 对象；
- 每一个 `<select>、<insert>、<update>、<delete>` 标签均会被解析为 `MappedStatement` 对象；
- 标签内的 sql 会被解析为 `BoundSql` 对象



### 为什么说 MyBatis 是半自动 ORM 映射工具？它与全自动的区别在哪里

- Hibernate 属于全自动 ORM 映射工具

  使用 Hibernate 查询关联对象或者关联集合对象时，可以根据对象关系模型直接获取，所以它是全自动的。

- 而 MyBatis 在查询关联对象或关联集合对象时，需要手动编写 sql 来完成，所以，称之为半自动 ORM 映射工具。



## Dubbo

### Dubbo是什么

Dubbo是阿里巴巴开源的基于Java的高性能RPC分布式服务框架，现已成为Apache基金会孵化项目。









# 设计模式

## 软件设计原则有哪些

- **开闭原则**

  对扩展开放，对修改关闭

- **单一职责原则**

  一个类只负责一个功能领域的相应职责

- **里氏替换原则**

  所有引用基类的地方，必须能透明地使用其子类的对象

- **依赖倒置原则**

  依赖于抽象，不能依赖于具体实现

- **接口隔离原则**

  类之间的依赖关系，应该建立在最小的接口上

- **合成/聚合复用原则**

  尽量使用合成/聚合，而不是通过继承达到复用的目的

- **迪米特法则**

  一个软件实体应当尽可能少的与其他实体发生相互作用



## 什么是设计模式

代表了最佳实践，通常被有经验的面向对象的软件开发人员使用。

是软件开发人员在开发过程中面临的一般问题的解决方案。

使用设计模式是为了重用代码，让代码更容易被理解，保证代码可靠性。



## 设计模式的分类

- **创建型**

  创建对象的同时，隐藏创建逻辑，不用new实例化对象，

  程序在判断需要创建哪些对象时更灵活。

  包括工厂/抽象工厂/单例/建造者/原型模式

- **结构型**

  通过类与接口间的继承和引用，实现创建复杂结构的对象。

  包括适配器/桥接模式/过滤器/组合/装饰器/外观/享元/代理模式。

- **行为型**

  通过类之间不同通信方式，实现不同行为。

  包括责任链/命名/解释器/迭代器/中介者/备忘录/观察者/状态/策略/模板/访问者模式。



## 有哪些设计模式

![image-20220513144828473](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220513144828473.png)



## 工厂模式

### 简单工厂模式

由一个工厂对象创建实例，客户端不需要关注创建逻辑，只需要提供传入工厂的参数。

适用于工厂类负责创建的对象较少的情况。

缺点是如果要增加新产品，需要修改工厂类的判断逻辑，违背开闭原则；而且产品多的话工厂类会比较复杂。

**使用**

- `Calendar`抽象类的`getInstance`方法，调用`createCalendar`方法根据不同地区参数创建不同的日历对象。
- Spring中的`BeanFactory`使用简单工厂模式，根据传入一个唯一的标识获取`Bean`对象。

![image-20220513161553984](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220513161553984.png)



### 工厂模式

工厂模式将生成具体产品的任务分发给具体的产品工厂。

也就是 定义一个抽象工厂，包含了生产产品的生产接口，但不负责具体生产产品，

将生产任务交给不同派生类工厂。

这样就不用通过指定类型来创建对象。

![image-20220513161607980](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220513161607980.png)



### 抽象工厂模式

工厂模式再怎么扩展也只能生产一类产品，无法生产另一类产品。

抽象工厂模式在抽象工厂中增加多类产品的生产方法，子类实现工厂可以选择性实现生产特定产品，也可以什么都不干。

![image-20220513161742819](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220513161742819.png)



## 单例模式

### 什么是单例模式，单例模式的特点

属于创建型模式，一个单例类任何情况下都只存在一个实例。

构造方法是私有的，由自己创建一个静态变量存储实例，对外提供一个静态公有方法获取实例。

**优点**

内存中只有一个实例，减少开销，避免频繁创建与销毁。

**缺点**

没有抽象层，难以扩展，与单一职责原则矛盾。



### 单例模式常见写法

#### 饿汉式，线程安全

类加载就创建对象，比较常用

##### 优点

线程安全，没有加锁，效率高

##### 缺点

不是懒加载，类加载时就初始化，占用内存空间

> **懒加载（lazy loading）**：使用时再创建对象

##### 饿汉式为何线程安全

饿汉式急于类加载的机制创建对象，一个类只会加载一次，避免了多线程同步问题。

如果类被不同的类加载器加载，会创建不同的实例。

##### 代码实现

```java
public class Singleton {
     // 1、私有化构造⽅法
     private Singleton(){}
     // 2、定义⼀个静态变量指向⾃⼰类型
     private final static Singleton instance = new Singleton();
     // 3、对外提供⼀个公共的⽅法获取实例
     public static Singleton getInstance() {
     	return instance;
     }
}
```



#### 懒汉式，线程不安全

单线程没有问题，多线程无法保证单例。

**优点**： 懒加载

**缺点**： 线程不安全

##### 代码实现

```java
public class Singleton {
    // 1、私有化构造⽅法
    private Singleton(){ }
    // 2、定义⼀个静态变量指向⾃⼰类型
    private static Singleton instance;
    // 3、对外提供⼀个公共的⽅法获取实例
    public static Singleton getInstance() {
        // 判断为 null 的时候再创建对象
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```



#### 懒汉式，线程安全

保证懒汉式线程安全的方式是`synchronized`添加在`getInstance`方法加锁。

缺点是每次调用都要加锁与释放锁，影响性能。

##### 代码实现

```java
public class Singleton {
    // 1、私有化构造⽅法
    private Singleton(){ }
    // 2、定义⼀个静态变量指向⾃⼰类型
    private static Singleton instance;
    // 3、对外提供⼀个公共的⽅法获取实例
    public synchronized static Singleton getInstance() {
        // 判断为 null 的时候再创建对象
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```



#### 双重检查锁（DCL，double-checked locking），线程安全

- 双重检查指两次非空判断，锁指synchronized
- 双重判断的原因：
  - 第一重判断，如果实例已经存在，就不需要进行同步和创建，直接返回实例即可
  - 如果实例没有存在，才会进入同步块
  - 同步块依然是防止多线程调用生成多个实例
  - 第二重判断用于同步，第一个获得锁的线程创建了实例，释放锁后，后面的线程再进入同步块，会被第二重判断不为空拦截，跳过创建过程返回实例。
- 使用`volatile`利用**可见性，禁止指令重排**的特性，避免返回没有初始化的实例。

**优点**：懒加载，线程安全，效率较高

**缺点**：实现较复杂

##### 代码实现

```java
public class Singleton {
    // 1、私有化构造⽅法
    private Singleton(){ }
    // 2、定义⼀个静态变量指向⾃⼰类型
    private volatile static Singleton instance;
    // 3、对外提供⼀个公共的⽅法获取实例
    public static Singleton getInstance() {
        // 第一重判断为 null 的时候再创建对象
        if (instance == null) {
            //	同步锁
            synchronized(Singleton.class){
                //	第二重判断
                if (instance == null) {
                	instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```



##### 为什么使用`volatile`?

因为单例模式中`new`关键字创建对象不是原子操作。

创建对象会经历三个步骤：

1. 堆内存开辟空间
2. 调用构造方法，初始化对象
3. 引用变量指向堆空间

由于编译器和处理器为了提高性能会进行指令重排，最终执行顺序可能是123或者132。

当某个线程执行指令顺序为132时，会使得这个对象**不为null，但没有初始化**。

此时其他线程进入第一重判断不为空时，直接**使用了未初始化的对象**，可能出现异常。

就是著名的 **DCL 失效问题**。

**解决**

为引用变量添加`volatile`关键字，会在创建对象指令时前后**添加内存屏障**来禁止指令重排序，

保证不为空的对象一定是初始化过的。

同时`volatile`修饰的变量因为可见性，进行修改对其他线程都是可见。



#### 静态内部类，线程安全

**优点**：懒加载，线程安全，效率较高，实现简单

##### 代码实现

```java
public class Singleton {
    private Singleton(){ }
    public static Singleton getInstance() {
        return InnerClass.INSTANCE;
    }
    private static class InnerClass{
        private final static Singleton INSTANCE = new Singleton();
    }
}
```

##### 静态内部类单例如何实现懒加载

**类初始化的五种情况**

成为类的主动引用。

1. 遇到 `new` 、 `getstatic` 、 `putstatic` 、 `invokestatic` 这 4 条字节码指令 时。生成这 4 条指令最常见的 Java 代码场景是：

   - 使用 `new` 关键字实例化对象的时候；

   - 读取或设置⼀个类的静态字段的时候；

     > final 修饰除外，被 final 修饰的静态字段是常量，已在编译期把结果放⼊常量池

   - 调用⼀个类的静态方法的时候。

2. 使用 `java.lang.reflect` 包方法对类进行反射调用的时候

3. 初始化类之前，如果父类还没有初始化，则先进行父类的初始化

4. 虚拟机启动时，用户需要指定一个要执行的主类，即包含main()方法的类，虚拟机会先初始化这个类

5. 当使用 JDK 1.7 的动态语⾔⽀持时，如果⼀个 `java.lang.invoke.MethodHandle` 实例最后的解析结果是 `REF_getStatic `、 `REF_putStatic `、 `REF_invokeStatic` 的方法句柄，则需要触发这个方法句柄所对应的类初始化。

而静态内部类属于被动引用，即`Singleton`加载时并不会加载`InnerClass`类。

当`getInstance()`方法被调用时，`InnerClass`才会在`Singleton`的运行时常量池内，由符号引用替换为直接引用。

这时静态对象`INSTANCE`才被创建，由`getInstance()`方法返回。

##### 静态内部类单例如何实现线程安全

虚拟机会保证一个类的`<cinit>()`方法在多线程被正确地加锁，同步。

如果多个线程同时初始化一个类，只会有一个线程去调用这个类的`<cinit>()`方法，

其他线程需要阻塞等待，直到`<cinit>()`方法执行完毕。

- 如果一个类的`<cinit>()`存在耗时很长的操作，可能造成多个线程阻塞；

- 多个线程会阻塞，但如果`<cinit>()`已经执行，其他线程被唤醒后，不会再次执行该方法。

  同一个加载器，一个类型只会初始化一次。

- 实际应用中，这种阻塞往往很隐蔽。



#### 枚举单例

枚举与java普通类一样，可以拥有字段和方法。

而且实例创建是线程安全的。

**优点**：简单，高效，线程安全，避免反射破坏单例。

**代码实现**

```java
public enum Singleton{
    INSTANCE;
}
// 获取实例
Singleton singleton = Singleton.INSTANCE;
```

**内部原理**

- 通过反编译，`INSTANCE`是被`static final`修饰的，所以可以用过枚举类名调用；
- 同时也说明对象的创建是随着类加载进行的；
- 类加载与初始化时线程安全的，所以枚举单例是线程安全的。



### 如何解决序列化时可以创建单例对象的问题

**问题**

如果将单例对象序列化成字节序列，然后再反序列成对象，那么就可以创建出一个新的单例对象，从而导致单例不唯一

**解决方式**

在单例类中实现readResolve()方法

```java
public class Singleton implements java.io.Serializable {     

   private Object readResolve() {     
         return INSTANCE;     
    }    
} 
```

通过实现readResolve方法，ObjectInputStream实例对象在调用readObject()方法进行反序列化时，就会判断相应的类是否实现了readResolve()方法，如果实现了，就会调用readResolve()方法返回一个对象作为反序列化的结果，而不是去创建一个新的对象。



## 策略模式

### 什么是策略模式

策略模式属于对象的行为模式。

定义一组算法类，

将每一个算法封装起来，到具有公共接口的独立的类中，

从而使得他们可以互相替换。

策略模式可以使算法的变化独立于使用它们的客户端。

**目的**：通过定义相似的算法，替换`if else`语句写法，并且可以随时相互替换。



### 什么场景需要策略模式

process 方法中会具体执行 A、B、C 三种不同类型的代码逻辑，

假设三种类型的代码逻辑都比较繁琐，那么 process 方法将会非常长。

同时还需要解决代码易扩展的问题，

随着业务的发展，如果出现了 D、E、F 类型，

那么 process 方法中还需要增加了一堆 if-else 判断逻辑，process 方法会变得非常冗长且不可维护。



### 策略模式实现类过多如何解决（策略模式优化）

将策略模式与其他模式结合使用。

**枚举策略方法**

将不同策略存放到一个枚举类中：

```java
public enum Calculator {
    ADD{
        @Override
        public int test(int a, int b) {
            return a + b;
        }
    },
    SUB{
        @Override
        public int test(int a, int b) {
            return a - b;
        }
        
    };
    public abstract int test(int a, int b);
}
```

然后这么调用不同策略：

```java
public static void main(String[] args) {

    int a = Calculator.ADD.test(3, 4);  //加法运算
    int b = Calculator.SUB.test(3, 4);  //减法运算

}
```

同时解决的类数目多，以及类必须对外暴露等问题。











# 计算机基础



## 计算机网络

### 网络分层模型

**OSI七层模型**

![osi七层模型](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dsfsdfsdfsfsfsf.png)

**TCP/IP四层模型**

可以理解为七层模型的精简版：

- 应用层
- 传输层
- 网络层
- 网络接口层



### TCP和UDP的区别（待补充）



### 三次握手，四次挥手，为什么要四次挥手（待补充）







# 数据库

## MySql



### MyISAM和InnoDB区别

- **行级锁**

  InnoDB支持行级锁和表级锁；MyISAM只有表级锁

- **事务**

  InnoDB支持事务；MyISAM不支持

- **支持外键**

  InnoDB支持；MyISAM不支持

- **支持MVCC**

  仅InnoDB支持。

  >  应对高并发事务, MVCC比单纯的加锁更高效；
  >
  >  MVCC只在 `READ COMMITTED` 和 `REPEATABLE READ` 两个隔离级别下工作；
  >
  >  MVCC可以使用 乐观(optimistic)锁 和 悲观(pessimistic)锁来实现；
  >
  >  各数据库中MVCC实现并不统一。



### 表级锁与行级锁

- **表级锁：** MySQL中锁定 **粒度最大** 的一种锁，对当前操作的整张表加锁，实现简单，资源消耗也比较少，加锁快，不会出现死锁。其锁定粒度最大，触发锁冲突的概率最高，并发度最低，MyISAM和 InnoDB引擎都支持表级锁。
- **行级锁：** MySQL中锁定 **粒度最小** 的一种锁，只针对当前操作的行进行加锁。 行级锁能大大减少数据库操作的冲突。其加锁粒度最小，并发度高，但加锁的开销也最大，加锁慢，会出现死锁。



### 大表优化的手段

#### 字段优化

- 尽量使用`TINYINT`、`SMALLINT`、`MEDIUM_INT`作为整数类型而非`INT`，如果非负则加上`UNSIGNED`
- `VARCHAR`的长度只分配真正需要的空间
- 使用枚举或整数代替字符串类型
- 尽量使用`TIMESTAMP`而非`DATETIME`，
- 单表不要有太多字段，建议在20以内
- 避免使用NULL字段，很难查询优化且占用额外索引空间
- 用整型来存IP

#### 索引

- 索引并不是越多越好，要根据查询有针对性的创建，考虑在`WHERE`和`ORDER BY`命令上涉及的列建立索引，可根据`EXPLAIN`来查看是否用了索引还是全表扫描
- 应尽量避免在`WHERE`子句中对字段进行`NULL`值判断，否则将导致引擎放弃使用索引而进行全表扫描
- 值分布很稀少的字段不适合建索引，例如"性别"这种只有两三个值的字段
- 字符字段只建前缀索引
- 字符字段最好不要做主键
- 不用外键，由程序保证约束
- 尽量不用`UNIQUE`，由程序保证约束
- 使用多列索引时主意顺序和查询条件保持一致，同时删除不必要的单列索引

#### 限定数据范围

禁止不带任何限制数据范围条件的查询语句

如查询历史订单控制在一个月范围内。

#### 读写分离

经典的数据库拆分方案，主库负责写，从库负责读；

#### 垂直拆分

**根据数据库里面数据表的相关性进行拆分。** 

垂直拆分是指数据表列的拆分，把一张列比较多的表拆分为多张表。

**优点** 列数据变少，减少IO，易于维护

**缺点** 主键冗余，引起join操作；可通过应用层join解决。另外会导致事务复杂。

#### 水平拆分

**保持数据表结构不变，通过某种策略存储数据分片。这样每一片数据分散到不同的表或者库中，达到了分布式的目的。 水平拆分可以支撑非常大的数据量。**

分表仅仅是解决了单一表数据过大的问题，但由于表的数据还是在同一台机器上，其实对于提升MySQL并发能力没有什么意义，所以 **水平拆分最好分库** 。

**两种常见方案**

- **客户端代理：** **分片逻辑在应用端，封装在jar包中，通过修改或者封装JDBC层来实现。** 当当网的 **Sharding-JDBC** 、阿里的TDDL是两种比较常用的实现。
- **中间件代理：** **在应用和数据中间加了一个代理层。分片逻辑统一维护在中间件服务中。** 我们现在谈的 **Mycat** 、360的Atlas、网易的DDB等等都是这种架构的实现。



### 什么是池化思想，什么是数据库连接池，为什么需要

#### 池化设计

池化设计不是新名词，包括线程池，jdbc连接池等都是基于池化设计实现的。

- 这种设计会**初始化资源**，解决的问题是抵消每次获取资源的消耗，

  比如创建线程的开销，获取远程连接的开销等。

- 池化设计还包括这些特征：

  - 池子的初始值
  - 池子的活跃值
  - 池子的最大值

  等，可以直接映射到线程池/连接池的成员属性中。

#### 数据库连接池

本质是一个socket连接。

数据库服务端还要维护一些缓存和用户权限信息之类的来占用内存，而数据库连接池就是用来维护数据库连接的缓存，以便应对数据库请求时重用连接。

尤其是对动态数据库驱动的网站应用程序的请求，昂贵又浪费资源。

在连接池中，创建连接后，将其放置在池中，并再次使用它，而不必建立新的连接。

连接池还减少了用户必须等待建立与数据库的连接时间。





### 分库分表后，如何处理

需要一个全局唯一的 id 来支持：

- **利用redis生成id**

  性能较好，灵活，不依赖数据库

  缺点是引入新的组件系统更复杂，可用性低，增加成本。

- **数据库自增id不同步长**

  两台数据库设置不同步长，生成不重复id实现高可用。

  缺点是需要独立部署数据库实例，成本高，有性能瓶颈。

- **雪花算法**

  https://github.com/twitter-archive/snowflake

- **美团Leaf分布式ID生成系统**

  https://tech.meituan.com/2017/04/21/mt-leaf.html



### 读写分离的业务实现方式（待补充）

##### 方式一

AOP的方式根据方法名判断，特定方法读取从库

##### 方式二



### 什么是乐观锁（待补充）





### 乐观锁常用实现方式（待补充）





### 如何实现跨库查询（待补充）





### 解决幻读的方法

核心思想就是一个事务在操作某张表数据的时候，另外一个事务不允许新增或者删除这张表中的数据。

1. 将事务隔离级别调整为 `SERIALIZABLE`

2. 在可重复读的事务级别下，给事务操作的这张表添加表锁

3. 在可重复读的事务级别下，给事务操作的这张表添加 `Next-Key Locks`

   > `Next-Key Locks` 相当于 行锁 + 间隙锁



### 事务的四个特性

- **原子性**：一个事务就是最小的工作单元，要么执行成功提交，要么执行失败回滚。
- **一致性**：执行事务前后，数据保持一致。
- **隔离性**：事务在执行过程中，两个事务之间是隔离的，事务在执行成功之前，所做的修改对其他事务是不可见的。
- **持久性**：事务执行成功后，对数据的修改是永久的，即便发生故障重启也不会丢失数据。



### Mysql的隔离级别

- **读未提交**

  事务还没有提交的修改，其他事务都可以读取到。

- **读已提交**

  其他事务提交的修改，事务在执行过程中可以读取到，如果一个事务在执行过程中需要两次读取同一行数据，可能会不一致。

- **可重复读**

  在事务开始时，记录当时的状态，在第二次读取同一行数据时，除非是本事务做的修改，否则读取的都是事务开始时的数据。

- **可串行化**

  强制事务串行执行，会让读取每一行都加锁，读用读锁，写用写锁，读写锁互斥。



### 常见优化手段（待补充）







## Redis



### Redis持久化机制/如何保证挂掉后恢复数据

Redis支持持久化，有两种持久化方式：

- **RDB（快照）**

  通过创建快照，获得存储在内存里的数据在某个时间点的副本。

  可用于复制到其他服务器创建服务器副本（主从复制），也可以留在原地以便重启使用。

- **AOF（只追加文件）**

  实时性更好，是主流的持久化方案。

  开启AOF持久化后，每执行一条会更改Redis数据的命令，就会将命令写入AOF文件。

  有三种持久化方式：

  ```shell
  appendfsync always    #每次有数据修改发生时都会写入AOF文件,这样会严重降低Redis的速度
  appendfsync everysec  #每秒钟同步一次，显示地将多个写命令同步到硬盘
  appendfsync no        #让操作系统决定何时进行同步
  ```

  一般兼顾性能与数据安全，考虑每秒同步，即使系统崩溃也只会丢失一秒的数据。



### 如何处理缓存穿透

- **参数校验**

  对于不合法的参数做好校验，直接抛出异常返回给客户端。

  如id不能小于0，邮箱格式等。

- **缓存无效key**

  如果缓存与数据库都查不到这个数据则写入redis并设置过期时间。

  但只适用于请求key变化不频繁，如果面对黑客攻击，会导致大量无效key缓存。

  一般key格式：`表名:列名:主键名:主键值`

- **布隆过滤器**

  将所有可能的请求值存放在布隆过滤器，

  当用户请求时，先判断请求值是否存在于布隆过滤器，如果不存在则直接返回参数错误信息给客户端，

  存在才会走后续流程。



### 布隆过滤器的原理

当一个元素加入布隆过滤器的操作：

1. 使用哈希函数对元素值进行计算，得到哈希值。哈希函数由多个，生成的哈希值也有多个。
2. 根据哈希值将位数组的对应下标置为1。

判断元素是否存在于布隆过滤器的操作：

1. 对给定元素进行哈希运算。
2. 得到值后判断位数组对应下标的值是否均为1，如果不都为1，则说明元素不存在。

所以可以用于判断元素是否不存在，而判断存在有可能有误判，因为不同值解析出的哈希可能一样。



### 分布式缓存常见的技术选型方案有哪些，分布式缓存解决什么问题

分布式缓存，使用的比较多的主要是 **Memcached** 和 **Redis**。

Memcached 是分布式缓存最开始兴起的那会，比较常用的

分布式缓存主要解决的是**单机缓存的容量受服务器限制**并且**无法保存通用信息**的问题。

因为，本地缓存只在当前服务里有效，如果你部署了两个相同的服务，他们两者之间的缓存数据是无法共通的。



###  Redis 和 Memcached 的区别和共同点

**共同点**

- 基于内存的数据库，一般都用来当做缓存
- 都有过期策略
- 性能都非常高

**区别**

- **Redis 支持更丰富的数据类型（支持更复杂的应用场景）**

  Memcached 只支持最简单的 k/v 数据类型。

  Redis不仅仅支持简单的 k/v 类型，同时还提供 list，set，zset，hash 等数据结构的存储。

- **Redis 支持数据的持久化**

  Redis可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用。

  Memcached 把数据全部存在内存之中。

- **Redis 有灾难恢复机制**

  因为可以把缓存中的数据持久化到磁盘上。

- **Redis 在服务器内存使用完后，可以将不用的数据转移到磁盘上**

  Memcached 在服务器内存使用完之后，就会直接报异常。

- **Memcached 没有原生的集群模式**

  Memcached 需要依靠客户端来实现往集群中分片写入数据；

  Redis 目前是原生支持 cluster 模式的。

- **Memcached 是多线程，非阻塞 IO 复用的网络模型；Redis 使用单线程的多路 IO 复用模型。**

  Redis 6.0 引入了多线程 IO 

- **Redis 支持发布订阅模型、Lua 脚本、事务等功能，Memcached 不支持**

  并且，Redis 支持更多的编程语言。

- **Memcached 过期数据的删除策略只用了惰性删除，Redis 同时使用了惰性删除与定期删除。**



### 缓存数据的处理流程是怎样

1. 如果用户请求的数据在缓存中就直接返回；
2. 缓存中不存在的话就查询数据库中是否存在；
3. 数据库中存在的话就更新缓存中的数据，返回数据；
4. 数据库中不存在的话就返回空数据。



### Redis是什么

开源的，基于内存的，也可进行持久化的，使用C语言编写的键值对存储数据库。







### 为什么要用 Redis/为什么要用缓存

**使用缓存主要是为了提升用户体验以及应对更多的用户**

- **高性能**

  对于高频查询而低频修改的数据，操作缓存速度会更快，减少数据库查询的频率。

  需要保持数据库和缓存中的数据的一致性。

- **高并发**

  像 MySQL 这类的数据库的 QPS 大概都在 1w 左右（4 核 8g）

  使用 Redis 缓存之后很容易达到 10w+，甚至最高能达到 30w+（就单机 redis 的情况，redis 集群的话会更高）

  > **QPS（Query Per Second）**：服务器每秒可以执行的查询次数



### Redis除了缓存还能做什么

- **分布式锁**

  通常情况下，我们都是基于 Redisson 来实现分布式锁。

- **限流**

  一般是通过 Redis + Lua 脚本的方式来实现限流。  https://mp.weixin.qq.com/s/kyFAWH3mVNJvurQDt4vchA

- **消息队列**

  Redis 自带的 list 数据结构可以作为一个简单的队列使用。

  Redis5.0 中增加的 Stream 类型的数据结构更加适合用来做消息队列，

  它比较类似于 Kafka，有主题和消费组的概念，支持消息持久化以及 ACK 机制。

- **其他复杂业务场景**

  通过 Redis 以及 Redis 扩展（比如 Redisson）提供的数据结构，我们可以很方便地完成很多复杂的业务场景比如通过 bitmap 统计活跃用户、通过 sorted set 维护排行榜。



### Redis常见数据结构，及适用场景

##### String

- **介绍**：string 数据结构是简单的 key-value 类型。

  > Redis 并没有使用 C语言 的字符串表示，而是自己构建了一种 **简单动态字符串**（simple dynamic string，**SDS**）。
  >
  > 相比于 C 的原生字符串，
  >
  > - Redis 的 SDS 不光**可以保存文本数据还可以保存二进制数据**，
  >
  > - 并且获取字符串长度复杂度为 O(1)（C 字符串为 O(N)），
  >
  > - Redis 的 SDS API 是安全的，不会造成缓冲区溢出。

- **常用命令**：`set,get,strlen,exists,decr,incr,setex` 等等。

- **应用场景**：一般常用于需要计数的场景

  - 用户的访问次数
  - 热点文章的点赞转发数量等



##### list

- **介绍**：链表。Redis 的 list 的实现为一个 **双向链表**，即可以支持反向查找和遍历，更方便操作，不过带来了部分额外的内存开销。

- **常用命令**： `rpush,lpop,lpush,rpop,lrange,llen` 等。

- **应用场景**：

  - 发布与订阅/消息队列

  - 分页查询

    >  通过 `lrange` 命令，可以基于 list 实现分页查询，性能非常高
    >
    >  ```sh
    >  127.0.0.1:6379> rpush myList value1 value2 value3
    >  (integer) 3
    >  127.0.0.1:6379> lrange myList 0 1 # 查看对应下标的list列表， 0 为 start,1为 end
    >  1) "value1"
    >  2) "value2"
    >  127.0.0.1:6379> lrange myList 0 -1 # 查看列表中的所有元素，-1表示倒数第一
    >  1) "value1"
    >  2) "value2"
    >  3) "value3"
    >  ```



##### hash

- **介绍**：类似于 JDK1.8 前的 HashMap，是一个 string 类型的 field 和 value 的映射表，**特别适合用于存储对象**。
- **常用命令**：`hset,hmset,hexists,hget,hgetall,hkeys,hvals` 等。
- **应用场景**：系统中对象数据的存储



##### set

- **介绍**：类似于 Java 中的 `HashSet` ，是一种无序集合，集合中的元素没有先后顺序。

  存储一个列表数据，又不希望出现重复数据时，set 是一个很好的选择。

  - 提供了判断某个成员是否在一个 set 集合内的接口

  - 可以基于 set 轻易实现交集、并集、差集的操作，

    如查找共同粉丝，共同关注，共同喜好等。

- **常用命令**：`sadd,spop,smembers,sismember,scard,sinterstore,sunion` 等。

- **应用场景**：要存放的数据不能重复，需要获取多个数据源交集和并集等场景



##### sorted set

- **介绍**：和 set 相比，sorted set 增加了一个权重参数 score，

  使得集合中的元素能够按 score 进行有序排列，还可以通过 score 的范围来获取元素的列表。

- **常用命令**： `zadd,zcard,zscore,zrange,zrevrange,zrem` 等。

- **应用场景**： 需要对数据根据某个权重进行排序的场景。

  -  直播系统中，实时排行信息，礼物排行榜，弹幕消息等。



##### bitmap

- **介绍**：存储的是连续的二进制数字（0 和 1）

  通过 bitmap, 只需要一个 bit 位来表示某个元素对应的值或者状态，key 就是对应元素本身 。

  会极大的节省储存空间。

- **常用命令**：`setbit` 、`getbit` 、`bitcount`、`bitop`

- **应用场景**：需要保存状态信息（比如是否签到、是否登录...），并需要进一步对这些信息进行分析的场景。

  - 用户在线状态
  - 活跃用户情况
  - 用户行为统计，如点赞统计

- **操作演示**

  ```sh
  # SETBIT 会返回之前位的值（默认是 0）这里会生成 7 个位
  127.0.0.1:6379> setbit mykey 7 1
  (integer) 0
  127.0.0.1:6379> setbit mykey 7 0
  (integer) 1
  127.0.0.1:6379> getbit mykey 7
  (integer) 0
  127.0.0.1:6379> setbit mykey 6 1
  (integer) 0
  127.0.0.1:6379> setbit mykey 8 1
  (integer) 0
  # 通过 bitcount 统计被被设置为 1 的位的数量。
  127.0.0.1:6379> bitcount mykey
  (integer) 2
  ```



### 什么是缓存穿透

攻击者故意大量请求一些Redis缓存中不存在key的数据，导致请求打到数据库上，导致数据库压力过大。



### 缓存穿透的解决方法

- **参数校验**

  不合法的参数直接返回错误信息给客户端，如查询id不能小于0，邮箱格式等

- **缓存无效key**

  如果缓存和数据库都查不到某个 key 的数据，就写一个到 Redis 中去，并设置过期时间。

  能解决key变化不频繁的情况，

  但如果是黑客恶意攻击，每次构建不同key，会导致缓存大量无效key。

  如果非要用这种方式，尽量**将过期时间设的比较短**，比如1分钟。

- **布隆过滤器**

  可以非常方便地判断一个给定数据是否存在于海量数据中。

  **操作方式**：

  - 判断请求值是否存在布隆过滤器，不存在则为无效请求
  - 判断缓存中是否存在对应数据，存在则返回
  - 判断数据库是否存在对应数据，存在则更新缓存，返回数据，否则返回空数据

  **布隆过滤器的功能**：布隆过滤器判元素存在有误判几率，**布隆过滤器判断元素不存在则一定不存在**。

  > - **元素加入布隆过滤器的操作**
  >   1. 使用布隆过滤器的哈希函数对元素值进行计算，得到哈希值（有几个哈希函数，就有几个哈希值）
  >   2. 根据得到的哈希值，在位数组中把对应下标的值置为 1。
  > - **判断元素是否存在于布隆过滤器的操作**
  >   1. 对给定元素计算哈希值
  >   2. 判断哈希值对应下标所在位数组的值是否**全部为1**，有一个不为1就说明元素不在布隆过滤器。
  >
  > **布隆过滤器判断存在可能误判的原因**
  >
  > 不同元素计算得到的哈希值可能相同，所以对应位为1只能说明可能存在，但不为1说明肯定不存在。



### 什么是缓存击穿

主要指的是**某个热点key失效，导致大量请求全部转向数据库，导致数据库压力过大。**

### 缓存击穿的解决方法

1. 热点key设置永不过期。
2. 加互斥锁，缓存中没有热点key对应的数据时，等待100ms，由获得锁的线程去读取数据库然后设置缓存。



### 缓存雪崩是什么？

**短时间内大量key失效，导致所有请求全部转向数据库，导致数据库压力过大。**

缓存失效的情况：

- 缓存模块宕机，Redis服务不可用
- 热点缓存过期时间批量失效



### 缓存雪崩的解决方法

- **针对Redis服务不可用**
  1. Redis集群，避免单机Redis导致整个缓存不可用
  2. 限流，避免同时处理大量请求
- **针对热点缓存过期批量失效**
  - 给缓存设置失效时间时加一个随机值，避免集体失效。
  - 设置缓存没有过期时间
  - 双缓存机制，缓存A的失效时间为20分钟，缓存B的失效时间会比A长一些，从缓存A读取数据，缓存A中没有时，去缓存B中读取数据，并且启动一个异步线程来更新缓存A(如果已经有异步线程正在更新了，就不用重复更新了)。以及更新缓存B，以便延迟B的过期时间。



### 如何保证缓存与数据库数据的一致性

[参考](https://www.cnblogs.com/rjzheng/p/9041659.html)

常用的三种更新手段可能存在的问题：

1. **先更新数据库，后更新缓存**

   - 可能存在后更新数据库的请求先更新了缓存，导致缓存与数据库数据不一致；

   - 缓存更新失败，导致缓存与数据库不一致。

2. **先删除缓存，后更新数据库**

   - 删除缓存，更新数据库之前产生了读请求，导致旧数据设置到缓存

3. **先更新数据库，后删除缓存**（常用）

   - 删除缓存失败导致，缓存的依然是旧数据；
   - 读写分离，数据没有同步时，读请求读到了删除缓存的数据，将旧数据加载到缓存，导致数据不一致。

**解决方案**：

- **写请求串行化**

  将写请求更新之前先获取分布式锁，获得之后才能更新，这样实现写请求的串行化。

  但是会导致效率变低。

- **增加缓存更新重试机制：先更新数据库，异步删除缓存，删除失败后重试**

  先更新数据库，异步删除缓存，

  删除缓存失败时，

  - 继续异步重试
  - 如果多次重试失败，将操作（更新失败的key）放到消息队列中，待缓存服务可用后，再进行删除操作

  ![image](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/o_update1.png)

  > 如果数据库是读写分离的，那么删除缓存时需要延迟删除，
  >
  > 否则可能会在删除缓存时，从库还没有收到更新后的数据，其他读请求就去从库读到旧数据然后设置到缓存中。

- **业务项目更新数据库，其他项目订阅binlog更新**

  - 业务项目直接更新数据库，

  - 然后其他项目订阅binlog，接收到更新数据库操作的消息后，更新缓存
  - 更新缓存失败时，新建异步线程去重试或者将操作发到消息队列，然后后续进行处理

  但是这种方案更新mysql后还是有一定延迟，缓冲中才是新值。

  ![image](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/o_update2-20200419221055438.png)

  

  





### Redis 大key

##### big key 概念

一个 key 对应的 value 所占用的内存比较大

一个不是特别精确的参考标准：

- string 类型的 value 超过 10 kb；

- 复合类型的 value 包含的元素超过 5000 个（对于复合类型的 value 来说，不一定包含的元素越多，占用的内存就越多）。

##### 如何发现

- **使用 Redis 自带的 `--bigkeys` 参数来查找**

  - 这个命令会扫描(Scan) Redis 中的所有 key ，会对 Redis 的性能有一点影响。
  - 这种方式只能找出每种数据结构 top 1 bigkey（占用内存最大的 string 数据类型，包含元素最多的复合数据类型）

- **分析 RDB 文件**

  前提是你的 Redis 采用的是 RDB 持久化



### Redis持久化机制/如何保证缓存数据在服务挂掉后恢复/RDB与AOF机制

#### 持久化数据的目的

- 重用数据（比如重启机器、机器故障之后恢复数据）
- 防止系统故障而将数据备份到一个远程位置

#### 持久化的方式

- **快照（snapshotting，RDB）**

  Redis通过创建快照来获得存储在内存里面的数据在某个时间点上的副本。

  是 Redis 默认采用的持久化方式。

- **只追加文件（append-only file, AOF）**

  AOF 持久化的实时性更好，因此已成为主流的持久化方案。

  开启 AOF 持久化后每执行一条会更改 Redis 中的数据的命令，Redis 就会将该命令写入到内存缓存 `server.aof_buf` 中，然后再根据 `appendfsync` 配置来决定何时将其同步到硬盘中的 AOF 文件。





### 过期数据的删除策略/过期key如何清理

常用的过期数据的删除策略就两个：

1. **惰性删除**：只会在取出 key 的时候才对数据进行过期检查。

   对 CPU 最友好，但是可能会造成太多过期 key 没有被删除。

2. **定期删除**：每隔一段时间抽取一批 key 执行删除过期 key 操作。

   > Redis配置项hz定义了serverCron任务的执行周期，默认每次清理时间为25ms，每次清理会依次遍历所有DB，**从db的expires字典(里面保存了设置了过期时间的键值对，key就是指向键对象，value是过期时间)中随机取出20个key，如果过期就删除，如果其中有5个key过期，说明过期率超过了25%，那么就继续对这个db进行清理，否则开始清理下一个db**。

定期删除对内存更加友好，惰性删除对 CPU 更加友好。

Redis 采用的是 **定期删除+惰性/懒汉式删除** 。

因为定期删除+惰性删除依然会存在漏掉过期key的情况，导致大量过期 key 堆积在内存，内存溢出。解决方式是Redis内存淘汰机制。



### 内存淘汰机制

当执行写入命令时，如果发现内存不够，那么就会按照配置的淘汰策略清理内存。

Redis 提供 6 种数据淘汰策略，分三类：

- 第一类：**不处理**，等报错(默认的配置)
  1. **no-eviction（默认）**：**禁止**驱逐数据，也就是说内存不够时，不删除key，执行写入命令时发现内存不够直接返回错误信息。
- 第二类：从**所有结果集中的key**中挑选，进行淘汰(随机，lru，lfu三种)
  2. **allkeys-random**：从数据集（server.db[i].dict）中**任意选择数据**淘汰
  3. **allkeys-lru（least recently used）**：挑选**最近使用时间距离现在最远**的key，进行淘汰**（最常用的策略）**
  4. **allkeys-lfu（least frequently used）**：挑选**使用频率最低**的key，进行淘汰（这是Redis 4.0版本后新增的策略）
- 第三类：从**设置了过期时间的key**中挑选，进行淘汰(随机，lru，ttl，lfu)
  5. **volatile-random**：随机挑选key删除
  6. **volatile-lru（least recently used）**：挑选上次**使用时间距离现在最久**的key开始删除
  7. **volatile-ttl**：挑选**可存活时间最短**的key开始删除也就是从哪些快要过期的key中先删除)
  8. **volatile-lfu（least frequently used）**：挑选**使用频率最低**的key，进行淘汰（这是Redis 4.0版本后新增的策略）

> **LRU算法**
>
> LRU算法的设计原则是**如果一个数据近期没有被访问到，那么之后一段时间都不会被访问到**。所以当元素个数达到限制的值时，优先移除距离上次使用时间最久的元素。
>
> 可以使用双向链表Node+HashMap<String, Node>来实现，每次访问元素后，将元素移动到链表头部，当元素满了时，将链表尾部的元素移除，HashMap主要用于根据key获得Node以及添加时判断节点是否已存在和删除时快速找到节点。
>
> **LFU算法**
>
> LFU算法的设计原则时，**如果一个数据在最近一段时间被访问的时次数越多，那么之后被访问的概率会越大**。
>
> 实现是每个数据都有一个引用计数，每次数据被访问后，引用计数加1，需要淘汰数据时，淘汰引用计数最小的数据。
>
> 在Redis的实现中，每次key被访问后，引用计数是加一个介于0到1之间的数p，并且访问越频繁p值越大，而且在一定的时间间隔内，如果key没有被访问，引用计数会减少。



### 布隆过滤器是什么

可以理解为一个有误差的set结构，

使用布隆过滤器来判断元素是否存在其中时，存在不一定真的存在，但不存在结果肯定是不存在。

实际上是一个大型的位数组，添加key时，通过几个hash函数对key计算得到多个hash值，将每个hash值与布隆过滤器的位数组的size取模得到下标，然后将数组中这些下标位置的值都设置为1。



### AOF与RDB的区别

- AOF保存了所有执行的修改命令，粒度更细，进行数据恢复时，恢复的数据更加完整
- AOF由于需要对所有命令执行一遍，效率比较低
- AOF因为是保存了所有的修改命令，同样的数据集，保存的文件会比RDB大
- RDB是保存某一个时间点的所有键值对信息，所以恢复时可能会丢失一部分数据，但是恢复效率会比较高。



### AOF与RDB的特点与缺点

- **特点**

  - RDB：文件小，恢复快，不影响性能，实时性低，兼容性差

  - AOF：文件大，恢复慢，性能影响大，实时性高

- **缺点**

  - RDB：
    - bgsave在进行fork操作时，会阻塞Redis的主线程
    - 向硬盘写数据会有一定的I/O压力

  - AOF：
    - 将aof_buf缓冲区的数据同步到磁盘时会有I/O压力
    - 向硬盘写数据的频率会高很多
    - AOF文件重写跟RDB持久化类似，也会有fork时的阻塞和向硬盘写数据的压力



### 持久化策略的选择

根据场景选择：

1. **不需要考虑数据丢失**

   不需要考虑持久化。

2. **单机实例**

   - 可以接受丢失十几分钟及更长时间的数据，可以选择RDB持久化，对性能影响小
   - 如果只能接受秒级的数据丢失，只能选择AOF持久化。

3. **主从环境**

   主服务器不开启持久化，使得主服务器性能更好；

   从服务器开启AOF持久化，关闭RDB持久化，并且定时对AOF文件进行备份；

   以及在凌晨执行bgaofrewrite命令来进行AOF文件重写，减小AOF文件大小。

   （当然如果对数据丢失容忍度高也可以开启RDB持久化，关闭AOF持久化）

4. 异地灾备

   一般性的故障（停电，关机）不会影响到磁盘，但是一些灾难性的故障（地震，洪水）会影响到磁盘，所以需要定时把单机上或从服务器上的AOF文件，RDB文件备份到其他地区的机房。



### Redis中哨兵是什么

Redis中的哨兵服务器是一个运行在哨兵模式下的Redis服务器，

核心功能是监测主节点和从节点的运行情况，

在主节点出现故障后，完成自动故障转移，让某个从节点升级为主节点。



## 分库分表



### 何为分库？

**分库** 就是将**数据库中的数据分散到不同的数据库**上。

如：

- 将数据库中的用户表和用户订单表分别放在两个不同的数据库。
- 由于用户表数据量太大，对用户表进行了水平切分，然后将切分后的 2 张用户表分别放在两个不同的数据库。



### 何为分表？

**分表** 就是对**单表的数据进行拆分**，可以是垂直拆分，也可以是水平拆分。

##### 垂直拆分

**对数据表列的拆分**，把一张列比较多的表拆分为多张表。

##### 水平拆分

**对数据表行的拆分**，把一张行比较多的表拆分为多张表。



### 什么情况下需要分库分表？

- 单表的数据达到千万级别以上，数据库读写速度比较缓慢（分表）。
- 数据库中的数据占用的空间越来越大，备份时间越来越长（分库）。
- 应用的并发量太大（分库）。



### 分库分表会带来什么问题呢？

- **join 操作** ： 同一个数据库中的表分布在了不同的数据库中，导致**无法使用 join 操作**。

  这样就需要手动进行数据的封装，如在一个数据库中查询到一个数据之后，再根据这个数据去另外一个数据库中找对应的数据。

- **事务问题** ：同一个数据库中的表分布在了不同的数据库中，**如果单个操作涉及到多个数据库**，那么数据库自带的事务就无法满足我们的要求了。

- **分布式 id** ：分库之后， 数据遍布在不同服务器上的数据库，数据库的**自增主键已经没办法满足生成的主键唯一**了。

  如何为不同的数据节点生成全局唯一主键呢？这个时候，就需要为系统引入分布式 id 了。

- ......

另外，引入分库分表之后，一般需要 DBA 的参与，同时还需要更多的数据库服务器，这些都属于成本。

> **DBA**：数据库管理员



### 分库分表有没有什么比较推荐的方案？（待补充）

https://mp.weixin.qq.com/s/A2MYOFT7SP-7kGOon8qJaw



### 分库分表后，数据怎么迁移呢？

- **停机迁移**

  写个脚本老库的数据写到新库中。比如你在凌晨 2 点，系统使用的人数非常少的时候，挂一个公告说系统要维护升级预计 1 小时。然后，你写一个脚本将老库的数据都同步到新库中。

- **双写方案**

  - 对老库的更新操作（增删改），同时写入新库（双写）。

    如果操作的数据不存在于新库的话，需要插入到新库中。 

    这样就能保证新库里的数据是最新的。

  - 在迁移过程，双写只会让被更新操作过的老库中的数据同步到新库，还需要自己写脚本将老库中的数据和新库的数据做比对。

    如果新库中没有，那就把数据插入到新库；

    如果新库有，旧库没有，就把新库对应的数据删除（冗余数据清理）。

  - 重复上一步的操作，直到老库和新库的数据一致为止。

  可以借助数据库同步工具 Canal 做增量数据迁移（还是依赖 binlog，开发和维护成本较低）。





## 读写分离

### 何为读写分离？

读写分离主要是为了**将对数据库的读写操作分散到不同的数据库节点上**。

小幅提升写性能，大幅提升读性能。

一般情况下，我们都会选择**一主多从**，也就是一台主数据库负责写，其他的从数据库负责读。

主库和从库之间会进行数据同步，以保证从库中数据的准确性。这样的架构实现起来比较简单，并且也符合系统的写少读多的特点。

### 读写分离会带来什么问题？如何解决？

**主从同步延迟问题**

主库和从库的数据存在延迟，这个时间差就导致了主库和从库的数据不一致性问题。

**解决方案**

1. **强制将读请求路由到主库处理**

   会增加主库的压力，但是，实现起来比较简单。

   对于这种方案，可以将那些**必须获取最新数据的读请求**都交给主库处理。

2. **延迟读取**

   如主从同步延迟 0.5s，则 1s 之后再读取数据。

   对于一些对数据比较敏感的场景，可以**在完成写请求之后，避免立即进行请求操作**。如支付成功之后，跳转到一个支付成功的页面，当点击返回之后才返回自己的账户。



### 如何实现读写分离

1. 部署多台数据库，选择其中的一台作为主数据库，其他的一台或者多台作为从数据库。
2. 保证主数据库和从数据库之间的数据是实时同步的，这个过程也就是**主从复制**。
3. 系统将写请求交给主数据库处理，读请求交给从数据库处理。

##### 常用实现方式

1. **代理方式**

   在应用和数据中间加了一个代理层，应用程序所有的数据请求都交给代理层处理，代理层负责分离读写请求，将它们路由到对应的数据库中。

   提供类似功能的中间件有 **MySQL Router**（官方）、**Atlas**（基于 MySQL Proxy）、**Maxscale**、**MyCat**。

   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/461112716e30db118f4c784adc6e2ff7.png" alt="读写分离-代理层" style="zoom:50%;" />

2. **组件方式**（推荐）

   引入第三方组件来帮助读写请求，在各种互联网公司中用的最多的，相关的实际的案例也非常多。

   推荐使用 `sharding-jdbc` ，直接引入 jar 包即可使用，非常方便。









## 主从复制

### 主从复制原理了解么

MySQL binlog（即二进制日志文件） 主要记录了 MySQL 数据库中数据的所有变化(数据库执行的所有 DDL 和 DML 语句)。因此，**根据主库的 MySQL binlog 日志就能够将主库的数据同步到从库中**。

**过程**

1. 主库将数据库中数据的变化写入到 binlog
2. 从库连接主库
3. 从库创建一个 I/O 线程向主库请求更新的 binlog
4. 主库创建一个 binlog dump 线程来发送 binlog ，从库中的 I/O 线程负责接收
5. 从库的 I/O 线程将接收的 binlog 写入到 relay log 中。
6. 从库的 SQL 线程读取 relay log 同步数据本地（也就是再执行一遍 SQL ）。

**总结**

**MySQL 主从复制是依赖于 binlog 。**

**另外，常见的一些同步 MySQL 数据到其他数据源的工具（比如 canal）的底层一般也是依赖 binlog 。**

> **canal** 
>
> 阿里开源的一个工具，这个工具可以实现 MySQL 和其他数据源比如 Elasticsearch 或者另外一台 MySQL 数据库之间的数据同步。





## 分布式锁

### 是什么？用来做什么？

单服务使用Lock或者synchronized保证数据一致性。

多服务架构，需要保证多个服务不能同时操作同一个数据（接口/定时任务），需要分布式锁。



### redis如何实现分布式锁

**锁的获取**

setnx key value指令

没有值的时候设置会返回1，表示成功；否则返回0，表示已经有值。

**如何删除这个锁**

del key指令

**锁的流程**

获取锁-业务代码-删除锁



### 如何避免死锁

**场景**

1. 操作业务代码时，系统挂了，导致锁没有删除
2. 进程挂了，服务挂了，导致锁没有删除

**解决方案**

1. 自动释放锁：设置过期时间，超时自动删除锁

   expire指令

   设置过短：锁提前释放

   设置过长：卡住，资源占用

2. finally做解锁操作

**另一个问题：释放别人的锁**

加的锁被其他线程释放掉

场景：线程1操作资源，操作超时，分布式锁超时释放，线程2上锁，此时线程1业务执行完，要释放锁

**解决方案**

给上的锁加唯一标识，如UUID，加锁前生成，这个UUID只在当前线程有，其他线程不得而知，只能当前线程解锁。

同时因为此时每个线程的解锁解的不一样，所以解锁前需要先查有没有锁再进行释放。

**进一步：获取锁与释放锁不是原子操作**

如果get key后再del key，存在两个操作之间key被删除的可能，即操作非原子性。

**解决方案**

保证原子性：

- jedis+lua脚本：lua脚本保证一套操作原子性。



### 过期时间的评估/时间设置的适用性

1. 冗余时间设置

2. 看门狗机制：

   守护线程，定时检查锁的失效时间，如果快过期业务还在执行，自动续约。















# 消息队列

## 为什么需要消息队列

常用于实现异步处理、服务解耦、流量控制

**异步处理**

随着业务扩充，请求链路越来越长，导致客户响应变慢。

这个时候将主业务执行完后丢消息到消息队列，其他业务并行消费消息。

可以减少请求等待，服务异步并发处理，提升总体性能

**服务解耦**

一个主流程包含了多个业务，任何一个业务的变更都可能影响到服务运行，

通过将订单相关消息放入消息队列，需求的业务订阅对应主题，实现服务解耦。

**流量控制**

较重的业务面对爆发式流量，需要一个中间件作为缓冲，消息队列可以胜任。（削峰填谷）

网关请求放入消息队列，后端服务去尽力消化消息队列的请求，超时的请求直接返回错误。（处理生产者过快）

部分较长的业务流程，由后端按照自己的节奏处理消息也可以。（处理消费者过慢）



## 消息队列的模型

队列模型与发布订阅模型

**队列模型**

生产者可以有多个，往一个队列放消息，消费者可以有多个。

消费者之间是竞争关系，每条消息只能被一个消费者消费。

**发布/订阅模型**

解决一条消息能被多个消费者消费的问题。将消息发往topic主题中，订阅了该主题的订阅者都可以消费该消息。



## 常用术语

- 生产者：消息发送方，Producer

- 消费者：消息接收方，Consumer

- 消息队列服务端：Broker

- 简单流程：

  消息从生产者发往Broker，Broker将消息存储至本地，消费者从Broker拉取消息，或者Broker推送消息至Consumer。



## 如何保证消息不丢失

从消息队列的三个阶段处理：生产消息、存储消息、消费消息

**生产消息阶段**

消息由生产者发送给存储消息的一方Broker，需要处理Broker的响应，

不论同步还是异步，做好异常处理，记录错误信息，

如写入失败，需要重新发送；多次发送失败，需要做报警，日志记录。

**存储消息阶段**

1. 信息存储需要在**消息刷盘后**再给生产者发送消息，

   如果消息写入缓存就响应，那么机器突然断电会导致生产者以为发送成功。

2. 如果Broker是集群部署，有多副本机制，即消息还需要写入副本机中，

   则配置至少写入两台机器后再给生产者响应，基本保证存储的可靠性。

**消费消息阶段**

不能在接受消息存入内存队列就返回消费成功，因为考虑此时消费者宕机的情况，

在消费者执行完业务逻辑再返回Broker消费成功。

**总结**

- 生产者处理好Broker响应，做好重试、报警机制。
- Broker控制响应生产者的时机，单机在消息刷盘后响应，多副本集群在发送至两个及以上副本后再响应。
- 消费者在执行完业务逻辑再返回响应给Broker。





## 如何处理重复消息（幂等）

**场景**

1. 消息发送给Broker，得到响应则发送成功，不成功则重发。但这个响应如果Broker提供了，但生产者因为网络原因没有收到，会导致消息重复发送。
2. 消费者消费消息时，事务已经提交，要更新通知Broker成功消费，此时挂掉，由另一个消费者顶上，再次拿到刚才的消息，重新执行业务逻辑，导致消息重复消费。

**方案**

1. 首先避免重复消息，比如不管响应，只发送一次，但是这样不可靠。

2. 从业务逻辑上处理重复消息，保持**幂等**。

**如何幂等处理消息**

1. 前置条件判断，如业务逻辑，或者通用的版本号判断。
2. 数据库约束，如唯一索引。
3. 记录关键key，如订单号，重复信息到来时先判断关键key是否已被处理，再进行业务逻辑。



## 如何保证消息的有序性

分为：全局有序与部分有序

**全局有序**

- 保持一个生产者；

- 一个Topic内只能有一个队列/分区；

- 消费者单线程消费队列。



**部分有序**

将Topic内部划分为需要的队列数，通过特定策略将消息发送到固定的队列，

每个队列对应一个单线程的消费者。

以此完成部分有序的需求，并通过队列的数量并发提高消息处理效率。





## 如何处理消息堆积

**原因**

生产者的生产速度与消费者的消费速度不匹配。

可能是消息消费失败重试造成，也可能是消费者消费能力弱，逐渐堆积。

**定位与处理**

- 如果是bug则处理bug

- 如果是消费能力弱，则优化消费逻辑，

  如由单条逐个消费改为批量处理（数据库插入）。

- 如果还是慢，考虑水平扩容。

  增加Topic的队列数和消费者数量，增加的队列数与消费者数要匹配。

- 消费者内部是单线程还是多线程消费看具体场景，

  需要考虑消费者内部使用内存队列消费，存在宕机风险。



## 消息队列的推拉模式选择

如果使用RocketMQ，基本会问这个问题。

### 推拉模式的场景

推拉模式的选择首先指的是**消费者与Broker之间**的交互。

**为什么**

生产者与Broker之间默认是推的方式，即生产者主动将消息推送给Broker，而不是Broker拉取消息

如果由Broker拉取消息，则生产者需要存储消息来等待Broker拉取，如果生产者很多，则消息的可靠性就不仅依赖于Broker，还依赖于大量生产者。



### 推模式

指消息从Broker推向消费者，消费者被动接收消息，Broker主导。

**好处**

- 消息实时性好，Broker接收后可马上推送
- 消费者使用简单，只需要等消息推送过来即可

**缺点**

**推送效率不匹配消费效率**

- 推模式的效果是最快速度推送消息，当生产者发送消息的速率大于消费者的消费速率，就会出现爆仓。

- 不同消费者消费速率不同，Broker难以平衡，如果要实现自适应推送速度，需要Broker维护，增加了Broker的复杂度。

**总结**

推模式难以根据消费者状态控制推送速率，适用于消息量不大，消费能力强，实时性要求高的情况。



### 拉模式

指消费者主动向Broker请求拉取消息，Broker被动发送消息给消费者。

**好处**

- 主动权在消费者，**消费者根据自身情况拉取消息**，在消费能力不足的情况下，可以根据策略停止拉取，或者间隔拉取

- **Broker相对轻松**，只管接收，存储消息，消费由消费者主动发起，就是个没有感情的工具人

- **更适合消息的批量发送**，

  推模式可以单个推送，也可以缓存后一起发送，但不知道消费者能否一次性处理大量消息。

  拉模式可以参考消费者请求的信息决定缓存多少消息后批量发送。

**缺点**

- **消息延迟**

  消费者不知道消息什么时候到，只能不断拉取，又不能频繁请求（避免攻击），比如2s请求一次，则消息就有延迟2s的可能。

- **消息忙请求/无用请求**

  消息隔了好久才有，那么这段时间消费者拉取消息都是无效的。



### 如何选择

- RocketMQ与ka'fka都选择拉模式，ActiveMQ选择推模式
- 个人选择拉模式，因为消息队列由持久化消息的需求，即本身带有存储功能，保证消息存好被消费者消费即可。
- 消费者各种各样，队列本身不应该依赖于消费者，比如控制推送速度什么的。



### 选择拉模式的消息队列如何减轻缺点：长轮询（待补充）

#### RocketMQ

PushConsumer模式

大概意思是队列偷偷去自己请求消息，放入阻塞队列，然后线程不断从阻塞队列获取拉请求，实现准实时拉取。

#### Kafka

？？？？

#### 总结

长轮询的机制

做法就是通过消费者等待消息，有消息Broker直接返回消息，没有消息采取延时处理的策略。

为保证消息的及时性，在对应队列/分区新消息到来时，提醒消息来了，及时返回消息。



## 事务消息

分布式系统往往妥协到最终一致性，保证数据最终的完整与一致性，可用性为王。

完全版的事务代价太大，要求中间态数据不被读取，操作不可分割，执行是阻塞的，资源长期锁定。

### 常见分布式事务

2PC，TCC和事务消息

### 2PC

二阶段提交，分别有协调者和参与者两个角色。

二阶段包括准备阶段和提交阶段。

**准备阶段**

协调者向各参与者发送准备命令，这个阶段参与者除了事务的提交其他都做了。

**提交阶段**

协调者看各个参与者准备阶段是否ok，是则向各个参与者发送提交命令，有一个不ok就发送回滚命令。

**重点**

2PC只适用于数据库层面的事务，就是只能保证与数据库相关的提交与回滚，如果是上传图片什么的就无法保证。

2PC是一种强一致性的分布式事务，同步阻塞，即接收到提交/回滚命令前，所有参与者互相等待，特别是执行完准备阶段的时候，资源处于锁定状态，如果有一个参与者卡了很久，其他参与者都要等他，产生长时间资源锁定的阻塞。

**总结**

- 效率低
- 存在单点故障，单点指协调者
- 存在极端条件下数据不一致的风险，图某个参与者未收到提交命令，宕机，恢复之后数据回滚，但其他参与者都已经提交事务。



### TCC

能保证业务层面事务，不仅仅是数据库层面。

分为三个阶段 try-confirm-cancel，每个业务都需要这三个方法。

- try方法：不会做业务操作，只是占个坑，如+10积分，就先在与添加字段+10积分，但没有在用户账户做增加
- confirm方法：try成功后执行，做真正的业务操作。
- cancel方法：有一个try失败就都执行cancel操作，撤回之前的修改。

**总结**

TCC与业务耦合性很大，需要业务改造才能完成，这也是TCC的缺点。

confirm与cancel操作要幂等，因为执行这两步没有退路，必须完成，需要有重试机制，还要幂等。



### 事务消息（待补充）

适用于异步更新场景，对数据实时性要求不高。

**目的**

解决消息生产者与消息消费者的数据一致性问题。

**RocketMQ**











## 消息队列的使用场景

消息队列的使用场景主要有三个：解耦，异步，削峰

#### 解耦

**通过一个MQ，发布和订阅模型，Pub/Sub模型，系统就和其它系统彻底解耦。**

考虑一下负责的系统中，是否有类似的场景，就是一个系统或者一个模块，调用了多个系统，互相之间的调用很复杂，维护起来很麻烦。但是其实这个调用是不需要同步调用接口的，如果用MQ给他异步化解耦，也是可以的，这个时候可以考虑在自己的项目中，是不是可以运用这个MQ来进行系统的解耦。



如当A系统发送数据到BCD系统，没有使用消息队列时的耦合场景：

![image-20200418212721479](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200418212721479.png)

后续随着系统增加，如EF系统加入，D系统移除

![image-20200418213021225](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200418213021225.png)

会导致A系统需要处理的事情会很多。

##### 使用MQ

系统A发送消息到队列，哪个系统需要，就从队列中获取。

新系统加入，也直接从队列中消费。老系统不再需要数据，就停止对队列的消费。

A系统不需要考虑给谁发消息，也不需要为对接其他系统进行额外的维护，不需要考虑调用成功/失败/超时等情况。

![image-20200419205127214](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200419205127214.png)



#### 异步



如系统A，调用了其它三个系统的服务，发现用户进行请求时，需要花费很长时间。

![image-20200419205855859](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200419205855859.png)

- 本地SQL 20ms
- B系统接口调用  3条SQL  100ms
- C系统接口调用  4条SQL  150ms
- D系统接口调用  2条SQL  80ms

总耗时350ms，这还是不考虑延时与接口耗时增加的情况。

一般情况是每个请求都必须在**200ms**以内完成，因为这个是对用户是无感知的。

##### 使用MQ进行异步化



![image-20200419213232855](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200419213232855.png)

- 系统本地SQL 耗时20ms
- 发送消息到MQ队列，耗时5ms

系统A只需要发送消息后即可返回，响应较快。



#### 削峰

高峰期间某个接口收到大量请求，进行了大量数据库查询。

![image-20200419213609511](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200419213609511.png)

一般的MySQL，抗到QPS=2000的时候就已经达到了瓶颈，如果每秒请求达到了5000的话，可能直接就把MySQL打死了。如果MySQL被打死，然后整个系统就崩溃，然后系统就没法使用。

但是中午的高峰期过了之后，到下午的时候，就成了低峰期，可能也就一万用户同时在网站上操作，每秒的请求数量可能就50个请求，对整个系统几乎没有任何压力。

##### 使用MQ进行削峰

![image-20200419235201993](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20200419235201993.png)

在达到每秒5000请求的时候（假设mysql每秒最多处理2000请求）：

- 将每秒的请求写入MQ中
- 系统A从MQ中慢慢拉取请求，每秒最多拉取2000个（不超过最大负载），这样绝不会挂掉
- 每秒5000请求处理2000请求，会导致大量请求被堆积在MQ中
- 在高峰过去后，处理速度并不会下降，慢慢消化掉所有请求。

算一笔账，每秒积压3000请求，一个小时积累1000万请求，在经过一个小时左右可以处理完毕。



## 消息队列的优缺点

**优点**：异步，解耦，削峰

**缺点**：

- **降低系统可用性**：系统引入的外部依赖越多，越容易挂掉。如原本ABCD四个系统进行维护，现在增加了消息队列的因素，增加了消息队列挂掉导致系统挂掉的风险。
- **提高系统复杂度**：引入MQ会产生新的MQ问题，如处理重复消费问题，消息丢失问题，消息处理顺序问题等。
- **一致性问题**：异步操作，如果A成功而BCD存在不成功的情况，导致数据不一致问题。

所以消息队列的引入并不是尽善尽美的，在享受引入的优势时，也需要针对缺点，做出额外的技术方案与架构进行规避。即使提高了复杂度，还是要用。



## 消息队列有哪几种？区别于适用场景

常见四种：

|              | 单机吞吐量                                                   | 时效性                                       | 可用性/架构                | 消息可靠性                      | 核心特点                                                     | 评价                                                         |
| ------------ | ------------------------------------------------------------ | -------------------------------------------- | -------------------------- | ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **ActiveMQ** | 万级，吞吐量比RocketMQ和Kafka要低一个数量级                  | 毫秒级                                       | 基于主从架构实现高可用     | 有较低的概率丢失数据            | MQ领域的功能极其完备                                         | 非常成熟，功能强大，在业内大量公司以及项目都有应用。但是偶尔消息丢失，并且现在社区以及国内应用都越来越少，官方社区对ActiveMQ5.X维护越来越少。<br />而且确实主要是基于解耦和异步来用的，较少在大规模吞吐场景中使用 |
| **RabbitMQ** | 万级，吞吐量比RocketMQ和Kafka要低一个数量级                  | 微秒级，这是RabbitMQ的一大特点，就是延迟最低 | 高，基于主从架构实现高可用 | 消息不丢失                      | 基于Erlang开发，所以并发能力强，性能及其好，延时很低         | erlang语言开发的，性能极其好，延时很低，特别适用于中小型的公司。<br />缺点显而易见，就是吞吐量会低一些，因为使用erlang开发，目前没有多少公司使用其开发。所以针对源码界别的定制，非常困难，因此公司的掌控非常弱，只能依赖于开源社区的维护。 |
| **RocketMQ** | 十万级，RocketMQ也是可以支撑高吞吐的一种MQ                   | 毫秒级                                       | 非常高，分布式架构         | 经过参数优化配置，可以做到0丢失 | MQ功能较为完善，还是分布式的，扩展性好                       | 接口简单易用，毕竟在阿里大规模应用过，有阿里平台保障，日处理消息上 百亿之多，可以做到大规模吞吐，性能也非常好，分布式扩展也很方便，社区维护还可以，可靠性和可用性都是OK的，还可以支撑大规模的topic数量，支持复杂MQ业务场景。 |
| **Kafka**    | 1十万级，这是kafka最大的优点，就是吞吐量高。一般配置和数据类的系统进行实时数据计算、日志采集等场景 | 毫秒级                                       | 非常高，分布式架构         | 经过参数优化配置，可以做到0丢失 | 功能较为简单，主要支持简单的MQ功能，在大数据领域的实时计算以及日志采集被大规模使用，是实时上的标准。 | 仅仅提供较少的核心功能，但是提供超高的吞吐量，ms级别的延迟，极高的可用性以及可靠性，分布式可以任意扩展。 同时kafka最好是支撑较少的topic数量即可，保证其超高的吞吐量。 |

综上所述：

- 一般的业务要引入MQ，最早都是用AcviceMQ，但是现在用的不多了，没有经过大规模吞吐量场景的验证，社区也不是很活跃。
- RabbitMQ后面被大量的中小型公司所使用，但是erlang语言阻碍了大量的Java工程师深入研究和掌握它，对公司而言，几乎处于不可控的状态，但是RabbitMQ目前开源稳定，活跃度也表较高。
- RocketMQ是阿里开源的一套消息中间件，目前也已经经历了天猫双十一，同时底层使用Java进行开发。

如果中小型企业技术实力一般，技术挑战不是很高，推荐使用RabbitMQ。

如果公司的基础研发能力很强，想精确到源码级别的掌握，那么推荐使用RocketMQ。

同时如果项目是聚焦于大数据领域的实时计算，日志采集等场景，那么Kafka是业内标准。







# 认证与授权

## 认证 (Authentication) 和授权 (Authorization)的区别是什么？

- **认证 (Authentication)：** 你是谁。

  验证您的身份的凭据（例如用户名/用户 ID 和密码），通过这个凭据，系统得以知道你就是你，也就是说系统存在你这个用户。所以，Authentication 被称为身份/用户验证。

- **授权 (Authorization)：** 你有权限干什么。

  掌管我们访问系统的权限。比如有些特定资源只能具有特定权限的人才能访问比如 admin，有些对系统资源操作比如删除、添加、更新只能特定人才具有。



## **什么是 RBAC**

RBAC 即基于角色的权限访问控制（Role-Based Access Control）。这是一种通过角色关联权限，角色同时又关联用户的授权的方式。

简单地说：一个用户可以拥有若干角色，每一个角色又可以被分配若干权限，这样就构造成“用户-角色-权限” 的授权模型。

![RBAC](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/booksRBAC.png)

**在 RBAC 中，权限与角色相关联，用户通过成为适当角色的成员而得到这些角色的权限。这就极大地简化了权限的管理。**



## 什么是SSO(单点登录)

SSO(Single Sign On)即单点登录

说的是用户登陆多个子系统的其中一个就有权访问与其相关的其他系统。

> 举个例子我们在登陆了京东金融之后，我们同时也成功登陆京东的京东超市、京东国际、京东生鲜等子系统。
>
> ![sso](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/sso.74162fc9.png)





## 什么是 OAuth 2.0？

OAuth 是一个行业的**标准授权协议**，主要用来授权第三方应用获取有限的权限。

OAuth 2.0 是对 OAuth 1.0 的完全重新设计，OAuth 2.0 更快，更容易实现，OAuth 1.0 已经被废弃。

实际上它就是一种授权机制，它的最终目的是**为第三方应用颁发一个有时效性的令牌 Token，使得第三方应用能够通过该令牌获取相关的资源**。







# 系统安全

## XSS攻击

https://tech.meituan.com/2018/09/27/fe-security.html

### 什么是XSS

Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。

攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。

为了和 CSS 区分，这里把攻击的第一个字母改成了 X，于是叫做 XSS。

本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。



### 通过什么方式注入脚本

处理输入时，以下内容均不可信：

- 用户的UGC内容（User-generated content用户生成内容）
- 来自第三方的链接
- URL参数
- POST参数
- Referer （可能来自不可信的来源）
- Cookie （可能来自其他子域注入）





### XSS漏洞注入的方法

XSS 攻击是页面被注入了恶意的代码。

- 在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。
- 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
- 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
- 在标签的 href、src 等属性中，包含 `javascript:` 等可执行代码。
- 在 onload、onerror、onclick 等事件中，注入不受控制代码。
- 在 style 属性和标签中，包含类似 `background-image:url("javascript:...");` 的代码（新版本浏览器已经可以防范）。
- 在 style 属性和标签中，包含类似 `expression(...)` 的 CSS 表达式代码（新版本浏览器已经可以防范）。

如果开发者没有将用户输入的文本进行合适的过滤，就贸然插入到 HTML 中，这很容易造成注入漏洞。

攻击者可以利用漏洞，构造出恶意的代码指令，进而利用恶意代码危害数据安全。



### XSS分类

- 存储型：恶意代码被存储到数据库，打开后由服务器拼接在html返回响应，解析时恶意代码被执行
- 反射型：构造恶意url，打开后服务器从url取出拼接到html返回响应，解析时恶意代码被执行
- DOM型：构造恶意url，打开后前端js取出url中恶意代码执行



### XSS预防

两大要素：攻击者提交恶意代码/浏览器执行恶意代码

- 过滤输入：对于明确输入类型的可以过滤，如电话邮箱等；其他位置的过滤会引入不确定性和乱码问题，因为不确定要输出到哪里。
- 防止html出现注入
- 防止js执行恶意代码



### 应对存储型/反射型

避免html在解析时存在恶意代码被执行

- **改为纯前端渲染，数据与代码分开**：前后端分离

  纯前端渲染过程为浏览器先加载静态html，再通过js的ajax加载数据，调用dom更新

  所以需要避免DOM型

  对于内部、管理系统适合纯前端，但性能要求高，由SEO需求的页面，仍需要拼接html

- **对html做充分转义**

  选择合适的转义库，如doT.js、ejs、FreeMarker 等。

  对于 HTML 转义通常只有一个规则，就是把 `& < > " ' /` 这几个字符转义掉，但不完善。

   Java 工程里，常用的转义库为 `org.owasp.encoder`。

  

### 应对DOM型（待补充）

实际是前端js不严谨，将不可信数据作为代码执行。

这个部分属于前端技巧，这里暂略。



### 其他应对措施

- 输入内容长度限制
- HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie
- 验证码：防止脚本冒充用户提交危险操作



### 检测XSS

- 使用通用 XSS 攻击字符串手动检测 XSS 漏洞。
- 使用扫描工具自动检测 XSS 漏洞。





# 项目实战相关问题

## 流量削峰，如何实现

削峰从本质上来说就是更多地延缓用户请求，

以及层层过滤用户的访问需求，

遵从“**最后落地到数据库的请求数要尽量少**”的原则。

### 消息队列解决削峰

把同步的直接调用转换成异步的间接推送，中间通过一个队列在一端承接瞬时的流量洪峰，在另一端平滑地将消息推送出去。





## 保证表单提交的幂等性/接口幂等性问题

**接口幂等性含义**

一个接口用同样的参数反复调用，不会造成业务错误，那么这个接口就是具有幂等性的。

**需要幂等性的场景**

- 用户重复操作
- 代码重试
- 消息重复消费
- 网络波动
- ...

**如何保证幂等**

使用redis或mysql做幂等判断：

通过一个字段能够区分唯一请求/重复请求。

关键在于**找出一个幂等键**：

- 如注册场景，用户名就是幂等键

- 转账请求，允许单个用户多次转账，区分重复点击还是多次转账的方式便是

  在进入转账界面时生成唯一标识，在转账请求时传递，这样可以分辨重复点击。

简单的解决方式：前端按钮重复点击禁用，防止用户误操作。



**解决方式**

- 唯一索引去重
- Token+Redis
- 状态机
- 乐观锁
- 分布式锁
- 全局唯一号



## 如何保证本地缓存的命中率/集群环境本地缓存失效

**场景**

缓存存在JVM内存，查询不到就查redis，然后回写到jvm内存；

服务器进行了负载均衡，本地缓存和机器绑定，如果请求到另一台机器则需要再次查询redis，即缓存命中率为0。 

**方案**

- 网关层做用户路由，相同uid的请求打到同一台机器
- 本地缓存不缓存用户维度的数据，而是用于缓存全局配置

**其他意见**

- 缓存预热：预加载缓存数据到系统，定时刷新，命中就用，不命中时不添加

- 读写分离



## 策略模式能否消除ifelse

**场景**

电商场景的优惠券之口，下单后有不同的折扣方案，根据type选择对应的折扣逻辑

改造成策略模式：

- 定义接口，提供一个计算优惠结果的方法
- 将不同方案封装到具体的策略类，实现这个接口

但是这么修改只是把原来的ifelse分类场景的优惠逻辑封装了起来，条件判断还在。

**解决方案**

引入工厂模式，工厂中存储一个type与策略的映射关系，如map

**改进**

- 新增优惠策略时，需要动代码组装的逻辑，如手动增加映射关系：

  借助spring屏蔽组装逻辑，用自动注入组装代码。

- 策略的选择是动态调整/范围形式的：

  接口中抽象出判断是否符合策略的方法，用于返回是否使用这个策略。

**总结**

策略模式定义接口，将公共行为抽象起来，将具体逻辑封装到策略类中。

而消除ifelse的这些方式并不属于策略模式，而是简单工厂模式的变种。



## 系统内部接口幂等调用的信息返回错误信息还是查询结果

**场景**
优惠券服务抖动几秒中，这段时间内的调用发券接口均超时

而超时3秒钟会熔断程序，定义为发送失败，等待重试。

但优惠券服务内部为发送成功，导致下一次重试发券接口返回重复发放。

这是由于发券接口添加了幂等id，但外部的处理逻辑只需要接受优惠券发放明细，对于重复提交的错误信息并不关心，更希望即使是重复调用也只需要将发送结果返回即可。

**解决方案**

相同幂等id不论请求几次只需要返回相同结果即可，不需要返回错误信息。

或者将信息都返回，封装在结果的不同层级中，互不干扰。



## 表数据增长过快的解决方案（待补充）

**场景**

营销活动，类似拼多多，用户发起任务，拉好友助力获得商品。

效果不错，导致任务表数据过多上千万，导致查询和更改受到了影响。

**方案**

提前准备做分库分表

- 用任务id作为分表字段（如按照id%2的结果）分为两张表。

  缺陷：按照客户uid查询所有任务时，需要所有分表并合并结果集，比较麻烦

  ![image-20220521213446859](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220521213446859.png)

- 使用用户uid分表可以解决按客户查询数据。

  缺陷：当按照任务id查询任务时，不知道应该查哪一个分表

- **基因法**

  任务id的生成方式进行调整，把用户uid的尾部取一个片段作为基因，拼接到任务id尾部。

  然后按照任务id分表，如取余2的情况只拼最后一位就可以，这样任务id的分表会与用户id分表的分布是一致的。

  - 按照用户uid查询所有任务的情况：由于拼接规则，该用户的所有任务都只在一张表里，不需要合并数据；

  - 按照任务id查询任务的情况：根据最后一位的取余情况可以直接确定查哪一张表。

  ![image-20220521215820049](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220521215820049.png)

  

- **一致性哈希**/Hash取模

  根据取余分配到不同的表里。要根据实际情况确认模的大小。此方案由于平均分配，不存在热点问题，但数据迁移很复杂。

  ![分库分表_分库分表_03](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/4786a0b79d11e250daa478bffacbbd8cc41d3b.png)

- **按范围分表**

  根据范围进行划分，如日期，大小。此方案不存在数据迁移，但存在热点问题。

  ![分库分表_分库分表_04](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/29c823a26f02200ba51071ffa31ed09a1e43e3.png)





## 跨库分页问题

**场景**

商品列表按照销量排序，通过连销量表进行order排序，

但问题在于销量不在本地服务，需要通过接口获取所有商品销量，在代码内进行排序与分页

如果每次访问都要全量查询实时销量，商品多了性能肯定有影响，满足性能又会损失实时性。

**解决方案**

- 一种思路：

  数据库备份销量字段，通过mq增量更新，或者定时任务定时同步，

  从而使得使用sql排序。

- 





## 分库分表的方案

### 如何选择分库还是分表

- **只分库不分表**

  应对数据库读写QPS过高，数据库连接不足

- **只分表不分库**

  应对单表数据库量过大，存储性能遇瓶颈

- **既分库也分表**

  连接数不足+数据量过大性能瓶颈

### 切分方案

#### 分表分多少表

所有的技术都是为业务服务的，从数据上看业务背景。

如

一个业务系统是为了解决会员的咨询诉求，通过客服平台系统来服务会员，

目前主要以同步的离线工单数据作为数据源来构建自己的数据。

假设，每一笔离线工单都会产生对应一笔会员的咨询问题（简称：问题单），如果：

- 在线渠道：每天产生3w笔聊天会话，假设，其中50%的会话会生成一笔离线工单，那么每天可生成 3w * 50% = 1.5w 笔工单；
- 热线渠道：每天产生2.5w通电话，假设，其中80%的电话都会产生一笔工单，那么每天可生成 2.5w * 80% = 2w 笔/天；
- 离线渠道：假设离线渠道每天直接生成3w笔。

合计6.5w 笔/天。

考虑到以后可能要继续覆盖的新的业务场景，需要提前预留部分扩展空间，这里假设为每天产生8w笔问题单。

除问题单外，还有另外2张常用的业务表：用户操作日志表、用户提交的表单数据表。

其中，每笔问题单都会产生多条用户操作日志，根据历史统计数据来可以看到，平均每个问题单大约会产生8条操作日志，我们预留一部分空间，假设每个问题单平均产生约10条用户操作日志。

如果系统设计使用年限5年，那么问题单数据量大约为 5年 * 365天/年 * 8w/天 = 1.46亿，那么估算出的表数量如下：

问题单需要：1.46亿/500w = 29.2 张表，就按32张表来切分；
操作日志需要 ：32 * 10 = 320 张表，就按 32 * 16 = 512 张表来切分。

#### 分库分多少库

除了要考虑平时的业务峰值读写QPS外，还要考虑到诸如双11大促期间可能达到的峰值，需要提前做好预估。

如

根据历史QPS、RT等数据评估，假设我们只需要3500数据库连接数，如果单库可以承担最高1000个数据库连接，那么我们就可以拆分成4个库。



#### 如何切分

**水平切分**

按业务维度切分的方式，比如常见的按会员维度切分，根据一定的规则把不同的会员相关的数据散落在不同的库表中。

**垂直切分**

垂直切分可以简单理解为，把一张表的不同字段拆分到不同的表中。

比如：假设有个小型电商业务，把一个订单相关的商品信息、买卖家信息、支付信息都放在一张大表里。可以考虑通过垂直切分的方式，把商品信息、买家信息、卖家信息、支付信息都单独拆分成独立的表，并通过订单号跟订单基本信息关联起来。

也有一种情况，如果一张表有10个字段，其中只有3个字段需要频繁修改，那么就可以考虑把这3个字段拆分到子表。避免在修改这3个数据时，影响到其余7个字段的查询行锁定。



### 分库分表的后续问题处理

#### 如何让数据均匀分布在分库与分表中

比如，当热点事件出现后，怎么避免热点数据集中存取到某个特定库/表，造成各分库分表读写压力不均的问题。

这个问题与负载均衡类似：

![浅谈分库分表那些事儿_数据库_02](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/31154513_61ceb50911cb155202.png)

**解决方案**

基于 一致性Hash算法 裁剪。

具体实现待确认



#### 分库分表环境下，如何解决分库后主键ID的唯一性问题

单表使用自增模式，但分库后存在主键重复问题。

**解决方案**

- UUID方式

  但太长，查询性能差，空间大，修改了主键类型，不利于迁移。

- 对ID进行拆分，如分段，不同库表使用不同ID段。

  问题是ID段的长度选择问题，如果分配耗尽会占用其他段

- 改进ID分段，利用等差数列分隔，一段用完按照固定间隔取下一段。

  ![浅谈分库分表那些事儿_java_03](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/31154513_61ceb509595f272978.png)

  先对ID分段，再按固定步长递增

- 实际场景下为了分析排查问题方便，往往会在ID中增加一些额外信息

  如包含了日期、版本、分库索引等信息。



#### 分库分表环境下的事务问题

由于分布式环境下，一个事务可能跨多个分库，所以，处理起来相对复杂。

1. **分布式事务**
   - 优点：由应用服务器/数据库去管理事务，实现简单。
   - 缺点：性能代价较高，尤其是涉及到分库数量较多时尤为明显。而且，还依赖于一些特定的应用服务器/数据库提供的分布式事务实现方案。
2. **由应用程序+数据库共同控制**
   - 原理：大事化小，将多个大事务拆分成可由单个分库处理的小事务，由应用程序去控制这些小事务。
   - 优点：性能良好，少了一个分布式事务协调处理层。
   - 缺点：需要从应用程序自身上做事务控制的灵活设计。从业务应用上做处理，应该改造成本高。

缺少具体案例



#### 分库分表后的历史数据迁移

分库切换发布流程可选择停机、不停机发布两种：

- **停机发布**
  - 首先，要选择一个夜黑风高、四处无人的夜晚。寒风刺骨能让你清醒，四处无人，你好办事打劫偷数据，我们就挑了个凌晨4点寂静无人的时候做切换；如果可以，能临时关闭业务访问入口最好。
  - 然后，在DTS上面新增一个全量的数据复制任务，把单库的数据复制到新的分库中（这个过程很快，千万级数据应该10分左右就能搞定）。
  - 之后，切换TDDL配置（单库->分库），并重启应用，检查是否生效。
  - 最后，开放业务访问入口，提供服务。
- **不停机发布**
  - 首先，同样需要选择一个夜黑风高的夜晚，来衬托你的帅气。
  - 然后，通过DTS复制某个时间点前的数据，比如：今天前的历史数据。
  - 之后，从单库切换到分库（最好是提前发布好应用、准备好配置），这样切换时只需要几分钟重启生效即可。在切换到分库前，联系DBA在切换期间停止老的单库读写。
  - 最后，分库切换完成后，再通过DTS增量复制老的单库中今天凌晨之后产生的数据。
  - 最后的最后，持续观察一段时间，如果没问题，老的单库就可以下线了。





## 限流方案（待补充）









## 如何基于标识快速定位线上问题

### 场景

1. 根据日志排查问题，需要查看一个请求的所有日志。

   问题：并发量很大，日志刷新频繁，请求日志不连贯，如果日志没有唯一标识，无法分辨特定请求的日志，会影响联调、排查的效率。

2. 想知道一个请求所有与其相关的链路日志。

   需要为其增加唯一标识（UUID/雪花算法）

### 解决方案：基于traceId实现线上问题快速定位

基于以上场景，为每个请求设置一个traceId，整个请求链路公用同一个traceId，然后将日志收集到统一日志平台。

通过日志关键字搜索traceId，找出整个链路请求过程。

（与分布式链路框架skywalking结合，分析链路性能）

### 实现方式

**利用MDC机制**

（Mapped Diagnostic Context）映射诊断环境，是log4j、log4j2、logback提供的一种方便在多线程条件下记录日志的功能。

可以看成是一个与当前线程绑定的ThreadLocal，可以往其中添加键值对。

> **MDC使用方式**
>
> - MDC中设置值：MDC.put(key,value)；
> - MDC取值：MDC.get(key);
> - MDC内容打印到日志：%X{traceId}



### 具体实现（待补充）

https://www.bilibili.com/video/BV1X34y1V7xg?vd_source=12315da4e224c973e2c91f3984969e9e





# 算法



### 常见字符串算法题

#### 替换空格

> **题目**
>
> 请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

##### 遍历字符串所有字符，判断空格后替换

按位置取单个字符的方式是charAt

替换的方式是重新拼

```java
public static String replaceSpace(StringBuffer str) {
    int length = str.length();
    StringBuffer result = new StringBuffer();
    for (int i = 0; i < length; i++) {
        char b = str.charAt(i);
        if (String.valueOf(b).equals(" ")) {
            result.append("%20");
        } else {
            result.append(b);
        }
    }
    return result.toString();

}
```

##### 利用StringAPI的批量替换方法

replaceAll

```java
public static String replaceSpace2(StringBuffer str) {
    return str.toString().replaceAll("\\s", "%20");
}
```



#### 最长公共前缀

> **题目**
>
> 编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""
>
> 示例：
>
> ```
> 输入: ["flower","flow","flight"]
> 输出: "fl"
> ```
>
> ```
> 输入: ["dog","racecar","car"]
> 输出: ""
> 解释: 输入不存在公共前缀。
> ```

##### 思路

使用Arrays.sort(strs)为数组自动排序，利用其特性，然后比较数组第一个与最后一个元素的公共前缀即可。

##### 利用Arrays.sort()

```java
public static String replaceSpace(String[] strs) {
    // 如果检查值不合法及就返回空串:有空字符串，数组为空
    if (!checkStrs(strs)) {
        return "";
    }
    // 数组长度
    int len = strs.length;
    // 用于保存结果
    StringBuilder res = new StringBuilder();
    // 给字符串数组的元素按照升序排序(包含数字的话，数字会排在前面)
    Arrays.sort(strs);
    int m = strs[0].length();
    int n = strs[len - 1].length();
    //	取较短的那个长度
    int num = Math.min(m, n);
    for (int i = 0; i < num; i++) {
        if (strs[0].charAt(i) == strs[len - 1].charAt(i)) {
            res.append(strs[0].charAt(i));
        } else
            break;

    }
    return res.toString();

}

private static boolean chechStrs(String[] strs) {
    boolean flag = false;
    if (strs != null) {
        // 遍历strs检查元素值
        for (int i = 0; i < strs.length; i++) {
            if (strs[i] != null && strs[i].length() != 0) {
                flag = true;
            } else {
                flag = false;
                break;
            }
        }
    }
    return flag;
}
```



#### 最长回文串

> **题目**
>
> 给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。
>
> 在构造过程中，请注意区分大小写。比如`"Aa"`不能当做一个回文字符串。注 意:假设字符串的长度不会超过 1010。
>
> “回文串”是一个正读和反读都一样的字符串，比如“level”或者“noon”等等就是回文串。
>
> 示例：
>
> ```
> 输入:
> "abccccdd"
> 
> 输出:
> 7
> 
> 解释:
> 我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
> ```

##### 思路

回文串出现的情况：

1. 字符出现次数为偶数次
2. 字符出现次数为偶数次+中间一个任意字符

注意这里的题目条件，不是在字符中找回文串，而是用字符串中的字符任意顺序构造即可。

所以只要统计偶数出现的字符对数，如果多出一个字符就长度+1。

##### 解法

判断偶数次出现的元素可以直接借用hashSet的去重功能

```java
class Solution {
  public  int longestPalindrome(String s) {
    if (s.length() == 0)
      return 0;
    // 用于存放字符
    HashSet<Character> hashset = new HashSet<Character>();
    char[] chars = s.toCharArray();
    int count = 0;
    for (int i = 0; i < chars.length; i++) {
      if (!hashset.contains(chars[i])) {// 如果hashset没有该字符就保存进去
        hashset.add(chars[i]);
      } else {// 如果有,就让count++（说明找到了一个成对的字符），然后把该字符移除
        hashset.remove(chars[i]);
        count++;
      }
    }
    return hashset.isEmpty() ? count * 2 : count * 2 + 1;
  }
}
```



#### 验证回文串

> **题目**
>
> 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。 说明：本题中，我们将空字符串定义为有效的回文串。
>
> 示例：
>
> ```
> 输入: "A man, a plan, a canal: Panama"
> 输出: true
> 输入: "race a car"
> 输出: false
> ```

##### 解法

分别从头和尾遍历，相等则继续比较下一位，直到到达中间位置，

中间位置有两种情况：偶数位/奇数位

```java
public static boolean isPalindrome(String s) {
    if (s.length() == 0)
        return true;
    int l = 0, r = s.length() - 1;
    while (l < r) {
        char prefix = s.charAt(l);
        char suffix = s.charAt(r);
        //  不是数字字符则不算回文
        if(!Character.isLetterOrDigit(prefix) || !Character.isLetterOrDigit(suffix)){
            return false;
        }
        if(Character.toLowerCase(prefix) == Character.toLowerCase(suffix)){
            l++;
            r--;
        }else{
            return false;
        }
    }
    return true;
}
```



#### 最长回文子串

> **题目**
>
> 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为1000。
>
> 示例：
>
> ```
> 输入: "babad"
> 输出: "bab"
> 注意: "aba"也是一个有效答案。
> 输入: "cbbd"
> 输出: "bb"
> ```

##### 思路

遍历字符串的每个元素，以这个元素为中心分别计算回文的最大长度，包括偶数回文与奇数回文，然后返回最长的一个。

##### 代码

```java
public static String longestPalindrome(String s) {
    String longStr = "";
    if (s.length() < 2)
        return s;
    for (int i = 0; i < s.length() - 1; i++) {
        //	找最长的偶数回文
        longStr = PalindromeHelper(s, i, longStr);
    }
    return longStr;
}

public static String PalindromeHelper(String originStr, int index, String nowStr) {
    int i = index, j = index;
    //	找最长的奇数回文
    while (i >= 0 && j <= originStr.length() - 1 && originStr.charAt(i) == originStr.charAt(j)) {
        i--;
        j++;
    }
    if (j - i - 1 > nowStr.length()) {
        nowStr = originStr.substring(i + 1, j);
    }
    //	最长偶数回文
    int m = index, n = index + 1;
    while (m >= 0 && n <= originStr.length() - 1 && originStr.charAt(m) == originStr.charAt(n)) {
        m--;
        n++;
    }
    if (n - 1 > m + 1) {
        if (n - m - 1 > nowStr.length()) {
            nowStr = originStr.substring(m + 1, n);
        }
    }
    return nowStr;
}
```



### 求二叉树中两个节点间的最大距离（待补充）



### 三色球排序（待补充）





# 个人面试复盘



## 数字马力一面

应聘1-3年经验后端开发工程师

### 流程

1. 寒暄，开始自我介绍，包括了个人经验、技术栈、从事过的工作；
2. 介绍简历的项目，从业务到技术栈；
3. 面试官针对介绍的项目的技术点进行提问



### 个人介绍技术点

1. 数据库介绍了几张主要的表，表述了自己做了维护与优化，但没有具体说明如何优化；
2. 提到了小程序活动存在大量分享与报名，引出高并发的处理，页面加载使用了本地缓存与redis缓存；
3. redis分布式锁的使用，用于阻止重复提交，解决前端连点，导致数据重复添加的问题，在一段时间内对客户标识进行缓存判定；
4. 活动的付费报名的支付结果获取使用消息队列，用户的支付接口不会直接返回支付结果，异步进行支付，通过另外的接口返回支付结果；
5. 系统进行了负载均衡，一个是网关的ribbon负载均衡，一个是nginx代理暴漏的负载均衡；

随后被面试官打断，开始对技术点进行深入讨论。



### 面试官的问题

面试官标识信息比较多，先从这一个项目开始

1. 模块包括活动、商品、目标、数据报表等，其中数据报表提供给谁使用？

   答：提供给门店，给老板查看整个门店的数据，一个表格的形式。

2. 你介绍的模块时只有两个模块是你做的吗？

   答：不是，整个营销插件都是我做的，我负责的。

3. 先从缓存说起，并发量有多少？比如活动的时候

   答：活动的话，促销/开业的时候爆发，单日单门店的报名量有几千左右，不算特别多，主要是做的预备。

4. 这样的话，我们看技术选型肯定是服务于业务的，一天报名几千的话，一秒中的报名量应该不会特别大

   答：（打断）就是实际中没有这么大，做了这样的处理在本地进行了模拟，没有带来太大的负担。

5. 你使用了本地缓存，这样的话有一个问题，我们假设一个场景，有百万的请求量，同一个客户的缓存会有失效的机制，机制是怎么样的？

   答：是定时缓存，您的意思是指出现缓存击穿/雪崩的情况吗？

6. 不是，就很正常的情况，我有1000完的用户的请求打到你的机子上，那你的地址都会缓存到内存上吗？

   答：可以做一个缓存的上限，本地缓存在达到上限后，使用redis进行缓存；另外做一个监控（不明）；

7. 所以为什么最开始选择的是本地缓存？还有一个就是你的客户请求是随机路由到所有的服务器上的是吗？

   答：是的，目前是随机路由的。

8. 既然是随机的，那为什么不**做相关的策略，让同一个客户访问到同一台服务器上呢**？

   答：您的意思是随机的话可能会让同一个用户的数据缓存到多台服务器上，会比较浪费空间吗？

9. 是的，比如说就你们的项目\****布了几台？

   答：布了4台机器。

10. 既然这样，一个是有没有这个必要性，说实话一天报名量几千，四台服务器有没有必要；另一个是我这个缓存有没有必要做的这么重？我的同一个客户可以缓存到，就是说第一个集中缓存到redis中，那么本地缓存就没必要做了；另一个是你做了本地缓存，但是服务器策略没有保证同一个用户访问同一台服务器，那这个缓存整体的命中率...

    答：您的意思是说我在做进一步的优化的话，我需要通过策略让同一个客户在同一时间内访问同一台机器，...（提高缓存命中率），是这个意思吗？

11. 是这个意思，也是一个方面，你这个数据可能本来只需要存一份，因为你上游不清楚是nginx还是什么东西，它的路由策略的原因，导致你每台机器都存了一份，这样完全就是浪费的，为什么不直接采用redis；

    第二个就是假设你做了本地缓存以后，有一些**超时的机制**，**LRU的一些机制**，你有没有了解过最常使用的数据淘汰掉（淘汰机制），淘汰机制的前提也是前提是缓存的命中率比较高，通过什么样的策略，让用户的请求分发到同一个机器上。

    如果服务器是单吊的话另外说，因为他会分发到另外一台服务器上，这是另外一个问题了。

    那你们在做这个方案的时候，是怎么样做技术上的选型的？是拿到这样的问题，我觉得可能有这个问题，所以我就设计了一个方案，是怎么样的逻辑？

    答：本地缓存是我个人的想法去做的，在您的说法之上，确实存在这样的情况（问题）；

    我个人是无法做到控制请求路由到哪一台服务器上，让这个缓存的命中率提高，是需要继续进行研究的。

12. 那负载均衡，你下面有说到，用的是网关ribbon，那么**常用的网关负载均衡算法**你可能接触到有哪几类呢？

    答：我大概了解到有几种配置的策略，没有具体研究，有一个所谓的...（无意义的回答），主要是配置的，没有研究太深。

13. 一个是随机的，...，还有一个是轮询的，...，还有一个根据你请求中的某个key，或者整个请求，md5也好，什么也好的值去做hash，去做对应的。你做了hash，其实你可以用用户的id去做hash，hash后基本上是能够定位到同一台机器的。

    答：我明白您的意思了，我通过一个标识，进行hash让他分配到同一台机器上，提高缓存命中率，确实是这样。

14. **hash**你有了解吗？

    答：我了解一部分，个人是按照取余的方式去理解的。

15. 取余的方式，那比如说我现在有一个请求过来，hash后，就取余好了，我过来是9，9过来比如说你后台机器有4台，取余是1，我可能就打到第一台机器上，...，比如说这种情况下，我加了一台机器，是第五台，这个时候前面所有的，就解决最开始的问题，即用户请求同一台机器的问题，这个时候我一个5的而请求过来，之前hash是1，现在是0，那他一开始缓存的数据在第一台机器上，就这种问题有没有接触过，学习过？

    答：这个问题您的意思就是重新hash后顺序完全就乱掉了，...，一段时间内缓存命中不了。（对）

    这个情景确实是考虑过，如果是让我临时去想解决方案，我想的会是说让他一段时间内走redis缓存，再去慢慢填充本地缓存，从我个人角度就是不能让他服务直接挂掉...。

16. **一致性哈希**算法有没有了解过？

    答：没有了解过。

17. 第二个是关于分布式锁的问题，有必要做的这么重吗？因为redis这个，先说redis吧，如果你的**redis挂了**呢？

    答：挂了的话，相当于是...（请求不通，大概意思）要给redis做集群，不能让它挂了。

18. （笑）集群的话我至少要两台机器，我看你主要解决的是用户连点重复的问题， 你们之前有没有做过方案对比，有没有更合适的方式，因为感觉没有必要，前端一次两次很快的点击导致你后端的处理重复的请求。你分布式锁，**根据什么锁**呢？

    答：几种情况吧，根据客户端（PC/小程序/app）；根据用户标识；根据ip地址。

19. 我想问的点是，比如你前端的请求很有可能是查询，写入，写入两个接口，我不知道有没有这种情况啊，就是比如前端两个请求接口，同时调用，同一个用户，同一个客户端，这种情况你怎么**区分**处理？不是用户连点的情况

    答：有一个解决方案，用户做请求之前，通过另外一个接口生成一个标识，在请求时带上这个标识，来区分是一个用户的两次不同请求还是连点的同一请求。

20. 所以它这个**标识的逻辑**是什么样的，它是通过什么东西去判定这个标识？它的业务要素是什么，还是说是整个请求体

    答：它的业务要素，举个例子，就是活动付费报名，有两种拍照的档次，他去点击按钮的时候生成一个标识，含义就是这个客户、购买的商品、门店等，在前端进入对应页面点击时就会生成这样一个标识。在请求支付的时候，带上这个标识，重复点击标识是一样的，而不同请求标识是不一样的。

21. 还有个问题就是连点是后端处理的，前端为什么不做？

    答：前端也做了，是发生问题后后端先处理的，再让前端做处理，考虑到攻击的问题，即使是前端限制了，请求照样是有人可以做动作。

22. 你说到攻击的问题，那请求的协议是什么样的，http还是https还是自己定义的rpc接口？

    答：正常的接口，支持https与http。

23. 你们现在用的redis是单机的对吧，有挂掉过吗？

    答：现在redis是单机的。之前有挂掉过一次，老业务定时任务写入定时消化，结果后来废弃导致没有消化，导致数据大量堆积，进行了一次重启，直接将redis数据清空。

24. 你这边redis主要是用的redis的分布式锁对吧，有没有**其他场景**？

    答：有的，一个是最常见的，用户授权登录存储的信息，用token换取用户信息，（解释清空数据没有影响的原因）redis查不到数据会触发重新登录。

25. 你这个token有有效期吗？

    答：有一部分有有效期，有一部分没有。PC端的有，微信端的将数据写在jwt内，没有设有效期。

26. 为什么不设置有效期？

    答：目前没有，有要加的计划，通过jwt本身就设置有效期。

27. 然后PC端的有效期，比如说2小时，你们设置的是多少？

    答：3天，刷新的话3天内掉，不刷新的话12小时。

28. 怎么拿到token的？

    答：输入用户名密码，通过另一个服务生成的。

29. 你有没有看过微信、支付宝或者其他的大厂，他们开发的token的机制你有了解过吗？（问：比如Oauth2线管的吗）不是，不过你可以说一下你对这方面的了解

    答：没有，有一些疑问，这种机制存在漏洞，但目前还没有去做了解。

30. 那我们先停一下，第三个就是有用到**消息队列**，是在用户提交支付的时候吗？

    答：消息队列的使用有几种情况，一个是报名，报名与录入客资两个服务，从原来的同步调用改为异步调用，...；另一个是超时订单的处理，第三方支付有定期回调，同时本地定时查询接口确认订单支付状态，做过期处理。后者使用的是redis实现消息队列，...（实现方式）。

31. 你说的第二个场景，你说用redis的sorted set，你要定时写任务吗？

    答：不是，是一次性写入，定时取出，查结果。

32. 你的查询就是查支付的订单号，你用的第三方，他既然后回调，你为什么还要定时查呢？

    答：回调本身有，但本身有不可靠性，所以本身也要做定时检查的。如果定时查到已处理，就不会再进行处理。

33. 那你为什么要加redis呢？目的是什么？为什么不直接在mysql直接干掉，你本身就存了一条记录，第一个是本身架构就搞复杂了，第二个是redis的不可靠性，你这还是个单机的redis，为什么不直接用mysql，mysql就能解决的为什么要多搞一个redis呢？

    答：我没必要每次都检查所有订单啊，如果用mysql的话，我需要定时查所有订单的。

34. 你们的订单有状态集的，订单在发起之后，回调后，你这个状态机没有设计吗？

    答：有设计的，您的意思是我通过一次查询就可以省掉redis吗？

35. 是的，比如说订单的用户提交，正常来说有一个订单先落下来，用户还没有发起支付，用户发起支付后从待支付到付了钱，你再去调第三方的渠道，你库里的状态应该是已支付待确认的大概这样的状态，等到第三方回调结果后你再把状态改为已支付怎么怎么样，有这样一个状态集流转。

    如果说这个时候我已经发起支付，但对方还没有回调，我的定时任务可能会去捞这些状态，捞那些还没有确认的订单的状态，或者是...

    答：（打断）是一个定时查询塞到redis，另外一个是定时取的。

36. （笑）所以说目的是什么呢？没懂这个目的，有没有这个必要性，或者说你这个捞任务的时候，你们正常处理sql任务的时候，会把这个任务加锁吗？

    答：（当时没听懂）没有加锁。

37. 对啊，所以说代码实现上会有问题，正常比如说我根据这个东西查到一条数据后，通过select by id for update（行级锁），锁定了这条记录，后面我的所有逻辑都在这一个事务里干完，确保我干的事情不会因为其他并发的原因导致其他额外的事情。

    比如说供应商回调进来后，我先select by id 发现这条记录，那我可能直接就放弃了，可能有其他的事情。然后我select出来以后，状态符合要求，然后再select for update，这时候我就把这条记录锁定了，锁定后我再做二次判断，二次判断后可能就是我正常的业务处理逻辑，处理完了之后再把事务提交。

    因为我在进入事务的时候，我又做了一次判断，所以它的状态肯定是符合我的处理逻辑的，我再去把我的业务逻辑执行完，那后面另外的线程它去执行的时候，它也先select for update，只有在获得了这条记录的所有权以后，他才能去执行它后面的业务逻辑。

    因为我已经知道我要对这条记录更新了，是select for update，整个事务里已经干完了，那为什么还要redis？这个redis在里面会很莫名其妙。当然这个涉及到你对数据库的整个事务处理要比较熟悉的，避免因为...我也不知道你们在没有锁的情况下是怎样处理并发的呢？

    比如说这个任务我从mysql里捞出来，我扔到redis里，这是一个定时任务；然后我再去有一个定时任务去从redis里把任务捞出来，再去查，如果说三方取到过来了，那你会怎么样呢？你会把支付状态改为已完成？那后面会不会有一些对应的业务逻辑，比如说业务通知，或者供应商那边说支付失败，那是不是你这边还得有退款的流程，这是这个点。

    如果你这个供应商已经回调你了，第二个是你去查的时候，因为供应商回调你的时候，你还没有返回结果给供应商，你又去查了，那供应商那边收到的信息是可能回调还没有成功，那他的状态可能还没有处理完，给你的状态可能是支付失败，因为支付失败可能是它在你没给它回调结果的情况下返回，这个流程可能又会有...我不知道你的逻辑是怎么样，会不会是支付失败，导致又发起一次退款流程，不知道你们在没有锁的情况下，如何去保障并发性的。

    答：一个是没有退款流程，它目前是只有未支付，支付中，支付成功，支付失败的状态，我只需要查支付中的数据，如果是在支付中是不做处理的；支付成功做支付成功的处理，支付失败做一个报名失败的处理；

    您说的支付失败是否需要给他退钱，不在我这边业务处理中。

38. 但是问题是一样的，没有锁的情况下，怎样去保障你的数据库的数据，不管你是成功还是失败后续的处理逻辑，肯定是要确保它只执行一次，不然可能会执行多次。现在你可能后面没有什么业务逻辑，只是把它置为成功。

    答：您的意思是我的回调与定时可能出现并发的情况是吗？（实际上不太一样，大概意思应该是定时先行处理业务逻辑导致没有给第三方正确的回调，进而重复处理失败...）

    这个东西如果让我现在来说的话，我可能会想到加一个锁，可能会更累赘了。

39. 所以说在技术选型的时候，有些时候并不是好像很多东西用上去了，是为了用这些东西而用。比如说这些redis或者怎么样的，有时候redis用的太泛滥了，我们可能面的redis面的有点多了，就是必要性在哪里，肯定是要想清楚在这个地方要用缓存，我才去用redis，redis用的时候在它挂了之后对业务又怎么样的影响，怎么样备份恢复的，真正再去用的时候要考虑到，如果说你的场景根本就没有必要用，那对整个部署的架构就是一种负担。

    我再问一下，你这个可能是个saas化服务，现在服务多少门店？机器是多少，整个系统，包含服务器包含你的redis，包含你其他的中间件到底用了多少？

    答：门店大概2000多家，...有个10台左右。

40. 10台左右？那也还好，2000的商户，一年大概会存多少数据，每个月多少？

    答：每个月就是几十万条数据。

41. 还有就是我刚刚问你消息队列，其实没问，前面那个用的是消息队列是吧？

    答：是的，当时就是说因为没那么中，所以说减少特别多的引入，所以引入redis。

42. 那么实际上用的话没有用的吧？

    答：消息队列用了，只是说是初步引入，异步报名的情况，就是说报名的时候没有直接返回报名成功失败，需要调用另一个微服务，...（大概意思就是crm走消息队列）

43. 所以回到最开始的问题，通过mysql也能解决啊？或者说你觉得在这种场景下用mysql还是用异步 的消息队列？因为消息队列我们比较常见的使用场景，我有个支付成功了，要把这个消息发出去，是为了有一些营销活动消息给发一些券。有一些确实是在高并发的场景下，我支付成功的记账操作，不好意思不能在你的支付过程中影响使用，后面了，这样的情况可能消息队列用的多一些。你的可能也适用

    回到业务本身上，你2000门店一天报名量有多少，回到你本身来说，每天报名量有几百万吗？（没有）即使有几百万，在当前的mysql的性能情况下，我后面1秒查一次，我理解应该也能解决你的这些用户报名的问题。

    答：（插嘴）千万级以下，mysql都能解决的。

44. 当然，你也可以说我就想用kafka，对你们消息队列用的哪种？做个调研，为什么选？

    答：rabbitmq，因为它比较小，没有那么大规模，轻量级。

45. 本身你们也有意识到这个东西是个轻量级的解决的事情，mysql本身解决也就一个状态位嘛，而且关键是它还稳定，事务还好控制，那我问你们消息队列用的时候，肯定有几个场景，第一个就是会不会**重复消费**，**做幂等**，怎么**确保消息不会丢**，**发消息确保发消息的过程与事务是一致的**，那你们用的这个消息队列支持什么事务吗？

    我不知道这些事情你们有没有去考虑过，因为真实的话，你们一个两个用户，或者从来没出现过也有可能。如果说在大量的场景下，所有的包括mysql，消息队列都是不可靠的，有可能我数据库写成功了，消息队列根本就没有发成功，这个东西本身就需要事务去控制的，那要不然怎么去控制的，保证你的数据是一致的。

    答：确实每引入新的东西，它的可靠性对系统造成一定影响，都要去做处理。

46. 这个东西肯定是要有的，正常来说你这么一个小的系统的情况下，很多情况下一个redis，一个mysql就能解决所有问题，redis可能都不需要。

    答：（插嘴）redis还是需要的，（举例是sql查询慢，做了缓存）

47. 那你慢是什么原因呢？是因为mysql的原因吗？

    答：因为联表，百万级别的数据表导致的问题。

48. 那为什么要联表呢，我能不能先查一张表，再去查另外一张表，两次查询都走索引，百万级别对于mysql都不是事啊？

    答：是的，所以说要做优化

49. 所以说很多情况下不是mysql 的问题，有可能就是因为一些烂sql，你的领域模型设计的ok的话，先去查一张表，再去查另一张表，再把数据拉下来嘛。总不可能是这两张表的联表的条件查询，分页查询嘛。分页结果用redis缓存也不是事啊

    答：是的。

50. 所以说回归到技术本身嘛，要基于本身的应用场景去做技术方案。因为本身看到你这个系统好像redis，mysql，异步好像都上了，尽量还是说稳定可能是更重要的，在稳定的前提下，当然你在设计的时候可能预留些东西，比如这个东西在未来三年门店的数据量，如果要上亿，那我可能先做一些预留没有任何问题，但是一上来就这么搞，这个我不做评论，有可能是合理的，比如我就是朝着这个目标去的，成本也还好，从另外方面考虑的，但是确实有些场景我觉得是不适合用这些东西的。这个咱今天也不直接面试，也做一个好好思考思考吧。

    答：对，肯定不能说去为了用技术而用技术。



因为时间问题，没有再问后续的项目。

面试官让我问的问题：应聘的岗位对能力的要求如何？

面试官：作为tl（team leader，组长），第一个岗位本身服务的量级，高并发还好，主要涉及设备的数据上报，每秒也就六七千/万条，所以高并发在我看来没什么问题。即使没有高并发我们在所有程序的编码上都会考虑这个东西，如果同时来请求，不能因为每秒有了一亿个请求再考虑高并发，而是说我在执行这个程序的过程中“恰巧”来了另外的请求，并不一定要是一个亿的，我们在所有的代码中肯定有一些良好的编码习惯，我在做这些操作的时候，我一定要哪些资源，我要把这些资源锁定了，然后再去判断资源的合理性，锁定了以后再判断，因为这个时候我已经独占了资源，判断完后再去处理业务，处理完再去做事务提交。

不管后面业务上来了，没有关系，因为我所有的代码都是基于我这个编程习惯做了，如果说后面业务量上来了再去做压测，通过压测来去（？）来坎哪些地方有瓶颈去做优化，来去解决高并发的问题。

第二个我理解高并发不是我们的问题，一秒钟几万几十万撑死了都不是问题，第二个挑战主要是，高并发可能很多地方都是挑战，但对于我们来说没那么大挑战，因为我们很多都有现成解决方案，做过太多这种东西，有套路了，不算太难，又解法的情况下依葫芦画瓢。...

更大的挑战可能是第一个是做到行业领先，...（大概意思就是模型设计，领域模型抽象，系统架构ok）让业务太大变化不会对系统造成太大挑战。第二个是说我能给业务带来价值，能够通过底层数据，智能化手段，帮助客户摆脱人工，比如...（**的场景，比如监控）



### 表述问题总结

1. 口头禅太多太频繁，包括“然后”、“这个”、“行行行”、“好的”、“就是这样”等；
2. 用了很多非精确表述，如“大概”、“一定”等，给人的感觉是在编造；
3. 对于项目的描述，即使是在准备后依然是重点描述不清；
4. 经常打断面试官的发言，却没有实质性的内容，主要是狡辩；



### 技术内容总结（待补充）

1. 当前项目于技术的结合并不是最优解，存在很多没有必要的应用，包括redis的使用，消息队列的使用，面试官认为都可以用mysql解决。

2. 本地缓存的命中率问题：

   场景：大量用户访问，服务有多台的情况下，单个用户缓存不变，但因为路由的原因导致多台服务器缓存

   解决方案：利用负载均衡，目前是随机，可以使用一致性哈希配置策略，从request中取用户的标识进行服务器的分配。

3. 缓存的超时机制，LRU的了解

   LRU：缓存的淘汰算法

4. 常用的网关负载均衡算法

   - 随机
   - 轮询
   - 最小连接（分配最近连接数最少的服务器）
   - 一致性哈希（根据标识分配机器）

5. 什么是哈希/hash

   即散列，把任意长度的输入通过散列算法转换为固定长度的输出，即为散列值

6. 分布式锁如果redis挂了如何处理，分布式锁的应用场景：

   - 备份恢复
   - 上同步锁
   - 

7. 后端的重复提交处理：

   - 针对表单，服务端生成唯一标识存入session并返回前端，前端携带标识，与session内容比较，相等则说明第一次提交，然后移除标识，否则不再处理。
   - mysql唯一标识，乐观锁处理
   - 悲观锁  select for update
   - 乐观锁，判断版本号
   - 分布式redis锁setIfAbsent
   - 状态机，从1-n的状态值有规律，如按照业务节点从小到大，更新数据时，加上where状态，如果状态已经被更改，则不会被更新，即修改了0行。

8. 远程调用使用的请求协议：RPC，https，http

   RPC：远程调用协议，如feign，zookeeper

9. RPC与http区别：

   - RPC可以基于http实现，rpc是一种API
   - RPC效率较高
   - ....

10. 大厂的token机制

11. token有效期

12. 行级锁  for update

13. 消息队列的问题：

    - 消息的重复消费/幂等
    - 消息的丢失
    - 消息的事务

14. 还有一个就是使用的技术与业务场景的关联度，包括数据量等





## 大河网



### 电话面试问题及复盘

1. Spring与SpringBoot的区别介绍

   个人回答：springboot在spring基础上有自动配置，约定大于配置，提高开发效率

   答案：springboot特征

   - 嵌入式tomcat等容器，无需部署war
   - starters简化配置
   - 自动配置

   

2. 自动装配如何实现

   个人回答：启动注解SpringBootApplication中包含EnableAutoConfiguration，启动扫描配置类，注入配置参数

   答案：@EnableAutoConfiguration

   https://juejin.cn/post/6974721906348359693

   引入了@Import注解，导入需要自动配置的组件，导入了AutoConfigurationImportSelector类

   找到配置类的加载位置，读取配置类加载bean

   

3. springboot在IOC具体哪一步对spring进行的增强？

   个人回答：不了解，简单描述了IOC

   

4. 简单介绍知道的IOC常见类，比如BeanFactory

   个人回答：答不上来

   答案：

   - BeanFactory顶级接口，包含管理Bean的各种方法，延迟加载
   - ApplicationContext接口，提供进一步的功能，启动时一次性创建

   

5. IOC为什么用三级缓存，为什么二级缓存不能满足

   个人回答：不是很了解，提出了一个缓存解决循环依赖的问题，但没有解释清楚

   答案：**为什么定三级缓存/二级缓存能解决问题为什么用三级**

   - Bean没有循环依赖时，三级缓存没有意义

   - 有循环依赖，Bean没有AOP代理时，会返回原对象，此时三级缓存也没有意义

   - 当Bean存在循环依赖，且有AOP代理时，三级缓存才有效果

     三级缓存用于预防Bean有依赖时，还可以进行代理增强。

   - 本身spring设计bean的代理增强是在bean初始化完后XXX后置处理器完成的

   - 三级缓存采用递归的方式，逐步实例化对象，将上一步的加入缓存的半成品对象作为属性注入

   **三级缓存不能解决的循环依赖问题**

   1. 多例bean无法在启动时加载，无法适用三级缓存，如果有单例bean与多例bean循环依赖，单例无法注入
   2. 构造器注入依赖，构造器依赖于注入的bean，bean需要构造器实例化，故无法实例化，无法使用缓存而出现循环依赖错误。--通过@Lazy懒加载
   3. 单例注入代理对象，代理对象与原对象不同，spring会比较对象与二级缓存的对象，报错
   4. @DependsOn报错

   **2.6默认禁用循环依赖解决方案**

   1. 修改配置，改为启用
   2. 通过方法返回成员变量，替代注入

   

6. 一二级缓存可以满足，三级缓存涉及到别的，比如反射

   答案：

   

7. 关于AOP，两种实现方式？

   个人回答：基于类的动态代理和基于接口的动态代理

   答案：

   - 实现方式：基于路径切入/基于注解切入，即根据什么条件切入
   - 底层实现：JDK动态代理和CGLIB动态代理
   - jdk动态代理：要求被代理的类实现接口
   - CGLIB动态代理：被代理类没有final修饰
   - 如何选择：如果类实现了接口，优先使用JDK动态代理；否则CGLIB动态代理

   

8. rabbitMQ，公司用的是rocketMQ，如何选型？对比过吗？

   个人回答：轻量，初步引用，两条队列，短时间没有扩展。

   答案：不同消息队列的特点及比较

   

   

9. 消息事务，延迟消息，同步消费，消息挤压有没有发生过？

   个人回答：引出场景，报名的异步业务处理，重复消息，用业务处理，另外补充技术处理方式是回调，保证消息的稳定性。

   答案：

   

10. 你说了发送不成功会重复发送，是业务判断的吗？使用异常捕获的话，如果再次发送失败呢？

    个人回答：有重试次数，失败了存数据库，后续处理。

11. 重试次数是队列配置，还是代码实现？

    个人回答：代码实现的。

    

12. 写过项目文档，写过哪些项目文档？

    个人回答：功能文档，数据库设计，接口文档，业务功能，业务流程。

13. 我以为你说的是产品经理的需求分析哪些呢

    个人回答：那个是产品文档，产品经理负责，个人阅读过。

14. 秒杀场景，用户标识由前端传递，判断是否购买过产品，用的是接口标识，比如我买了一次没有支付，又买了第二次，能买吗？

    个人回答：能，没有支付结果，允许重复请求

15. 两单同时支付，怎么判断冲突？

    个人回答：一个分布式锁，每次购买生成订单号，存储在分布式锁，一段时间内每个用户只能有一个订单号进入支付流程。

    一段时间内的同一用户重复请求返回相同结果。

    

16. 分布式锁加在哪里？加在哪一步？

    个人回答：业务逻辑里，生成订单信息后，传给前端之前。回调的时候/定时检查订单的时候，做判断。

    

17. 整个秒杀里加了几个锁？

    个人回答：生成订单一个，防重复提交一个，业务流程一个锁。

    

18. 秒杀不设置数量吗？超卖怎么处理？

    个人回答：库存预警，将库存存在缓存里进行处理。

    

19. 如果没到库存预警就超卖了怎么办？

    个人回答：加锁（没说清楚），描述实际场景，可以修改库存不影响售卖。

20. 分布式锁，实现思路，加锁解锁，一般会遇到的问题，比如业务没处理完就超时解锁，此时解掉了其他线程的锁？没有主动解锁操作吗？

    个人回答：一个是数据库上锁，避免数据被同步修改；

    

21. 你们的分布式锁是只有超时解锁的话，提前结束的业务也需要等待锁释放吗？

    个人回答：需要主动释放锁，目前没有。

    答案：如果业务提前结束，手动释放锁，如果业务超时，可以进行锁的**续约**。

    

22. 可以解锁的话有什么问题要注意？

    个人回答：业务逻辑有没有执行完（胡言乱语）

    

23. 那解锁的操作肯定是业务逻辑执行完啊？这里说的是解锁解的可能不是本线程的锁

    个人回答：保证只能解本线程的锁，比如机器码，用户标识，请求hashcode

    答案：锁的键是订单号，值可以设为标识，在解锁时进行判断是不是自己的锁。

    (如何续锁？定时守护线程)

    

24. CDN你们用的是自己实现的还是第三方的？

    个人回答：（跳过理解问题）第三方的，百度的，加速网站

25. 补充，CDN才买的，第三方缓存加固，加到基站节点，动态刷新，云北苑

26. 登录授权使用的安全框架还是自己实现？

    个人回答：以前是springsecurity，后为自己实现，***

27. 讲一下nginx和ribbon配置的负载均衡

    个人回答：配置负载均衡，用于服务器更新。策略上目前是默认轮询，后续要加一致性哈希匹配。

28. 为什么用随机，轮询用的比较多吧？

    个人回答：默认策略（实际上是记错了）

29. mysql的读写分离如何实现？

    个人回答：mycat建了个服务，根据操作自动选择读写服务器。

    

30. **读写延迟**如何处理？比如数据还没有同步的时候，没查到数据

    个人回答：不影响，没有处理，后续方案是两个数据源配置，根据业务选择数据库，或者分服务选择数据库。

    答案：

    - 写之后设置一点延时再读
    - 通过注解指定部分sql走主库
    - 分离读写业务

    

31. **sql优化**场景？

    个人回答：场景，业务优化，单表查询，联合索引，字段优化，搜索条件优化。

    答案：

    

32. maven处理jar包冲突？如何排查？

    个人回答：maven helper



个人问题：岗位需求？

回答：3年工作经验，认为应该可以作为项目的主程序员，出现问题要能排查，这些问题可能不常遇到但排查的时候有用，看思路，问题在哪里。看你不是本专业，平常对相关的框架底层有没有自己的认知和了解，如果只是为了xx入行，简单crud，时间也不会很久，希望你有可持续发展的能力。

看个人的学习能力与之后的职业规划，不能干个一年就...看你对职业的想法与喜好程度。



公司介绍：

新闻公司，做内容管理。主要还有es，检索分析是大的业务。

还接政务类的项目，主要是人大类，志愿河南，省门户（河南省统一政府平台），河南省官网，省直部门官网，以及市级官网（信阳、安阳）运维。技术内容运维都有。








