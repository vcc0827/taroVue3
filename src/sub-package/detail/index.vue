<template>
  <default-layout background="#f9f9f9">
    <view class="detail">
      <block v-if="user.isLogout">
        <view class="logout">
          <view class="desc"> 当前用户已经脱单啦～ 可以去平台查看其他嘉宾喔 </view>
          <view class="lib__btn" bindtap="goBack">前往单身广场</view>
        </view>
      </block>
      <block v-else></block>
    </view>
  </default-layout>
</template>

<script setup>
import Taro, { useDidShow, useLoad } from '@tarojs/taro';
import DefaultLayout from '../../layout/index.vue';
import { onMounted, ref } from 'vue';
import { rpc } from '@/pages/tools/conn';
import { useDetailStore } from '@/stores/user';
import { usePermissionStore } from '@/stores/common';
import { usePromise } from '@/pages/tools/promise';

const detailStore = useDetailStore();
const permissionStore = usePermissionStore();

const customerId = ref('');
const field = ref('');
const scrollIntoView = ref('');
const user = ref({
  img_list: '',
  isLogout: true,
  is_follow: false,
});
const timer = null;

const isApply = ref(false);
const gender = ref(''); //给页面tips用的 根据性别显示不同tips

const initData = async () => {};

onMounted(() => {
  console.log('detail onMounted');
  fetchField();
});

const formatCity = (value, formatStr) => {
  if (!formatStr) {
    formatStr = '-';
  }
  if (!value) {
    value = [];
  }
  if (!('Array' === value.constructor)) {
    value = [value];
  }
  return value.join(formatStr);
};
const fetchField = async () => {
  const [error, result] = await usePromise(rpc.blind.mini.getSBField(), '');
  field.value = result;
};

const handleData = async (res) => {
  if (res.ideal_object['年收入']) {
    res.ideal_object['收入'] =
      `${res.ideal_object['年收入']}`.indexOf('万') > -1
        ? res.ideal_object['年收入']
        : res.ideal_object['年收入'] + '万';
    delete res.ideal_object['年收入'];
  }

  if (res.ideal_object['身高'] && `${res.ideal_object['身高']}`.indexOf('cm') === -1) {
    res.ideal_object['身高'] =
      res.ideal_object['身高'] === '不限' ? res.ideal_object['身高'] : res.ideal_object['身高'] + 'cm';
  }

  let otherRequire = '';
  if (res.ideal_object['性格'] !== undefined) {
    otherRequire += res.ideal_object['性格'];
    delete res.ideal_object['性格'];
  }
  if (res.ideal_object['补充'] !== undefined) {
    otherRequire += res.ideal_object['补充'];
    delete res.ideal_object['补充'];
  }
  if (res.ideal_object['其他要求']) {
    otherRequire += res.ideal_object['其他要求'];
  }
  res.ideal_object['其他要求'] = otherRequire;

  if (res && res.questions_answers && res.questions_answers.length && res.questions_answers[0].Q) {
    res.questions_answers = res.questions_answers.filter((item) => item.A != '');
  }

  console.log('user.img_list.length:', user.value.img_list.length);
  console.log('user.gender', user.value.gender);
};

const getCustomerApplyStatus = async (id) => {
  let [err, result] = await usePromise(rpc.blind.mini.getCustomerApplyStatus(id), '');
  if (!err && result) {
    const { applyStatus, gender } = result;
    if (applyStatus === '已申请') {
      isApply.value = true;
      gender;
    }
  }
};
useLoad(async (options) => {
  console.log('detail onLoad:', options, permissionStore.isAdSource);
  const { id, share, isViewPrivacy } = options;
  customerId.value = id;
  if (share) {
    // 将返回按钮换成home
  }
  if (isViewPrivacy) {
    timer = setTimeout(() => {
      scrollIntoView.value = 'privacyID';
    }, 500);
  }

  // 调用 getCustomerApplyStatus
  getCustomerApplyStatus(id);
});

useDidShow(() => {
  refreshData();
});

