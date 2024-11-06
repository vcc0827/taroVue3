<template>
  <default-layout>
    <view class="recommend-container">
      <view class="page-body">
        <view class="recommend__body" :style="{ height: `calc(100vh - ${topPadding}px)` }">
          <swiper
            class="custom-swiper"
            indicator-color="#999"
            indicator-active-color="#333"
            :vertical="false"
            :circular="false"
            :indicator-dots="false"
            :autoplay="false"
            :current="current"
            @change="changeSwiper"
          >
            <swiper-item v-for="(recommend, index) in recommends" :key="recommend.id" class="swiper-item">
              <scroll-view
                class="card"
                :scroll-y="true"
                :scroll-into-view="scrollIntoView"
                @scroll="scroll"
                :enable-flex="true"
                :scroll-top="scrollTop"
                v-if="index !== 6"
              >
                <view class="top">
                  <image class="bg__cover" :src="recommend.background" alt="" />
                  <view class="head_img">
                    <image
                      :src="getImageUrl(recommend.avatar, 216, 216)"
                      alt=""
                      :preview="true"
                      @tap="previewAvatar(recommend.avatar)"
                    />
                  </view>
                  <button class="recommend__share" open-type="share">
                    <image src="https://static.hamu.site/mini/recommend-share.png" />
                    分享
                  </button>
                </view>
                <view class="info">
                  <view class="base__info">
                    <view class="name">
                      {{ recommend.name }} {{ recommend.age }}
                      <image
                        class="auth"
                        v-if="recommend.is_real_name_auth"
                        :src="getImageUrl('https://static.hamu.site/mini/auth.png', 36, 36)"
                      ></image>
                      <text>{{ recommend.is_real_name_auth ? '' : '信息未认证，请仔细甄别' }}</text>
                    </view>
                    <view v-if="recommend.common_tags.length" class="common__tags">
                      <text
                        v-for="(item, index) in recommend.common_tags"
                        :key="index"
                        :style="{ background: `${tagBg[index]}` }"
                        >{{ item }}</text
                      >
                    </view>
                    <view class="info-item" v-if="recommend.height">身高：{{ recommend.height }}cm</view>
                    <view class="info-item" v-if="recommend.living_place"
                      >现居地：
                      <text>{{ recommend.living_place }}</text>
                    </view>
                    <view class="info-item" v-if="recommend.hometown"
                      >家乡：
                      <text>{{ recommend.hometown }}</text>
                    </view>
                    <view class="info-item" v-if="recommend.education">学历：{{ recommend.education }}</view>
                    <view class="info-item" v-if="recommend.school">毕业院校：{{ recommend.school }}</view>
                    <view class="info-item" v-if="recommend.position || recommend.job"
                      >职业：{{
                        recommend.position && recommend.position.length ? recommend.position : recommend.job
                      }}</view
                    >
                  </view>
                  <view class="identify">
                    <view class="name">我的认证</view>
                    <view class="identify-box">
                      <view
                        class="identify-id-box"
                        :style="{ background: `${recommend.is_real_name_auth ? '#D9FFDE' : '#F8F8F8'}` }"
                      >
                        <image
                          lazy-load
                          :src="
                            recommend.is_real_name_auth
                              ? getImageUrl('https://static.hamu.site/mini/identify-id_yes.png', 64, 64)
                              : getImageUrl('https://static.hamu.site/mini/identify-id_no.png', 64, 64)
                          "
                        />
                        <p v-if="recommend.is_real_name_auth" class="identify-title">身份已认证</p>
                        <view v-else class="identify-content">
                          <view class="identify-title">身份未认证</view>
                          <view class="identify-subtitle">请仔细甄别</view>
                        </view>
                      </view>
                      <view
                        class="identify-real-box"
                        :style="{ background: `${recommend.is_real_name_auth ? '#D9F0FF' : '#F8F8F8'}` }"
                      >
                        <image
                          lazy-load
                          :src="
                            recommend.is_real_name_auth
                              ? getImageUrl('https://static.hamu.site/mini/identify-real_yes.png', 64, 64)
                              : getImageUrl('https://static.hamu.site/mini/identify-real_no.png', 64, 64)
                          "
                        />
                        <p v-if="recommend.is_real_name_auth" class="identify-title">真人已认证</p>
                        <view v-else class="identify-content">
                          <view class="identify-title">真人未认证</view>
                          <view class="identify-subtitle">请仔细甄别</view>
                        </view>
                      </view>
                    </view>
                  </view>
                  <view class="introduce" v-if="recommend.introduce.length">
                    <view class="name">自我介绍</view>
                    <text class="info-item">{{ recommend.introduce }}</text>
                  </view>
                  <view class="tags" v-if="recommend.tags.length">
                    <view class="name">我的标签</view>
                    <view class="tag">
                      <text v-for="(item, unique) in recommend.tags" :key="unique" class="tag-item">{{ item }}</text>
                    </view>
                  </view>
                  <view class="photos" v-if="recommend.img_list.length">
                    <view class="name">我的照片</view>
                    <view v-for="(item, index) in recommend.img_list" :key="index" class="info-item">
                      <image
                        class="recommend__image_list"
                        mode="aspectFit"
                        :src="getImageUrl(item, 610, 610)"
                        lazy-load
                        @tap="previewImages(item, recommend.img_list)"
                      />
                    </view>
                  </view>
                  <view class="question" v-if="recommend.questions_answers.length">
                    {{ recommend.questions_answers }}
                    <view class="name">灵魂问答</view>
                    <view class="question-list">
                      <view class="question-item" v-for="item in recommend.questions_answers" :key="item">
                        <view class="question-detail" v-if="item.Q">
                          <image class="question-index" src="https://static.hamu.site/mini/q.png" />
                          <view class="question-title">{{ item.Q }}</view>
                        </view>
                        <view class="question-answer" v-if="item.A">{{ item.A }}</view>
                      </view>
                    </view>
                  </view>
                  <view
                    class="friends_impression"
                    v-if="recommend && recommend.friends_impression && recommend.friends_impression.length > 0"
                  >
                    <view class="name">好友印象</view>
                    <view v-for="(item, index) in recommend.friends_impression" :key="index" class="friend-item">
                      <view class="friend">
                        <image class="friend-icon" src="https://static.hamu.site/mini/friend.png" />
                        好友{{ friendNick[index] }}
                      </view>
                      <view class="friend-content">{{ item }}</view>
                    </view>
                  </view>
                  <view
                    class="ideal-lover"
                    v-if="
                      recommend &&
                      recommend.ideal_object &&
                      (recommend.ideal_object['理想对象介绍'] ||
                        (recommend.ideal_object_tags && recommend.ideal_object_tags.length))
                    "
                  >
                    <view class="name">理想对象</view>
                    <view v-if="recommend.ideal_object['理想对象介绍']" class="ideal-info">
                      <text>{{ recommend.ideal_object['理想对象介绍'] }}</text>
                    </view>
                    <view class="tag" v-if="recommend.ideal_object_tags && recommend.ideal_object_tags.length">
                      <text v-for="item in recommend.ideal_object_tags" :key="item" class="tag-item">{{ item }}</text>
                    </view>
                  </view>
                  <view class="privacy" v-if="recommend && recommend.private_info" id="re_{{recommend.id}}">
                    <view class="privacy__top" @tap="goToFeedback(recommend.id)">
                      <view class="name">隐私信息</view>
                      <view class="feedback">
                        <image src="https://static.hamu.site/mini/detail/warning.png" />
                        投诉/举报
                      </view>
                    </view>
                    <view class="privacy__list">
                      <block v-if="recommend.private_info">
                        <view class="privacy__item" v-for="([key, value], index) in filterPrivateInfo" :key="index">
                          <text class="privacy__title">{{ key }}：</text>
                          <view class="privacy__info">{{ key === '年收入' ? value + '万' : value }} </view>
                        </view>
                        <view class="privacy__item bought">
                          <text class="privacy__title">微信号：</text>
                          <view class="privacy__info">
                            {{ recommend.private_info['微信号'] }}
                            <image
                              v-if="recommend.is_buy"
                              src="https://static.hamu.site/mini/detail/copy.png"
                              style="width: 40rpx; height: 40rpx; padding: 0 5rpx"
                              @tap="copyWechat(recommend.private_info['微信号'])"
                            />
                          </view>
                        </view>
                      </block>
                    </view>
                  </view>
                </view>
              </scroll-view>
              <scroll-view
                class="card empty__state"
                v-if="newUserList.length && index === 6"
                :enable-flex="true"
                scroll-y="true"
                enhanced
                show-scrollbar="{{false}}"
                @scrollToLower="scrollBottom"
              >
                <block>
                  <view class="recommend__title">新用户超级曝光</view>
                  <view class="recommend__sub-title" @tap="toGuide">上推荐页指南</view>
                </block>
                <view class="recommend__content">
                  <view v-for="(person, index) in recommend" class="recommend__person" :key="person.id">
                    <view @tap="navigateToCustomer(person.id)" style="width: 100%">
                      <image class="cover" :src="getImageUrl(person.avatar, 270, 270)" lazy-load />
                      <view class="specific__info">
                        <view class="person__name">{{ person.name }}</view>
                        <view>{{ person.age }}岁 {{ person.city }} {{ person.education }}</view>
                        <view>
                          {{ person.height }}cm
                          <text space="nbsp" class="ellip">{{
                            person.position && person.position.length ? person.position.join('') : person.job
                          }}</text>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </scroll-view>
            </swiper-item>
            <swiper-item>
              <view class="card empty__state">
                <block v-if="isSubscribe">
                  <view class="empty">
                    <image :src="getImageUrl('https://static.hamu.site/recommend-empty.png', 187, 187)" lazy-load />
                    <text>今日推荐的嘉宾已看完</text>
                  </view>
                  <button class="more" @tap="switchTap">查看更多</button>
                </block>
                <block wx:else>
                  <view class="subscribe">
                    <view class="title">扫码关注</view>
                    <view class="sub__title">每天为你推荐专属嘉宾</view>
                    <image
                      :src="
                        getImageUrl('https://static.hamu.site/mini/home/match_official_account_qrcode.png', 270, 270)
                      "
                      class="qrcode"
                      :show-menu-by-longpress="true"
                      lazy-load
                    />
                  </view>
                  <button class="more" @tap="toArticle">查看更多推荐</button>
                </block>
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>
    <view class="overlays">
      <SignOverlay :visible="showOverlay" @close="handleCloseOverlay"></SignOverlay>
    </view>
  </default-layout>
