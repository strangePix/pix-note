# ElasticSearch

## 简介

ElasticSearch是一个基于Apache Lucene开源的分布式、RESTful风格的搜索和数据分析引擎，可以供快速存储，搜索和分析海量数据的能力。

**为什么不直接用Lucene**

Lucene 可以说是当下最先进、高性能、全功能的搜索引擎库。但是 Lucene 仅仅只是一个库，为了充分发挥其功能，需要使用 Java 并将 Lucene 直接集成到应用程序中。 更糟糕的是，可能需要获得信息检索学位才能了解其工作原理，Lucene 非常 复杂。

Elasticsearch 也是使用 Java 编写的，它的内部使用 Lucene 做索引与搜索，通过隐藏 Lucene 的复杂性，取而代之的提供一套简单一致的 RESTful API。

同时Elasticsearch 不仅仅是 Lucene，并且也不仅仅只是一个全文搜索引擎， 它可以被下面这样准确的形容：

- 一个分布式的实时文档存储，每个字段 可以被索引与搜索
- 一个分布式实时分析搜索引擎
- 能胜任上百个服务节点的扩展，并支持 PB 级别的结构化或者非结构化数据

**主要功能**

1. 海量数据的分布式存储以及集群管理，达到了服务与数据的高可用以及水平扩展；

2. 近实时搜索，性能卓越。对结构化、全文、地理位置等类型数据的处理；

3. 海量数据的近实时分析（聚合功能）

**应用场景**

1. 网站搜索、垂直搜索、代码搜索；

2. 日志管理与分析、安全指标监控、应用性能监控、Web抓取舆情分析；



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

  > - 启动报错：max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
  >
  >   大概意思就是分配的内存达不到配置的要求，需要修改分配的内存或者配置的内存
  >
  >   ```bash
  >   # 临时的更改
  >   sysctl -w vm.max_map_count=262144
  >   # 永久更改 编辑 /etc/sysctl.conf 内容  修改或追加
  >   vm.max_map_count=262144
  >   # 保存后重载配置 再启动es
  >   sysctl  -p
  >   # 目前来看重启后并没有永久更改，可以再执行一次sysctl --system 让配置生效
  >   ```
  >
  >   > 存在重启后配置又被改回去的问题，可以重新运行`sysctl  -p`生效
  >   >
  >   > 问题定位和其他解决方案：https://blog.csdn.net/huolang_vip/article/details/124045251
  >
  > - 单机启动：加上一个环境变量` -e "discovery.type=single-node"`

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

- **Near Realtime 近实时 **

  Elasticsearch是一个近乎实时的搜索平台，这意味着从索引文档到可搜索文档之间只有一个轻微的延迟(通常是一秒钟)。

