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
  > # 编辑 /etc/sysctl.conf 内容  修改或追加
  > vm.max_map_count=262144
  > # 保存后重载配置 再启动es
  > sysctl  -p
  > ```

- 保存密码和令牌，在第一次启动的控制台能看到。

  ![image-20220909154255845](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202209091542461.png)

  ```bash
  # 如
  # elastic用户的password : OQBJwYbC+20CuSo7NjT_
  # HTTP CA certificate SHA-256 fingerprint : bb89cd1bbee81203790d133f41f1ed63bb4448cb81690084c376b97e32c678bd
  # Configure Kibana to use this cluster : eyJ2ZXIiOiI4LjQuMSIsImFkciI6WyIxNzIuMTguMC4yOjkyMDAiXSwiZmdyIjoiYmI4OWNkMWJiZWU4MTIwMzc5MGQxMzNmNDFmMWVkNjNiYjQ0NDhjYjgxNjkwMDg0YzM3NmI5N2UzMmM2NzhiZCIsImtleSI6InN1eEJJWU1CajlqZlJCQmQ1QktSOkI5Z3h6VWdrU3BhMGhSc1hvbFdUTncifQ==
  # 有效期只有30分钟过期需要重新生成
  # Configure other nodes to join this cluster eyJ2ZXIiOiI4LjQuMSIsImFkciI6WyIxNzIuMTguMC4yOjkyMDAiXSwiZmdyIjoiYmI4OWNkMWJiZWU4MTIwMzc5MGQxMzNmNDFmMWVkNjNiYjQ0NDhjYjgxNjkwMDg0YzM3NmI5N2UzMmM2NzhiZCIsImtleSI6InNPeEJJWU1CajlqZlJCQmQ1QktJOlBWU2N6ajF0Umg2VlA0ZlNQRklESEEifQ==
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

#### 安装Kibana

- 拉取镜像，版本号与es一致

  ```bash
  docker pull docker.elastic.co/kibana/kibana:8.4.1
  ```

- 启动容器

  ```bash
  docker run --name kib-01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.4.1
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
> 



#### 安装中文分词

首先版本与es保持一致即可。





## 初步使用





