<template>
  <default-layout>
    <view class="mine-container">
      <view class="top">
        <view class="msg">
          <image
            class="header"
            v-if="status !== '头像审核失败'"
            mode="aspectFill"
            :src="
              customer_info.avatar || account.headImgUrl
                ? customer_info.avatar || account.headImgUrl + '?imageView2/1/w/83/h/83/q/100'
                : ''
            "
          />
          <view class="edit__header" v-else @tap="handleAvatarEdit">
            <image
              class="header--fail"
              mode="aspectFill"
              :src="
                customer_info.avatar || account.headImgUrl
                  ? customer_info.avatar || account.headImgUrl + '?imageView2/1/w/83/h/83/q/100'
                  : ''
              "
            />
            <image
              class="change__header__icon"
              mode="aspectFill"
              src="https://static.hamu.site/mini/mine/changeHeader.png?imageView2/1/w/120/h/46/q/100"
            />
            <view class="change__header__text">更换头像</view>
            <view class="over" />
          </view>
          <view class="mine__name">
            <view class="top__part">
              <view class="user__name">
                <view class="name ellipsis__line">{{ account.nickname }}</view>
                <image
                  v-if="isMember"
                  class="vip_icon"
                  mode="aspectFill"
                  src="https://static.hamu.site/mini/mine/vip.png?imageView2/1/w/36/h/36/q/100"
                />
                <image
                  v-if="isAuth"
                  class="vip_icon"
                  mode="aspectFill"
                  src="https://static.hamu.site/mini/auth.png?imageView2/1/w/36/h/36/q/100"
                />
              </view>
              <view class="homepage" @tap="handleProfileView">
                主页
                <image src="https://static.hamu.site/mini/mine/homepage-arrow.png" />
              </view>
            </view>
            <view class="edit" @tap="handleProfileEdit"> 编辑资料 </view>
          </view>
        </view>
      </view>
      <view v-if="status !== '审核通过' && status != '审核中'" class="tip" @tap="handleProfileComplete">
        <text>完善资料，免费获得超级曝光</text>
        <view class="right__arrow">
          完善资料
          <image src="https://static.hamu.site/mini/mine/info-arrow.png" />
        </view>
      </view>
      <view v-if="status == '审核中'" class="tip" @tap="handleProfileComplete">
        <text>资料已提交审核，请耐心等待</text>
        <view class="right__arrow">
          修改资料
          <image src="https://static.hamu.site/mini/mine/info-arrow.png" />
        </view>
      </view>
      <view class="visit">
        <view class="visit__item" @tap="handleVisitorListView">
          <view class="number" :class="userViewHasNew ? 'number--active' : ''">{{ view }}</view>
          <view class="visit__word">最近来访</view>
        </view>
        <view class="visit__item" @tap="handleFollowerListView">
          <view class="number" :class="followedHasNew ? 'number--active' : ''">{{ followed }}</view>
          <view class="visit__word">喜欢我的人</view>
        </view>
        <view class="visit__item" @tap="handleFollowingListView">
          <view class="number">{{ follow }}</view>
          <view class="visit__word">我喜欢的人</view>
        </view>
      </view>
      <view class="money">
        <view class="money-container">
          <view class="my__number">
            <view class="count-text">我的脱单币</view>
            <view class="count">
              {{ account.coin }}
              <image class="coin__icon" mode="aspectFill" src="https://static.hamu.site/mini/mine/icon.png" />
            </view>
          </view>
          <button class="pay" @tap="handleCoinRecharge">获取更多</button>
        </view>
      </view>
      <view class="bottom">
        <view class="visit__item" @tap="handleWishListView">
          <view :class="wantToViewHasNew ? 'small' : ''">
            <image class="icon" mode="aspectFill" src="https://static.hamu.site/mini/mine/isee.png"></image>
          </view>
          <view class="visit__word">我想看的</view>
        </view>
        <view class="visit__item" @tap="handleViewerListView">
          <view :class="wantViewMeHasNew ? 'small' : ''">
            <image class="icon" mode="aspectFill" src="https://static.hamu.site/mini/mine/seei.png"></image>
          </view>
          <view class="visit__word">想看我的</view>
        </view>
        <view class="visit__item" @tap="handleSoulQuestionView">
          <view>
            <image class="icon" mode="aspectFill" src="https://static.hamu.site/mini/mine/question.png"></image>
          </view>
          <view class="visit__word">灵魂3问</view>
        </view>
      </view>
      <view class="menu">
        <view class="visit__item" @tap="handleGroupView">
          <image class="icon" mode="aspectFill" src="https://static.hamu.site/mini/mine/group.png"></image>
          <view class="visit__word">同城单身群</view>
        </view>
        <view class="visit__item" @tap="handleSettingsView">
          <image class="icon" mode="aspectFill" src="https://static.hamu.site/mini/mine/setting.png"></image>
          <view class="visit__word">设置</view>
        </view>
        <view class="visit__item" @tap="handleAuthView">
          <image
            class="icon"
            mode="aspectFill"
            :src="isAuth ? 'https://static.hamu.site/mini/auth.png' : 'https://static.hamu.site/mini/mine/auth.png'"
          ></image>
          <view class="visit__word">认证</view>
        </view>
      </view>
    </view>
  </default-layout>

  <!-- 弹窗 -->
  <base-popup
    popup-id="writeInfo"
    v-model:show="popups.writeInfo"
    :overlay="false"
    :popup-style="{ height: '698rpx', width: '580rpx', borderRadius: '20rpx' }"
  >
    <view class="write-info-content">
      <image
        src="https://static.hamu.site/mini/mine/match_write_info.png?imageView2/1/w/114/h/114/format/webp/q/100"
        class="match__image"
      />
      <view class="write__info"
        >牵线计划鼓励真实、真诚的社交方式，完善个人信息后，可以获得超级曝光，脱单率大大提升。</view
      >
      <view @tap="showPopup('writeInfo')">
        <view class="write__btn">完善信息获得曝光</view>
      </view>
      <view class="no__contact" @tap="popups.writeInfo = false"> 暂不需要 </view>
    </view>
  </base-popup>
  <!-- 超级曝光 -->
  <base-popup
    popup-id="invisible"
    v-model:show="popups.invisibleOverlay"
    class="overlay__box"
    :overlay="true"
    :popup-style="{ width: '580rpx', height: '520rpx', borderRadius: '20rpx' }"
  >
    <view class="invisible-content">
      <view class="content_title">免费获得超级曝光</view>
      <view class="content_text">完善个人资料，可以让更多的人看到你，喜欢你的人可以直接申请认识你，脱单效率Max。</view>
      <button class="exposure__btn" @tap="handleNewWriteInfoView">立即完善资料</button>
    </view>
  </base-popup>
  <!--  -->
