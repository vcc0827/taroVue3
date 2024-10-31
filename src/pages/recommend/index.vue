<template>
  <view class="container">
    <view class="page-body">
      <view v-if="false">
        <view>loading</view>
      </view>
      <view v-else class="recommend__body">
        <swiper class="custom-swiper" indicator-color="#999" indicator-active-color="#333" :vertical="false"
          :circular="false" :indicator-dots="false" :autoplay="false" :style="{ height: `${windowHeight}px` }"
          :current="current" @change="changeSwiper">
          <swiper-item v-for="(recommend, index) in recommends" :key="recommend.id" class="swiper-item">
            <scroll-view class="card" :scroll-y="true" :show-scrollbar="false" :style="{ height: `${windowHeight}px` }"
              :scroll-into-view="scrollIntoView" @scroll="scroll" :scroll-top="scrollTop" v-if="index !== 6">
              <view class="top">
                <image class="bg__cover" :src="recommend.background" alt="" />
                <view class="head_img">
                  <image :src="getImageUrl(recommend.avatar, 216, 216)" alt="" :preview="true"
                    @tap="previewAvatar(recommend.avatar)" />
                </view>
                <button class="recommend__share" open-type="share">
                  <img src="https://static.hamu.site/mini/recommend-share.png" />
                  分享
                </button>
              </view>
              <view class="info">
                <view class="base__info">
                  <view class="name">
                    <text>{{ recommend.name }}</text> <text>{{ recommend.age }}</text>
                    <image class="auth" v-if="recommend.is_real_name_auth"
                      :src="getImageUrl('https://static.hamu.site/mini/auth.png', 36, 36)"></image>
                    <text>{{ recommend.is_real_name_auth ? '' : '信息未认证，请仔细甄别' }}</text>
                  </view>
                  <view v-if="recommend.common_tags.length" class="common__tags">
                    <text v-for="(item, index) in recommend.common_tags" :key="index"
                      :style="{ background: `${tagBg[index]}` }">{{ item }}</text>
                  </view>
                  <!-- <view class="info-item" wx:if="{{recommend.height}}">身高：{{ recommend.height }}cm</view>
                  <view class="info-item" wx:if="{{recommend.living_place}}"
                    >现居地：
                    <text>{{ recommend.living_place }}</text>
                  </view>
                  <view class="info-item" wx:if="{{recommend.hometown}}"
                    >家乡：
                    <text>{{ recommend.hometown }}</text>
                  </view>
                  <view class="info-item" wx:if="{{recommend.education}}">学历：{{ recommend.education }}</view>
                  <view class="info-item" wx:if="{{recommend.school}}">毕业院校：{{ recommend.school }}</view>
                  <view class="info-item" wx:if="{{recommend.position || recommend.job}}"
                    >职业：{{
                      recommend.position && recommend.position.length ? recommend.position : recommend.job
                    }}</view
                  > -->
                </view>
              </view>
            </scroll-view>
          </swiper-item>
          <swiper-item>
            <view class="card empty__state"> this is empty page </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import { useRecommendStore } from '@/stores/user.ts';
import { getImageUrl } from '@/pages/tools/imageFormat.ts';

const recommendStore = useRecommendStore();
const recommends = ref([]);

const current = ref(0);
const scrollTop = ref(0);
const scrollIntoView = ref(''); // 滚动到该元素位置
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

const windowInfo = Taro.getWindowInfo();
const windowHeight = ref(0);

const tagBg = ref([
  'linear-gradient(158deg, #FF89F0 0%, #FB7798 100%)',
  'linear-gradient(164deg, #FF9293 0%, #F87E7B 100%)',
  'linear-gradient(148deg, #8D92F8 0%, #8B8BFB 100%)',
  'linear-gradient(143deg, #18DC9B 0%, #00C181 100%)',
  'linear-gradient(160deg, #FCC58A 0%, #F5B84D 100%)',
  'linear-gradient(153deg, #ACB4FF 0%, #5867FF 100%)',
  'linear-gradient(155deg, #BCA4FF 0%, #8D75E4 100%)',
  'linear-gradient(151deg, #5FD3FC 0%, #4BA6FF 100%)',
  'linear-gradient(143deg, #FF9F6A 0%, #FF6A17 100%)',
]);

