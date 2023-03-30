# Button

按钮

## Type

<op-space>
    <op-button type="normal">默认按钮</op-button>
    <op-button type="primary">主题按钮</op-button>
    <op-button type="dashed">幽灵按钮</op-button>
    <op-button type="link">Link 按钮</op-button>
    <op-button type="text">文本按钮</op-button>
</op-space>

```vue
<template>
    <op-space>
        <op-button type="normal">默认按钮</op-button>
        <op-button type="primary">主题按钮</op-button>
        <op-button type="dashed">幽灵按钮</op-button>
        <op-button type="link">Link 按钮</op-button>
        <op-button type="text">文本按钮</op-button>
    </op-space>
</template>
```

## Size

<op-space>
    <op-button size="sm">小按钮</op-button>
    <op-button size="md">默认按钮</op-button>
    <op-button size="lg">大按钮</op-button>
</op-space>

```vue
<template>
    <op-space>
        <op-button size="sm">小按钮</op-button>
        <op-button size="md">默认按钮</op-button>
        <op-button size="lg">大按钮</op-button>
    </op-space>
</template>
```

## Api

| Property | Description | Type                                       | Default |
| :------- | ----------- | ------------------------------------------ | ------- |
| type     | 主题        | normal \| primary \| dashed \| link \|text | normal  |
| size     | 按钮尺寸    | sm \| md \| lg                             | md      |
| htmlType | 按钮类型    | button \| submit \| reset                  | button  |


| Events Name | Description  | Arguments       |
| ----------- | ------------ | --------------- |
| click       | 按钮点击事件 | (event) => void |

