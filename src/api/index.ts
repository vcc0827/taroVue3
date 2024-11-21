import Taro from '@tarojs/taro';

// 基础配置
const BASE_URL = 'http://localhost:3000';
const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
};

// 封装请求方法
const request = <T>(options: {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: object;
}): Promise<T> => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header: {
        ...DEFAULT_HEADER,
        ...options.header,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data as T);
        } else {
          reject(res);
        }
      },
      fail: reject,
    });
  });
};

// 用户相关接口
export const userApi = {
  // 登录
  login: (code: string) => {
    return request<{
      token: string;
      userId: string;
    }>({
      url: '/auth/login',
      method: 'POST',
      data: { code },
    });
  },

  // 获取用户信息
  getUserInfo: () => {
    return request({
      url: '/users',
      header: {
        Authorization: `Bearer ${Taro.getStorageSync('token')}`,
      },
    });
  },

  //创建用户信息
  createUserInfo: (params: Object) => {
    return request({
      url: '/users',
      method: 'POST',
      data: params,
    });
  },

  getFriendApply: (userId?: string | number) => {
    return request({
      url: `/friend-requests/${userId}`,
      header: {
        Authorization: `Bearer ${Taro.getStorageSync('token')}`,
      },
    });
  },
};

// 商品相关接口
export const goodsApi = {
  // 获取商品列表
  getGoodsList: (params: { page: number; pageSize: number; categoryId?: string }) => {
    return request({
      url: '/goods/list',
      data: params,
    });
  },

  // 获取商品详情
  getGoodsDetail: (goodsId: string) => {
    return request({
      url: `/goods/detail/${goodsId}`,
    });
  },
};

// 订单相关接口
export const orderApi = {
  // 创建订单
  createOrder: (data: { goodsId: string; quantity: number; addressId: string }) => {
    return request({
      url: '/order/create',
      method: 'POST',
      data,
      header: {
        Authorization: `Bearer ${Taro.getStorageSync('token')}`,
      },
    });
  },
};
