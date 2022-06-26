import {navbar} from "vuepress-theme-hope";

/**
 * 导航栏配置
 */
export default navbar([
    // "/",    // 首页 对应docs/README.md
    "/home",
    {
        text: "java技术栈",
        icon: "note",
        prefix: "/java/",
        children: [
            {
                text: "Java技术栈集合",
                icon: "note",
                link: "Java技术栈"
            }
        ]
    },
    {
        text: "面试题",
        icon: "note",
        prefix: "/interview/",
        children: [
            {
                text: "面试题集合",
                icon: "note",
                link: "Java面试突击"
            }
        ]
    },
    {
        text: "服务器运维",
        icon: "note",
        prefix: "/operation/",
        children: [
            {
                text: "服务器运维",
                icon: "note",
                link: "服务器运维"
            }
        ]
    },
    {
        text: "IDE技巧",
        icon: "note",
        prefix: "/ide/",
        children: [
            {
                text: "IDE笔记",
                icon: "note",
                link: "IDE"
            }
        ]
    },
    {
        text: "算法",
        icon: "note",
        prefix: "/algorithm/",
        children: [
            {
                text: "算法题",
                icon: "note",
                link: "算法题"
            }
        ]
    },
    {
        text: "其他笔记",
        icon: "note",
        prefix: "/other/",
        children: [
            {
                text: "补充内容",
                icon: "note",
                link: "补充内容"
            }
        ]
    },
    // {
    //     text: "主题文档",
    //     icon: "note",
    //     link: "https://vuepress-theme-hope.github.io/v2/zh/",
    // },
]);
