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
            "补充内容"
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
            "算法题集",
            "算法整理",
            "Leetcode刷题记录",
            "数据结构"
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
            "Maven",
            "版本控制",
            "服务器运维"
        ]
    },
    {
        text: "其他笔记",
        icon: "note",
        prefix: "/other/",
        children: [
            "IDEA使用",
            "标记语言Markdown",
            "Windows",
            "开源项目学习记录",
            "补充内容",
            "解决方案收集",
            "实用资源收集",
            "授权认证",
            "计算机网络",
            "计算机原理",
            "系统设计"
        ]
    },

]);
