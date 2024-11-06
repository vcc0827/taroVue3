<template>
  <web-view :src="src" />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouteStore } from 'src/stores/common';

const routeStore = useRouteStore();
const src = ref('');

onMounted(() => {
  src.value = routeStore.options;
});
</script>
