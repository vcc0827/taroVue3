<template>
  <view>
    <view>
      <text class="title">{{ counter.count }}</text>
    </view>
    <nut-button type="primary" @tap="onAdd">ADD</nut-button>
  </view>
</template>

<script setup>
import { useCounterStore } from "../../stores/counter";

const counter = useCounterStore();

const onAdd = () => {
  counter.increment();
};
</script>

<style>
.title {
  font-size: 32px;
}
</style>
