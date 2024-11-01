import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './app.scss';

const App = createApp({
  onShow() {},
  onLaunch() {},
});

App.use(createPinia());

App.config.warnHandler = () => null;

export default App;
