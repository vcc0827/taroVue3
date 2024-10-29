<template>
  <view>
    <view>
      <text class="title">{{ counter.count }}</text>
    </view>
    <nut-button type="primary" @tap="onAdd">ADD</nut-button>
  </view>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";

const counter = useCounterStore();

const onAdd = () => {
  counter.increment();
};
</script>

<style>
.title {
  font-size: 32px;
}
.button {
  border: 1px solid lightgray;
  padding: 5px 10px;
}
</style>
