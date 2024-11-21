<template>
  <nut-popup
    v-model:visible="show"
    position="center"
    transition="slide-up"
    :style="mergedStyle"
    :overlay="true"
    :overlay-style="computedOverlayStyle"
    :close-on-click-overlay="closeOnClickOverlay"
  >
    <slot></slot>
  </nut-popup>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  overlay:{
    type: Boolean,
    default: true
  },
  overlayStyle: {
    type: String,
    default: 'background: rgba(0,0,0,0.7)',
  },
  popupStyle: {
    type: Object,
    default: () => ({}),
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
});
const mergedStyle = computed(() => ({
  ...props.popupStyle,
}));
const computedOverlayStyle = computed(() => {
  console.log(props.overlay);
  
  if (!props.overlay) {
    return 'background: transparent';
  }
  return props.overlayStyle;
});
</script>

<style lang="scss">
// 自定义 slide-up 动画
:deep(.nut-popup) {
  &.nut-popup--center {
    // 确保弹窗初始位置在屏幕中间
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%);
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  transform: translate(-50%, 100%);
}

.slide-up-leave-to {
  transform: translate(-50%, 100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translate(-50%, -50%);
}

.custom-content {
  height: 100%; // 如果需要内容填充整个高度
  padding: 20rpx;
}
</style>
