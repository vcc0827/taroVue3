<template>
  <view class="layout" :style="{ background: backgroundStyle}">
    <custom-nav-bar :title="pageTitle" :show-back="showBack" :show-home="showHome">
      <template #actions>
        <slot name="nav-actions"></slot>
      </template>
    </custom-nav-bar>
    <view class="content" :style="contentStyle">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref, onMounted, computed } from 'vue';
import { pageConfigs } from 'src/config/pages';
import { useNavbarStore } from 'src/stores/common';

const backgroundStyle = ref('');
const pageTitle = ref('');
const showBack = ref(true);
const showHome = ref(false);
const topPadding = ref(0);
const navbarStore = useNavbarStore();
const contentStyle = computed(() => ({
  'margin-top': topPadding.value + 'px',
}));

onMounted(() => {
  const pages = Taro.getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const currentRoute: any = currentPage.route;

  if (pageConfigs[currentRoute]) {
    pageTitle.value = pageConfigs[currentRoute].title;
    showBack.value = pageConfigs[currentRoute].showBack || false;
    showHome.value = pageConfigs[currentRoute].showHome || false;
  }

  topPadding.value = navbarStore.statusBarHeight + navbarStore.navBarHeight;
});
</script>
<style lang="scss">
.layout{
  // height: calc(100vh - 88rpx - 48rpx - 100rpx - env(safe-area-inset-bottom))
}
</style>