- **Cluster 集群 **

  集群是**一个或多个节点的集合**，它们一起保存整个数据，并提供跨所有节点的联合索引和搜索功能。

  每个群集都有一个唯一的名字标识（默认为`elasticsearch”），具有相同集群名的节点才会组成一个集群。

- **Node 节点 **

  节点是指属于集群的单个Elasticsearch实例，存储数据并参与集群的索引和搜索功能。

  节点也有自己的名称，默认在启动时会以一个随机的UUID的前七个字符作为节点的名字，你可以为其指定任意的名字。

  通过集群名在网络中发现同伴组成集群。一个节点也可是集群。

  默认情况下，每个节点都设置为加入一个名为`elasticsearch`的集群。

- **Index 索引 **

  索引是一些具有相似特征的文档集合。

  每个索引有唯一的名字，通过这个名字来操作它。

  一个集群中可以有任意多个索引。

- **Type 类型（废弃） **

  类型是索引的逻辑类别分区，通常为具有一组公共字段的文档类型。

  指在一个索引中，可以索引不同类型的文档，如用户数据、博客数据。

  从6.0.0 版本起已废弃，一个索引中只存放一类数据。

- **Document 文档 **

  文档是可被索引的基本信息单位，被索引的一条数据，以JSON形式表示，类似于MySql中行记录的概念。

- **Shards 分片 **

  在创建一个索引时可以指定分成多少个分片来存储。

  每个分片本身也是一个功能完善且独立的“索引”，可以被放置在集群的任意节点上。

  > - 当索引存储大量数据时，可能会超出单个节点的硬件限制，为了解决这个问题，Elasticsearch提供了将索引细分为分片的概念。
  >
  > - 分片机制赋予了索引**水平扩容**的能力、并允许跨分片分发和并行化操作，从而提高性能和吞吐量。

- **Replicas 副本 **

  一个分片可以有多个备份（副本）。

  > 在可能出现故障的网络环境中，需要有一个故障切换机制，Elasticsearch提供了将索引的分片复制为一个或多个副本的功能，副本在某些节点失效的情况下提供高可用性。



**ES与数据库的比照**

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209180100279.png)





## 初步使用：插入与搜索



### 插入一条文档

索引名为customer，类型为_doc，文档id为1

```sh
PUT /customer/_doc/1
{
  "name": "John Doe"
}
```

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209181623546.png)



### 批量插入文档

- 下载测试数据：https://github.com/macrozheng/mall-learning/blob/master/document/json/accounts.json

  index为bank

  文档格式为：

  ```json
  {
      "account_number": 1,
      "balance": 39225,
      "firstname": "Amber",
      "lastname": "Duke",
      "age": 32,
      "gender": "M",
      "address": "880 Holmes Lane",
      "employer": "Pyrami",
      "email": "amberduke@pyrami.com",
      "city": "Brogan",
      "state": "IL"
  }
  ```

- 导入数据

  ```sh
  POST /bank/_bulk?pretty&refresh
  {}
  # json中数据
  ```

  或者

  ```sh
  # 拷贝json文件到某个目录，如/opt/目录下
  curl -H "Content-Type: application/json" -XPOST "localhost:9200/bank/_bulk?pretty&refresh" --data-binary "@/opt/accounts.json"
  ```

  > 如果提示返回：The bulk request must be terminated by a newline [\\n]
  >
  > ```json
  > {
  >     "error": {
  >         "root_cause": [
  >             {
  >                 "type": "illegal_argument_exception",
  >                 "reason": "The bulk request must be terminated by a newline [\\n]"
  >             }
  >         ],
  >         "type": "illegal_argument_exception",
  >         "reason": "The bulk request must be terminated by a newline [\\n]"
  >     },
  >     "status": 400
  > }
  > ```
  >
  > 则编辑accounts.json文件，在最后添加一行空行再执行。

- 查看导入情况

  ```sh
  curl "localhost:9200/_cat/indices?v=true" | grep bank
  ```

  ![image-20220918165504587](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209181655649.png)



### 搜索文档：query

#### 搜索一个索引下所有文档：match_all

查询索引bank下的所有文档，按 account_number 字段的正序排列。

```sh
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ]
}
```

![image-20220918170712040](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209181707101.png)

**结果字段的含义**

- took：运行查询所花费的时间（以毫秒为单位）

- timed_out：搜索请求是否超时

- _shards：搜索了多少个分片，以及成功/失败/跳过了多少个分片的细目分类

- hits：

  - total.value：找到了多少个匹配的文档

  - max_score：找到的最相关文档的分数
  - hits.sort：文档的排序位置（不按相关性得分排序时），从0开始
  - hits._score：文档的相关性得分（使用match_all时不适用）



#### 分页搜索：from+to

添加from和size两个字段，类似于pageHelper的pageNum与pageSize。

```sh
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ],
  "from": 10,
  "size": 10
}
```

查询结果是从第11个开始查10个



#### 搜索结果排序：sort

按balance字段降序排列

```sh
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": { "balance": { "order": "desc" } }
}
```



#### 搜索结果返回指定字段：_source

指不返回搜索文档的所有数据，只显示指定的字段内容。

只返回account_number和balance两个字段内容：

```sh
GET /bank/_search
{
  "query": { "match_all": {} },
  "_source": ["account_number", "balance"]
}
```



#### 条件搜索：match

- 文本类型字段的条件搜索，是模糊匹配
- 数值类型字段的条件搜索，是精确匹配

查询bank索引下，address字段含有mill或lane的所有文档。

```sh
GET /bank/_search
{
  "query": { "match": { "address": "mill lane" } }
}
```

![image-20220918171806658](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209181718726.png)

> 这里因为默认是分词匹配，所以mill lane没有被当成一个词，而是分为两个词，如果要把它当成一个完整的词，则需要段落匹配。



#### 指定段落模糊搜索：match_phrase

查询bank索引下，address字段含有`mill lane`的所有文档。

```sh
GET /bank/_search
{
  "query": { "match_phrase": { "address": "mill lane" } }
}
```



#### 多条件组合搜索：bool

使用bool组合多个多个条件查询。

在bank索引中搜索40岁的客户账户，但不包括住址为爱达荷州（ID）的：

```sh
GET /bank/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "age": "40" } }
      ],
      "must_not": [
        { "match": { "state": "ID" } }
      ]
    }
  }
}
```

- must：同时满足包含的条件
- must_not：同时不满足包含的条件
- should：满足任意之一包含的条件即可

- filter：过滤搜索

  过滤出balance字段在20000~30000的文档

  ```sh
  GET /bank/_search
  {
    "query": {
      "bool": {
        "must": { "match_all": {} },
        "filter": {
          "range": {
            "balance": {
              "gte": 20000,
              "lte": 30000
            }
          }
        }
      }
    }
  }
  ```

  

  > **filter与must/must_not/should的区别**
  >
  > 都能用来写查询条件，语法类似，但是：
  >
  > - query查询条件用来给文档打分，然后会根据匹配度，给出不同的_score分数；
  > - filter过滤只会产生两种结果：匹配/不匹配，不匹配会被过滤。只有filter过滤条件的情况下，没有打分。

  

### 聚合搜索：aggregation

相当于SQL的group by，可以缩写为aggs

#### 简单聚合：terms

对state字段进行聚合，统计出相同state的文档数量，被聚合的字段无需对分词统计：

```sh
GET /bank/_search
{
  "size": 0,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword"
      }
    }
  }
}
```

> 因为无需返回命中结果的具体数据, 所以设置size=0，返回hits为空。

![image-20220919004707493](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209190047567.png)

- `doc_count`表示bucket中每个州的数据条数。

#### 嵌套聚合：aggs

基于聚合计算数据。

计算每个州的平均结余：对state字段进行聚合，统计出相同state的文档数量，再统计出balance的平均值，显示为average_balance字段。

```sh
GET /bank/_search
{
  "size": 0,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword"
      },
      "aggs": {
        "average_balance": {
          "avg": {
            "field": "balance"
          }
        }
      }
    }
  }
}
```

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209190052516.png)



#### 聚合结果排序：order

对嵌套计算出的balance的平均值average_balance，进行倒序排序

```sh
GET /bank/_search
{
  "size": 0,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword",
        "order": {
          "average_balance": "desc"
        }
      },
      "aggs": {
        "average_balance": {
          "avg": {
            "field": "balance"
          }
        }
      }
    }
  }
}
```



## 索引操作



### 创建索引

创建名为customer的索引

```sh
PUT /customer
```

#### 自动创建索引

另外，插入文档时，如果使用的索引是不存在的，则会自动创建一个对应index，如：

```sh
# 创建customer索引，插入id为1的数据
PUT /customer/_doc/1
{
  "name": "John Doe"
}
```

好处是自动创建，缺点是缺少对索引类型配置的控制，比如分片，分析器，映射等。

所以合理使用需要：1. 禁止自动创建index 2. 手动创建index，并提供配置参数



#### 配置禁止自动创建

修改config/elasticsearch.yml配置文件，增加或修改：

```yml
action.auto_create_index: false
```



#### 手动创建索引格式

在增加索引的请求基础之上，传入设置json，比如类型映射，配置参数等。

```sh
PUT /my_index
{
    "settings": { ... any settings ... },
    "mappings": {
        "properties": { ... any properties ... }
    }
}
```

- settings：设置分片，副本等配置信息

- mappings：字段映射，类型等

  - properties：由于type在后续版本中会被Deprecated， 所以无需被type嵌套

    > 由于我学的时候type已经过时不用了，所以这句话没看明白。（2022.9.19）

**参考案例**

创建一个user 索引`test-index-users`，其中包含三个属性：name，age，remarks；存储在一个分片一个副本上。

```sh
PUT /test-index-users
{
  "settings": {
		"number_of_shards": 1,
		"number_of_replicas": 1
	},
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "age": {
        "type": "long"
      },
      "remarks": {
        "type": "text"
      }
    }
  }
}
```

> - 重复插入的返回结果：
>
>   ![image-20220919101056470](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209191010696.png)
>
> - 在索引确定字段类型后，插入不匹配数据类型的返回结果：
>
>   ```sh
>   # age为long类型，这里传了一个字符串
>   POST /test-index-users/_doc
>   {
>     "name": "test user",
>     "age": "error_age",
>     "remarks": "hello eeee"
>   }
>   ```
>
>   ![image-20220919101259555](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209191012607.png)
>
> 



### 查看索引

查看单个索引配置

```sh
GET /test-index-users
# 查看settings
GET /bank/_settings
# 查看mapping/类型
GET /bank/_mapping
```

![image-20220919101640799](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209191016857.png)

查看所有索引情况

```sh
GET /_cat/indices?v
```

![image-20220919101453906](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209191014948.png)

可以看到刚才增加的索引test-index-users的health（状态）是yellow而非green，原因是目前是单点环境，但配置的副本数为1，单机情况要把副本设为0才算健康。

#### 通过kibana可视化查看索引

Stack management - 数据/索引管理

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209191027712.png)

![image-20220919102853289](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209191028360.png)



### 修改索引

修改test-index-users索引的副本数量为0

```sh
PUT /test-index-users/_settings
{
  "settings": {
    "number_of_replicas": 0
  }
}
```



### 关闭索引

关闭索引，则索引只能显示数据，**不能进行读写**，status变为close。

```sh
POST /test-index-users/_close
```

> 关闭索引后，插入数据的报错信息：
>
> ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209191024571.png)



### 打开索引

打开索引后，就可以重新读写数据到索引了。

```sh
POST /test-index-users/_open
```



### 删除索引

```sh
DELETE /test-index-users
```



## 索引模板

大概类似与索引创建的默认配置，自动/手动创建索引时，使用模板作为基础。

### 类型

- **组件模板**
  - 可重用的构建块，用于配置映射，设置和别名；
  - 不会直接应用于一组索引。
- **索引模板**
  - 包含组件模板的集合
  - 也可以直接指定设置，映射和别名。



### 模板优先级

1. 可组合模板优先于旧模板。如果没有可组合模板匹配给定索引，则旧版模板可能仍匹配并被应用。

2. 如果使用显式设置创建索引并且该索引也与索引模板匹配，则创建索引请求中的设置将优先于索引模板及其组件模板中指定的设置。

3. 如果新数据流或索引与多个索引模板匹配，则使用优先级最高的索引模板。



### 内置索引模板

Elasticsearch具有内置索引模板，每个索引模板的优先级为100，适用于以下索引模式：

1. `logs-*-*`
2. `metrics-*-*`
3. `synthetics-*-*`

所以在涉及内建索引模板时，要避免索引模式冲突。更多可以参考[这里](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-templates.html)



### 创建组件模板：_component_template

```sh
# 组件模板component_template1
PUT _component_template/component_template1
{
  "template": {
    "mappings": {
      "properties": {
        "@timestamp": {
          "type": "date"
        }
      }
    }
  }
}
# 组件模板runtime_component_template
PUT _component_template/runtime_component_template
{
  "template": {
    "mappings": {
      "runtime": { 
        "day_of_week": {
          "type": "keyword",
          "script": {
            "source": "emit(doc['@timestamp'].value.dayOfWeekEnum.getDisplayName(TextStyle.FULL, Locale.ROOT))"
          }
        }
      }
    }
  }
}
```



### 创建索引模板：_index_template

使用组件模板的索引模板：composed_of

```sh
# 索引模板template_1 前缀匹配bar*
PUT _index_template/template_1
{
  "index_patterns": ["bar*"],
  "template": {
    "settings": {
      "number_of_shards": 1
    },
    "mappings": {
      "_source": {
        "enabled": true
      },
      "properties": {
        "host_name": {
          "type": "keyword"
        },
        "created_at": {
          "type": "date",
          "format": "EEE MMM dd HH:mm:ss Z yyyy"
        }
      }
    },
    "aliases": {
      "mydata": { }
    }
  },
  "priority": 500,
  "composed_of": ["component_template1", "runtime_component_template"], 
  "version": 3,
  "_meta": {
    "description": "my custom"
  }
}
```

> 创建一个索引能匹配索引模板template_1，使用bar前缀即可。
>
> ```sh
> PUT /bar-test
> # 查看是否用到模板
> GET /bar-test/_mapping
> ```
>
> ![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209191102134.png)



### 模拟索引模板

#### 模拟索引：_simulate_index

用途：多组件模板生成的索引配置，可以通过模拟观察组合后的效果，不用真的创建索引。

这里模拟使用template_1创建索引bar-pdai-test，查看索引效果

```sh
POST /_index_template/_simulate_index/bar-pdai-test
```

![img](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209191105468.png)



#### 模拟组件模板配置：_simulate

模拟出template_1被组合后的索引配置

```sh
POST /_index_template/_simulate/template_1
```

执行结果：

![image-20220919111047708](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209191110776.png)



#### 模拟索引模板配置：_simulate

模拟与组件模板结合的索引模板

```sh
# 创建两个组件模板 ct1 ct2
PUT /_component_template/ct1
{
  "template": {
    "settings": {
      "index.number_of_shards": 2
    }
  }
}
PUT /_component_template/ct2
{
  "template": {
    "settings": {
      "index.number_of_replicas": 0
    },
    "mappings": {
      "properties": {
        "@timestamp": {
          "type": "date"
        }
      }
    }
  }
}
# 模拟索引模板 使用了2个组件模板的基础上增加额外配置
POST /_index_template/_simulate
{
  "index_patterns": ["my*"],
  "template": {
    "settings" : {
        "index.number_of_shards" : 3
    }
  },
  "composed_of": ["ct1", "ct2"]
}
```

执行结果：

![image-20220919111928742](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209191119795.png)



## DSL查询（待补充）

https://www.pdai.tech/md/db/nosql-es/elasticsearch-x-dsl-com.html

### 复合查询





## Java Client（待补充）



## SpringBoot配置（待补充）



https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/8.4/installation.html



## 补充理解



### es的"表"设计

阅读自https://blog.csdn.net/microGP/article/details/125501544



#### 前提

schema即元数据，作为数据库最重要的组成部分。就如同现实世界中的配方或者图纸，被数据库用来生产和管理数据。

ElasticSearch允许使用者在不定义schema的情况下直接操作数据，ElasticSearch替用户来搞定schema相关的一切操作，对用户透明，用户开箱即用即可。

但这种“开箱即用”也是有代价的，在数据量大时候消耗资源多，性能差。



#### 开箱即用的背后

其实ElasticSearch的“开箱即用”并不是没有schema，而是ElasticSearch按照你给的数据根据“自己的理解”生成一套schema。

**开箱即用带来的缺点**

- **影响写入速度**：

  对于字段类型，ElasticSearch只能根据字面量来进行推断，这样浪费时间，耽误效率。

- **浪费系统资源：**

  包含但不限于内存、硬盘、CPU以及IO。由于字段类型的判断并不一定是我们需要的，对于不同的数据类型，需要创建的索引是不一样的，进而消耗的资源也是不一样的。对于我们不需要的功能和使用场景，这种资源的浪费显然是需要避免的。

- **影响数据使用效率：**

  要知道每个服务器资源是有限的，当你将有限的资源浪费在不需要的场景中，自然对应的需要使用的场景中的资源数量就会受限，从而引发一系列的不良影响，最终影响到正常的使用效率和使用体验。

所以设计表对于es的意义便是”按需分配“，不去提供大而全，而是以更高的效率提供必要的信息即可。



#### SQL概念对应

ElasticSearch中的概念和SQL的对应关系：

| SQL      | ElasticSearch | SQL/ElasticSearch  |
| :------- | :------------ | :----------------- |
| column   | field         | 列/属性            |
| row      | document      | 行/文档            |
| table    | index         | 表/索引            |
| database | cluster       | 数据库/ ES 集群    |
| cluster  | cluster       | 多个数据库/ES 集群 |

- ElasticSearch是不严格区分SQL中的database的，没有严格意义上的database级别的数据和资源隔离(有其他方式的隔离，如ilm)。

  如果想要实现此功能可以部署多个ElasticSearch的集群；如果只想进行数据区分，而不需要隔离的话，在一个ElasticSearch集群中使用不同前缀的index来区分即可。

- 在ElasticSearch 7 版本以前在index下有一个type的概念。原本是想用type来代表table，index来对应database。但是后期的效果没有达到预期，反而带来了很多问题，于是在7版本已经开始放弃type这个概念，转而使用上面的这种对应关系。



#### 名词解释

按照上面的概念对应，现在的es的表设计便是针对es的index设置。分为两部分：setting和mapping。

##### setting

setting是index的整体配置，这些配置从整体上框定了整个index的边界，后续的index就会在这个大框架下展开。

setting的配置会从根本上影响后续index的性能以及扩展性，而且不同的需求和应用场景也会有不同的配置。

**配置案例**

```json
{
    "test000":{
        "settings":{
            "index":{
                "codec":"best_compression",
                "refresh_interval":"5s",
                "number_of_shards":"16",
                "translog":{
                    "flush_threshold_size":"1gb",
                    "sync_interval":"120s",
                    "retention":{
                        "age":"1h"
                    },
                    "durability":"async"
                },
                "provided_name":"test000",
                "merge":{
                    "policy":{
                        "segments_per_tier":"7",
                        "max_merge_at_once":"7",
                        "max_merged_segment":"10gb"
                    }
                },
                "creation_date":"1634659200652",
                "number_of_replicas":"0",
                "uuid":"SdDe_0bDQEaT4J7RlXiToQ",
                "version":{
                    "created":"6000099"
                }
            }
        }
    }
}
```

setting中最重要的是index以及merge两个配置大项，一个配置index的整体属性，一个配置index中segments merge的相关参数。

- index中的codec控制着ElasticSearch的压缩算法。

  默认的是lz4，这是一种比较均衡的压缩算法，适合大多数场景。

  但是如果比较在意硬盘耗费量，可以考虑使用best_compression这个配置项，即使用DEFLATE压缩算法。这个压缩算法的压缩比更高，但这会占用更多的CPU资源。修改过后空间占用量可以下降15%～25%。

- index中的refresh_interval控制着数据多久从堆内存刷新到操作系统的Page Cache。

  只有刷新到Page Cache数据才会被Search到，所以这在很大程度上影响到数据展示的实时性。

  但是实时性过高也是有代价的：

  - 频繁的refresh会导致大量的小segment的生成，search的时候会增加很多IO；

  - 更多的segment也会影响到segment merge的触发频率，进而增加系统的IO压力；

  - 再加上很多缓存的失效。

  所以除非必要，这个值还是需要重新配置下的。比如：30s

- index中的number_of_shards用来控制一个index中shard的数量。

  由于ElasticSearch特殊的search机制，所以shard数量一旦确认，就没办法修改了。

  而且一个shard合理的存储量是有限的，所以shard数目确认后，整个index能存储的数据量上限也就确认了。

  如果想扩展shard的数量，只能通过ElasticSearch的reindex操作来实现。这其实就是数据复制重新分配的过程，耗时耗资源增加系统负载。

  另外，考虑到后续可能有缩减shard数量的需求，配合shrink操作的特点，number_of_shards的数量最好配置成有很多约数的数字，如16或者24这种，这样ElasticSearch可以shrink到约数个shard；

  反之如果设置成一个素数，那么只能shrink到1个shard了。

- index中的translog用来配置ElasticSearch中事务日志。

  事务日志用来容灾，相关的配置此处不详细说明，网上资料很多，基本上根据不同场景有几套固定的配置，大家按需使用即可。

- merge中的配置是用来配置segment merge相关的操作。

  这是ElasticSearch中相当复杂的一个部分，这里就先不展开了。

  直接看配置项说明一下：

  - segments_per_tier是每层所允许的分段数 默认为10。较小的值意味着更多的合并，但是存在较少的分段。需要注意的是，这个值必须 >=max_merge_at_once 不然就会强制执行太多的合并；
  - max_merge_at_once是一次合并最多合并多少个segment；
  - max_merged_segment是参与merge的最大分段大小 默认为5gb，但这个值是近似值，需要考虑删除文档的百分比带来的影响。



##### mapping

其实更贴近于RDS中的schema，用来定义每个字段的类型、属性以及查询索引创建的规则。

> **RDS**
>
> Relational Database Service，一种稳定可靠、可弹性伸缩的在线数据库服务。

- index：控制字段值是否被索引。它可以设置为true或false，默认为true。

  未被索引的字段不会被查询到，但是可以聚合。除非禁用doc_values。

- doc_values：

  默认情况下，大多数字段都被索引，这使得它们可以搜索。倒排索引根据term找到文档列表，然后获取文档原始内容。但是排序和聚合，以及从脚本中访问某个字段值，需要不同的数据访问模式，它们不仅需要根据term找到文档，还要获取文档中字段的值。这些值需要单独存储。

  doc_values 就是用来存储这些字段值的。它是一种存储在磁盘上的列式存储，在文档索引时构建，这使得上述数据访问模式成为可能。

  它们以面向列的方式存储与_source相同的值，这使得排序和聚合效率更高。几乎所有字段类型都支持doc_values，但被分析（analyzed）的字符串字段除外（即text类型字符串，它使用的是field data，默认是关闭的）。

  doc_values默认启用。

- store：

  默认情况下，字段值会被索引使它们能搜索，但它们不会被存储（stored）。意味着可以通过这个字段查询，但不能取回它的原始值。

  但这没有关系。因为字段值已经是`_source`字段的一部分，它是被默认存储的。如果只想取回一个字段或少部分字段的值，而不是整个`_source`，则可以通过source filtering达到目的。

  

通过上面的介绍可以发现，ElasticSearch的schema配置问题被转化成下面四个主要问题：

- 字段是什么类型？
- 字段需不需要被查询？
- 字段需要不要排序和聚合？
- 字段需不需要单独存储？



参考案例：

```json
{
    "test000":{
        "mappings":{
            "test_type":{
                "dynamic":"false",
                "numeric_detection":false,
                "properties":{
                    "agent_id":{
                        "type":"keyword"
                    },
                    "app_info":{
                        "type":"keyword",
                        "doc_values":false,
                        "index":false
                    },
                    "app_name":{
                        "type":"text",
                        "norms":{"enabled": false},
                        "index_options":"freqs" 
                    },
                    "app_version":{
                        "type":"keyword"
                    },
                    "cert_issure":{
                        "type":"keyword"
                    },
                    "city":{
                        "type":"keyword"
                    },
                    "client_ip":{
                        "type":"keyword"
                    }
                }
            }
        }
    }
}
```





**禁用对你来说不需要的特性**

- 默认情况下，ES为大多数的字段建立索引，并添加到doc_values，以便使之可以被搜索和聚合；

- 对于text类型字段，由于涉及到分词、评分以及高亮等机制，相关的索引也需要被添加。

  > 另外，本文的schema是基于ElasticSearch 6.X进行的说明，所以在mapping中有type(test_type)相关的配置，如果是ElasticSearch 7.X及以上版本，将type这一项去掉即可。

- 但是大多数情况下这些属性不需要同时存在，所以禁用不需要的特性就显得十分必要了。下面有几个规则可供参考：

  **通用规则**

  - 减少字段数量，对于不需要建立索引的字段，不写入ES。尤其对于诸如HBase+ES这种索引和存储分离，ES仅做二级索引的场景。

  - 将不需要分词的字段设置为keyword类型；不需要建立索引的字段index属性设置为false。对字段不分词，或者不索引，可以减少很多运算操作，降低CPU占用。尤其是binary类型，默认情况下占用CPU非常高，而这种类型进行分词通常没有什么意义。

  - 减少字段内容长度，如果原始数据的大段内容无须全部建立索引，则可以尽量减少不必要的内容。

  - 使用不同的分析器（analyzer），不同的分析器在索引过程中运算复杂度也有较大的差异。

  **具体规则**

  - 如果某个字段仅需要展示，而不需要用作被搜索的条件，则可以将此字段的index属性设置为false。

    这样针对该字段所有的查询索引都不会被创建，对于系统资源的节省效果明显。参见上面例子中的app_info字段

  - 所有字段都支持doc_values的字段都默认启用了doc_values。如果确定不需要对字段进行排序或聚合，或者从脚本访问字段值，则可以禁用doc_values。

    禁用之后硬盘上的.dvd和.dvm后缀的文件将不会生成，相关的缓存的内存占用也会被节省，对于系统资源的节省效果明显。参见上面例子中的app_info字段

  - text（text类型应该也可以配置，keyword类型默认关闭norms）类型的字段会在索引中存储归一因子（normalizationactors），以便对文档进行评分，如果只需要在文本字段上进行分词匹配，而不关心生成的得分，则可以配置ElasticSearch不将norms写入索引。

    禁用之后硬盘上的.nvd和.nvm后缀的文件将不会生成，相关的缓存的内存占用也会被节省，对于系统资源的节省效果明显。参见上面例子中的app_name字段

  - text类型的字段默认情况下也在索引中存储频率和位置。频率用于计算得分，位置用于执行短语（phrase）查询。在text类型的字段上，index_options的默认值为positions。

    index_options参数用于控制添加到倒排索引中的信息，可选的配置项为：

    - freqs 文档编号和词频被索引，词频用于为搜索评分，重复出现的词条比只出现一次的词条评分更高；
    - positions 文档编号、词频和位置被索引。positions被用于邻近查询（proximity queries）和短语查询（phrase queries）。

    如果不需要运行短语查询，则可以告诉ES不索引位置，即index_options仅配置频率。禁用之后硬盘上的.pos后缀的文件将不会生成，相关的缓存的内存占用也会被节省，对于系统资源的节省效果明显。参见上面例子中的app_name字段

  - 在ElasticSearch 6.x 版本中，数值类型使用的是BKD-Tree 索引数据结构，适合对数值类型进行范围查询；

    如果数值类型只会进行精确查询或者是有限个数的integer，设置成keyword， 使用倒排索引进行查询的效率要高。

    配置之后硬盘上的.dim和.dii后缀的文件将不会生成，相关的缓存的内存占用也会被节省，对于系统资源的节省效果明显。



#### schema管理

对于ElasticSearch的schema管理，尤其是针对按照固定规则管理索引的场景，建议使用template来进行管理。

这样在client端想生成新的索引的时候，只需要按照规则匹配到对应的模板即可。而且模板可以进行优先级设置来满足模板的嵌套，用以实现更复杂的场景和需求。

一个参考通用模板：

```json
{
 
       "template": "*",//模板匹配全部的索引
 
       "order": 0,// 具有最低的优先级，让用户定义的模板有更高的优先级，以覆盖这个模板中的配置
 
       "settings": {
 
              "index.merge.policy.max_merged_segment": "2gb",//大于2g的segment不参与merge
 
              "index.merge.policy.segments_per_tier": "24",//每层分段的数量为24，增加每个segment的大小，减少segment merge的发生的次数
 
              "index.number_of_replicas": "1",//数据1备份，容灾并提升数据查询效率
 
              "index.number_of_shards": "24",//每个index有24个shard，这个数字需要根据数据量进行评估，原则上是尽量的少，毕竟shard过多对Elasticsearch的压力也会增加很多。
 
              "index.optimize_auto_generated_id": "true",//自动生成doc ID
 
              "index.refresh_interval": "30s",//refresh的自动刷新间隔，刷新后数据可以被检索到，根据业务的实时性需求来配置该值
 
              "index.translog.durability": "async",//异步刷新translog
 
              "index.translog.flush_threshold_size": "1024mb",//translog强制flush的大小阈值
 
              "index.translog.sync_interval": "120s",//translog定时刷新的间隔，可以根据需求调节该值
 
              "index.unassigned.node_left.delayed_timeout": "5d"//该配置可以避免某些Rebalancing操作，该操作会带来很大的开销，如果节点离开后马上又回来（如网络不好，重启等），则该开销完全没有必要，所以在集群相对稳定以及运维给力的前提下，尽量增大该值以避免不必要的资源开销
 
       }
       "mappings":{
            "test_type":{
                "dynamic":"false",
                "numeric_detection":false,
                "properties":{
                    "agent_id":{
                        "type":"keyword"
                    },
                    "app_info":{
                        "type":"keyword",
                        "doc_values":false,
                        "index":false
                    },
                    "app_name":{
                        "type":"text",
                        "norms":{"enabled": false},
                        "index_options":"freqs" 
                    },
                    "app_version":{
                        "type":"keyword"
                    },
                    "cert_issure":{
                        "type":"keyword"
                    },
                    "city":{
                        "type":"keyword"
                    },
                    "client_ip":{
                        "type":"keyword"
                    }
                }
            }
        }
}
```

