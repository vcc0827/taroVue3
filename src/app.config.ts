export default {
  pages: [
    "pages/recommend/index",
    "pages/index/index",
    "pages/home/index",
    "pages/message/index",
    "pages/mine/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: false,
    color: '#000000',
    selectedColor: '#DC143C',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/recommend/index',
        selectedIconPath: 'images/tabbar_home_on.png',
        iconPath: 'images/tabbar_home.png',
        text: '推荐'
      },
      {
        pagePath: 'pages/home/index',
        selectedIconPath: 'images/tabbar_cate_on.png',
        iconPath: 'images/tabbar_cate.png',
        text: '单身库'
      },
      {
        pagePath: 'pages/message/index',
        selectedIconPath: 'images/tabbar_cart_on.png',
        iconPath: 'images/tabbar_cart.png',
        text: '消息'
      },
      {
        pagePath: 'pages/mine/index',
        selectedIconPath: 'images/tabbar_my_on.png',
        iconPath: 'images/tabbar_my.png',
        text: '我的'
      }
    ]
  }
};