</template>

<script setup>
import Taro from '@tarojs/taro';
import DefaultLayout from '../../layout/index.vue';
import { ref, onMounted } from 'vue';
import { qiniu } from '@/pages/tools/qiniu.ts';
import { debounce } from '@tarojs/runtime';
import { usePermissionStore } from 'src/stores/common';
import BasePopup from 'src/components/BasePopup.vue';

const permissionStore = usePermissionStore();
const customer_info = ref({
  avatar: '',
});
const account = ref({
  headImgUrl: 'https://static.hamu.site/02417a6e-644e-437b-ae4d-ee353bd85c11/ebb82e55-275d-43e5-9db8-62a6de640202.jpeg',
  nickname: '微信用户',
  coin: '0',
});
const status = ref('');
const isMember = ref(false);
const isAuth = ref(false);
const userViewHasNew = ref(false);
const followedHasNew = ref(false);
const view = ref(10);
const followed = ref(20);
const follow = ref(30);
const wantToViewHasNew = ref(0);
const wantViewMeHasNew = ref(0);
// 弹窗管理
const popups = ref({
  sign: false, // 注册弹窗
  writeInfo: false, // 没填手机号的完善资料弹窗（完善信息获得曝光
  complete: false, // 审核通过弹窗
  invisibleOverlay: false, // 免费获得超级曝光
  signing: false, // 全局的登录注册弹窗
});

const initData = () => {
  // 获取当前的用户信息并获取用户头像和姓名等信息 getCurrentUserInfo
  resetOverlays();
};

const resetOverlays = () => {
  Object.keys(popups.value).forEach((key) => {
    popups.value[key] = false;
  });
};

const showPopup = (popupName) => {
  popups.value[popupName] = true;
};

onMounted(() => {
  initData();
});