</template>

<script setup>
import Taro from '@tarojs/taro';
import { ref, onMounted, computed } from 'vue';
import { useRecommendStore, useSevenDaysStore } from '@/stores/user.ts';
import { getImageUrl } from '@/pages/tools/imageFormat.ts';
import DefaultLayout from 'src/layout/index.vue';
import SignOverlay from 'src/components/SignOverlay.vue';
import { useNavbarStore } from 'src/stores/common';
import { usePermissionStore } from 'src/stores/common';

const permissionStore = usePermissionStore();

const navbarStore = useNavbarStore();
const topPadding = computed(() => navbarStore.statusBarHeight + navbarStore.navBarHeight);

const recommendStore = useRecommendStore();
const recommends = ref([]);

const sevenDaysStore = useSevenDaysStore();
const newUserList = ref([]);

const current = ref(0);
const scrollTop = ref(0);
const scrollIntoView = ref(''); // 滚动到该元素位置
const windowInfo = Taro.getWindowInfo();

const isSubscribe = ref(false); // 从store中拿
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
const friendNick = ['甲', '乙', '丙', '丁'];
const showOverlay = ref(false);

const handleCloseOverlay = () => {
  showOverlay.value = false;
};

const tipsClick = () => {
  visible3.value = true;
};

const visible3 = ref(false);
const onCancel = () => {
  visible3.value = false;
};

