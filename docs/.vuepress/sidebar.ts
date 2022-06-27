import {sidebar} from "vuepress-theme-hope";

/**
 * 侧边栏配置
 */
export default sidebar([
    "/",
    {
        text: "Java笔记",
        icon: "java",
        //  分组是否可以折叠
        collapsable: true,
        prefix: "/java/",
        // 分组子项目
        children: [
            "Java","JUC","JVM"
        ]
    },
    {
        text: "数据库笔记",
        icon: "table",
        //  分组是否可以折叠
        collapsable: true,
        prefix: "/database/",
        // 分组子项目
        children: [
            "数据库","Mysql","Redis","MongoDB"
        ]
    },
    {
        text: "框架笔记",
        icon: "code",
        //  分组是否可以折叠
        collapsable: true,
        prefix: "/frame/",
        // 分组子项目
        children: "structure"
    },
    {
        text: "中间件笔记",
        icon: "install",
        //  分组是否可以折叠
        collapsable: true,
        prefix: "/middleware/",
        // 分组子项目
        children: "structure"
    },
    {
        text: "算法笔记",
        icon: "variable",
        collapsable: true,
        prefix: "/algorithm/",
        children: "structure"
    },
    {
        text: "运维笔记",
        icon: "linux",
        collapsable: true,
        prefix: "/server/",
        children: "structure"
    },
    {
        text: "面试笔记",
        icon: "group",
        collapsable: true,
        prefix: "/interview/",
        children: "structure"
    },
    {
        text: "其他笔记",
        icon: "note",
        collapsable: true,
        prefix: "/other/",
        children: "structure"
    },
]);
