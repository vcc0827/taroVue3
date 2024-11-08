import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRegFormStore = defineStore('regForm', {
  state: () => ({
    form: ref({
      birthday: 1995,
    }),
  }),
  actions: {
    updateFormData(object: object) {
      this.form = { ...this.form, ...object };
    },
  },
});
