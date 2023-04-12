<template>
    <teleport :to="container">
        <transition>
            <div v-if="ready" class="mask">
                <div class="box">
                    <template v-if="captcha.type === 1">
                        <div class="img-wrap" ref="imgWrap">
                            <img :src="captcha.src" draggable="false">
                            <img 
                                ref="floatImgRef" 
                                class="float" 
                                :src="captcha.dst" 
                                :style="'top:' + captcha.y + 'px'"
                                draggable="false" 
                                @mousedown="mousedown"
                            >
                        </div>
    
                        <div class="slider-control" ref="sliderRef">
                            <div 
                                class="slider-border" 
                                ref="sliderBorderRef" 
                                :class="[status]"
                            >
                            </div>
                            <div 
                                ref="sliderBtnRef" 
                                class="slider-btn" 
                                :class="[status]" 
                                @mousedown="mousedown"
                            >
                                <span class="slider-icon" :class="[status]"></span>
                            </div>
    
                            <div v-if="status === 'free'" class="slider-tips">向右拖动滑块填充拼图</div>
                        </div>
                    </template>

                    <template v-else-if="captcha.type === 2">
                        <div class="img-wrap">
                            <img 
                                class="base" 
                                draggable="false"
                                @click="handleImgClick" 
                                :src="captcha.src"
                            >
                            <i 
                                v-for="item of clickImgPoints" 
                                :key="item.id"
                                class="point"
                                :class="item.id"
                                :style="`top:${item.top}px;left:${item.left}px`"
                            >
                            </i>
                        </div>

                        <div class="text-control" :class="[status]">
                            <template v-if="!['success', 'fail'].includes(status)">
                                <span>请依次点击</span>
                                <span class="clickImg" :style="clickImgStyle"></span>
                            </template>

                            <template v-else>
                                <i class="icon" :class="[status]"></i>
                                <span>{{ status === 'success' ? '验证成功' : '验证失败，请重试' }}</span>
                            </template>
                        </div>
                    </template>

                    <div class="bottom">
                        <div class="bottom-left">
                            <a class="bottom-close" @click="$emit('close')"></a>
                            <a class="bottom-refresh" @click="refresh"></a>
                        </div>
                        <div class="bottom-right">根据卓博验证机制提供</div>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef, toRef, watchPostEffect, computed } from 'vue'
import { useEventListener, templateRef } from '@vueuse/core'

type Status = 'pending' | 'success' | 'fail' | 'free' | 'ajax'

interface Captcha {
    dst?: string
    src: string
    token: string
    type: 1 | 2
    y?: number
    characters?: number
    tipWidth?: number
}

interface Point {
    id: string
    x: number
    y: number
    left: number
    top: number
}

