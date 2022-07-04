







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



## 搭建Maven私有仓库Nexus

[参考](https://juejin.cn/post/6899671175304052750)

### 安装

#### DockerCompose

**配置文件**

```yaml
version: '3'

services:
  nexus:
    image: sonatype/nexus3:3.40.1
    container_name: nexus
    restart: always
    ports:
    - "8081:8081"
    volumes:
      - /soft/nexus/data:/nexus-data
```

> 考虑到目录权限问题，可以把映射目录设置权限为777，也可以再确认分配用户后再分配权限

**利用指令启动**

```sh
docker-compose up -d
```

**查看admin默认密码**

进入容器查看文件，也可以直接再外面主机根据映射查看

```sh
cat nexus-data/admin.password
```



### 后台配置

#### 登录后台

容器映射为8081端口，也可以根据情况进行域名映射。

账号为admin，密码在安装阶段查看。

#### 管理界面说明

![image-20220703234522489](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20220703234522489.png)

- Browse可以查看当前有多少仓库，搭建好的Nexus，默认会带有一些maven仓库，一般使用这些仓库就足够

- **默认仓库说明（Name）**

  - maven-central：maven中央库，默认从中央仓库拉取
  - maven-releases：私库发行版jar，初次安装请将Deployment policy设置为Allow redeploy
  - maven-snapshots：私库快照（调试版本）jar
  - maven-public：仓库分组，把上面三个仓库组合在一起对外提供服务，在本地maven基础配置settings.xml或项目pom.xml中使用

- **仓库类型（Type）**

  - **Group**：

    这是一个仓库聚合的概念，用户仓库地址选择Group的地址，即可访问Group中配置的，用于方便开发人员自己设定的仓库。

    maven-public就是一个Group类型的仓库，内部设置了多个仓库，访问顺序取决于配置顺序，3.x默认Releases-Snapshots-Central，当然你也可以自己设置。

  - **Hosted**：私有仓库，内部项目的发布仓库，专门用来存储我们自己生成的jar文件

  - Snapshots：本地项目的快照仓库

  - Releases：本地项目发布的正式版本

  - **Proxy**：

    代理类型，从远程中央仓库中寻找数据的仓库（可以点击对应的仓库的Configuration页签下Remote Storage属性的值即被代理的远程仓库的路径），如可配置阿里云maven仓库

  - Central：中央仓库



#### 增加代理源

目的是基础jar包从其他仓库引入，减少步骤，以及起到一个加速的作用。

1. 如图**增加仓库Repository**

   ![image-20200904113744271](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dgdhgidgidghsidghishdg4334433.png)

2. **选择添加maven2的代理（Proxy）**

   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/dfgdfgdfgeefwefwfe534f34f.png" alt="image-20200904113844684" style="zoom:50%;" />

3. **配置仓库名称，仓库地址，缓存时间**（Cache统一设置为200天 288000 ）

   ![image-20200904114003740](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/fgdfgg34f334f3.png)

4. **将常用的maven仓库代理配置进去**

   自行选择

   - aliyun
     https://maven.aliyun.com/repository/public

   - apache_snapshot
     https://repository.apache.org/content/repositories/snapshots/

   - apache_release
     https://repository.apache.org/content/repositories/releases/

   - atlassian
     https://maven.atlassian.com/content/repositories/atlassian-public/

   - central.maven.org
     http://central.maven.org/maven2/

   - datanucleus
     http://www.datanucleus.org/downloads/maven2

   - maven-central （安装后自带，仅需设置Cache有效期即可）
     https://repo1.maven.org/maven2/

   - nexus.axiomalaska.com
     http://nexus.axiomalaska.com/nexus/content/repositories/public

   - oss.sonatype.org
     https://oss.sonatype.org/content/repositories/snapshots
   - pentaho
     https://public.nexus.pentaho.org/content/groups/omni/

5. 设置maven-public 将这些代理加入Group，最好将默认的maven库放到最底下，下载顺序是从上到下依次查找，所以把下载最快的放到最上面

   ![image-20200904114419163](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/maven202207410031dsffsf.png)

6. **设置私用仓库可重复发布**

   Nexus安装后自带maven-releases，maven-snapshots两个仓库，用于将生成的jar包发布在这两个仓库中，在实际开发中需要将maven-releases设置为可以重复发布

   ![image-20200904114544197](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/maven202207040034dfsfsfsfsf.png)



### 配置Maven使用Nexus

修改Maven的`settings.xml`文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <!-- localRepository
     | 将默认的仓库位置改为想要设置的位置
     |
     | Default: ${user.home}/.m2/repository
     -->
    <localRepository>D:\maven\repository</localRepository>

    <!-- 插件组 -->
    <pluginGroups/>

    <!-- 代理 -->
    <proxies/>

    <!-- servers服务器(其中username和password是私服的用户名和密码) -->
    <servers>
        <server>
            <id>maven-releases</id>
            <username>admin</username>
            <password>admin111</password>
        </server>

        <server>
            <id>maven-snapshots</id>
            <username>admin</username>
            <password>admin111</password>
        </server>
    </servers>

    <!-- 镜像
     | 这是从远程存储库下载依赖时使用的镜像列表。
     |-->
    <mirrors>
        <!--<mirror>
            <id>alimaven</id>
            <mirrorOf>central</mirrorOf>
            <name>aliyun maven</name>
            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        </mirror>-->
        <mirror>
            <id>ManaphyMirror</id>
            <mirrorOf>*</mirrorOf>
            <name>Manaphy Repository Mirror.</name>
            <url>http://192.168.2.132:8081/repository/maven-public/</url>
        </mirror>
    </mirrors>

    <!-- 服务器配置 -->
    <profiles>
        <!-- java编译插件,配jdk的编译版本-->
        <profile>
            <id>jdk-1.8</id>
            <activation>
                <activeByDefault>true</activeByDefault>
                <jdk>1.8</jdk>
            </activation>
            <properties>
                <maven.compiler.source>1.8</maven.compiler.source>
                <maven.compiler.target>1.8</maven.compiler.target>
                <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
            </properties>
        </profile>
        <!-- 自定义私服的配置 -->
        <profile>
            <id>Manaphy</id>
            <repositories>
                <repository>
                    <id>nexus</id>
                    <name>Public Repositories</name>
                    <url>http://192.168.2.132:8081/repository/maven-public/</url>
                    <releases>
                        <enabled>true</enabled>
                    </releases>
                </repository>
                <repository>
                    <id>maven-central</id>
                    <name>Central Repositories</name>
                    <url>http://localhost:8082/repository/maven-central/</url>
                    <releases>
                        <enabled>true</enabled>
                    </releases>
                    <snapshots>
                        <enabled>false</enabled>
                    </snapshots>
                </repository>
                <repository>
                    <id>maven-releases</id>
                    <name>Release Repositories</name>
                    <url>http://192.168.2.132:8081/repository/maven-releases/</url>
                    <releases>
                        <enabled>true</enabled>
                    </releases>
                    <snapshots>
                        <enabled>false</enabled>
                    </snapshots>
                </repository>
                <repository>
                    <id>maven-snapshots</id>
                    <name>Snapshot Repositories</name>
                    <url>http://192.168.2.132:8081/repository/maven-snapshots/</url>
                    <releases>
                        <enabled>true</enabled>
                    </releases>
                    <snapshots>
                        <enabled>true</enabled>
                    </snapshots>
                </repository>
            </repositories>

            <pluginRepositories>
                <pluginRepository>
                    <id>plugins</id>
                    <name>Plugin Repositories</name>
                    <url>http://192.168.2.132:8081/repository/maven-public/</url>
                </pluginRepository>
            </pluginRepositories>
        </profile>
    </profiles>

    <!-- 激活Profiles
     | 为所有生成激活的配置文件的列表。
     |-->
    <activeProfiles>
        <activeProfile>jdk-1.8</activeProfile>
        <activeProfile>Manaphy</activeProfile>
    </activeProfiles>

</settings>
```