// 处理头像编辑
const handleAvatarEdit = () => {
  Taro.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sourceType: ['album'],
    success: (res) => {
      const { tempFilePath } = res.tempFiles[0];
      Taro.cropImage({
        src: tempFilePath, // 图片路径
        cropScale: '1:1', // 裁剪比例
        success: async (res) => {
          // 显示加载中toast
          const { imageURL } = await qiniu(tempFilePath);
          console.log('imageURL:', imageURL);
          // TODO 将imageURL传给后台存入当前的customer info中
          console.log('图片上传结束，调用updateCustomerInfo保存数据');
        },
      });
    },
    fail: (err) => {
      console.log(err);
    },
  });
};
// 处理个人信息查看
const handleProfileView = debounce(async () => {
  // 跳转到 homepage页面
  const url = '/vendor-ext/pages/homepage/homepage';
  Taro.navigateTo({
    url,
    fail: (err) => {
      console.log('navigateTo homepage error:', err);
    },
  });
  // 弹订阅消息
  // await subscribeMessage('want');
},300);
// 处理个人信息编辑
const handleProfileEdit = () => {
  const url = '/vendor-ext/pages/new-write-info/new-write-info';
  Taro.navigateTo({
    url,
    fail: (err) => {
      console.log('navigateTo new-write-info error:', err);
    },
  });
  // 弹订阅消息
  // await wx.mew.subscribeMessage('write');
};
// 处理完善个人信息
const handleProfileComplete = () => {
  if (!permissionStore.hasPhone) {
    // 弹出 完善信息获得曝光的弹窗 write_info
    return;
  }
  if (status && status === '审核中') {
    const url = '/vendor-ext/pages/new-write-info/new-write-info';
    Taro.navigateTo({
      url,
      fail: (err) => {
        console.log('navigateTo new-write-info error:', err);
      },
    });
    return;
  }
  // 弹出立即完善资料的弹窗 invisible_overlay
  showPopup('invisibleOverlay');
};
// 处理访问者列表查看
const handleVisitorListView = () => {};
// 处理粉丝列表查看
const handleFollowerListView = () => {};
// 处理关注列表查看
const handleFollowingListView = () => {};
// 处理金币充值
const handleCoinRecharge = () => {};
// 处理心愿列表查看
const handleWishListView = () => {};
// 处理观望者列表查看
const handleViewerListView = () => {};
// 处理灵魂问题查看
const handleSoulQuestionView = () => {};
// 处理群组查看
const handleGroupView = () => {};
// 处理设置查看
const handleSettingsView = () => {};
// 处理认证查看
const handleAuthView = () => {};
// 处理完善资料查看
const handleNewWriteInfoView = () => {
  const url = '/vendor-ext/pages/new-write-info/new-write-info';
  Taro.navigateTo({
    url,
    fail: (err) => {
      console.log('navigateTo new-write-info error:', err);
    },
  });
  return;
};
</script>

