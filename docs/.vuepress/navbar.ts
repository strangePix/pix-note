import {navbar} from "vuepress-theme-hope";

/**
 * 导航栏配置
 */
export default navbar([
    "/",    // 首页 对应docs/README.md
    "/home",
    {
        text: "java技术栈",
        icon: "note",
        link: "/java/"
    },

]);
