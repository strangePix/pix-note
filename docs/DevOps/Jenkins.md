# Jenkins







## 安装

### Docker方式

- 拉取镜像

  ```sh
  docker pull jenkins/jenkins:lts
  ```

  > Jenkins版本：
  >
  > - LTS：稳定版，一般选择该版本
  > - Weekly：周更

- 启动容器

  ```sh
  docker run -d -v jenkins_home:/var/jenkins_home -p 8080:8080 -p 50000:50000 --restart=on-failure jenkins/jenkins:lts
  ```

  > 有时候映射目录找不到可以用绝对路径 -v /var/jenkins_home:/var/jenkins_home
  >
  > 前者是宿主机路径，但为了保证jenkins有权限操作，建议给其用户或者所有用户授予权限。
  >
  > ```sh
  > chmod 777 /var/jenkins_home
  > ```

- 进入容器查看初始密码

  ```sh
  docker exec <容器名称或ID> cat /var/jenkins_home/secrets/initialAdminPassword
  ```

- 访问本地8080端口：http://localhost:8080

  输入初始密码

  ![image-20230721105132134](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202307211051412.png)

- 先选择推荐插件安装，等待安装完成

  ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1290661caa4d4e2286288dd530ff6703~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

  ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50046f3ada1845f5adea9cb5f8ca6ee4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- 安装完成后，创建一个用户

  ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a4d76c54dc24753a5c6ff7d714afd15~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

  

## 配置镜像加速

插件安装失败，可以考虑配置镜像加速

```sh
# 停止myjenkins容器
$ docker stop myjenkins 
# 进入挂载文件夹
$ cd /var/jenkins_home/
# 编辑配置文件
$ vim  hudson.model.UpdateCenter.xml
# 修改为url的值为清华大学官方镜像地址:
# https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
# 启动myjenkins容器
$ docker start myjenkins
```

![需要修改的配置文件](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d41ff02307dc48ec94ea00e0f29ff066~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)