const rollSwiper = () => {
  setTimeout(() => {
    current.value = 1;
    setTimeout(() => {
      current.value = 0;
    }, 800);
  }, 400);
};

const changeSwiper = (e) => {
  const { current } = e.detail;
  // current.value = current;
};

const previewAvatar = (url) => {
  previewImages(url, [url]);
};

const previewPictures = (url, array) => { };

const previewImages = (current, urls) => {
  Taro.previewImage({
    current,
    urls,
  });
};

const scroll = (item) => { };

const setWindowHeight = () => {
  if (windowInfo.windowHeight) {
    windowHeight.value = windowInfo.windowHeight;
  }
};

onMounted(async () => {
  setWindowHeight();
  rollSwiper();

  await recommendStore.getRecommends();
  recommends.value = recommendStore.recommends.value;
});
</script>

<style lang="scss">
@mixin flex-box($justify-content: initial, $align-item: initial, $direction: row) {
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;

  flex-direction: if($direction ==row, row, column);
  justify-content: if($justify-content ==initial, flex-start, $justify-content);
  align-items: if($align-item ==initial, auto, $justify-content);
}

.recommend__body {
  width: 100%;

  .custom-swiper {
    .swiper-item {
      @include flex-box(initial, auto, column);
      color: #131313;
      font-size: 28px;

      .card {
        height: calc(100% - 60px);
        background: #fff;
        box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.06);
        border-radius: 14px;
        width: 670px;
        margin: 0 40px;
        box-sizing: border-box;

        .top {
          position: relative;
          height: 354px;
          background: #fff;

          .bg__cover {
            width: 670px;
            height: 354px;
            vertical-align: bottom;
          }

          .head_img {
            @include flex-box(center, center);
            width: 224px;
            height: 224px;
            background: #f1f1f1;
            border-radius: 50%;
            position: absolute;
            top: 100px;
            margin-left: 30px;

            image {
              width: 216px;
              height: 216px;
              border-radius: 50%;
            }
          }

          .recommend__share {
            @include flex-box(center, center);
            position: absolute;
            top: 20px;
            right: 20px;
            width: 122px;
            height: 54px;
            border-radius: 100px;
            font-size: 26px;
            color: #fff;
            padding: 0;
            background: linear-gradient(140deg, #ab60ff 0%, #8a69ff 100%);

            &::after {
              border: none;
            }

            image {
              width: 36px;
              height: 36px;
              margin-right: 6px;
            }
          }
        }

        .info {
          margin-left: 30px;

          .base__info {
            margin-bottom: 60px;

            .name {
              @include flex-box(initial, center);
              font-size: 38px;
              font-weight: 600;
              line-height: 40px;
              margin-bottom: 30px;

              .auth {
                width: 34px;
                height: 34px;
                margin-left: 20px;
              }

              text {
                font-size: 24px;
                color: #6e6e6e;
                margin-left: 16px;
                margin-top: 10px;
              }
            }

            .common__tags {
              @include flex-box(initial, center);
              margin-bottom: 30px;
              flex-wrap: wrap;

              text {
                padding: 0 18px;
                height: 50px;
                border-radius: 30px;
                margin-right: 10px;
                color: #fff;
                font-size: 24px;
                line-height: 50px;
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
}

.page-section-spacing {
  margin-top: 60px;
}

.scroll-view_H {
  white-space: nowrap;
}

.scroll-view-item {
  height: 300px;
}

.scroll-view-item_H {
  display: inline-block;
  width: 100%;
  height: 300px;
}

.custom-swiper {
  height: 100%;
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
