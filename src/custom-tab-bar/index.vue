<template>
  <view class="tab-bar">
    <view class="tab-bar-border"></view>
    <view v-for="(item, index) in list" :key="index" class="tab-bar-item" @tap="switchTab(index, item.pagePath)">
      <image :src="selected === index ? item.selectedIconPath : item.iconPath" />
      <view :style="{ color: selected === index ? selectedColor : color }">{{ item.text }}</view>
    </view>
  </view>
</template>

<script setup>
import Taro from '@tarojs/taro';
import { useTabBarStore } from '../stores/tabBar.ts';

const store = useTabBarStore();
const selected = store.selected;

const color = '#000000';
const selectedColor = '#fa731d';
const list = [
  {
    pagePath: '/pages/recommend/index',
    selectedIconPath: '/images/recommend-selected.png',
    iconPath: '/images/recommend.png',
    text: '推荐',
  },
  {
    pagePath: '/pages/home/index',
    selectedIconPath: '/images/home-selected.png',
    iconPath: '/images/home.png',
    text: '单身库',
  },
  {
    pagePath: '/pages/message/index',
    selectedIconPath: '/images/message-selected.png',
    iconPath: '/images/message.png',
    text: '消息',
  },
  {
    pagePath: '/pages/mine/index',
    selectedIconPath: '/images/mine-selected.png',
    iconPath: '/images/mine.png',
    text: '我的',
  },
];

const switchTab = (index, url) => {
  console.log('index:', index, url);
  setSelected(index);
  Taro.switchTab({ url });
};

const setSelected = (index) => {
  store.setSelected(index);
};
</script>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -2rpx 6rpx rgba(0, 0, 0, 0.08);
}

.tab-bar-border {
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 0px;
  transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item image {
  width: 54px;
  height: 54px;
}

.tab-bar-item view {
  font-size: 20px;
}
</style>