<style lang="scss">
.mine-container {
  width: 710rpx;
  margin: 0 auto;
  .top {
    width: 100%;
    padding-top: 50rpx;
    display: flex;
    justify-content: space-between;
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
    .msg {
      height: 100%;
      margin-left: 30rpx;
      display: flex;
      justify-content: space-between;
      width: 100%;
      .header {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
      }
      .edit__header {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .header--fail {
          width: 160rpx;
          height: 160rpx;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          filter: blur(0rpx);
          position: relative;
        }
        .change__header__icon {
          width: 120rpx;
          height: 46rpx;
          position: absolute;
          left: 20rpx;
          bottom: 0;
          z-index: 1;
        }
        .change__header__text {
          font-size: 22rpx;
          color: #fff;
          line-height: 22rpx;
          position: absolute;
          bottom: 20rpx;
          left: 36rpx;
          z-index: 2;
        }
        .over {
          width: 170rpx;
          height: 170rpx;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
          position: absolute;
        }
      }

      .mine__name {
        width: 100%;
        height: 66rpx;
        margin-left: 40rpx;
        .top__part {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
          height: 60rpx;
          color: #131313;
          .user__name {
            width: 320rpx;
            display: flex;
            align-items: center;
            .name {
              font-size: 40rpx;
              line-height: 40rpx;
              font-weight: 500;
              max-width: 280rpx;
            }
            .ellipsis__line {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .homepage {
            display: flex;
            align-items: flex-end;
            flex-wrap: nowrap;
            font-size: 30rpx;
            line-height: 32rpx;
            height: 100%;
            padding-top: 22rpx;
            image {
              width: 36rpx;
              height: 36rpx;
              margin-right: 40rpx;
            }
          }
        }
        .edit {
          width: 150rpx;
          height: 50rpx;
          color: #6e6e6e;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 26rpx;
          margin-top: 30rpx;
          border: 1rpx solid #979797;
          border-radius: 26rpx;
          transform: rotateZ(360deg);
        }
      }
    }
  }
  .tip {
    width: 650rpx;
    height: 80rpx;
    background: rgba(227, 84, 80, 0.06);
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40rpx auto 0;
    box-sizing: border-box;
    padding: 0 30rpx 0 40rpx;
    font-size: 28rpx;
    color: var(--primary-color);

    .right__arrow {
      display: flex;
      align-items: center;
      image {
        width: 26rpx;
        height: 26rpx;
        margin-left: 18rpx;
      }
    }
  }
  .visit {
    display: flex;
    justify-content: space-around;
    width: 650rpx;
    height: 196rpx;
    margin: 30rpx auto 0 auto;
    border-radius: 20rpx;
    background-color: #fff;
  }
  .visit__item {
    width: 140rpx;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .number {
      color: #131313;
      font-size: 38rpx;
      font-weight: 600;
      position: relative;
    }
    .number--active::after {
      content: '';
      position: absolute;
      margin-left: 4rpx;
      width: 13rpx;
      height: 13rpx;
      background: var(--primary-color);
      border-radius: 50%;
    }
    .visit__word {
      font-size: 28rpx;
      color: #6e6e6e;
      margin-top: 30rpx;
    }
    .icon {
      width: 50rpx;
      height: 50rpx;
      margin: 0 auto;
      position: relative;
    }
  }
  .money {
    width: 650rpx;
    height: 160rpx;
    position: relative;
    background-color: #ff8252;
    border-radius: 20rpx;
    margin: 30rpx auto 0;
    .money-container {
      width: 650rpx;
      height: 160rpx;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .my__number {
        height: 100%;
        margin-left: 50rpx;
        .count-text {
          font-size: 28rpx;
          color: #fff;
          margin-top: 40rpx;
        }
        .count {
          font-size: 32rpx;
          font-weight: 600;
          color: #fff;
          margin-top: 20rpx;
          position: relative;
          .coin__icon {
            width: 20rpx;
            margin-left: 6rpx;
            top: 7rpx;
            height: 20rpx;
          }
        }
      }
      .pay {
        margin-right: 35rpx;
        width: 200rpx;
        height: 80rpx;
        background: #fff;
        border-radius: 50rpx;
        color: var(--primary-color);
        font-size: 28rpx;
        font-weight: 500;
        text-align: center;
        line-height: 80rpx;
      }
    }
  }
  .bottom,
  .menu {
    width: 650rpx;
    height: 208rpx;
    background: #fff;
    border-radius: 20rpx;
    margin: 30rpx auto 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
  }
  .bottom {
    .visit__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 140rpx;
      height: 100%;
      text-align: center;
      .number {
        color: #131313;
        font-size: 38rpx;
        font-weight: 600;
        position: relative;
      }
      .number--active::after {
        content: '';
        position: absolute;
        margin-left: 4rpx;
        width: 13rpx;
        height: 13rpx;
        background: var(--primary-color);
        border-radius: 50%;
      }
      .visit__word {
        font-size: 28rpx;
        color: #6e6e6e;
        margin-top: 30rpx;
      }
    }
  }
}
.write-info-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  image {
    width: 220rpx;
    height: 220rpx;
    margin: 0 auto;
    margin-top: 60rpx;
  }
  .write__info {
    font-size: 30rpx;
    font-weight: 400;
    line-height: 46rpx;
    width: 480rpx;
    color: #131313;
    margin: 10rpx auto 0;
    max-height: 200rpx;
    text-align: left;
    overflow-y: auto;
    user-select: none;
    -webkit-overflow-scrolling: touch;
  }
  .write__btn {
    margin: 50rpx auto 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 420rpx;
    height: 90rpx;
    background: var(--primary-btn-bg);
    box-shadow: 0px 10rpx 10rpx 0px rgba(227, 84, 80, 0.2);
    border-radius: 45rpx;
    font-size: 30rpx;
    font-weight: 500;
    color: #fff;
  }
  .no__contact {
    margin-top: 30rpx;
    font-size: 30rpx;
    line-height: 30rpx;
    color: #757575;
    padding: 20rpx;
  }
}

.invisible-content {
  font-size: 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #131313;
  width: 580rpx;
  .content_title {
    font-size: 32rpx;
    font-weight: 600;
    color: #131313;
    margin-bottom: 22rpx;
    margin-top: 80rpx;
  }

  .content_text {
    font-size: 30rpx;
    line-height: 46rpx;
    color: #131313;
    margin-top: 30rpx;
    text-align: left;
    padding: 0 50rpx;
  }
}
.exposure__btn {
  width: 420rpx;
  height: 90rpx;
  background: var(--primary-btn-bg);
  box-shadow: 0px 10rpx 10rpx 0px rgba(227, 84, 80, 0.2);
  border-radius: 46rpx;
  margin: 60rpx auto 0rpx auto;
  line-height: 90rpx;
  color: #fff;
  font-size: 30rpx;
  font-weight: 500;
}
</style>
