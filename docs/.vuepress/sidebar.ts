import {sidebar} from "vuepress-theme-hope";

/**
 * 侧边栏配置
 */
export default sidebar([
    "/",
    "/home",
    {
        text: "java技术栈笔记",
        icon: "note",
        collapsable: true,
        prefix: "/java/",
        children: "structure"
    },
    {
        text: "面试笔记",
        icon: "note",
        collapsable: true,
        prefix: "/interview/",
        children: "structure"
    },
    {
        text: "运维笔记",
        icon: "note",
        collapsable: true,
        prefix: "/operation/",
        children: "structure"
    },
    {
        text: "IDE笔记",
        icon: "note",
        collapsable: true,
        prefix: "/ide/",
        children: "structure"
    },
    {
        text: "算法笔记",
        icon: "note",
        collapsable: true,
        prefix: "/algorithm/",
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
