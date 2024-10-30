<template>
  <div class="container">
    <div class="page-body">
      <div v-if="false">
        <div>loading</div>
      </div>
      <div v-else class="page-section">
        <swiper
          class="test-h"
          indicator-color="#999"
          indicator-active-color="#333"
          :vertical="false"
          :circular="false"
          :indicator-dots="false"
          :autoplay="false"
          :style="{ height: `${windowHeight}px` }"
        >
          <swiper-item v-for="card in cardList" :key="card.id">
            <div class="page-section-spacing">
              <scroll-view
                :scroll-y="true"
                :style="{ height: `${windowHeight}px` }"
                @scrolltoupper="upper"
                @scrolltolower="lower"
                @scroll="scroll"
                :scroll-top="scrollTop"
              >
                测试用
              </scroll-view>
            </div>
          </swiper-item>
          <swiper-item>
            <div class="card empty__state"></div>
          </swiper-item>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';
const scrollTop = ref(0);
const cardList = ref([
  { id: 1, text: 1 },
  { id: 2, text: 2 },
  { id: 3, text: 3 },
  { id: 4, text: 4 },
  { id: 5, text: 5 },
  { id: 6, text: 6 },
  { id: 7, text: 7 },
  { id: 8, text: 8 },
  { id: 9, text: 9 },
]);
const items = ref([
  { id: 1, text: 1 },
  { id: 2, text: 2 },
  { id: 3, text: 3 },
  { id: 4, text: 4 },
  { id: 5, text: 5 },
  { id: 6, text: 6 },
  { id: 7, text: 7 },
  { id: 8, text: 8 },
  { id: 9, text: 9 },
]);
// const todiv = ref('demo2');

const windowInfo = Taro.getWindowInfo();
const windowHeight = ref(0);

const upper = (item) => {
  console.log('upper:', item);
};
const lower = (item) => {
  console.log('lower:', item);
};
const scroll = (item) => {
  console.log('scroll:', item);
};

const setWindowHeight = () => {
  if (windowInfo.windowHeight) {
    windowHeight.value = windowInfo.windowHeight;
  }
};

onMounted(() => {
  setWindowHeight();
});
</script>

<style>
.page-section-spacing {
  margin-top: 60rpx;
}
.scroll-view_H {
  white-space: nowrap;
}
.scroll-view-item {
  height: 300rpx;
}
.scroll-view-item_H {
  display: inline-block;
  width: 100%;
  height: 300rpx;
}

.demo-text-1 {
  background: #ccc;
}
.demo-text-2 {
  background: #999;
}
.demo-text-3 {
  background: #666;
}
</style>
