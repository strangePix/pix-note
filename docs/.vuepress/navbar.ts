import {navbar} from "vuepress-theme-hope";

/**
 * 导航栏配置
 */
export default navbar([
    {
        text: "Java笔记",
        icon: "java",
        prefix: "/java/",
        children: [
            "Java",
            "JUC",
            "JVM",
        ]
    },
    {
        text: "数据库笔记",
        icon: "table",
        prefix: "/database/",
        children: [
            "数据库",
            "Mysql",
            "Redis",
            "MongoDB"
        ]
    },
    {
        text: "框架笔记",
        icon: "code",
        prefix: "/frame/",
        children: [
            "Spring",
            "MyBatis",
            "Dubbo"
        ]
    },
    {
        text: "中间件笔记",
        icon: "install",
        prefix: "/middleware/",
        children: [
            "消息队列",
        ]
    },
    {
        text: "算法笔记",
        icon: "variable",
        prefix: "/algorithm/",
        children: [
            "算法题",
        ]
    },
    {
        text: "面试笔记",
        icon: "group",
        prefix: "/interview/",
        children: [
            "Java面试突击",
        ]
    },
    {
        text: "运维笔记",
        icon: "group",
        prefix: "/server/",
        children: [
            "Linux",
            "Docker",
            "Nginx",
            "Tomcat",
            "服务器运维",
            "Maven"
        ]
    },
    {
        text: "其他笔记",
        icon: "note",
        prefix: "/other/",
        children: [
            "IDEA使用",
            "Maven",
            "开源项目学习记录",
            "补充内容",
            "计算机网络",
            "系统设计",
            "补充内容-待分类内容"
        ]
    },

]);
