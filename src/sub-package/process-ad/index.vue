<template>
  <default-layout>
    <view class="registration-body ad">
      <view class="steps">
        <view class="step" :class="index < currentStep ? 'green-step' : ''" v-for="(item, index) in 3" :key="index">
        </view>
      </view>

      <view v-if="currentStep === 1">
        <view class="basic-info">
          <view class="welcome-box">
            <image src="https://static.hamu.site/mini/match_welcome_1.png?imageView2/1/w/546/h/142/q/100" />
          </view>

          <view class="block-title">
            <nut-animate type="shake" :show="isShake">
              <view class="block-title-item shaking-border_transparent" style="margin-top: 20rpx">
                <view class="block-title-text ml-34">
                  <text :class="!gender ? 'primary-color' : ''">选择你的性别</text>
                </view>
                <view class="block-title-content">
                  <view class="gender-box" @tap="onGenderChange('male')">
                    <view v-if="gender === 'male'" class="block-title-content-pin">
                      <image src="https://static.hamu.site/mini/perfect/pin.png?imageView2/1/w/36/h/36/q/100" />
                    </view>
                    <image src="https://static.hamu.site/mini/avatar-male.png?imageView2/1/w/176/h/176/q/100" />
                    <text class="gender-text" :class="gender === 'male' ? 'gender-text_selected' : ''">男生</text>
                  </view>
                  <view class="gender-box" @tap="onGenderChange('female')">
                    <view v-if="gender === 'female'" class="block-title-content-pin">
                      <image src="https://static.hamu.site/mini/perfect/pin.png?imageView2/1/w/36/h/36/q/100" />
                    </view>
                    <image src="https://static.hamu.site/mini/avatar-female.png?imageView2/1/w/176/h/176/q/100" />
                    <text class="gender-text" :class="gender === 'female' ? 'gender-text_selected' : ''">女生</text>
                  </view>
                </view>
              </view>
            </nut-animate>
            <view class="block-title-item">
              <view class="block-title-text">
                <text>出生年份</text>
                <text class="text-custom">{{ birthday }}年</text>
              </view>
              <view class="block-title-content">
                <view class="range-box">
                  <nut-range
                    v-model="birthday"
                    hidden-range
                    hidden-tag
                    :max="2001"
                    :min="1970"
                    inactive-color="#ebedf0"
                    active-color="var(--primary-color)"
                    @change="onBirthChange"
                  >
                    <template #button>
                      <view class="range-custom-button"></view>
                    </template>
                  </nut-range>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="currentStep === 2">
        <view class="basic-info">
          <view class="welcome-box">
            <image
              style="width: 378rpx; height: 146rpx"
              src="https://static.hamu.site/mini/match_welcome_2.png?imageView2/1/w/378/h/146/q/100"
            />
          </view>

          <view class="block-title">
            <nut-animate type="shake" :show="isShake">
              <view class="block-title-item shaking-border_transparent" style="margin-top: 20rpx">
                <view class="block-title-text ml-34">
                  <text :class="!edu ? 'primary-color' : ''">选择你的学历</text>
                </view>
                <view class="block-title-content" style="margin-top: 48rpx; margin-left: 0rpx; margin-right: 0rpx">
                  <view v-for="(item, index) in educationList" :key="item.eduName" @tap="onEduChange(item.eduName)">
                    <view class="" :class="item.selected ? 'edu-box_selected' : 'edu-box'">
                      {{ item.eduName }}
                    </view>
                  </view>
                </view>
              </view>
            </nut-animate>

            <view class="block-title-item">
              <view class="block-title-text">
                <text>我的职业</text>
              </view>
              <view class="block-title-content">
                <view class="input-custom">
                  <nut-input
                    v-model="position"
                    placeholder="输入你的职业..."
                    :border="false"
                    @input="onPositionChange"
                  />
                </view>
              </view>
            </view>

            <view class="block-title-item">
              <view class="block-title-text">
                <text>我的年收入</text>
                <text class="text-custom">{{ salaryList[salaryIndex] }}</text>
              </view>
              <view class="block-title-content">
                <view class="range-box">
                  <nut-range
                    v-model="salaryIndex"
                    hidden-range
                    hidden-tag
                    :max="14"
                    inactive-color="#ebedf0"
                    active-color="var(--primary-color)"
                    @change="onSalaryChange"
                  >
                    <template #button>
                      <view class="range-custom-button"></view>
                    </template>
                  </nut-range>
                </view>
              </view>
            </view>

            <view class="block-title-item" style="margin-bottom: 132rpx">
              <view class="block-title-text">
                <text>身高</text>
                <text class="text-custom">{{ userHeight }}CM</text>
              </view>
              <view class="block-title-content">
                <view class="range-box">
                  <nut-range
                    v-model="userHeight"
                    hidden-range
                    hidden-tag
                    :max="210"
                    :min="150"
                    inactive-color="#ebedf0"
                    active-color="var(--primary-color)"
                    @change="onHeightChange"
                  >
                    <template #button>
                      <view class="range-custom-button"></view>
                    </template>
                  </nut-range>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="currentStep === 3">
        <view class="basic-info">
          <view class="welcome-box">
            <image
              style="width: 500rpx; height: 144rpx"
              src="https://static.hamu.site/mini/match_welcome_3.png?imageView2/1/w/500/h/144/q/100"
            />
          </view>
          <view class="block-content">
            <view class="block-item-wrapper">
              <view
                class="block-item"
                v-for="(item, index) in photoList"
                :key="index"
                :style="{
                  background: `url(${item.imageUrl}?imageView2/1/w/206/h/206/q/100)`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }"
                @tap="setLocation(item)"
              >
                <view class="block-icon">
                  <image
                    class="icon-image"
                    style="width: 18rpx; height: 20rpx"
                    src="https://static.hamu.site/mini/perfect/location_white.png"
                  />
                  <text class="location-text">{{ item.location[1].name }}</text>
                </view>
              </view>
            </view>
            <text class="area-title">选择你的居住地</text>
            <view class="address-box-wrapper">
              <nut-picker
                v-model="livingPlaceCodes"
                class="area-custom"
                option-height="40"
                visible-option-num="3"
                :showToolbar="false"
                :columns="columns"
              />
            </view>
          </view>
        </view>
      </view>

      <view class="registration-bottom">
        <view class="registration-bottom-text" v-if="currentStep === 2">让对方遇见更真实的你</view>
        <view class="registration-bottom-text" v-if="currentStep === 3">为你匹配同城最合适的异性</view>
        <view class="registration-bottom-btn" @tap="next"> {{ buttonText }}（{{ currentStep }}/{{ maxStep }}） </view>
      </view>
    </view>
  </default-layout>
