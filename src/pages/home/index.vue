<template>
  <view class="home-container">
    <swiper class="home-swiper" :autoplay="true" :interval="3000" :indicator-dots="true" @change="onSwiperChange">
      <block v-for="(item, index) in images " :key="item">
        <swiper-item>
          <image class="top__image" @tap="handleSwiperClick(index)" data-index="{{index}}"
            :src="`${item}?imageView2/1/w/650/h/230/q/100`" lazy-load></image>
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'

const images = ref([
  'https://static.hamu.site/mini/home/match_group-swiper.png',
  'https://static.hamu.site/mini/home/official-account-swiper.png'
])

const onSwiperChange = (e) => {
  // 留给事件上报使用
}

const handleSwiperClick = (index) => {
  console.log('handleSwiperClicked! ', index)
}

</script>

<style lang="scss">
.home-container {
  position: relative;
  width: 750rpx;
  padding-top: 30rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .home-swiper {
    margin: 0 auto;
    width: 650rpx;
    height: 230rpx;
    position: relative;

    .top__image {
      width: 100%;
      height: 100%;
      border-radius: 20rpx;
    }
  }
}
</style>