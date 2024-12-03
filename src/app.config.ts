export default {
  pages: ['pages/recommend/index', 'pages/auth/index', 'pages/home/index', 'pages/message/index', 'pages/mine/index'],
  subPackages: [
    {
      root: 'sub-package',
      pages: [
        'write-info/index',
        'core-info/index',
        'web-view/index',
        'process-nature/index',
        'process-ad/index',
        'detail/index',
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationStyle: 'custom',
  },
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#fa731d',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/recommend/index',
        selectedIconPath: 'images/recommend-selected.png',
        iconPath: 'images/recommend.png',
        text: '推荐',
      },
      {
        pagePath: 'pages/home/index',
        selectedIconPath: 'images/home-selected.png',
        iconPath: 'images/home.png',
        text: '单身库',
      },
      {
        pagePath: 'pages/message/index',
        selectedIconPath: 'images/message-selected.png',
        iconPath: 'images/message.png',
        text: '消息',
      },
      {
        pagePath: 'pages/mine/index',
        selectedIconPath: 'images/mine-selected.png',
        iconPath: 'images/mine.png',
        text: '我的',
      },
    ],
  },
};
