# Input

输入框

## Size

<op-space>
    <op-input size="sm" v-model="msg" style="width: 200px" />
    <op-input size="md" v-model="msg" style="width: 200px" />
    <op-input size="lg" v-model="msg" style="width: 200px" />
</op-space>

<script setup>
    import { ref } from 'vue'
    const msg = ref('一拳超人')
</script>

```vue
<template>
    <op-space>
        <op-input size="sm" v-model="msg" style="width: 200px" />
        <op-input size="md" v-model="msg" style="width: 200px" />
        <op-input size="lg" v-model="msg" style="width: 200px" />
    </op-space>
</template>

<script setup>
    import { ref } from 'vue'
    const msg = ref('一拳超人')
</script>
```

## Status

<op-space>
    <op-input v-model="msg" status="error" style="width: 200px" />
    <op-input v-model="msg" status="warning" style="width: 200px" />
</op-space>

```vue
<template>
    <op-space>
        <op-input v-model="msg" status="error" style="width: 200px" />
        <op-input v-model="msg" status="warning" style="width: 200px" />
    </op-space>
</template>
```

## Api

| Property       | Description | Type             | Default |
| -------------- | ----------- | ---------------- | ------- |
| size           | 尺寸        | sm \| md \| lg   | md      |
| status         | 状态        | warning \| error |         |
| value(v-model) | 内容        | string           |         |

