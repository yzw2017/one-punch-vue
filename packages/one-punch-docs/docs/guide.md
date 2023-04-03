# one-punch-vue是什么?

一个简单的Vue3组件库

## 安装

```bash
npm i one-punch-vue --save
```

## 快速开始

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import OnePunchVue from 'one-punch-vue'
import "one-punch-vue/css"

createApp(App).use(OnePunchVue).mount("#app")
```