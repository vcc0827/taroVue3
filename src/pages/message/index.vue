<template>
  <default-layout>
    <view class="message-container">
      <view class="tabs">
        <view
          v-for="(item, index) in tabs"
          :key="index"
          :class="active === index ? 'active-tab' : ''"
          @tap="changeTab(index)"
          >{{ item }}({{ index === 0 ? friendApplyCount : mineApplyCount }})</view
        >
      </view>
      <view class="sub__tabs">
        <view
          v-for="(item, subIndex) in subTabs"
          :key="subIndex"
          :class="subActive === subIndex ? 'active-sub-tab' : ''"
          @tap="changeSubTab(subIndex)"
          >{{ item }}</view
        >
      </view>
      <view class="tips" v-if="active === 0 && gender === '女'">申请认识你，需消耗49脱单币。</view>
      <view class="tips" v-if="active === 1 && gender === '男'">若对方拒绝，脱单币将原路返还至你的账户</view>
      <view class="content" v-if="list.length">
        <view class="people" v-for="(item, unique) in list" :key="unique">
          <image class="avatar" mode="aspectFill" :src="item.avatar" @tap="goToDetail(item.customer_id, false)" />
          <view class="middle">
            <view
              ><text>{{ item.name }}</text>
              <!-- <image :src="item.gender === '女' ? '../home/images/F.png' : '../home/images/M.png'" /> -->
            </view>
            <text v-if="active === 0" class="people__info"
              >{{ item.age }}岁 {{ item.height }}cm {{ item.education }}</text
            >
            <text :style="active === 1 ? 'color: #6e6e6e;' : ''">{{ item.reason }}</text>
          </view>
          <view class="right">
            <view v-if="active === 0 && status[item.status] === 'handling'" @tap="access(item.id)">
              <view class="access">通过</view>
            </view>
            <view v-if="active === 0 && status[item.status] === 'handling'" @tap="refuse(item.id)">
              <view class="refuse">拒绝</view>
            </view>
            <view v-if="status[item.status] === 'handled'" class="handled">{{ item.status }}</view>
            <view v-if="active === 1 && item.status === '已通过'" @tap="goToDetail(item.customer_id, true)">
              <view class="access view__privacy">查看微信</view>
            </view>
            <view v-if="active === 1 && status[item.status] === 'handling'" class="handling">处理中</view>
          </view>
        </view>
      </view>
      <view class="empty" v-else>
        <image
          class="empty__img"
          lazy-load="true"
          mode="aspectFill"
          src="https://static.hamu.site/mini/empty.png?imageView2/1/w/230/h/230/q/100"
        />
      </view>
    </view>

    <nut-action-sheet v-model:visible="showRefuse" z-index="99999" :menu-items="reasons" @choose="choose" />

    <base-popup
      popup-id="invisible"
      v-model:show="showDialog"
      class="overlay__box"
      :overlay="true"
      :popup-style="{ width: '580rpx', height: '500rpx', borderRadius: '20rpx' }"
    >
      <view class="invisible-content">
        <image src="https://static.hamu.site/mini/message/match_message.png" />
        <view class="concern__title">解锁消息</view>
        <view class="concern__text" v-if="friendApplyCount === 0 && mineApplyCount === 0">
          关注服务号解锁消息，当有人申请认识你，或申请被回应时，将实时提醒。
        </view>
        <view class="concern__text" v-else-if="friendApplyCount > 0">
          当前有{{ friendApplyCount }}人申请认识你，关注服务号可立即解锁，别让喜欢你的人等太久喔～
        </view>
        <view class="concern__text" v-else>
          当前你申请了{{ mineApplyCount }}个人的微信，关注服务号即可实时查看对方的处理情况。
        </view>
        <view class="exposure__btn" @tap="createUsers">立即解锁</view>
      </view>
    </base-popup>
  </default-layout>
</template>

<script setup>
import Taro from '@tarojs/taro';
import DefaultLayout from '../../layout/index.vue';
import { onMounted, ref } from 'vue';
import { useRouteStore } from 'src/stores/common';
import { userApi } from 'src/api';

const routeStore = useRouteStore();
const tabs = ref(['好友申请', '我申请的']);
const active = ref(0);
const friendApplyCount = ref(0);
const mineApplyCount = ref(0);
const subTabs = ref(['全部', '待处理', '已通过', '已拒绝']);
const subActive = ref(0);
const gender = ref('女');
const list = ref([]);
const status = ref({
  处理中: 'handling',
  已通过: 'handled',
  已拒绝: 'handled',
});
const reasons = ref([
  {
    name: '不符合择偶标准',
    id: 1,
  },
  {
    name: '资料过于简单',
    id: 2,
  },
  {
    name: '不在同一个城市',
    id: 3,
  },
  {
    name: '照片不够丰富',
    id: 4,
  },
]);
const showRefuse = ref(false);
const refuseId = ref('');
const showDialog = ref(true);