const refreshData = async () => {
  await detailStore.getCustomerByID(customerId.value);
  user.value = {
    ...user.value,
    ...detailStore.user.value,
  };
  handleData(user.value);
};
</script>

<style lang="scss">
.detail-container {
  padding-bottom: 60rpx;

  .mt30 {
    margin-top: 30rpx;
  }

  .detail {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 0 auto;
    height: 100%;
    width: 100%;
    position: relative;

    .img__list {
    }

    .imgs {
      width: 100%;
      height: 100%;
    }

    .no__image {
      width: 690rpx;
      height: 690rpx;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .no__image image {
      width: 200rpx;
      height: 200rpx;
      border-radius: 0;
      margin-top: 216rpx;
      margin-bottom: 90rpx;
    }

    .wantToView {
      width: 250rpx;
      height: 80rpx;
      border-radius: 45rpx;
      border: 1rpx solid #e35450;
      font-size: 28rpx;
      font-weight: 500;
      color: #e35450;
      line-height: 80rpx;
      text-align: center;
      margin-top: 24rpx;
      margin-bottom: 60rpx;
      align-self: center;
    }

    .container-box {
      width: 690rpx;
    }

    .basic-info,
    .identify,
    .education,
    .introduce,
    .tags,
    .ideal-lover,
    .question,
    .friends,
    .privacy,
    .recommend__list {
      background: #fff;
      border-radius: 20rpx;
      color: #6e6e6e;
      width: 690rpx;
      padding: 40rpx 0 0 40rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      margin-top: 30rpx;
    }

    .basic-info,
    .identify,
    .education {
      padding-bottom: 10rpx;
    }

    .introduce,
    .tags,
    .ideal-lover,
    .idealTags {
      display: flex;
      flex-direction: column;
    }

    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;
      line-height: 42rpx;
    }

    .name {
      font-size: 38rpx;
      font-weight: 600;
      color: #131313;
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;

      .auth {
        width: 34rpx;
        height: 34rpx;
        margin-left: 20rpx;
      }
    }

    .common__tags {
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;
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

    .identify {
      .identify-box {
        display: flex;
        justify-content: space-between;
        padding-right: 40rpx;
        margin-bottom: 10rpx;

        .identify-id-box,
        .identify-real-box {
          width: 294rpx;
          height: 128rpx;
          border-radius: 16rpx;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }

        .identify-content {
          height: 64rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .identify-content::after {
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
          color: #000;
          font-weight: 600;
        }

        .identify-subtitle {
          font-size: 24rpx;
          color: #000;
          font-weight: 400;
        }
      }
    }

    .introduce {
      padding: 40rpx 0 8rpx 40rpx;

      .info-item {
        margin-right: 36rpx;

        .introduce-info {
          display: flex;
          align-items: flex-start;
          line-height: 42rpx;
          word-break: break-word;
        }
      }
    }

    .wantToView {
      width: 250rpx;
      height: 80rpx;
      border-radius: 45rpx;
      border: 1rpx solid #e35450;
      font-size: 28rpx;
      font-weight: 500;
      color: #e35450;
      line-height: 80rpx;
      text-align: center;
      margin-top: 24rpx;
      margin-bottom: 60rpx;
      align-self: center;
    }

    .tags {
      padding-bottom: 20rpx;
      .tag {
        display: flex;
        flex-wrap: wrap;
        .tag-item {
          color: #e35450;
          padding: 21rpx 30rpx;
          box-sizing: border-box;
          height: 70rpx;
          background: rgba(227, 84, 80, 0.06);
          border-radius: 35rpx;
          margin-right: 20rpx;
          font-size: 28rpx;
          margin-bottom: 20rpx;
        }
      }
    }

    .question {
      .question-item {
        padding: 0;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        margin-bottom: 48rpx;

        .question-detail {
          display: flex;
          align-items: flex-start;
          margin-bottom: 0;

          .question-index {
            margin-right: 16rpx;
            width: 44rpx;
            height: 44rpx;
            flex-shrink: 0;
          }

          .question-title {
            font-size: 28rpx;
            font-weight: 600;
            color: #131313;
            line-height: 42rpx;
            padding-top: 2rpx;
            word-break: break-word;
          }
        }
        .question-answer {
          margin: 22rpx 0 0 60rpx;
          line-height: 42rpx;
        }
      }
      .question-item:last-child {
        margin-bottom: 0;
      }
      .question-item:nth-last-of-type(1) {
        border: 0;
      }
    }

    .friends {
      padding-bottom: 4rpx;
      padding-right: 34rpx;
      &-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 36rpx;
        font-size: 28rpx;
      }
      &-haoyou {
        font-weight: 500;
        color: #e35450;
        line-height: 28rpx;
        width: 170rpx;
        height: 60rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(227, 84, 80, 0.06);
        border-radius: 30rpx;
        margin-bottom: 20rpx;
      }
      &-icon {
        width: 30rpx;
        height: 30rpx;
        margin-right: 10rpx;
      }
      &-content {
        line-height: 42rpx;
      }
    }

    .ideal-lover {
      padding-bottom: 16rpx;
      padding-right: 40rpx;
      .ideal-info {
        margin-bottom: 24rpx;
        line-height: 42rpx;
        word-break: break-word;
        text {
          flex-shrink: 0;
          width: 100%;
          line-height: 60rpx;
        }
      }

      .idealTags {
        background: #fff;
        color: #6e6e6e;
        box-sizing: border-box;
        font-size: 28rpx;
        .tag {
          display: flex;
          flex-wrap: wrap;
          .tag-item {
            color: #e35450;
            padding: 21rpx 30rpx;
            box-sizing: border-box;
            height: 70rpx;
            background: rgba(227, 84, 80, 0.06);
            border-radius: 35rpx;
            margin-right: 20rpx;
            font-size: 28rpx;
            margin-bottom: 20rpx;
          }
        }
      }
    }

    .privacy {
      padding: 40rpx;
      padding-bottom: 8rpx;

      &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40rpx;
        .name {
          margin-bottom: 0;
        }
        .feedback {
          font-size: 26rpx;
          color: #6e6e6e;
          display: flex;
          align-items: center;
          image {
            width: 28rpx;
            height: 28rpx;
            margin-right: 10rpx;
          }
        }
      }
      &-list {
        position: relative;
        .privacy-item {
          margin-bottom: 32rpx;
          display: flex;
          .privacy-title {
            opacity: 1;
            line-height: 40rpx;
          }
          .privacy-info {
            font-size: 28rpx;
            word-break: break-all;
            display: flex;
            line-height: 40rpx;
          }
        }
        .buy_active {
          margin-bottom: 24rpx;
        }
        .buy_active:last-child {
          margin-bottom: 32rpx;
        }
        .bought {
          color: #e35450;
        }
      }
    }

    .recommend__list {
      margin-bottom: 120rpx;

      .ellipsis-line {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .user-li {
        width: 610rpx;
        height: 366rpx;
        overflow: hidden;
        white-space: nowrap;

        .list-item {
          height: auto;
          display: inline-block;
          text-align: center;
          margin-right: 45rpx;
          color: #131313;

          .header-img {
            width: 160rpx;
            height: 160rpx;
            border-radius: 50%;
            margin-bottom: 20rpx;
          }

          .name_gender {
            width: 180rpx;
            margin: 0 10rpx 20rpx 10rpx;
            width: 170rpx;
            text-align: center;
            font-size: 30rpx;
            font-weight: bold;
            line-height: 42rpx;
          }

          .age_city {
            font-size: 26rpx;
            color: #131313;
            display: flex;
            justify-content: center;
            padding-bottom: 20rpx;

            .age {
              margin-right: 6rpx;
            }

            .city-list {
              text-align: right;
              padding-left: 6rpx;
              height: 30rpx;
              max-width: 120rpx;
            }
          }

          .school {
            font-size: 26rpx;
            color: #131313;
            text-align: center;
            margin: 0 10rpx;
            width: 180rpx;
          }
        }

        .list-item:first-child {
          margin-left: -8rpx;
        }
      }
    }
  }
}
</style>
