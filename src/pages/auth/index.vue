<template>
  <view class="auth">
    <view class="info" :style="{ paddingTop: `${paddingTop}px` }">
      <image :src="LOGO_IMG" />
      <view class="infoText">
        <text>牵线计划</text>
        <text>30万+优质用户在这里寻找另一半</text>
      </view>
    </view>
    <view class="infoItem" v-for="(item, index) in infoItemList" :key="item.id" @tap="handleOverlayAndLogin">
      <view class="infoItemImage">
        <image :src="item.image" />
        <text>{{ item.title }}</text>
      </view>
      <view class="des">
        {{ item.des }}
      </view>
    </view>
    <view class="btns">
      <button class="login" @tap="handleOverlayAndLogin">快捷登录</button>
    </view>
  </view>

  <view class="overlays">
    <SignOverlay :visible="showOverlay" @close="handleCloseOverlay"></SignOverlay>
  </view>
</template>

<script setup>
import Taro from '@tarojs/taro';
import { getCurrentInstance } from '@tarojs/taro';
import { ref, computed, onMounted } from 'vue';
import { useNavbarStore, usePermissionStore, useRouteStore } from 'src/stores/common';
import { useCustomerInfoStore } from 'src/stores/user';
import SignOverlay from 'src/components/SignOverlay.vue';

// 常量
const LOGO_IMG = 'https://static.hamu.site/mini/match_mini_logo.png?imageView2/1/w/140/h/140/format/webp/q/100';

// Store
const navbarStore = useNavbarStore();
const routeStore = useRouteStore();
const permissionStore = usePermissionStore();
const customerInfo = useCustomerInfoStore();

// Refs
const showOverlay = ref(false);
const show = ref(false);
const infoItemList = ref([
  {
    id: 1,
    title: '优质单身青年聚集地',
    des: '单身青年的脱单助手',
    image: 'https://static.hamu.site/mini/auth/match_auth_icon_1.png',
  },
  {
    id: 2,
    title: '高效率脱单',
    des: '喜欢就直接获取联系方式',
    image: 'https://static.hamu.site/mini/auth/match_auth_icon_2.png',
  },
  {
    id: 3,
    title: '拒绝无效匹配',
    des: '让每一次匹配都有意义',
    image: 'https://static.hamu.site/mini/auth/match_auth_icon_3.png',
  },
]);

// Computed
const paddingTop = computed(() => {
  if (navbarStore.navBarHeight === 0) {
    const windowInfo = Taro.getWindowInfo();
    const menuButton = Taro.getMenuButtonBoundingClientRect();
    let statusBarHeight = windowInfo.statusBarHeight || navbarStore.defaultStatusBarHeight;
    navbarStore.setStatusBarHeight(statusBarHeight);
    navbarStore.setMenuButtonInfo(menuButton.top, menuButton.height);
  }
  return navbarStore.navBarHeight + navbarStore.statusBarHeight;
});

// Methods
const handleCloseOverlay = () => {
  showOverlay.value = false;
};

const handleOverlayAndLogin = () => {
  showOverlay.value = true;
};

const getRouteOptions = () => {
  const instance = getCurrentInstance();
  routeStore.setRouteOption(instance.router.params);
  const routeOptions = routeStore.options;
  if (routeOptions.originSource) {
    permissionStore.updateAdSource(true);
  }
};

const initData = () => {
  getRouteOptions();
  // bindUserSource
  showOverlay.value = true;
};

// Lifecycle hooks
onMounted(() => {
  // 初始化
  initData();
});
</script>

<style lang="scss">
.auth {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: url('https://static.hamu.site/mini/auth/match_lp_bg.png') center / 100% no-repeat;

  .info {
    font-size: 34rpx;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 0 50rpx;
    margin-top: 115rpx;
    margin-bottom: 60rpx;

    image {
      width: 140rpx;
      height: 140rpx;
    }

    .infoText {
      display: flex;
      flex-direction: column;
      margin-left: 40rpx;
    }

    text:last-child {
      font-size: 30rpx;
      margin-top: 20rpx;
      font-weight: normal;
      opacity: 0.6;
    }
  }
}

.infoItem {
  height: 160rpx;
  border-radius: 16rpx;
  margin: 30rpx 50rpx 0 50rpx;

  .infoItemImage {
    display: flex;

    image {
      width: 38rpx;
      height: 38rpx;
      padding: 40rpx 20rpx 0 40rpx;
    }

    text {
      color: var(--primary-color);
      padding-top: 40rpx;
      font-size: 32rpx;
      font-weight: 400;
    }
  }

  .des {
    padding-left: 96rpx;
    padding-top: 20rpx;
    font-size: 28rpx;
    opacity: 0.4;
  }
}

.btns {
  margin: 100rpx 50rpx 0 50rpx;
  font-size: 28rpx;
  font-weight: 500;
  text-align: center;

  button::after {
    border: none;
  }

  .login {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    background: var(--primary-btn-bg);
    // box-shadow: 0px 10rpx 10rpx 0px rgba(227, 84, 80, 0.2);
    border-radius: 45rpx;
    font-size: 30rpx;
    color: var(--primary-color);
    margin-bottom: 44rpx;
    color: #fff;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
