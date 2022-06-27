import {navbar} from "vuepress-theme-hope";

/**
 * 导航栏配置
 */
export default navbar([
    "/",    // 首页 对应docs/README.md
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
        text: "其他笔记",
        icon: "note",
        children: [
            "/other/IDE",
            "/other/开源项目学习记录",
            "/server/服务器运维",
            "/other/补充内容",
            "/other/计算机网络",
            "/other/系统设计",
            "/other/补充内容-待分类内容",
            "/other/Maven"
        ]
    },

]);
