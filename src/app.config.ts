export default {
  pages: [
    "pages/index/index",
    "pages/recommend/index",
    "pages/home/index",
    "pages/message/index",
    "pages/mine/index",
  ],
  tabBar: {
    custom: true,
    color: "#f0f0f0",
    selectedColor: "#000",
    backgroundColor: "#000",
    list: [
      {
        pagePath: "pages/recommend/index",
        text: "推荐",
      },
      {
        pagePath: "pages/home/index",
        text: "单身库",
      },
      {
        pagePath: "pages/message/index",
        text: "信息",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
