// https://pinia.esm.dev/introduction.html
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTabBarStore = defineStore("tabBar", () => {
  const list = ref([
    {
      pagePath: "pages/recommend/index",
      text: "推荐",
      selection: true,
    },
    {
      pagePath: "pages/home/index",
      text: "单身库",
      selection: false,
    },
    {
      pagePath: "pages/message/index",
      text: "信息",
      selection: false,
    },
    {
      pagePath: "pages/mine/index",
      text: "我的",
      selection: false,
    },
  ]);

  function updateTabBarStatus(item) {
    console.log("item", item);
  }

  return {
    list,
    updateTabBarStatus,
  };
});

// export const useCounterStore = defineStore('counter', {
//   state: () => {
//     return { count: 0 }
//   },
//   // could also be defined as
//   // state: () => ({ count: 0 })
//   actions: {
//     increment() {
//       this.count++
//     },
//   },
// })

// You can even use a function (similar to a component setup()) to define a Store for more advanced use cases:
// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)

//   function increment() {
//     count.value++
//   }

//   return {count, increment}
// })
