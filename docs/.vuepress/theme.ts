import {hopeTheme} from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

/**
 * 信息定制
 */
export default hopeTheme({
    //  部署域名
    hostname: "http://note.strangest.cn",
    //  作者署名
    author: {
        name: "Pix",
        url: "http://note.strangest.cn",
    },
    //  图标支持
    iconAssets: "iconfont",
    //  网站logo 对应绝对路径.vuepress/public
    logo: "/logo.svg",

    //  对应git仓库 默认github，也可以是完整url
    repo: "vuepress-theme-hope/vuepress-theme-hope",
    repoLabel: "GitHub",
    repoDisplay: true,

    docsDir: "demo/src",

    // navbar 导航栏内容配置
    navbar: navbar,
    //  导航栏布局配置
    navbarLayout:{
        //  站点品牌
        left: ["Brand"],
        //  导航栏链接
        center: ["Links"],
        //  项目仓库，外观弹窗，搜索框
        right: ["Repo", "Outlook", "Search"],
    },

    // sidebar  侧边栏
    sidebar: sidebar,
    //  页脚
    footer: "说点啥好呢",
    //  所有页面显示通用页脚
    displayFooter: true,

    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

    //  博客选项
    // blog: {
    //   description: "一位后端开发菜鸡",
    //   intro: "/intro.html",
    //   medias: {
    //     Baidu: "https://example.com",
    //     Bitbucket: "https://example.com",
    //     Dingding: "https://example.com",
    //     Discord: "https://example.com",
    //     Dribbble: "https://example.com",
    //     Email: "https://example.com",
    //     Evernote: "https://example.com",
    //     Facebook: "https://example.com",
    //     Flipboard: "https://example.com",
    //     Gitee: "https://example.com",
    //     GitHub: "https://example.com",
    //     Gitlab: "https://example.com",
    //     Gmail: "https://example.com",
    //     Instagram: "https://example.com",
    //     Lines: "https://example.com",
    //     Linkedin: "https://example.com",
    //     Pinterest: "https://example.com",
    //     Pocket: "https://example.com",
    //     QQ: "https://example.com",
    //     Qzone: "https://example.com",
    //     Reddit: "https://example.com",
    //     Rss: "https://example.com",
    //     Steam: "https://example.com",
    //     Twitter: "https://example.com",
    //     Wechat: "https://example.com",
    //     Weibo: "https://example.com",
    //     Whatsapp: "https://example.com",
    //     Youtube: "https://example.com",
    //     Zhihu: "https://example.com",
    //   },
    // },
    //  加密配置
    // encrypt: {
    //   config: {
    //     "/guide/encrypt.html": ["1234"],
    //   },
    // },

    plugins: {
        //  博客插件
        blog: {
            //  自动生成摘录
            autoExcerpt: true,
        },

        // 如果你不需要评论，可以直接删除 comment 配置，
        // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
        // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
        // comment: {
        //     /**
        //      * Using Giscus
        //      */
        //     provider: "Giscus",
        //     repo: "vuepress-theme-hope/giscus-discussions",
        //     repoId: "R_kgDOG_Pt2A",
        //     category: "Announcements",
        //     categoryId: "DIC_kwDOG_Pt2M4COD69",
        //
        //     /**
        //      * Using Twikoo
        //      */
        //     // provider: "Twikoo",
        //     // envId: "https://twikoo.ccknbc.vercel.app",
        //
        //     /**
        //      * Using Waline
        //      */
        //     // provider: "Waline",
        //     // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
        // },
        //  md增强功能插件
        // mdEnhance: {
        //     enableAll: true,
        //     presentation: {
        //         plugins: ["highlight", "math", "search", "notes", "zoom"],
        //     },
        // },
    },
});
