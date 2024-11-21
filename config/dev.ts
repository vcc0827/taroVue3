import config from './index'
import type { UserConfigExport } from '@tarojs/cli';
export default {
  ...config,
  defineConstants:{
    API_URL: JSON.stringify('http://localhost:3000/api')
  },
  logger: {
    quiet: false,
    stats: true,
  },
  env: {
    NODE_ENV: '"development"',
  },
  mini: {},
  h5: {},
} satisfies UserConfigExport<'webpack5'>;
