import { defineStore } from 'pinia';
import { ref } from 'vue';
import Taro from '@tarojs/taro';

/**
 * 路由状态管理存储
 * @description 用于管理路由相关的状态和操作
 * @property {string} route - 当前路由路径
 * @property {string|object} options - 路由参数或配置选项
 */
export const useRouteStore = defineStore('route', {
  state: () => ({
    route: '',
    options: '',
  }),
  actions: {
    setRouteOption(options: string | object) {
      this.options = options;
    },
  },
});

export const useDeviceStore = defineStore('device', {
  state: () => ({
    benchmarkLevel: ref(2),
    brand: ref(''),
    memorySize: ref(2048),
    model: ref(''),
    platform: ref(''),
    system: ref(''),
  }),
  actions: {
    updateDevice(name: string, value: string | number) {
      if (name in this) {
        this[name] = value;
      } else {
        console.log(`${name} is not in device info`);
      }
    },
  },
});

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      isRegister: ref(false),
      isAdSource: ref(false),
      hasPhone: ref(false),
    };
  },
  actions: {
    updateRegister(value: Boolean) {
      this.isRegister.value = value;
    },
    updateAdSource(value: Boolean) {
      this.isAdSource.value = value;
    },
    updateHasPhone(value: Boolean) {
      this.hasPhone.value = value;
    },
  },
});

export const useNavbarStore = defineStore('navbar', {
  state: () => ({
    statusBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
  }),
  getters: {
    navBarHeight: (state) => {
      return (state.menuButtonTop - state.statusBarHeight) * 2 + state.menuButtonHeight;
    },
    defaultStatusBarHeight: async () => {
      const sys = await Taro.getSystemInfo();
      if (sys.platform === 'ios') {
        return 44;
      } else {
        return 48;
      }
    },
  },
  actions: {
    setStatusBarHeight(value: number) {
      this.statusBarHeight = value;
    },
    setMenuButtonInfo(top: number, height: number) {
      this.menuButtonTop = top;
      this.menuButtonHeight = height;
    },
  },
});
