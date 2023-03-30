# Space

让元素之间产生间距

## Size

<op-space :size="100">
    <op-button type="primary">Hello</op-button>
    <op-button type="primary">World</op-button>
</op-space>

```vue
<template>
    <op-space :size="100">
        <op-button type="primary">Hello</op-button>
        <op-button type="primary">World</op-button>
    </op-space>
</template>
```

## Direction

<op-space direction="vertical">
    <op-button type="primary">Hello</op-button>
    <op-button type="primary">World</op-button>
</op-space>

```vue
<template>
    <op-space direction="vertical">
        <op-button type="primary">Hello</op-button>
        <op-button type="primary">World</op-button>
    </op-space>
</template>
```

## Api

| Property  | Description | Type                   | Default    |
| --------- | ----------- | ---------------------- | ---------- |
| direction | 方向        | vertical \| horizontal | horizontal |
| size      | 间隔大小    | number                 | 8          |

