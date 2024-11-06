import { PageConfig } from 'src/types/page';

export const pageConfigs: Record<string, PageConfig> = {
  'pages/recommend/index': {
    title: '推荐',
    showBack: false,
  },
  'pages/home/index': {
    title: '单身库',
    showBack: false,
  },
  'pages/message/index': {
    title: '消息',
    showBack: false,
  },
  'pages/mine/index': {
    title: '我的',
    showBack: false,
  },
  'pages/auth/index': {
    title: 'index',
    showHome: true,
  },
};
