# logback：Java日志框架

[参考](https://logback.qos.ch/manual/layouts.html#conversionWord)



## logback-spring.xml配置

### 彩色日志配置

#### 默认颜色支持

现有的日志格式已经支持部分颜色配置，通过`%color`实现，包括：

- black

- red/blodRed

- green/blodGreen

- yellow/blodYellow

- blue/blodBlue

- magenta/blodMagenta

- cyan/blodCyan

- white/blodWhite

- gray

- highlight

  用粗体红色表示ERROR，红色表示WARN，蓝色表示INFO，默认颜色表示其他

通过写在字段之前，括住被修饰的文本：

```xml
<pattern>[%thread] %highlight(%-5level) %cyan(%logger{15}) - %msg %n</pattern>
```

![image-20220808112150556](https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/202208081121713.png)

#### 配置颜色转换器

应该是老版的，引入已实现的颜色转换器

```xml
<conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter" />
```

然后通过`%clr(日志内容){颜色}`给日志部分文字设置颜色：

```xml
<!-- %clr(日志内容){颜色}  -->
<pattern>%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){green}</pattern>
```

支持的颜色：

- blue 蓝色
- cyan 青色
- faint 无色/白色
- green 绿色
- magenta 品红（紫色）
- red 红色
- yellow 黄色