const onOk = () => {
  visible3.value = false;
};

const filterPrivateInfo = computed(() => {
  return Object.entries(recommends.value[current.value].private_info).filter(([key, value]) => {
    return (
      !(
        key === 'QQ号' ||
        key === '其他经济条件' ||
        key === '微信号' ||
        key === '是否有房' ||
        key === '是否有车' ||
        key === '是否未购'
      ) &&
      value &&
      !(key === '年收入' && value === '0')
    );
  });
});

const authPageRoute = ref('/pages/auth/index');

const scroll = (item) => {};
const rollSwiper = () => {
  setTimeout(() => {
    current.value = 1;
    setTimeout(() => {
      current.value = 0;
    }, 800);
  }, 400);
};
const scrollBottom = async () => {
  console.log('scrollBottom');
  // 触底后调用接口获取后续分页内容
  // const res = await sevenDaysStore.getSevenDaysRecommend(page,size);
};
const changeSwiper = (e) => {
  const { current } = e.detail;
  // current.value = current;
};

const switchTap = (e) => {
  console.log('switchTap', e);
};

const toArticle = () => {
  console.log('toArticle');
};
const previewAvatar = (url) => {
  previewImages(url, [url]);
};

const previewImages = (current, urls) => {
  Taro.previewImage({
    current,
    urls,
  });
};

