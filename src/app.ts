import { createApp } from 'vue';
import { createPinia } from 'pinia';

import CustomNavBar from 'src/pages/custom-nav-bar/index.vue';
import DefaultLayout from 'src/layout/index.vue';

import './app.scss';

const App = createApp({
  onShow() {},
  onLaunch() {},
});

App.use(createPinia());

App.component('custom-nav-bar', CustomNavBar);
App.component('default-layout', DefaultLayout);

App.config.warnHandler = () => null;

export default App;
