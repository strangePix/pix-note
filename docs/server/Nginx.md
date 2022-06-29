# 代理服务器-Nginx

高性能http服务器/反向代理服务器。

[Nginx中文官方文档](http://shouce.jb51.net/nginx-doc/)

**应用场景**

- http服务器：网页静态服务器
- 虚拟主机
- 反向代理，负载均衡



## 安装

### Linux

前提：CentOS7，操作用户有root权限

#### yum安装



#### 编译安装

[参考1](https://www.gaoxiaobo.com/web/server/143.html)

**环境**

```shell
#  gcc环境
yum install gcc gcc-c++
#  第三方开发包
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel
#  可能缺少的命令和工具包
yum install -y automake autoconf libtool make
```

应对可能出现的"Unit not found"，提前安装服务epel[^5]（后续证明没什么关系，只是自动安装时会用到）

```shell
yum -y install epel-release
yum clean all && yum makecache
```

**下载**

从[官网](http://nginx.org/en/download.html)将源码包nginx-1.18.0.tar.gz下载下来

**安装**

- 上传到linux系统或者下载

  ```shell
  wget http://nginx.org/download/nginx-1.18.0.tar.gz
  ```

- 解压缩 

  ```shell
  tar -zxvf nginx-1.18.0.tar.gz 
  ```

- 进入目录

  ```shell
  cd nginx-1.18.0
  ```

- 调用configure脚本创建自动化编译文件Makefile（不用编辑文件本身）

  ```shell
  ./configure \
  --with-http_stub_status_module \
  --with-http_gzip_static_module \
  --with-http_ssl_module \
  --with-http_flv_module \
  --with-http_realip_module \
  --with-http_v2_module \
  --user=nginx \
  --group=nginx \
  --with-pcre
  # 查看配置是否成功（0表示没有错误）
  echo $?
  ```

  如图，会自动创建objs目录与Makefile文件

  ![image-20210131172406769](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202204101903749.png)

- 编译&安装

  ```shell
  make && make install
  ```

- 测试安装成功与否

  ```shell
  nginx -v
  ```

- 移动到安装目录，启动nginx

  ```shell
  cd /usr/local/nginx/sbin
  ./nginx
  # 测试启动与否
  curl localhost
  # 监控启动端口 默认80
  netstat -tnlp
  ```

**添加到环境变量**

如果nginx指令不存在，则将其添加到环境变量

```shell
vim /etc/profile
# 编辑配置文件，为PATH后添加:/usr/local/nginx/sbin
source /etc/profile # 使配置生效
```

```shell
# 或者直接新建一个环境变量文件
vim /etc/profile.d/path.sh
export PATH=$PATH:/soft/nginx/sbin
source /etc/profile
```

**创建用户与组**

因为编译时指定了参数，需要有对应用户与组

```shell
# 启动时报错 nginx: [emerg] getpwnam("nginx") failed
groupadd -r nginx
useradd -r nginx -g nginx -s /sbin/nologin -M   # 创建的用户拒绝登录
```

并在安装后修改nginx.conf中的配置

```shell
vim /usr/local/nginx/conf/nginx.conf
# 修改 #user  nobody
# 为user nginx nginx
```

**创建配置目录**

因为编译时指定了部分目录，需要手动创建

```shell
#启动时报错 nginx: [emerg] mkdir() "/var/tmp/nginx/client/" failed (2: No such file or directory) 
#有的可能自动创建，但权限会缺失，所以手动创建
mkdir -p /var/tmp/nginx/client
mkdir /usr/local/nginx/logs
# 诸如此类 随机应变
```



> - configure命令参数解释  [参考](https://blog.csdn.net/wplblog/article/details/113124440)  [官方文档](http://nginx.org/en/docs/configure.html)
>
>   ```shell
>   ./configure \
>   # nginx安装目录，默认/usr/local/nginx   \为换行符，连行书写可省略
>   --prefix=/usr/local/nginx \  
>   # nginx可执行文件（启动脚本）的路径，默认prefix/sbin/nginx
>   --sbin-path=/usr/local/nginx/sbin/nginx \  
>   # nginx.conf配置文件路径，默认prefix/conf/nginx.conf
>   --conf-path=/usr/local/nginx/conf/nginx.conf \  
>   # nginx.pid文件路径名称（存储主进程号），默认prefix/logs/nginx.pid 设置自启的话不能用默认
>   --pid-path=/var/run/nginx/nginx.pid \  
>   # 共享存储器互斥锁文件路径（安装文件锁定，防止误操作），默认prefix/logs/nginx.lock
>   --lock-path=/var/lock/nginx.lock \
>   # 主错误/警告/诊断文件的路径名称，默认prefix/logs/error.log
>   --error-log-path=/var/log/nginx/error.log \
>   # 主请求的HTTP服务器的日志文件的路径名称，默认prefix/logs/access.log
>   --http-log-path=/var/log/nginx/access.log \
>   # nginx工作进程用户名，默认nobody
>   --user=nginx \
>   # nginx工作进程用户组，默认非特权用户
>   --group=nginx \
>   # 启用ngx_http_ssl_module支持（用来支持https请求，需已安装openssl）
>   --with-http_ssl_module \
>   # 启用ngx_http_flv_module支持（提供寻求内存使用基于时间的偏移量文件，流媒体播放）
>   --with-http_flv_module \
>   # 后台Nginx服务器记录原始客户端的IP地址
>   --with-http_realip_module \
>   # 启用ngx_http_stub_status_module支持（获取nginx自上次启动以来的工作状态，监控用）
>   --with-http_stub_status_module \
>   # 启用ngx_http_gzip_static_module支持（在线实时压缩输出数据流，解压模块，需要zlib库）
>   --with-http_gzip_static_module \
>   --with-http_v2_module \
>   # 设定http客户端请求临时文件路径   默认prefix/client_body_temp
>   --http-client-body-temp-path=/var/tmp/nginx/client/ \
>   # 设定http代理临时文件路径
>   --http-proxy-temp-path=/var/tmp/nginx/proxy/ \
>   # 设定http fastcgi临时文件路径
>   --http-fastcgi-temp-path=/var/tmp/nginx/fastcgi/ \
>   # 设定http uwsgi临时文件路径
>   --http-uwsgi-temp-path=/var/tmp/nginx/uwsgi/ \
>   # 设定http scgi临时文件路径
>   --http-scgi-temp-path=/var/tmp/nginx/scgi/ \
>   # 启用pcre库
>   --with-pcre
>   ```
>
> - 查看nginx编译参数：`nginx -V`
>
> - Makefile使用方法[相关文档](https://seisman.github.io/how-to-write-makefile/overview.html)

[^5]: yum的一个软件源,里面包含了许多基本源里没有的软件

### Windows





## 配置开机自启

默认Linux

### 法一（systemctl）

[参考1](https://segmentfault.com/a/1190000022665540) [参考2](https://blog.csdn.net/yuanfangPOET/article/details/90045001)

因为以上安装方式是手动编译安装，所以开机自启文件需要手动创建

- pid-path修改路径，不能设置为/var/run/nginx/nginx.pid。因为CentOS每次重启后，都会删除/var/run目录中的自建目录和文件，从而导致nginx自启动失败。

  补救措施：修改nginx.conf文件将下面一行代码的注释去掉

  ```nginx
  #pid        logs/nginx.pid;
  #这个路径是相对于安装路径的，也可以写成绝对路径/usr/local/nginx/logs/nginx.pid
  ```

  并创建目录 /usr/local/nginx/logs

  ```shell
  mkdir /usr/local/nginx/logs
  ```

- 创建nginx.service文件

  ```shell
  vim /lib/systemd/system/nginx.service
  ```

  内容为

  ```ini
  [Unit]
  Description=The nginx HTTP and reverse proxy server
  After=network.target remote-fs.target nss-lookup.target
    
  [Service]
  Type=forking
  ExecStartPre=/usr/local/nginx/sbin/nginx -t
  ExecStart=/usr/local/nginx/sbin/nginx
  ExecReload=/usr/local/nginx/sbin/nginx -s reload
  ExecStop=/usr/local/nginx/sbin/nginx -s stop
  PrivateTmp=true
    
  [Install]
  WantedBy=multi-user.target
  ```

  > - PIDFile：PID路径，按照编译配置的路径，就在/usr/local/nginx/logs/nginx.pid
  > - ExecStartPre：在执行ExecStart之前的操作，先删除有关nginx的PID也就是停止nginx，然后再检查nginx -t配置文件是否正确
  > - ExecStart：nginx启动操作，按照编译配置的路径，就在/usr/local/nginx/sbin/nginx
  > - ExecReload：nginx重启操作，这里HUP是平滑重启，重新加载配置文件
  > - ExecStop：nginx停止操作，实际是使用了QUIT从容关闭nginx
  > - 控制信号：
  >   - TERM, INT  快速关闭
  >   - QUIT  从容关闭
  >   - HUP  重新配置，从容关闭工作进程，开始新进程
  >   - WINCH 从容关闭工作进程
  > - Nginx 进程分为主进程(master process)和若干工作进程(work process)，其中工作进程指明了nginx要开启的进程数，一般为当前机器总cpu核心数的1到2倍。如，我的机器为双核，那么开4个足够了。

- 设置开机启动

  ```shell
  systemctl enable nginx.service
  ```

- 检查调试

  ```shell
  # 关闭之前开启的nginx并重启
  pkill -9 nginx
  service nginx start
  service nginx status
  #重启机器
  reboot
  #取消自启
  systemctl disable nginx.service
  #查看所有服务
  systemctl list-units --type=service
  ```

  

### 法二（rc.local）

[参考](https://juejin.cn/post/6844903929508020237)

不建议与上一个方法一起使用，会导致启动两次（第二次会失败）

```shell
# 给一个系统文件/etc/rc.d/rc.local 添加一行启动文件，就是nginx的启动程序
echo "/usr/local/nginx/sbin/nginx" >> /etc/rc.d/rc.local
# 赋予这个系统文件执行权限（默认情况没有权限） +x相当于a+x
chmod +x /etc/rc.d/rc.local
```



### 法三

网上很多，类似法二，未经测试 [参考](https://www.nginx.com/resources/wiki/start/topics/examples/redhatnginxinit/)

- 创建文件/etc/init.d/nginx

  ```shell
  vi /etc/init.d/nginx
  ```

  文件内容（注意内置的nginx执行程序以及nginx.conf的位置配置）

  ```bash
  #!/bin/bash
  #
  # nginx - this script starts and stops the nginx daemon
  #
  # chkconfig: - 85 15
  # description: Nginx is an HTTP(S) server, HTTP(S) reverse \
  # proxy and IMAP/POP3 proxy server
  # processname: nginx
  # config: /usr/local/nginx/conf/nginx.conf
  # pidfile: /usr/local/nginx/logs/nginx.pid
  
  # Source function library.
  . /etc/rc.d/init.d/functions
  
  # Source networking configuration.
  . /etc/sysconfig/network
  
  # Check that networking is up.
  [ "$NETWORKING" = "no" ] && exit 0
  
  nginx="/usr/sbin/nginx"
  prog=$(basename $nginx)
  
  NGINX_CONF_FILE="/etc/nginx/nginx.conf"
  
  [ -f /etc/sysconfig/nginx ] && . /etc/sysconfig/nginx
  
  lockfile=/var/lock/subsys/nginx
  
  make_dirs() {
     # make required directories
     user=`$nginx -V 2>&1 | grep "configure arguments:.*--user=" | sed 's/[^*]*--user=\([^ ]*\).*/\1/g' -`
     if [ -n "$user" ]; then
        if [ -z "`grep $user /etc/passwd`" ]; then
           useradd -M -s /bin/nologin $user
        fi
        options=`$nginx -V 2>&1 | grep 'configure arguments:'`
        for opt in $options; do
            if [ `echo $opt | grep '.*-temp-path'` ]; then
                value=`echo $opt | cut -d "=" -f 2`
                if [ ! -d "$value" ]; then
                    # echo "creating" $value
                    mkdir -p $value && chown -R $user $value
                fi
            fi
         done
      fi
  }
  
  start() {
      [ -x $nginx ] || exit 5
      [ -f $NGINX_CONF_FILE ] || exit 6
      make_dirs
      echo -n $"Starting $prog: "
      daemon $nginx -c $NGINX_CONF_FILE
      retval=$?
      echo
      [ $retval -eq 0 ] && touch $lockfile
      return $retval
  }
  
  stop() {
      echo -n $"Stopping $prog: "
      killproc $prog -QUIT
      retval=$?
      echo
      [ $retval -eq 0 ] && rm -f $lockfile
      return $retval
  }
  
  restart() {
      configtest || return $?
      stop
      sleep 1
      start
  }
  
  reload() {
      configtest || return $?
      echo -n $"Reloading $prog: "
      killproc $prog -HUP
      retval=$?
      echo
  }
  
  force_reload() {
        restart
  }
  
  configtest() {
        $nginx -t -c $NGINX_CONF_FILE
  }
  
  rh_status() {
        status $prog
  }
  
  rh_status_q() {
        rh_status >/dev/null 2>&1
  }
  
  case "$1" in
  	start)
  		rh_status_q && exit 0
  		start
  		;;
  	stop)
  		rh_status_q || exit 0
  		$1
  		;;
  	restart|configtest)
  		$1
  		;;
  	reload)
  		rh_status_q || exit 7
  		$1
  		;;
  	force-reload)
  		force_reload
  		;;
  	status)
  		rh_status
  		;;
  	condrestart|try-restart)
  		rh_status_q || exit 0
  			;;
  	*)
  		echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"
  		exit 2
  esac
  ```

- 保存文件后修改文件权限

  ```shell
  chmod a+x /etc/init.d/nginx
  ```

- 将nginx加入chkconfig，设置开机启动

  ```shell
  chkconfig --add /etc/init.d/nginx
  chkconfig nginx on
  # 检查
  chkconfig --list nginx
  ```





## 卸载



### Linux

- 停止nginx，删除自启动

  ```shell
  service nginx stop
  systemctl disable nginx.service
  ```

- 搜索并删除nginx本地文件

  ```shell
  which nginx
  find / -name nginx*
  rm -rf /xxxxx  # 根据搜索结果删除
  ```

- yum卸载

  ```shell
  yum remove nginx
  ```

- 按照安装的方式修改配置的环境变量



## 常用命令

```shell
nginx  #启动nginx   -c 指定配置文件
nginx -s reload|reopen|stop|quit   #重新加载配置|重启|快速停止|安全关闭nginx
nginx -V #查看编译参数
nginx -v #查看版本
nginx -h #帮助
nginx -t #检查nginx.conf语法正确性
service nginx status #查看nginx状态
pkill -9 nginx #杀死nginx进程
```



## 配置文件

#### nginx.conf默认配置文件

```nginx
#全局块
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

#events块
events {
    worker_connections  1024;
}

#http块
http {
    #http全局块
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    #server块
    server {
        #server全局块
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        #location块
        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```

#### 分区功能

- **全局块：**配置影响nginx全局的指令。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。
- **events块：**配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。
- **http块：**可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。
- **server块：**配置虚拟主机的相关参数，一个http中可以有多个server，一个server相当于一个虚拟主机。
- **location块：**配置请求的路由，基于接收到的请求字符串，对特定请求进行处理。



#### 配置详解

[参考1](http://www.netkiller.cn/www/nginx/conf.html)

```nginx
########### 每个指令必须有分号结束。#################
#user nginx nginx;  #配置用户或者组，默认为nobody nobody。
#worker_processes 2;  #允许生成的进程数，默认为1(好像比较适合设为cpu核数的1~2倍)
#pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址，默认/logs/nginx.pid
error_log log/error.log debug;  #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数=连接数*进程数，默认为512
}
http {
    include       mime.types;   #文件扩展名与文件类型映射表
    default_type  application/octet-stream; #默认文件类型，默认为text/plain
    #access_log off; #取消服务日志    
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
    access_log log/access.log myFormat;  #combined为日志格式的默认值
    sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    #开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。
    sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。
    #tcp_nopush     on;  #防止网络阻塞
    #keepalive_timeout  0; #长连接超时时间，单位是秒
    #gzip  on;  #开启gzip压缩输出
    
    upstream mysvr {   
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #热备
    }
    error_page 404 https://www.baidu.com; #错误页
    server {
        keepalive_requests 120; #单连接请求上限次数。
        listen       4545;   #监听端口
        server_name  127.0.0.1;   #监听地址
        
        #charset utf-8; #默认编码
        #access_log  logs/host.access.log  main; #定义本虚拟主机的访问日志
        
        location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
           #root path;  #根目录
           #index vv.txt;  #设置默认页
           proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
           deny 127.0.0.1;  #拒绝的ip
           allow 172.18.5.54; #允许的ip           
        } 
    }
}
```

> - 惊群现象：一个网路连接到来，多个睡眠的进程被同时叫醒，但只有一个进程能获得链接，这样会影响系统性能。
> - 每个指令必须有分号结束。



##### 处理器配置

```nginx
user www;
worker_processes 1;

error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;
```



##### events配置

```nginx
events {
    worker_connections  4096;
}
```



##### http配置

###### 缓冲区相关配置

```nginx
client_body_buffer_size 1K;
client_header_buffer_size 1k;
client_max_body_size 1k;
large_client_header_buffers 2 1k;

server {
  ...
  client_max_body_size 200M;  #上传文件提示client intended to send too large body，配置参数可以解决。
}
```

###### 超时配置

```nginx
client_body_timeout 10;
client_header_timeout 10;
keepalive_timeout 65;
send_timeout 10;
```

###### gzip

```nginx
gzip on;
gzip_min_length 1000;
gzip_buffers 4 8k;
gzip_types text/plain text/css application/json application/x-javascript application/xml;


gzip on;
gzip_http_version 1.0;
gzip_disable "MSIE [1-6].";
gzip_types text/plain application/x-javascript text/css text/javascript;

#gzip压缩类型
# text/html 是 gzip_types 默认值，不要将text/html加入到gzip_types
gzip_types text/plain text/css application/javascript text/javascript application/x-javascript text/xml application/xml application/xml+rss application/json;
```

**CDN支持**

```nginx
# 配置 gzip_proxied any; 后CDN才能识别 gzip
server_tokens off;
gzip on;
gzip_types text/plain text/css application/javascript text/javascript application/x-javascript text/xml application/xml application/xml+rss application/json;
gzip_proxied any;
```

###### server_tokens

```nginx
http {
...
server_tokens off;  #隐藏nginx版本号
...
}
```



##### server

###### listen

```nginx
#绑定IP地址
listen 80; #相当于0.0.0.0:80监听所有接口上的IP地址
listen 192.168.0.1 80;
listen 192.168.0.1:80;
#配置默认主机 default_server
server {
    listen 80;
    server_name acc.example.net;
    ...
}
server {
    listen 80 default_server;
    server_name www.example.org;
    ...
}
```

###### server_name

```nginx
#绑定多个域名
server_name images.example.com img1.example.com img2.example.com;
#使用通配符匹配
server_name *.example.com
server_name www.*;
#正则匹配
server_name ~^(.+)\.example\.com$;
server_name ~^(www\.)?(.+)$;
#匹配所有域名
server_name _;
```

###### location

```nginx
location / {
    root /www;
    index index.html index.htm;
}

#禁止访问特定目录
location ~ /\.ht {
    deny  all;
}
location ~ ^/(config|include)/ {
    deny all;
    break;
}

#引用document_root之外的资源需要 root 绝对路径指向目标文件夹

```





##### Nginx 变量

可用的全局变量

```nginx
$args
$content_length
$content_type
$document_root
$document_uri
$host
$http_user_agent
$http_cookie
$http_referer
$limit_rate
$request_body_file
$request_method
$remote_addr
$remote_port
$remote_user
$request_filename
$request_uri
$query_string
$scheme
$server_protocol
$server_addr
$server_name
$server_port
$uri
```





## 代理



### 配置设置

- 



## 反向代理

### 概念

以代理服务器接收internet的连接请求，然后将请求转发给内部网络的服务器，将服务器返回的结果返回给internet的请求连接的客户端。

**正向代理示意图**

![image-20210131232307675](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202204101904967.png)

**反向代理示意图**

![image-20210131232344311](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202204101904065.png)

### 配置

修改文件：nginx.conf

[参考1](https://www.cnblogs.com/fanzhidongyzby/p/5194895.html)



#### 最简配置

示意：让访问nginx地址http://10.0.0.1:80/my的请求转发到my_server服务地址http://10.0.0.2:8080/

```nginx
# http节点下
upstream my_server {                                                         
    server 10.0.0.2:8080;                                                
    keepalive 2000;
}
server {
    listen       80;                                                         
    server_name  10.0.0.1;                                               
    client_max_body_size 1024M;

    location /my/ {
        proxy_pass http://my_server/;
        proxy_set_header Host $host:$server_port;
    }
}
```


> - 配置参数如果从
>
>   ```nginx
>   proxy_pass http://my_server/;
>   ```
>
>   改为
>
>   ```nginx
>   proxy_pass http://my_server;
>   ```
>
>   则http://10.0.0.1:80/my会转发到http://10.0.0.2:8080/my。这是因为proxy_pass参数中如果不包含url的路径，则会将location的pattern识别的路径作为绝对路径。



#### 重定向报文处理

当服务器进行重定向时，返回的信息会让浏览器发出绕开nginx服务器的访问，所以要配置让nginx能拦截此类请求，修改重定向返回的内容。

```nginx
location /my/ {
    proxy_pass http://my_server;
    proxy_set_header Host $host:$server_port;

	proxy_redirect / /my/;   
}
```

使用proxy_redirect可以修改重定向报文的location字段，

例子中会将所有的根路径下的url代理到nginx的/my/路径下返回给用户，

如服务返回的重定向报文的location原始值为/login，那么经过nginx代理后，用户收到的报文的location字段为/my/login，这样结合之前的配置一定会被nginx反向代理到应用服务器。

**需要注意的是**，服务返回的重定向报文的location字段有时会填写**绝对路径**（包含服务的ip/域名和端口），有时候会填写**相对路径**，此时需要根据实际情况进行甄别：

```nginx
location /my/ {
    proxy_pass http://my_server;
    proxy_set_header Host $host:$server_port;

	proxy_redirect http://my_server/ http://$host:$server_port/my/;
}
```

上述配置便是将my_server服务的根路径下的所有路径代理到nginx地址的/my/路径下



#### 报文数据替换

使用nginx代理有种比较复杂的情况就是http响应报文内写死了服务地址或web绝对路径。写死服务地址的情况比较少见，但也偶尔存在。最棘手的是写死了web绝对路径，尤其是绝对路径都没有公共前缀。

---

举个例子：

一般的web页面会包含如下类似路径：

- /public：用于静态页面资源，如js脚本/public/js，样式表/public/css，图片/public/img等。
- /static：和/public类似。
- /api：用于后台服务API接口。
- /login：用于登录验证。
- 其他。

对于这样的服务，可能的代理配置如下：

```nginx
location /my/ {
    proxy_pass http://my_server/;
    proxy_set_header Host $host:$server_port;

	proxy_redirect / /my/;
}
location /login/ {
    proxy_pass http://my_server/public;
    proxy_set_header Host $host:$server_port;
}
location /public/ {
    proxy_pass http://my_server/public;
    proxy_set_header Host $host:$server_port;
}
location /api/ {
    proxy_pass http://my_server/api;
    proxy_set_header Host $host:$server_port;
}
```

由于web页面或静态资源内写死了类似的绝对路径，那么对于用户来说，通过页面内的链接进行跳转时，都会请求到nginx服务对应的路径上。一旦存在另一个服务也包含类似的路径，也需要nginx进行代理，那么矛盾就出现了：**访问nginx的同一个路径下的请求究竟转发给哪一个服务？**

**解决方案**：在用户收到报文前，将报文的数据中包含的绝对路径都添加统一的前缀，如/my/public，/my/api

```nginx
location /my/ {
    proxy_pass http://my_server/;
    proxy_set_header Host $host:$server_port;

	proxy_redirect / /my/;
}
location /other/ {
    proxy_pass http://other_server/;
    proxy_set_header Host $host:$server_port;

	proxy_redirect / /other/;
}
```

nginx的ngx_http_sub_module模块提供了类似的报文数据替换功能，该模块默认不会安装，需要在编译nginx时添加--with-http_sub_module参数，或者直接下载nginx的[rpm](http://nginx.org/packages/mainline/rhel/6/x86_64/RPMS/)包。

使用sub_filter对数据包进行替换的语法如下：

```nginx
location /my/ {
	proxy_pass http://my_server/;
	proxy_set_header Host $host:$server_port;
	
	sub_filter 'href="/' 'href="/my/';
	sub_filter 'src="/' 'src="/my/';
	sub_filter_types text/html;
	sub_filter_once  off;
}
```

会将/my/下的所有响应报文内容的href="/替换为href="/my/，以及src="/替换为src="/my/，即为所有的绝对路径添加公共前缀。



### 补充配置

[参考](https://www.cnblogs.com/knowledgesea/p/5199046.html)  有错漏待补充

- 当代理遇到状态码为404时，我们把404页面导向百度

  ```nginx
  proxy_intercept_errors on;    #如果被代理服务器返回的状态码为400或者大于400，设置的error_page配置起作用。默认为off。
  error_page 404 https://www.baidu.com; #错误页
  ```

- 代理只允许接受get，post请求方法的一种

  ```nginx
  proxy_method get;    #支持客户端的请求方法。post/get；
  ```

- 避免轮询的服务器无法访问导致用户等待响应

  ```nginx
  proxy_connect_timeout 1;   #nginx服务器与被代理的服务器建立连接的超时时间，默认60秒
  proxy_read_timeout 1; #nginx服务器想被代理服务器组发出read请求后，等待响应的超时间，默认为60秒。
  proxy_send_timeout 1; #nginx服务器想被代理服务器组发出write请求后，等待响应的超时间，默认为60秒。
  proxy_ignore_client_abort on;  #客户端断网时，nginx服务器是否忽略终端对被代理服务器的请求。默认为off。
  ```

- 如果使用upstream指令配置了一组服务器作为被代理服务器，服务器中的访问算法遵循配置的负载均衡规则，同时可以使用该指令配置在发生哪些异常情况时，将请求顺次交由下一组服务器处理。

  ```nginx
  #反向代理upstream中设置的服务器组，出现故障时，被代理服务器返回的状态值。error|timeout|invalid_header|http_500|http_502|http_503|http_504|http_404|off
  proxy_next_upstream timeout;  
  # error：建立连接或向被代理的服务器发送请求或读取响应信息时服务器发生错误。
  # timeout：建立连接，想被代理服务器发送请求或读取响应信息时服务器发生超时。
  # invalid_header:被代理服务器返回的响应头异常。
  # off:无法将请求分发给被代理的服务器。
  # http_400，....:被代理服务器返回的状态码为400，500，502，等。
  ```

- 想通过http获取客户的真实ip而不是代理服务器的ip地址

  ```nginx
  #只要用户在浏览器中访问的域名绑定了 VIP VIP 下面有RS；则就用$host ；host是访问URL中的域名和端口  www.taobao.com:80
  proxy_set_header Host $host; 
  #把源IP 【$remote_addr,建立HTTP连接header里面的信息】赋值给X-Real-IP;这样在代码中 $X-Real-IP来获取 源IP
  proxy_set_header X-Real-IP $remote_addr;  
  #在nginx 作为代理服务器时，设置的IP列表，会把经过的机器ip，代理机器ip都记录下来，用 【，】隔开；代码中用 echo $x-forwarded-for |awk -F, '{print $1}' 来作为源IP
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  ```

  







## 负载均衡

在网络现有结构之上可以提供一种廉价、有效、透明的方法来扩展网络设备和服务器的带宽，并可以在一定程度上增加吞吐量、加强网络数据处理能力、提高网络的灵活性和可用性等。

充当着网络流中“交通指挥官”的角色，

“站在”服务器前处理所有服务器端和客户端之间的请求，从而最大程度地提高响应速率和容量利用率，同时确保任何服务器都没有超负荷工作。

如果单个服务器出现故障，负载均衡的方法会将流量重定向到其余的集群服务器，以保证服务的稳定性。

当新的服务器添加到服务器组后，也可通过负载均衡的方法使其开始自动处理客户端发来的请求。



### 负载均衡常用算法



#### 轮询

轮询为负载均衡中较为基础也较为简单的算法，它不需要配置额外参数。

假设配置文件中共有 **M** 台服务器，该算法遍历服务器节点列表，并按节点次序每轮选择一台服务器处理请求。当所有节点均被调用过一次后，该算法将从第一个节点开始重新一轮遍历。

**特点**

由于该算法中每个请求按时间顺序逐一分配到不同的服务器处理，因此适用于服务器性能相近的集群情况，其中每个服务器承载相同的负载。

但对于服务器性能不同的集群而言，该算法容易引发资源分配不合理等问题。



#### 加权轮询

加权轮询中，客户端的请求按权值比例分配，当一个请求到达时，优先为其分配权值最大的服务器。

每个服务器会有各自的 `weight`，一般情况下，`weight` 的值越大意味着该服务器的性能越好，可以承载更多的请求。

**特点**

加权轮询可以应用于服务器性能不等的集群中，使资源分配更加合理化。



#### IP 哈希

`ip_hash` 依据发出请求的客户端 IP 的 hash 值来分配服务器，该算法可以保证同 IP 发出的请求映射到同一服务器，或者具有相同 hash 值的不同 IP 映射到同一服务器。

**特点**

该算法在一定程度上解决了集群部署环境下 Session 不共享的问题。

> **Session 不共享问题**
>
> 假设用户已经登录过，此时发出的请求被分配到了 A 服务器，但 A 服务器突然宕机，用户的请求则会被转发到 B 服务器。但由于 Session 不共享，B 无法直接读取用户的登录信息来继续执行其他操作。



#### 其他算法

- URL hash

  `url_hash` 是根据请求的 URL 的 hash 值来分配服务器。该算法的特点是，相同 URL 的请求会分配给固定的服务器，当存在缓存的时候，效率一般较高。然而 Nginx 默认不支持这种负载均衡算法，需要依赖第三方库。

- 最小连接数

  当有新的请求出现时，遍历服务器节点列表并选取其中连接数最小的一台服务器来响应当前请求。连接数可以理解为当前处理的请求数。



### 初步应用配置

修改nginx.conf配置

nginx服务器端口为80，然后假设你的工作服务器有三个，端口分别为8081,8082,8083

```nginx
upstream testServer {
  server localhost:8081 weight=10;
  server localhost:8082 weight=2;
  server localhost:8083;
}

server {
    listen       80;
    server_name  localhost;

    location / {
        root   html;
        index  index.html index.htm;
        proxy_pass http://testServer;
    }
}
```

多次刷新可以发现，由于设置了不同的 `weight`，端口号为 8081 的服务器出现的次数最多。



### 实战补充



#### 热备

如果你有2台服务器，当一台服务器发生事故时，才启用第二台服务器给提供服务。服务器处理请求的顺序：AAAAAA突然A挂啦，BBBBBBBBBBBBBB.....

```nginx
upstream mysvr { 
    server 127.0.0.1:7878; 
    server 192.168.10.121:3333 backup;  #热备     
}
```



#### 轮询

nginx默认就是轮询其权重都默认为1，服务器处理请求的顺序：ABABABABAB....

```nginx
upstream mysvr { 
    server 127.0.0.1:7878;
    server 192.168.10.121:3333;       
}
```



#### 加权轮询

跟据配置的权重的大小而分发给不同服务器不同数量的请求。如果不设置，则默认为1。下面服务器的请求顺序为：ABBABBABBABBABB....

```nginx
upstream mysvr { 
    server 127.0.0.1:7878 weight=1;
    server 192.168.10.121:3333 weight=2;
}
```



#### ip_hash

nginx会让相同的客户端ip请求相同的服务器。

```nginx
upstream mysvr { 
    server 127.0.0.1:7878; 
    server 192.168.10.121:3333;
    ip_hash;
}
```



#### 相关状态参数

- down  表示当前的server暂时不参与负载均衡。
- backup  预留的备份机器。当其他所有的非backup机器出现故障或者忙的时候，才会请求backup机器，因此这台机器的压力最轻。
- max_fails  允许请求失败的次数，默认为1。当超过最大次数时，返回proxy_next_upstream 模块定义的错误。
- fail_timeout  在经历了max_fails次失败后，暂停服务的时间。max_fails可以和fail_timeout一起使用。

```nginx
upstream mysvr { 
    server 127.0.0.1:7878 weight=2 max_fails=2 fail_timeout=2;
    server 192.168.10.121:3333 weight=1 max_fails=2 fail_timeout=1;    
}
```