const navigateToCustomer = () => {
  console.log('navigateToCustomer');
};

const handleRecommends = async () => {
  await recommendStore.getRecommends();
  recommends.value = recommendStore.recommends.value;
  if (recommends.value) {
    recommends.value.forEach((item) => {
      item.living_place = item.living_place.join('-');
      item.hometown = item.hometown.join('-');
      item.position = item.position.join('-');
      item.introduce = item.introduce.join('\n\n');
      item.questions_answers = item.questions_answers.filter((item) => item.A && item.Q);
      const ideal = item.ideal_object;
      if (ideal['年龄范围']) {
        item.ideal_object['年龄范围'] = ideal['年龄范围'].join('-');
      }
      if (ideal['年收入']) {
        item.ideal_object['收入'] = `${ideal['年收入']}`.indexOf('万') > -1 ? ideal['年收入'] : ideal['年收入'] + '万';
        delete item.ideal_object['年收入'];
      }
      if (ideal['身高'] && `${ideal['身高']}`.indexOf('cm') === -1) {
        item.ideal_object['身高'] = ideal['身高'] === '不限' ? ideal['身高'] : ideal['身高'] + 'cm';
      }
      let otherRequire = '';
      if (ideal['性格'] !== undefined) {
        otherRequire += ideal['性格'];
        delete item.ideal_object['性格'];
      }
      if (ideal['补充'] !== undefined) {
        otherRequire += ideal['补充'];
        delete item.ideal_object['补充'];
      }
      if (ideal['其他要求']) {
        otherRequire += ideal['其他要求'];
      }
      item.ideal_object['其他要求'] = otherRequire;
    });
    if (newUserList.value.length) {
      recommends.value.splice(6, 0, newUserList.value);
    }
  }
};

const handleSevenDays = async () => {
  await sevenDaysStore.getSevenDays();
  newUserList.value = sevenDaysStore.list.value;
};

const copyWechat = () => {};

const goToFeedback = (id) => {
  console.log('feedback');
};

const checkPermission = () => {
  return permissionStore.isRegister;
};

const goToAuth = () => {
  console.log('authRoute: ', authPageRoute.value);
  Taro.redirectTo({
    url: authPageRoute.value,
  });
};

