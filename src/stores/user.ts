import { defineStore } from 'pinia';
import { ref } from 'vue';
import { rpc } from '../pages/tools/conn';
import { usePromise } from '../pages/tools/promise';

interface CustomerInfo {
  privacy_information: object;
  id: string;
  uid: string;
  customer_group: string[];
  name: string;
  avatar: string;
  cover_img: string;
  img_list: string[];
  image_list: string[];
  gender: string;
  birthday: 631123200000;
  living_place: string[];
  hometown: string[];
  education: string;
  school: string;
  job: string;
  position: string[];
  introduce: string[];
  friends_impression: string[];
  questions_answers: Array<{
    A: string;
    Q: string;
  }>;
  age: number;
  height: number;
  city: string;
  university: string;
  ideal_object: { [key: string]: string };
  ideal_object_tags: string[];
  tags: string[];
  common_tags: string[];
  is_real_name_auth: boolean;
  is_ban: boolean;
  is_member: boolean;
}
interface WeixinMp {
  coin: number;
  headimgurl: string;
  is_auth: boolean;
  is_open_home: boolean;
  is_removed: boolean;
  nickname: string;
  subscribe: boolean;
  surplus_view_count: number;
  unionid: string;
  view_count: number;
  wechat_openid: string;
}
interface CurrentUserInfo {
  customerInfo: CustomerInfo;
  currentMember: { is_member: boolean };
  switchInfo: {
    isAdSource: boolean;
    paySwitchStatus: boolean;
    phoneOverlayStatus: boolean;
    phoneSwitchStatus: boolean;
  };
  weixinmp: WeixinMp;
}
// 保存customer_info中的数据
export const useCurrentCustomerInfoStore = defineStore('customInfo', {
  state: (): CurrentUserInfo => ({
    customerInfo: {
      privacy_information: {},
      id: '',
      uid: '',
      customer_group: [],
      name: '',
      avatar: '',
      cover_img: '',
      img_list: [],
      image_list: [],
      gender: '',
      birthday: 631123200000,
      living_place: [],
      hometown: [],
      education: '',
      school: '',
      job: '',
      position: [],
      introduce: [],
      friends_impression: [],
      questions_answers: [
        { A: '', Q: '' },
        { A: '', Q: '' },
        { A: '', Q: '' },
      ],
      age: 18,
      height: 0,
      city: '',
      university: '',
      ideal_object: { 理想对象介绍: '' },
      ideal_object_tags: [],
      tags: [],
      common_tags: [],
      is_real_name_auth: false,
      is_ban: false,
      is_member: false,
    },
    currentMember: { is_member: false },
    switchInfo: {
      isAdSource: false,
      paySwitchStatus: false,
      phoneOverlayStatus: false,
      phoneSwitchStatus: false,
    },
    weixinmp: {
      coin: 0,
      headimgurl:
        'https://static.hamu.site/02417a6e-644e-437b-ae4d-ee353bd85c11/ebb82e55-275d-43e5-9db8-62a6de640202.jpeg',
      is_auth: false,
      is_open_home: false,
      is_removed: false,
      nickname: '微信用户',
      subscribe: false,
      surplus_view_count: 0,
      unionid: '',
      view_count: 0,
      wechat_openid: '',
    },
  }),
  actions: {
    updateCustomerInfo(customerInfo: CustomerInfo) {
      // this.$state.customerInfo = customerInfo;
      Object.keys(this.$state.customerInfo).forEach((key) => {
        if (customerInfo.hasOwnProperty(key)) {
          this.$state.customerInfo[key] = customerInfo[key];
        }
      });
    },
    updateCurrentMember(currentMember: { is_member: boolean }) {
      this.$state.currentMember = currentMember;
    },
    updateSwitchInfo(switchInfo: {
      isAdSource: boolean;
      paySwitchStatus: boolean;
      phoneOverlayStatus: boolean;
      phoneSwitchStatus: boolean;
    }) {
      this.$state.switchInfo = switchInfo;
    },
    updateWeixinmp(weixinMp: WeixinMp) {
      this.$state.weixinmp = weixinMp;
    },
  },
});

export const useWeixinMpStore = defineStore('weixinMp', {
  state: (): WeixinMp => ({
    coin: 0,
    headimgurl:
      'https://static.hamu.site/02417a6e-644e-437b-ae4d-ee353bd85c11/ebb82e55-275d-43e5-9db8-62a6de640202.jpeg',
    is_auth: false,
    is_open_home: false,
    is_removed: false,
    nickname: '微信用户',
    subscribe: false,
    surplus_view_count: 0,
    unionid: '',
    view_count: 0,
    wechat_openid: '',
  }),
  actions: {
    updateWeixinMp(weixinMp: WeixinMp) {
      this.$state = weixinMp;
    },
  },
});

export const useRecommendStore = defineStore('recommends', {
  state: () => ({
    recommends: ref([]),
  }),
  actions: {
    async getRecommends() {
      const [error, recommends] = await usePromise(rpc.blind.mini.getRecommend(), '');

      if (!error && recommends) {
        this.recommends.value = recommends;
      }

      // this.recommends.value = recommends;
    },
  },
});

export const useSevenDaysStore = defineStore('sevenDays', {
  state: () => ({
    list: ref([]),
  }),
  actions: {
    async getSevenDays(params: any) {
      const [error, result] = await usePromise(rpc.blind.mini.getUserRegisterInSevenDays(params), '');
      console.log('list:', result);

      if (!error && result) {
        this.list.value = result.list;
      }
    },
  },
});

export const useDetailStore = defineStore('detail', {
  state: () => ({
    user: ref({}),
  }),
  actions: {
    async getCustomerByID(id: number | string) {
      const [error, result] = await usePromise(rpc.blind.mini.getCustomerByID(id), '');
      if (!error && result) {
        this.user.value = Object.assign({}, this.user.value, result);
        console.log('this.user.value:', this.user.value);
      }
    },
  },
});
