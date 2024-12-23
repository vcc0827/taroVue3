import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTabBarStore = defineStore('tabBar', {
  state: () => ({
    selected: ref(0),
  }),
  actions: {
    setSelected(item: number) {
      console.log('value:', item);
      this.selected = item;
    },
  },
});