</template>

<script setup>
import Taro, { nextTick } from '@tarojs/taro';
import { computed, onUnmounted, ref, reactive, onMounted } from 'vue';
import { useRegFormStore } from 'src/stores/form';
import { debounce } from '@tarojs/runtime';

const currentStep = ref(2);
const maxStep = ref(3);
const isShake = ref(false);
const formStore = useRegFormStore();
const educationList = ref([
  { eduName: '专科', selected: false },
  { eduName: '本科', selected: false },
  { eduName: '硕士', selected: false },
  { eduName: '博士', selected: false },
]);
const salaryList = reactive([
  '0万',
  '5万',
  '10万',
  '15万',
  '20万',
  '25万',
  '30万',
  '40万',
  '50万',
  '60万',
  '70万',
  '80万',
  '90万',
  '100万',
  '200万',
]);
const photoList = ref([]);
const value = ref(['Beijing', 'Daxing', 'Jinghai']);
const columns = ref([
  {
    text: '请选择',
    value: '00000',
    children: [],
  },
  {
    text: '江苏',
    value: 'Jiangsu',
    children: [
      {
        text: '南京',
        value: 'Nanjing',
      },
      {
        text: '苏州',
        value: 'Suzhou',
      },
    ],
  },
  {
    text: '北京',
    value: 'Beijing',
    children: [
      {
        text: '大兴',
        value: 'Daxing',
      },
      {
        text: '海淀',
        value: 'Haidian',
      },
    ],
  },
  {
    text: '北京',
    value: 'Beijing',
    children: [
      {
        text: '大兴',
        value: 'Daxing',
      },
      {
        text: '海淀',
        value: 'Haidian',
      },
    ],
  },
  {
    text: '北京',
    value: 'Beijing',
    children: [
      {
        text: '大兴',
        value: 'Daxing',
      },
      {
        text: '海淀',
        value: 'Haidian',
      },
    ],
  },
]);

