# Validate

## 滑块验证

<ClientOnly>
    <op-button type="primary" @click="showSlider = true">滑块验证</op-button>
    <op-validate 
        :show="showSlider"
        img-url="https://b18.dgcn.com/demo/captcha/getDemoPicCaptcha.ujson?captchaType=1" 
        vali-url="https://b18.dgcn.com/demo/captcha/validateDemoPicCaptcha.ujson"
        @close="showSlider = false"
        @success="success"
    />
</ClientOnly>

## 图片验证

<ClientOnly>
    <op-button type="primary" @click="showImg = true">图片验证</op-button>
    <op-validate 
        :show="showImg"
        img-url="https://b18.dgcn.com/demo/captcha/getDemoPicCaptcha.ujson?captchaType=2" 
        vali-url="https://b18.dgcn.com/demo/captcha/validateDemoPicCaptcha.ujson"
        @close="showImg = false"
        @success="success"
    />
</ClientOnly>

<script setup>
import { ref } from 'vue'

const showSlider = ref(false)
const showImg = ref(false)
const showBox = ref(false)

const success = (token) => {
    alert('验证成功！token:' + token)
    showSlider.value = false
    showImg.value = false
    showBox.value = false
}
</script>

## 局部显示

<ClientOnly>
    <op-button type="primary" @click="showBox = true">开始验证</op-button>
    <div class="mock-validate-wrap"></div>
    <op-validate 
        container=".mock-validate-wrap"
        :show="showBox"
        img-url="https://b18.dgcn.com/demo/captcha/getDemoPicCaptcha.ujson?captchaType=1" 
        vali-url="https://b18.dgcn.com/demo/captcha/validateDemoPicCaptcha.ujson"
        @close="showBox = false"
        @success="success"
    />
</ClientOnly>

<style>
    .mock-validate-wrap {
        position: relative;
        width: 600px;
        height: 500px;
        background: pink;
        margin: 20px 0;
    }
</style>

```vue
<template>
    <op-button type="primary" @click="showImg = true">图片验证</op-button>
    <op-validate 
        :show="showImg"
        img-url="https://b18.dgcn.com/demo/captcha/getDemoPicCaptcha.ujson?captchaType=2" 
        vali-url="https://b18.dgcn.com/demo/captcha/validateDemoPicCaptcha.ujson"
        @close="showImg = false"
        @success="success"
    />
<template>

<script setup>
import { ref } from 'vue'

const showImg = ref(false)

const success = (token) => {
    alert('验证成功！token:' + token)
    showImg.value = false
}
</script>
```

## Api

| Property  | Description | Type    | Default |
| --------- | ----------- | ------- | ------- |
| show      | 显示隐藏    | boolean | false   |
| img-url   | 获取图片url | string  |         |
| vali-url  | 验证url     | string  |         |
| container | 插入位置    | string  | body    |



| Events Name | Description  | Arguments       |
| ----------- | ------------ | --------------- |
| success     | 验证成功回调 | (token) => void |
| fail        | 验证失败回调 | () => void      |
| close       | 关闭弹窗     | () => void      |

