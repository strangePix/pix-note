# ElasticSearch

## 简介

ElasticSearch是一个基于Apache Lucene开源的分布式、RESTful风格的搜索和数据分析引擎，可以供快速存储，搜索和分析海量数据的能力。



## 安装

### Linux

- 下载：https://www.elastic.co/cn/downloads/elasticsearch
  这里选择8.4.1版本

- 安装，这里先不用安装包安装，而是直接通过包管理器安装

  - ubuntu：apt-get

    ```bash
    # Import the Elasticsearch PGP Key
    wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
    # install the apt-transport-https
    sudo apt-get install apt-transport-https
    # 添加一个安装源 /etc/apt/sources.list.d/elastic-8.x.list
    echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list
    # 执行安装
    sudo apt-get update && sudo apt-get install elasticsearch
    ```

    安装位置为

    > - 根据文档，8.4.1有一个手动安装方式
    >
    >   ```bash
    >   wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.4.1-amd64.deb
    >   wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.4.1-amd64.deb.sha512
    >   shasum -a 512 -c elasticsearch-8.4.1-amd64.deb.sha512 
    >   sudo dpkg -i elasticsearch-8.4.1-amd64.deb
    >   ```

  - centos：yum

    ```bash
    # /etc/yum.repos.d/ 目录下创建文件elasticsearch.repo，内容为：
    [elasticsearch]
    name=Elasticsearch repository for 8.x packages
    baseurl=https://artifacts.elastic.co/packages/8.x/yum
    gpgcheck=1
    gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
    enabled=0
    autorefresh=1
    type=rpm-md
    # 进行安装
    sudo yum install --enablerepo=elasticsearch elasticsearch
    ```

- 安装完成会在控制台打印证书和密钥

  ![image-20220909111018709](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209091110740.png)

  ```bash
  --------------------------- Security autoconfiguration information ------------------------------
  
  Authentication and authorization are enabled.
  TLS for the transport and HTTP layers is enabled and configured.
  
  The generated password for the elastic built-in superuser is : -kXkeAwBlmMqERgLBrQz
  
  If this node should join an existing cluster, you can reconfigure this with
  '/usr/share/elasticsearch/bin/elasticsearch-reconfigure-node --enrollment-token <token-here>'
  after creating an enrollment token on your existing cluster.
  
  You can complete the following actions at any time:
  
  Reset the password of the elastic built-in superuser with 
  '/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic'.
  
  Generate an enrollment token for Kibana instances with 
   '/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana'.
  
  Generate an enrollment token for Elasticsearch nodes with 
  '/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s node'.
  
  -------------------------------------------------------------------------------------------------
  ```

- 启动

  ```bash
  # 配置服务和自启
  sudo /bin/systemctl daemon-reload
  sudo /bin/systemctl enable elasticsearch.service
  # 启动/关闭服务
  sudo systemctl start elasticsearch.service
  sudo systemctl stop elasticsearch.service
  ```



### Docker容器

- 拉取镜像

  ```bash
  docker pull docker.elastic.co/elasticsearch/elasticsearch:8.4.1
  ```

- 创建docker网络

  ```bash
  docker network create elastic
  ```

- 启动es

  ```bash
  docker run -e ES_JAVA_OPTS="-Xms1g -Xmx1g" --name es01 --net elastic -p 9200:9200 -p 9300:9300 -it docker.elastic.co/elasticsearch/elasticsearch:8.4.1
  ```

  > 启动报错：max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
  >
  > 大概意思就是分配的内存达不到配置的要求，需要修改分配的内存或者配置的内存
  >
  > ```bash
  > # 临时的更改
  > sysctl -w vm.max_map_count=262144
  > # 永久更改 编辑 /etc/sysctl.conf 内容  修改或追加
  > vm.max_map_count=262144
  > # 保存后重载配置 再启动es
  > sysctl  -p
  > # 目前来看重启后并没有永久更改，可以再执行一次sysctl --system 让配置生效
  > ```
  >
  > > 存在重启后配置又被改回去的问题，可以重新运行`sysctl  -p`生效
  > >
  > > 问题定位和其他解决方案：http://ssdxiao.github.io/linux/2017/03/20/Sysctl-not-applay-on-boot.html