const gender = ref('');
const birthday = ref(1995);
const education = ref('');
const position = ref('');
const salaryIndex = ref(0);
const userHeight = ref(175);

const imgUrl = ref('https://static.hamu.site/mini/match_welcome_3.png');

const buttonText = computed(() => {
  return currentStep.value < maxStep.value ? '下一步' : '完成';
});

const onGenderChange = (selection) => {
  gender.value = selection;
  formStore.updateFormData({ gender: gender.value });
};

const onBirthChange = (e) => {
  formStore.updateFormData({ birthday: e });
};

const onEduChange = (e) => {
  educationList.value.forEach((item) => {
    if (item.eduName === e) {
      item.selected = true;
    } else {
      item.selected = false;
    }
  });
  education.value = e;
  formStore.updateFormData({ education: e });
};

const onPositionChange = (e) => {
  const value = e.detail.value;
  formStore.updateFormData({ position: value });
};

const onSalaryChange = (e) => {
  salaryIndex.value = e;
  formStore.updateFormData({ salary: salaryList[salaryIndex.value] });
};

const onHeightChange = (e) => {
  formStore.updateFormData({ height: e });
};

const setLocation = (location) => {
  console.log('选择的地点', location);
};

const next = debounce(async () => {
  if (currentStep.value < maxStep.value) {
    handleIntermediateStep();
    return;
  }
  if (currentStep.value === maxStep.value) {
    handleFinalStep();
  }
}, 300);

const handleIntermediateStep = () => {
  console.log('formData:', formStore.form);
  if (currentStep.value === 1 && !gender.value) {
    handleShake();
    return;
  }
  if (currentStep.value === 2 && !education.value) {
    handleShake();
    return;
  }
  if (currentStep.value === 2) {
    handleLocationStep();
  }

  currentStep.value++;
};
const handleFinalStep = () => {};

let timer = ref(null);
const handleShake = () => {
  isShake.value = true;
  timer = setTimeout(() => {
    isShake.value = false;
  }, 2000);
};

const handleLocationStep = () => {
  // 接口获取地址 living_place
  // 模拟数据
  generateLocationList();
};

