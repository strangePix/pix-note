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







# 相关原理解析



## 各种Filter

（当前boot版本2.7.14，cloud版本：2021.0.8）

处理网关路由时遇到了一些麻烦，收集资料整理的内容。

### GlobalFilter

全局级别过滤器，不需要配置路由，系统初始化作用到所有路由上。

```java
/**
 * Contract for interception-style, chained processing of gateway requests that may be
 * used to implement cross-cutting, application-agnostic requirements such as security,
 * timeouts, and others.
 *
 * Only applies to matched gateway routes.
 *
 * Copied from framework WebFilter
 *
 * @author Rossen Stoyanchev
 * @since 5.0
 */
public interface GlobalFilter {

	/**
	 * Process the Web request and (optionally) delegate to the next {@code GatewayFilter}
	 * through the given {@link GatewayFilterChain}.
	 * @param exchange the current server exchange
	 * @param chain provides a way to delegate to the next filter
	 * @return {@code Mono<Void>} to indicate when request processing is complete
	 */
	Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain);

}
```

#### 部分实现类

- **ReactiveLoadBalancerClientFilter**  

  org.springframework.cloud.gateway.filter.ReactiveLoadBalancerClientFilter

  整合Ribbon用的

- **GatewayMetricsFilter**  

  org.springframework.cloud.gateway.filter.GatewayMetricsFilter

  用于监控请求，需要启用Gateway Metrics添加 spring-boot-starter-actuator 依赖

#### 一般使用方法

1. 实现 GlobalFilter接口 和 org.springframework.core.Ordered接口

   前者实现过滤逻辑，后者控制filter的优先级，值越小优先级越高

   ```java
   @Slf4j
   public class TestFilter implements GlobalFilter, Ordered {
   
       @Override
       public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
           log.info("TestFilter前置逻辑");
           return chain.filter(exchange).then(Mono.fromRunnable(() -> {
               log.info("TestFilter后置逻辑");
           }));
       }
   
       //值越小，优先级越高
       //int HIGHEST_PRECEDENCE = -2147483648;
       //int LOWEST_PRECEDENCE = 2147483647;
       @Override
       public int getOrder() {
           return Ordered.HIGHEST_PRECEDENCE;
       }
   }
   ```

2. 加入Spring的容器管理中即可生效。



### GatewayFilter

路由级别的过滤器，官方定义了几十种

```java
package org.springframework.cloud.gateway.filter;

import reactor.core.publisher.Mono;

import org.springframework.cloud.gateway.support.ShortcutConfigurable;
import org.springframework.web.server.ServerWebExchange;

/**
 * Contract for interception-style, chained processing of Web requests that may be used to
 * implement cross-cutting, application-agnostic requirements such as security, timeouts,
 * and others. Specific to a Gateway
 *
 * Copied from WebFilter
 *
 * @author Rossen Stoyanchev
 * @since 5.0
 */
public interface GatewayFilter extends ShortcutConfigurable {

	/**
	 * Name key.
	 */
	String NAME_KEY = "name";

	/**
	 * Value key.
	 */
	String VALUE_KEY = "value";

	/**
	 * Process the Web request and (optionally) delegate to the next {@code WebFilter}
	 * through the given {@link GatewayFilterChain}.
	 * @param exchange the current server exchange
	 * @param chain provides a way to delegate to the next filter
	 * @return {@code Mono<Void>} to indicate when request processing is complete
	 */
	Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain);

}
```

#### 部分实现类

- org.springframework.cloud.gateway.filter.OrderedGatewayFilter

#### 一般使用方法

1. 实现GatewayFilter, Ordered接口

   局部过滤器举例, 对请求头部的 user-id 进行校验

   ```java
   @Slf4j
   public class UserIdCheckGateWayFilter implements GatewayFilter, Ordered {
       @Override
       public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
           String url = exchange.getRequest().getPath().pathWithinApplication().value();
           log.info("请求URL:" + url);
           log.info("method:" + exchange.getRequest().getMethod());
           //获取param 请求参数
           String uname = exchange.getRequest().getQueryParams().getFirst("uname");
           //获取header
           String userId = exchange.getRequest().getHeaders().getFirst("user-id");
           log.info("userId：" + userId);
    
           if (StringUtils.isEmpty(userId)) {
               log.info("*****头部验证不通过，请在头部输入  user-id");
               //终止请求，直接回应
               exchange.getResponse().setStatusCode(HttpStatus.NOT_ACCEPTABLE);
               return exchange.getResponse().setComplete();
           }
           return chain.filter(exchange);
       }
    
       // 值越小，优先级越高
       //int HIGHEST_PRECEDENCE = -2147483648;
       //int LOWEST_PRECEDENCE = 2147483647;
       @Override
       public int getOrder() {
           return Order.HIGHEST_PRECEDENCE;
       }
   }
   ```

2. 加入过滤器工厂，将工厂注册到Spring容器管理中

   ```java
   @Component
   public class UserIdCheckGatewayFilterFactory extends AbstractGatewayFilterFactory<Object> {
       
       @Override
       public GatewayFilter apply(Object config) {
           return new UserIdCheckGateWayFilter();
       }
   }
   ```

3. 通过配置启用过滤器规则

   ```yml
   spring:
     cloud:
       gateway:
         routes:
           - id: service_provider_demo_route_filter
             uri: lb://service-provider-demo
             predicates:
               - Path=/filter/**
             filters:
               - RewritePath=/filter/(?<segment>.*), /provider/$\{segment}
               - UserIdCheck
   ```



### WebFilter

URL级别过滤器，对指定匹配的url进行过滤

这里指的是Spring的WebFilter，而非`javax.servlet.annotation.WebFilter`，那个以后再说

```java
package org.springframework.web.server;

import reactor.core.publisher.Mono;

/**
 * Contract for interception-style, chained processing of Web requests that may
 * be used to implement cross-cutting, application-agnostic requirements such
 * as security, timeouts, and others.
 *
 * @author Rossen Stoyanchev
 * @since 5.0
 */
public interface WebFilter {

	/**
	 * Process the Web request and (optionally) delegate to the next
	 * {@code WebFilter} through the given {@link WebFilterChain}.
	 * @param exchange the current server exchange
	 * @param chain provides a way to delegate to the next filter
	 * @return {@code Mono<Void>} to indicate when request processing is complete
	 */
	Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain);

}
```



#### 使用方式

实现WebFilter接口，注册到Spring容器中

```java
@Configuration
@Order(-1)
public class MyWebFilter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange serverWebExchange, WebFilterChain webFilterChain) {
 
        ServerHttpRequest request =  serverWebExchange.getRequest();
        String token = request.getHeaders().getFirst("token");
        serverWebExchange.getAttributes().put("url","blog.csdn.net");
        return webFilterChain.filter(serverWebExchange);
    }
 
}
```