- 保存密码和令牌，在第一次启动的控制台能看到。

  ![image-20220909154255845](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209091542461.png)

  ```bash
  # 如
  # elastic用户的password : E*6Mh019qmSq2SqAFPJh
  # HTTP CA certificate SHA-256 fingerprint : 0c4a090e1066f5a6f2af2eb8f111076973e71380ae1642790dc57e9109509c8b
  # Configure Kibana to use this cluster : eyJ2ZXIiOiI4LjQuMSIsImFkciI6WyIxNzIuMTguMC4yOjkyMDAiXSwiZmdyIjoiMGM0YTA5MGUxMDY2ZjVhNmYyYWYyZWI4ZjExMTA3Njk3M2U3MTM4MGFlMTY0Mjc5MGRjNTdlOTEwOTUwOWM4YiIsImtleSI6IkdIM3ZOSU1CQzdxUjdHM2hPZUEyOkNtOTN3Qm9KUk5DRFFsaG1iYnU4aEEifQ==
  # 有效期只有30分钟过期需要重新生成
  # Configure other nodes to join this cluster eyJ2ZXIiOiI4LjQuMSIsImFkciI6WyIxNzIuMTguMC4yOjkyMDAiXSwiZmdyIjoiMGM0YTA5MGUxMDY2ZjVhNmYyYWYyZWI4ZjExMTA3Njk3M2U3MTM4MGFlMTY0Mjc5MGRjNTdlOTEwOTUwOWM4YiIsImtleSI6IkYzM3ZOSU1CQzdxUjdHM2hPZUEyOkJIaWRPUlJMU2dTWm1tMFdrYzIxbGcifQ==
  ```

  没找到或者需要重置用户密码的话，使用`elasticsearch-reset-password`工具，默认有个用户elastic

  ```bash\
  docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
  ```

- 从容器拷贝生成的crt证书到本地机器

  > 8.0后es默认开启安全证书方面的配置

  ```bash
  docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .
  ```

- 测试是否能通过证书连接es

  ```bash
  curl --cacert http_ca.crt -u elastic:{密码} https://localhost:9200
  # 如 curl --cacert http_ca.crt -u elastic:OQBJwYbC+20CuSo7NjT_ https://localhost:9200
  ```

  ![image-20220909154938203](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209091549238.png)

  或者浏览器访问 https://localhost:9200/ 输入用户名密码后也行

> 显式设置 JVM 堆大小的值
>
> ```bash
> docker run -e ES_JAVA_OPTS="-Xms1g -Xmx1g" -e ENROLLMENT_TOKEN="eyJ2ZXIiOiI4LjQuMSIsImFkciI6WyIxNzIuMTguMC4yOjkyMDAiXSwiZmdyIjoiYmI4OWNkMWJiZWU4MTIwMzc5MGQxMzNmNDFmMWVkNjNiYjQ0NDhjYjgxNjkwMDg0YzM3NmI5N2UzMmM2NzhiZCIsImtleSI6InNPeEJJWU1CajlqZlJCQmQ1QktJOlBWU2N6ajF0Umg2VlA0ZlNQRklESEEifQ==" --name es02 -p 9201:9200 --net elastic -it docker.elastic.co/elasticsearch/elasticsearch:8.4.1 
> ```



#### 最低限度安全性配置

参考：https://www.elastic.co/guide/en/elasticsearch/reference/8.4/manually-configure-security.html

目前这个安全配置影响到很多连接测试，考虑本地测试可以关闭安全证书监测只保留账号密码的方式，这样调用接口不需要带着证书认证

- 方式一：修改配置文件

  ```bash
  # 进入容器
  docker exec -it -u root es01 /bin/bash
  # 修改config/elasticsearch.yml 中的xpack.security.enabled: true 改为false  
  # 如果是单节点,这么设置避免连接其他集群  discovery.type: single-node
  ```

  修改后改为http调用而非https，密码也不需要了，当然不是很安全就是了

  > **容器内没有vim，apt安装提示E: Unable to locate package vim**
  >
  > ```bash
  > apt update
  > # 卡的话 参考linux 换一个国内镜像源
  > apt install vim
  > # 大约需要空间60m  值不值自己考虑了
  > ```

- 方式二：还没想好，大概是容器启动带环境变量  比如用docker-compose 映射文件



#### 安装Kibana

- 拉取镜像，版本号与es一致

  ```bash
  docker pull docker.elastic.co/kibana/kibana:8.4.1
  ```

- 启动容器

  ```bash
  docker run --name kib-01 -e "I18N_LOCALE=zh-CN" --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.4.1
  ```

