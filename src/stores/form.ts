import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRegFormStore = defineStore('regForm', {
  state: () => ({
    form: ref({
      gender: '',
      birthday: 1995,
      education: '本科',
      livingPlace: ['湖北省', '武汉市'],
    }),
  }),
  actions: {
    updateFormData(object: object) {
      this.form = { ...this.form, ...object };
    },
  },
});