const generateLocationList = () => {
  const maleImageList = [
    'https://static.hamu.site/mini/perfect/people/male/5CFE6839-BB19-4909-AF52-BCAAD6C87180.png',
    'https://static.hamu.site/mini/perfect/people/male/3EF7DB78-E832-4553-9D71-3B09FCFDB37C.png',
    'https://static.hamu.site/mini/perfect/people/male/1F55D2D4-EAAF-4c63-8E98-112601B455E6.png',
    'https://static.hamu.site/mini/perfect/people/male/1DDAA339-4C51-43d9-9F7C-27302398C3A5.png',
    'https://static.hamu.site/mini/perfect/people/male/BF1D3B57-9BC8-49c3-B0EC-0A58C471505B.png',
    'https://static.hamu.site/mini/perfect/people/male/CDEE23A4-231C-46e4-AD1F-30A91F639B1E.png',
  ];
  const femaleImageList = [
    'https://static.hamu.site/mini/perfect/people/female/6BA9CC73-D9EE-4544-8F3D-B6463B7E6A52.png',
    'https://static.hamu.site/mini/perfect/people/female/67F79BB5-946A-4afd-8407-7FBAFF602B21.png',
    'https://static.hamu.site/mini/perfect/people/female/485FA5B2-DD20-4835-82EF-EE68D4AE59B2.png',
    'https://static.hamu.site/mini/perfect/people/female/576E7B8B-B694-4353-B867-FE23C32D5D5D.png',
    'https://static.hamu.site/mini/perfect/people/female/738E1CB8-2216-4a2e-9E12-A09A6A4D3712.png',
    'https://static.hamu.site/mini/perfect/people/female/967D8FA0-EB2B-46d6-91DA-CBC392A6E15B.png',
  ];
  const locationList = [
    [
      { code: '320000', name: '江苏省' },
      { code: '320100', name: '南京市' },
    ],
    [
      { code: '340000', name: '安徽省' },
      { code: '340100', name: '合肥市' },
    ],
    [
      { code: '410000', name: '河南省' },
      { code: '410100', name: '郑州市' },
    ],
    [
      { code: '430000', name: '湖南省' },
      { code: '430100', name: '长沙市' },
    ],
    [
      { code: '420000', name: '湖北省' },
      { code: '420100', name: '武汉市' },
    ],
    [
      { code: '310000', name: '上海市' },
      { code: '310100', name: '上海市' },
    ],
  ];
  photoList.value = locationList.map((location, index) => ({
    location,
    imageUrl: gender.value === 'female' ? maleImageList[index] : femaleImageList[index],
  }));
};

const initData = () => {
  console.log('initData form', formStore.form);
  const { form } = formStore;
  const fieldsToUpdate = [
    { key: 'gender', ref: gender },
    { key: 'birthday', ref: birthday },
    { key: 'education', ref: education },
    { key: 'position', ref: position },
  ];

  fieldsToUpdate.forEach(({ key, ref }) => {
    if (form[key]) {
      ref.value = form[key];
    }
  });
};

