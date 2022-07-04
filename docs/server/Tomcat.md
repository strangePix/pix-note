# 服务器-Tomcat

## 安装



### Win

- 前提：  解压apache-tomcat-8.5.49.zip到指定路径。

- 环境变量配置：

  Path变量值添加 ;%CATALINA_HOME%\bin

  添加变量CATALINA_HOME，值为Tomcat安装位置，如E:\soft\apache-tomcat-8.5.49

- 检验安装

  进入到tomcat的安装目录bin目录下，控制台输入startup命令，服务器启动，同时本地可以访问localhost:8080即可



### Linux

```shell
# 下载 地址为https://tomcat.apache.org/
wget https://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-7/v7.0.107/bin/apache-tomcat-7.0.107.tar.gz
# 解压，放置在特定目录
tar -zxvf apache-tomcat-7.0.107.tar.gz -C /usr
# 启动 访问host:8080即可
cd /usr/apache-tomcat-7.0.107/bin
./startup.sh
#验证端口号占用情况
netstat -nalp|grep 8088
#关闭
./shutdown.sh
```

**配置到环境变量**

```shell
vim /etc/profile
# 添加 export CATALINA_HOME=/usr/apache-tomcat-7.0.107
# PATH的值后添加 :$CATALINA_HOME/bin
source /etc/profile
```



## 配置文件

