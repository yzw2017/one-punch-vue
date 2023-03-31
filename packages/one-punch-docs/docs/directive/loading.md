# Loading

数据加载中

## Examples

<ClientOnly>
    <div class="test" v-loading="show">{{ !show ? '一拳超人' : '加载中...' }}</div>
    <op-button type="primary" @click="show = !show">切换 Loading</op-button>
</ClientOnly>

<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<style scope>
.test{display:flex;height:300px;background:#ddd;justify-content:center;align-items:center;margin-bottom:20px}
</style>

```vue
<template>
    <div class="box" v-loading="show">{{ !show ? '一拳超人' : '加载中...' }}</div>
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