- 根据提示，访问http://127.0.0.1:5601/?code=106393进行配置（code不固定）

  ![image-20220909163711219](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209091637330.png)

- 在这个界面把es那里获得的kibana的Enrollment token配进去，然后就好了。http://127.0.0.1:5601/app/home#/

  ![image-20220909163748612](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209091637649.png)

  > 如果过期了，比如我这样的，需要通过`elasticsearch-create-enrollment-token`重新生成
  >
  > ```bash
  > docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
  > ```
  
  或者直接提供集群地址，即`https://es容器ip:9200`
  
  > 查询容器ip
  >
  > ```bash
  > docker inspect <容器名>
  > ```

> 中文汉化：
>
> 界面是英文的，现在已经支持中文，这么配置
>
> ```bash
> # 进入容器
> docker exec -it kib-01 bash
> # 编辑配置文件  添加一行 i18n.locale: "zh-CN"
> vi config/kibana.yml
> # 可能没有vi指令，就用sed指令 增加内容
> sed -i '$a i18n.locale: "zh-CN"' config/kibana.yml
> ```
>



#### 安装中文分词

首先版本与es保持一致。

- 根据版本在https://github.com/medcl/elasticsearch-analysis-ik/releases获取插件压缩包下载地址，如这里https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v8.4.1/elasticsearch-analysis-ik-8.4.1.zip

- 进入容器

  ```bash
  docker exec -it -u root es01 /bin/bash
  ```

- 进入bin目录，通过插件工具安装

  ```bash
  cd /bin
  elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v8.4.1/elasticsearch-analysis-ik-8.4.1.zip
  #	查看
  elasticsearch-plugin list 
  #	删除
  elasticsearch-plugin remove analysis-ik 
  # 安装完成后重启服务
  ```

  > - 有手动安装的方式，外网直接下载可能下不下来
  >
  >   ```bash
  >   # 在容器内执行 待补充
  >   ```
  >
  > - 增加分词
  >
  >   ```bash
  >   # 增加分词
  >   docker exec -it elasticsearch /bin/sh
  >   cd config/analysis-ik/
  >   echo '济南彭于晏' >> main.dic
  >   ```

- 安装完成后重启服务



#### 安装可视化界面

一笔带过，非官方

https://github.com/1340691923/ElasticView

- 一键安装启动

  ```bash
  docker run --restart=unless-stopped -d -p 8090:8090 -v /soft/elastic_view/data:/data -v /soft/elastic_view/logs:/logs kecikeci/elastic_view:latest
  # --net elastic
  ```

- 浏览器访问对应ip:8090，初始用户名：admin，初始密码：admin

> 不支持带证书的连接，也可能是我自己还没搞明白



## 相关概念

- **Near Realtime（近实时）**：Elasticsearch是一个近乎实时的搜索平台，这意味着从索引文档到可搜索文档之间只有一个轻微的延迟(通常是一秒钟)。

- **Cluster（集群）**：集群是**一个或多个节点的集合**，它们一起保存整个数据，并提供跨所有节点的联合索引和搜索功能。每个群集都有自己的唯一群集名称，节点通过名称加入群集。

- **Node（节点）**：节点是指属于集群的单个Elasticsearch实例，存储数据并参与集群的索引和搜索功能。可以将节点配置为按集群名称加入特定集群，默认情况下，每个节点都设置为加入一个名为`elasticsearch`的集群。

- **Index（索引）**：索引是一些具有相似特征的文档集合，类似于MySql中数据库的概念。

- **Type（类型）**：类型是索引的逻辑类别分区，通常，为具有一组公共字段的文档类型，类似MySql中表的概念。

  > 在Elasticsearch 6.0.0及更高的版本中，一个索引只能包含一个类型。

- **Document（文档）**：文档是可被索引的基本信息单位，以JSON形式表示，类似于MySql中行记录的概念。

- **Shards（分片）**：当索引存储大量数据时，可能会超出单个节点的硬件限制，为了解决这个问题，Elasticsearch提供了将索引细分为分片的概念。分片机制赋予了索引水平扩容的能力、并允许跨分片分发和并行化操作，从而提高性能和吞吐量。

- **Replicas（副本）**：在可能出现故障的网络环境中，需要有一个故障切换机制，Elasticsearch提供了将索引的分片复制为一个或多个副本的功能，副本在某些节点失效的情况下提供高可用性。







## 初步使用







## SpringBoot配置



https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/8.4/installation.html