[参考](https://www.cnblogs.com/kismetv/p/7228274.html)

以linux为例

```shell
vim /usr/apache-tomcat-7.0.107/conf/server.xml
```

```xml
<?xml version='1.0' encoding='utf-8'?>

<Server port="8005" shutdown="SHUTDOWN">
    <Listener className="org.apache.catalina.startup.VersionLoggerListener" />
    <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />
    <Listener className="org.apache.catalina.core.JasperListener" />
    <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener" />
    <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener" />
    <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener" />


    <GlobalNamingResources>
        <Resource name="UserDatabase" auth="Container"
                  type="org.apache.catalina.UserDatabase"
                  description="User database that can be updated and saved"
                  factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
                  pathname="conf/tomcat-users.xml" />
    </GlobalNamingResources>

    <Service name="Catalina">

        <Connector port="8080" 
                   protocol="HTTP/1.1" 
                   connectionTimeout="20000" 
                   redirectPort="8443" />

        <Engine name="Catalina" defaultHost="localhost">
            
            <Realm className="org.apache.catalina.realm.LockOutRealm">
                <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
                       resourceName="UserDatabase"/>
            </Realm>

            <Host name="localhost"  
                  appBase="webapps"
                  unpackWARs="true" 
                  autoDeploy="true">

                <Valve className="org.apache.catalina.valves.AccessLogValve" 
                       directory="logs"
                       prefix="localhost_access_log." 
                       suffix=".txt"
                       pattern="%h %l %u %t &quot;%r&quot; %s %b" />

            </Host>
        </Engine>
    </Service>
</Server>

```

- `<Server port="8005" shutdown="SHUTDOWN">`唯一最外层元素，代表整个tomcat容器，可包含多个Service
  - shutdown 关闭Server的命令
  - port Server接收shuntdown指令的端口号，设为-1可禁用端口

- `<Service name="Catalina">`组装Connector和Engine，对外提供服务，可包含多个Connector，只能一个Engine

- name Service的名称

- ` <Connector port="8080" protocol="HTTP/1.1 connectionTimeout="20000" redirectPort="8443" />`接收请求，创建Request与Response用于交换数据，分配线程交给Engine处理请求

  - port 客户端访问tomcat的端口号，这里为8080
  - prototcol 访问tomcat使用的协议，这里为http
  - connectionTimeout 连接的超时时间
  - redirectPort 当强制要求https而请求是http，重定向至8443端口的Connector

- `<Engine name="Catalina" defaultHost="localhost">`Service组件中的请求处理组件，从一个或多个Connector中接收处理请求并返回响应。包含至少一个或多个Host容器。

  - name 用于日志和错误信息，在Server中唯一
  - defaultHost 指定了默认的host名称，匹配包含的Host组件name。如果请求的host名不存在则使用这个

- `<Host name="localhost"   appBase="webapps" unpackWARs="true"  autoDeploy="true">`代表Engine的一个虚拟主机，包含多个Context容器，对应安装、展开、启动、结束多个Web应用。

  - name 虚拟主机名，一般情况是DNS中注册的网络名（如”www.test.com”，或IP地址”116.25.25.25”）

  - unpackWARS 是否将代表Web应用的war解压，true解压，false直接用war运行
  - autoDeploy和appBase 与Host内Web应用的自动部署有关

- `<Context>` Host的子容器，代表特定虚拟主机运行的一个Web应用，基于war文件/war解压的应用目录

  - 文件没有出现这个部分，原因是自动部署，web应用通过特定规则被tomcat自动部署。



## 自动部署

  

### 开启web应用自动部署

#### Host配置

```xml
`<Host name="localhost"   appBase="webapps" unpackWARs="true"  autoDeploy="true">`
```

- Host节点的deployOnStartup和autoDeploy属性设为true，当检测到新的web应用/web应用更新，触发应用部署/重新部署。
  - deployOnStartup为true时，Tomcat在启动时检查Web应用，且检测到的所有Web应用视作新应用
  - autoDeploy为true时，Tomcat在运行时定期检查新的Web应用或Web应用的更新
- Host元素的appBase和xmlBase设置了检查Web应用更新的目录.
  - appBase指定Web应用所在目录，默认值webapps，指tomcat根目录下的webapps目录
  - xmlBase属性指定Web应用的XML配置文件所在的目录，默认值为conf/<engine_name>/<host_name>，如localhost的xmlBase默认值为$CATALINA_HOME/conf/Catalina/localhost

#### Web应用更新

一个web应用可能包含文件：xml配置，war包，应用目录（包含应用文件结构）

- xml配置文件位于xmlBase指定目录，war包和应用目录位于appBase指定目录
- tomcat按顺序扫描检查应用更新：xml配置文件，war包，应用目录

#### Context配置

主要包括  docBase 和 path 属性，以及reloadable属性也比较常用。

- docBase 指定应用使用的war路径或者应用目录路径。自动部署场景下，文件不在appBase中才指定这个。

- path 指定访问web应用上下文路径，请求到来时tomcat根据path和URI匹配选择应用处理请求。

  - 如app1应用path属性为"/app1"，app2应用path属性为"/app2"，
    则请求/app1/index.html交给app1，请求/app2/index.html交给app2。
  - 如果path属性为""，则为虚拟主机的默认应用，在请求的uri与所有path都不匹配时用它处理
  - 自动部署场景下，不能指定path属性，由 配置文件名/war文件名/应用目录名 自动推导出。
    如xmlBase目录下app1.xml，则应用path属性为"app1"；
    如果名称为ROOT，则为默认应用，path为""

- reloadable指示tomcat是否在运行时监控WEB-INF/classes和WEB-INF/lib目录下class文件的改动。

  为true则class变动时触发重新部署，一般用于开发环境调试；

  生产环境true会带来性能压力，所以默认为false。



**自动部署举例**

当我们安装完Tomcat后，$CATALINA_HOME/webapps目录下有如下文件夹：

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202204101904864.png)

启动后，可以使用http://localhost:8080/来访问Tomcat，访问的就是ROOT对应的Web应用。





## 问题处理

### IDEA中tomcat启动时控制台乱码（淇℃伅）

#### 问题描述

![图1.tomcat启动时的报错](https://img-blog.csdnimg.cn/20201104190238969.png#pic_center)

服务器：tomcat10

#### 解决方案

到tomcat安装目录下的文件夹里的`/conf/logging.properties`文件

将控制台打印的编码格式改为GBK

```properties
#java.util.logging.ConsoleHandler.encoding = UTF-8
java.util.logging.ConsoleHandler.encoding = GBK
```

并保证IDEA的文件编码格式为UTF-8