const changeTab = (index) => {
  if (active.value !== index) {
    active.value = index;
  }
};
const changeSubTab = (index) => {
  if (subActive.value !== index) {
    subActive.value = index;
  }
};
const goToDetail = (id, isViewPrivacy) => {
  const url = '/vendor/pages/detail/detail';
  Taro.navigateTo({
    url,
    success: (res) => {
      res.eventChannel.emit('acceptDataFromOpenerPage', { id, isViewPrivacy });
    },
  });
};
const access = async (id) => {
  const status = subTabs.value[2];
  const reason = '';
  await handleApply({ id, status, reason });
};
const refuse = (id) => {
  // 弹出动作面板，选择拒绝理由
  showRefuse.value = true;
  refuseId.value = id;
};
const choose = async (item) => {
  console.log('item:', item.name);

  const reason = item.name;
  const status = subTabs.value[3];
  const id = refuseId.value;
  await handleApply({ id, status, reason });
};
const handleApply = async ({ id, status, reason }) => {
  // api.setApplyStatus({id, status, reason})
  console.log({ id, status, reason });

  const index = list.value.findIndex((item) => item.id === id);
  console.log({ index });

  if (index !== -1) {
    list.value[index].status = status;
    if (reason) {
      list.value[index].reason = reason;
    }
  }
};

const goToConcernOfficialAccount = () => {
  console.log('goToConcernOfficialAccount');
  const url = '/sub-package/web-view/index';
  const src = 'https://mp.weixin.qq.com/s/YPb-fl-mBWxXni8QolpQ2w';
  routeStore.setRouteOption(src);
  Taro.navigateTo({ url });
};

const getUsers = async () => {
  try {
    const result = await userApi.getUserInfo();
    console.log('result:', result);
  } catch (error) {
    console.log(error);
  }
};

const createUsers = async () => {
  try {
    const params = {
      unionid: '5b74e930-e427-4eba-aa6c-877c45d3b482', // 必填
      wechat_openid: '514d10b6-6a4d-4541-a8c7-7eba3340a175', // 必填
      nickname: '裴裴', // 必填
      headimgurl: 'https://static.hamu.site/blind/e925309c051c4ecca643d43a725a3990/1721381430258.png', // 必填
      create_date: BigInt(Date.now()), // 必填
      update_date: BigInt(Date.now()), // 必填
      customer_id: '514d10b6-6a4d-4541-a8c7-7eba3340a175',
      uid: '5b74e930-e427-4eba-aa6c-877c45d3b482',
      customer_group: [],
      name: '裴裴',
      avatar: 'https://static.hamu.site/blind/e925309c051c4ecca643d43a725a3990/1721381430258.png',
      is_only: [],
      operate_id: '100000',
      operate_type: '微信小程序-核心资料',
      cover_img: 'https://static.hamu.site/blind/e925309c051c4ecca643d43a725a3990/1721381430258.png',
      img_list: [
        'https://static.hamu.site/blind/c9429a1c19ed438d8583ce964b923c6d/1721381457021.png',
        'https://static.hamu.site/blind/d93193ade93d430ead7193bdd650aa23/1721381506050.png',
        'https://static.hamu.site/blind/3483b044d35b4572816a9e864cb5575c/1721381592936.png',
      ],
      image_list: [
        { type: 'travel', image: '' },
        { type: 'favorite', image: '' },
        { type: 'more', image: '' },
      ],
      gender: '女',
      birthday: 1003766400000,
      living_place: ['浙江省', '杭州市'],
      hometown: ['湖北省', '黄冈市'],
      register_residence: ['湖北省', '武汉市'],
      education: '本科',
      school: '四川师范大学',
      work_unit: '未知',
      assets: '50万内',
      position: ['学生', '大学生'],
      introduce: [
        'hi，你好，很高兴认识你，\n我是「裴裴」\n🏷湖北黄冈人，01年\n🎓本科毕业于四川师范大学，\n📌目前坐标天津，现在是在实习，未来计划是考研\n\n✨ 关于性格：\n天秤座女生一枚，\n我是个温柔有趣，娇小可爱的南方姑娘，\n性格开朗乐观，像只温柔的小兔子🐰，\n奶凶奶凶的时候，吃个草莓🍓就好啦。\n\n🧊 长相：\n身高170cm，\n长相比较温柔\n\n💻 工作：\n目前正在实习中，共事的都是女生\n同时也兼职',
      ],
      friends_impression: [],
      questions_answers: [{ A: '', Q: '' }],
      age: 22,
      height: 170,
      city: '天津市',
      university: '四川师范大学',
      ideal_object: {
        理想对象介绍:
          '坐标要求:   天津\n学历要求:   本科\n年龄范围:   18-35岁\n是否有房:   否\n收入要求:   5万\n身高要求:   168cm\n善良专一，理工科、会计算机加分  \n',
      },
      ideal_object_tags: [],
      remark: '',
      tags: [],
      common_tags: ['年入20万', '170cm'],
      admin_set_tags: [],
      sea_operator_id: '001-0186dde37d6d66d1',
      platform: 'mini',
      is_on_wall: true,
      is_real_name_auth: true,
      is_show: true,
      is_ban: false,
      sort: 182,
      score: 5274,
      status: '处理中',
      update_count: 26,
      is_open_invite: true,
      is_removed: false,
      insert_wechat_date: 0,
      is_update_privacy: true,
      create_date: 1675785600000,
      update_date: 1721447466069,
      is_buy: false,
      private_info: {
        年收入: '20',
        微信号: '申请通过后，可解锁',
        家庭背景: '非独生女，父母身体健康，母亲是一名英语教师，父亲在公办学校当语文教师，家庭和睦。',
        是否购房: '否',
        是否购车: '否',
      },
      applyRecord: { is_apply: false, status: '未申请' },
      is_follow: false,
      is_send_flower: true,
      is_follower: false,
      price: 49,
      isBindUser: true,
      is_exposure: false,
      exchange: 49,
    };
    await userApi.createUserInfo(params);
  } catch (error) {}
};

