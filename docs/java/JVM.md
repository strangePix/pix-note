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
> public static void main(String[] args) {
>   System.out.println("*********启动类加载器************");
>   // 获取BootstrapClassLoader 能够加载的API的路径
>   URL[] urls = sun.misc.Launcher.getBootstrapClassPath().getURLs();
>   for (URL url : urls) {
>       System.out.println(url.toExternalForm());
>   }
> 
>   // 从上面路径中，随意选择一个类，来看看他的类加载器是什么：得到的是null，说明是  根加载器
>   ClassLoader classLoader = Provider.class.getClassLoader();
> }
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
>  当垃圾回收器准备回收一个对象时，如果发现它还有虚引用，就会在回收对象的内存之前，把这个虚引用加入到与之关联的引用队列中。
>
>  程序可以通过判断引用队列中是否已经加入了虚引用，来了解被引用的对象是否将要被垃圾回收。程序如果发现某个虚引用已经被加入到引用队列，那么就可以在所引用的对象的内存被回收之前采取必要的行动。



### 垃圾收集算法

#### 标记-清除算法



#### 标记-复制算法



#### 标记-整理算法



#### 分代收集算法

