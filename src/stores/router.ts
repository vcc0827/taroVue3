/**
 * @description 管理页面导航，路由相关功能
 * @function navigate 导航到指定页面
 * @function redirect 重定向到指定页面
 * @function goBackward 返回到上一个页面
 * @function updateCurrentPage 更新当前页面的状态
 * @function getCurrentPage 获取当前页面的状态
 */
import Taro from '@tarojs/taro';
import { defineStore } from 'pinia';
import { tabbarList } from 'src/custom-tab-bar/tabbarList';

const tabPages: string[] = tabbarList.map((item) => item.pagePath);

// 判断是否是tab页面
const isTabPage = (url: string): boolean => {
  return tabPages.includes(url);
};

// 自动修正 URL
const autoCorrectUrl = (url: string): string => {
  let path = url.split('?')[0];
  let query = url.split('?').slice(1).join('?');

  if (path[0] !== '/') {
    path = '/' + path;
  }

  path = path.replace(/\/+/g, '/');

  return path + (query ? '?' + query : '');
};

// 解析 URL 参数
const resolveURL = (url: string, parameters?: Record<string, any>): string => {
  let qs: string[] = [];
  if (parameters) {
    for (const [key, value] of Object.entries(parameters)) {
      const stringValue = value === null || value === undefined ? '' : value.toString();
      qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(stringValue)}`);
    }
  }

  if (!qs.length) {
    return url;
  }

  const separator = url.includes('?') ? '&' : '?';
  const resolveUrl = `${url}${separator}${qs.join('&')}`;
  console.log('resolveUrl:', resolveUrl);

  return resolveUrl;
};

export const useRouterStore = defineStore('router', {
  state: () => ({
    currentPage: null,
    pageVersion: 1,
    tabPages: {},
  }),
  actions: {
    navigate(url: string, params?: any) {
      let fixedUrl = autoCorrectUrl(url);
      if (isTabPage(fixedUrl)) {
        Taro.switchTab({
          url: resolveURL(fixedUrl, params),
          fail: (err) => {
            console.log('err:', err);
            Taro.showToast({ title: '页面跳转失败', icon: 'none' });
          },
        });
      } else {
        Taro.navigateTo({
          url: resolveURL(fixedUrl, params),
          fail: (err) => {
            console.log('err:', err);
            Taro.showToast({ title: '页面跳转失败', icon: 'none' });
          },
        });
      }
    },
    redirect(url: string, params: any) {
      let fixedUrl = autoCorrectUrl(url);
      if (isTabPage(fixedUrl)) {
        Taro.switchTab({
          url: resolveURL(fixedUrl, params),
          fail: (err) => {
            console.log('err:', err);
            Taro.showToast({ title: '页面跳转失败', icon: 'none' });
          },
        });
      } else {
        Taro.redirectTo({
          url: resolveURL(fixedUrl, params),
          fail: (err) => {
            console.log('err:', err);
            Taro.showToast({ title: '页面跳转失败', icon: 'none' });
          },
        });
      }
    },
    goBackward(params: any) {
      const pages = Taro.getCurrentPages();
      console.log('当前页面数', pages);
    },
    // 更新当前页面
    updateCurrentPage(page: string) {
      if (page) {
        this.currentPage = page;
      }
    },
  },
  getters: {
    getCurrentPage() {
      return this.currentPage;
    },
    getLastPage() {
      let pages = this.currentPage;
      if (pages.length >= 2) {
        return pages[pages.length - 2];
      }
    },
  },
});