const initData = async () => {
  await getUsers();
  // 同步当前数据
  // getApplyCount 获取 friendApplyCount 和 mineApplyCount
  // getCustomerInfo 获取用户的信息
  // getFriendApply 获取 当前列表list的数据

  list.value = [];
};
onMounted(() => {
  initData();
});
</script>

<style lang="scss">
.message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  .tabs {
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    view {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      font-size: 30rpx;
      color: #131313;
      &:first-child::after {
        content: ' ';
        position: absolute;
        right: 0;
        width: 2rpx;
        height: 30rpx;
        background: #eaeaea;
      }
      &.active-tab {
        font-weight: bold;
      }
    }
  }
  .sub__tabs {
    width: 650rpx;
    height: 90rpx;
    background: #fff;
    border-radius: 20rpx;
    margin: 30rpx 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 28rpx;
    font-weight: 400;
    color: #131313;
    flex-shrink: 0;
    .active-sub-tab {
      font-weight: 600;
      color: var(--primary-color);
    }
  }
  .tips {
    width: 650rpx;
    height: 70rpx;
    background: rgba(227, 84, 80, 0.06);
    border-radius: 20rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex-shrink: 0;
    padding-left: 40rpx;
    margin-bottom: 30rpx;
  }
  .content {
    width: 650rpx;
    background: #fff;
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 30rpx 20rpx 30rpx;
    margin-bottom: 68rpx;
    flex-shrink: 0;
    .people {
      margin-top: 40rpx;
      margin-bottom: 20rpx;
      display: flex;
      position: relative;
      .avatar {
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        margin-right: 30rpx;
      }
      .middle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 24rpx;
        color: #131313;
        view {
          display: flex;
          align-items: center;
          font-size: 30rpx;
          font-weight: 600;
          margin-top: 6rpx;
          margin-bottom: 24rpx;
          image {
            width: 28rpx;
            height: 28rpx;
            margin-left: 10rpx;
          }
        }
        .people__info {
          font-size: 26rpx;
          color: #6e6e6e;
          margin-bottom: 24rpx;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        height: 140rpx;
        position: absolute;
        right: 0;
        text-align: center;
      }
    }
  }
  .access {
    background: var(--primary-btn-bg);
    color: #fff;
    margin-bottom: 20rpx;
  }
  .view__privacy {
    margin-bottom: 0rpx;
    margin-top: 20rpx;
  }
  .access,
  .refuse,
  .handled,
  .handling {
    border-radius: 45rpx;
    line-height: 60rpx;
    width: 140rpx;
    height: 60rpx;
    font-size: 26rpx;
    font-weight: 500;
  }
  .refuse {
    border: 1rpx solid rgba(227, 84, 80, 0.34);
    font-size: 28rpx;
    color: var(--primary-color);
  }
  .handled,
  .handling {
    width: 140rpx;
    font-weight: 400;
    color: #6e6e6e;
    text-align: center;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 200%;
      height: 200%;
      opacity: 0.3;
      border: 1px solid #979797;
      border-radius: 90rpx;
      transform-origin: 0 0;
      transform: scale(0.5, 0.5);
      -webkit-transform: scale(0.5, 0.5);
      box-sizing: border-box;
    }
  }

  .handling {
    color: #131313;
  }
}
.invisible-content {
  font-size: 28rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  color: #131313;
  box-sizing: border-box;
  height: 100%;
  padding: 50rpx 50rpx 0 50rpx;
  user-select: none;
  image {
    width: 80rpx;
    height: 80rpx;
    margin-bottom: 20rpx;
  }
  .concern__title {
    font-size: 30rpx;
    font-weight: 500;
    color: #131313;
    margin-bottom: 40rpx;
  }
  .concern__text {
    line-height: 42rpx;
  }
  .exposure__btn {
    margin-top: 40rpx;
    width: 420rpx;
    height: 90rpx;
    line-height: 90rpx;
    background: var(--primary-btn-bg);
    box-shadow: 0px 10rpx 10rpx 0px rgba(227, 84, 80, 0.2);
    border-radius: 45rpx;
    color: #ffffff;
    font-size: 30rpx;
    text-align: center;
    font-weight: 500;
  }
}
</style>