onMounted(() => {
  if (checkPermission()) {
    goToAuth();
    return;
  }

  rollSwiper();
  handleSevenDays();
  handleRecommends();

  tipsClick();
  // 展示弹窗
  // showOverlay.value = true;
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
  height: calc(100vh - 60px);
  ::-webkit-scrollbar {
    width: 0;
  }

  .custom-swiper {
    height: 100%;
    .swiper-item {
      @include flex-box(center, auto, column);
      color: #131313;
      font-size: 28rpx;

      .card {
        height: calc(100% - 80rpx);
        background: #fff;
        box-shadow: 0 0 28rpx 0 rgba(0, 0, 0, 0.06);
        border-radius: 14rpx;
        width: 670rpx;
        margin: 0 40rpx;
        box-sizing: border-box;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;

        .top {
          position: relative;
          height: 354rpx;
          background: #fff;

          .bg__cover {
            width: 670rpx;
            height: 260rpx;
            vertical-align: bottom;
          }

          .head_img {
            @include flex-box(center, center);
            width: 224rpx;
            height: 224rpx;
            background: #f1f1f1;
            border-radius: 50%;
            position: absolute;
            top: 100rpx;
            margin-left: 30rpx;

            image {
              width: 216rpx;
              height: 216rpx;
              border-radius: 50%;
            }
          }

          .recommend__share {
            @include flex-box(center, center);
            position: absolute;
            top: 20rpx;
            right: 20rpx;
            width: 122rpx;
            height: 54rpx;
            border-radius: 100rpx;
            font-size: 26rpx;
            color: #fff;
            padding: 0;
            background: linear-gradient(140deg, #ab60ff 0%, #8a69ff 100%);

            &::after {
              border: none;
            }

            image {
              width: 36rpx;
              height: 36rpx;
              margin-right: 6rpx;
            }
          }
        }

        .info {
          margin-left: 30rpx;

          .base__info,
          .identify,
          .introduce,
          .tags,
          .photos,
          .question,
          .friends_impression,
          .ideal-lover {
            margin-bottom: 60rpx;
          }

          .name {
            @include flex-box(initial, center);
            font-size: 38rpx;
            font-weight: 600;
            line-height: 40rpx;
            margin-bottom: 30rpx;

            .auth {
              width: 34rpx;
              height: 34rpx;
              margin-left: 20rpx;
            }

            text {
              font-size: 24rpx;
              color: #6e6e6e;
              margin-left: 16rpx;
              margin-top: 10rpx;
            }
          }

          .common__tags {
            @include flex-box(initial, center);
            margin-bottom: 30rpx;
            flex-wrap: wrap;

            text {
              padding: 0 18rpx;
              height: 50rpx;
              border-radius: 30rpx;
              margin-right: 10rpx;
              color: #fff;
              font-size: 24rpx;
              line-height: 50rpx;
              margin-bottom: 10rpx;
            }
          }

          .info-item {
            margin-bottom: 30rpx;
            color: #6e6e6e;
          }

          .identify {
            padding-right: 30rpx;

            .identify-box {
              @include flex-box(space-between, center);

              .identify-id-box,
              .identify-real-box {
                // @include flex-box(space-evenly, center);
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                width: 294rpx;
                height: 128rpx;
                border-radius: 16rpx;

                image {
                  width: 64rpx;
                  height: 64rpx;
                }
              }

              .identify-content {
                height: 64rpx;
                @include flex-box(space-between, initial, column);
                position: relative;
                color: #000;
                font-size: 24rpx;

                &::after {
                  content: '';
                  background-image: url('https://static.hamu.site/mini/identify-tips.png');
                  background-size: contain;
                  width: 30rpx;
                  height: 30rpx;
                  display: inline-block;
                  position: absolute;
                  top: -40rpx;
                  right: -40rpx;
                }

                .identify-title {
                  font-size: 28rpx;
                  font-weight: 600;
                }
              }
            }
          }

          .tags {
          }

          .tag {
            display: flex;
            flex-wrap: wrap;
            grid-row-gap: 20rpx;
            grid-column-gap: 20rpx;

            .tag-item {
              color: var(--primary-color);
              padding: 20rpx 30rpx;
              box-sizing: border-box;
              height: 70rpx;
              background: rgba(227, 84, 80, 0.06);
              border-radius: 35rpx;
              font-size: 28rpx;
              line-height: 28rpx;
            }
          }

          .photos {
            .info-item {
              font-size: 0;
              vertical-align: bottom;
            }

            image {
              border-radius: 14rpx;
              width: 610rpx;
              height: 610rpx;
            }
          }

          .question {
            padding-right: 58rpx;

            .question-item {
              @include flex-box(flex-start, flex-start, column);
              padding: 0;
              margin-bottom: 48rpx;

              &:last-child {
                margin-bottom: 0;
              }

              .question-detail {
                @include flex-box(initial, flex-start);
                margin-bottom: 0;
              }

              .question-answer {
                margin: 22rpx 0 0 60rpx;
                line-height: 42rpx;
                color: #6e6e6e;
              }

              .question-index {
                margin-right: 16rpx;
                width: 44rpx;
                height: 44rpx;
                flex-shrink: 0;
              }

              .question-title {
                font-size: 28rpx;
                font-weight: 600;
                line-height: 42rpx;
                padding-top: 2rpx;
                word-break: break-word;
              }

              &:nth-last-of-type(1) {
                border: 0;
              }
            }
          }

          .friends_impression {
            padding-right: 28rpx;

            .friend-item {
              display: flex;
              flex-direction: column;
              margin-bottom: 36rpx;
            }

            .friend-icon {
              width: 30rpx;
              height: 30rpx;
              margin-right: 10rpx;
            }

            .friend {
              @include flex-box(center, center);
              font-weight: 500;
              color: var(--primary-color);
              line-height: 28rpx;
              width: 170rpx;
              height: 60rpx;
              background: rgba(227, 84, 80, 0.06);
              border-radius: 30rpx;
              margin-bottom: 20rpx;
            }

            .friend-content {
              color: #6e6e6e;
              line-height: 42rpx;
            }
          }

          .ideal-lover {
            padding-right: 40rpx;

            .ideal-info {
              margin-bottom: 24rpx;
              line-height: 42rpx;
              display: flex;
              flex-wrap: nowrap;
              color: #6e6e6e;

              text {
                flex-shrink: 0;
                width: 100%;
              }
            }
          }

          .privacy {
            padding-bottom: 60rpx;

            .privacy__top {
              @include flex-box(space-between, center);
              margin-bottom: 40rpx;

              .name {
                margin-bottom: 0;
              }

              .feedback {
                @include flex-box(initial, center);
                font-size: 26rpx;
                color: #6e6e6e;
                margin-right: 30rpx;

                image {
                  width: 28rpx;
                  height: 28rpx;
                  margin-right: 10rpx;
                }
              }
            }

            .privacy__list {
              position: relative;

              .privacy__item {
                @include flex-box(initial, center);
                color: #6e6e6e;
                margin-right: 30rpx;
                margin-bottom: 24rpx;

                &:last-child {
                  margin-bottom: 32rpx;
                }

                .privacy__title {
                  font-size: 28rpx;
                  flex-shrink: 0;
                  width: 140rpx;
                  opacity: 1;
                  line-height: 40rpx;
                }

                .privacy__info {
                  font-size: 28rpx;
                  word-break: break-all;
                  display: flex;
                  line-height: 40rpx;
                }
              }

              .bought {
                color: var(--primary-color);

                image {
                  width: 40rpx;
                  height: 40rpx;
                  padding: 0 5rpx;
                }
              }
            }
          }
        }
      }

      .empty__state {
        @include flex-box(initial, center, column);

        .recommend__title,
        .recommend__sub-title {
          text-align: center;
          line-height: 40rpx;
        }

        .recommend__title {
          font-size: 38rpx;
          font-weight: 600;
          color: #131313;
          margin: 50rpx 0 20rpx 0;
        }

        .recommend__sub-title {
          font-size: 30rpx;
          font-weight: 500;
          color: var(--primary-color);
        }

        .recommend__content {
          display: flex;
          flex-wrap: wrap;
          margin-top: 30rpx;
          justify-content: space-between;

          .recommend__person {
            @include flex-box(center, center, column);
            width: 275rpx;
            height: 420rpx;
            margin-bottom: 30rpx;
            background-color: #fff;
            box-shadow: 0 0 28rpx 0 rgba(0, 0, 0, 0.06);
            border-radius: 10rpx;

            .specific__info {
              width: 100%;
              height: 150rpx;
              background: #fff;
              border-radius: 0 0 10rpx 10rpx;
              padding: 20rpx 0 16rpx 20rpx;
              box-sizing: border-box;
              font-size: 26rpx;
              color: #6e6e6e;
              line-height: 28rpx;

              .person__name {
                font-size: 30rpx;
                font-weight: 600;
                color: #131313;
              }

              :nth-child(2) {
                margin: 14rpx 0;
              }

              :last-child {
                display: flex;
              }
            }

            &:nth-child(odd) {
              margin: 0 40rpx;
            }

            &:nth-child(even) {
              margin-right: 40rpx;
            }

            .cover {
              width: 100%;
              height: 270rpx;
              vertical-align: bottom;
              border-top-right-radius: 10rpx;
              border-top-left-radius: 10rpx;
              box-shadow: 0 0 28rpx 0 rgba(0, 0, 0, 0.06);
            }
          }
        }

        .more {
          width: 400rpx;
          height: 90rpx;
          border-radius: 45rpx;
          color: #fff;
          font-size: 30rpx;
          font-weight: 500;
          line-height: 90rpx;
        }
      }
    }
  }
}
</style>
