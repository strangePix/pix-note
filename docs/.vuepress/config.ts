//  引入默认配置
import { defineUserConfig } from "vuepress";
import theme from "./theme";

//  自定义配置内容
export default defineUserConfig({
  //  语言，html的lang属性
  lang: "zh-CN",
  //  站点的标题，作为所有页面标题的后缀
  title: "皮克斯的java笔记集",
  //  站点的描述，作为<meta name="description" />标签的content 属性
  description: "滴水穿石，贵在坚持",
  //  部署站点的基础路径，斜杠开始，斜杠结束
  base: "/",
  //  主题
  theme,
});
