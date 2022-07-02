







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



