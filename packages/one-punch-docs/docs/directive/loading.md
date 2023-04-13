# Loading

数据加载中

## Examples

<ClientOnly>
    <div class="mock-loading-wrap" v-loading="show">{{ !show ? '一拳超人' : '加载中...' }}</div>
    <op-button type="primary" @click="show = !show">切换 Loading</op-button>
</ClientOnly>

<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<style scope>
.mock-loading-wrap {
    position: relative;
    display:flex;
    width: 500px;
    height:300px;
    background:#ddd;
    justify-content:center;
    align-items:center;
    margin:20px 0;
}
</style>

```vue
<template>
    <div v-loading="show">{{ !show ? '一拳超人' : '加载中...' }}</div>
    <op-button type="primary" @click="show = !show">切换 Loading</op-button>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>
```

## Api

| Property  | Description       | Type    | Default |
| --------- | ----------------- | ------- | ------- |
| v-loading | 显示或隐藏loading | boolean | false   |


