

# MyBatis



## PageHelper-分页查询





## 通用Mapper

使用MyBatis需要书写大量sql到xml文件，除开特殊的业务逻辑sql外，还有大量结构类似的增删改查，但随着数据库结构的改动，对应实体类和sql都要修改，工作量与效率的差距会体现出来。

[参考1](https://gitee.com/free/Mapper)  [wiki](https://github.com/abel533/Mapper/wiki)   [参考2](https://mapperhelper.github.io/docs/)



### 作用

基于MyBatis的插件，解决单表增删改查，开发人员不需要编写sql，不需要在DAO增加方法，写好实体类就能支持相应的增删改查方法。



### 使用

#### 实体类写法

- 实体类所有字段都会作为表中字段操作，实体类字段数>=数据库表字段数，额外字段添加`@Transient`注解
- 表名默认使用类名，驼峰转下划线，如`UserInfo`对应的表名为`user_info`
- 对于不符合上条规律的，表名可以使用`@Table(name = "tableName")`进行指定
- 字段默认均为表字段（除了简单类型），默认驼峰转下划线，可以使用`@Column(name = "fieldName")`进行指定
- `@Id`指定作为主键的字段，自增主键使用`@KeySql(useGeneratedKeys = true)`，每个实体类至少一个
- Mysql自增字段使用`@GeneratedValue(generator = "JDBC")`

```java
@Table(name = "test_table")
public class TestTableVO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "JDBC")
    private Long id;

    @Transient
    private String userId;

    private String name;

    private Timestamp createTime;

    private String createUserId;

    private Timestamp updateTime;

    private String updateUserId;

    private Integer isDelete;
    
    // 省略get、set...
    
}
```

> - 新增的`@KeySql` 注解用于替换 `@GeneratedValue` 注解，因此 `@KeySql` 能以更简单方式实现原来的功能：
>   - Mysql和SqlServer下自增主键策略`@KeySql(useGeneratedKeys = true)`与`@GeneratedValue(generator = "JDBC")`两者等价
>   - SqlServer 中使用时，需要设置 id 的 `insertable=false`

#### DAO写法

在传统的Mybatis写法中，DAO 接口需要与 Mapper 文件关联，即需要编写 SQL 来实现 DAO 接口中的方法。而在通用Mapper 中，DAO 只需要继承一个通用接口，即可拥有丰富的方法。

```java
//指定泛型为实体类
public interface TestTableDao extends Mapper<TestTableVO> {
}
```

继承的通用方法见 [通用方法](#通用方法)

**添加自定义方法**

注解方式：

```java
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

public interface CountryMapper extends Mapper<Country> {
    @Select("select * from country where countryname = #{countryname}")
    Country selectByCountryName(String countryname);
}
```

XML配置：

```xml
<!-- 在对应***Mapper.xml文件中 -->
<mapper namespace="tk.mybatis.sample.mapper.CountryMapper">
    <select id="selectByCountryName" resultType="tk.mybatis.model.Country">
        select * from country where countryname = #{countryname}
    </select>
</mapper>
```

> 自定义方法不能与通用方法同名。



#### SSM集成

[参考](https://github.com/abel533/Mapper/wiki/1.2-spring)

**Maven依赖**

```xml
<!--mybatis-->
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>版本号</version>
</dependency>
<!-- 通用Mapper -->
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper</artifactId>
    <version>版本号</version>
</dependency>
```

> - 版本号查询：http://mvnrepository.com/artifact/org.mybatis/mybatis
> - 通用 Mapper 版本号查询：http://mvnrepository.com/artifact/tk.mybatis/mapper



**XML配置**

使用`tk.mybatis.spring.mapper.MapperScannerConfigurer`替换原来Mybatis的`org.mybatis.spring.mapper.MapperScannerConfigurer`

```xml
<!-- 通用 Mapper -->
<bean class="tk.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="com.***.mapper"/>
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
    <property name="properties">
        <value>
            参数名=值
            参数名2=值2
            ...
        </value>
    </property>
</bean>
```





**注解配置**

使用`@MapperScan`注解，并确认所属包为`tk.mybatis.spring.annotation.MapperScan`而非官方包。

```java
//properties 一行一个配置
@Configuration
@MapperScan(value = "tk.mybatis.mapper.annotation",
    properties = {
            "mappers=tk.mybatis.mapper.common.Mapper",
            "notEmpty=true"
    }
)
public class MyBatisConfigProperties {}

//mapperHelperRef 直接配置一个bean，优先级更高，二选一即可
@Configuration
@MapperScan(value = "tk.mybatis.mapper.annotation", mapperHelperRef = "mapperHelper")
public static class MyBatisConfigRef {
    //其他
 
    @Bean
    public MapperHelper mapperHelper() {
        Config config = new Config();
        List<Class> mappers = new ArrayList<Class>();
        mappers.add(Mapper.class);
        config.setMappers(mappers);

        MapperHelper mapperHelper = new MapperHelper();
        mapperHelper.setConfig(config);
        return mapperHelper;
    }
}

//这种配官方/tk均可
@Configuration
@MapperScan(value = "tk.mybatis.mapper.annotation")
public static class MyBatisConfigRef {

    @Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());
        //tk.mybatis.mapper.session.Configuration
        Configuration configuration = new Configuration();
        //可以对 MapperHelper 进行配置后 set
        configuration.setMapperHelper(new MapperHelper());
        //设置为 tk 提供的 Configuration
        sessionFactory.setConfiguration(configuration);
        return sessionFactory.getObject();
    }
}
```



#### SpringBoot集成

**Maven依赖**

```xml
<!--mybatis-->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>1.3.1</version>
</dependency>
<!--mapper-->
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper-spring-boot-starter</artifactId>
    <version>版本号</version>
</dependency>
```

> - 版本号：http://mvnrepository.com/artifact/tk.mybatis/mapper-spring-boot-starter 

**application.yml配置**

```yaml
mapper:
	mappers: 
		- tk.mybatis.mapper.common.Mapper
		- tk.mybatis.mapper.common.Mapper2
	not-empty: false
	identity: MYSQL
```

##### `@MapperScan` 注解配置

如果没有使用 `@MapperScan` 注解，则需要为接口添加`@Mapper`注解。

而`@MapperScan`添加在`@Configuration`的类上，或者SpringBoot启动类上：

```java
//这里使用的 tk.mybatis.spring.annotation.MapperScan 
@tk.mybatis.spring.annotation.MapperScan(basePackages = "扫描包")
@SpringBootApplication
public class SampleMapperApplication implements CommandLineRunner {}
```



### 通用方法

##### Select

| 方法                                | 说明                               |
| :---------------------------------- | ---------------------------------- |
| `List<T> select(T record);`         | 根据实体属性值查询，等于条件       |
| `T selectByPrimaryKey(Object key);` | 根据主键字段查询                   |
| `List<T> selectAll();`              | 查询全部结果                       |
| `T selectOne(T record);`            | 根据实体属性值查询，只有一个返回值 |
| `int selectCount(T record);`        | 根据实体属性值查询总数             |

```java
TestTableVO vo = new TestTableVO();
vo.setId(123L);
TestTableVO result = testTableDao.selectOne(vo);
```



##### Insert

| 方法                             | 说明                                             |
| -------------------------------- | ------------------------------------------------ |
| `int insert(T record);`          | 保存一个实体，保存null属性（不使用数据库默认值） |
| `int insertSelective(T record);` | 保存一个实体，null属性使用数据库默认值           |

```java
TestTableVO vo = new TestTableVO();
// 省略为vo设置属性...
int row = testTableDao.insertSelective(vo);
```



##### Delete

| 方法                                  | 说明                           |
| ------------------------------------- | ------------------------------ |
| `int delete(T record);`               | 根据实体属性进行删除，等于条件 |
| `int deleteByPrimaryKey(Object key);` | 根据主键字段进行删除           |

```java
TestTableVO vo = new TestTableVO();
// 省略为vo设置属性...
int row = testTableDao.delete(vo);
```



##### Update

| 方法                                         | 说明                             |
| -------------------------------------------- | -------------------------------- |
| `int updateByPrimaryKey(T record);`          | 根据主键更新全部字段，包括null值 |
| `int updateByPrimaryKeySelective(T record);` | 根据主键更新不为null的字段       |

```java
TestTableVO vo = new TestTableVO();
// 省略为vo设置属性...
int row = testTableDao.updateByPrimaryKeySelective(vo);
```



##### Example

| 方法                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `List<T> selectByExample(Object example);`                   | 根据Example条件进行查询                                      |
| `int selectCountByExample(Object example);`                  | 根据Example条件进行查询总数                                  |
| `int updateByExample(@Param("record") T record, @Param("example") Object example);` | 根据Example条件更新实体`record`包含的全部属性，null值会被更新 |
| `int updateByExampleSelective(@Param("record") T record, @Param("example") Object example);` | 根据Example条件更新实体`record`包含的不是null的属性值        |
| `int deleteByExample(Object example);`                       | 根据Example条件删除数据                                      |

```java
//条件查询
// 创建Example
Example example = new Example(TestTableVO.class);
// 创建Criteria
Example.Criteria criteria = example.createCriteria();
// 添加条件
criteria.andEqualTo("isDelete", 0);
criteria.andLike("name", "%abc123%");
List<TestTableVO> list = testTableDao.selectByExample(example);
```



### Example用法

使用Example的方法有两大类，一个参数/两个参数，如：

```java
List<T> selectByExample(Object example);

int updateByExampleSelective(@Param("record") T record, @Param("example") Object example);
```



#### 通用Example

由Mapper提供，需要手动设置属性名，并提供额外方法。

##### 查询

```java
Example example = new Example(Country.class);
example.setForUpdate(true);
example.createCriteria().andGreaterThan("id", 100).andLessThan("id",151);
example.or().andLessThan("id", 41);
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT id,countryname,countrycode FROM country WHERE ( id > ? and id < ? ) or ( id < ? ) ORDER BY id desc FOR UPDATE 
```



##### 动态SQL

```java
Example example = new Example(Country.class);
Example.Criteria criteria = example.createCriteria();
if(query.getCountryname() != null){
    criteria.andLike("countryname", query.getCountryname() + "%");
}
if(query.getId() != null){
    criteria.andGreaterThan("id", query.getId());
}
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT id,countryname,countrycode FROM country WHERE ( countryname like ? ) ORDER BY id desc 
-- 参数?为China%
```



##### 排序

```java
Example example = new Example(Country.class);
example.orderBy("id").desc().orderBy("countryname").orderBy("countrycode").asc();
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT id,countryname,countrycode FROM country order by id DESC,countryname,countrycode ASC 
```



##### 去重

```java
CountryExample example = new CountryExample();
//设置 distinct
example.setDistinct(true);
example.createCriteria().andCountrynameLike("A%");
example.or().andIdGreaterThan(100);
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT distinct id,countryname,countrycode FROM country WHERE ( countryname like ? ) or ( Id > ? ) ORDER BY id desc 
-- 参数为A%和100
```



##### 查询

```java
Example example = new Example(Country.class);
example.selectProperties("id", "countryname");
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT id , countryname FROM country ORDER BY id desc 
```



#### Example.builder方式

```java
Example example = Example.builder(Country.class)
        .select("countryname")
        .where(Sqls.custom().andGreaterThan("id", 100))
        .orderByAsc("countrycode")
        .forUpdate()
        .build();
List<Country> countries = mapper.selectByExample(example);
```

生成sql

```sql
SELECT countryname FROM country WHERE ( id > ? ) order by countrycode Asc FOR UPDATE
```







## Mybatis Generator(MBG)

[参考](http://mybatis.org/generator/)   [中文文档](http://docs.flycloud.me/docs/MBG/index.html)

MyBatis官方提供的代码生成器



### MBG配置

- **Maven依赖** 

  ```xml
  <!-- https://mvnrepository.com/artifact/org.mybatis.generator/mybatis-generator-core -->
  <dependency>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-core</artifactId>
      <version></version>
  </dependency>
  
  <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
  <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version></version>
  </dependency>
  ```

- **resource目录下的generator.properties**

  ```properties
  jdbc.driver=com.mysql.jdbc.Driver
  jdbc.url=jdbc:mysql://8.136.120.34:3306/st-mall?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
  jdbc.username=root
  jdbc.password=123456
  ```

- **resource目录下的generatorConfig.xml**

  [配置参考](https://my.oschina.net/u/2474629/blog/840471)

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE generatorConfiguration
          PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
          "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
  <generatorConfiguration>
      <!-- 引入数据库连接配置 -->
      <properties resource="generator.properties"/>
      <!-- defaultModelType设为flat，即一张表只生成一个实体类 -->
      <context id="MySqlContext" targetRuntime="MyBatis3" defaultModelType="flat">
          <property name="beginningDelimiter" value="`"/>
          <property name="endingDelimiter" value="`"/>
          <!-- 生成的Java文件的编码-->
      	<property name="javaFileEncoding" value="UTF-8"/>
          <!-- 为生成的Java模型创建一个toString方法 -->
          <plugin type="org.mybatis.generator.plugins.ToStringPlugin" />
          <!-- 为模型生成序列化方法-->
          <plugin type="org.mybatis.generator.plugins.SerializablePlugin" />
          <!--生成mapper.xml时覆盖原文件 1.3.7后可用-->
  		<plugin type="org.mybatis.generator.plugins.UnmergeableXmlMappersPlugin" />
          <!-- 自定义的注释规则，继承 DefaultCommentGenerator 重写 一些方法 -->
          <commentGenerator type="com.st.tiny1.mbg.CommentGenerator">
              <!-- 是否去除自动生成日期的注释 true：是  避免重复提交 -->
              <property name="suppressDate" value="true"/>
              <!-- 是否去除所有自动生成的注释 true：是 ： false:否 -->
              <property name="suppressAllComments" value="true"/>
              <!-- 自定义插件 -->
              <property name="addRemarkComments" value="true"/>
          </commentGenerator>
          <jdbcConnection driverClass="${jdbc.driver}" connectionURL="${jdbc.url}"
                          userId="${jdbc.username}"
                          password="${jdbc.password}">
              <!--解决表注释无法获取的问题 -->
              <property name="useInformationSchema" value="true" /> 
              <!--解决mysql驱动升级到8.0后不生成指定数据库代码的问题-->
  			<property name="nullCatalogMeansCurrent" value="true" />
          </jdbcConnection>
          <!-- 默认false，把JDBC DECIMAL 和 NUMERIC 类型按长度解析为不同类型，为 true时把JDBC DECIMAL 和 
              NUMERIC 类型稳定解析为java.math.BigDecimal -->
          <!--
                  默认情况下的转换规则为：
                      如果精度>0或者长度>18，就会使用java.math.BigDecimal
                      如果精度=0并且10<=长度<=18，就会使用java.lang.Long
                      如果精度=0并且5<=长度<=9，就会使用java.lang.Integer
                      如果精度=0并且长度<5，就会使用java.lang.Short
          -->
          <javaTypeResolver>
  			<property name="forceBigDecimals" value="false" />
  		</javaTypeResolver>
          <!--生成entity类存放位置-->
          <javaModelGenerator targetPackage="包名（com.st.tiny1.mbg.model）" targetProject="项目地址到\java （tiny1\src\main\java）">
              <!-- 对数据库查询结果进行trim操作 -->
              <property name="trimStrings" value="true" />
              <!-- 针对 oracle 数据库的一个配置，是否把 schema 作为字包名 -->
              <property name="enableSubPackages" value="false" />
          </javaModelGenerator>
          <!--生成映射文件Mapper.xml存放位置-->
          <sqlMapGenerator targetPackage="包名（com.st.tiny1.mbg.mapper）" targetProject="项目地址到\resources （tiny1\src\main\resources）">
          </sqlMapGenerator>
          <!--生成Dao接口存放位置 type设为XML方便分离维护-->
          <javaClientGenerator type="XMLMAPPER" targetPackage="包名（om.st.tiny1.mbg.mapper）"
                               targetProject="项目地址到\java （tiny1\src\main\java）">
          </javaClientGenerator>
          <!--指定数据库表，%为生成全部表-->
  		<table tableName="%">
              <!-- 自动生成主键策略，这里设为mysql的方式方便插入后获取主键id -->
  			<generatedKey column="id" sqlStatement="MySql" identity="true"/>
  		</table>
      </context>
  </generatorConfiguration>
  ```

- **自定义的注释配置类CommentGenerator**

  ```java
  package com.st.tiny1.mbg;
  
  import org.mybatis.generator.api.IntrospectedColumn;
  import org.mybatis.generator.api.IntrospectedTable;
  import org.mybatis.generator.api.dom.java.CompilationUnit;
  import org.mybatis.generator.api.dom.java.Field;
  import org.mybatis.generator.api.dom.java.FullyQualifiedJavaType;
  import org.mybatis.generator.api.dom.java.TopLevelClass;
  import org.mybatis.generator.internal.DefaultCommentGenerator;
  import org.mybatis.generator.internal.util.StringUtility;
  
  import java.util.Properties;
  
  /**
   * @program: st-mall
   * @description: 自定义注释生成
   * @author: Pix
   * @create: 2021-02-18 16:21
   */
  public class CommentGenerator extends DefaultCommentGenerator {
  
  	private boolean addRemarkComments = false;
  	private static final String EXAMPLE_SUFFIX = "Example";
  	private static final String API_MODEL_PROPERTY_FULL_CLASS_NAME = "io.swagger.annotations.ApiModelProperty";
  	private static final String LINE_SEPARATOR = System.getProperty("line.separator");
  
  
  	/**
  	 * 设置用户配置的参数
  	 */
  	@Override
  	public void addConfigurationProperties(Properties properties) {
  		super.addConfigurationProperties(properties);
  		this.addRemarkComments = StringUtility.isTrue(properties.getProperty("addRemarkComments"));
  	}
  
  	/**
  	 * 实体类注释
  	 */
  	@Override
  	public void addModelClassComment(TopLevelClass topLevelClass, IntrospectedTable introspectedTable) {
  		if (addRemarkComments) {
  			topLevelClass.addJavaDocLine("/**");
  			topLevelClass.addJavaDocLine(" * 这是MyBatis Generator自动生成的Model Class.");
  
  			StringBuilder sb = new StringBuilder();
  			sb.append(" * @Title ");
  			sb.append(introspectedTable.getFullyQualifiedTable());
  			sb.append("表的实体类");
  			topLevelClass.addJavaDocLine(sb.toString().replace(LINE_SEPARATOR, " "));
  			String tableRemarks = introspectedTable.getRemarks();
  			if (StringUtility.stringHasValue(tableRemarks)) {
  				sb.setLength(0);
  				sb.append(" * @Description ");
  				sb.append(introspectedTable.getRemarks());
  				topLevelClass.addJavaDocLine(sb.toString());
  			}
  			//topLevelClass.addJavaDocLine(" * @Author "+System.getProperties().getProperty("user.name").toString());
  			//topLevelClass.addJavaDocLine(" * @Date "+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
  			topLevelClass.addJavaDocLine(" */");
  		}
  	}
  
  	/**
  	 * 实体类字段注释
  	 */
  	public void addFieldComment(Field field, IntrospectedTable introspectedTable,
  								IntrospectedColumn introspectedColumn) {
  		String remarks = introspectedColumn.getRemarks();
  		if (addRemarkComments && StringUtility.stringHasValue(remarks)) {
  
  			addFieldJavaDoc(field, remarks);
  			//数据库中特殊字符需要转义 防止添加注解时格式出错
  			if (remarks.contains("\"")) {
  				remarks = remarks.replace("\"", "'");
  			}
  			//给model的字段添加swagger注解
  			//field.addJavaDocLine("@ApiModelProperty(value = \"" + remarks + "\")");
  		}
  
  	}
  
  	/**
  	 * 给model的字段添加注释
  	 */
  	private void addFieldJavaDoc(Field field, String remarks) {
  		if (addRemarkComments) {
  			field.addJavaDocLine("/**");
  			StringBuilder sb = new StringBuilder();
  			sb.append(" * @Fields ");
  			sb.append(field.getName());
  			sb.append(" ");
  			//获取数据库字段的备注信息
  			sb.append(remarks);
  			field.addJavaDocLine(sb.toString().replace(LINE_SEPARATOR, " "));
  			//添加一个插件生成的标志 @mbg.generated
  			//addJavadocTag(field, false);
  			field.addJavaDocLine(" */");
  		}
  	}
  
  
  	/**
  	 *    java文件加注释
  	 */
  	@Override
  	public void addJavaFileComment(CompilationUnit compilationUnit) {
  		super.addJavaFileComment(compilationUnit);
  		//在实体类中添加swagger注解类的导入，不用swagger注解就不用
  		/*if (!compilationUnit.isJavaInterface() && !compilationUnit.getType().getFullyQualifiedName().contains(EXAMPLE_SUFFIX)) {
  			compilationUnit.addImportedType(new FullyQualifiedJavaType(API_MODEL_PROPERTY_FULL_CLASS_NAME));
  		}*/
  	}
  }
  ```

  > - 如果类注释里的表注释没有生成（`@Description`部分），可修改 `generatorConfig.xml`文件`<jdbcConnection>`属性
  >
  >   ```xml
  >   <jdbcConnection driverClass="com.mysql.jdbc.Driver" connectionURL="jdbc:mysql://127.0.0.1:3306/thirties" userId="thirties" password="password">
  >   <!-- 新增下面这个属性-->
  >           <property name="useInformationSchema" value="true" /> 
  >   </jdbcConnection>  
  >   ```
  >
  >   已经在之前的配置文件中写好。
  >
  >   或者直接在url地址加上`useInformationSchema=true`
  >
  > - 如果中文注释乱码，可以考虑数据库地址添加编码`useUnicode=true&characterEncoding=数据库编码`

### 生成

- **java程序生成**

  运行main方法

  ```java
  public class Generator {
  
      public static void main(String[] args) throws Exception{
          //MBG 执行过程中的警告信息
          List<String> warnings = new ArrayList<String>();
          //当生成的代码重复时，覆盖原代码
          boolean overwrite = true;
          //读取 MBG 配置文件
          InputStream configFile = Generator.class.getResourceAsStream("/generatorConfig.xml");
          ConfigurationParser cp = new ConfigurationParser(warnings);
          Configuration config = cp.parseConfiguration(configFile);
          DefaultShellCallback callback = new DefaultShellCallback(overwrite);
          //创建 MBG
          MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
          //执行生成代码
          myBatisGenerator.generate(null);
          //输出警告信息
          for (String warning : warnings) {
              System.out.println(warning);
          }
      }
  }
  ```

- **maven plugin插件生成**

  引入maven插件

  ```xml
  <build>
      ...
      <plugins>
          ...
          <plugin>
              <groupId>org.mybatis.generator</groupId>
              <artifactId>mybatis-generator-maven-plugin</artifactId>
              <version>1.3.0</version>
              <configuration>
                  <configurationFile>/src/.../generatorConfig.xml</configurationFile>
              </configuration>
          </plugin>
          ...
      </plugins>
      ...
  </build>
  ```

  在插件栏找到插件，运行generate

  <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210220215021172.png" alt="image-20210220215021172" style="zoom:50%;" />

  > - **问题一：generate failed: Exception getting JDBC Driver**
  >
  >   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210220223023228.png" alt="image-20210220223023228" style="zoom:50%;" />
  >
  >   原因：generatorConfig.xml没有配置`<classPathEntry location=""/>`即数据库包的位置
  >
  >   解决方式：
  >
  >   - generatorConfig.xml配置`<classPathEntry location=""/>`
  >
  >   - 或者在插件处为其添加专属依赖
  >
  >     ```xml
  >     <plugin>
  >         <groupId>org.mybatis.generator</groupId>
  >         <artifactId>mybatis-generator-maven-plugin</artifactId>
  >         <version>1.3.2</version>
  >         <configuration>
  >             <!--MyBaits-generator的配置文件generatorConfig.xml的位置-->
  >     		<configurationFile>${basedir}/src/main/resources/generatorConfig.xml
  >             </configurationFile>
  >             <!--是否覆盖同名文件（只是针对XML文件,java文件生成类似*.java.2形式的文件）-->
  >             <verbose>true</verbose>
  >             <!--是否将生成过程输出至控制台-->
  >             <overwrite>true</overwrite>
  >         </configuration>
  >         <dependencies>
  >             <dependency>
  >                 <groupId>mysql</groupId>
  >                 <artifactId>mysql-connector-java</artifactId>
  >                 <version>${mysql.version}</version>
  >             </dependency>
  >         </dependencies>
  >     </plugin>
  >     ```
  >
  > - **问题二：generate failed: Cannot instantiate object of type ...**
  >
  >   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210220231700808.png" alt="image-20210220231700808" style="zoom:50%;" />
  >
  >   原因：generatorConfig.xml中配置了自定义类（如注释配置类CommentGenerator），插件的classpath和项目的classpath不同，所以无法找到。
  >
  >   解决方式：
  >
  >   - 将自己写的配置类封装为jar包，保存在本地maven库，同上问题方法一样作为依赖引入
  >   - 或者采用手动生成，毕竟只要一有自定义配置类就要加入maven仓库，不值得。
  >
  > - **问题三：The specified target project directory ...\resources does not exist**
  >
  >   <img src="https://strangest.oss-cn-shanghai.aliyuncs.com/markdown/image-20210221003255319.png" alt="image-20210221003255319" style="zoom:50%;" />
  >
  >   原因：配置的文件生成路径插件无法找到，或者移动模块后无法找到
  >
  >   解决方式：
  >
  >   - 修改generatorConfig.xml中三个节点(`<javaModelGenerator><sqlMapGenerator><jacaClientGenerator>`)的`targetProject`属性为绝对路径。
  >   - 采用手动生成，`targetProject`均设为 `项目名\src\main\java或resources`



### 生成通用Mapper

[参考](https://mapperhelper.github.io/docs/3.usembg/)

想要生成的配置文件使用通用Mapper格式，需要额外配置。

- **引入Maven依赖**

  ```xml
  <!-- https://mvnrepository.com/artifact/org.mybatis.generator/mybatis-generator-core -->
  <dependency>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-core</artifactId>
      <version>1.3.6</version>
  </dependency>
  <!-- 通用 Mapper -->
  <!-- https://mvnrepository.com/artifact/tk.mybatis/mapper -->
  <dependency>
      <groupId>tk.mybatis</groupId>
      <artifactId>mapper</artifactId>
      <version>4.0.0</version>
  </dependency>
  <!-- 如果你只需要用到通用 Mapper 中的插件，可以只引入 mapper-generator -->
  <!-- 注意，这个包不需要和上面的 mapper 同时引入，mapper 中包含 generator -->
  <!-- https://mvnrepository.com/artifact/tk.mybatis/mapper-generator -->
  <dependency>
      <groupId>tk.mybatis</groupId>
      <artifactId>mapper-generator</artifactId>
      <version>1.0.0</version>
  </dependency>
  ```

- **Maven生成插件**

  也添加mapper的依赖

  ```xml
  <plugins>
    <plugin>
      <artifactId>maven-compiler-plugin</artifactId>
      <configuration>
        <source>${jdk.version}</source>
        <target>${jdk.version}</target>
      </configuration>
    </plugin>
    <plugin>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-maven-plugin</artifactId>
      <version>1.3.6</version>
      <configuration>
        <configurationFile>
          ${basedir}/src/main/resources/generator/generatorConfig.xml
        </configurationFile>
        <overwrite>true</overwrite>
        <verbose>true</verbose>
      </configuration>
      <dependencies>
        <dependency>
          <groupId>mysql</groupId>
          <artifactId>mysql-connector-java</artifactId>
          <version>5.1.29</version>
        </dependency>
        <dependency>
          <groupId>tk.mybatis</groupId>
          <artifactId>mapper</artifactId>
          <version>4.0.0</version>
        </dependency>
      </dependencies>
    </plugin>
  </plugins>
  ```

- **手动生成**

  ```java
  public static void main(String[] args) throws Exception {
      List<String> warnings = new ArrayList<String>();
      boolean overwrite = true;
      ConfigurationParser cp = new ConfigurationParser(warnings);
      Configuration config = 
          cp.parseConfiguration(getResourceAsStream("generatorConfig.xml"));
      DefaultShellCallback callback = new DefaultShellCallback(overwrite);
      MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
      myBatisGenerator.generate(null);
      for (String warning : warnings) {
          System.out.println(warning);
      }
  }
  ```

- **generatorConfig.xml配置**

  ```xml
  <!DOCTYPE generatorConfiguration
          PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
          "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
  
  <!--suppress MybatisGenerateCustomPluginInspection -->
  <generatorConfiguration>
      <context id="Mysql" targetRuntime="MyBatis3Simple" defaultModelType="flat">
          <property name="javaFileEncoding" value="UTF-8"/>
          <property name="useMapperCommentGenerator" value="false"/>
  
          <!-- 只是多了一个插件的配置 -->
          <plugin type="tk.mybatis.mapper.generator.MapperPlugin">
              <!-- 生成的接口都会继承配置的mappers接口,可以配自定义接口（继承Mapper） -->
              <property name="mappers" value="tk.mybatis.mapper.common.Mapper"/>
              <!-- 是否区分大小写，true是，会生成大写注解，默认false -->
              <property name="caseSensitive" value="true"/>
              <!-- 是否强制生成注解，包括 @Table @Column -->
              <property name="forceAnnotation" value="true"/>
              <property name="beginningDelimiter" value="`"/>
              <property name="endingDelimiter" value="`"/>
          </plugin>
  
          <jdbcConnection driverClass="org.hsqldb.jdbcDriver"
                          connectionURL="jdbc:hsqldb:mem:generator"
                          userId="sa"
                          password="">
          </jdbcConnection>
  
          <!--MyBatis 生成器只需要生成 Model-->
          <javaModelGenerator targetPackage="test.model" 
                              targetProject="generator/src/test/java"/>
  
          <table tableName="user_info">
              <generatedKey column="id" sqlStatement="JDBC"/>
          </table>
          <table tableName="country">
              <generatedKey column="id" sqlStatement="JDBC"/>
          </table>
      </context>
  </generatorConfiguration>
  ```

  > 参数补充：
  >
  > - **beginningDelimiter** 和 **endingDelimiter** 开始和结束分隔符，对于有关键字的情况下适用。
  > - **useMapperCommentGenerator** 是否使用通用 Mapper 提供的注释工具，默认 `true` 使用，这样在生成代码时会包含字段的注释（目前只有 mysql 和 oracle 支持），设置 `false` 后会用默认的，或者你可以配置自己的注释插件。
  > - **generateColumnConsts** 在生成的 model中，增加字段名的常量，便于使用 Example 拼接查询条件的时候使用。
  > - lombok 增加 model 代码生成时，可以直接生成 lombok 的 `@Getter@Setter@ToString@Accessors(chain = true)` 四类注解， 使用者在插件配置项中增加
  >   `<property name="lombok" value="Getter,Setter,ToString,Accessors"/>` 即可生成对应包含注解的 model 类。

