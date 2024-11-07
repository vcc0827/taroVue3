<template>
  <default-layout>
    <view class="registration-body ad">
      <view class="steps">
        <view
          class="step"
          :class="index < currentStep ? 'green-step' : ''"
          v-for="(item, index) in stepLength"
          :key="index"
        >
        </view>
      </view>
    </view>
  </default-layout>
</template>

<script setup>
import Taro from '@tarojs/taro';
import { ref } from 'vue';

const currentStep = ref(1);
const stepLength = ref(3);
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
  }

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
</style>
