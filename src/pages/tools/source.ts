import Taro, { useRouter } from '@tarojs/taro';
import { useRouteStore, usePermissionStore } from 'src/stores/common';
import { rpc } from './conn';

// 定义 RouteOptions 接口
interface RouteOptions {
  originSource?: string;
  cb?: string;
  trackid?: string;
  [key: string]: any; // 允许其他可能的属性
}

// 定义 BindUserSourceResult 接口（根据实际返回值调整）
interface BindUserSourceResult {
  // 定义 bindUserSourceV2 方法的返回值类型
  success: boolean;
  message?: string;
  // 添加其他可能的属性
}

const routeStore = useRouteStore();
const permissionStore = usePermissionStore();

export const bindUserSource = async (): Promise<BindUserSourceResult> => {
  await getRouteOptions();
  const options = routeStore.options as unknown as RouteOptions;
  if (!options || !options.originSource) {
    return {
      success: false,
    };
  }
  const { originSource, cb, trackid } = routeStore.options as unknown as RouteOptions;
  const form: RouteOptions = { originSource, cb, trackid, options };
  const [error, bindRecord] = await usePromise(rpc.blind.mini.bindUserSourceV2(form));
  if (!error && bindRecord) {
    // 获取当前的权限组
    const { authGroup, isAdSource, isRegister } = bindRecord;
    permissionStore.updatePermission(bindRecord);
    if (isAdSource) {
      // 上报点位 -2
    }
    Taro.nextTick(() => {
      // 调用同步信息的函数
    });
  }
};

const usePromise = (promise: any, errorExt?: string) => {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }
      return [err, undefined];
    });
};

const getRouteOptions = async (): Promise<void> => {
  const router = useRouter();
  if (router) {
    routeStore.setRouteOption(router.params);
  }
};