onMounted(() => {
  initData();
});
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<style lang="scss">
.registration-body {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;

  .steps {
    width: 100%;
    height: 12rpx;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-evenly;
    .step,
    .green-step {
      width: 160rpx;
      height: 12rpx;
      border-radius: 6rpx;
    }

    .step {
      background: #dadada;
    }

    .green-step {
      background: #57b976;
    }
  }

  .basic-info {
    height: calc(100vh - 400rpx - 12rpx);
    overflow: scroll;
  }

  .welcome-box {
    width: 100%;
    margin-top: 10rpx;
    text-align: center;

    .welcome-title {
      font-size: 48rpx;
      font-weight: 600;
      color: var(--primary-color);
      width: 100%;
      // margin-top: 70rpx;
      text-align: center;
    }
    image {
      width: 546rpx;
      height: 142rpx;
    }
  }

  .block-title {
    .nut-animate {
      .nut-animate__container {
        width: 100%;
      }
    }
    .block-title-item {
      margin-top: 94rpx;
    }

    .block-title-text {
      margin-left: 64rpx;
      margin-bottom: 42rpx;
      font-size: 28rpx;
      color: #000;
      font-weight: 600;

      .text-custom {
        margin-left: 16rpx;
        color: var(--primary-color);
      }
    }

    .ml-34 {
      margin-left: 34rpx;
    }

    .block-title-content {
      display: flex;
      justify-content: space-evenly;

      .gender-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .block-title-content-pin {
          position: absolute;
          top: -20rpx;
          right: -4rpx;

          image {
            width: 36rpx;
            height: 36rpx;
          }
        }

        image {
          width: 176rpx;
          height: 176rpx;
          margin-bottom: 60rpx;
        }

        .gender-text,
        .gender-text_selected {
          font-size: 28rpx;
          font-weight: 400;
        }

        .gender-text {
          color: rgba(0, 0, 0, 0.4);
        }

        .gender-text_selected {
          color: #000;
        }
      }

      .edu-box {
        background: #f4f4f4;
        color: #000;
      }

      .edu-box_selected {
        background: var(--primary-color);
        color: #fff;
      }

      .edu-box,
      .edu-box_selected {
        width: 148rpx;
        height: 108rpx;
        border-radius: 22rpx;
        font-size: 32rpx;
        font-weight: 400;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      image {
        width: 176rpx;
        height: 176rpx;
        margin-bottom: 60rpx;
      }

      .range-box {
        width: 622rpx;
        padding: 0;
        .range-custom-button {
          background-color: #fff;
          width: 64rpx;
          height: 64rpx;
          border-radius: 16rpx;
          box-shadow: 0rpx 8rpx 14rpx 0rpx rgba(0, 0, 0, 0.08);
          &::before {
            content: ' ';
            width: 12rpx;
            height: 4rpx;
            background: var(--primary-color);
            border-radius: 2rpx;
            position: absolute;
            top: 26rpx;
            left: 50%;
            margin-left: -6rpx;
          }
          &::after {
            content: ' ';
            position: absolute;
            width: 12rpx;
            height: 4rpx;
            background: var(--primary-color);
            border-radius: 2rpx;
            top: 34rpx;
            left: 50%;
            margin-left: -6rpx;
          }
        }
      }

      .input-custom {
        width: 622rpx;
        .nut-input {
          background: transparent;
          padding: 0;
        }
      }
    }
  }

  .block-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .block-item-wrapper {
      margin-top: 0rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .block-item {
        width: 206rpx;
        height: 206rpx;
        border-radius: 28rpx;
        margin: 16rpx 0 0 16rpx;
        position: relative;

        .block-icon {
          position: absolute;
          left: 10rpx;
          bottom: 10rpx;
        }

        .location-text {
          color: #fff;
          font-size: 22rpx;
          font-weight: 400;
          margin-left: 6rpx;
        }
      }
    }

    .area-title {
      font-weight: 600;
      font-size: 28rpx;
      color: #000000;
      margin-top: 78rpx;
    }
    .address-box-wrapper {
      margin: 32rpx auto;
      width: 686rpx;
      background: transparent;
      border-radius: 50rpx;
      display: flex;
      flex-direction: column;

      .area-custom {
        background-color: #f9f9f9;
        border-radius: 50rpx;
        padding: 20rpx 20rpx;

        picker-view {
          height: 200rpx;
        }
      }
    }
  }

  .shaking-border {
    border: 2rpx dashed var(--primary-color);
    border-radius: 28rpx;
    padding: 40rpx 10rpx;
    margin: 20rpx;
    color: var(--primary-color);
  }

  .shaking-border_transparent {
    border: 2rpx dashed var(--primary-color);
    border-radius: 28rpx;
    padding: 40rpx 10rpx;
    margin: 20rpx;
    color: var(--primary-color);
  }

  .registration-bottom {
    width: 100%;
    height: 90rpx;
    position: fixed;
    bottom: 100rpx;
    &-text {
      width: 100%;
      text-align: center;
      color: #999;
      font-size: 28rpx;
      line-height: 40rpx;
      position: fixed;
      bottom: 220rpx;
    }
    &-btn {
      width: 686rpx;
      height: 100%;
      background: var(--primary-btn-bg);
      box-shadow: 0px 10rpx 10rpx 0rpx rgba(227, 84, 80, 0.2);
      border-radius: 45rpx;
      text-align: center;
      line-height: 90rpx;
      color: #fff;
      font-size: 30rpx;
      font-weight: 500;
      margin: 0 auto;
    }
  }
}

.primary-color {
  color: var(--primary-color);
}
</style>
