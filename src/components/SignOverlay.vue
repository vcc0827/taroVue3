<template>
  <view>
    <nut-popup
      :visible="overlayVisible"
      class="sign-overlay"
      @click-overlay="handleClickOverlay"
      :style="{ padding: '0', width: '650rpx', borderRadius: '48rpx' }"
    >
      <view class="sign-title">个人信息保护指引</view>
      <view class="sign-content">
        <view class="sign-content-paragraph">亲爱的用户，欢迎您信任并使用牵线计划小程序！</view>
        <view class="sign-content-paragraph"
          >为了更好地保障您的个人信息，我们依据相关法律制定了<text @tap="toWebView('agree')" class="sign-content-links"
            >《<text class="sign-under-line">用户协议</text>》</text
          >
          和
          <text class="sign-content-links" @tap="toWebView('privacy')"
            >《<text class="sign-under-line">隐私政策</text>》</text
          >，请您在点击同意之前仔细阅读并充分理解相关条款，包括但不限于我们为您提供的服务，您享有的权利，我们如何收集、使用、存储、共享您的个人信息等。
        </view>
        <view class="sign-content-paragraph">
          一旦您主动点击“同意并注册”按钮即表明您已经仔细阅读、充分理解并完全接受以上协议的全部内容，并表明您也同意牵线计划可以依据以上协议内容来处理您的个人信息。</view
        >
        <view class="sign-content-paragraph">
          <view>为了便于您快速了解我们如何处理您的个人信息，我们提供隐私政策的重点摘要如下：</view>
          <view>
            1、当您注册时，为了完成创建账号，以便我们为您提供服务，您需要提供您的手机号码，我们会向您的<text
              style="font-weight: 600"
              >手机号码</text
            >发送短信验证码以验证您的身份。
          </view>
          <view
            >2、为了保障您正常使用牵线计划的产品或服务，您需创建您个人信息资料，您需要填写您的<text
              style="font-weight: 600"
              >性别、年龄、身高、学历、收入、职业、现居地</text
            >; 此外，您还可以选填信息（包括<text style="font-weight: 600"
              >称呼、房产、车辆、照片、自我描述、理想对象</text
            >等资料信息）您在本网站上公开发布的个人信息，任何登陆到我们产品或使用我们产品的第三人均可全部或部分的查看，以提高您通过我们产品相亲成功的机会。您提供这些信息即表示您同意我们不同程度地向我们产品的使用者披露。
          </view>
          <view>
            3、我们的部分<text style="font-weight: 600">线下婚恋服务</text>可能需要<text style="font-weight: 600"
              >第三方</text
            >来提供，一旦您同意授权并使用我们产品或成为会员（无论是付费还是免费），则表示您已许可我们将这些信息披露给我们的附属公司、母公司和相关联的第三方商业机构，包括但不限于牵线计划线下婚介服务授权店等，详情请见《隐私政策》中的<text
              @tap="toWebView('third-party-list')"
              class="sign-content-links"
              >《<text class="sign-under-line">第三方数据合作清单</text>》。</text
            ><text class="sign-content-links"
              >为了提供更好更精准的服务，我们最多只会筛选清单中最匹配您的一家合作方共提供服务所必要的个人信息，我们的合作伙伴无权将共享的个人信息用于与产品或服务无关的其他用途。</text
            >
          </view>
        </view>
        <view class="sign-content-paragraph">
          如果您不同意接受本协议的任一内容请不要进行后续操作。如对本协议内容有任何疑问、意见或建议，您可通过牵线计划客服与我们联系。
        </view>
      </view>
      <view class="sign-btns-ad">
        <button class="sign-disagree-btn-ad" @tap="disagree">不同意</button>
        <button
          class="sign-agree-btn-ad"
          v-if="isAgree && !hasPhone"
          open-type="getRealtimePhoneNumber"
          @GetRealTimePhoneNumber="fetchPhoneNumber"
        >
          同意并注册
        </button>
        <button class="sign-agree-btn-ad" v-else-if="isAgree && hasPhone" @tap="navigateToSignup">同意并注册</button>
        <button class="sign-agree-btn-ad" v-else @tap="checkAgree">同意并注册</button>
      </view>
    </nut-popup>
  </view>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import Taro from '@tarojs/taro';
import { useRouteStore } from 'src/stores/common';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const overlayVisible = computed(() => {
  return props.visible;
});

const emit = defineEmits(['close']);

const isAgree = ref(true);
const hasPhone = ref(false);
const conf = ref({
  webView: 'https://h5.midonglab.com',
});
const routeStore = useRouteStore();

