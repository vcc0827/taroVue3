import { createApp } from 'vue';
import { createPinia } from 'pinia';

import CustomNavBar from 'src/pages/custom-nav-bar/index.vue';
import DefaultLayout from 'src/layout/index.vue';
// import { checkAuth } from './pages/tools/check';

import './app.scss';

const App = createApp({
  onShow() {
    console.log('App onShow');
  },
  onLaunch() {
    console.log('App onLaunch');
    // checkAuth(); // 检查登录状态
  },
  onHide() {
    console.log('App onHide');
  },
  mounted() {
    console.log('App mounted');
  },
});

App.use(createPinia());

App.component('custom-nav-bar', CustomNavBar);
App.component('default-layout', DefaultLayout);

App.config.warnHandler = () => null;

export default App;
