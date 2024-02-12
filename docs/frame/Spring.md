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



## Spring Data Elasticsearch

Spring Data Elasticsearch是Spring提供的一种以Spring Data风格来操作数据存储的方式，它可以避免编写大量的样板代码。

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
> - hasAnyRole          |   如果有参数，参数表示角色，则其中任何一个角色可以访问
> - hasAuthority        |   如果有参数，参数表示权限，则其权限可以访问
> - hasIpAddress        |   如果有参数，参数表示IP地址，如果用户IP和参数匹配，则可以访问
> - hasRole             |   如果有参数，参数表示角色，则其角色可以访问
> - permitAll           |   用户可以任意访问
> - rememberMe          |   允许通过remember-me登录的用户访问
> - authenticated       |   用户登录后可访问

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












