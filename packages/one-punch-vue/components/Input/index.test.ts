import { describe, expect, test, vi } from "vitest"
import { shallowMount } from "@vue/test-utils"
import Input from './index'

describe('Input', () => {

    const changeFn = vi.fn()
    const blurFn = vi.fn()

    const wrapper = shallowMount(Input, {
        props: {
            modelValue: 'Hello',
            size: 'lg',
            status: 'error',
            onChange: changeFn,
            onBlur: blurFn,
        },
    })

    test('size', () => {
        expect(wrapper.classes('ant-input-lg')).toBeTruthy()
    })

    test('v-model', async () => {
        expect(wrapper.find('input').element.value).toBe('Hello')
        await wrapper.setProps({ modelValue: 'Hello World' })
        expect(wrapper.find('input').element.value).toBe('Hello World')
    })

    test('status', () => {
        expect(wrapper.classes('ant-input-status-error')).toBeTruthy()
    })

    test('Events', async () => {
        wrapper.vm.$emit('change')
        await wrapper.vm.$nextTick()
        expect(changeFn).toHaveBeenCalled()
        
        wrapper.vm.$emit('blur')
        await wrapper.vm.$nextTick()
        expect(blurFn).toHaveBeenCalled()
    })
})