const handleClickOverlay = (e) => {
  console.log('click overlay', e);
  emit('close');
};
const toWebView = (type) => {
  const src = `${conf.value.webView}/${type}?project=match&t=${Date.now()}`;
  routeStore.setRouteOption(src);
  Taro.navigateTo({
    url: '/sub-package/web-view/index',
  });
};

const disagree = () => {
  emit('close');
};

const fetchPhoneNumber = (e) => {
  console.log('phoneNumber e:', e);
  console.log('phoneNumber e.mpEvent:', e.mpEvent);
  const { errMsg, code } = e.mpEvent.detail;
  if (errMsg !== 'getPhoneNumber:ok') {
    console.log('请授权手机号');
  }
  // 把code传到校验接口中
};
</script>

<style lang="scss">
.sign-overlay {
}

.sign-title {
  text-align: center;
  font-size: 32rpx;
  line-height: 32rpx;
  font-weight: 600;
  color: var(--primary-color);
  margin-top: 32rpx;
  margin-bottom: 32rpx;
}

.sign-content {
  width: 590rpx;
  height: 600rpx;
  background: #e7e7e7;
  margin: 0 auto;
  overflow: scroll;
  scrollbar-width: none;
  border-radius: 16rpx;
  margin-bottom: 48rpx;
  padding: 30rpx 0;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  &-paragraph {
    line-height: 40rpx;
    font-size: 26rpx;
    font-weight: 400;
    padding: 0 32rpx;

    .sign-content-links {
      color: var(--primary-color);
    }

    .sign-under-line {
      text-decoration-line: underline;
    }
  }
}

.sign-protocol {
  margin-bottom: 32rpx;

  .circle-tips,
  .transparent {
    margin-top: 32rpx;
    width: fit-content;
    height: 60rpx;
    display: flex;
    justify-content: start;
    font-size: 24rpx;
    padding-left: 48rpx;
  }

  .transparent {
    color: transparent;
  }

  .arrow-box,
  .arrow-box_transparent {
    position: relative;
    margin-bottom: 24rpx;
    padding: 20rpx 10rpx;
    min-width: 120rpx;
    max-width: 100%;
    font-size: 20rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
    left: -12rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow-box {
    background: #4a4a4a;
    color: #fff;
    border: solid 4rpx #4a4a4a;

    &:before {
      content: '';
      position: absolute;
      bottom: -24rpx;
      left: 16rpx;
      border: 12rpx solid transparent;
      border-top: 12rpx solid #4a4a4a;
      z-index: 2;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: -20rpx;
      left: 12rpx;
      border: 14rpx solid transparent;
      border-top: 14rpx solid #4a4a4a;
      z-index: -1;
    }
  }

  .arrow-box_transparent {
    color: transparent;
    background: transparent;
    border: solid 4rpx transparent;
  }

  &-tips,
  &-links {
    font-size: 24rpx;
    line-height: 34rpx;
    height: 34rpx;
  }

  &-links {
    margin-top: 0;
    color: #63aae8;
    display: inline-block;
  }

  &-tips {
    color: #ccc;
    display: flex;
    align-items: center;
  }
}

.sign-btns,
.sign-btns-ad {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.sign-disagree-btn,
.sign-disagree-btn-ad {
  background: #fff;
  font-size: 32rpx;
}

.sign-agree-btn,
.sign-agree-btn-ad {
  height: 90rpx;
  line-height: 90rpx;
  background: var(--primary-btn-bg);
  border-radius: 44rpx;
  color: #fff;
  font-size: 32rpx;
}

.sign-btns {
  margin-bottom: 16rpx;
  flex-direction: column-reverse;

  .sign-disagree-btn {
    color: #3a3a3a;

    &::after {
      border: 0;
    }
  }

  .sign-agree-btn {
    width: 590rpx;
  }
}

.sign-btns-ad {
  margin-bottom: 48rpx;

  .sign-disagree-btn-ad {
    width: 272rpx;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 44rpx;
    border: 2rpx solid #cbcbcb;

    &::after {
      border: 0;
    }
  }

  .sign-agree-btn-ad {
    width: 272rpx;

    &::after {
      display: none;
    }
  }
}

.custom-popup {
  transition: all 0.3s ease-in-out;
}

/* 进入动画 */
.custom-popup[aria-hidden='false'] {
  animation: slideInFromBottom 3s ease-out forwards;
}

/* 离开动画 */
.custom-popup[aria-hidden='true'] {
  animation: slideOutToBottom 3s ease-in forwards;
}

@keyframes slideInFromBottom {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOutToBottom {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>