export default defineComponent({
    name: "opValidate",
    props: {
        show: {
            type: Boolean
        },
        imgUrl: {
            type: String,
            required: true
        },
        valiUrl: {
            type: String,
            required: true
        },
        container: {
            type: String,
            default: 'body'
        },
    },
    emits: ['close', 'success', 'fail'],
    setup(props, { emit }) {
        /**
         * free 空闲状态(用户没有任何操作的情况下)
         * pending 用户验证中(用户已经开始操作验证)
         * success 成功验证
         * fail 验证失败
         * ajax 请求后端验证中
         */
        const status = ref<Status>('free')
        const captcha = shallowRef<Captcha>()
        const clickImgPoints = ref<Point[]>([])
        const clickImgStyle = computed(() => {
            const { tipWidth, src } = captcha.value
            return { width: tipWidth + 'px', backgroundImage: `url(${src})` }
        })

        // ref dom
        const sliderRef = templateRef<HTMLElement | null>('sliderRef', null)
        const sliderBtnRef = templateRef<HTMLElement | null>('sliderBtnRef', null)
        const sliderBorderRef = templateRef<HTMLElement | null>('sliderBorderRef', null)
        const imgWrap = templateRef<HTMLElement | null>('imgWrap', null)
        const floatImgRef = templateRef<HTMLElement | null>('floatImgRef', null)

        const ready = computed(() => captcha.value && props.show)

        watchPostEffect(async () => {
            if (props.show) {
                await init()
            } else {
                status.value = 'free'
                captcha.value = null
            }
        })

        async function init() {
            const result = await (await fetch(props.imgUrl)).json()
            const { captcha: json } = result
            captcha.value = JSON.parse(json)
        }

        const sliderMoving = computed(() => {
            return props.show && status.value === 'pending' && captcha.value.type === 1
        })

        let clicked = 0
        let startX = 0
        let btnWidth = 0
        let floatImgWidth = 0
        function mousedown(event: MouseEvent) {
            event.stopPropagation()

            status.value = 'pending'
            startX = event.clientX
            btnWidth = sliderBtnRef.value.offsetWidth
            floatImgWidth = floatImgRef.value.offsetWidth
        }

        function mousemove(event: MouseEvent) {
            event.stopPropagation()

            if (!sliderMoving.value) {
                return
            }

            const clientX = event.clientX
            const diff = clientX - startX

            function btnMove() {
                const max = sliderRef.value.clientWidth - btnWidth
                const left = diff >= max ? max : diff <= 0 ? 0 : diff
                sliderBtnRef.value.style.left = left + 'px'
                sliderBorderRef.value.style.width = sliderBtnRef.value.offsetLeft + btnWidth + 'px'
            }

            function imgMove() {
                const max = imgWrap.value.clientWidth - floatImgWidth
                const left = diff >= max ? max : diff <= 0 ? 0 : diff
                floatImgRef.value.style.left = left + 'px'
            }

            btnMove()
            imgMove()
        }

        async function mouseup(event: MouseEvent) {
            event.stopPropagation()

            if (!sliderMoving.value) {
                return
            }

            status.value = 'ajax'

            const { offsetLeft } = sliderBtnRef.value
            const { token } = captcha.value

            const result = await validateFn(offsetLeft, token)
            if (result) {
                status.value = 'success'

                setTimeout(() => {
                    emit('success', token)
                }, 1000)
            } else {
                status.value = 'fail'

                setTimeout(() => {
                    emit('fail')
                    refresh()
                }, 1000)
            }
        }

        useEventListener(document, 'mousemove', mousemove)
        useEventListener(document, 'mouseup', mouseup)

        async function validateFn(value: number|string, token: string): Promise<boolean> {
            const result = await (await fetch(props.valiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `cvp.value=${value}&cvp.token=${token}`
            })).json()
            return result.success as boolean
        }

        function reset() {
            const { type } = captcha.value

            if (type === 1) {
                sliderBtnRef.value.style.left = '0'
                sliderBorderRef.value.style.width = '0'
            } else if (type === 2) {
                clicked = 0
                clickImgPoints.value = []
            }

            status.value = 'free'
        }

        function refresh() {
            reset()
            init()
        }

        async function handleImgClick(event: MouseEvent) {
            event.stopPropagation()

            clicked++
            const { characters: max } = captcha.value
            const x = event.offsetX
            const y = event.offsetY

            if (clicked <= max) {
                status.value = 'pending'

                const left = x - 25/2
                const top = y - 25/2
                clickImgPoints.value.push({id:'a'+clicked,left,top,x,y})

                if (clicked === max) {
                    status.value = 'ajax'

                    const { token } = captcha.value
                    let value: number[] = []
                    clickImgPoints.value.forEach(item => {
                        value.push(item.x, item.y)
                    })
                    const result = await validateFn(value.join(), token)
                    if (result) {
                        status.value = 'success'

                        setTimeout(() => {
                            emit('success', token)
                        }, 1000)
                    } else {
                        status.value = 'fail'

                        setTimeout(() => {
                            emit('fail')
                            refresh()
                        }, 1000)
                    }
                }
            }
        }

        return {
            ready,
            status,
            captcha,
            mousedown,
            clickImgPoints,
            clickImgStyle,
            handleImgClick,
            refresh
        }
    }
})
</script>

<style lang="scss" scoped>
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

$pendingBorder: #1991fa;
$pendingBackground: #d1e9fe;
$successBorder: #52CCBA;
$successBackground: #D2F4EF;
$failBorder: #f57a7a;
$failBackground: #fce1e1;

.mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    @include flex-center;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    user-select: none;

    .box {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 14px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-family: "Microsoft yahei";
        font-size: 0;

        .img-wrap {
            position: relative;
            width: 300px;
            height: 200px;
            overflow: hidden;

            .float {
                position: absolute;
                left: 0;
                cursor: pointer;
            }

            .point {
                width: 25px;
                height: 25px;
                position: absolute;
                background: url(https://www.jobcn.com/commImage/captcha_icon.png) no-repeat -100px 0;

                &.a1 {
                    background-position: -100px 0;
                }

                &.a2 {
                    background-position: -100px -50px;
                }

                &.a3 {
                    background-position: -100px -100px;
                }

                &.a4 {
                    background-position: -50px -100px;
                }
            }
        }

        .common-control {
            position: relative;
            border: 1px solid #e4e7eb;
            background-color: #f7f9fa;

            height: 40px;
            border-radius: 2px;
            margin: 10px 0;
        }

        .slider-control {
            @extend .common-control;

            .slider-border {
                position: absolute;
                top: -1px;
                left: -1px;
                border: 1px solid transparent;

                height: 40px;
                border-radius: 2px;
                width: 0;
                box-sizing: border-box;

                &.pending {
                    border-color: $pendingBorder;
                    background-color: $pendingBackground;
                }
                &.success {
                    border-color: $successBorder;
                    background-color: $successBackground;
                }
                &.fail {
                    border-color: $failBorder;
                    background-color: $failBackground;
                }
            }

            .slider-btn {
                position: absolute;
                width: 40px;
                border-radius: 2px;
                top: 0;
                left: 0;
                height: 100%;
                background-color: #fff;
                box-shadow: 0 0 3px rgba(0, 0, 0, .3);
                cursor: pointer;
                transition: background .2s linear;
                z-index: 10;

                @include flex-center;

                &:hover {
                    background-color: $pendingBorder;
                }

                &:hover > .slider-icon {
                    background-position: 0 -30px;
                }

                &.pending {
                    background-color: $pendingBorder;
                }
                &.success {
                    background-color: $successBorder;
                }
                &.fail {
                    background-color: $failBorder;
                }

                .slider-icon {
                    width: 14px;
                    height: 10px;
                    background-image: url(https://cstaticdun.126.net/2.21.3/images/icon_light.4e88fb8.png);
                    background-position: 0 -15px;
                    background-size: 40px 1518px;
                    &.pending {
                        background-position: 0 -30px;
                    }
                    &.success {
                        background-position: 0 0;
                    }
                    &.fail {
                        width: 14px;
                        height: 12px;
                        background-position: 1px -94px;
                    }
                }
            }

            .slider-tips {
                padding-left: 40px;
                text-align: center;
                color: #45494c;
                font-size: 14px;
                line-height: 40px;
                white-space: nowrap;
            }
        }

        .text-control {
            font-size: 14px;
            @extend .common-control;
            @include flex-center;

            .clickImg {
                height: 36px;
                background-position: 0 -201px;
                background-color: #fff;
                background-repeat: no-repeat;
                margin: 0 10px;
            }

            .icon {
                background-image: url(https://cstaticdun.126.net/2.21.3/images/icon_light.4e88fb8.png);
                background-size: 40px 1518px;
                margin: 0 5px;
                &.fail {
                    width: 14px;
                    height: 12px;
                    background-position: 0 -77px;
                }
                &.success {
                    width: 17px;
                    height: 13px;
                    background-position: 0 -110px;
                }
            }

            &.fail {
                border-color: $failBorder;
                background-color: $failBackground;
                color: $failBorder;
            }

            &.success {
                border-color: $successBorder;
                background-color: $successBackground;
                color: $successBorder;
            }
            
        }

        .bottom {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .bottom-right {
                font-size: 14px;
                color: #aaa;
            }

            .bottom-left {
                display: inline-flex;
                align-items: center;

                .bottom-close {
                    height: 24px;
                    width: 24px;
                    background: url(https://www.jobcn.com/commImage/captcha_icon.png) no-repeat;
                    background-position: 0 0;
                    cursor: pointer;
                }

                .bottom-refresh {
                    height: 24px;
                    width: 24px;
                    background: url(https://www.jobcn.com/commImage/captcha_icon.png) no-repeat;
                    background-position: -50px 0;
                    cursor: pointer;
                }

                >a+a {
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>