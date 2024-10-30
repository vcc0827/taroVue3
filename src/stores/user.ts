import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCustomerInfoStore = defineStore('customInfo', {
  state() {
    return {
      info: ref({}),
    };
  },
  actions: {
    updateCustomerInfo(list: any) {
      this.info.value = list;
    },
  },
});

export const useDeviceStore = defineStore('device', {
  state() {
    return {
      benchmarkLevel: ref(2),
      brand: ref(''),
      memorySize: ref(2048),
      model: ref(''),
      platform: ref(''),
      system: ref(''),
    };
  },
  actions: {
    updateDevice(name: string, value: string | number) {
      if (name in this) {
        this[name] = value;
      } else {
        console.log(`${name} is not in device info`);
      }
    },
  },
});

export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      isRegister: ref(false),
      isAdSource: ref(false),
      hasPhone: ref(false),
    };
  },
  actions: {
    updateRegister(value: Boolean) {
      this.isRegister.value = value;
    },
    updateAdSource(value: Boolean) {
      this.isAdSource.value = value;
    },
    updateHasPhone(value: Boolean) {
      this.hasPhone.value = value;
    },
  },
});
