<template>
  <cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view
      v-for="(item, index) in list"
      :key="index"
      class="tab-bar-item"
      @tap="switchTab(index, item.pagePath)"
    >
      <cover-image
        :src="selected === index ? item.selectedIconPath : item.iconPath"
      />
      <cover-view
        :style="{ color: selected === index ? selectedColor : color }"
        >{{ item.text }}</cover-view
      >
    </cover-view>
  </cover-view>
</template>

<script setup>
import Taro from "@tarojs/taro";
import { useTabBarStore } from "../stores/tabBar.ts";

const store = useTabBarStore();
const selected = store.selected;
console.log("selected:", selected);

const color = "#000000";
const selectedColor = "#DC143C";
const list = [
  {
    pagePath: "/pages/recommend/index",
    selectedIconPath: "../images/tabbar_home_on.png",
    iconPath: "../images/tabbar_home.png",
    text: "推荐",
  },
  {
    pagePath: "/pages/home/index",
    selectedIconPath: "../images/tabbar_cate_on.png",
    iconPath: "../images/tabbar_cate.png",
    text: "单身库",
  },
  {
    pagePath: "/pages/message/index",
    selectedIconPath: "../images/tabbar_cart_on.png",
    iconPath: "../images/tabbar_cart.png",
    text: "消息",
  },
  {
    pagePath: "/pages/mine/index",
    selectedIconPath: "../images/tabbar_my_on.png",
    iconPath: "../images/tabbar_my.png",
    text: "我的",
  },
];

const switchTab = (index, url) => {
  console.log('index:', index,url);
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
}

.tab-bar-border {
  background-color: rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
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

.tab-bar-item cover-image {
  width: 54px;
  height: 54px;
}

.tab-bar-item cover-view {
  font-size: 20px;
}
</style>
