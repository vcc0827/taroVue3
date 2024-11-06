<template>
  <view class="custom-nav">
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }" />
    <view class="nav-content" :style="{ height: navBarHeight + 'px' }">
      <view class="nav-back">
        <view class="back-icon" v-if="showBack" @tap="handleBack">
          <image class="backward-button" src="https://static.hamu.site/mini/nav-bar/backward.png" />
        </view>
        <view class="back-icon" v-if="showHome" @tap="handleHome">
          <image class="home-button" src="https://static.hamu.site/mini/nav-bar/home.png" />
        </view>
      </view>

      <view class="nav-title">
        <text>{{ title }}</text>
      </view>

      <view class="nav-actions">
        <slot name="actions"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref, onMounted, computed } from 'vue';
import { useNavbarStore } from 'src/stores/common';

interface Props {
  title?: string;
  showBack?: boolean;
  showHome?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  showBack: false,
  showHome: false,
});

const navbarStore = useNavbarStore();
const navBarHeight = computed(() => navbarStore.navBarHeight);
const statusBarHeight = computed(() => navbarStore.statusBarHeight);

const setNavbarHeight = () => {
  if (navbarStore.statusBarHeight === 0) {
    const windowInfo = Taro.getWindowInfo();
    const menuButton = Taro.getMenuButtonBoundingClientRect();

    let statusBarHeight: number | any = windowInfo.statusBarHeight || navbarStore.defaultStatusBarHeight;
    navbarStore.setStatusBarHeight(statusBarHeight);

    navbarStore.setMenuButtonInfo(menuButton.top, menuButton.height);
  }
};
// 返回上一页
const handleBack = () => {
  Taro.navigateBack({
    delta: 1,
  });
};

const handleHome = () => {
  Taro.reLaunch({
    url: '/pages/recommend/index',
  });
};

onMounted(() => {
  // 获取系统信息
  setNavbarHeight();
});
</script>

<style lang="scss">
.custom-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #ffffff;

  .status-bar {
    width: 100%;
  }

  .nav-content {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 16rpx;

    .nav-back {
      position: absolute;
      left: 16rpx;
      height: 100%;
      display: flex;
      align-items: center;

      .back-icon {
        font-size: 20rpx;
        .backward-button {
          width: 20rpx;
          height: 34rpx;
          padding: 28rpx 30rpx;
        }
        .home-button {
          width: 44rpx;
          height: 44rpx;
          padding: 22rpx 30rpx;
        }
      }
    }

    .nav-title {
      flex: 1;
      text-align: center;
      font-size: 28rpx;
      font-weight: 500;

      text {
        display: inline-block;
        max-width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .nav-actions {
      position: absolute;
      right: 16rpx;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
