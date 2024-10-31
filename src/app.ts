import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './app.scss';
console.log('the time is now:', new Date().getTime());

const App = createApp({
  onShow() {
    console.log('onShow', new Date().getTime());
  },
  onLaunch() {
    console.log('onLaunch', new Date().getTime());
  },
});

App.use(createPinia());

export default App;
